// @flow
import {Tooltip} from '@material-ui/core';
import {TooltipProps} from '@material-ui/core/Tooltip';
import React from 'react';

type MapTooltipProps = {
  title: string,
};

const MapTooltip = ({title, ...rest}: MapTooltipProps & TooltipProps) => (
  <Tooltip
    classes={{...rest.classes}}
    {...rest}
    title={title()}
    PopperProps={{disablePortal: true}}
  />
);

export default MapTooltip;
