const axios = require('axios');
const { SERVER_SUCCESS, EXTERNAL_API, GROUPS } = require('../config');
const { BOOKS_TO_SEED } = require('../data');
const { prisma } = require('../utils/prisma');

const ITEMS_INDEX = 0;

const cleanBookData = (rawData, isbn) => {
    let description = rawData.description;

    if(!rawData.description){
        description = 'N/A';
    }

    return {
        title: rawData.title,
        isbn: isbn,
        description: description,
        authors: rawData.authors,
        cover: rawData.imageLinks.thumbnail
    }
}

const getBookFromAPI = async (isbn) => {
    const rawBookData = await axios.get(EXTERNAL_API + isbn);
    const book = cleanBookData(rawBookData.data.items[ITEMS_INDEX].volumeInfo, isbn);
    
    return book;
}

const addBookToDB = async (bookToSeed) => {
    const { isbn, group, tags } = bookToSeed;
    const book = await getBookFromAPI(isbn);

    const createdBook = await prisma.book.create({
        data: {
            title: book.title,
            isbn: isbn,
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
            },
            tags: {
                connectOrCreate: tags.map((tag) => {
                    return {
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                        },
                    };
                }),
            },
            group: {
                connectOrCreate: {
                    where: {
                        id: group
                    },
                    create: {
                        number: group
                    }
                }
            }            
        },
        include:{
            authors: true
        }
    });

    console.log(createdBook);
}

const seedGroups = async () => {
    for(let i = 0; i < GROUPS.length; i++){
        const createdGroup = await prisma.group.create({
            data: {
                number: GROUPS[i]
            }
        });

        console.log('created group:', createdGroup);
    }
}

const seedBookDatabase = async (req, res) => {
    await seedGroups();

    for(let i = 0; i < BOOKS_TO_SEED.length; i++){
        await addBookToDB(BOOKS_TO_SEED[i]);
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json('Books seeded succesfully');
}

module.exports = {
    seedBookDatabase
}
