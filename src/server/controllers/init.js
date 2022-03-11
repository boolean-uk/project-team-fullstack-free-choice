const axios = require("axios");
const { prisma } = require("../utils/prisma");

const ISBN_LIST = [
	"9781290298836",
	"9780525425892",
    "9781909621657",
	"9781338045390",
	"9781250298836",
	"9781594634635",
	"9781604561142",
	"9781524747596",
	"9781451675047",
    "9781449309015",
    "9781725209350",
    "9781491820148"
];

const getISBN = (industryIdentifiers) => {
	const indIdentifier = industryIdentifiers.find(
		(indId) => indId.type === "ISBN_13"
	);

	return indIdentifier?.identifier;
};

const cleanBookData = (rawData) => {
	const isbn = getISBN(rawData.industryIdentifiers);

	return {
		title: rawData.title,
		isbn: isbn,
		description: rawData.description,
		authors: rawData.authors,
		cover: rawData.imageLinks.thumbnail,
        genres: rawData.categories
	};
};

const getBookFromAPI = async (isbn) => {
	const rawBookData = await axios.get(
		`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
	);
	const book = cleanBookData(rawBookData.data.items[0].volumeInfo);

	return book;
};

const seedBookDatabase = (req, res) => {

	ISBN_LIST.map(async (isbn) => {
		const book = await getBookFromAPI(isbn);

        console.log(book);

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
				},
                genres: {
                    connectOrCreate: book.genres.map((genre) => {
                        return {
							where: {
								name: genre,
							},
							create: {
								name: genre,
							},
						};
                    })
                }
			},
            include:{
                authors: true,
                genres: true
            }
		});

		console.log("Created Book", createdBook);
	});

	res.json("Books seeded succesfully");
};

module.exports = {
	seedBookDatabase,
};
