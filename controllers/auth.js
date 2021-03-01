const chalk = require('chalk');
const redis = require('../modules/redis');
const { logger } = require('../modules/loggerWinston');
const generateToken = require('../token/tokenGenerat');
const md5 = require('md5');
const { validData } = require('../validation/validUserData');
const {
    createUser, getUser, getUsersData, updateUser, delUser
} = require('../action/users.action');




exports.login = async (req, res) => {
    logger.log('info', 'Controller - Auth: login ', {
        url: req.originalUrl,
        data: {
            body: req.body,
        }
    });
    const user = await getUser(req.body.email, req.body.phone);
     logger.log('info','gtav userin', user,{
         url : req.originalUrl,
         data : {
             body : req.body
         }
     });
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
               message: "you entered the wrong password !",
               error: true,
               data: {}
           })
           return;
       }
       const token = generateToken(user.password)
       const isSet = redis.set(token, JSON.stringify(user))
       if (!isSet) {
           res.status(200).set('Authorization', token).json({
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
       logger.log('error','xntir ka  , controllers - auth - generatToken',e,{
           message: e.message || e.sqlMessage,

       })
  //     res.status(404).json({
    //    message: e.message || e.sqlMessage,
    //})
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
                error: true,
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
        logger.log('error','controllers - auth - creatUser',e ,{
            url : req.originalUrl,
            message: e.message || e.sqlMessage
        })
        // res.status(404).json({
        //     message: e.message || e.sqlMessage,
        // })
    }
}



exports.logout = async (req , res ) => {
  const userDeleteFromRedis = await redis.redisDelete(req.headers.authorization)
   res.status(200).json({
       message: "you are out of the page !"
   })

}

exports.getUsers = async (req , res ) => {
    try {
        const params = {
            limit : req.query.limit,
        }

        const users = await getUsersData(params);

        res.status(200).json({
            error: false,
            message: "Success !",
            data: users,
        });
    } catch (e) {
        logger.log('error','controllers - auth - getUserData',e ,{
            url : req.originalUrl,
                message: e.massage || e.sqlMessage,
                error: true
        })


    }
}

exports.updateUser = async (req , res ) => {
    try {
        const params = {
            id: req.body.id,
            name : req.body.name,
        }
        const updatedUser = await updateUser(params);
        res.status(200).json({
            error: false,
            message: "Success !",
            data: updatedUser,
        });
    } catch (e) {
        logger.log('error','controllers - auth - ubdateUser ',e,{
            url : req.originalUrl,
            message: e.massage || e.sqlMessage,
            error: true
        } );
        // res.status(400).json({
        //     message: e.massage || e.sqlMessage,
        //     error: true
        // })
    }
}
exports.deleteUser = async (req , res ) => {
    try {
        const params = {
            id: req.body.id,
        }
        const user = await delUser(params);
        res.status(200).json({
            error: false,
            message: user.affectedRows ? "Success !" : 'User not found',
            data: user.affectedRows,
        });
    } catch (e) {
        logger.log('error','controllers - auth - deleteUser',e ,{
            url:req.originalUrl,
            message: e.massage || e.sqlMessage,
            error: true
        });
        // res.status(400).json({
        //     message: e.massage || e.sqlMessage,
        //     error: true
        // })
    }
}
