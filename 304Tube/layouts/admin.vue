<template>
  <div class="container-fluid outer-wrap">
    <div class="row max_view">
      <div class="col-2 sideNav">
        <img src="~/assets/304tube_icon.png" width="40%" height="auto" class="center">

        <div class="side-menu mt-3">
          <nuxt-link to="/admin/" class="text-white font-weight-bold">
            Report
            <br>
          </nuxt-link>
          <nuxt-link to="/admin/stats" class="text-white font-weight-bold">
            Stats
            <br>
          </nuxt-link>
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
      username: "Anyonomous User"
    };
  },
  mounted() {
    let getUsername = this.$store.getters["authenticate/getUsername"];

    if (getUsername) {
      this.username = getUsername;
    }
    console.log("mounted");
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

