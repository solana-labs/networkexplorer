import React from 'react';
import BxDateTime from './BxDateTime';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BxEntityLink from './BxEntityLink';

const location = window.location.href;

class BxDialog extends React.Component {
  render() {
    const {classes, selectedValue, onClose, ...other} = this.props;

    let value = selectedValue || {};
    let title = null;
    let url = location;
    let rows = [];

    rows.push(['Slot #', value.s]);

    if (value.t === 'txn') {
      title = 'Transaction';
      url = url + 'txn/' + value.id;
    }

    if (value.t === 'blk') {
      title = 'Block';
      url = url + 'blk/' + value.id;
    }

    if (value.t === 'ent') {
      title = 'Entry';
      url = url + 'ent/' + value.id;
    }

    let block_id =
      (value.t === 'blk' && value.id) ||
      (value.block && value.block.id) ||
      '<pending>';

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
        {...other}
      >
        <DialogTitle id="simple-dialog-title" title={JSON.stringify(value)}>
          {title} Detail
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  QR Code:
                </TableCell>
                <TableCell align="right" title={url}>
                  <QRCode
                    value={url}
                    style={{width: '120px', height: '120px'}}
                  />
                </TableCell>
              </TableRow>
              {value.t === 'txn' && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    Transaction ID:
                  </TableCell>
                  <TableCell align="right" title={url}>
                    <BxEntityLink txn={value.id} />
                  </TableCell>
                </TableRow>
              )}
              {value.t === 'txn' && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    Program ID:
                  </TableCell>
                  <TableCell align="right">
                    <BxEntityLink
                      prg_id={value.data.instructions[0].program_id}
                    />
                  </TableCell>
                </TableRow>
              )}
              {value.t === 'txn' && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    Account ID(s):
                  </TableCell>
                  <TableCell align="right">
                    {value.data.instructions[0].keys.map(key => (
                      <span key={key}>
                        <BxEntityLink acct_id={key} />
                        <span> </span>
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              {/*{value.t !== 'blk' && (*/}
              {/*<TableRow>*/}
              {/*<TableCell component="th" scope="row">Entry ID:</TableCell>*/}
              {/*<TableCell align="right" title={url}>*/}
              {/*<BxEntityLink ent={entry_id}/>*/}
              {/*</TableCell>*/}
              {/*</TableRow>*/}
              {/*)}*/}
              <TableRow>
                <TableCell component="th" scope="row">
                  Block ID:
                </TableCell>
                <TableCell align="right" title={url}>
                  <BxEntityLink blk={block_id} />
                </TableCell>
              </TableRow>
              {/*{value.t === 'blk' && (*/}
              {/*<TableRow>*/}
              {/*<TableCell component="th" scope="row">Entries:</TableCell>*/}
              {/*<TableCell align="right" title={url}>*/}
              {/*{*/}
              {/*value.entries.map(key => (*/}
              {/*<span key={key}>*/}
              {/*<BxEntityLink ent={key}/>*/}
              {/*<span> </span>*/}
              {/*</span>*/}
              {/*))*/}
              {/*}*/}
              {/*</TableCell>*/}
              {/*</TableRow>*/}
              {/*)}*/}
              {rows.map(row => (
                <TableRow key={JSON.stringify(row)}>
                  <TableCell component="th" scope="row">
                    {row[0]}:
                  </TableCell>
                  <TableCell align="right" title={row[2]}>
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  Timestamp (approx):
                </TableCell>
                <TableCell align="right">
                  <BxDateTime dateTime={value.dt} local />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{verticalAlign: 'top'}}
                >
                  Raw Data:
                </TableCell>
                <TableCell
                  align="left"
                  title={url}
                  style={{
                    fontFamily: '"Roboto Mono", monospace',
                    whiteSpace: 'pre',
                  }}
                >
                  {JSON.stringify(value, null, 2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Dialog>
    );
  }
}

BxDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.object,
};

export default BxDialog;
