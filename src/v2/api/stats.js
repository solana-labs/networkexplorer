import api from '.';

export function getStats() {
  return api('/global-stats');
}

export function getTxnStats() {
  return api('/txn-stats');
}

export function getClusterInfo() {
  return api('/cluster-info');
}
