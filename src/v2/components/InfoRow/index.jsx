import React from 'react';
import HelpLink from 'v2/components/HelpLink';

import useStyles from './styles';

const InfoRow = ({label, value, term, text}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        {label}
        <HelpLink term={term} text={text} />
      </div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default InfoRow;
