const bcrypt = require('bcrypt');
const hashSaltRounds = 10;

const hashPassword = (pass) => {
    return bcrypt.hashSync(pass, hashSaltRounds);
}

module.exports = {
    hashPassword
}