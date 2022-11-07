const express = require('express');
const router = express.Router();

const cache = require('../routeCache');

const {
	getAllCategories,
	getCategoryById,
	addCategory,
	updateCategory,
	deleteCategory
} = require('../controllers/categoryController');

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

/* GET photos listing. */ //keep this order
router.get('/', getAllCategories);
router.get(
	'/:id',
	authentication,
	authorization(['admin', 'manager', 'user']),
	cache(5),
	getCategoryById
);
router.post('/', authentication, authorization(['admin', 'manager', 'user']), addCategory);
router.put('/:id', authentication, authorization(['admin', 'manager', 'user']), updateCategory);
router.delete('/:id', authentication, authorization(['admin', 'manager', 'user']), deleteCategory);

module.exports = router;
