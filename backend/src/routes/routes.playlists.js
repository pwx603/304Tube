import {
  Router
} from 'express'

const router = Router()

const PlaylistCtrl = require('../controllers/playlist.controller');

router.post('/', PlaylistCtrl.addPlaylist)
router.get('/', PlaylistCtrl.getPlaylist)
router.delete('/',PlaylistCtrl.deletePlaylist)
router.post('/addvideo', PlaylistCtrl.addVideo)


module.exports = router;