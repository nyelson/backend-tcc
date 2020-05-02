import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import chartist from "./plugins/chartist";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  chartist,
  store,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("authentication/SET_USER_DATA", userData);
    }

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
