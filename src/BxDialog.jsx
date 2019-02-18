import React from "react";
import BxDateTime from "./BxDateTime";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import QRCode from 'qrcode.react';
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const location = window.location.href;

class BxDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        let value = selectedValue || {};
        let title = null;
        let url = location;
        let rows = [];

        if (value.t !== "blk") {
            rows.push(["Block ID", value.block_id || (value.block && value.block.id) || "<pending>"]);
        }

        rows.push(["Slot #", value.s]);
        rows.push(["Tick #", value.h]);

        rows.push(["Timestamp (approx)", BxDateTime.formatDateTime(value.dt), value.dt]);

        if (value.t === "txn") {
            title = "Transaction";
            url = url + "txn/" + value.id;

            // TODO: transaction/instruction attributes
            // rows.push(["Signature(s)", value.instructions[0].signatures.join(", ")]);
            // rows.push(["Program ID(s)", value.instructions[0].program_id]);
            // rows.push(["Account(s)", value.instructions[0].keys.join(", ")]);
        }

        if (value.t === "blk") {
            title = "Block";
            url = url + "blk/" + value.id;
            rows.push(["Entries", value.entries.join(", ")]);
        }

        if (value.t === "ent") {
            title = "Entry";
            url = url + "ent/" + value.id;
            rows.push(["Transaction(s)", value.transactions.join(", ")]);
        }

        rows.unshift([title + " ID", value.id]);

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" fullWidth={true} maxWidth={"lg"} {...other}>
                <DialogTitle id="simple-dialog-title" title={JSON.stringify(value)}>{title} Detail</DialogTitle>
                <Paper>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">QR Code:</TableCell>
                                <TableCell align="right" title={url}>
                                    <QRCode value={url} style={{ width: "120px", height: "120px" }} />
                                </TableCell>
                            </TableRow>
                            {rows.map(row => (
                                <TableRow key={JSON.stringify(row)}>
                                    <TableCell component="th" scope="row">{row[0]}:</TableCell>
                                    <TableCell align="right" title={row[2]}>{row[1]}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell component="th" scope="row">Raw Data:</TableCell>
                                <TableCell align="right" title={url}>
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