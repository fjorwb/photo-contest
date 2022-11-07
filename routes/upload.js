
const express = require('express');
const router = express.Router();

const { uploadPhoto } = require('../controllers/uploadController');

const authentication = require('../middlewares/authentication');


router.post('/', authentication, uploadPhoto);

module.exports = router;
