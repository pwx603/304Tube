<template>
  <div class="container-fluid">
    <b-row align-h="center" class="pt-5">
      <b-col cols="8">
        <b-input-group prepend="Search:">
          <b-form-input id="searchbox"></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" class="primary-button">Go</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col class="d-flex justify-content-center">
        <div class="sort-group mt-4">
          <span class="font-weight-bold">Sort:</span>
          <b-button variant="primary" class="primary-button">Title</b-button>
          <b-button variant="primary" class="primary-button">Views</b-button>
          <b-button variant="primary" class="primary-button">Length</b-button>
          <b-button variant="primary" class="primary-button">Upload Date</b-button>
          <b-button variant="primary" class="primary-button">Above My Views</b-button>
        </div>
      </b-col>
    </b-row>
    <!-- <b-row align-h="center" class="mt-4">
      <b-col cols="7" v-for="i in 10" :key=i>
        <b-card
          bg-variant="warning"
          title="Title"
          img-src="https://i.ytimg.com/vi/AGrynEIyI6k/mqdefault.jpg"
          img-alt="Card image"
          img-left
          class="mb-3"
          @click="onClick"
        >
          <b-card-text>
            <small>Uploaded By: Jason - View Count: 1234</small>
          </b-card-text>
          <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text>
        </b-card>
      </b-col>
    </b-row>-->
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
  methods: {
    onClick() {
      console.log("clicked");
    }
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

.card-title {
  margin-bottom: 0;
}
</style>

