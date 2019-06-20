<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="paytment-table mt-5">
          <div class="d-flex align-items-center">
            <h2 class="font-weight-bold d-inline">Reports</h2>
            <div class="w-25 ml-4">
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>

            <!--  <b-modal centered id="modal-add-payment" title="Add Payment" @ok="handleAddPayment">
              <b-form-group
                label-cols-sm="3"
                label="Card Number:"
                label-align-sm="right"
                label-for="creditcardnumber"
              >
                <b-form-input
                  id="creditcardnumber"
                  v-model="addPaymentForm.creditcardnumber"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Billing address:"
                label-align-sm="right"
                label-for="billingaddress"
              >
                <b-form-input id="billingaddress" v-model="addPaymentForm.billingaddress" required></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Expiry Date:"
                label-align-sm="right"
                label-for="expirydate"
              >
                <b-form-input id="expirydate" v-model="addPaymentForm.expirydate" required></b-form-input>
                <small>Format: MMYY</small>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="CV Code:"
                label-align-sm="right"
                label-for="cvcode"
              >
                <b-form-input id="cvcode" v-model="addPaymentForm.cvcode" required></b-form-input>
              </b-form-group>
            </b-modal>
            <b-modal
              centered
              id="modal-delete-payment"
              title="Delete Payment"
              @ok="handleDeletePayment"
            >
              <b-form-group
                label-cols-sm="3"
                label="Card Number:"
                label-align-sm="right"
                label-for="creditcardnumber"
              >
                <b-form-input
                  id="creditcardnumber"
                  v-model="deletePaymentForm.creditcardnumber"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="CV Code:"
                label-align-sm="right"
                label-for="cvcode"
              >
                <b-form-input id="cvcode" v-model="deletePaymentForm.cvcode" required></b-form-input>
              </b-form-group>
            </b-modal>-->
          </div>

          <div class="w-50">
            <b-input-group prepend="Search By Users:">
              <b-form-input id="searchbox"></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" class="primary-button">Go</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <b-table striped hover :items="reportList" :fields="fields"/>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      fields: [
        "videoid",
        "username",
        "status",
        "decision",
        "reportdate",
        "reason"
      ],
      reportList: [
        {
          videoid: "1",
          username: "winso",
          status: "pending",
          decision: "",
          reportdate: "2019-06-19",
          reason: "inappropriate language"
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
