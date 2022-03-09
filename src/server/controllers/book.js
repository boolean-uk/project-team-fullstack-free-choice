const { prisma } = require("../utils/prisma");
const { SERVER_ERROR, SERVER_SUCCESS, PRISMA_ERROR } = require("../config.js");

const getAllBooks = async (req, res) => {
	const posts = await prisma.book.findMany({
		include: {
			tags: true,
		}
	});
	res.status(SERVER_SUCCESS.OK.CODE).json({ data: posts });
};

const getBookById = async (req, res) => {
	const { id } = req.params;

	const foundUser = await prisma.book.findUnique({
		where: {
			id,
		},
	});

	if (!foundUser) {
		res
			.status(SERVER_ERROR.NOT_FOUND.CODE)
			.json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundUser });
};


module.exports = {
	getAllBooks,
	getBookById,
    getBookByGenre
};
