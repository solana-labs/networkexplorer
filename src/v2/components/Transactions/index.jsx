// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TransactionsTimelineStore from 'v2/stores/transactions/timeline';
import {Link, Match} from 'react-router-dom';

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

  const nav = (
    <div className={classes.nav}>
      {prev && (
        <Link to={`/transactions/timeline/${prev}`}>
          <NavigateBeforeIcon />
        </Link>
      )}
      {next && (
        <Link to={`/transactions/timeline/${next}`}>
          <NavigateNextIcon />
        </Link>
      )}
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Transactions">
        <HelpLink text="" term="" />
        <div className={classes.total}>{transactionCount}</div>
      </SectionHeader>
      {nav}
      <Table transactions={transactions} />
      {nav}
    </Container>
  );
};

export default observer(TransactionsPage);
