const express = require('express')
const router = express.Router()

const cache = require('../routeCache')

const {
	getAllPhotos,
	getAllPhotos2,
	getAllPhotosData,
	getAllCaptionsByPhoto,
	getAllPhotosCategoryByCategoryId,
	getAllPhotosCategory,
	getPhotoById,
	addPhoto,
	updatePhoto,
	deletePhoto
} = require('../controllers/photoController')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

/* GET photos listing. */ //keep this order
router.get('/category/:id', cache(600), getAllPhotosCategoryByCategoryId)
router.get('/category/', cache(600), getAllPhotosCategory)
router.get('/captions', authentication, getAllCaptionsByPhoto)
router.get('/data2', getAllPhotos2)
router.get('/data', getAllPhotosData)
router.get('/', cache(20), getAllPhotos)
router.get('/:id', cache(20), getPhotoById)
// router.post('/', authentication, authorization(['admin', 'manager', 'user']), addPhoto);
router.post('/data2', addPhoto)
router.post('/', addPhoto)
router.put('/data2/:id', updatePhoto)
router.delete('/data2/:id', deletePhoto)

module.exports = router
