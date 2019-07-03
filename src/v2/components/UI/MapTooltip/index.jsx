// @flow
import {Tooltip} from '@material-ui/core';
import {TooltipProps} from '@material-ui/core/Tooltip';
import React from 'react';

import useStyles from './styles';

type MapTooltipProps = {
  title: string,
};

const MapTooltip = ({title, ...rest}: MapTooltipProps & TooltipProps) => {
  const {arrow, ...classes} = useStyles();

  return (
    <Tooltip
      classes={{...classes, ...rest.classes}}
      {...rest}
      title={
        <>
          {title()}
          <span className={arrow} />
        </>
      }
    />
  );
};

export default MapTooltip;
