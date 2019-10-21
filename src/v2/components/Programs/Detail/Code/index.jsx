import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import CopyBtn from 'v2/components/UI/CopyBtn';
import {observer} from 'mobx-react-lite';
import useStyles from './styles';
import YAML from 'yaml';

const ProgramCode = ({programView}: {programView: Object}) => {
  const classes = useStyles();
  const programCode = YAML.stringify(programView);

  return (
    <div>
      <div className={classes.header}>
        <CopyBtn text={programCode} />
        <HelpLink text="" term="" />
      </div>
      <div className={classes.code}>
        <code>
          <code>{programCode}</code>
        </code>
      </div>
    </div>
  );
};

export default observer(ProgramCode);
