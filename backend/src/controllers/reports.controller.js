import {
  sequelize
} from '../database';

class UserController {
  static async getUserList(req, res) {
    res.status(200).json({
      "msg": "GetUserList"
    })
  }

  static async userSignUp(req, res) {
    // let tmp = req.get("authorization")
    let {
      username,
      password,
      phonenumber,
      emailaddress
    } = req.body;

    try {
      let result = await sequelize.query(`INSERT INTO users (username, password, phonenumber,emailaddress) VALUES ('${username}', '${password}', '${phonenumber}', '${emailaddress}');`)

      //Get userid
      result = await sequelize.query(`select userid, username from Users where username='${username}' AND password='${password}';`)

      let username = result[0][0].username
      let userid = result[0][0].userid

      //Create new Viewer
      result = await sequelize.query(`insert into viewer(userid) values ('${userid}')`)

      //Create new Uploader
      result = await sequelize.query(`insert into uploader(userid) values('${userid}');`)


      res.status(200).json({
        username: username,
        userid: userid
      })
      // let result = await sequelize.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`)
      console.log(result)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

  static async userLogin(req, res) {
    let {
      username,
      password,
    } = req.body;

    try {
      let result = await sequelize.query(`select userid, username, password from Users where username='${username}' AND password='${password}';`)

      console.log("Result: ", result)

      if (result[0].length == 0) {
        throw new Error("No Accounts Found")
      }

      if (req.body.password !== result[0][0].password) {
        throw new Error("Wrong Password")
      }

      res.status(200).json({
        username: result[0][0].username,
        userid: result[0][0].userid
      })

    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        "msg": err.messageg
      })
    }
  }
}

module.exports = UserController;