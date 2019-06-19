<template>
  <div class="container-fluid bg-primary">
    <div class="row bg-warning">
      <div class="col-sm">One of three columns</div>
      <div class="col-sm bg-info">One of three columns</div>
    </div>

    <!-- <div>
      <logo />
      <h1 class="title">
        304Tube
      </h1>
      <h2 class="subtitle">
        Cute Rosy
    </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div>
    </div>-->
  </div>
</template>

<script>


export default {
  components: {
  }
};
</script>

<style>
.container-fluid {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* text-align: center; */
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: pink;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.row{
  width: 100%;
  min-height: 100%;
}

.col-sm{
  height: 100%;
}
</style>
