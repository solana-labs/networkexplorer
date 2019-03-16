import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

class BxEntityLink extends React.Component {
    renderNode() {
        return (
            <code title={this.props.node}>{this.props.node.substring(0, 22) + "\u2026"}</code>
        );
    }

    renderBlock() {
        return (
            <Link component={RouterLink} to={"/blk/" + this.props.blk} color="secondary">
                <code title={this.props.blk}>{this.props.blk}</code>
            </Link>
        );
    }

    renderEntry() {
        return (
            <Link component={RouterLink} to={"/ent/" + this.props.ent} color="secondary">
                <code title={this.props.ent}>{this.props.ent}</code>
            </Link>
        );
    }

    renderTransaction() {
        return (
            <Link component={RouterLink} to={"/txn/" + this.props.txn} color="secondary">
                <code title={this.props.txn}>{this.props.txn}</code>
            </Link>
        );
    }

    renderAccountId() {
        return (
          <code title={this.props.acct_id}>{this.props.acct_id.substring(0, 22) + (this.props.acct_id.length > 22 ? "\u2026" : "")}</code>
        );
    }

    renderProgramId() {
        return (
          <Link component={RouterLink} to={"/txns-by-prgid/" + this.props.prg_id} color="secondary">
              <code title={this.props.prg_id}>{this.props.prg_id.substring(0, 22) + (this.props.prg_id.length > 22 ? "\u2026" : "")}</code>
          </Link>
        );
    }

    render() {
        const {node, ent, blk, txn, acct_id, prg_id} = this.props;

        if (node) {
            return this.renderNode();
        }

        if (ent) {
            return this.renderEntry();
        }

        if (blk) {
            return this.renderBlock();
        }

        if (txn) {
            return this.renderTransaction();
        }

        if (acct_id) {
            return this.renderAccountId();
        }

        if (prg_id) {
            return this.renderProgramId();
        }

        return (
            <span>unknown entity</span>
        );
    }
}

export default BxEntityLink;
