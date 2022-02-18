import Vue from "vue";
import Vuex from "vuex";

// getters
import getters from "./getters";

// modules
// layout modules
import layout from "./modules/layout";
// permission
import permission from "./modules/permission";
// user
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    permission,
    user,
  },
  getters,
});

// export store
export default store;
