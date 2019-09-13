import {BlockIndexView} from './views/blocks/index';
import {BlockDetailView} from './views/blocks/detail';
import {TransactionIndexView} from './views/transactions/index';
import {TransactionDetailView} from './views/transactions/detail';
import {DEFAULT_PAGE_SIZE} from './loaders/timeline';
import {loadBlockIndex} from './loaders/blocks/index';
import {loadBlockDetail} from './loaders/blocks/detail';
import {loadTransactionIndex} from './loaders/transactions/index';
import {loadTransactionDetail} from './loaders/transactions/detail';

function prettify(req, data) {
  const isPretty = req.query && req.query.pretty === 'true';

  return (
    (isPretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)) + '\n'
  );
}

//
//  _   _      _                      _      ______            _
// | \ | |    | |                    | |    |  ____|          | |
// |  \| | ___| |___      _____  _ __| | __ | |__  __  ___ __ | | ___  _ __ ___ _ __
// | . ` |/ _ \ __\ \ /\ / / _ \| '__| |/ / |  __| \ \/ / '_ \| |/ _ \| '__/ _ \ '__|
// | |\  |  __/ |_ \ V  V / (_) | |  |   <  | |____ >  <| |_) | | (_) | | |  __/ |
// |_| \_|\___|\__| \_/\_/ \___/|_|  |_|\_\ |______/_/\_\ .__/|_|\___/|_|  \___|_|
//                                                      | |
//                                                      |_|
//
export function addNetworkExplorerRoutes(redisX, app) {
  // Network Explorer Block Index
  app.get('/explorer/blocks/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'BlockIndexView@latest';
    const start = q.start || '+';
    const count = q.count || DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const rawData = await loadBlockIndex(redisX, start, count, direction);

    res.send(prettify(req, new BlockIndexView().asVersion(rawData, version)));
  });

  // Network Explorer Block Detail
  app.get('/explorer/blocks/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'BlockDetailView@latest';
    const rawData = await loadBlockDetail(redisX, req.params.id, version);

    res.send(prettify(req, new BlockDetailView().asVersion(rawData, version)));
  });

  // Network Explorer Transaction Index
  app.get('/explorer/transactions/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'TransactionIndexView@latest';
    const start = q.start || '+';
    const count = q.count || DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const rawData = await loadTransactionIndex(redisX, start, count, direction);

    res.send(
      prettify(req, new TransactionIndexView().asVersion(rawData, version)),
    );
  });

  // Network Explorer Transaction Detail
  app.get('/explorer/transactions/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'TransactionDetailView@latest';
    const rawData = await loadTransactionDetail(redisX, req.params.id, version);

    res.send(
      prettify(req, new TransactionDetailView().asVersion(rawData, version)),
    );
  });
}
