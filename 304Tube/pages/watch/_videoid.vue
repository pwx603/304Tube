<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="mt-5">
          <div class="d-flex-column align-items-center">
            <h2
              class="font-weight-bold d-inline"
            >{{video.videoname}}</h2>
            <p class="mt-4">Uploaded By: {{video.username}}</p>
            <p>View Count: {{video.videoview}}</p>
            <b-button variant="primary" class="primary-button" @click="handleSave">Save to List</b-button>
                      <b-modal
            ref="playlist-modal"
            id="modal-add-playlist"
            title="Add Playlist"
            @ok="handleAddtoPlayList"
          >

            <label for="playlistSelect">Type of Organization</label>
        <b-form-select class="form-control" id="playlistSelect" v-model="selectedPlaylist">
          <option v-for="(list, i) in playlist" :key="i" :value="i">{{ list.listname }}</option>
        </b-form-select>

          
            <!-- <b-form-group
              label-cols-sm="3"
              label="Playlist Name:"
              label-align-sm="right"
              label-for="playlist"
            >
              <b-form-input id="playlist" v-model="playlistName" required></b-form-input>
            </b-form-group> -->
          </b-modal>
            <b-button variant="danger" class="primary-button">Report</b-button>
          </div>
          <div class="mt-3">
            <center>
              <img :src="video.thumbnailurl" alt width="640">
            </center>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      id: this.$route.params.videoid,
      video: {
        username: null,
        videoview: 0,
        thumbnailurl: null
      },

      playlist: [],

      selectedPlaylist:{
        listid:null
      }
    };
  },
  methods: {
    async handleSave() {
      this.$refs["playlist-modal"].show();
      console.log(this.$route.params);
      let res = await this.$axios({
        method: "get",
        url: process.env.backendAPI + "playlists",
        headers: {
          userid: this.$store.getters["authenticate/getUserid"]
        }
      });

      this.playlist = res.data;
    },

    async handleAddtoPlayList(){

      console.log(this.selectedPlaylist)

        let res = await this.$axios({
        method: "post",
        url: process.env.backendAPI + "playlists/addvideo",
        data: {
          videoid: this.$route.params.videoid,
          listid: this.playlist[this.selectedPlaylist].listid
        }

        
      });

      alert("Successfully saved to playlist")
    }
  },

  async asyncData({ $axios, store, params }) {
    try {
      let res = await $axios({
        method: "patch",
        url: process.env.backendAPI + `videos/${params.videoid}`,
        params:{
          inc: true
        }
      });

      console.log("result", res)

      res = await $axios({
        method: "get",
        url: process.env.backendAPI + `videos/${params.videoid}`
      });
      console.log(res)
      return { video: res.data };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
</style>
