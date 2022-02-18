<template>
  <Row :gutter="24" class="dashboard-card">
    <!-- 销售总额 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false" dis-hover>
        <p slot="title">
          <span class="text-desc">销售总额</span>
        </p>
        <p slot="extra">
          <Tooltip content="指标描述信息~">
            <Icon type="md-information-circle" class="text-desc" size="16" />
          </Tooltip>
        </p>
        <CountTo
          ref="count1"
          :start-val="0"
          :end-val="1350380.98"
          :duration="1500"
          :decimals="2"
          prefix="￥"
          class="font-30"
        />
        <div class="margin-top-10">
          <!-- 同比增长 红色 -->
          <span>
            周同比 16%
            <Icon type="md-arrow-dropup" size="14" class="text-danger" />
          </span>
          <!-- 同比下降 绿色-->
          <span class="margin-left-20">
            日同比 12.5%
            <Icon type="md-arrow-dropdown" size="14" class="text-success" />
          </span>
        </div>
        <Divider style="margin: 10px 0" />
        <div>
          <Row>
            <Col span="12">今日销售额</Col>
            <Col span="12" class="text-align-right">￥30,223</Col>
          </Row>
        </div>
      </Card>
    </Col>

    <!-- 销售总利润 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false" dis-hover>
        <p slot="title">
          <span class="text-desc">销售总利润</span>
        </p>
        <p slot="extra">
          <Tooltip content="指标描述信息~">
            <Icon type="md-information-circle" class="text-desc" size="16" />
          </Tooltip>
        </p>
        <CountTo
          ref="count1"
          :start-val="0"
          :end-val="923042.87"
          :decimals="2"
          :duration="1500"
          prefix="￥"
          class="font-30"
        />
        <div class="margin-top-10">
          <!-- 同比增长 红色 -->
          <span>
            周同比 16%
            <Icon type="md-arrow-dropup" size="14" class="text-danger" />
          </span>
          <!-- 同比下降 绿色-->
          <span class="margin-left-20">
            日同比 12.5%
            <Icon type="md-arrow-dropdown" size="14" class="text-success" />
          </span>
        </div>
        <Divider style="margin: 10px 0" />
        <div>
          <Row>
            <Col span="12">今日利润</Col>
            <Col span="12" class="text-align-right">￥30,223</Col>
          </Row>
        </div>
      </Card>
    </Col>

    <!-- 销售总量 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false" dis-hover>
        <p slot="title">
          <span class="text-desc">销售总量</span>
        </p>
        <p slot="extra">
          <Tooltip content="指标描述信息~">
            <Icon type="md-information-circle" class="text-desc" size="16" />
          </Tooltip>
        </p>
        <CountTo
          ref="count1"
          :start-val="0"
          :end-val="388000"
          :duration="1500"
          suffix="单"
          class="font-30"
        />
        <div class="margin-top-10">
          <!-- 同比增长 红色 -->
          <span>
            周同比 16%
            <Icon type="md-arrow-dropup" size="14" class="text-danger" />
          </span>
          <!-- 同比下降 绿色-->
          <span class="margin-left-20">
            日同比 12.5%
            <Icon type="md-arrow-dropdown" size="14" class="text-success" />
          </span>
        </div>
        <Divider style="margin: 10px 0" />
        <div>
          <Row>
            <Col span="12">今日订单量</Col>
            <Col span="12" class="text-align-right">4000单</Col>
          </Row>
        </div>
      </Card>
    </Col>

    <!-- 退款总额 -->
    <Col v-bind="grid" class="margin-bottom-14">
      <Card :bordered="false" dis-hover>
        <p slot="title">
          <span class="text-desc">退款总额</span>
        </p>
        <p slot="extra">
          <Tooltip content="指标描述信息~">
            <Icon type="md-information-circle" class="text-desc" size="16" />
          </Tooltip>
        </p>
        <CountTo
          ref="count1"
          :start-val="0"
          :end-val="388270.83"
          :duration="1500"
          :decimals="2"
          prefix="￥"
          class="font-30"
        />
        <div class="margin-top-10">
          <!-- 同比增长 红色 -->
          <span>
            周同比 16%
            <Icon type="md-arrow-dropup" size="14" class="text-danger" />
          </span>
          <!-- 同比下降 绿色-->
          <span class="margin-left-20">
            日同比 12.5%
            <Icon type="md-arrow-dropdown" size="14" class="text-success" />
          </span>
        </div>
        <Divider style="margin: 10px 0" />
        <div>
          <Row>
            <Col span="12">今日退款额</Col>
            <Col span="12" class="text-align-right">￥30,223</Col>
          </Row>
        </div>
      </Card>
    </Col>
  </Row>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  name: "DashboardMenu",
  components: { CountTo },
  data() {
    return {
      grid: {
        xl: 6,
        lg: 12,
        md: 12,
        sm: 12,
        xs: 24,
      },
    };
  },
};
</script>
<style lang="less" scoped>
.dashboard-card {
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
