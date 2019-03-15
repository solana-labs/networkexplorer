import React from 'react';
import BxDataTable from './BxDataTable';
import CloseIcon from '@material-ui/icons/Close';
import debounceRender from 'react-debounce-render';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const location = window.location.href;

class BxDialogTransactions extends React.Component {
  renderTable() {
    const {selectedValue} = this.props;

    if (selectedValue && selectedValue.transactions && selectedValue.transactions.length) {
      return (<BxDataTable dataType="txn" dataItems={selectedValue.transactions} onClose={this.handleClose} noTitle/>);
    } else {
      return (<Typography>No Transactions. Yet.</Typography>);
    }
  }

  render() {
    const {classes, selectedValue, onClose, ...other} = this.props;
    let value = selectedValue || {};
    let url = location;

    if (value.t === 'txns-by-prgid') {
      url = url + 'txns-by-prgid/' + value.id;
    }

    return (
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" fullWidth={true} maxWidth={'xl'} {...other}>
        <DialogTitle id="simple-dialog-title" title={JSON.stringify(value)}>
          Transactions for Program ID: {value.id}
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">QR Code:</TableCell>
                <TableCell align="right" title={url}>
                  <QRCode value={url} style={{width: '120px', height: '120px'}}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {
            this.renderTable()
          }
        </Paper>
      </Dialog>
    );
  }
}

BxDialogTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.object,
};

export default debounceRender(BxDialogTransactions, 250, { leading: false });