<template>
  <Card :bordered="false" dis-hover class="statis-sell-container">
    <div slot="title">
      <Row type="flex" justify="center" align="middle">
        <Col span="6">
          <Avatar
            icon="ios-podium"
            size="small"
            style="color: #1890ff; background: #e6f7ff"
          />
          <span class="margin-left-4">销售额</span>
        </Col>
        <Col span="18" class="text-align-right">
          <RadioGroup
            v-model="visitType"
            type="button"
            :border="false"
            class="margin-right-10"
          >
            <Radio label="0">今日</Radio>
            <Radio label="1">近7天</Radio>
            <Radio label="2">近1个月</Radio>
            <Radio label="3">近半年</Radio>
            <Radio label="4">今年</Radio>
          </RadioGroup>
          <DatePicker
            v-model="visitDate"
            type="daterange"
            placement="bottom-end"
            placeholder="选择日期段"
            style="width: 200px"
          />
        </Col>
      </Row>
    </div>
    <Row :gutter="24">
      <Col :xl="18" :lg="16" :md="24" :sm="24" :xs="24">
        <h4>近一年销售额</h4>
        <!-- 销售额和商品销量排名 -->
        <div
          id="sellChart"
          ref="sellChartRef"
          style="height: 360px; width: 100%"
        ></div>
      </Col>
      <Col :xl="6" :lg="8" :md="24" :sm="24" :xs="24">
        <h4>销售排行</h4>
        <div>
          <Row
            v-for="(item, index) in 10"
            :key="index"
            class="margin-bottom-10 margin-top-10"
          >
            <Col span="14">
              <Avatar
                size="small"
                :style="{
                  background:
                    index == 0
                      ? '#ed4014'
                      : index == 1
                      ? '#ff9900'
                      : index == 2
                      ? '#2db7f5'
                      : '',
                }"
              >
                {{ index + 1 }}
              </Avatar>
              <span
                class="padding-left-4"
                :style="{
                  color:
                    index == 0
                      ? '#ed4014'
                      : index == 1
                      ? '#ff9900'
                      : index == 2
                      ? '#2db7f5'
                      : '',
                }"
              >
                商品{{ index + 1 }}
              </span>
            </Col>
            <Col span="10" class="text-align-right">
              <span
                :style="{
                  color:
                    index == 0
                      ? '#ed4014'
                      : index == 1
                      ? '#ff9900'
                      : index == 2
                      ? '#2db7f5'
                      : '',
                }"
              >
                3,021
              </span>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Card>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      visitType: "",
      visitDate: "",
      sellChart: null,
    };
  },
  created() {},
  mounted() {
    this.initSellChart();
    // echart图标随屏幕自适应
    window.onresize = () => {
      this.sellChart.resize();
    };
  },
  methods: {
    /**
     * 初始化销售额统计图标
     */
    initSellChart() {
      this.sellChart = echarts.init(this.$refs.sellChartRef);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            tooltip: true,
            symbol: "none",
            data: [310, 512, 200, 334, 390, 330, 820, 332, 119, 100, 333, 200],
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0],
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#69cdff", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "#3eb3f7", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1495eb", // 100% 处的颜色
                  },
                ],
              },
            },
          },
        ],
        grid: {
          left: 16,
          right: 25,
          bottom: 5,
          top: 20,
          containLabel: true,
        },
      };
      option && this.sellChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.statis-sell-container {
  margin: 0px 16px 16px 16px;
  background: #fff;
  border-radius: 4px;

  // 默认的单选按钮组隐藏边框
  .ivu-radio-group-button .ivu-radio-wrapper {
    border: none !important;
    box-shadow: none !important;
    padding: 0 12px;
  }
  .ivu-radio-group-button .ivu-radio-wrapper:before,
  .ivu-radio-group-button .ivu-radio-wrapper:after {
    display: none;
  }
}
</style>
