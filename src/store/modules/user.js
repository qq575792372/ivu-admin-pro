// import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: sessionStorage.getItem("USER_NAME") || ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, validcode } = userInfo;
    return new Promise((resolve, reject) => {
      // 不调用接口登录
      // set user name
      commit("SET_NAME", username.trim());
      sessionStorage.setItem("USER_NAME", username.trim());
      // set token
      commit("SET_TOKEN", 123);
      setToken(123);
      resolve({ code: 0, message: "OK" });

      // 请求后台登录
      // login({
      //   accountNo: username.trim(),
      //   password: password,
      //   validCode: validcode
      // })
      //   .then(response => {
      //     const { code, data } = response;
      //     if (code == 0) {
      //       // set user name
      //       commit("SET_NAME", username.trim());
      //       sessionStorage.setItem("USER_NAME", username.trim());
      //       // set token
      //       commit("SET_TOKEN", 123);
      //       setToken(123);
      //     }
      //     // resolve response data
      //     resolve(response);
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  },

  // user logout
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

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
