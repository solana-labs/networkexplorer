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
import Loader from 'v2/components/UI/Loader';

import useStyles from './styles';
import BlockDetailStore from 'v2/stores/blocks/detail';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BlockDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {isLoading, blockId, block} = BlockDetailStore;

  if (blockId !== match.params.id) {
    BlockDetailStore.init({blockId: match.params.id});
  }

  useEffect(() => {
    Mixpanel.track(`Clicked Block ${match.params.id}`);
  }, [match.params.id]);

  if (isLoading) {
    return <Loader width="533" height="290" />;
  }

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const specs = [
    {
      label: 'Time',
      hint: block.timestamp,
      value: block.timestamp && asTime(block.timestamp),
    },
    {
      label: 'Fee',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Height',
      hint: '',
      value: block.slot,
    },
    {
      label: 'reward',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Leader',
      hint: '',
      value: () => {
        return (
          <Link to="" className={classes.leader}>
            <Avatar avatarUrl="" />
            {block.leader}
          </Link>
        );
      },
    },
  ];

  const renderSpec = ({
    label,
    hint,
    value,
  }: {
    label: string,
    hint: string,
    value: string,
  }) => (
    <li key={label}>
      <div className={classes.label}>
        {label}
        <HelpLink term="" text="" />
      </div>
      <div className={classes.value} title={hint}>
        {typeof value === 'function' ? value() : value}
      </div>
    </li>
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Block Detail">
          <span className={classes.blockTitle}>
            {block.id}
            <CopyBtn text={block.id} />
          </span>
        </SectionHeader>
        <div className={classes.body}>
          <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
          <div></div>
        </div>
      </div>
      <div className={classes.tableTitle}>Transactions (TODO)</div>
      <TransactionsTable transactions={[]} />
    </Container>
  );
};

export default observer(BlockDetail);
