<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="基础详情"
      content="一个基础的详情布局展示示例，使用 Description 描述信息组件，用法可参考示例中源码"
    />

    <!-- 主要内容 -->
    <div class="main-container">
      <!-- 基础信息 -->
      <Card dis-hover :bordered="false">
        <Description
          title="基础信息"
          :label-width="labelWidth"
          label-position="left"
        >
          <template slot="extra">
            <Button type="default">操作1</Button>
            <Button type="primary">操作2</Button>
            <Button type="error">操作3</Button>
          </template>
          <DescriptionItem label="商品编号：" v-bind="grid">
            SP20210729001
          </DescriptionItem>
          <DescriptionItem label="商品名称：" v-bind="grid">
            可口可乐6罐/件
          </DescriptionItem>
          <DescriptionItem label="所属分类：" v-bind="grid">
            酒水饮料
          </DescriptionItem>
          <DescriptionItem label="商品原价：" v-bind="grid">
            ￥12.99
          </DescriptionItem>
          <DescriptionItem label="商品现价：" v-bind="grid">
            ￥9.99
          </DescriptionItem>
          <DescriptionItem label="单位：" v-bind="grid">件</DescriptionItem>
          <DescriptionItem label="库存：" v-bind="grid">100件</DescriptionItem>
        </Description>

        <Divider />

        <!-- 供货商信息 -->
        <Description
          title="供货商信息"
          :label-width="labelWidth"
          label-position="left"
        >
          <template slot="extra">
            <Button type="default">操作1</Button>
            <Button type="primary">操作2</Button>
          </template>
          <DescriptionItem label="供货商编号：" v-bind="grid">
            GH20210729001
          </DescriptionItem>
          <DescriptionItem label="供货商名称：" v-bind="grid">
            xxx饮品供应商
          </DescriptionItem>
          <DescriptionItem label="负责人：" v-bind="grid">张三</DescriptionItem>
          <DescriptionItem label="联系电话：" v-bind="grid">
            1300000000
          </DescriptionItem>
          <DescriptionItem label="所在地址：" v-bind="grid">
            广东省深圳市龙华区xx街道xx小区xx号
          </DescriptionItem>
        </Description>

        <Divider />

        <!-- 表格信息 -->
        <Description
          title="表格信息"
          :label-width="labelWidth"
          label-position="left"
        >
          <!-- 附加内容slot -->
          <template slot="extra">
            <Button type="default">操作1</Button>
            <Button type="primary">操作2</Button>
          </template>
          <!-- 自定义描述信息内容slot -->
          <template slot="custom">
            <div class="text-desc">
              注：以下内容是表格信息展示，通过
              <em>slot="custom"</em>
              方式自定义描述信息内容
            </div>
          </template>
          <!-- 自定义描述信息内容slot -->
          <template slot="custom">
            <Table :columns="tableColumns" :data="tableData">
              <template slot="originPrice" slot-scope="{ row }">
                ￥{{ row.originPrice }}
              </template>
              <template slot="sellPrice" slot-scope="{ row }">
                ￥{{ row.sellPrice }}
              </template>
            </Table>
          </template>
        </Description>
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
          key: "stock",
          minWidth: 120,
          render: (h, { row, index }) => {
            return h("span", row.stock + "/" + row.unit);
          },
        },
      ],
      tableData: [
        {
          productNo: "SP001",
          productName: "可口可乐6罐/件",
          productType: "酒水饮料",
          originPrice: 12.99,
          sellPrice: 9.99,
          unit: "件",
          stock: 100,
        },
        {
          productNo: "SP002",
          productName: "阿迪达斯男鞋",
          productType: "鞋靴",
          originPrice: 400,
          sellPrice: 189,
          unit: "双",
          stock: 99,
        },
        {
          productNo: "SP003",
          productName: "帮宝适尿不湿90包-xl",
          productType: "母婴",
          originPrice: 110,
          sellPrice: 110,
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
      return this.isMobile ? undefined : 100;
    },
  },
  created() {},
  methods: {
    /**
     * 提交
     */
    handleSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          if (this.editForm.id) {
            this.handleUpdate();
          } else {
            this.handleAdd();
          }
        }
      });
    },
    handleAdd() {
      console.log("请求后台接口，参数：", this.editForm);
      this.$Message.success("保存成功");
      this.editModal = false;
    },
    handleUpdate() {
      console.log("请求后台接口，参数：", this.editForm);
      this.$Message.success("修改成功");
      this.editModal = false;
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
