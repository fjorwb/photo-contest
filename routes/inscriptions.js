const express = require('express');
const router = express.Router();

const cache = require('../routeCache');

const inscriptionController = require('../controllers/inscriptionController');

const authentication = require('../middlewares/authentication');

/* GET inscriptions listing. */
router.get('/', authentication, cache(600), inscriptionController.getAllInscriptions);
router.get('/data', authentication, cache(600), inscriptionController.getAllInscriptionsData);
router.get('/paid', authentication, cache(600), inscriptionController.getPaidInscriptions);
router.get('/unpaid', authentication, cache(600), inscriptionController.getUnpaidInscriptions);
router.get('/:id', authentication, cache(600), inscriptionController.getInscriptionByUserId);

module.exports = router;
