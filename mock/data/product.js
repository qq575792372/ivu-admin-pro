const Mock = require("mockjs");

// mock生成列表元数据
const mockListData = Mock.mock({
  "list|50": [
    {
      id: "@increment()",
      productNo: "SP" + new Date().getTime(),
      productName: "@cword(5)",
      "productType|1": [0, 1, 2, 3], // 商品类型，0：新鲜果蔬；1：饮料乳品；2：肉禽水产；3：米面粮油；4：日用百货；5：其他
      "status|1": [0, 1], // 状态，0：已下架；1：已上架
      originPrice: "@integer(1,500)",
      sellPrice: "@integer(1,500)",
      "unit|1": ["箱", "件", "个", "枚", "双"],
      stock: "@integer(1,100)",
      createTime: "@now()",
      updateTime: "@now()",
    },
  ],
});

/**
 * 查询分页
 */
const getList = {
  url: "/api/product/getList",
  type: "get",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { pageNo, pageSize } = config.query;
    // 获取分页后的列表
    const records = list.filter(
      (item, index) =>
        index >= pageSize * (pageNo - 1) && index < pageSize * pageNo
    );

    // 组装返回的数据结构
    return {
      code: 0,
      data: {
        total: Number(list.length),
        records,
        current: Number(pageNo),
        size: Number(pageSize),
      },
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

/**
 * 添加
 */
const addProduct = {
  url: "/api/product/add",
  type: "post",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取传参数据
    const params = config.body;
    // 添加数据
    list.unshift({
      id: Mock.mock("@increment()"),
      productNo: "SP" + new Date().getTime(),
      productName: params.productName,
      productType: Number(params.productType),
      status: 1,
      originPrice: Number(params.originPrice),
      sellPrice: Number(params.sellPrice),
      unit: params.unit,
      stock: Number(params.stock),
      createTime: Mock.mock("@now()"),
      updateTime: "",
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "添加成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

/**
 * 编辑
 */
const updateProduct = {
  url: "/api/product/update",
  type: "post",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取传参
    const params = config.body;
    list.some((item) => {
      // 修改对应id的用户信息
      if (item.id == params.id) {
        item.productName = params.productName;
        item.productType = params.productType;
        item.status = params.status;
        item.originPrice = Number(params.originPrice);
        item.sellPrice = Number(params.sellPrice);
        item.unit = params.unit;
        item.stock = Number(params.stock);
        item.updateTime = Mock.mock("@now()");
        return true;
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "修改成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

/**
 * 根据id删除
 */
const deleteProduct = {
  url: "/api/product/delete",
  type: "get",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { id } = config.query;
    // 根据id删除元素
    list.map((item, index) => {
      if (item.id == id) {
        list.splice(index, 1);
        return true;
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "删除成功",
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

/**
 * 查询详情
 */
const getDetail = {
  url: "/api/product/getDetail",
  type: "get",
  response: (config) => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { id } = config.query;
    // 获取满足条件的记录
    const records = list.filter((item) => item.id == id)[0];
    // 组装返回的数据结构
    return {
      code: 0,
      data: records,
      message: "ok",
      timestamp: Date.now(),
    };
  },
};

// export methods
module.exports = [getList, addProduct, updateProduct, deleteProduct, getDetail];
