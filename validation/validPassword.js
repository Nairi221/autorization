//validation of user password
const passValid = require('password-validator')
const  schema = new passValid();

schema.is().min(8).is().max(50).has().uppercase()
.has().lowercase().has().digits(2)
.has().not().spaces().is().not().oneOf(['Passw0rd','Password123']);

console.log(schema.validate('validPASS123'));


module.exports = schema;
