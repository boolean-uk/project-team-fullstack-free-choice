const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = {
    hashedPassword,
    checkPassword
}