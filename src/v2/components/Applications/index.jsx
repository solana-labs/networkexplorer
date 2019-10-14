// @flow
import {Container} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import HelpLink from 'v2/components/HelpLink';
import SectionHeader from 'v2/components/UI/SectionHeader';
import ApplicationsTimelineStore from 'v2/stores/applications/timeline';
import formatNum from 'v2/utils/formatNum';
import CTypography from 'v2/components/UI/CTypography';
import Table from './Table';
import useStyles from './styles';
import {Link, Match} from 'react-router-dom';

const ApplicationsPage = ({match}: {match: Match}) => {
  const classes = useStyles();
  const {
    applications,
    applicationCount,
    start,
    next,
    prev,
  } = ApplicationsTimelineStore;

  if (start !== match.params.start) {
    ApplicationsTimelineStore.init({start: match.params.start});
  }

  const nav = (
    <div className={classes.totalApplications}>
      STYLE_ME :
      {prev && <Link to={`/applications/timeline/${prev}`}>prev page</Link>}:
      {next && <Link to={`/applications/timeline/${next}`}>next page</Link>}:
    </div>
  );

  return (
    <Container>
      <SectionHeader title="Applications">
        <HelpLink text="" term="" />
        <CTypography type="caption" className={classes.total}>
          {formatNum(applicationCount)}
        </CTypography>
      </SectionHeader>
      {nav}
      <Table applications={applications} />
      {nav}
    </Container>
  );
};

export default observer(ApplicationsPage);
