import {IconButton} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {ReactComponent as StarIcon} from 'v2/assets/icons/star.svg';
import FavoritesStore from 'v2/stores/favorites';

import useStyles from './styles';

const AddToFavorites = ({item, type}) => {
  const {endpointFavorites, removeFavorites, addFavorites} = FavoritesStore;
  const classes = useStyles();
  const isAdded = Boolean(endpointFavorites[type][item.id]);
  const toggle = () => {
    if (!item.id) return;
    isAdded ? removeFavorites(item.id, type) : addFavorites(item, type);
  };
  return (
    <IconButton size="small" onClick={toggle} className={classes.root}>
      <StarIcon fill={isAdded ? '#00C38D' : ''} />
    </IconButton>
  );
};

export default observer(AddToFavorites);
