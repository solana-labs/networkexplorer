import React, {Component} from 'react';
import axios from 'axios';
import {Router} from 'react-router-dom';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RobustWebSocket from 'robust-websocket';
import _ from 'lodash';
import {matchPath, Route} from 'react-router';
import './App.css';
import {createBrowserHistory} from 'history';
// import {Connection} from '@solana/web3.js';
import {CssBaseline} from '@material-ui/core';

import {sleep} from './sleep';
import * as EndpointConfig from './EndpointConfig';
// v1 components
import BxDataTable from './v1/BxDataTable';
import BxTransactionChart from './v1/BxTransactionChart';
import BxStatsTable from './v1/BxStatsTable';
import BxDialog from './v1/BxDialog';
import BxDialogTransactions from './v1/BxDialogTransactions';
import BxDialogWorldMap from './v1/BxDialogWorldMap';
import BxAppBar from './v1/BxAppBar';
import {stylesV1, themeV1} from './v1/ThemeV1';
// v2 components
import Bx2AppBar from './v2/Bx2AppBar';
import Bx2NavDrawer from './v2/Bx2NavDrawer';
import Bx2BlankComponent from './v2/Bx2BlankComponent';
import Bx2PanelValidatorsOverview from './v2/Bx2PanelValidatorsOverview';
import Bx2PanelValidators from './v2/Bx2PanelValidators';
import Bx2PanelValidatorDetail from './v2/Bx2PanelValidatorDetail';
import {stylesV2, themeV2} from './v2/ThemeV2';

const history = createBrowserHistory();

const BxAppBarThemed = withStyles(stylesV1)(BxAppBar);
const BxDialogThemed = withStyles(stylesV1)(BxDialog);
const BxDialogTransactionsThemed = withStyles(stylesV1)(BxDialogTransactions);
const BxDialogWorldMapThemed = withStyles(stylesV1)(BxDialogWorldMap);
const BxStatsTableThemed = withStyles(stylesV1)(BxStatsTable);
const BxTransactionChartThemed = withStyles(stylesV1)(BxTransactionChart);
const BxDataTableThemed = withStyles(stylesV1)(BxDataTable);

const Bx2AppBarThemed = withStyles(stylesV2)(Bx2AppBar);
const Bx2NavDrawerThemed = withStyles(stylesV2)(Bx2NavDrawer);
const Bx2PanelValidatorsOverviewThemed = withStyles(stylesV2)(
  Bx2PanelValidatorsOverview,
);
const Bx2PanelValidatorsThemed = withStyles(stylesV2)(Bx2PanelValidators);
const Bx2PanelValidatorDetailThemed = withStyles(stylesV2)(
  Bx2PanelValidatorDetail,
);
const Bx2BlankComponentThemed = withStyles(stylesV2)(Bx2BlankComponent);

class App extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      selectedValue: null,
      currentMatch: null,
      stateLoading: false,
      nodes: [],
      globalStats: {
        '!ent-last-leader': null,
        '!blk-last-slot': 0,
        '!txn-count': 0,
        '!txn-per-sec-max': 0,
      },
      txnStats: {},
      users: [],
      userState: {},
      transactions: [],
      blocks: [],
    };
    this.state = Object.assign(
      {
        enabled: true,
        dialogOpen: false,
      },
      this.defaultState,
    );
    this.ws = null;

    setInterval(() => {
      this.updateTxnStats();
    }, 30000);
    setInterval(() => {
      this.updateTransactions();
    }, 10000);
  }

  async getRemoteState(attr, url, mapFun, limit, transform) {
    try {
      const response = await axios.get(url);
      let newState = {};

      if (limit) {
        response.data = response.data.slice(0, limit);
      }

      if (mapFun) {
        newState[attr] = _.map(response.data, mapFun);
      } else {
        newState[attr] = response.data;
      }

      if (transform) {
        newState = transform(response.data);
      }

      this.updateStateAttributes(newState);
    } catch (err) {
      console.error('getRemoteState failed:', err);
    }
  }

  updateSpecificGlobalStateAttribute(attr, value) {
    let globalStats = {...this.state.globalStats};
    globalStats[attr] = value;

    this.updateStateAttributes({globalStats: globalStats});
  }

  updateStateAttributes(attrMap) {
    let newState = {...this.state};

    _.forEach(attrMap, (v, k) => {
      newState[k] = v;
    });

    this.setState(() => {
      return newState;
    });
  }

  parseClusterInfo(data) {
    let voting = data.voting;
    let gossip = data.cluster;

    let nodes = _.map(gossip, g => {
      let newG = {...g};
      let vote = voting.find(x => x.nodePubkey === newG.pubkey);
      newG.voteAccount = vote;

      return newG;
    });

    return {
      supply: data.supply,
      feeCalculator: data.feeCalculator,
      nodes: nodes,
    };
  }

  updateTxnStats() {
    this.getRemoteState('txnStats', `${EndpointConfig.getApiUrl()}txn-stats`);
  }

  updateBlocks() {
    if (!this.state.enabled) {
      return;
    }

    let blkFun = v => {
      let newObj = {};
      let fields = v.split('#');

      newObj.t = 'blk';
      newObj.h = fields[0];
      newObj.l = fields[1];
      newObj.s = fields[2];
      newObj.dt = fields[3];
      newObj.id = fields[4];

      return newObj;
    };

    this.getRemoteState(
      'blocks',
      `${EndpointConfig.getApiUrl()}blk-timeline`,
      blkFun,
      10,
    );
  }

  updateTransactions() {
    if (!this.state.enabled) {
      return;
    }

    let self = this;

    let txnFun = v => {
      return self.parseTransactionMessage(v);
    };

    this.getRemoteState(
      'transactions',
      `${EndpointConfig.getApiUrl()}txn-timeline`,
      txnFun,
      10,
    );
  }

  handleLocationChange = () => location => {
    if (location.pathname.startsWith('/v2/')) {
      this.updateStateAttributes({
        selectedValue: null,
        dialogOpen: false,
        currentMatch: null,
        stateLoading: false,
      });

      return;
    }

    if (location.pathname === '/' && this.selectedValue !== null) {
      this.updateStateAttributes({
        selectedValue: null,
        dialogOpen: false,
        currentMatch: null,
        stateLoading: false,
      });
    }

    if (location.pathname !== '/') {
      let pathMatch = matchPath(window.location.pathname, {
        path: '/:type/:id',
        exact: false,
        strict: false,
      });

      if (pathMatch) {
        if (pathMatch.params.type !== 'txns-by-prgid') {
          this.unsubscribeWebSocketTransactionsByProgramId();
        }

        this.updateStateAttributes({
          selectedValue: null,
          dialogOpen: false,
          currentMatch: pathMatch,
          stateLoading: true,
        });

        this.handleClickOpen(pathMatch.params.id, pathMatch.params.type)();
        this.updateStateAttributes({
          currentMatch: pathMatch,
          stateLoading: true,
        });
      }
    }
  };

  onEndpointChange() {
    if (this.ws !== null) {
      this.ws.close();
      this.ws = null;
    }

    this.getRemoteState(
      'globalStats',
      `${EndpointConfig.getApiUrl()}global-stats`,
    );
    this.getRemoteState(
      'clusterInfo',
      `${EndpointConfig.getApiUrl()}cluster-info`,
      null,
      null,
      this.parseClusterInfo,
    );
    this.updateBlocks();
    this.updateTxnStats();
    this.updateTransactions();

    const ws = new RobustWebSocket(EndpointConfig.getApiWebsocketUrl());
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({hello: 'world'}));
    });

    ws.addEventListener('message', event => {
      if (this.state.enabled) {
        this.onMessage(JSON.parse(event.data));
      }
    });

    this.ws = ws;
  }

  componentDidMount() {
    try {
      this.onEndpointChange();
    } catch (err) {
      console.error('onEndpointChange failed:', err);
    }

    if (!this.locationListener) {
      const locationListener = this.handleLocationChange();
      history.listen(locationListener);
      locationListener(window.location);

      this.locationListener = locationListener;
    }
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onMessage = data => {
    // console.log('m', data);

    if (!this.state.enabled) {
      return;
    }

    let type = data.t;

    if (type === 'blk') {
      this.addBlock(this.parseBlockMessage(data.m));
    }

    if (type === 'global-info') {
      this.updateStateAttributes({
        globalStats: JSON.parse(data.m),
      });
    }

    if (type === 'cluster-info') {
      let newAttributes = this.parseClusterInfo(JSON.parse(data.m));
      this.updateStateAttributes(newAttributes);
    }

    if (type === 'txns-by-prgid') {
      this.addTransactionByProgramId(this.parseTransactionMessage(data.m));
    }
  };

  parseBlockMessage(message) {
    let fields = message.split('#');

    return {
      t: 'blk',
      h: parseInt(fields[0]),
      l: fields[1],
      s: parseInt(fields[2]),
      dt: fields[3],
      id: fields[4],
    };
  }

  parseTransactionMessage(message) {
    let fields = message.split('#');

    let instructions = _.map(fields[6].split('|'), i => {
      let instParts = i.split('@');

      return {
        program_id: instParts[0],
        keys: instParts[1].split(','),
        data: instParts[2],
      };
    });

    return {
      t: 'txn',
      h: parseInt(fields[0]),
      l: fields[1],
      s: parseInt(fields[2]),
      dt: fields[3],
      entry_id: fields[4],
      id: fields[5],
      instructions,
    };
  }

  addBlock(block) {
    let blocks = [...this.state.blocks];

    if (blocks.length >= 10) {
      blocks.pop();
    }

    blocks.unshift(block);

    if (this.state.globalStats['!blk-last-slot'] < block.s) {
      this.updateSpecificGlobalStateAttribute('!blk-last-slot', block.s);
    }

    this.updateStateAttributes({blocks: blocks});
  }

  addTransactionByProgramId(txn) {
    let newValue = {...this.state.selectedValue};
    let newTxns = [...newValue.transactions];

    if (newTxns.length >= 100) {
      newTxns.pop();
    }

    newTxns.unshift(txn);
    newValue.transactions = newTxns;

    this.updateStateAttributes({selectedValue: newValue});
  }

  unsubscribeWebSocketTransactionsByProgramId() {
    if (
      !this.state.selectedValue ||
      this.state.selectedValue.t !== 'txns-by-prgid'
    ) {
      return;
    }

    let msg = JSON.stringify({
      action: 'unsubscribe',
      type: this.state.selectedValue.t,
      id: this.state.selectedValue.id,
    });

    console.log('unsubscribe ' + msg);
    this.ws.send(msg);
  }

  handleDialogClose = () => {
    console.log('dialog close');

    if (
      this.state.selectedValue &&
      this.state.selectedValue.t === 'txns-by-prgid'
    ) {
      this.unsubscribeWebSocketTransactionsByProgramId();
    }

    this.updateStateAttributes({
      selectedValue: null,
      dialogOpen: false,
      currentMatch: null,
      stateLoading: false,
    });

    history.push('/');
  };

  showMap = () => () => {
    history.push(`/map`);
  };

  toggleEnabled = self => event => {
    if (event.target.checked === self.state.enabled) {
      return;
    }

    this.updateStateAttributes({
      enabled: event.target.checked,
    });
  };

  setEndpointName = event => {
    EndpointConfig.setEndpointName(event.target.value);
    this.onEndpointChange();
    this.updateStateAttributes(this.defaultState);
  };

  handleSearch = () => event => {
    let value = event.target.value;
    event.target.value = '';

    if (value === null || value.length === 0) {
      return;
    }

    let url = `${EndpointConfig.getApiUrl()}search/${value}`;

    axios.get(url).then(response => {
      let result = response.data;
      history.push(`/${result.t}/${result.id}`);
    });
  };

  handleClickOpen = (value, type) => () => {
    const self = this;

    let mkUrl = (id, type) => {
      let url = null;

      if (type === 'txns-by-prgid') {
        url = `${EndpointConfig.getApiUrl()}txns-by-prgid/${id}`;
      }

      if (type === 'txn') {
        url = `${EndpointConfig.getApiUrl()}txn/${id}`;
      }

      if (type === 'ent') {
        url = `${EndpointConfig.getApiUrl()}ent/${id}`;
      }

      if (type === 'blk') {
        url = `${EndpointConfig.getApiUrl()}blk/${id}`;
      }

      return url;
    };

    let url = mkUrl(value, type);

    let updateState = async newVal => {
      if (type === 'txns-by-prgid') {
        let msg = JSON.stringify({
          action: 'subscribe',
          type: type,
          id: value,
        });

        console.log('subscribe', msg);
        while (self.ws.readyState !== WebSocket.OPEN) {
          console.log(
            'Waiting for ws.readyState to be OPEN (1): ',
            self.ws.readyState,
          );
          await sleep(250);
        }
        self.ws.send(msg);

        let txns = _(newVal)
          .map(v => this.parseTransactionMessage(v))
          .value();

        let newSelectedValue = {
          t: type,
          id: value,
          transactions: txns,
        };

        self.updateStateAttributes({
          selectedValue: newSelectedValue,
          dialogOpen: true,
          stateLoading: false,
        });
      } else {
        self.updateStateAttributes({
          selectedValue: newVal,
          dialogOpen: true,
          stateLoading: false,
        });
      }
    };

    axios
      .get(url)
      .then(response => updateState(response.data))
      .catch((resp, err) => {
        console.error('oops', resp, err);
      });
  };

  isV2() {
    return window.location.pathname.startsWith('/v2/');
  }

  renderV1() {
    let self = this;

    const leaderId = this.state.globalStats['!ent-last-leader'];

    return (
      <MuiThemeProvider theme={themeV1}>
        <Router history={history}>
          <CssBaseline />
          <div className="App">
            <BxAppBarThemed
              handleSearch={self.handleSearch(self)}
              enabled={this.state.enabled}
              handleSwitch={this.toggleEnabled(self)}
              handleSetEndpointName={this.setEndpointName}
              handleMap={this.showMap(self)}
            />
            <div>
              <Route
                path="/map"
                render={() => (
                  <BxDialogWorldMapThemed
                    open={true}
                    onClose={self.handleDialogClose}
                    nodes={this.state.nodes}
                    leaderId={leaderId}
                  />
                )}
              />
              <Route
                path="/txn/:id"
                exact
                render={() => (
                  <BxDialogThemed
                    selectedValue={self.state.selectedValue}
                    open={self.state.dialogOpen}
                    onClose={self.handleDialogClose}
                  />
                )}
              />
              <Route
                path="/blk/:id"
                exact
                render={() => (
                  <BxDialogThemed
                    selectedValue={self.state.selectedValue}
                    open={self.state.dialogOpen}
                    onClose={self.handleDialogClose}
                  />
                )}
              />
              <Route
                path="/ent/:id"
                exact
                render={() => (
                  <BxDialogThemed
                    selectedValue={self.state.selectedValue}
                    open={self.state.dialogOpen}
                    onClose={self.handleDialogClose}
                  />
                )}
              />
              <Route
                path="/txns-by-prgid/:id"
                exact
                render={() => (
                  <BxDialogTransactionsThemed
                    selectedValue={self.state.selectedValue}
                    open={self.state.dialogOpen}
                    onClose={self.handleDialogClose}
                  />
                )}
              />
            </div>
            <p />
            <BxStatsTableThemed
              globalStats={this.state.globalStats}
              nodeCount={this.state.nodes.length}
              feeCalculator={this.state.feeCalculator}
            />
            <p />
            <BxTransactionChartThemed txnStats={this.state.txnStats} />
            <p />
            <Grid container spacing={1} justify="center">
              <Grid item style={{width: '1460px'}}>
                <BxDataTableThemed
                  dataType="blk"
                  dataItems={this.state.blocks}
                />
              </Grid>
            </Grid>
            <p />
            <Grid container spacing={1} justify="center">
              <Grid item style={{width: '1460px'}}>
                <BxDataTableThemed
                  dataType="txn"
                  dataItems={this.state.transactions}
                />
              </Grid>
            </Grid>
            <p />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

  renderV2() {
    let self = this;

    return (
      <MuiThemeProvider theme={themeV2}>
        <Router history={history}>
          <CssBaseline />
          <div className="App">
            <Bx2AppBarThemed
              handleSearch={self.handleSearch(self)}
              enabled={this.state.enabled}
              handleSwitch={this.toggleEnabled(self)}
              handleMap={this.showMap(self)}
            />
            <Bx2NavDrawerThemed />
            <div>
              <Route
                path="/v2/browse"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Browse" />
                )}
              />
              <Route
                path="/v2/transactions"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Transactions" />
                )}
              />
              <Route
                path="/v2/validators-overview"
                exact
                render={() => (
                  <Bx2PanelValidatorsOverviewThemed
                    nodes={this.state.nodes}
                    supply={this.state.supply || 0}
                  />
                )}
              />
              <Route
                path="/v2/validators"
                exact
                render={() => (
                  <Bx2PanelValidatorsThemed nodes={this.state.nodes} />
                )}
              />
              <Route
                path="/v2/validator/:id"
                exact
                render={({match}) => (
                  <Bx2PanelValidatorDetailThemed
                    nodes={this.state.nodes}
                    id={match.params.id}
                  />
                )}
              />
              <Route
                path="/v2/tourdesol"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Tour De Sol" />
                )}
              />
              <Route
                path="/v2/applications"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Applications" />
                )}
              />
              <Route
                path="/v2/blocks"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Blocks" />
                )}
              />
              <Route
                path="/v2/favorites"
                exact
                render={() => (
                  <Bx2BlankComponentThemed message="Hello Favorites" />
                )}
              />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

  render() {
    return this.isV2() ? this.renderV2() : this.renderV1();
  }
}

export default App;
