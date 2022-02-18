// import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: sessionStorage.getItem("USER_NAME") || "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
};

const actions = {
  /**
   * 用户登录
   */
  login({ commit }, userForm) {
    const { username, password, validcode } = userForm;
    return new Promise((resolve, reject) => {
      //  设置登录信息
      commit("SET_NAME", username.trim());
      sessionStorage.setItem("USER_NAME", username.trim());
      // 设置token
      commit("SET_TOKEN", 123);
      setToken(123);
      resolve({ code: 0, message: "OK" });

      // TODO 这里调用后台接口，请求后台用户接口拿到数据
    });
  },

  /**
   * 退出登录
   */
  logout({ dispatch, commit, rootState, rootGetters, state }) {
    return new Promise(async (resolve, reject) => {
      // remove token from cookie
      await dispatch("resetToken");
      // reset router
      resetRouter();
      // 不同模块之间action/mutations调用，需要传参，以及开启root=true
      commit("permission/RESET_ROUTES", [], { root: true });
      resolve();
    });
  },

  /**
   * 删除token
   */
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
