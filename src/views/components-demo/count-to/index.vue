<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="数字Count动画"
      content="使用vue-count-to插件实现数字变化的动态效果"
    />

    <!-- main -->
    <div class="main-container">
      <div class="count-num">
        <CountTo
          ref="countDemo1"
          :start-val="options.startVal"
          :end-val="options.endVal"
          :duration="options.duration"
          :decimals="options.decimals"
          :decimal="options.decimal"
          :separator="options.separator"
          :autoplay="false"
          :prefix="options.prefix"
          :suffix="options.suffix"
          :use-easing="options.useEasing"
        />
      </div>
      <div class="count-options">
        <Row type="flex" justify="center" class="margin-bottom-10">
          <Col :span="8">
            startVal:
            <InputNumber v-model="options.startVal" style="width: 70px" />
            <span class="text-desc">开始值</span>
          </Col>
          <Col :span="8">
            endVal:
            <InputNumber v-model="options.endVal" style="width: 70px" />
            <span class="text-desc">结束值</span>
          </Col>
          <Col :span="8">
            duration:
            <InputNumber v-model="options.duration" style="width: 70px" />
            <span class="text-desc">动画持续毫秒时间</span>
          </Col>
        </Row>
        <Row type="flex" justify="center" class="margin-bottom-10">
          <Col :span="8">
            decimals:
            <InputNumber v-model="options.decimals" style="width: 70px" />
            <span class="text-desc">小数位数</span>
          </Col>
          <Col :span="8">
            decimal:
            <Input v-model="options.decimal" style="width: 70px" />
            <span class="text-desc">小数点符号</span>
          </Col>
          <Col :span="8">
            separator:
            <Input v-model="options.separator" style="width: 70px" />
            <span class="text-desc">千分位分隔符</span>
          </Col>
        </Row>
        <Row type="flex" justify="center" class="margin-bottom-10">
          <Col :span="8">
            prefix:
            <Input v-model="options.prefix" style="width: 70px" />
            <span class="text-desc">前缀</span>
          </Col>
          <Col :span="8">
            suffix:
            <Input v-model="options.suffix" style="width: 70px" />
            <span class="text-desc">后缀</span>
          </Col>
          <Col :span="8"></Col>
        </Row>
      </div>
      <div class="count-btn">
        <Button type="primary" @click="handleStart">开始</Button>
        <Button type="error" @click="handleStop">暂停</Button>
        <Button type="warning" @click="handleReset">重置</Button>
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  components: { CountTo },
  data() {
    return {
      options: {
        startVal: 0,
        endVal: 2021,
        duration: 3000,
        decimals: 0,
        decimal: ".",
        separator: ",",
        prefix: "￥",
        suffix: "元",
      },
    };
  },
  methods: {
    handleStart() {
      this.$refs.countDemo1.start();
    },
    handleStop() {
      this.$refs.countDemo1.pause();
    },
    handleReset() {
      this.$refs.countDemo1.reset();
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

    .count-num {
      text-align: center;
      padding: 20px;
      font-size: 40px;
      color: #19be6b;
    }

    .count-options {
    }
    .count-btn {
      text-align: center;
      .ivu-btn {
        margin-right: 8px;
      }
      margin-bottom: 20px;
    }
  }
}
</style>
