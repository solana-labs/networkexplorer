import React from 'react';
import BxDateTime from './BxDateTime';
import BxEntityLink from './BxEntityLink';
import BxHelpLink from './BxHelpLink';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class BxDataTable extends React.Component {
  renderBlocks() {
    const {dataItems} = this.props;

    return (
      <Paper>
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
          Latest Blocks
          <BxHelpLink text="Block" term="block" />
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Block ID
                <BxHelpLink text="Block ID" term="block" />
              </TableCell>
              <TableCell align="right">
                Block Height
                <BxHelpLink text="Block Height" term="block-height" />
              </TableCell>
              <TableCell align="right">Timestamp (approx)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(dataItems, row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <BxEntityLink blk={row.id} />
                </TableCell>
                <TableCell align="right">{row.s}</TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={row.dt} local />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  renderEntries() {
    const {dataItems} = this.props;

    return (
      <Paper>
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
          Latest Entries
          <BxHelpLink text="Entry" term="entry" />
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Entry ID
                <BxHelpLink text="Entry ID" term="entry" />
              </TableCell>
              <TableCell align="right">
                Block Height
                <BxHelpLink text="Block Height" term="block-height" />
              </TableCell>
              <TableCell align="right">
                Tick Height
                <BxHelpLink text="Tick Height" term="tick-height" />
              </TableCell>
              <TableCell align="right">
                Transaction Count
                <BxHelpLink text="Transaction" term="transaction" />
              </TableCell>
              <TableCell align="right">Timestamp (approx)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(dataItems, row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <BxEntityLink ent={row.id} />
                </TableCell>
                <TableCell align="right">{row.s}</TableCell>
                <TableCell align="right">{row.h}</TableCell>
                <TableCell align="right">{row.txn_count}</TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={row.dt} local />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  renderTransactions() {
    const {dataItems} = this.props;

    return (
      <Paper>
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left'}}>
          Sample Transactions (updated every 10s)
          <BxHelpLink text="Transaction" term="transaction" />
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Transaction ID
                <BxHelpLink text="Transaction" term="transaction" />
              </TableCell>
              <TableCell align="right">
                Block Height
                <BxHelpLink text="Block Height" term="block-height" />
              </TableCell>
              <TableCell align="right">Timestamp (approx)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(dataItems, row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <BxEntityLink txn={row.id} />
                </TableCell>
                <TableCell align="right">{row.s}</TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={row.dt} local />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  render() {
    const {dataType} = this.props;

    if (dataType === 'blk') {
      return this.renderBlocks();
    }

    if (dataType === 'ent') {
      return this.renderEntries();
    }

    if (dataType === 'txn') {
      return this.renderTransactions();
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

export default BxDataTable;
