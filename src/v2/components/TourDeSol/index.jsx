// @flow
import {Container, Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
import {map, eq} from 'lodash/fp';
import {observer} from 'mobx-react-lite';
import {RouterHistory, withRouter} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TourDeSolIndexStore from 'v2/stores/tourdesol';
import {TDS_ACTIVE_STAGE} from 'v2/constants';
import socketActions from 'v2/stores/socket';
import {parse as queryParse} from 'query-string';

import Ranking from './Ranking';
import Stage from './Stage';
import Table from './Table';
import Cards from './Cards';
import useStyles from './styles';

const TourDeSol = ({
  history,
  location,
}: {
  history: RouterHistory,
  location: Location,
}) => {
  const {endpointName} = socketActions;
  const queryParams = queryParse(location.search);
  const {force, demo} = queryParams;
  const activeStage =
    (queryParams.activeStage && parseInt(queryParams.activeStage)) ||
    TDS_ACTIVE_STAGE;

  useEffect(() => {
    if (!eq('tds', endpointName) && !eq('true', force)) {
      history.replace(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpointName]);
  const classes = useStyles();

  const {
    isInited,
    isLoading,
    stages,
    activeValidators,
    clusterStats,
  } = TourDeSolIndexStore;

  if (!isInited) {
    TourDeSolIndexStore.init({
      demo,
      activeStage,
    });
  }

  const renderStage = stage => (
    <Stage
      stage={stage}
      key={stage.id}
      className={classes.stage}
      activeClass={classes.stageActive}
      activeStage={activeStage}
    />
  );

  return (
    <Container>
      <SectionHeader title="Tour de sol leaderboard">
        <ul className={classes.stages}>{map(renderStage)(stages)}</ul>
      </SectionHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9} className={classes.leftCol}>
          <Ranking activeValidators={activeValidators} />
          <Table activeValidators={activeValidators} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Cards isLoading={isLoading} clusterStats={clusterStats} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(observer(TourDeSol));
