// @flow
import {Container} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import BlocksTimelineStore from 'v2/stores/blocks/timeline';
import {Link, Match} from 'react-router-dom';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';

import Table from './Table';
import useStyles from './styles';

const BlocksPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {blocks, blockCount, start, next, prev} = BlocksTimelineStore;

  if (start !== match.params.start) {
    BlocksTimelineStore.init({start: match.params.start});
  }

  const nav = (
    <div className={classes.nav}>
      {prev && (
        <Link to={`/blocks/timeline/${prev}`}>
          <NavigateBeforeIcon />
        </Link>
      )}
      {next && (
        <Link to={`/blocks/timeline/${next}`}>
          <NavigateNextIcon />
        </Link>
      )}
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Blocks">
        <HelpLink text="" term="" />
        <CTypography className={classes.total} type="caption">
          {formatNum(blockCount)}
        </CTypography>
      </SectionHeader>
      {nav}
      <Table blocks={blocks} />
      {nav}
    </Container>
  );
};

export default observer(BlocksPage);
