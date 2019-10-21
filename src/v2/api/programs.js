import _ from 'lodash';

import api from '.';

const DEFAULT_PAGE_SIZE = 100;

const PROGRAM_DETAIL_VERSION = 'ProgramDetailView@1.0.0';

export function apiGetProgramDetail({programId, version}) {
  return api(
    `/explorer/programs/${encodeURIComponent(programId)}?v=${version ||
    PROGRAM_DETAIL_VERSION}`,
  );
}

const PROGRAM_INDEX_VERSION = 'ProgramIndexView@1.0.0';

export function apiGetProgramsTimelinePage({
  start = '',
  count = DEFAULT_PAGE_SIZE,
  direction = '-',
  version,
}) {
  const queryString = _.toPairs({
    start,
    count,
    direction,
    v: version || PROGRAM_INDEX_VERSION,
  })
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  return api(`/explorer/programs/index?${queryString}`);
}
