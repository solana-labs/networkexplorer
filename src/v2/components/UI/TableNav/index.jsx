import {IconButton} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import {Link} from 'react-router-dom';

import useStyles from './styles';

const TableNav = ({prev, next}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {prev && (
        <IconButton>
          <Link to={prev}>
            <ChevronLeft />
          </Link>
        </IconButton>
      )}
      {next && (
        <IconButton>
          <Link to={next}>
            <ChevronRight />
          </Link>
        </IconButton>
      )}
    </div>
  );
};

export default TableNav;
