import request from "@/utils/request";

/**
 * 上传文件
 * @param {*} data
 */
export function uploadFile(data) {
  return request({
    url: "/api/file/saveFile",
    method: "post",
    data,
  });
}
/**
 * 获取免费天气预报接口数据
 * @param {*} params
 */
export function getWeather(params) {
  return request({
    url: "https://miao.baidu.com/abdr?_o=https%3A%2F%2Fweather.mipang.com",
    method: "get",
    params,
  });
}
