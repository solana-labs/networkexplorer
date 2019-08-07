// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';

import Table from './Table';
import useStyles from './styles';

const TransactionsPage = () => {
  const classes = useStyles();
  return (
    <Container>
      <SectionHeader title="Transactions">
        <HelpLink text="" term="" />
        <div className={classes.total}>234,654</div>
      </SectionHeader>
      <Table />
    </Container>
  );
};

export default TransactionsPage;
