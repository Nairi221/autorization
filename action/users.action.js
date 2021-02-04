const knex = require('../modules/knex');
const createUser = async (body) => {
    const inserted = await knex.raw(
        `INSERT INTO users (name,surname,email,password,phone,birth_day)
    VALUES ('${body.name}','${body.surname}','${body.email}','${body.password}','${body.phone}','${body.bDay}')`);
    return inserted && inserted[0].insertId || null;
}
const getUser = async (email,phone) => {
    const user = await knex.raw(`SELECT * FROM users WHERE email='${email}' OR phone='${phone}'`);
    return user[0] && user[0].length && user[0][0] || null;
}

module.exports = {
    createUser,
    getUser
}