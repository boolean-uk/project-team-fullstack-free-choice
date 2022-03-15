const { prisma } = require('../utils/prisma');
const { SERVER_ERROR, SERVER_SUCCESS } = require('../config.js');

const getAllBooks = async (req, res) => {
	const books = await prisma.book.findMany({
		include: {
			tags: true,
		}
	});

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: books });
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

const getBookByAuthor = async(req, res) => {
	const { author } = req.params;

	const foundAuthor = await prisma.author.findUnique({
		where: {
			name: author
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

const getBookByGenre = async(req, res) => {
	const { genre } = req.params;

	const foundGenre = await prisma.genre.findUnique({
		where: {
			name: genre
		}
	});

	if (!foundGenre) {
		res.status(SERVER_ERROR.NOT_FOUND.CODE).json({ error: SERVER_ERROR.NOT_FOUND.MESSAGE });
	}

	const book = await prisma.book.findUnique({
		where: {
			id: foundGenre.id
		}
	})

	res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: book });
}

const getBookByGroupId = async(req, res) => {
	const { id } = req.params;
	
	const booksGroup = await prisma.book.findUnique({
		where: {
			id
		}
	});

	res.status(SERVER_SUCCESS.OK.CODE).json({ data: booksGroup });
}

module.exports = {
	getAllBooks,
	getBookById,
	deleteBook,
	getBookByAuthor,
	getBookByGenre,
	getBookByGroupId
};

