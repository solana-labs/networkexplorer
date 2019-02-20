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
            <Link component={RouterLink} to={"/blk/" + this.props.blk}>
                <code title={this.props.blk}>{this.props.blk}</code>
            </Link>
        );
    }

    renderEntry() {
        return (
            <Link component={RouterLink} to={"/ent/" + this.props.ent}>
                <code title={this.props.ent}>{this.props.ent}</code>
            </Link>
        );
    }

    renderTransaction() {
        return (
            <Link component={RouterLink} to={"/txn/" + this.props.txn}>
                <code title={this.props.txn}>{this.props.txn}</code>
            </Link>
        );
    }

    render() {
        const {node, ent, blk, txn} = this.props;

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

        return (
            <span>unknown entity</span>
        );
    }
}

export default BxEntityLink;
