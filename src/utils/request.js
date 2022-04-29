import axios from "axios";
import store from "@/store";
import { Message } from "view-design";
import { getToken } from "@/utils/auth";

// 设置axios跨域访问
axios.defaults.withCredentials = true; // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.crossDomain = true; // 设置axios跨域的配置

// 创建服务
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVE + process.env.VUE_APP_BASE_API,
  timeout: 3 * 60 * 1000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    /* 这里可以设置请求拦截的内容 */

    // 设置token
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    console.error("request error", error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res) {
      return res;
    } else {
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error) => {
    console.error("response error", error);
    Message.error({
      content: error.message,
    });
    return Promise.reject(error);
  }
);

export default service;
