// @flow
import {Container, Grid, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import Button from 'v2/components/UI/Button';
import SectionHeader from 'v2/components/UI/SectionHeader';

import useStyles from './styles';

const ViewAll = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="View All" />
        <Grid container spacing={isMobile ? 2 : 8}>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" size="large" fullWidth color="primary">
              View all transactions
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" size="large" fullWidth color="primary">
              View all programs
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
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
