import {CssBaseline, makeStyles} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {lazy, Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Switch} from 'react-router-dom';
import Header from 'v2/components/Header';
import Footer from 'v2/components/Footer';
import theme from 'v2/theme';
import socket from 'v2/stores/socket';

try {
  socket.init();
} catch (err) {
  console.error('Socket init failed:', err);
}

const Dashboard = lazy(() => import('v2/components/Dashboard'));
const Validators = lazy(() => import('v2/components/Validators'));
const ValidatorsAll = lazy(() => import('v2/components/Validators/All'));
const ValidatorDetail = lazy(() => import('v2/components/Validators/Detail'));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  content: {
    marginLeft: 50,
    minWidth: '1px',
    padding: '50px 24px 0 24px',
    maxWidth: 'calc(100% - 50px)',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: 0,
      paddingTop: 80,
      maxWidth: '100%',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/rc" component={Dashboard} />
              <Route exact path="/rc/validators" component={Validators} />
              <Route
                exact
                path="/rc/validators/all"
                component={ValidatorsAll}
              />
              <Route
                exact
                path="/rc/validators/:id"
                component={ValidatorDetail}
              />
            </Switch>
          </Suspense>
          <Footer />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default hot(App);
