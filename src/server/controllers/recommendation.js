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

    const existingRecommendation = await prisma.recommendation.findFirst({
        where: {
            AND: [
                { userId: userId },
                { bookId: bookId }
            ]
        }
    });

    try{
        if(!existingRecommendation){
            const createdRecommendation = await prisma.recommendation.create({
                data: {
                    ...recommendation
                }
            });
    
            console.log('created rec', createdRecommendation);
    
            return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdRecommendation });
        }

        if(!existingRecommendation.isStored){
            const updatedRecommendation = await prisma.recommendation.update({
                data: {
                    isStored: true
                }
            });

            console.log('updated rec', updatedRecommendation);

            res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: updatedRecommendation });
        }

        res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingRecommendation });
    }
    catch(error){
        res.status(SERVER_ERROR.INTERNAL.CODE).json(SERVER_ERROR.INTERNAL.MESSAGE);
    }
}

const getRecommendations = async (req, res) => {
    const userId = Number(req.body.userId);

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