import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import PropTypes from 'prop-types';

import BxEntityLink from './Bx2EntityLink';
import BxHelpLink from './Bx2HelpLink';
import BxValidatorIdentity from './Bx2ValidatorIdentity';

class Bx2PanelValidators extends React.Component {
  renderValidators() {
    const {nodes} = this.props;

    return (
      <Paper style={{margin: 180, marginLeft: 240}}>
        <Typography
          variant="h6"
          id="tableTitle"
          style={{textAlign: 'left', padding: '16px'}}
        >
          Validators
          <BxHelpLink text="Transaction" term="transaction" />
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
              <TableCell align="center">
                Commission
                <BxHelpLink text="Block Height" term="block-height" />
              </TableCell>
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
                  <BxValidatorIdentity info={row.info} />
                </TableCell>
                <TableCell align="center">TODO</TableCell>
                <TableCell align="right">TODO</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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

Bx2PanelValidators.propTypes = {
  nodes: PropTypes.array.isRequired,
};

export default Bx2PanelValidators;
