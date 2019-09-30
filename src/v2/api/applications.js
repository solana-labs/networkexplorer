import _ from 'lodash';

import api from '.';

const DEFAULT_PAGE_SIZE = 100;

const APPLICATION_DETAIL_VERSION = 'ApplicationDetailView@1.0.0';

export function apiGetApplicationDetail({applicationId, version}) {
  return api(
    `/explorer/applications/${encodeURIComponent(applicationId)}?v=${version ||
      APPLICATION_DETAIL_VERSION}`,
  );
}

const APPLICATION_INDEX_VERSION = 'ApplicationIndexView@1.0.0';

export function apiGetApplicationsTimelinePage({
  start = '',
  count = DEFAULT_PAGE_SIZE,
  direction = '-',
  version,
}) {
  const queryString = _.toPairs({
    start,
    count,
    direction,
    v: version || APPLICATION_INDEX_VERSION,
  })
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  return api(`/explorer/applications/index?${queryString}`);
}
