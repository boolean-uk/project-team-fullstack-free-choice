const { prisma } = require('../utils/prisma');
const { SERVER_SUCCESS, SERVER_ERROR } = require('../config.js');

const createRecommendation = async(req, res) => {
    const userId = Number(req.params.userId);
    const { bookId, isStored } = req.body;

    const recommendation = {
        bookId: Number(bookId),
        userId: userId,
        isStored,
        isMatch: false
    }

    try{
        const createdRecommendation = await prisma.recommendation.create({
            data: {
                ...recommendation
            }
        });

        console.log('created rec', createdRecommendation);

        res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdRecommendation });
    }
    catch(error){
        console.log(error);
        res.status(SERVER_ERROR.INTERNAL.CODE).json(SERVER_ERROR.INTERNAL.MESSAGE);
    }
}

const getRecommendations = async (req, res) => {
    const userId = Number(req.body.id);

    const foundRecommendations = await prisma.recommendation.findMany({
        where: {
            AND: [
                { userId: userId },
                { isStored: true }
            ]
        }
    });
    console.log('User\'s recommendations', foundRecommendations);

    if(!foundRecommendations){
        res.status(SERVER_ERROR.NOT_FOUND.CODE).json(SERVER_ERROR.NOT_FOUND.MESSAGE);
    }

    res.status(SERVER_SUCCESS.OK.CODE).json({ data: foundRecommendations });
}

module.exports = {
    createRecommendation,
    getRecommendations
}