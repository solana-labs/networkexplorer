// @flow
import React, {useState} from 'react';
import {InputBase, IconButton} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

import useStyles from './styles';

type SearchProps = {
  onSubmit: (val: string) => void,
};

const Search = ({onSubmit}: SearchProps) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const handleSearch = ({currentTarget}: SyntheticEvent<HTMLInputElement>) => {
    setValue(currentTarget.value);
  };
  const handleSubmit = () => {
    onSubmit(value);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search by transaction hash / block number / application ID"
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
    </form>
  );
};

export default Search;
