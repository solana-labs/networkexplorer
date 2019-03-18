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
        <Typography variant="h6" id="tableTitle" style={{textAlign: 'left', padding:"16px"}}>
          Latest Blocks
          <BxHelpLink text="Block" term="block"/>
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Block ID
                <BxHelpLink text="Block ID" term="block"/>
              </TableCell>
              <TableCell align="center">
                Block Height
                <BxHelpLink text="Block Height" term="block-height"/>
              </TableCell>
              <TableCell align="right">Timestamp (approx)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(dataItems, row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <BxEntityLink blk={row.id}/>
                </TableCell>
                <TableCell align="center">{row.s}</TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={row.dt} local/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  renderTransactions() {
    const {dataItems, noTitle} = this.props;

    return (
      <Paper>
        {!noTitle && (
          <Typography variant="h6" id="tableTitle" style={{textAlign: 'left', padding:"16px"}}>
            Transactions
            <BxHelpLink text="Transaction" term="transaction"/>
          </Typography>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <div>
                  Transaction ID
                  <BxHelpLink text="Transaction" term="transaction"/>
                </div>
                <div>
                  Account ID(s)
                  <BxHelpLink text="Account" term="account"/>
                </div>
              </TableCell>
              <TableCell>
                Program ID
                <BxHelpLink text="Program" term="program-id"/>
              </TableCell>
              <TableCell align="center">
                Block Height
                <BxHelpLink text="Block Height" term="block-height"/>
              </TableCell>
              <TableCell align="right">Timestamp (approx)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(dataItems, row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <BxEntityLink txn={row.id}/>
                  <br/>
                  {_.map(row.keys, key => (
                    <span key={key}>
                      <BxEntityLink acct_id={key}/>
                      <span> </span>
                    </span>
                  ))}
                </TableCell>
                <TableCell align="right" style={{verticalAlign:"middle"}}>
                  <BxEntityLink prg_id={row.program_id}/>
                  <br/>
                  <span>&nbsp;</span> 
                </TableCell>
                <TableCell align="center">
                  {row.s}
                  <br/>
                  <span>&nbsp;</span> 
                </TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={row.dt} local/>
                  <br/>
                  <span>&nbsp;</span> 
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
