const redis = require('redis');
const client = redis.createClient();


client.on("error", function(error) {
    console.error(error);
});
const get = async (key) => {
    return new Promise(resolve => {
        client.get(key,(err, reply) => {
            if (err) {
                console.log({err});
                throw err;
            }
            resolve(JSON.parse(reply))
        })
    }, reject => {
        reject('Redis client has a problem')
    })
};
const set = async (key , value) => {
    try {
        const push = await client.set(key,value)// es push xi chi ashxatum
        return push;
    }
    catch (e){
        console.log("redis , set filed ", e)
    }

}
const redisDelete = async (key) =>{
    const userDelete = await  client.del(key)
    console.log(userDelete)
    return userDelete;

}
 module.exports = {
     get,
     set,
     redisDelete
 }
