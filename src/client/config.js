const URL = process.env.REACT_APP_API_URL;

const LOGIN_URL = URL + 'user/login';
const REGISTER_URL = URL + 'user/register'

const GET_BOOKS_URL = URL + 'book/';

const POST_RECOMMENDATION = URL + 'recommendation/';

const GET_RECOMMENDATION = URL + 'recommendation/'

module.exports = {
    URL,
    LOGIN_URL,
    REGISTER_URL,
    GET_BOOKS_URL,
    POST_RECOMMENDATION,
    GET_RECOMMENDATION
}