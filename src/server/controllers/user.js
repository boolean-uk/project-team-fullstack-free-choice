const { prisma } = require('../utils/prisma');
const { SERVER_ERROR, SERVER_SUCCESS, PRISMA_ERROR } = require('../config.js');

const { hashedPassword, checkPassword, createToken } = require('../utils/auth.js');

const createUser = async (req, res) => {
	const { username, password, email } = req.body;
	
	const passwordHashed = await hashedPassword(password);

	const user = {
		username,
		password: passwordHashed,
		email,
	};

	try {
		let createdUser = await prisma.user.create({
			data: {
				...user,
			},
		});

		delete createdUser.password;

		const token = createToken({ id: createdUser.id});

		res.status(SERVER_SUCCESS.OK.CODE).json({ data: createdUser, token: token});
	} 
	catch (error) {

		if (error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_VIOLATION.CODE) {
			return res.status(SERVER_ERROR.INTERNAL.CODE).json({error:PRISMA_ERROR.UNIQUE_CONSTRAINT_VIOLATION.CLIENT_MESSAGE_REGISTER,
			});
		}
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;

	let foundedUser = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!foundedUser) {
		return res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	delete foundedUser.password;

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundedUser});
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	let foundUser = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (!foundUser) {
        return res.status(SERVER_ERROR.UNAUTHORIZED.CODE).json({ error: SERVER_ERROR.UNAUTHORIZED.MESSAGE });
	}

    const checkPasswordMatch = await checkPassword(password, foundUser.password); 

    if (!checkPasswordMatch) {
        return res.status(SERVER_ERROR.UNAUTHORIZED.CODE).json({ error: SERVER_ERROR.UNAUTHORIZED.MESSAGE });
    }

	delete foundUser.password;

	const token = createToken({ id: foundUser.id});

    res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundUser, token: token});
};

module.exports = {
	createUser,
	getUserById,
	loginUser,
};
