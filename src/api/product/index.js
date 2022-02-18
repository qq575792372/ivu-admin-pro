import request from "@/utils/request";

/**
 * 查询分页列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: "/api/product/getList",
    method: "get",
    params,
  });
}
/**
 * 查询详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: "/api/product/getDetail",
    method: "get",
    params,
  });
}

/**
 * 编辑
 * @param {*} data
 */
export function updateProduct(data) {
  return request({
    url: "/api/product/update",
    method: "post",
    data,
  });
}
/**
 * 新增
 * @param {*} data
 */
export function addProduct(data) {
  return request({
    url: "/api/product/add",
    method: "post",
    data,
  });
}
/**
 * 删除
 * @param {*} params
 */
export function deleteProduct(params) {
  return request({
    url: "/api/product/delete",
    method: "get",
    params,
  });
}
