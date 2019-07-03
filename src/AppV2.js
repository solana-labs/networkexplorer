import {CssBaseline, makeStyles} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {lazy, Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Switch} from 'react-router-dom';
import Header from 'v2/components/Header';
import NavBar from 'v2/components/NavBar';
import Footer from 'v2/components/Footer';
import theme from 'v2/theme';
import socket from 'v2/stores/socket';

socket.init();

const Dashboard = lazy(() => import('v2/components/Dashboard'));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    marginLeft: 50,
    padding: '50px 24px 0 24px',
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
        <NavBar />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/rc" component={Dashboard} />
            </Switch>
          </Suspense>
          <Footer />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default hot(App);
