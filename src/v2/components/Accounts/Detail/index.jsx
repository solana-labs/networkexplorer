// @flow
import {observer} from 'mobx-react-lite';
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import {Match} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import HelpLink from 'v2/components/HelpLink';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';
import Loader from 'v2/components/UI/Loader';
import AccountDetailStore from 'v2/stores/accounts/detail';
import {LAMPORT_SOL_RATIO} from 'v2/constants';
import TabNav from 'v2/components/UI/TabNav';
import AddToFavorites from 'v2/components/AddToFavorites';

import Chart from './Chart';
import Transactions from './Transactions';
import AccountCode from './Code';
import useStyles from './styles';

const AccountDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    accountId,
    accountInfo = {},
    accountView,
  } = AccountDetailStore;

  if (accountId !== match.params.id) {
    AccountDetailStore.init({accountId: match.params.id});
  }

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTable = useMediaQuery(theme.breakpoints.down('xs'));

  if (isLoading) {
    return <Loader width="533" height="290" />;
  }

  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Balance',
      hint: '',
      value: `${((accountInfo.lamports || 0) * LAMPORT_SOL_RATIO).toFixed(
        8,
      )} SOL`,
    },
    {
      label: 'Transactions',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Nickname',
      hint: '',
      value: accountInfo.data,
    },
    {
      label: 'Token',
      hint: '',
      value: 'TODO',
    },
  ];

  const renderSpec = ({label, value}: {label: string, value: string}) => (
    <li key={label}>
      <div className={classes.label}>
        {label}
        <HelpLink term="" text="" />
      </div>
      <div className={classes.value}>
        {typeof value === 'function' ? value() : value}
      </div>
    </li>
  );

  const tabNav = ['transaction', 'analytics', 'code/source'];

  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = window.location.href;
  const favoritesData = {
    id: accountId,
    ...accountInfo,
  };

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Account Detail">
          <div className={classes.programTitle}>
            <span>{accountId}</span>
            <CopyBtn text={accountId} />
            <QRPopup url={url} />
            <AddToFavorites item={favoritesData} type="accounts" />
          </div>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
        </div>
        <Tabs
          orientation={verticalTable ? 'vertical' : 'horizontal'}
          className={classes.tabs}
          classes={{indicator: classes.indicator}}
          value={tab}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          {map(renderTabNav)(tabNav)}
        </Tabs>
        {eq(0, tab) && <Transactions transactions={[]} />}
        {eq(1, tab) && <Chart />}
        {eq(2, tab) && <AccountCode accountView={accountView} />}
      </div>
    </Container>
  );
};

export default observer(AccountDetail);
