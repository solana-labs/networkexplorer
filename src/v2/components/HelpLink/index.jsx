// @flow
import React from 'react';
import Link from '@material-ui/core/Link';
import {testnetDefaultChannel} from '@solana/web3.js/package.json';

import useStyles from './styles';

const BOOK_VERSION = testnetDefaultChannel === 'edge' ? 'book-edge' : 'book';

const HelpLink = ({text, term}: {text: string, term: string}) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.link}
      href={`https://solana-labs.github.io/${BOOK_VERSION}/terminology.html#${term}`}
      title={'Click for more info about: ' + text}
      target="_new"
    >
      ?
    </Link>
  );
};

export default HelpLink;
