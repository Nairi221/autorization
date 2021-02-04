const chalk = require('chalk');
const redis = require('../modules/redis');
const generateToken = require('../token/tokenGenerat');
const md5 = require('md5');
const { validData } = require('../validation/validUserData');
const { createUser, getUser } = require('../action/users.action');




exports.login = async (req, res) => {
   const user = await getUser(req.body.email, req.body.phone);
   try {
       if (!user) {
           res.status(200).json({
               message: " inch uzum em ",
               error: true,
               data: {}
           })
           return;
       }
       const isMatch = md5(req.body.password).match(user.password);
       if (!isMatch) {
           res.status(200).json({
               message: chalk.red("you entered the wrong password !"),
               error: true,
               data: {}
           })
           return;
       }
       const token = generateToken(user.password)
       const isSet = redis.set(token, JSON.stringify(user))
       if (!isSet) {
           res.status(200).json({
               message: "Adding radish to the database failed !",
               error: true,
               data: {}
           })
           return;
       }
       res.status(200).json({
           message: "success",
           error: false,
           data: user

       })
   }
   catch (e){
       res.status(404).json({
        message: e.message || e.sqlMessage,
    })
   }
}


exports.register = async (req, res) => {
    const { password } = req.body

    try {
        const { isValid, message } = validData(req.body);
        if (!isValid) {
            res.status(200).json({
                error: true,
                message
            }).send().end();
        }
        const user = await getUser(req.body.email, req.body.phone);

        if (user && user.id) {
            res.status(200).json({
                message: 'The same user has already existed'
            });
            return;
        }

        const inserted = await createUser({...req.body, password: md5(password)});
        if (!inserted) {
            throw {
                message:'User is not inserted'
            }
        }
        res.status(200).json({
            error: false,
            message: 'Success'
        })
    } catch (e) {
        res.status(404).json({
            message: e.message || e.sqlMessage,
        })
    }
}



exports.logout = async (req , res ) => {
  const userDeleteFromRedis = await redis.redisDelete(req.headers.authorization)
   res.status(200).json({
       message: "you are out of the page !"
   })

}
