
const nodeInfo = JSON.parse(process.env.NODE_INFO);
nodeInfo.id = 'node@' + nodeInfo.info.ip;

export default {
    "node" : nodeInfo,
    "service" : {
	"tcp" : false,
	"udp" : false,
        "unixds" : true,
        "host" : "127.0.0.1",
        "port" : 7654,
	"socket" : "/tmp/streamtap.sock"
    },
    "redis" : {
        "host" : "127.0.0.1",
        "port" : 6379
    }
};
