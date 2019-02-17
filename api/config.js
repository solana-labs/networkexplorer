export default {
  service: {
    tcp: false,
    udp: false,
    unixds: true,
    host: '127.0.0.1',
    port: 7654,
    socket: '/tmp/solana-entry-stream.sock',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
