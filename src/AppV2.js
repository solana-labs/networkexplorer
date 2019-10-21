import {CssBaseline, makeStyles} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {SnackbarProvider} from 'notistack';
import React, {lazy, Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Switch} from 'react-router-dom';
import Header from 'v2/components/Header';
import Footer from 'v2/components/Footer';
import theme from 'v2/theme';
import FailedPanel from 'v2/components/UI/FailedPanel';
import Socket from 'v2/stores/socket';
import getColor from 'v2/utils/getColor';

try {
  Socket.init();
} catch (err) {
  console.error('Socket init failed:', err);
}

const Dashboard = lazy(() => import('v2/components/Dashboard'));
const Validators = lazy(() => import('v2/components/Validators'));
const ValidatorsAll = lazy(() => import('v2/components/Validators/All'));
const ValidatorDetail = lazy(() => import('v2/components/Validators/Detail'));
const TourDeSol = lazy(() => import('v2/components/TourDeSol'));
const Blocks = lazy(() => import('v2/components/Blocks'));
const BlockDetail = lazy(() => import('v2/components/Blocks/Detail'));
const Transactions = lazy(() => import('v2/components/Transactions'));
const TransactionDetail = lazy(() =>
  import('v2/components/Transactions/Detail'),
);
const Programs = lazy(() => import('v2/components/Programs'));
const ProgramDetail = lazy(() => import('v2/components/Programs/Detail'));
const Accounts = lazy(() => import('v2/components/Accounts'));
const AccountDetail = lazy(() => import('v2/components/Accounts/Detail'));
const Favorites = lazy(() => import('v2/components/Favorites'));

const useStyles = makeStyles(() => {
  return {
    '@global': {
      a: {
        color: getColor('main')(theme),
        textDecoration: 'none',
        lineHeight: 1.9,
      },
    },
    root: {
      display: 'flex',
      overflow: 'hidden',
      minHeight: '100vh',
    },
    content: {
      marginLeft: 50,
      minWidth: '1px',
      padding: '50px 24px 0 24px',
      maxWidth: 'calc(100% - 50px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
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
      [theme.breakpoints.down('md')]: {
        minHeight: 85,
      },
      [theme.breakpoints.up('md')]: {
        minHeight: 50,
      },
    },
    success: {
      backgroundColor: getColor('grey2')(theme),
      color: getColor('white')(theme),
    },
  };
});

const App = () => {
  const classes = useStyles();
  const {hasError} = Socket;

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
        }}
        maxSnack={3}
      >
        <div className={classes.root}>
          <CssBaseline />
          <Header />

          <div className={classes.content}>
            <div className={classes.toolbar} />
            {hasError && <FailedPanel />}
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/validators" component={Validators} />
                <Route exact path="/validators/all" component={ValidatorsAll} />
                <Route
                  exact
                  path="/validators/:id"
                  component={ValidatorDetail}
                />
                <Route exact path="/tour-de-sol" component={TourDeSol} />
                <Route exact path="/blocks" component={Blocks} />
                <Route
                  exact
                  path="/blocks/timeline/:start"
                  component={Blocks}
                />
                <Route exact path="/blocks/:id" component={BlockDetail} />
                <Route exact path="/transactions" component={Transactions} />
                <Route
                  exact
                  path="/transactions/timeline/:start"
                  component={Transactions}
                />
                <Route
                  exact
                  path="/transactions/:id"
                  component={TransactionDetail}
                />
                <Route exact path="/programs" component={Programs} />
                <Route
                  exact
                  path="/programs/timeline/:start"
                  component={Programs}
                />
                <Route exact path="/programs/:id" component={ProgramDetail} />
                <Route exact path="/accounts" component={Accounts} />
                <Route
                  exact
                  path="/accounts/timeline/:start"
                  component={Accounts}
                />
                <Route exact path="/accounts/:id" component={AccountDetail} />
                <Route exact path="/favorites" component={Favorites} />
              </Switch>
            </Suspense>
            <Footer />
          </div>
        </div>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default hot(observer(App));
