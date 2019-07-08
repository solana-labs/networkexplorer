/**
 * https -> http proxy for the blockexplorer API server and validator's JSON RPC
 * ports running on the same host machine.
 *
 * Loads a certificate if present, otherwise creates a self-signed certificate
 */
import fs from 'fs';
import httpProxy from 'http-proxy';
import path from 'path';
import pem from 'pem';
import yargs from 'yargs';

const httpsToHttp = [
  // https port 3443 redirects the blockexplorer's API server at 3001
  {
    from: 3443,
    to: 3001,
    ws: true,
  },
  // https port 8443 redirects to the validator node's JSON RPC endpoint
  {
    from: 8443,
    to: 8899,
    ws: false,
  },
  // https port 8444 redirects to the validator node's JSON RPC websocket
  {
    from: 8444,
    to: 8900,
    ws: true,
  },
];

const argv = yargs
  .usage('Usage: $0 <options>\nExample: $0 --keys ~')
  .describe('keys', 'path for storing .key.pem and .cert.pem')
  .default('keys', '.').argv;

function readKeys(location = '.') {
  const serviceKeyFile = path.resolve(location, '.key.pem');
  const certificateFile = path.resolve(location, '.cert.pem');

  function readFileSync(file) {
    if (fs.existsSync(file)) {
      return fs.readFileSync(file);
    }
    return null;
  }

  const serviceKey = readFileSync(serviceKeyFile);
  const certificate = readFileSync(certificateFile);

  return new Promise((resolve, reject) => {
    if (serviceKey && certificate) {
      console.log('Certificate loaded from', certificateFile);
      resolve({serviceKey, certificate});
    } else {
      console.log('Creating a self-signed certificate');
      pem.createCertificate(
        {
          days: 1000,
          selfSigned: true,
        },
        (err, keys) => {
          if (err) {
            reject(err);
          }

          fs.writeFileSync(serviceKeyFile, keys.serviceKey);
          fs.writeFileSync(certificateFile, keys.certificate);
          resolve(keys);
        },
      );
    }
  });
}

async function main() {
  const keys = await readKeys(argv.keys);

  const proxies = httpsToHttp.map(info => {
    console.log('https->http:', info);
    const proxy = httpProxy
      .createServer({
        target: `http://localhost:${info.to}`,
        ws: info.ws,
        ssl: {
          key: keys.serviceKey,
          cert: keys.certificate,
        },
      })
      .listen(info.from);

    proxy.on('error', err => {
      const message = `proxy: ${JSON.stringify(
        info,
      )}: something went wrong.\n${err}\n`;
      console.log(message);
    });

    return proxy;
  });

  console.log(`${proxies.length} proxies started`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
