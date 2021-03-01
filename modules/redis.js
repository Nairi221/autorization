const redis = require('redis');
const client = redis.createClient();
const {logger} = require('../modules/loggerWinston');


client.on("error", function(error) {
    logger.error(error);
});
const get = async (key) => {
    return new Promise(resolve => {
        client.get(key,(err, reply) => {
            if (err) {
                logger.log('error','client.get',{err});
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
        logger.log('error',"redis , set filed ", e)
    }

}
const redisDelete = async (key) =>{
    const userDelete = await  client.del(key)
    logger.log('info','modules - redis - deletedUser ',{userDelete})
    return userDelete;

}
 module.exports = {
     get,
     set,
     redisDelete
 }
