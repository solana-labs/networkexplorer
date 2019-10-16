import {TourDeSolIndexView} from './views/tourdesol';
import {BlockIndexView} from './views/blocks/index';
import {BlockDetailView} from './views/blocks/detail';
import {TransactionIndexView} from './views/transactions/index';
import {TransactionDetailView} from './views/transactions/detail';
import {ApplicationIndexView} from './views/applications/index';
import {ApplicationDetailView} from './views/applications/detail';
import {AccountIndexView} from './views/accounts/index';
import {AccountDetailView} from './views/accounts/detail';
import {DEFAULT_PAGE_SIZE} from './loaders/timeline';
import {loadTourDeSolIndex} from './loaders/tourdesol';
import {loadBlockIndex} from './loaders/blocks/index';
import {loadBlockDetail} from './loaders/blocks/detail';
import {loadTransactionIndex} from './loaders/transactions/index';
import {loadTransactionDetail} from './loaders/transactions/detail';
import {loadApplicationIndex} from './loaders/applications/index';
import {loadApplicationDetail} from './loaders/applications/detail';
import {loadAccountIndex} from './loaders/accounts/index';
import {loadAccountDetail} from './loaders/accounts/detail';
import {FriendlyGet} from './friendlyGet';

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
  // Network Explorer Tour de Sol Index
  app.get('/explorer/tourdesol/index', async (req, res) => {
    const q = req.query || {};

    const isDemo = q.isDemo || false;
    const activeStage = q.activeStage && parseInt(q.activeStage);
    const version = q.v || 'TourDeSolIndexView@latest';
    const {__errors__, rawData} = await new FriendlyGet()
      .with('rawData', loadTourDeSolIndex(redisX, {isDemo, activeStage}), {})
      .get();

    res.send(
      prettify(
        req,
        new TourDeSolIndexView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Block Index
  app.get('/explorer/blocks/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'BlockIndexView@latest';
    const start = q.start || '+';
    const count = q.count ? parseInt(q.count) : DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const {__errors__, rawData} = await new FriendlyGet()
      .with('rawData', loadBlockIndex(redisX, start, count, direction), {})
      .get();

    res.send(
      prettify(
        req,
        new BlockIndexView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Block Detail
  app.get('/explorer/blocks/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'BlockDetailView@latest';
    const {__errors__, rawData} = await new FriendlyGet()
      .with('rawData', loadBlockDetail(redisX, req.params.id, version), {})
      .get();

    res.send(
      prettify(
        req,
        new BlockDetailView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Transaction Index
  app.get('/explorer/transactions/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'TransactionIndexView@latest';
    const start = q.start || '+';
    const count = q.count ? parseInt(q.count) : DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadTransactionIndex(redisX, start, count, direction),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new TransactionIndexView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Transaction Detail
  app.get('/explorer/transactions/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'TransactionDetailView@latest';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadTransactionDetail(redisX, req.params.id, version),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new TransactionDetailView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Applications Index
  app.get('/explorer/applications/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'ApplicationIndexView@latest';
    const start = q.start || '';
    const count = q.count ? parseInt(q.count) : DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadApplicationIndex(redisX, start, count, direction),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new ApplicationIndexView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Application Detail
  app.get('/explorer/applications/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'ApplicationDetailView@latest';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadApplicationDetail(redisX, req.params.id, version),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new ApplicationDetailView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Accounts Index
  app.get('/explorer/accounts/index', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'AccountIndexView@latest';
    const start = q.start || '';
    const count = q.count ? parseInt(q.count) : DEFAULT_PAGE_SIZE;
    const direction = q.direction || '-';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadAccountIndex(redisX, start, count, direction),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new AccountIndexView().asVersion(rawData, __errors__, version),
      ),
    );
  });

  // Network Explorer Account Detail
  app.get('/explorer/accounts/:id', async (req, res) => {
    const q = req.query || {};

    const version = q.v || 'AccountDetailView@latest';
    const {__errors__, rawData} = await new FriendlyGet()
      .with(
        'rawData',
        loadAccountDetail(redisX, req.params.id, version),
        {},
      )
      .get();

    res.send(
      prettify(
        req,
        new AccountDetailView().asVersion(rawData, __errors__, version),
      ),
    );
  });
}
