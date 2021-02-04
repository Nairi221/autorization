const redis = require('../modules/redis');
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
            next()
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }

}


module.exports = check;