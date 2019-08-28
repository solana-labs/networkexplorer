// @flow
import {Tab} from '@material-ui/core';
import React from 'react';
import arrowDarkIcon from 'v2/assets/icons/arrow-right-dark.png';
import arrowIcon from 'v2/assets/icons/arrow-right-green.png';

import useStyles from './styles';

const TabNav = ({label, ...rest}: {label: string}) => {
  const classes = useStyles();
  return (
    <Tab
      {...rest}
      classes={{
        root: classes.tab,
        selected: classes.tabSelected,
      }}
      component={({className, 'aria-selected': selected, onClick}) => {
        return (
          <div className={className} onClick={onClick}>
            {label}
            <img src={selected ? arrowDarkIcon : arrowIcon} width={52} alt="" />
          </div>
        );
      }}
    />
  );
};

export default TabNav;
