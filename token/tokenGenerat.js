const crypto = require('crypto');
const secret = 'abcdefg';
const {logger} = require('../modules/loggerWinston');

 const generateToken = (password) =>{
     const timesTamp = (new Date()).getTime()


     const hash = crypto.createHmac('sha256', secret)
         .update(timesTamp+password )
         .digest('hex');
     logger.log('info','generat token',{hash});

     return hash;
 }
module.exports = generateToken;

