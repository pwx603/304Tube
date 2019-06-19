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
    // let tmp = req.get("authorization")
    let {
      username,
      password,
      phonenumber,
      emailaddress
    } = req.body;

    try {
      let result = await sequelize.query(`INSERT INTO users (username, password, phonenumber,emailaddress) VALUES ('${username}', '${password}', '${phonenumber}', '${emailaddress}');`)
      res.status(200).json({
            "msg": "Signed Up"
      })
      // let result = await sequelize.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`)
      console.log(result)
    }catch(err){
      console.log(err)
      res.status(400).json(err)
    }
  }
}

module.exports = UserController;