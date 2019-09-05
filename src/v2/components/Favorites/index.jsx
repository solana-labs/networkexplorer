// @flow
import {Container, Tabs, useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {eq, map} from 'lodash/fp';
import React, {useState} from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TabNav from 'v2/components/UI/TabNav';
import ApplicationsTable from 'v2/components/Applications/Table';
import {ReactComponent as WarnIcon} from 'v2/assets/icons/warn.svg';

import AccountsTable from './Accounts';
import useStyles from './styles';

const TransactionsPage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('xs'));
  const handleTabChange = (event, tab) => setTab(tab);
  const tabNav = ['Applications', 'Accounts'];
  const renderTabNav = label => <TabNav key={label} label={label} />;

  return (
    <Container>
      <SectionHeader title="Favorites">
        <div className={classes.warn}>
          <WarnIcon />
          If you clear your cache, your favorites will be deleted.
        </div>
      </SectionHeader>
      <Tabs
        orientation={verticalTabs ? 'vertical' : 'horizontal'}
        className={classes.tabs}
        classes={{indicator: classes.indicator}}
        value={tab}
        variant="fullWidth"
        onChange={handleTabChange}
      >
        {map(renderTabNav)(tabNav)}
      </Tabs>
      {eq(0, tab) && <ApplicationsTable />}
      {eq(1, tab) && <AccountsTable />}
    </Container>
  );
};

export default TransactionsPage;
