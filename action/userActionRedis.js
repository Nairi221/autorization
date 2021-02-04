const redis = require('../modules/');
const client = redis.createClient ();

client.on("error" ,function (error){
    console.log(error)
});



const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
getAsync.then(console.log).catch(console.error);





client.set('key' ,'value', redis.print);
client.get('key',redis.print);





module.exports = {
    client
}
