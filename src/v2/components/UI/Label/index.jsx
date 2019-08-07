// @flow
import React from 'react';
import HelpLink from 'v2/components/HelpLink';

import useStyles from './styles';

const Label = ({text, hint}: {text: string, hint: string}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.text}>{text}</div>
      <HelpLink text={hint} term="" />
    </div>
  );
};

export default Label;
