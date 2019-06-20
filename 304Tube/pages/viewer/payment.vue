<template>
  <div class="container-fluid">
    <b-row align-h="center">
      <b-col cols="8">
        <div class="paytment-table mt-5">
          <div class="d-flex align-items-center">
            <h2 class="font-weight-bold d-inline">Payment Information</h2>
            <b-button v-b-modal.modal-add-payment variant="primary" class="primary-button m-4">+ Add</b-button>
            <b-button
              v-b-modal.modal-delete-payment
              variant="danger"
              class="primary-button m-4"
            >- Dekete</b-button>
            <b-modal centered id="modal-add-payment" title="Add Payment" @ok="handleAddPayment">
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
            </b-modal>
          </div>

          <b-table striped hover :items="paymentList" :fields="fields"/>
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
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ["creditcardnumber", "billingaddress", "expirydate"],
      addPaymentForm: {
        creditcardnumber: null,
        billingaddress: null,
        expirydate: null,
        cvcode: null
      },
      deletePaymentForm: {
        creditcardnumber: null,
        cvcode: null
      }
    };
  },
  methods: {
    async getPaymentInfo() {
      try {
        console.log("getPayment");

        let userId = this.$store.getters["authenticate/getUserid"];
        console.log("UserId: ", userId);

        let res = await this.$axios({
          method: "get",
          url: process.env.backendAPI + "payments/",
          headers: {
            userid: userId
          }
        });

        this.paymentList = res.data;
      } catch (err) {
        alert("Failed to retrieve Payment Informations");
      }
    },

    async handleDeletePayment() {
      console.log(this.deletePaymentForm);

      try {
        let res = await this.$axios({
          method: "delete",
          url: process.env.backendAPI + "payments/",
          data: this.deletePaymentForm,
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        console.log(res);
        alert("Payment Info Deleted Successfully");
        await this.getPaymentInfo();
      } catch (err) {
        console.log(err);
        alert("Failed to delete payment info");
      }
    },
    async handleAddPayment() {
      try {
        let res = await this.$axios({
          method: "post",
          url: process.env.backendAPI + "payments/",
          data: this.addPaymentForm,
          headers: {
            userid: this.$store.getters["authenticate/getUserid"]
          }
        });

        console.log(res.data);
        alert("Payment Added Succesfully");
        this.addPaymentForm = {
          creditcardnumber: null,
          billingaddress: null,
          expirydate: null,
          cvcode: null
        };

        await this.getPaymentInfo();
      } catch (err) {
        console.log(err);
        alert("Failed to add payment information");
      }
      console.log("Handle Add Payment");
      console.log(this.addPaymentForm);
    }
  },

  async asyncData({ $axios, store }) {
    let res = await $axios({
      method: "get",
      url: process.env.backendAPI + "payments/",
      headers: {
        userid: store.getters["authenticate/getUserid"]
      }
    });
    return { paymentList: res.data };
  }
};
</script>


