// @flow
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map} from 'lodash/fp';
import React, {useEffect, useState} from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import QRPopup from 'v2/components/QRPopup';
import InfoRow from 'v2/components/InfoRow';
import Loader from 'v2/components/UI/Loader';
import TabNav from 'v2/components/UI/TabNav';
import CopyBtn from 'v2/components/UI/CopyBtn';
import {observer} from 'mobx-react-lite';
import TransactionDetailStore from 'v2/stores/transactions/detail';
import {Link, Match} from 'react-router-dom';
import asTime from 'v2/utils/asTime';
import currentURL from 'v2/utils/currentURL';

import ProgramsTab from './ProgramsTab';
import ProgramStatus from './Status';
import useStyles from './styles';
import TransactionCode from './Code';

const TransactionDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    transaction,
    transactionView,
    init,
  } = TransactionDetailStore;

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const handleTabChange = (event, tab) => setTab(tab);

  useEffect(() => {
    init({transactionId: match.params.id});
  }, [init, match.params.id]);

  if (isLoading) {
    return (
      <Container className={classes.loader}>
        <Loader width="533" height="290" />
      </Container>
    );
  }

  if (!transaction) return null;

  const specs = [
    {
      label: 'Time',
      hint: transaction.timestamp,
      value: asTime(transaction.timestamp),
    },
    {
      label: 'Fee',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Block',
      hint: transaction.blockId,
      value: (
        <Link to={`/blocks/${transaction.blockId}`}>{transaction.blockId}</Link>
      ),
    },
    {
      label: 'Confirmations',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Value',
      hint: '',
      value: 'TODO',
    },
  ];

  const renderSpec = info => <InfoRow key={info.label} {...info} />;

  const tabNav = [
    `Programs: ${transaction.instructions.length}`,
    'status: success',
    'code/source',
  ];
  const tabs = {
    0: <ProgramsTab transaction={transaction} />,
    1: <ProgramStatus transaction={transaction} />,
    2: <TransactionCode transactionView={transactionView} />,
  };
  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = currentURL();
  return (
    <Container>
      <SectionHeader title="Transaction Detail">
        <div className={classes.blockTitle}>
          <span>{transaction.id}</span>
          <CopyBtn text={transaction.id} />
          <QRPopup url={url} />
        </div>
      </SectionHeader>
      <div className={classes.body}>
        <div className={classes.spec}>{map(renderSpec)(specs)}</div>
      </div>
      <Tabs
        orientation={verticalTabs ? 'vertical' : 'horizontal'}
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

export default observer(TransactionDetail);
