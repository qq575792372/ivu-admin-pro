<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="步骤表单" content="步骤表单用法" />

    <!-- 主要内容 -->
    <div class="main-container">
      <!-- 步骤条 -->
      <div class="step-box">
        <Steps :current="currentStep">
          <Step title="填写转账信息" content="填写真实转账的信息"></Step>
          <Step title="填写收款信息" content="填写真实收款的信息"></Step>
          <Step title="确认最终信息" content="请仔细核对填写的信息"></Step>
          <Step title="完成" content="操作完成"></Step>
        </Steps>
      </div>
      <!-- form表单步骤 -->
      <div class="form-box">
        <Step1 v-show="currentStep == 0" :on-next-step="handleNextStep" />
        <Step2
          v-show="currentStep == 1"
          :form-data="formData"
          :on-prev-step="handlePrevStep"
          :on-next-step="handleNextStep"
        />
        <Step3
          v-show="currentStep == 2"
          :form-data="formData"
          :on-prev-step="handlePrevStep"
          :on-next-step="handleNextStep"
        />
        <Step4
          v-show="currentStep == 3"
          :form-data="formData"
          :on-reset-step="handleResetStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

export default {
  components: { Step1, Step2, Step3, Step4 },
  data() {
    return {
      currentStep: 0,

      formData: {},
    };
  },
  methods: {
    /**
     * 上一步
     */
    handlePrevStep(prevStep, data) {
      console.log("parent prev step", prevStep);
      this.currentStep = prevStep;
    },
    /**
     * 下一步
     */
    handleNextStep(nextStep, data) {
      this.currentStep = nextStep;
      this.formData = { ...this.formData, ...data };
      console.log("formData", this.formData);
    },
    /**
     * 重置步骤条
     */
    handleResetStep(currentStep) {
      this.currentStep = currentStep;
      this.formData = {};
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 30px 15%;
    border-radius: 4px;
    // 步骤条
    .step-box {
      margin: 0 auto;
    }
    // form表单
    .form-box {
      margin: 30px auto 0;
    }
  }
}
</style>
