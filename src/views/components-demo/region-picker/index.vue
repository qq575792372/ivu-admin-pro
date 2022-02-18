<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="省市区级联选择"
      content="使用最新的中国行政区域数据V5版本，需要npm安装china-area-data，直接引入js源数据到Cascader组件中使用"
    />

    <!-- main -->
    <div class="main-container">
      <!-- 省市二级联动 -->
      <div class="demo-block">
        <div class="demo-title">省市二级联动（不带“全部”选项）</div>
        <div class="demo-desc" />
        <div class="demo-use">
          <Cascader
            :data="options1"
            style="width: 300px"
            @on-change="handleChange"
          />
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-title">省市二级联动（带“全部”选项）</div>
        <div class="demo-desc" />
        <div class="demo-use">
          <Cascader
            :data="options2"
            style="width: 300px"
            @on-change="handleChange"
          />
        </div>
      </div>

      <!-- 省市区三级联动 -->
      <div class="demo-block">
        <div class="demo-title">省市区三级联动（不带“全部”选项）</div>
        <div class="demo-desc" />
        <div class="demo-use">
          <Cascader
            :data="options3"
            style="width: 300px"
            @on-change="handleChange"
          />
        </div>
      </div>
      <div class="demo-block">
        <div class="demo-title">省市区三级联动（带“全部”选项）</div>
        <div class="demo-desc" />
        <div class="demo-use">
          <Cascader
            :data="options4"
            style="width: 300px"
            @on-change="handleChange"
          />
        </div>
      </div>

      <!-- 设置默认值 -->
      <div class="demo-block">
        <div class="demo-title">设置默认值</div>
        <div class="demo-desc">
          给Cascader组件增加v-model的值，为区域码数组：["110000", "110100",
          "110105"]，即可默认选中
        </div>
        <div class="demo-use">
          <Cascader
            v-model="defaultValue"
            :data="options4"
            style="width: 300px"
            @on-change="handleChange"
          />
        </div>
      </div>

      <!-- CodeToText用法 -->
      <div class="demo-block">
        <div class="demo-title">CodeToText用法</div>
        <div class="demo-desc">
          CodeToText是个对象集合数据，传入区域码，返回区域中文
        </div>
        <div class="demo-use">
          例如：CodeToText['110000'] &nbsp;&nbsp;// 输出：北京市
        </div>
      </div>

      <!-- TextToCode用法 -->
      <div class="demo-block">
        <div class="demo-title">TextToCode用法</div>
        <div class="demo-desc">
          TextToCode是个对象集合数据，传入区域中文，返回对应区域对象
        </div>
        <div class="demo-use">
          <div class="margin-bottom-4">
            例如：TextToCode['北京市'].code &nbsp;&nbsp;//
            输出（北京市）：110000
          </div>
          <div class="margin-bottom-4">
            例如：TextToCode['北京市']['市辖区'].code &nbsp;&nbsp;//
            输出（市辖区）：110100
          </div>
          <div>
            例如：extToCode['北京市']['市辖区']['朝阳区'].code &nbsp;&nbsp;//
            输出（朝阳区）：110105
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  provinceAndCityData,
  provinceAndCityDataPlus,
  regionData,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "@/components/RegionPicker";
export default {
  data() {
    return {
      options1: provinceAndCityData,
      options2: provinceAndCityDataPlus,
      options3: regionData,
      options4: regionDataPlus,

      // 设置默认值
      defaultValue: ["110000", "110100", "110105"],
    };
  },
  created() {},
  methods: {
    handleChange(value) {
      console.log("选择的code数据：", value);
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
  }
}
</style>
