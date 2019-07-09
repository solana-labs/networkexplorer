// @flow

import axios from 'axios';
import humps from 'humps';

import {getApiUrl} from '../../EndpointConfig';

const api = axios.create({
  baseURL: getApiUrl(),
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

export function updateBaseUrl() {
  api.defaults.baseURL = getApiUrl();
}

export default api;
