// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import BlocksTimelineStore from 'v2/stores/blocks/timeline';
import {Match} from 'react-router-dom';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';

import TableNav from 'v2/components//UI/TableNav';
import Table from './Table';
import useStyles from './styles';

const BlocksPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {blocks, blockCount, start, next, prev} = BlocksTimelineStore;

  if (start !== match.params.start) {
    BlocksTimelineStore.init({start: match.params.start});
  }

  return (
    <Container>
      <SectionHeader title="Blocks">
        <HelpLink text="" term="" />
        <CTypography className={classes.total} type="caption">
          {formatNum(blockCount)}
        </CTypography>
      </SectionHeader>
      <TableNav baseUrl={'/blocks/timeline/'} prev={prev} next={next} />
      <Table blocks={blocks} />
      <TableNav baseUrl={'/blocks/timeline/'} prev={prev} next={next} />
    </Container>
  );
};

export default observer(BlocksPage);
