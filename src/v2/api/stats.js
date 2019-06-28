import api from '.';

export function getStats() {
  return api('/global-stats');
}
