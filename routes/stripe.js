const express = require('express');
const router = express.Router();

const stripeX = require('../controllers/stripeController');

// const authentication = require('../middlewares/authentication');

router.post('/', stripeX);

module.exports = router;
