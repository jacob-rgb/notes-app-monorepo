const { response } = require("express");
const User = require("../models/User.schema");
const { hashPassword } = require("../utils/passwords");

const getUsers = async (req, res = response) => {
    const users = await User.find({}).populate('notes');
    if(!users.length) return res.status(404).json({ok: false, msg: 'No users found'})
    res.status(200).json({ok:true, data:users})
}


const createUser = async (req, res) => {
    const { body } = req;
    const { username, name, password} = body;
    try {
        const newUser = new User({
            username,
            name,
            password: hashPassword(password)
        });
        console.log(newUser);
        const dbUser = await newUser.save();
        res.status(201).json({
            ok: true,
            data: dbUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error',
            log: error
        })
    }
}

module.exports = {
    createUser,
    getUsers
}