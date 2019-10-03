// @flow
import React from 'react';
import {withSnackbar, WithSnackbarProps} from 'notistack';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ReactComponent as CopyIcon} from 'v2/assets/icons/copy.svg';

import useStyles from './styles';

const CopyBtn = ({
  text,
  enqueueSnackbar,
}: {text: string | number} & WithSnackbarProps) => {
  const classes = useStyles();
  const onCopy = () => {
    enqueueSnackbar('Successfully copied to clipboard', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <div className={classes.root}>
        <CopyIcon />
      </div>
    </CopyToClipboard>
  );
};

export default withSnackbar(CopyBtn);
