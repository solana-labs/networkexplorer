// @flow

import axios from 'axios';
import humps from 'humps';
import {BLOCK_EXPLORER_API_BASE} from 'v2/const';

const api = axios.create({
  baseURL: BLOCK_EXPLORER_API_BASE,
});

api.defaults.transformResponse = [
  ...axios.defaults.transformResponse,
  data => humps.camelizeKeys(data),
];

api.defaults.transformRequest = [
  data => {
    if (data instanceof FormData) {
      return data;
    }

    return humps.decamelizeKeys(data);
  },
  ...axios.defaults.transformRequest,
];

export default api;
