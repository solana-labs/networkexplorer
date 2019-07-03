// @flow
import {Container, Grid} from '@material-ui/core';
import React from 'react';
import Button from 'v2/components/UI/Button';
import SectionHeader from 'v2/components/UI/SectionHeader';

import useStyles from './styles';

const ViewAll = () => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader>View All</SectionHeader>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Button variant="contained" size="large" fullWidth color="primary">
              View all transactions
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" size="large" fullWidth color="primary">
              View all applications
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" size="large" fullWidth color="primary">
              View all blocks
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ViewAll;
