// @flow
import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {compose, get, filter, lowerCase, contains} from 'lodash/fp';
import {InputBase, IconButton} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';
import NodesStore from 'v2/stores/nodes';

import SearchResult from './result';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();
  const {validators} = NodesStore;
  const [value, setValue] = useState('');
  const [isDirty, setDirty] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onFocus = () => setFocus(true);
  const onBlur = () => {
    setTimeout(() => {
      setFocus(false);
    }, 250);
  };

  const handleClear = () => {
    setDirty(false);
    setValue('');
    setSearchResult([]);
  };

  const handleSearch = ({currentTarget}: SyntheticEvent<HTMLInputElement>) => {
    if (!currentTarget.value) {
      handleClear();
      return;
    }
    setValue(currentTarget.value);
    const filteredValidators = filter(v => {
      const lowerVal = lowerCase(value);
      return (
        compose(contains(lowerVal), lowerCase, get('nodePubkey'))(v) ||
        compose(contains(lowerVal), lowerCase, get('identity.keybaseUsername'))(v)
      );
    })(validators);
    setDirty(true);
    setSearchResult(filteredValidators);
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <InputBase
          onFocus={onFocus}
          onBlur={onBlur}
          className={classes.input}
          placeholder="Search by validators address / keybase"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={value}
          onChange={handleSearch}
        />
        <IconButton size="small" className={classes.btn}>
          <SearchIcon />
        </IconButton>
      </div>
      <SearchResult
        isDirty={isDirty}
        isFocus={isFocus}
        onClear={handleClear}
        items={searchResult}
      />
    </div>
  );
};

export default observer(Search);
