const crypto = require('crypto');
const secret = 'abcdefg';

 const generateToken = (password) =>{
     const timesTamp = (new Date()).getTime()


     const hash = crypto.createHmac('sha256', secret)
         .update(timesTamp+password )
         .digest('hex');
     console.log(hash);

     return hash;
 }
module.exports = generateToken;

