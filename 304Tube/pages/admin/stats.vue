<template>
  <b-row align-h="center">
    <b-col cols="8">
      <div class="paytment-table mt-5">
        <div class="d-flex flex-column">
          <h2 class="font-weight-bold d-inline">Stats</h2>

          <p>Average number of videos uploaded by each uploader: 1</p>
          <p>Viewer who has seen all videos:</p>
          <ul>
            <li>wins</li>
          </ul>
          <p>Videos with ads from all companies</p>
          <ul>
            <li>2 - 3 NBA Players Who Agreed To Sign With A Team...But Changed Their Minds!</li>
          </ul>
        </div>

        <b-table striped hover :items="reportList" :fields="fields"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  layout: "admin",
  data(){
    return{

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
</style>
