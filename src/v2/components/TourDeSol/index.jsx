// @flow
import {Container, Grid} from '@material-ui/core';
import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react-lite';
import SectionHeader from 'v2/components/UI/SectionHeader';
import iconRight from 'v2/assets/icons/arrow-right-dark.png';
import Ranking from './Ranking';
import Table from './Table';
import Cards from './Cards';
import OverviewStore from 'v2/stores/networkOverview';

import useStyles from './styles';
import _ from 'lodash';
import moment from 'moment';

const SLOTS_PER_DAY = (1.0 * 24 * 60 * 60) / 0.8;
const TDS_ACTIVE_STAGE = parseInt(process.env.TDS_ACTIVE_STAGE || '0');
const TDS_DEFAULT_STAGE_LENGTH_BLOCKS = SLOTS_PER_DAY * 5.0;

const TDS_STAGES = [
  {title: 'Stage 0', hidden: true},
  {
    title: 'Stage 1',
    start_date: '2019-09-02T17:00:00.0Z',
    end_date: '2019-09-06T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
  {
    title: 'Stage 2',
    start_date: '2019-09-09T17:00:00.0Z',
    end_date: '2019-09-13T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
  {
    title: 'Stage 3',
    start_date: '2019-09-16T17:00:00.0Z',
    end_date: '2019-09-20T17:00:00.0Z',
    duration: TDS_DEFAULT_STAGE_LENGTH_BLOCKS,
  },
];

const TourDeSol = () => {
  const classes = useStyles();
  const currentStage =
    TDS_ACTIVE_STAGE < TDS_STAGES.length && TDS_STAGES[TDS_ACTIVE_STAGE];

  const {globalStats} = OverviewStore;
  const slot = globalStats['!blkLastSlot'];
  const slotsLeftInStage =
    currentStage && currentStage.duration && currentStage.duration - slot;
  const daysLeftInStage =
    slotsLeftInStage && (slotsLeftInStage / SLOTS_PER_DAY).toFixed(3);

  function renderStage(stage, i) {
    if (stage.hidden) {
      return;
    }

    const isActive = i === TDS_ACTIVE_STAGE;
    const isFinished = i < TDS_ACTIVE_STAGE;
    const stageDateStart = moment(stage.start_date).format('l');
    const stageDateEnd = moment(stage.end_date).format('l');

    if (isActive) {
      return (
        <li className={cn(classes.stage, classes.stageActive)}>
          <div>
            {stage.title} (LIVE!)
            <img src={iconRight} width={47} height={13} alt="" />
          </div>
        </li>
      );
    } else if (isFinished) {
      return (
        <li className={classes.stage}>
          <div>
            {stage.title}
            <br />
            <span>(finished {stageDateEnd})</span>
          </div>
        </li>
      );
    } else {
      return (
        <li className={classes.stage}>
          <div>
            {stage.title}
            <br />
            <span>(coming {stageDateStart})</span>
          </div>
        </li>
      );
    }
  }

  return (
    <Container>
      <SectionHeader title="Tour de sol leaderboard">
        <ul className={classes.stages}>{_.map(TDS_STAGES, renderStage)}</ul>
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

export default observer(TourDeSol);
