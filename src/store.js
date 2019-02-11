import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {}
  },
  mutations: {
    SET_CURRENT_TASK(state, payload) {
      // mutate state
      state.currentUser = payload;
    }
  },
  actions: {}
});
