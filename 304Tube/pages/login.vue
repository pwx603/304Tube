<template>
  <div class="container-fluid">
    <div class="row bg-warning">
      <div class="col-7 page_icon">
        <img src="~/assets/304tube_icon.png" width="40%" height="auto">
        <h2 class="text-white">Experience how videos are meant to be streamed</h2>
      </div>
      <div class="col-5 page_login">
        <b-form @submit.prevent="onLogin" class="w-75 d-flex flex-column">
          <h1 class="text-center">USER LOGIN</h1>
          <b-form-group
            id="username"
            label="Username:"
            label-for="usernameInput"
            label-text-align="left"
          >
            <b-form-input
              id="usernameInput"
              type="text"
              v-model="form.username"
              required
              placeholder="Username"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="password"
            label="Password:"
            label-for="pwdInput"
            label-text-align="left"
          >
            <b-form-input
              id="pwdInput"
              type="password"
              v-model="form.password"
              required
              placeholder="Password"
            ></b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            class="align-self-center form-submit-button mt-4"
          >Login</b-button>
          <b-button variant="danger" class="align-self-center form-submit-button mt-4">Register</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    onLogin() {
      console.log("on Log in");
    }
  }
};
</script>

<style>
.container-fluid {
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: Helvetica;
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

/*
    #username_box, #password_box{
        height: 35px;
        width: 30%;
        padding-left: 10px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 20px;
        box-sizing: border-box;
    }

.form-submit-button {
    width: 8%;
    
    height: 40px;
    
    background: #016ABC;
    
    color: #fff;
    
    border: 1px solid #eee;
    
    border-radius: 20px;
    
    box-shadow: 5px 5px 5px #eee;
    
    text-shadow:none;
    
}

.form-submit-button:hover {
    
    width: 8%;
    
    height: 40px;
    
    background: #B9DFFF;
    
    color: #fff;
    
    border: 1px solid #eee;
    
    border-radius: 20px;
    
    box-shadow: 5px 5px 5px #eee;
    
    text-shadow:none;
    
}

.form-register-button {
    width: 8%;
    
    height: 40px;
    
    background: #ce3d56;
    
    color: #fff;
    
    border: 1px solid #eee;
    
    border-radius: 20px;
    
    box-shadow: 5px 5px 5px #eee;
    
    text-shadow:none;
    
}

.form-register-button:hover {
    
    width: 8%;
    
    height: 40px;
    
    background: #ea91a0;
    
    color: #fff;
    
    border: 1px solid #eee;
    
    border-radius: 20px;
    
    box-shadow: 5px 5px 5px #eee;
    
    text-shadow:none;
    
} */
</style>
