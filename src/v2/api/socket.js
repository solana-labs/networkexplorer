import RobustWebSocket from 'robust-websocket';

import * as EndpointConfig from '../../EndpointConfig';

export const initSocket = () => {
  return new RobustWebSocket(EndpointConfig.getApiWebsocketUrl());
};
