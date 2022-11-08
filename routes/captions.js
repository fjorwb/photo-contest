const express = require('express')
const router = express.Router()

const cache = require('../routeCache')

const captionController = require('../controllers/captionController')

const authentication = require('../middlewares/authentication')

/* GET votes listing. */
router.get('/', cache(1), captionController.getAllCaptions)
// router.get('/data', authentication, cache(600), captionController.getAllCaptionsData);

router.post('/', authentication, captionController.addCaption)
router.get('/captionsByPhoto', authentication, cache(600), captionController.getCaptionsByPhotoId)
router.put('/:id', captionController.updateCaption)
router.delete('/:id', authentication, captionController.deleteCaption)

module.exports = router
