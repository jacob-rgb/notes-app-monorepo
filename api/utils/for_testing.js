const User = require("../models/User.schema");

const palindrome = (string = '') => {
    if(typeof string === undefined) return;
    return string.split('')
                 .reverse()
                 .join('')
}

const average = array => {
    if(!array.length) return 0;
    let sum = 0;
    array.forEach(num => {sum += num });
    return sum / array.length
}

const getUsers = async () => {
    try {
        const usersDB = await User.find({});
        return usersDB.map(user => user.toJSON())
    } catch (error) {
        return []
    }
}

module.exports = {
    palindrome,
    average,
    getUsers
}