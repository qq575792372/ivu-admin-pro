/**
 * 省市区级联数据
 * 使用中国行政区域数据V5最新版本，筛选区域数据后以供 Cascader 组件使用。
 * 必须要npm安装china-area-data的区域数据源包
 */

import REGION_DATA from "china-area-data";
import { deepClone } from "@lime-util/util";

// 省市二级联动
let provinceAndCityData = []; // 不带”全部”选项
let provinceAndCityDataPlus = []; // 带“全部”选项

// 省市区三级联动
let regionData = []; // 不带”全部”选项
let regionDataPlus = []; // 带“全部”选项

// code转汉字的对象集合
let CodeToText = {};
// 汉字转code的对象集合
let TextToCode = {};

/**
 * 以下是筛选计算国家编码
 */
/**
 * 计算省
 */
const provinceObject = REGION_DATA["86"]; // 省份对象
CodeToText[""] = "全部";
for (const prop in provinceObject) {
  regionData.push({
    value: prop, // 省份code值
    label: provinceObject[prop], // 省份汉字
  });
  CodeToText[prop] = provinceObject[prop];
  TextToCode[provinceObject[prop]] = {
    code: prop,
  };
  TextToCode[provinceObject[prop]]["全部"] = {
    code: "",
  };
}

/**
 * 计算市
 */
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].value;
  const provinceText = regionData[i].label;
  const provinceChildren = [];
  for (const prop in REGION_DATA[provinceCode]) {
    provinceChildren.push({
      value: prop,
      label: REGION_DATA[provinceCode][prop],
    });
    CodeToText[prop] = REGION_DATA[provinceCode][prop];
    TextToCode[provinceText][REGION_DATA[provinceCode][prop]] = {
      code: prop,
    };
    TextToCode[provinceText][REGION_DATA[provinceCode][prop]]["全部"] = {
      code: "",
    };
  }
  if (provinceChildren.length) {
    regionData[i].children = provinceChildren;
  }
}
provinceAndCityData = deepClone(regionData);

/**
 * 计算区
 */
for (let i = 0, len = regionData.length; i < len; i++) {
  const province = regionData[i].children;
  const provinceText = regionData[i].label;
  if (province) {
    for (let j = 0, len = province.length; j < len; j++) {
      const cityCode = province[j].value;
      const cityText = province[j].label;
      const cityChildren = [];
      for (const prop in REGION_DATA[cityCode]) {
        cityChildren.push({
          value: prop,
          label: REGION_DATA[cityCode][prop],
        });
        CodeToText[prop] = REGION_DATA[cityCode][prop];
        TextToCode[provinceText][cityText][REGION_DATA[cityCode][prop]] = {
          code: prop,
        };
      }
      if (cityChildren.length) {
        province[j].children = cityChildren;
      }
    }
  }
}

/**
 * 添加“全部”选项
 */
provinceAndCityDataPlus = deepClone(provinceAndCityData);
provinceAndCityDataPlus.unshift({
  value: "",
  label: "全部",
});
for (let i = 0, len = provinceAndCityDataPlus.length; i < len; i++) {
  const province = provinceAndCityDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: "",
      label: "全部",
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: "",
          label: "全部",
        });
      }
    }
  }
}

/**
 * 省市区三级联动数据（带“全部”选项）
 */
regionDataPlus = deepClone(regionData);
regionDataPlus.unshift({
  value: "",
  label: "全部",
});
for (let i = 0, len = regionDataPlus.length; i < len; i++) {
  const province = regionDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: "",
      label: "全部",
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: "",
          label: "全部",
        });
      }
    }
  }
}

// 导出数据
export {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
};
