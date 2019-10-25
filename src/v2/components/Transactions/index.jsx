// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {Match} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TransactionsTimelineStore from 'v2/stores/transactions/timeline';
import CTypography from 'v2/components/UI/CTypography';
import formatNum from 'v2/utils/formatNum';
import TableNav from 'v2/components/UI/TableNav';

import Table from './Table';
import useStyles from './styles';

const TransactionsPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    transactions,
    transactionCount,
    start,
    next,
    prev,
  } = TransactionsTimelineStore;

  if (start !== match.params.start) {
    TransactionsTimelineStore.init({start: match.params.start});
  }

  return (
    <Container>
      <SectionHeader title="Recent Transactions">
        <HelpLink text="" term="" />
        <CTypography type="caption" className={classes.total}>
          {formatNum(transactionCount)}
        </CTypography>
      </SectionHeader>
      <TableNav
        prev={`/transactions/timeline/${prev}`}
        next={`/transactions/timeline/${next}`}
      />
      <Table transactions={transactions} />
      <TableNav
        prev={`/transactions/timeline/${prev}`}
        next={`/transactions/timeline/${next}`}
      />
    </Container>
  );
};

export default observer(TransactionsPage);
