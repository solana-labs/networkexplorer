import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import NodesStore from 'v2/stores/nodes';
import SectionHeader from 'v2/components/UI/SectionHeader';

import ValidatorsTable from '../Table';
import useStyles from './styles';

const ValidatorsAll = () => {
  const {validators, inactiveValidators} = NodesStore;
  const classes = useStyles();
  return (
    <Container>
      <SectionHeader title="Validators">
        <div className={classes.total}>
          {validators.length + inactiveValidators.length}
        </div>
      </SectionHeader>
      <ValidatorsTable separate />
    </Container>
  );
};

export default observer(ValidatorsAll);
