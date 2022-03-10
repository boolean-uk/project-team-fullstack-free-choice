const axios = require('axios');

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
        authors: rawData.authors
    }
}

const getBookFromAPI = async (isbn) => {
    const rawBookData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const book = cleanBookData(rawBookData.data.items[0].volumeInfo);
    
    return book;
}

getBookFromAPI('9781913322076');
