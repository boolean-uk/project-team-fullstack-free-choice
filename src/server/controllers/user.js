const { prisma } = require('../utils/prisma');

const { hashedPassword } = require('../utils/auth.js');

const createUser = async( req, res ) => {
    const { username, password, email } = req.body;

    password = await hashedPassword(password);

    const user = {
        username,
        password: password,
        email,
    }

    try{
        const createdUser = await prisma.user.create({
            data: {
                ...user
            }
        })
        res.status(200).json(createdUser)
    }
    catch(error){
        res.status(401).json({error: "Invalid Username or Password."});
    }
}












module.exports = {
    createUser
};