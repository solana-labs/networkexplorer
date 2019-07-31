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
import useStyles from './styles';

const TourDeSol = () => {
  const classes = useStyles();

  return (
    <Container>
      <SectionHeader title="Tour de sol leaderboard">
        <ul className={classes.stages}>
          <li className={cn(classes.stage, classes.stageActive)}>
            <div>
              Stage 1 (live!)
              <img src={iconRight} width={47} height={13} alt="" />
            </div>
          </li>
          <li className={classes.stage}>
            Stage 1<span>(coming 09/01/19)</span>
          </li>
          <li className={classes.stage}>
            Stage 3<span>(coming 10/01/19)</span>
          </li>
        </ul>
      </SectionHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9} className={classes.leftCol}>
          <Ranking />
          <Table />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Cards />
        </Grid>
      </Grid>
    </Container>
  );
};

export default observer(TourDeSol);
