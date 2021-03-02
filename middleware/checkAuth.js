const redis = require('../modules/redis');
const {logger} = require('../modules/loggerWinston')
const check = async (req , res , next) => {
    try{
        const authToken = req.headers.authorization
        const user = await redis.get(authToken);

        if(user){
            res.status(200).json({
                message: 'success',
                error: false,
                data: user
            })

        }
        else {
            logger.log('info','middleware - checkAuth  ');
            next()
        }
    } catch (e) {
        logger.log('error', 'middleware - checkAuth - check', {message: e.message})
        res.status(400).json({
             message: e.message
         })
    }

}


module.exports = check;