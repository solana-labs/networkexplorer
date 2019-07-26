// @flow
import React, {memo} from 'react';
import {map} from 'lodash/fp';
import {Link} from 'react-router-dom';
import type {Validator} from 'v2/@types/validator';

import useStyles from './styles';

type SearchResultProps = {
  items: Validator[],
  onClear: () => void,
  isDirty: boolean,
  isFocus: boolean,
};

const SearchResult = ({isDirty, isFocus, items, onClear}: SearchResultProps) => {
  const classes = useStyles();
  const renderItem = ({nodePubkey}: {nodePubkey: string}) => (
    <li className={classes.item} key={nodePubkey}>
      <Link onClick={onClear} to={`/rc/validators/${nodePubkey}`}>
        {nodePubkey}
      </Link>
    </li>
  );
  if ((!isDirty && !items.length ) || !isFocus) {
    return null;
  }

  return (
    <div className={classes.list}>
      <div className={classes.title}>
        {!items.length
          ? 'There were no results for this search term.'
          : 'Validators'}
      </div>
      <ul>{map(renderItem)(items)}</ul>
    </div>
  );
};

export default memo(SearchResult);
