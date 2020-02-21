import localforage from 'localforage';
import {parse as urlParse, format as urlFormat} from 'url';

const windowProtocol = urlParse(window.location.href).protocol;

const endpointUrlMap = {
  local:
    windowProtocol === 'https:'
      ? `http://${window.location.hostname}:8443`
      : `http://${window.location.hostname}:8899`,

  devnet: 'https://devnet.solana.com:8443',
  tds: 'https://tds.solana.com:8443',
  slp: 'https://api.mainnet-beta.solana.com',
};

const endpointHostnameMap = {
  'devnet.solana.com': 'devnet',
  'api.mainnet-beta.solana.com': 'slp',
  'tds.solana.com': 'tds',
  'explorer.solana.com': 'devnet', // Default endpoint for explorer.solana.com
  'edge.explorer.solana.com': 'devnet', // Default endpoint for edge.explorer.solana.com
};

const endpointFriendlyNameMap = {
  devnet: 'Developer Testnet',
  slp: 'Soft Launch Testnet',
  tds: 'Tour de SOL Testnet',
  local: 'Local Cluster',
};

function getDefaultEndpointName() {
  const endpointName = endpointHostnameMap[window.location.hostname];
  if (endpointName) {
    // Remove 'local' option if not running a local/dev app
    delete endpointUrlMap.local;
    return endpointName;
  }

  return 'devnet';
}

let endpointName = getDefaultEndpointName();

export async function load() {
  try {
    const newEndpointName = await localforage.getItem('endpointName');
    if (typeof endpointUrlMap[newEndpointName] === 'string') {
      endpointName = newEndpointName;
    }
  } catch (err) {
    console.log(
      `Unable to load endpointName from localforage, using default of ${endpointName}: ${err}`,
    );
  }
  console.log('EndpointConfig loaded. endpointName:', endpointName);
}

export function getEndpointName() {
  return endpointName;
}

export function getEndpoints() {
  return Object.keys(endpointUrlMap).map(name => {
    return {name, friendlyName: endpointFriendlyNameMap[name]};
  });
}

export function setEndpointName(newEndpointName) {
  if (typeof endpointUrlMap[newEndpointName] !== 'string') {
    throw new Error(`Unknown endpoint: ${newEndpointName}`);
  }
  endpointName = newEndpointName;
  console.log('endpointName is now', endpointName);
  localforage.setItem('endpointName', endpointName).catch(err => {
    console.log(`Failed to set endpointName in localforage: ${err}`);
  });
}

export function getRpcUrl() {
  return endpointUrlMap[endpointName];
}

export function getApiUrl() {
  const urlParts = urlParse(getRpcUrl());
  urlParts.host = '';
  if (urlParts.protocol === 'https:') {
    urlParts.port = '3443';
  } else {
    urlParts.port = '3001';
  }
  const url = urlFormat(urlParts);
  return url;
}

export function getApiWebsocketUrl() {
  const urlParts = urlParse(getApiUrl());
  urlParts.host = '';
  if (urlParts.protocol === 'https:') {
    urlParts.protocol = 'wss:';
  } else {
    urlParts.protocol = 'ws:';
  }
  const url = urlFormat(urlParts);
  return url;
}

export function getMetricsDashboardUrl() {
  let testnet = endpointName;
  if (endpointName === 'local') {
    testnet = endpointHostnameMap[window.location.hostname];
  }

  let url =
    'https://metrics.solana.com:3000/d/testnet-beta/testnet-monitor-beta?refresh=5s&from=now-5m&to=now';
  if (testnet) {
    url += `&var-testnet=${testnet}`;
  }
  return url;
}
