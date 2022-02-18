<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="表单详情 "
      content="使用表单组件来显示详情，示例中加入了栅格布局，不同分辨率下显示效果不同。"
    />

    <!-- 主要内容 -->
    <div class="main-container">
      <Card title="商品信息" dis-hover>
        <Form :label-width="labelWidth">
          <Row>
            <Col v-bind="grid">
              <FormItem label="商品编号：">SP20210729001</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="商品名称：">可口可乐6罐/件</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="所属分类：">酒水饮料</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="商品原价：">￥12.99</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="商品现价：">￥9.99</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="单位：">件</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="库存：">100件</FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="供货商信息" dis-hover class="margin-top-14">
        <Form :label-width="labelWidth">
          <Row>
            <Col v-bind="grid">
              <FormItem label="供货商编号：">GH20210729001</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="供货商名称：">xxx饮品供应商</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="负责人：">张三</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="联系电话：">1300000000</FormItem>
            </Col>
            <Col v-bind="grid">
              <FormItem label="所在地址：">
                广东省深圳市龙华区xx街道xx小区xx号
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <div class="text-align-center margin-top-10">
        <Button type="default" style="margin-right: 10px">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 基础信息的格栅布局
      grid: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24,
      },

      // 表格信息
      tableColumns: [
        {
          title: "商品编号",
          key: "productNo",
          minWidth: 120,
        },
        {
          title: "商品名称",
          key: "productName",
          minWidth: 120,
        },
        {
          title: "所属分类",
          key: "productType",
          minWidth: 120,
        },
        {
          title: "原价",
          slot: "originPrice",
          minWidth: 120,
        },
        {
          title: "现价",
          slot: "sellPrice",
          minWidth: 120,
        },
        {
          title: "单位",
          key: "unit",
          minWidth: 120,
        },
        {
          title: "库存",
          slot: "stock",
          minWidth: 120,
        },
      ],
      tableData: [
        {
          productNo: "SP001",
          productName: "可口可乐6罐/件",
          productType: "酒水饮料",
          originalPrice: 12.99,
          sellPrice: 9.99,
          unit: "件",
          stock: 100,
        },
        {
          productNo: "SP002",
          productName: "阿迪达斯男鞋",
          productType: "鞋靴",
          originalPrice: 400,
          sellPrice: 189,
          unit: "双",
          stock: 99,
        },
        {
          productNo: "SP003",
          productName: "帮宝适尿不湿90包-xl",
          productType: "母婴",
          originalPrice: 110,
          currentPrice: 110,
          unit: "包",
          stock: 253,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["device"]),
    // 设备类型
    isMobile() {
      return this.device === "mobile";
    },
    labelWidth() {
      return this.isMobile ? undefined : 120;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    margin: 16px;
  }
}
</style>
