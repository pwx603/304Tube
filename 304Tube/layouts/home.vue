<template>
  <div class="container-fluid outer-wrap">
    <div class="row max_view">
      <div class="col-2 sideNav">
        <img src="~/assets/304tube_icon.png" width="40%" height="auto" class="center" @click="test">
        <h6 class="statusText text-white font-weight-bold mt-4">
          Hello, {{username}}
          <br>
          Viewcount: {{viewcount}}
          <br>
          <u @click="addPlayList">Playlist:</u>
          <b-modal
            ref="playlist-modal"
            id="modal-add-playlist"
            title="Add Playlist"
            @ok="handleAddPlayList"
          >
            <b-form-group
              label-cols-sm="3"
              label="Playlist Name:"
              label-align-sm="right"
              label-for="playlist"
            >
              <b-form-input id="playlist" v-model="playlistName" required></b-form-input>
            </b-form-group>
          </b-modal>
        </h6>
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            v-for="list in playlist"
            :key="list.listid"
          >
            {{list.listname}}
            <b-button variant="danger" size="sm" @click="onDelete(list.listid)">-</b-button>
          </b-list-group-item>
        </b-list-group>

        <hr class="mt-3">

        <div class="side-menu mt-3">
          <nuxt-link to="/viewer/" class="text-white font-weight-bold">
            Home
            <br>
          </nuxt-link>
          <nuxt-link to="/viewer/payment" class="text-white font-weight-bold">
            Payment Information
            <br>
          </nuxt-link>
          <nuxt-link to="/upload" class="text-white font-weight-bold">Upload</nuxt-link>
        </div>
      </div>
      <div class="col-10 page_login">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "Anyonomous User",
      viewcount: 0,
      playlistName: "",
      playlist: []
    };
  },

  async mounted() {
    let getUsername = this.$store.getters["authenticate/getUsername"];

    if (getUsername) {
      this.username = getUsername;
    }

    let res = await this.$axios({
      method: "get",
      url: process.env.backendAPI + "users/getView",
      headers: {
        userid: this.$store.getters["authenticate/getUserid"]
      }
    });

    this.viewcount = res.data.viewcount;

    await this.updatePlaylist();

    console.log("mounted");
  },

  methods: {
    test() {
      console.log(this.viewcount);
    },

    addPlayList() {
      this.$refs["playlist-modal"].show();
      console.log("added Playlist");
    },
    async handleAddPlayList() {
      let res = await this.$axios({
        method: "post",
        url: process.env.backendAPI + "playlists/",
        data: {
          listname: this.playlistName
        },
        headers: {
          userid: this.$store.getters["authenticate/getUserid"]
        }
      });

      await this.updatePlaylist()
    },

    async updatePlaylist() {
      let res = await this.$axios({
        method: "get",
        url: process.env.backendAPI + "playlists",
        headers: {
          userid: this.$store.getters["authenticate/getUserid"]
        }
      });

      this.playlist = res.data;
    },

    async onDelete(key) {
      let res = await this.$axios({
        method: "delete",
        url: process.env.backendAPI + "playlists",
        data:{
          listid: key
        }
      });

      await this.updatePlaylist()

      console.log(key);
    }
  }
};
</script>



<style scoped>
html {
  font-family: Helvetica;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container-fluid {
  margin: 0 auto;
  padding: 0;
}

.outer-wrap {
  min-height: 100vh;
}

.max_view {
  width: 100%;
  min-height: 100vh;
}

.page_icon {
  background-color: #4d5056;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page_login {
  background-color: #eae73c;
}

.sideNav {
  background-color: #4d5056;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.statusText {
  line-height: 2em;
}

hr {
  border: 1px solid white;
}
</style>

