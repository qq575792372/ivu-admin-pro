<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="高级详情"
      content="高级详情一般是有多种不同类型的内容组合，可以用 Card 组件来分类，采用上下布局，也可以采用左右布局方式"
    />

    <!-- 顶部内容 -->
    <div class="header-container">
      <PageHeader>
        <div slot="title">申请编码：D20210821001</div>
        <div slot="content">
          <Description label-position="left">
            <DescriptionItem label="申请人：" v-bind="grid">
              枫叶子
            </DescriptionItem>
            <DescriptionItem label="状态：" v-bind="grid">
              <span class="text-warning">待审核</span>
            </DescriptionItem>
            <DescriptionItem label="申请时间：" v-bind="grid">
              2021-08-21 10:30:58
            </DescriptionItem>
            <DescriptionItem label="出差时间：" v-bind="grid">
              2021-08-21 到 2021-08-24
            </DescriptionItem>
            <DescriptionItem label="出差原因：" span="18">
              去广州见客户，出差3天，长文字的描述长文字的描述长文字的描述长文字的描述长文字的描述长文字的描述长文字的描述
            </DescriptionItem>
          </Description>
        </div>
        <div slot="actions">
          <Button type="primary">通过</Button>
          <Button type="error">不通过</Button>
        </div>
      </PageHeader>
    </div>

    <!-- 主要内容 -->
    <div class="main-container">
      <!-- 审核流程 -->
      <Card title="审核流程" dis-hover>
        <Steps :current="1" class="margin-10">
          <Step title="已申请" content="申请人：枫叶子"></Step>
          <Step title="待审核" content="审批人：张大侠"></Step>
          <Step title="已通过" content="张大侠已审核通过"></Step>
          <Step title="已完成" content="小黄花已处理完成"></Step>
        </Steps>
      </Card>
      <Card title="基本信息" dis-hover class="margin-top-14">
        <Description label-position="left">
          <DescriptionItem label="姓名：" v-bind="grid">枫叶子</DescriptionItem>
          <DescriptionItem label="性别：" v-bind="grid">
            <span class="text-warning">男</span>
          </DescriptionItem>
          <DescriptionItem label="出生年月：" v-bind="grid">
            1992-08-21
          </DescriptionItem>
          <DescriptionItem label="联系电话：" v-bind="grid">
            13000000000
          </DescriptionItem>
          <DescriptionItem label="部门：" span="24">技术部</DescriptionItem>
        </Description>
      </Card>
      <!-- 同行人员 -->
      <Card title="同行人员" dis-hover class="margin-top-14">
        <Table :columns="tableColumns" :data="tableData">
          <template slot="sex" slot-scope="{ row }">
            {{
              row.sex == 0
                ? "未知"
                : row.sex == 1
                ? "男"
                : row.sex == 2
                ? "女"
                : "无"
            }}
          </template>
        </Table>
      </Card>
      <!-- 操作按钮 -->
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
          type: "index",
          title: "编号",
          width: 70,
          align: "center",
          render: (h, { row, index }) => {
            return h("span", index + 1);
          },
        },
        {
          title: "姓名",
          key: "name",
          minWidth: 120,
        },
        {
          title: "性别",
          slot: "sex",
          minWidth: 120,
        },
        {
          title: "联系电话",
          key: "telphone",
          minWidth: 120,
        },
        {
          title: "部门",
          key: "departName",
          minWidth: 120,
        },
      ],
      tableData: [
        {
          id: 1,
          name: "何慧云",
          sex: 2,
          telphone: "13000000000",
          departName: "人事部",
        },
        {
          id: 2,
          name: "张和风",
          sex: 1,
          telphone: "13000000000",
          departName: "研发部",
        },
        {
          id: 3,
          name: "宋晓云",
          sex: 0,
          telphone: "13000000000",
          departName: "销售部",
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
    // 标签自适应的宽度
    labelWidth() {
      return this.isMobile ? undefined : 120;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .header-container {
    margin-top: 10px;
  }
  .main-container {
    margin: 16px;
  }
}
</style>
