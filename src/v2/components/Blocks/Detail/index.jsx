// @flow
import {Container} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {map} from 'lodash/fp';
import {Match} from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import SectionHeader from 'v2/components/UI/SectionHeader';
import Mixpanel from 'v2/mixpanel';
import CopyBtn from 'v2/components/UI/CopyBtn';
import TransactionsTable from 'v2/components/Transactions/Table';
import Loader from 'v2/components/UI/Loader';
import BlockDetailStore from 'v2/stores/blocks/detail';
import ValidatorName from 'v2/components/UI/ValidatorName';
import InfoRow from 'v2/components/InfoRow';

import useStyles from './styles';

const BlockDetail = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {isLoading, blockId, block} = BlockDetailStore;

  if (blockId !== match.params.id) {
    BlockDetailStore.init({blockId: match.params.id});
  }

  useEffect(() => {
    Mixpanel.track(`Clicked Block ${match.params.id}`);
  }, [match.params.id]);

  if (!block) return null;

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
      value: (
        <ValidatorName pubkey={block.leader} name={block.leader} avatar="" />
      ),
    },
  ];

  const renderSpec = info => <InfoRow key={info.label} {...info} />;

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
          <div className={classes.spec}>{map(renderSpec)(specs)}</div>
        </div>
      </div>
      <div className={classes.tableTitle}>Transactions (TODO)</div>
      <TransactionsTable transactions={[]} />
    </Container>
  );
};

export default observer(BlockDetail);
