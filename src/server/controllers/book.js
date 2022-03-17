const { prisma } = require('../utils/prisma');
const { SERVER_ERROR, SERVER_SUCCESS } = require('../config.js');

const getAllBooks = async (req, res) => {
	const books = await prisma.book.findMany({
		include: {
			tags: true,
			authors: true
		}
	});

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: books });
};

const getBookById = async (req, res) => {
	const id = Number(req.params.id);

	const foundBook = await prisma.book.findUnique({
		where: {
			id
		}
	});

	if (!foundBook) {
		res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundBook });
};

const deleteBook = async ( req, res ) => {
	const id = Number(req.params.id);

	const deletedBook = await prisma.book.delete({
		where: {
			id
		}
	})

	res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: deletedBook });
}

const getBookByAuthorId = async(req, res) => {
	const id = Number(req.params.id);

	const foundAuthor = await prisma.author.findUnique({
		where: {
			id
		}
	});

	if (!foundAuthor) {
		res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	const book = await prisma.book.findUnique({
		where: {
			id: foundAuthor.id
		}
	})

	res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: book });
}

const getBookByGroupId = async(req, res) => {
	const id = Number(req.params.id);
	
	const booksGroup = await prisma.book.findMany({
		where: {
			groupId: id
		}
	});

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: booksGroup });
}

module.exports = {
	getAllBooks,
	getBookById,
	deleteBook,
	getBookByGroupId,
	getBookByAuthorId
};

