import {
  sequelize
} from '../database';

class VideoController {
  static async getVideoList(req, res) {
    let userid = req.get("userid")

    try {

      if (userid) {
        let result = await sequelize.query(`select users.username, videoupload.* from users, videoupload where videoupload.userid=${userid} AND users.userid=videoupload.userid ORDER BY uploaddate;`)
        let videos = result[0]
        
        result = await sequelize.query(`select sum(videoview), count(videoid), avg(videoview) from videoupload where userid = '${userid}';`)

        let{
          sum,
          count,
          avg
        } = result[0][0]

        console.log(sum, count)

        res.status(200).json({videocount: count, videoviews: sum, averageview: avg, videos: videos})
        return
      }

      if(req.query.orderby){

        let result = await sequelize.query(`select users.username, videoupload.* from users, videoupload where users.userid=videoupload.userid ORDER BY ${req.query.orderby};`)
        let videos = result[0]
        result = await sequelize.query(`select sum(videoview), count(videoid) from videoupload;`)
        let{
          sum,
          count
        } = result[0][0]
  
        console.log(sum, count)
        res.status(200).json({videocount: count, videoviews: sum, videos: videos})
        return
      }

      if(req.query.keyword){
        let result = await sequelize.query(`select users.username, videoupload.* from users, videoupload where videoname Ilike '%${req.query.keyword}%' AND users.userid=videoupload.userid;`)
        let videos = result[0]
        result = await sequelize.query(`select sum(videoview), count(videoid) from videoupload;`)
        let{
          sum,
          count
        } = result[0][0]
  
        console.log(sum, count)
        res.status(200).json({videocount: count, videoviews: sum, videos: videos})
        return
      }

      let result = await sequelize.query(`select users.username, videoupload.* from users, videoupload where users.userid=videoupload.userid ORDER BY uploaddate DESC;`)
      let videos = result[0]
      result = await sequelize.query(`select sum(videoview), count(videoid) from videoupload;`)
      let{
        sum,
        count
      } = result[0][0]

      console.log(sum, count)
      res.status(200).json({videocount: count, videoviews: sum, videos: videos})


    } catch (err) {
      console.log(err)
      res.status(400), json(err)
    }

  }

  static async addVideo(req, res) {
    let userid = req.get("userid")
    let {
      videoname,
      videolength,
      videogenre,
      thumbnailurl
    } = req.body;

    try {
      let result = await sequelize.query(`insert into videoupload (userid, videoname, videolength, videogenre, thumbnailurl) values ('${userid}', '${videoname}', '${videolength}', '${videogenre}', '${thumbnailurl}');`)
      console.log("Result: ", result)

      res.status(200).json({
        "msg": "Video Successfully Added"
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)

    }
  }

  static async getVideo(req, res) {
    let videoId = req.params.id;

    try {

      let result = await sequelize.query(`select users.username, videoupload.* FROM users, videoupload where videoid='${videoId}' AND users.userid=videoupload.userid;`)
      let video = result[0][0]

      if(!video){
        throw new Error("No video was found")
      }
      res.status(200).json(video)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

  static async updateVideo(req, res){
    let videoId = req.params.id;
    
    let{
      videoname,
      videolength,
      videogenre,
      thumbnailurl,
      uploaddate
    } = req.body;

    try {

      if(req.query.inc){
        console.log("increase count")

        let result = await sequelize.query(`UPDATE videoupload set videoview=videoview + 1 where videoid='${videoId}';`)
        console.log("Result: ", result)

        res.status(200).json({
          "msg": "Video Updated Added"
        })

        return

      }
  


      let result = await sequelize.query(`UPDATE videoupload set (videoname, videolength, videogenre, thumbnailurl) = ('${videoname}', '${videolength}', '${videogenre}', '${thumbnailurl}') where videoid='${videoId}';`)
      console.log("Result: ", result)

      res.status(200).json({
        "msg": "Video Updated Added"
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)

    }
  }

}

module.exports = VideoController;