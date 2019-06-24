import {
  Router
} from 'express'

const router = Router()

const VideoCtrl = require('../controllers/video.controller');

router.get('/', VideoCtrl.getVideoList)
router.post('/', VideoCtrl.addVideo)
router.get('/:id', VideoCtrl.getVideo)
router.patch('/:id', VideoCtrl.updateVideo)


module.exports = router;