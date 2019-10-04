// @flow
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {map, eq} from 'lodash/fp';
import React, {useState} from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TransactionCode from './Code';
import HelpLink from 'v2/components/HelpLink';
import QRPopup from 'v2/components/QRPopup';
import CopyBtn from '../../UI/CopyBtn';
import TabNav from '../../UI/TabNav';
import Loader from 'v2/components/UI/Loader';
import {observer} from 'mobx-react-lite';
import _ from 'lodash';
import ApplicationsTab from './ApplicationsTab';
import ApplicationStatus from './Status';
import useStyles from './styles';
import TransactionDetailStore from 'v2/stores/transactions/detail';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {Match} from 'react-router-dom';

const TransactionDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    isLoading,
    transactionId,
    transaction,
    transactionView,
  } = TransactionDetailStore;

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('sm'));
  const handleTabChange = (event, tab) => setTab(tab);

  if (transactionId !== match.params.id) {
    TransactionDetailStore.init({transactionId: match.params.id});
  }

  if (isLoading) {
    return <Loader width="533" height="290" />;
  }

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const specs = [
    {
      label: 'Time',
      hint: transaction.timestamp,
      value: transaction.timestamp && asTime(transaction.timestamp),
    },
    {
      label: 'Fee',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Block',
      hint: '',
      value: transaction.blockId,
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

  const programMap = _.reduce(
    transaction.instructions,
    (a, i) => {
      if (!a[i.program_id]) {
        a[i.program_id] = i.program_id;
      }

      return a;
    },
    {},
  );

  const programs = _.values(programMap);

  const tabNav = [
    `Applications: ${programs.length}`,
    'status: success',
    'code/source',
  ];

  const renderTabNav = label => <TabNav key={label} label={label} />;
  const url = window.location.href;

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Transaction Detail">
          <div className={classes.blockTitle}>
            <span>{transaction.id}</span>
            <CopyBtn text={transaction.id} />
            <QRPopup url={url} />
          </div>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
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
        {eq(0, tab) && <ApplicationsTab transaction={transaction} />}
        {eq(1, tab) && <ApplicationStatus transaction={transaction} />}
        {eq(2, tab) && <TransactionCode transactionView={transactionView} />}
      </div>
    </Container>
  );
};

export default observer(TransactionDetail);
