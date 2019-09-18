import _ from 'lodash';

import api from '.';

const DEFAULT_PAGE_SIZE = 100;

const TRANSACTION_DETAIL_VERSION = 'TransactionDetailView@1.0.0';

export function apiGetTransactionDetail({transactionId, version}) {
  return api(
    `/explorer/transactions/${encodeURIComponent(transactionId)}?v=${version ||
      TRANSACTION_DETAIL_VERSION}`,
  );
}

const TRANSACTION_INDEX_VERSION = 'TransactionIndexView@1.0.0';

export function apiGetTransactionsTimelinePage({
  start = '+',
  count = DEFAULT_PAGE_SIZE,
  direction = '-',
  version,
}) {
  const queryString = _.toPairs({
    start,
    count,
    direction,
    v: version || TRANSACTION_INDEX_VERSION,
  })
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  return api(`/explorer/transactions/index?${queryString}`);
}
