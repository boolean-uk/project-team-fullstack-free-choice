const { prisma } = require('../utils/prisma');

import { SERVER_SUCCESS, SERVER_ERROR } from '../config';

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

        res.status(SERVER_SUCCESS.OK.CODE).json({data: savedBooks})
    }
    catch(error){
        res.status(SERVER_ERROR.INTERNAL.CODE).json(SERVER_ERROR.INTERNAL.MESSAGE);
    }
}

const getUsersRecommendations = async (req, res) => {
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
    getUsersRecommendations
 }