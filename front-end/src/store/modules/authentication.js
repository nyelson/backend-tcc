import axios from "axios";

export const state = {
  user: null,
};

export const namespaced = true;

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem("user");
    location.reload();
  },
};

export const actions = {
  register({ dispatch }, credentials) {
    return axios
      .post("//localhost:3330/authentication/signup", credentials)
      .then(() => {
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
        commit("SET_USER_DATA", data);
      })
      .catch((err) => {
        throw err.response;
      });
  },
  logout({ commit }) {
    commit("CLEAR_USER_DATA");
  },
};
