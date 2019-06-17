import {
  sequelize
} from '../database';

class UserController {
  static async getUserList(req, res) {
    res.status(200).json({
      "msg" : "GetUserList"
    })
  }

  static async userSignUp(req, res){

    let tmp = req.get("authorization")

    console.log(tmp)

    res.status(200).json({
      "msg": "Signed Up"
    })
  }
}

module.exports = UserController;