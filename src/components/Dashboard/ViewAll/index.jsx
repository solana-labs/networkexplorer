// @flow
import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Button from 'components/UI/Button';
import decor from 'assets/img/decorate.png';


import useStyles from './styles';

const ViewAll = props => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <img className={classes.decor} src={decor} width={99} alt="" />
        <Typography className={classes.title} variant="h3">view all</Typography>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Button variant="contained" fullWidth color="primary">View all transactions</Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" fullWidth color="primary">View all applications</Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" fullWidth color="primary">View all blocks</Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};


export default ViewAll;
