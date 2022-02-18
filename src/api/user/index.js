import request from "@/utils/request";

/**
 * 用户登录
 * @param {*} params
 */
export function login(params) {
  return request({
    url: "/api/user/login",
    method: "post",
    params,
  });
}
