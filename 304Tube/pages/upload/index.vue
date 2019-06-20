<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="paytment-table mt-5">
          <div class="d-flex-column align-items-center">
            <h2 class="font-weight-bold d-inline">Upload Video</h2>

            <b-button v-b-modal.modal-add-video variant="primary" class="primary-button m-4">+ Add</b-button>
            <!-- <b-button
              v-b-modal.modal-delete-payment
              variant="danger"
              class="primary-button m-4"
            >- Delete</b-button>-->

            <center centered id="modal-add-video" title="Add Video" @ok="handleAddVideo" size="xl">
              <b-form-group
                label-cols-sm="3"
                label="Youtube Link:"
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
                <img :src="addVideoForm.imageurl" alt>
              </center>
            </center>

            <p class="mt-4">Uploaded Videos: 3</p>
            <p>Total View Count: 15</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="7">
        <b-card
          bg-variant="warning"
          title="Best Clutch Plays | 2019 NBA Postseason"
          img-src="https://i.ytimg.com/vi/HvvRcAeTn8k/hqdefault.jpg"
          img-alt="Card image"
          img-height="180"
          img-width="320"
          img-left
          class="mb-3"
        >
          <b-card-text>
            <small>Uploaded By: winso - View Count: 11</small>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="7">
        <b-card
          bg-variant="warning"
          title="3 NBA Players Who Agreed To Sign With A Team...But Changed Their Minds!"
          img-src="https://i.ytimg.com/vi/MyPP0WAueEA/mqdefault.jpg"
          img-alt="Card image"
          img-height="180"
          img-width="320"
          img-left
          class="mb-3"
        >
          <b-card-text>
            <small>Uploaded By: winso - View Count: 2</small>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="7">
        <b-card
          bg-variant="warning"
          title="The Truth Behind Tanking In The NBA"
          img-src="https://i.ytimg.com/vi/Fp0NBgeB2Hc/mqdefault.jpg"
          img-alt="Card image"
          img-height="180"
          img-width="320"
          img-left
          class="mb-3"
        >
          <b-card-text>
            <small>Uploaded By: winso - View Count: 2</small>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      addVideoForm: {
        url: null,
        videoname: null,
        videolength: null,
        videogenre: null,
        imageurl: null
      }
    };
  },
  methods: {
    async generateInfo() {
      let videoID = this.extractVideoID(this.addVideoForm.url);

      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${
        process.env.youtubeKey
      }`;

      try {
        let res = await this.$axios({
          method: "get",
          url: url
        });
        let videoInfo = res.data.items[0].snippet;
        this.addVideoForm.videoname = videoInfo.title;
        this.addVideoForm.imageurl = videoInfo.thumbnails.medium.url;

        console.log(videoInfo);
      } catch (err) {
        console.log(err);
        alert("Failed to generate video info.");
      }
    },

    handleAddVideo() {
      console.log("handleAddVideo");
      console.log(this.addVideoForm);
    },

    extractVideoID(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[7].length == 11) {
        return match[7];
      } else {
        alert("Could not extract video ID.");
      }
    }
  }
};
</script>

<style>
</style>
