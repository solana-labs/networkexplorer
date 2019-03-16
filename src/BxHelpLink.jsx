import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';
import { testnetDefaultChannel } from '@solana/web3.js/package.json';

const BOOK_VERSION = (testnetDefaultChannel === 'edge') ? 'book-edge' : 'book';

class BxHelpLink extends React.Component {
  render() {
    const { text, term } = this.props;
    return (
        <Link
          href={`https://solana-labs.github.io/${BOOK_VERSION}/terminology.html#${term}`}
          target="_new"
        >
          <InfoIcon fontSize="small" color="disabled" style={{padding:"5px", verticalAlign:'middle'}} />
        </Link>
    );
  }
}

export default BxHelpLink;
