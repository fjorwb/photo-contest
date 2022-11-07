const express = require('express');
const router = express.Router();

const cache = require('../routeCache');

const userController = require('../controllers/userController');

const authentication = require('../middlewares/authentication');

/* GET users listing. */
router.get('/', authentication, cache(600), userController.getAll);
router.get('/fees/:id', authentication, cache(600), userController.getFeesByUserId);
router.get('/:id', authentication, cache(600), userController.getUserById);
router.post('/', authentication, userController.addUser);
router.put('/:id', authentication, userController.updateUser);
router.delete('/:id', authentication, userController.deleteUser);

module.exports = router;
