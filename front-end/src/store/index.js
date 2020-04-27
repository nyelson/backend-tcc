import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    register({ dispatch }, credentials) {
      return axios
        .post("//localhost:3330/authentication/signup", credentials)
        .then(({ data }) => {
          console.log("[sign-up] user data is: ", data);
          const { email, password } = credentials;
          return dispatch("login", { email, password });
        })
        .catch((err) => {
          throw err.response;
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3330/authentication/signin", credentials)
        .then(({ data }) => {
          console.log("[sign in]user data is: ", data);
          commit("SET_USER_DATA", data);
        })
        .catch((err) => {
          throw err.response;
        });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  modules: {},
});
