require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { SERVER_STATUS } = require('./config.js');

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.resolve(__dirname, '../../build')));
}


//


app.get('/hello', (req, res) => {
    res.send(SERVER_STATUS.HELLO);
});

app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n ${SERVER_STATUS.STARTED} ${port}\n`);
});