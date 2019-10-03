// @flow
import {Container, Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
import {map, eq} from 'lodash/fp';
import {observer} from 'mobx-react-lite';
import {RouterHistory, withRouter} from 'react-router-dom';
import SectionHeader from 'v2/components/UI/SectionHeader';
import OverviewStore from 'v2/stores/networkOverview';
import {TDS_ACTIVE_STAGE, TDS_STAGES, SLOTS_PER_DAY} from 'v2/constants';
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
  useEffect(() => {
    if (!eq('tds', endpointName) && !eq('true', queryParams.force)) {
      history.replace(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpointName]);
  const classes = useStyles();
  const currentStage =
    TDS_ACTIVE_STAGE < TDS_STAGES.length && TDS_STAGES[TDS_ACTIVE_STAGE];

  const {globalStats} = OverviewStore;
  const slot = globalStats['!blkLastSlot'];
  const slotsLeftInStage =
    currentStage && currentStage.duration && currentStage.duration - slot;
  const daysLeftInStage =
    slotsLeftInStage && (slotsLeftInStage / SLOTS_PER_DAY).toFixed(3);

  const renderStage = stage => (
    <Stage
      stage={stage}
      key={stage.id}
      className={classes.stage}
      activeClass={classes.stageActive}
    />
  );

  return (
    <Container>
      <SectionHeader title="Tour de sol leaderboard">
        <ul className={classes.stages}>{map(renderStage)(TDS_STAGES)}</ul>
      </SectionHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9} className={classes.leftCol}>
          <Ranking />
          <Table />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Cards
            stageDurationBlocks={currentStage && currentStage.duration}
            blocksLeftInStage={slotsLeftInStage}
            daysLeftInStage={daysLeftInStage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(observer(TourDeSol));
