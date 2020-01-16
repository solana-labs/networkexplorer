import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {Button} from '@material-ui/core';
import {Bar} from '@nivo/bar';

import BxEntityLink from './Bx2EntityLink';
import BxHelpLink from './Bx2HelpLink';
import BxValidatorIdentity from './Bx2ValidatorIdentity';

class Bx2PanelTourDeSolLeaderboard extends Component {
  renderValidators() {
    const {nodes, currentBlock} = this.props;

    // eslint-disable-next-line no-restricted-properties
    const totalSupplySOL = (this.props.supply / Math.pow(2, 34)).toFixed(2);

    const totalSupply = this.props.supply;

    const stakedSupply = _.reduce(
      nodes,
      (a, n) => {
        if (n && n.voteAccount && n.voteAccount.stake) {
          a += n.voteAccount.stake;
        }

        return a;
      },
      0,
    );

    const stakedPercentage = ((stakedSupply / totalSupply) * 100.0).toFixed(2);

    const DEFAULT_STAGE_LENGTH_BLOCKS = (7 * 24 * 60 * 60) / 0.8;
    const PROLOGUE_LENGTH_BLOCKS = DEFAULT_STAGE_LENGTH_BLOCKS / 3;

    let i = 0;

    let stages = _.map(
      [
        {title: 'Prologue', is_prologue: true},
        {title: 'Stage 1', is_prologue: false},
        {title: 'Stage 2 (preamble)', is_prologue: true},
        {title: 'Stage 2', is_prologue: false},
        {title: 'Stage 3 (preamble)', is_prologue: true},
        {title: 'Stage 3', is_prologue: false},
      ],
      v => {
        v.start_height = i;
        v.end_height =
          i +
          (v.is_prologue
            ? PROLOGUE_LENGTH_BLOCKS
            : DEFAULT_STAGE_LENGTH_BLOCKS) -
          1;
        i = v.end_height + 1;

        return v;
      },
    );

    function getIndicator(x) {
      if (x.start_height <= currentBlock && x.end_height > currentBlock) {
        return 'LIVE!';
      } else if (x.start_height > currentBlock) {
        return 'Coming Soon!';
      } else {
        return 'Finished.';
      }
    }

    return (
      <div style={{marginLeft: 240, marginRight: 80}}>
        <div style={{marginTop: 60, whiteSpace: 'preserve'}}>
          <code>Current Block: {currentBlock}</code>
          <br />
          <ul>
            {_.map(
              _.filter(stages, x => !x.is_prologue),
              x => (
                <li key={x.title}>
                  <Button>
                    {x.title} : block {x.start_height} to {x.end_height} =>{' '}
                    {getIndicator(x)}
                  </Button>
                </li>
              ),
            )}
          </ul>
        </div>
        <p />
        <div>
          {/*
           * STYLING NOTE: this link appears to have custom BarComponent styling
           *
           * https://nivo.rocks/storybook/?path=/story/bar-race-chart--demo
           *
           */}
          <Bar
            width={800}
            height={400}
            layout="horizontal"
            margin={{top: 26, right: 120, bottom: 26, left: 60}}
            data={_.map(nodes, x => {
              return {
                id: x.pubkey,
                value: (x.voteAccount && x.voteAccount.stake) || 0,
              };
            })}
            keys={['value']}
            colors={{scheme: 'blue_green'}}
            colorBy="indexValue"
          />
        </div>
        <p />
        <div>
          <Grid container justify="center" spacing={1} className="sideBySide">
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Stage Duration Blocks
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    TODO
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Days Left In Stage
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    TODO
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Total SOL in Circulation
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    {totalSupplySOL} SOL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Total Staked Tokens
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    {stakedSupply + ' Lamports'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Current Network Inflation Rate
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    TODO
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    # Active Validators
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    {this.props.nodes.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    # Inactive Validators
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    TODO
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    Circulating Supply Staked
                    <BxHelpLink text="Leader" term="leader" />
                  </Typography>
                  <Typography component="p" align="center">
                    <span title={stakedSupply + ' Lamports'}>
                      {stakedPercentage}%
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Paper style={{marginTop: 10, marginLeft: 240}}>
          <Typography
            variant="h6"
            id="tableTitle"
            style={{textAlign: 'left', padding: '16px'}}
          >
            Active Validators {this.props.nodes.length}
            <BxHelpLink text="Transaction" term="transaction" />
            <br />
            <Link component={RouterLink} to={'/v2/validators'}>
              See All
            </Link>
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div>
                    Node Pubkey
                    <BxHelpLink text="Transaction" term="transaction" />
                  </div>
                  <div>
                    Vote Pubkey
                    <BxHelpLink text="Account" term="account" />
                  </div>
                </TableCell>
                <TableCell align="right">
                  Stake
                  <BxHelpLink text="Program" term="program-id" />
                </TableCell>
                <TableCell align="center">Identity</TableCell>
                <TableCell align="right">
                  Uptime
                  <BxHelpLink text="Block Height" term="block-height" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(nodes, row => (
                <TableRow key={row.pubkey}>
                  <TableCell
                    component="th"
                    scope="row"
                    title={JSON.stringify(row, null, 2)}
                  >
                    <BxEntityLink validator_id={row.pubkey} />
                    <br />
                    <BxEntityLink
                      prg_id={row.voteAccount && row.voteAccount.votePubkey}
                    />
                  </TableCell>
                  <TableCell align="right" style={{verticalAlign: 'middle'}}>
                    {(row.voteAccount && row.voteAccount.stake) || 0} Lamports
                  </TableCell>
                  <TableCell align="center" style={{verticalAlign: 'middle'}}>
                    <BxValidatorIdentity identity={row.identity} />
                  </TableCell>
                  <TableCell align="right">
                    {(row.uptime &&
                      row.uptime.uptime &&
                      row.uptime.uptime[0] &&
                      (row.uptime.uptime[0].percentage * 100.0).toFixed(4)) ||
                      0.0}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  render() {
    const {nodes} = this.props;

    if (nodes) {
      return this.renderValidators();
    }

    return (
      <Paper>
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
          (ERROR - No data.)
        </Typography>
      </Paper>
    );
  }
}

Bx2PanelTourDeSolLeaderboard.propTypes = {
  nodes: PropTypes.array.isRequired,
  supply: PropTypes.number.isRequired,
  currentBlock: PropTypes.number.isRequired,
};

export default Bx2PanelTourDeSolLeaderboard;
