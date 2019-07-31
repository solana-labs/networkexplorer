import {MenuItem, OutlinedInput, Select} from '@material-ui/core';
import {map} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {updateBaseUrl} from 'v2/api';
import socketActions from 'v2/stores/socket';

import * as EndpointConfig from '../../../EndpointConfig';
import useStyles from './styles';

const EndpointSelector = () => {
  const classes = useStyles();
  const {endpointName, updateEndpointName} = socketActions;
  const handleEndpointChange = event => {
    const endpointName = event.target.value;
    EndpointConfig.setEndpointName(endpointName);
    updateEndpointName(endpointName);
    socketActions.init();
    updateBaseUrl();
  };
  const endPointsList = EndpointConfig.getEndpoints();
  const renderEndpointOption = endpoint => (
    <MenuItem
      classes={{selected: classes.selectedItem, root: classes.selectItem}}
      key={endpoint.name}
      value={endpoint.name}
    >
      {endpoint.friendlyName}
    </MenuItem>
  );

  return (
    <Select
      variant="outlined"
      classes={{
        select: classes.networkSelect,
        icon: classes.selectIcon,
      }}
      MenuProps={{classes: {paper: classes.selectMenu}}}
      value={endpointName}
      onChange={handleEndpointChange}
      input={
        <OutlinedInput
          classes={{
            notchedOutline: classes.selectInput,
          }}
        />
      }
    >
      {map(renderEndpointOption)(endPointsList)}
    </Select>
  );
};

export default observer(EndpointSelector);
