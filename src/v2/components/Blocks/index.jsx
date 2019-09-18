// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import BlocksTimelineStore from 'v2/stores/blocks/timeline';
import Table from './Table';
import useStyles from './styles';
import {Link, Match} from 'react-router-dom';

const BlocksPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {blocks, blockCount, start, next, prev} = BlocksTimelineStore;

  if (start !== match.params.start) {
    BlocksTimelineStore.init({start: match.params.start});
  }

  const nav = (
    <div className={classes.total}>
      STYLE_ME :{prev && <Link to={`/blocks/timeline/${prev}`}>prev page</Link>}
      :{next && <Link to={`/blocks/timeline/${next}`}>next page</Link>}:
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Blocks">
        <HelpLink text="" term="" />
        <div className={classes.total}>{blockCount}</div>
      </SectionHeader>
      {nav}
      <Table blocks={blocks} />
      {nav}
    </Container>
  );
};

export default observer(BlocksPage);
