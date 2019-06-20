import {
  Router
} from 'express'

const router = Router()

const PaymentCtrl = require('../controllers/payment.controller');

router.get('/', PaymentCtrl.getPaymentList)
router.post('/', PaymentCtrl.addPayment)
router.delete('/', PaymentCtrl.deletePayment)


module.exports = router;