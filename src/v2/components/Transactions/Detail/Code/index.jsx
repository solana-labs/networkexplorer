import React from 'react';
import YAML from 'yaml';

import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';

import useStyles from './styles';

const TransactionCode = ({transactionView}: {transactionView: Object}) => {
  const classes = useStyles();
  const transactionCode = YAML.stringify(transactionView);

  return (
    <div>
      <div className={classes.header}>
        <CopyBtn text={transactionCode} />
        <HelpLink text="" term="" />
      </div>
      <div className={classes.code}>
        <code>{transactionCode}</code>
      </div>
    </div>
  );
};

export default TransactionCode;
