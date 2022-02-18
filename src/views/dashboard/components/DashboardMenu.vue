<template>
  <Row :gutter="24" class="dashboard-menu">
    <!-- 用户 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-people" color="#69c0ff" />
          <p>用户</p>
        </i-link>
      </Card>
    </Col>
    <!-- 数据 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-podium" color="#95de64" />
          <p>数据</p>
        </i-link>
      </Card>
    </Col>
    <!-- 购物车 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-cart" color="#ff9c6e" />
          <p>购物车</p>
        </i-link>
      </Card>
    </Col>
    <!-- 订单 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-clipboard" color="#b37feb" />
          <p>订单</p>
        </i-link>
      </Card>
    </Col>
    <!-- 财务 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-card" color="#ffd666" />
          <p>财务</p>
        </i-link>
      </Card>
    </Col>
    <!-- 消息 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="ios-text" color="#5cdbd3" />
          <p>消息</p>
        </i-link>
      </Card>
    </Col>
    <!-- 日程 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-calendar" color="#fb8500" />
          <p>日程</p>
        </i-link>
      </Card>
    </Col>
    <!-- 设置 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false">
        <i-link :underline="false" href="javascript:void(0)">
          <Icon type="md-settings" color="#2db7f5" />
          <p>设置</p>
        </i-link>
      </Card>
    </Col>
  </Row>
</template>
<script>
export default {
  name: "DashboardMenu",
  data() {
    return {
      grid: {
        xl: 3,
        lg: 4,
        md: 8,
        sm: 8,
        xs: 8,
      },
    };
  },
};
</script>
<style lang="less" scoped>
.dashboard-menu {
  text-align: center;
  padding: 16px 16px 0px 16px;
  border-radius: 4px;
  .ivu-card-body {
    padding: 0;
  }
  i {
    font-size: 32px;
  }
  a {
    display: block;
    color: inherit;
    padding: 16px;
  }
  p {
    margin-top: 8px;
  }
}
</style>
