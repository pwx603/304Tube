import {
  Router
} from 'express'

const router = Router()

const UserCtrl = require('../controllers/user.controller');

router.get('/getView', UserCtrl.getView)
router.patch('/incView', UserCtrl.increaseView)
router.post('/login', UserCtrl.userLogin)
router.get('/', UserCtrl.getUserList)
router.post('/', UserCtrl.userSignUp)



// router.post('/signUp', UserCtrl.signUp)
// router.post('/signIn', UserCtrl.signIn)

module.exports = router;