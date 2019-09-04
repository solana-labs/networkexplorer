// @flow
import React from 'react';
import {Link, Tooltip} from '@material-ui/core';
import {testnetDefaultChannel} from '@solana/web3.js/package.json';

import useStyles from './styles';

const BOOK_VERSION = testnetDefaultChannel === 'edge' ? 'book-edge' : 'book';

const HelpLink = ({text, term}: {text: string, term: string}) => {
  const classes = useStyles();
  return (
    <Tooltip
      classes={{tooltip: classes.tooltip}}
      placement="top"
      title={'Click for more info about: ' + text}
    >
      <Link
        className={classes.link}
        href={`https://solana-labs.github.io/${BOOK_VERSION}/terminology.html#${term}`}
        target="_new"
      >
        ?
      </Link>
    </Tooltip>
  );
};

export default HelpLink;
