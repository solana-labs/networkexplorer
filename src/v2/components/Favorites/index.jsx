// @flow
import {
  Container,
  TableCell,
  TableRow,
  Tabs,
  useTheme,
} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {eq, map, values} from 'lodash/fp';
import React, {useState} from 'react';
import SectionHeader from 'v2/components/UI/SectionHeader';
import TabNav from 'v2/components/UI/TabNav';
import Table from 'v2/components/UI/Table';
import TypeLabel from 'v2/components/UI/TypeLabel';
import {ReactComponent as WarnIcon} from 'v2/assets/icons/warn.svg';
import FavoritesStore from 'v2/stores/favorites';
import asTime from 'v2/utils/asTime';
import {Link} from 'react-router-dom';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    id: 'id',
    label: 'id',
    text: '',
    term: '',
  },
  {
    label: 'type',
    name: 'type',
    text: '',
    term: '',
  },
  {
    label: 'saved at',
    name: 'timestamp',
    text: '',
    term: '',
  },
  {
    label: '',
    name: '',
    text: '',
    term: '',
  },
];

const FavoritesPage = () => {
  const {endpointFavorites, removeFavorites, clear} = FavoritesStore;
  const classes = useStyles();
  const [tab, setTab] = useState('programs');
  const theme = useTheme();
  const verticalTabs = useMediaQuery(theme.breakpoints.down('xs'));
  const handleTabChange = (event, tab) => setTab(tab);
  const tabNav = ['programs', 'accounts'];
  const renderTabNav = label => (
    <TabNav key={label} label={label} value={label} />
  );

  const clearFavorites = () => {
    if (
      window.confirm(
        'This will clear all locally stored favorites. Are you sure?',
      )
    ) {
      clear();
    }
  };

  const remove = id => () => {
    removeFavorites(id, tab);
  };

  const renderRow = ({data: row}) => {
    const {id, type, timestamp} = row;

    return (
      <TableRow hover key={id}>
        <TableCell title={id}>
          <Link to={`/${tab}/${id}`}>{id}</Link>
        </TableCell>
        <TableCell width={110}>
          <div>
            <TypeLabel type="loader" label={type || 'TODO'} />
          </div>
        </TableCell>
        <TableCell width={135} title={timestamp}>
          {asTime(timestamp) || 'Unknown'}
        </TableCell>
        <TableCell width={30} title="Remove this item">
          <Button color="primary" onClick={remove(id)}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Container>
      <SectionHeader title="Favorites">
        <div className={classes.warn}>
          <WarnIcon fill="#f71ef4" />
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
        <Table
          fields={fields}
          renderRow={renderRow}
          data={values(endpointFavorites.programs)}
        />
      )}
      {eq('accounts', tab) && (
        <Table
          fields={fields}
          renderRow={renderRow}
          data={values(endpointFavorites.accounts)}
        />
      )}
      <div>
        <Button color="primary" onClick={clearFavorites}>
          <DeleteForeverIcon />
          Clear All Favorites
        </Button>
      </div>
    </Container>
  );
};

export default observer(FavoritesPage);
