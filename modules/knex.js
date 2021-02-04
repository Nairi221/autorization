const { HOST, MY_SQL_USER ,MY_SQL_PASSWORD ,DB } = process.env

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : HOST,
        user : MY_SQL_USER,
        password : MY_SQL_PASSWORD,
        database : DB
    },
});
module.exports = knex
