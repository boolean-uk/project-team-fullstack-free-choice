const axios = require('axios');
const { prisma } = require('../utils/prisma');

const ISBN_LIST = [
    '9780525421559',
    '9780593108970',
    '9780525425892',
    '9781338045451',
    '9781338045390',
    '9781250298836',
    '9781335418661',
    '9781594634635',
    '9780593111093',
    '9781524747596',
    '9781451675047',
    '9781250823144',
    '9781728240732'
];

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
    const rawBookData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const book = cleanBookData(rawBookData.data.items[0].volumeInfo);
    
    return book;
}

const seedBookDatabase = (req, res) => {
    console.log('hi');
    ISBN_LIST.map(async (isbn) => {
        const book = await getBookFromAPI(isbn);

        const createdBook = await prisma.book.create({
            data: {
                ...book
            }
        });

        console.log('Created Book', createdBook);
    }); 

    res.json('Books seeded succesfully');
}

module.exports = {
    seedBookDatabase
}