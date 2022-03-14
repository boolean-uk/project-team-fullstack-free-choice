const SERVER_ERROR = {
    UNAUTHORIZED: { MESSAGE: 'Unauthorized', CODE: 401},
    FORBIDDEN: { MESSAGE: 'Forbidden', CODE: 403},
    NOT_FOUND: { MESSAGE: 'Not found', CODE: 404},
    INTERNAL: { MESSAGE: 'Internal server error', CODE: 500}
};

const SERVER_SUCCESS = {
    OK: { MESSAGE: 'OK Successful', CODE: 200 },
    POST_OK: { MESSAGE: 'Post Successful', CODE: 201 },
    DELETE_OK: { MESSAGE: 'Delete Successful', CODE: 201 },
    UPDATE_OK: { MESSAGE: 'Update Successful', CODE: 201 }
}

const PRISMA_ERROR = {
    UNIQUE_CONSTRAINT_VIOLATION: { 
        SERVER_MESSAGE: 'There is a unique constraint violation, a new user cannot be created with this email or username',
        CLIENT_MESSAGE_REGISTER: 'Username or email associated with existing account'
    }
}

const SECRET = process.env.SECRET;

const GENRES = ['Fantasy', 'Horror', 'Science-Fiction', 'Romance', 'Adventure', 'History', 'Travel', 'Art', 'Health', 'Humor'];


module.exports = {
    SERVER_ERROR,
    SERVER_SUCCESS,
    PRISMA_ERROR,
    GENRES,
    SECRET,
}