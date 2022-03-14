const axios = require('axios');
const { SERVER_SUCCESS, EXTERNAL_API } = require('../config');
const { prisma } = require('../utils/prisma');

const ITEMS_INDEX = 0;

const getISBN = (industryIdentifiers) => {
    const indIdentifier = industryIdentifiers.find(indId => indId.type === 'ISBN_13');

    return indIdentifier?.identifier;
}

const cleanBookData = (rawData) => {
    const isbn = getISBN(rawData.industryIdentifiers);

    return {
        title: rawData.title,
        isbn: isbn,
        description: rawData.description,
        authors: rawData.authors,
        cover: rawData.imageLinks.thumbnail
    }
}

const getBookFromAPI = async (isbn) => {
    const rawBookData = await axios.get(EXTERNAL_API + isbn);
    const book = cleanBookData(rawBookData.data.items[ITEMS_INDEX].volumeInfo);
    
    return book;
}

const addBookToDB = async (req, res) => {
    const isbn = req.id;
    const book = await getBookFromAPI(isbn);

    const createdBook = await prisma.book.create({
        data: {
            title: book.title,
            isbn: book.isbn,
            description: book.description,
            cover: book.cover,
            authors: {
                connectOrCreate: book.authors.map((author) => {
                    return {
                        where: {
                            name: author,
                        },
                        create: {
                            name: author,
                        },
                    };
                }),
            }
        },
        include:{
            authors: true
        }
    });

    res.status(SERVER_SUCCESS.OK.CODE).json({ data: createdBook });
}

module.exports = {
    addBookToDB
}
