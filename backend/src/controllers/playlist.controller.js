import {
  sequelize
} from '../database';

class PlaylistController {
  static async getPlaylist(req, res) {
    let userid = req.get("userid")

    try {
      let result = await sequelize.query(`select * from listcreate where userid='${userid}';`)
      console.log("result", result[0])
      res.status(200).json(result[0])

    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }

  }

  static async addPlaylist(req, res) {
    let userid = req.get("userid")
    let {
      listname,
    } = req.body;

    try {
      let result = await sequelize.query(`insert into listcreate (userid, listname) values ('${userid}', '${listname}');`)
      console.log("Result: ", result)

      res.status(200).json({
        "msg": "Playlist Successfully Added"
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

  static async addVideo(req, res) {
    let{
      videoid,
      listid
    } = req.body

    console.log(req.body)

    console.log("Add video")


    try {

      let result = await sequelize.query(`insert into listvideo (listid, videoid) values ('${listid}', '${videoid}');`)
      console.log("Result", result)

      res.status(200).json({'msg': "video successfully added"})
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

  static async deletePlaylist(req,res){
    try {

      let {
        listid
      } = req.body;

      let result = await sequelize.query(`DELETE FROM listcreate where listid='${listid}';`)
      console.log(result)

      res.status(200).json({
        "msg": "list is Deleted"
      })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }

  }
}

module.exports = PlaylistController;