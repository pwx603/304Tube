<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="paytment-table mt-5">
          <div class="d-flex-column align-items-center">
            <h2 class="font-weight-bold d-inline">Upload Video</h2>

            <b-button v-b-modal.modal-add-video variant="primary" class="primary-button m-4">+ Add</b-button>
            <!-- <b-button @click="onRefresh" variant="primary" class="primary-button m-4">Refresh</b-button> -->
            <!-- <b-button
              v-b-modal.modal-delete-payment
              variant="danger"
              class="primary-button m-4"
            >- Delete</b-button>-->

            <b-modal id="modal-add-video" title="Add Video" @ok="handleAddVideo" size="xl">
              <b-form-group
                label-cols-sm="3"
                label="Resource(Youtube URL):"
                label-align-sm="right"
                label-for="url"
              >
                <b-form-input id="url" v-model="addVideoForm.url" required></b-form-input>
                <b-button
                  variant="primary"
                  class="primary-button mt-3"
                  @click="generateInfo"
                >Generate</b-button>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Video Name:"
                label-align-sm="right"
                label-for="videoname"
              >
                <b-form-input id="videoname" v-model="addVideoForm.videoname" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Video Length:"
                label-align-sm="right"
                label-for="videolength"
              >
                <b-form-input id="videolength" v-model="addVideoForm.videolength" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Video Genre:"
                label-align-sm="right"
                label-for="videogenre"
              >
                <b-form-input id="videogenre" v-model="addVideoForm.videogenre" required></b-form-input>
              </b-form-group>
              <center>
                <h4>Preview Image</h4>
                <img :src="addVideoForm.thumbnailurl" alt>
              </center>
            </b-modal>

            <b-modal ref="edit-video-modal" id="modal-edit-video" title="Edit Video" @ok="handleEditVideo" size="xl">
              <b-form-group
                label-cols-sm="3"
                label="Video Name:"
                label-align-sm="right"
                label-for="edit-videoname"
              >
                <b-form-input id="edit-videoname" v-model="editVideo.videoname" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Video Length:"
                label-align-sm="right"
                label-for="edit-videolength"
              >
                <b-form-input id="edit-videolength" v-model="editVideo.videolength" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Video Genre:"
                label-align-sm="right"
                label-for="edit-videogenre"
              >
                <b-form-input id="edit-videogenre" v-model="editVideo.videogenre" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Thumbnail URL:"
                label-align-sm="right"
                label-for="edit-thumbnail"
              >
                <b-form-input id="edit-thumbnail" v-model="editVideo.thumbnailurl" required></b-form-input>
              </b-form-group>


              <center>
                <h4>Preview Image</h4>
                <img :src="editVideo.thumbnailurl" alt>
              </center>
            </b-modal>

            <p class="mt-4">Uploaded Videos: {{ videocount }}</p>
            <p>Average View Count: {{ averageview }}</p>
            <p>Total View Count: {{ videoviews }}</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="7" v-for="(video, i) in videoList" :key="i" @click="onEdit(i)">
        <b-card
          bg-variant="warning"
          :title="video.videoname"
          :img-src="video.thumbnailurl"
          img-alt="Card image"
          img-height="180px"
          img-width="320px"
          img-left
          class="mb-3"
        >
          <b-card-text>
            <small>Uploaded By: {{video.username}} - Uploaded Date: {{  getDate(video.uploaddate) }}</small>
            <br>
            <small>View Count: {{ video.videoview }}</small>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { parse as parseDuration, pattern } from "iso8601-duration";

export default {
  layout: "home",
  data() {
    return {
      addVideoForm: {
        url: null,
        videoname: null,
        videolength: null,
        videogenre: null,
        thumbnailurl: null
      },
      editVideo:{
        videoname: null,
        videolength: null,
        videogenre: null,
        thumbnailurl: null
      }
    };
  },

  methods: {
    async generateInfo() {
      let videoID = this.extractVideoID(this.addVideoForm.url);

      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails&id=${videoID}&key=${
        process.env.youtubeKey
      }`;

      try {
        let res = await this.$axios({
          method: "get",
          url: url
        });
        let videoInfo = res.data.items[0];
        this.addVideoForm.videoname = videoInfo.snippet.title;
        this.addVideoForm.thumbnailurl =
          videoInfo.snippet.thumbnails.medium.url;

        let categoryId = videoInfo.snippet.categoryId;
        let duration = videoInfo.contentDetails.duration;

        console.log(duration);

        this.addVideoForm.videolength = this.formatDuration(duration);
        url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryId}&key=${
          process.env.youtubeKey
        }`;

        res = await this.$axios({
          method: "get",
          url: url
        });

        this.addVideoForm.videogenre = res.data.items[0].snippet.title;
      } catch (err) {
        console.log(err);
        alert("Failed to generate video info.");
      }
    },

    async handleAddVideo() {
      try {
        let res = await this.$axios({
          method: "post",
          url: process.env.backendAPI + "videos/",
          data: this.addVideoForm,
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        console.log(res.data);
        alert("Video Uploadedad Succesfully");
        this.addVideoForm = {
          url: null,
          videoname: null,
          videolength: null,
          videogenre: null,
          thumbnailurl: null
        };

        await this.onRefresh()

      } catch (err) {
        console.log(err);
        alert("Failed to upload video");
      }
    },

    async onRefresh(){
      try{
        let res = await this.$axios({
          method: "get",
          url: process.env.backendAPI + "videos/",
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });
        console.log(res.data)

        this.videoList = res.data.videos
        this.videocount = res.data.videocount
        this.videoviews = res.data.videoviews
        this.averageview = res.data.averageview


      }catch(err){
        console.log(err);
        alert("Failed to obtain video list")
      }
    },

    async onEdit(key){
      this.editVideo = Object.assign({}, this.videoList[key])
      console.log(this.editVideo)
      this.$refs['edit-video-modal'].show()
      
    },

    async handleEditVideo(){
      console.log(this.editVideo)

      try{
      let res = await this.$axios({
          method: "patch",
          url: process.env.backendAPI + `videos/${this.editVideo.videoid}`,
          data: this.editVideo,
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        await this.onRefresh();

      }catch(err){
        console.log(err)
        alert("Failed to update video")

      }


    },

    extractVideoID(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[7].length == 11) {
        return match[7];
      } else {
        alert("Could not extract video ID.");
      }
    },

    formatDuration(duration) {
      let d = parseDuration(duration);
      return `${d.hours}:${d.minutes}:${d.seconds}`;
    },

    getDate(date){
      let d = new Date(date)
      return d.toLocaleString('en-US', { timeZone: 'Canada/Pacific' })
    }
  },



  async asyncData({ $axios, store }) {
    let res = await $axios({
      method: "get",
      url: process.env.backendAPI + "videos/",
      headers: {
        userid: store.getters["authenticate/getUserid"]
      }
    });
    return { videoList: res.data.videos, videocount: res.data.videocount, averageview: Number(res.data.averageview), videoviews: res.data.videoviews};
  }
};
</script>

<style>
</style>
