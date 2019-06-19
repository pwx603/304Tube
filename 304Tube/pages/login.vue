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
    return {
    };
  },
  methods: {
    onLogin($event) {
      console.log("on Log in", $event);
    },
    async onRegister($event){
      try{
        let res = await this.$axios({
        method: 'post',
        url: process.env.backendAPI + "users/",
        data: $event
      })

      alert("Account created successfully.")

      this.$router.go();

      }catch(err){
        console.log(err)
      }
      console.log("on Register", $event);
    }
  }
};
</script>

<style>
</style>
