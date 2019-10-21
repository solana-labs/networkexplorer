// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import ProgramsTimelineStore from 'v2/stores/programs/timeline';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';
import Table from './Table';
import useStyles from './styles';
import {Link, Match} from 'react-router-dom';

const ProgramsPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {programs, programCount, start, next, prev} = ProgramsTimelineStore;

  if (start !== match.params.start) {
    ProgramsTimelineStore.init({start: match.params.start});
  }

  const nav = (
    <div className={classes.total}>
      STYLE_ME :
      {prev && <Link to={`/programs/timeline/${prev}`}>prev page</Link>}:
      {next && <Link to={`/programs/timeline/${next}`}>next page</Link>}:
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Recently Active Programs">
        <HelpLink text="" term="" />
        <CTypography type="caption" className={classes.total}>
          {formatNum(programCount)}
        </CTypography>
      </SectionHeader>
      {nav}
      <Table programs={programs} />
      {nav}
    </Container>
  );
};

export default observer(ProgramsPage);
