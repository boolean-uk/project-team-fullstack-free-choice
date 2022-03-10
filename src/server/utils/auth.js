const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = require('../config');

const saltRounds = 10;

const hashedPassword = async(password) => {
    return bcrypt.hashSync(password, saltRounds);
}

const checkPassword = async(password, foundedPassword) => {
    try {
        return await bcrypt.compare(password, foundedPassword);
    } catch (error) {
        return error;
    }
}

const createToken = async(payload) => {
    return jwt.sign(payload, SECRET);
}

const removeKeys = (user, ...keys) => {
    for (let key of keys) {
        delete user[key];
    }
    return user;
};

module.exports = {
    hashedPassword,
    checkPassword,
    createToken,
    removeKeys
}