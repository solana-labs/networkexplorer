import {CssBaseline, makeStyles} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {lazy, Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Switch} from 'react-router-dom';
import Header from 'v2/components/Header';
import NavBar from 'v2/components/NavBar';
import theme from 'v2/theme';

const Dashboard = lazy(() => import('v2/components/Dashboard'));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginLeft: 50,
    padding: theme.spacing(3),
    paddingTop: 50,
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
              <Route exact path="/v2" component={Dashboard} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default hot(App);
