import _ from 'lodash';

import api from '.';

const DEFAULT_PAGE_SIZE = 100;

const BLOCK_DETAIL_VERSION = 'BlockDetailView@1.0.0';

export function apiGetBlockDetail({blockId, version}) {
  return api(
    `/explorer/blocks/${encodeURIComponent(blockId)}?v=${version ||
      BLOCK_DETAIL_VERSION}`,
  );
}

const BLOCK_INDEX_VERSION = 'BlockIndexView@1.0.0';

export function apiGetBlocksTimelinePage({
  start = '+',
  count = DEFAULT_PAGE_SIZE,
  direction = '-',
  version,
}) {
  const queryString = _.toPairs({
    start,
    count,
    direction,
    v: version || BLOCK_INDEX_VERSION,
  })
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  return api(`/explorer/blocks/index?${queryString}`);
}
