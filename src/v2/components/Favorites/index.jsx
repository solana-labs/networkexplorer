// @flow
import {Container, Tabs, useTheme} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {eq, map, values} from 'lodash/fp';
import React, {useState} from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TabNav from 'v2/components/UI/TabNav';
import ProgramsTable from 'v2/components/Programs/Table';
import {ReactComponent as WarnIcon} from 'v2/assets/icons/warn.svg';
import FavoritesStore from 'v2/stores/favorites';

import AccountsTable from './Accounts';
import useStyles from './styles';

const TransactionsPage = () => {
  const {endpointFavorites} = FavoritesStore;
  const classes = useStyles();
  const [tab, setTab] = useState('programs');
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('xs'));
  const handleTabChange = (event, tab) => setTab(tab);
  const tabNav = ['programs', 'accounts'];
  const renderTabNav = label => (
    <TabNav key={label} label={label} value={label} />
  );

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
      {eq('programs', tab) && (
        <ProgramsTable programs={values(endpointFavorites.programs)} />
      )}
      {eq('accounts', tab) && <AccountsTable />}
    </Container>
  );
};

export default observer(TransactionsPage);
