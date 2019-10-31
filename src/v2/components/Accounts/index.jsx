// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import AccountsTimelineStore from 'v2/stores/accounts/timeline';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';
import {Match} from 'react-router-dom';
import TableNav from 'v2/components/UI/TableNav';

import Table from './Table';
import useStyles from './styles';

const AccountsPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {accounts, accountCount, start, next, prev} = AccountsTimelineStore;

  if (start !== match.params.start) {
    AccountsTimelineStore.init({start: match.params.start});
  }

  return (
    <Container>
      <SectionHeader title="Recently Active Accounts">
        <HelpLink text="" term="" />
        <CTypography type="caption" className={classes.total}>
          {formatNum(accountCount)}
        </CTypography>
      </SectionHeader>
      <TableNav baseUrl={'/accounts/timeline/'} prev={prev} next={next} />
      <Table accounts={accounts} />
      <TableNav baseUrl={'/accounts/timeline/'} prev={prev} next={next} />
    </Container>
  );
};

export default observer(AccountsPage);
