const { prisma } = require('../utils/prisma');
const { SERVER_ERROR, SERVER_SUCCESS } = require('../config.js');

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

	const foundBook = await prisma.book.findUnique({
		where: {
			id,
		},
	});

	if (!foundBook) {
		res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundBook });
};

const deleteBook = async ( req, res ) => {
	const { id } = req.params;

	const deletedBook = await prisma.book.delete({
		where: {
			id: {
				id: Number(id)
			}
		}
	})
	res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: deletedBook });
}

module.exports = {
	getAllBooks,
	getBookById,
	deleteBook
};
