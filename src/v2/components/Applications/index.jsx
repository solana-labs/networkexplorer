import {Container} from '@material-ui/core';
import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import Table from './Table';

import useStyles from './styles';

const ApplicationsPage = () => {
  const classes = useStyles();
  return (
    <Container>
      <SectionHeader title="Applications">
        <HelpLink text="" term="" />
        <div className={classes.totalBlocks}>234,654</div>
      </SectionHeader>
      <Table />
    </Container>
  );
};

export default ApplicationsPage;
