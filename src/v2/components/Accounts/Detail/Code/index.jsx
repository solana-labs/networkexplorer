// @flow
import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';
import {observer} from 'mobx-react-lite';
import YAML from 'yaml';

import useStyles from './styles';

const AccountCode = ({accountView}: {accountView: Object}) => {
  const classes = useStyles();
  const applicationCode = YAML.stringify(accountView);

  return (
    <div>
      <div className={classes.header}>
        <CopyBtn text={applicationCode} />
        <HelpLink text="" term="" />
      </div>
      <div className={classes.code}>
        <code>
          <code>{applicationCode}</code>
        </code>
      </div>
    </div>
  );
};

export default observer(AccountCode);
