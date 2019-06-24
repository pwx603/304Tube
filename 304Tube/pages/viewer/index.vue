<template>
  <div class="container-fluid">
    <b-row align-h="center" class="pt-5">
      <b-col cols="8">
        <b-input-group prepend="Search:">
          <b-form-input id="searchbox" v-model="keyword"></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" class="primary-button" @click="onSearch">Go</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col class="d-flex justify-content-center">
        <div class="sort-group mt-4">
          <span class="font-weight-bold">Sort:</span>
          <b-button @click="onRefresh('videoname')" variant="primary" class="primary-button">Title</b-button>
          <b-button @click="onRefresh('videoview')" variant="primary" class="primary-button">Views</b-button>
          <b-button
            @click="onRefresh('videolength')"
            variant="primary"
            class="primary-button"
          >Length</b-button>
          <b-button
            @click="onRefresh('uploaddate')"
            variant="primary"
            class="primary-button"
          >Upload Date</b-button>
          <b-button variant="primary" class="primary-button long-button">Above My Avg Views</b-button>
        </div>
      </b-col>
    </b-row>

    <b-row align-h="center" class="mt-4">
      <b-col cols="7" v-for="(video, i) in videoList" :key="i" @click="toVidPage(i)">
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
            <small>Uploaded By: {{video.username}} - Uploaded Date: {{ getDate(video.uploaddate) }}</small>
            <br>
            <small>View Count: {{ video.videoview }}</small>
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
      keyword: null
    };
  },
  methods: {
    onClick() {
      console.log("clicked");
    },

    async onSearch() {
      console.log(this.keyword);

      try {
        let res = await this.$axios({
          method: "get",
          url: process.env.backendAPI + "videos/",
          params: {
            keyword: this.keyword
          }
        });
        console.log(res.data);
        this.videoList = res.data.videos;
        this.videocount = res.data.videocount;
        this.videoviews = res.data.videoviews;
      } catch (err) {
        console.log(err);
        alert("Failed to obtain video list");
      }
    },

    async onRefresh(order) {
      try {
        let res = await this.$axios({
          method: "get",
          url: process.env.backendAPI + "videos/",
          params: {
            orderby: order
          }
        });

        console.log("order by?");

        console.log(res.data);

        this.videoList = res.data.videos;
        this.videocount = res.data.videocount;
        this.videoviews = res.data.videoviews;
      } catch (err) {
        console.log(err);
        alert("Failed to obtain video list");
      }
    },

    async onAboveAveView() {
      try {
        let res = await this.$axios({
          method: "get",
          url: process.env.backendAPI + "videos/",
          params: {
            filter: "aboveAvgView"
          },
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        console.log(res.data);

        this.videoList = res.data.videos;
        this.videocount = res.data.videocount;
        this.videoviews = res.data.videoviews;
      } catch (err) {
        console.log(err);
        alert("Failed to obtain video list");
      }
    },

    async toVidPage(i){

      //Increase my own viewcount

      try{
        let res = await this.$axios({
          method: "patch",
          url: process.env.backendAPI + "users/incView",
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        console.log(res.data)

      }catch(err){
        alert("Failed to inc view count")
        console.log(err)
      }

      let videoid = this.videoList[i].videoid
      this.$router.push(`/watch/${videoid}`)
    },

    getDate(date) {
      let d = new Date(date);
      return d.toLocaleString("en-US", { timeZone: "Canada/Pacific" });
    }
  },

  async asyncData({ $axios, store }) {
    let res = await $axios({
      method: "get",
      url: process.env.backendAPI + "videos/"
    });
    return {
      videoList: res.data.videos,
      videocount: res.data.videocount,
      videoviews: res.data.videoviews
    };
  }
};
</script>

<style>
.primary-button {
  width: 120px;
  color: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #eee;
  text-shadow: none;
}

.long-button {
  width: 200px !important;
}

.card-title {
  margin-bottom: 0;
}
</style>

