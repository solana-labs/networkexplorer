// @flow
import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';
import {observer} from 'mobx-react-lite';
import YAML from 'yaml';

import useStyles from './styles';

const AccountCode = ({accountView}: {accountView: Object}) => {
  const classes = useStyles();
  const accountCode = YAML.stringify(accountView);

  return (
    <div>
      <div className={classes.header}>
        <CopyBtn text={accountCode} />
        <HelpLink text="" term="" />
      </div>
      <div className={classes.code}>
        <code>
          <code>{accountCode}</code>
        </code>
      </div>
    </div>
  );
};

export default observer(AccountCode);
