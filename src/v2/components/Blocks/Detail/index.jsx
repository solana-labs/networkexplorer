// @flow
import {Container} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {map} from 'lodash/fp';
import {Match, Link} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import HelpLink from 'v2/components/HelpLink';
import Avatar from 'v2/components/UI/Avatar';
import Mixpanel from 'v2/mixpanel';
import CopyBtn from 'v2/components/UI/CopyBtn';
import TransactionsTable from 'v2/components/Transactions/Table';

import useStyles from './styles';

const BlockDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {params} = match;

  useEffect(() => {
    Mixpanel.track(`Clicked Block ${params.id}`);
  }, [params.id]);

  const block = {};

  if (!block) {
    return <div>Loading...</div>;
  }

  const specs = [
    {
      label: 'Time',
      hint: '',
      value: '06/05/2019 11:27AM',
    },
    {
      label: 'Fee',
      hint: '',
      value: '0.006 SOL | $0.60',
    },
    {
      label: 'Height',
      hint: '',
      value: '7887219',
    },
    {
      label: 'reward',
      hint: '',
      value: '0',
    },
    {
      label: 'mined',
      hint: '',
      value() {
        return (
          <Link to="" className={classes.mined}>
            <Avatar avatarUrl="" />
            123123123
          </Link>
        );
      },
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

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Block Detail">
          <span className={classes.blockTitle}>
            <CopyBtn text="123" />
          </span>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
          <div></div>
        </div>
      </div>
      <div className={classes.tableTitle}>Transactions</div>
      <TransactionsTable transactions={[]} />
    </Container>
  );
};

export default observer(BlockDetail);
