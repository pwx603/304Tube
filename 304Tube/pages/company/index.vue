<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="paytment-table mt-5">
          <div class="d-flex align-items-center">
            <h2 class="font-weight-bold d-inline">Ads</h2>
            <b-button v-b-modal.modal-add-video variant="primary" class="primary-button m-4">+ Add</b-button>
          </div>

          <b-table striped hover :items="reportList" :fields="fields"/>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: "company",
  data() {
    return {
      fields: ["videoid", "adlength", "adinfo"],
      reportList: [
        {
          videoid: "1",
          adlength: "0:15",
          adinfo: "Try our new coke"
        }
      ],
      options: [
        { value: null, text: "All" },
        { value: "appropriate", text: "Appropriate" },
        { value: "inappropriate", text: "Inappropriate" },
        { value: "", text: "Undecided" }
      ]
    };
  }
};
</script>

<style>
</style>
