export const state = () => ({
  username: null,
  userid: null,
})

export const mutations = {
  setUsername(state, username) {
    state.username = username;
  },
  setUserid(state, userid) {
    state.userid = userid
  }
}

export const actions = {
  authenticateUser(vuexContext, authData) {
    console.log("authenticate User")
    console.log("authData", authData)

    let authUrl =
      "http://localhost:8001/api-token-auth/"

    return this.$axios
      .$post(authUrl, {
        email: authData.username,
        password: authData.password,
      })
      .then(result => {
        console.log(result);
        vuexContext.commit("setToken", result.token);
        vuexContext.commit("setUser", result.user);
      })
      .catch(e => console.log(e));
  },

  setUser(vuexContext, user) {
    vuexContext.commit("setUsername", user.username);
    vuexContext.commit("setUserid", user.userid);
  },

  setUsername(vuexContext, username) {
    vuexContext.commit("setUsername", username);
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null;
  },
  getUsername(state) {
    return state.username;
  },

  getUserid(state) {
    return state.userid;
  },

  getToken(state) {
    return state.token;
  },
}