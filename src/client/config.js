const URL = process.env.REACT_APP_API_URL;

const LOGIN_URL = URL + 'user/login';
const REGISTER_URL = URL + 'user/register'

module.exports = {
    URL,
    LOGIN_URL,
    REGISTER_URL
}