import Vue from "vue";
import Vuex from "vuex";

import * as authentication from "@/store/modules/authentication.js";
import * as items from "@/store/modules/items.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    items,
  },
  state: {
    drawer: true,
  },
  mutations: {
    TOGGLE_DRAWER(state, isToggled) {
      state.drawer = isToggled;
    },
  },
  actions: {
    toggleDrawer({ commit }, isToggled) {
      commit("TOGGLE_DRAWER", isToggled);
    },
  },
});
