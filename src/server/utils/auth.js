const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { prisma } = require('./prisma');

const saltRounds = 10;

const hashedPassword = async(password) => {
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = {
    hashedPassword
}