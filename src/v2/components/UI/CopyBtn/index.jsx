// @flow
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ReactComponent as CopyIcon} from 'v2/assets/icons/copy.svg';

import useStyles from './styles';

const CopyBtn = ({text}: {text: string | number}) => {
  const classes = useStyles();
  return (
    <CopyToClipboard text={text}>
      <div className={classes.root}>
        <CopyIcon />
      </div>
    </CopyToClipboard>
  );
};

export default CopyBtn;
