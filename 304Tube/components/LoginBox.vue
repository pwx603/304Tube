<template>
  <b-form @submit.prevent="onSubmit" class="w-75 d-flex flex-column">
    <h1 class="text-center" v-if="registration">USER REGISTRATION</h1>
    <h1 class="text-center" v-else>USER LOGIN</h1>
    <b-form-group id="username" label="Username:" label-for="usernameInput" label-text-align="left">
      <b-form-input
        id="usernameInput"
        type="text"
        v-model="form.username"
        required
        placeholder="Username"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="password" label="Password:" label-for="pwdInput" label-text-align="left">
      <b-form-input
        id="pwdInput"
        type="password"
        v-model="form.password"
        required
        placeholder="Password"
      ></b-form-input>
    </b-form-group>

    <div v-if="registration">
      <b-form-group
        id="phonenumber"
        label="Phone Number:"
        label-for="phonenumberInput"
        label-text-align="left"
      >
        <b-form-input
          id="phonenumberInput"
          type="tel"
          v-model="form.phonenumber"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          placeholder="604-822-2211"
        ></b-form-input>

        <small>Format: 123-456-7890</small>
      </b-form-group>

      <b-form-group id="email" label="Email:" label-for="emailInput" label-text-align="left">
        <b-form-input
          id="emailInput"
          type="email"
          v-model="form.emailaddress"
          required
          placeholder="studentNum@cs.ubc.ca"
        ></b-form-input>

        <b-button
          type="submit"
          variant="primary"
          class="align-self-center form-submit-button mt-4"
        >Confirm</b-button>
        <b-button
          variant="danger"
          class="align-self-center form-submit-button mt-4"
          @click="toggleRegister"
        >Cancel</b-button>
      </b-form-group>
    </div>
    <div v-else>
      <b-button
        type="submit"
        variant="primary"
        class="align-self-center form-submit-button mt-4"
      >Login</b-button>
      <b-button
        variant="danger"
        class="align-self-center form-submit-button mt-4"
        @click="toggleRegister"
      >Register</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      registration: false
    };
  },
  methods: {
    async onSubmit() {
      if (this.registration) {
        this.$emit("onRegister", this.form);
        return;
      }

      this.$emit("onLogin", this.form);
    },
    toggleRegister() {
      this.registration = !this.registration;
    }
  }
};
</script>

<style>
#username_box,
#password_box {
  height: 35px;
  width: 30%;
  padding-left: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
}

.form-submit-button {
  width: 100px;
  height: 40px;
  color: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #eee;
  text-shadow: none;
}
</style>
