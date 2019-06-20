import {
  sequelize
} from '../database';

class PaymentController {
  static async getPaymentList(req, res) {
    let userid = req.get("userid")

    console.log("userid: ", userid)

    try {
      let result = await sequelize.query(`select creditcardnumber, billingaddress, expirydate from paymentinformationown where userid='${userid}';`)
      console.log(result)

      res.status(200).json(result[0])

    } catch (err) {
      res.status(400), json(err)
    }
  }

  static async addPayment(req, res) {
    let userid = req.get("userid")
    let {
      creditcardnumber,
      billingaddress,
      expirydate,
      cvcode
    } = req.body;

    try {
      let result = await sequelize.query(`insert into paymentinformationown values ('${userid}', '${creditcardnumber}', '${billingaddress}', '${expirydate}', '${cvcode}');`)
      console.log("Result: ", result)

      res.status(200).json({
        "msg": "Payment Information Added"
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)

    }
  }

  static async deletePayment(req, res) {
    let userid = req.get("userid")

    console.log("userid", userid)
    console.log("req bosy", req.body)

    try {

      let {
        creditcardnumber,
        cvcode
      } = req.body;

      let result = await sequelize.query(`DELETE FROM paymentinformationown where userid='${userid}' AND creditcardnumber='${creditcardnumber}' and cvcode='${cvcode}';`)


      if (result[1].rowCount == 0){
        throw new Error("No records was deleted")
      }

      res.status(200).json({
        "msg": "Payment Information Deleted"
      })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }


  }
}

module.exports = PaymentController;