const express = require('express');
const {
    abc
} = require("../controllers/init");

const router = express.Router()

router.get("/rawData", abc)

module.exports = router;