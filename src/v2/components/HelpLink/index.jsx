// @flow
import React, {forwardRef} from 'react';
import {Link, Tooltip} from '@material-ui/core';
import {testnetDefaultChannel} from '@solana/web3.js/package.json';

import useStyles from './styles';

const BOOK_VERSION = testnetDefaultChannel === 'edge' ? 'book-edge' : 'book';

const HelpLink = forwardRef(
  ({text = '', term = ''}: {text: string, term: string}, ref) => {
    const classes = useStyles();
    return (
      <Tooltip
        classes={{tooltip: classes.tooltip}}
        placement="top"
        title={text}
        ref={ref}
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
  },
);

export default HelpLink;
