// @flow
import {observer} from 'mobx-react-lite';
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map} from 'lodash/fp';
import React, {useEffect, useState} from 'react';
import {Match} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from 'v2/components/UI/CopyBtn';
import Loader from 'v2/components/UI/Loader';
import AccountDetailStore from 'v2/stores/accounts/detail';
import TabNav from 'v2/components/UI/TabNav';
import AddToFavorites from 'v2/components/AddToFavorites';
import InfoRow from 'v2/components/InfoRow';
import currentURL from 'v2/utils/currentURL';

import Chart from './Chart';
import Transactions from './Transactions';
import AccountCode from './Code';
import useStyles from './styles';

const AccountDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    accountId,
    accountInfo,
    accountView,
    init,
  } = AccountDetailStore;

  useEffect(() => {
    init({accountId: match.params.id});
  }, [init, match.params.id]);

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTable = useMediaQuery(theme.breakpoints.down('xs'));

  if (isLoading) {
    return (
      <Container className={classes.loader}>
        <Loader width="533" height="290" />
      </Container>
    );
  }

  const handleTabChange = (event, tab) => setTab(tab);

  const specs = [
    {
      label: 'Balance',
      hint: '',
      value: `${accountInfo.balance} SOL`,
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

  const renderSpec = info => <InfoRow key={info.label} {...info} />;

  const tabNav = ['transaction', 'analytics', 'code/source'];
  const tabs = {
    0: <Transactions transactions={[]} />,
    1: <Chart />,
    2: <AccountCode accountView={accountView} />,
  };
  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = currentURL();
  const favoritesData = {
    id: accountId,
    type: accountInfo.type,
  };

  return (
    <Container>
      <SectionHeader title="Account Detail">
        <div className={classes.programTitle}>
          <span>{accountId}</span>
          <CopyBtn text={accountId} />
          <QRPopup url={url} />
          <AddToFavorites item={favoritesData} type="accounts" />
        </div>
      </SectionHeader>
      <div className={classes.body}>
        <div className={classes.spec}>{map(renderSpec)(specs)}</div>
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
      {tabs[tab]}
    </Container>
  );
};

export default observer(AccountDetail);
