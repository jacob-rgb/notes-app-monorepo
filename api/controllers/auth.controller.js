const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.schema');

const login = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    console.log(body);
    const userDB = await User.findOne({username: username });

    const validPass = bcrypt.compare(password, userDB.password);

    if(!validPass) return res.status(401).json({ok: false, error: 'Invalid user or password'});

    const token = jwt.sign({username: userDB.username, id: userDB.id}, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 2
    });

    res.status(200).json({
        ok: true,
        data: {
            username,
            id: userDB.id,
            token
        }
    });
}

module.exports = {
    login
}