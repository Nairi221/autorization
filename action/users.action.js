const knex = require('../modules/knex');
const createUser = async (body) => {
    const inserted = await knex.raw(
        `INSERT INTO users (name,surname,email,password,phone,birth_day)
    VALUES ('${body.name}','${body.surname}','${body.email}','${body.password}','${body.phone}','${body.bDay}')`);
    return inserted && inserted[0].insertId || null;
}
const getUser = async (email,phone) => {
    const user = await knex.raw(`SELECT * FROM users WHERE email='${email}' OR phone='${phone}'`);
    console.log('getUseri mej', user[0][0]);
    return user[0] && user[0].length && user[0][0] || null;
}

const getUsersData = async ({ limit }) => {
    const users = await knex.raw(`SELECT * FROM users LIMIT ${limit}`);
    return users[0] && users[0].length && users[0] || null;
}

const updateUser = async ({ id, name }) => {
    const user = await knex.raw(`UPDATE users SET name='${name}' WHERE id=${id} LIMIT 1`);
    return user[0] && user[0].length && user[0] || null;
}

const delUser = async ({ id }) => {
    const user = await knex.raw(`DELETE FROM users WHERE id=${id} LIMIT 1`);
    return user[0] || null;
}

module.exports = {
    createUser,
    getUser,
    getUsersData,
    updateUser,
    delUser
}