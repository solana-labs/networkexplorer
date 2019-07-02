import RobustWebSocket from 'robust-websocket';
import {BLOCK_EXPLORER_WS_API_BASE} from 'v2/const';

export const initSocket = () => {
  return new RobustWebSocket(BLOCK_EXPLORER_WS_API_BASE);
};
