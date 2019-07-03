import api from '.';

export function getStats() {
  return api('/global-stats');
}

export function getTxnStats() {
  return api('/txn-stats');
}
