const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = require('../config');

const { prisma } = require('./prisma');

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

module.exports = {
    hashedPassword,
    checkPassword,
    createToken
}