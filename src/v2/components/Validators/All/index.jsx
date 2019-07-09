import {Container} from '@material-ui/core';
import React from 'react';

import ValidatorsTable from '../Table';

const ValidatorsAll = () => {
  return (
    <Container>
      <ValidatorsTable vertical />
    </Container>
  );
};

export default ValidatorsAll;
