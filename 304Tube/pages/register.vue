<template>
  <LoginBox @signIn="onRegister" :Register="true"/>
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
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onLogin($event) {
      console.log("on Log in", $event);
    }
  }
};
</script>

<style>
</style>
