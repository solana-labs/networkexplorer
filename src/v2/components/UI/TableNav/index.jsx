// @flow

import {IconButton} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import {Link} from 'react-router-dom';

import useStyles from './styles';

const TableNav = ({
  baseUrl,
  prev,
  next,
}: {
  baseUrl: string,
  prev: string,
  next: string,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton disabled={!prev}>
        <Link to={`${baseUrl || ''}${prev}`}>
          <ChevronLeft />
        </Link>
      </IconButton>
      <IconButton disabled={!next}>
        <Link to={`${baseUrl || ''}${next}`}>
          <ChevronRight />
        </Link>
      </IconButton>
    </div>
  );
};

export default TableNav;
