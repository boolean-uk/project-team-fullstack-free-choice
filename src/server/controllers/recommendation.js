const { prisma } = require('../utils/prisma');
const { SERVER_SUCCESS, SERVER_ERROR } = require('../config.js');

const createRecommendation = async(req, res) => {
    const { bookId, userId, isStored} = req.body;

    const recommendation = {
        bookId: Number(bookId),
        userId: Number(userId),
        isStored
    }

    try{
        const savedBooks = await prisma.recommendation.create({
            data: {
                ...recommendation
            }
        });

        res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: savedBooks });
    }
    catch(error){
        res.status(SERVER_SUCCESS.INTERNAL.CODE).json(SERVER_SUCCESS.INTERNAL.MESSAGE);
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