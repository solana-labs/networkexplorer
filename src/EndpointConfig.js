export function getMetricsDashboardUrl() {
  const matches = window.location.hostname.match('(.*).testnet.solana.com');
  let url =
    'https://metrics.solana.com:3000/d/testnet-beta/testnet-monitor-beta?refresh=5s&from=now-5m&to=now';
  if (matches) {
    const testnet = matches[1];
    url += `&var-testnet=testnet-${testnet}`;
  }
  return url;
}

let EndpointConfig = {
  BLOCK_EXPLORER_API_BASE: `//${window.location.hostname}:3001`,
  BLOCK_EXPLORER_RPC_URL: `http://${window.location.hostname}:8899`,
};

export default EndpointConfig;
