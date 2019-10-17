// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import AccountsTimelineStore from 'v2/stores/accounts/timeline';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';
import {Link, Match} from 'react-router-dom';

import Table from './Table';
import useStyles from './styles';

const AccountsPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {accounts, accountCount, start, next, prev} = AccountsTimelineStore;

  if (start !== match.params.start) {
    AccountsTimelineStore.init({start: match.params.start});
  }

  const nav = (
    <div className={classes.total}>
      STYLE_ME :
      {prev && <Link to={`/accounts/timeline/${prev}`}>prev page</Link>}:
      {next && <Link to={`/accounts/timeline/${next}`}>next page</Link>}:
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Recently Active Accounts">
        <HelpLink text="" term="" />
        <CTypography type="caption" className={classes.total}>
          {formatNum(accountCount)}
        </CTypography>
      </SectionHeader>
      {nav}
      <Table accounts={accounts} />
      {nav}
    </Container>
  );
};

export default observer(AccountsPage);
