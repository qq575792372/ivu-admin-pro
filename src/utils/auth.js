import { getCookie, setCookie, removeCookie } from "@lime-util/util";

const TokenKey = "VUE_ANTD_ADMIN_TOKEN";

export function getToken() {
  return getCookie(TokenKey);
}

export function setToken(token) {
  return setCookie(TokenKey, token);
}

export function removeToken() {
  return removeCookie(TokenKey);
}
