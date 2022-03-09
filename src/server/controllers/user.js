const { prisma } = require('../utils/prisma');
const { SERVER_ERROR, SERVER_SUCCESS, PRISMA_ERROR, KEYS } = require('../config.js');

const { hashedPassword, checkPassword } = require('../utils/auth.js');

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

		createdUser = removeKeys(createdUser, KEYS.PASSWORD);

		return res.status(SERVER_SUCCESS.OK.CODE).json({ data: createdUser });
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

	foundedUser = removeKeys(foundedUser, KEYS.PASSWORD);

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundedUser});
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const foundUser = await prisma.user.findUnique({
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

	foundUser = removeKeys(foundUser, KEYS.PASSWORD);

    res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundUser});
};

module.exports = {
	createUser,
	getUserById,
	loginUser,
};
