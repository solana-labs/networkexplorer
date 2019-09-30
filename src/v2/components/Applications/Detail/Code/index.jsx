import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';
import {observer} from 'mobx-react-lite';
import useStyles from './styles';
import YAML from 'yaml';

const ApplicationCode = ({applicationView}: {applicationView: Object}) => {
  const classes = useStyles();
  const applicationCode = YAML.stringify(applicationView);

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

export default observer(ApplicationCode);
