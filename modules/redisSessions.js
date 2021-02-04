const redisSessions = require('redis-session');
const rs = new redisSessions();


rsapp = 'app';



rs.create({
        app: rsapp,
        id: "user1001",
        ip: "192.168.22.58",
        ttl: 3600,
        d: {
            foo: "bar",
            unread_msgs: 34
        }
    },
    function(err, resp) {
        // resp should be something like
        // {token: "r30kKwv3sA6ExrJ9OmLSm4Wo3nt9MQA1yG94wn6ByFbNrVWhcwAyOM7Zhfxqh8fe"}
    });