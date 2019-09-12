import RobustWebSocket from 'robust-websocket';
import {CONNECTION_TIMEOUT} from 'v2/constants';

import * as EndpointConfig from '../../EndpointConfig';

export const initSocket = () => {
  return new RobustWebSocket(EndpointConfig.getApiWebsocketUrl(), null, {
    timeout: CONNECTION_TIMEOUT,
  });
};
