const express = require('express');
const router = express.Router();

const cache = require('../routeCache');

const voteController = require('../controllers/voteController');

const authentication = require('../middlewares/authentication');

/* GET votes listing. */
router.get('/votesByPhoto', authentication, cache(600), voteController.getVotesByPhoto);
router.get('/', cache(600), voteController.getAllVotes);
router.post('/', authentication, voteController.addVote);

module.exports = router;
