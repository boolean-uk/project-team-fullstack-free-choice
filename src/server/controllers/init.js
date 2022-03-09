// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const axios = require('axios');

const books = [];

const createBook = (apiBookData) => {
    // books.push({
    //     title: ,
    //     isbn: ,
    //     description: ,
    //     cover: ,
    //     authors: [],
    //     genres: [],
    // })
}

const getBooksFromApi = async (searchTerm) => {
    console.log(searchTerm);
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    console.log(res.data.items[0].volumeInfo.categories);
}

getBooksFromApi('cooking');