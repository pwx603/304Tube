<template>
  <div class="container-fluid">
    <div class="row bg-warning">
      <div class="col-7 page_icon">
        <img src="~/assets/304tube_icon.png" width="40%" height="auto">
        <h2 class="text-white">Experience how videos are meant to be streamed</h2>
      </div>
      <div class="col-5 page_login">
        <nuxt />
      </div>
    </div>
  </div>
</template>


<style>
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.row {
  width: 100%;
  min-height: 100%;
}

.page_icon {
  background-color: #4d5056;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page_login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eae73c;
}
</style>
