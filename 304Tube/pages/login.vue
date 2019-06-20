<template>
  <LoginBox @onLogin="onLogin" @onRegister="onRegister"/>
</template>

<script>
import LoginBox from "~/components/LoginBox.vue";

export default {
  components: {
    LoginBox
  },
  layout: "login",
  data() {
    return {};
  },
  methods: {
    async onLogin($event) {
      console.log("on Log in", $event);

      try {
        let res = await this.$axios({
          method: "post",
          url: process.env.backendAPI + "users/login/",
          data: $event
        });

        console.log(res.data);

        await this.$store.dispatch("authenticate/setUser", res.data);
        console.log(this.$store.getters["authenticate/getUsername"]);
        console.log(this.$store.getters["authenticate/getUserid"]);

        this.$router.push("/viewer");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    async onRegister($event) {
      try {
        let res = await this.$axios({
          method: "post",
          url: process.env.backendAPI + "users/",
          data: $event
        });

        alert("Account created successfully.");

        this.$router.go();
      } catch (err) {
        console.log(err);
      }
      console.log("on Register", $event);
    }
  }
};
</script>

<style>
</style>
