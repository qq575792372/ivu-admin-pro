<template>
  <div class="step-container">
    <Alert show-icon closable>
      请仔细确认好转账的信息，资金打入对方账户后，无法撤回。
    </Alert>
    <Form :label-width="140" label-colon="：">
      <!-- 转账信息 -->
      <FormItem label="转账账户">
        {{ formData.transferAccount }}
      </FormItem>
      <FormItem label="转账账户类型">
        <span v-if="formData.transferType == 'wechat'">微信</span>
        <span v-if="formData.transferType == 'alipay'">支付宝</span>
        <span v-if="formData.transferType == 'bankcard'">银行卡</span>
      </FormItem>
      <FormItem label="转账人真实姓名">
        {{ formData.transferName }}
      </FormItem>
      <Divider />
      <!-- 收款信息 -->
      <FormItem label="收款账户">
        {{ formData.collectAccount }}
      </FormItem>
      <FormItem label="收款账户类型">
        <span v-if="formData.collectType == 'wechat'">微信</span>
        <span v-if="formData.collectType == 'alipay'">支付宝</span>
        <span v-if="formData.collectType == 'bankcard'">银行卡</span>
      </FormItem>
      <FormItem label="收款人真实姓名">
        {{ formData.collectName }}
      </FormItem>
      <FormItem label="转账金额">
        <span class="text-bold text-danger">
          ￥{{ Number(formData.transferAmount).toFixed(2) }}
        </span>
      </FormItem>
      <FormItem label="备注">
        {{ formData.remark }}
      </FormItem>
    </Form>
    <div class="text-align-center">
      <Button type="default" style="margin-right: 10px" @click="handlePrevStep">
        返回上一步
      </Button>
      <Button type="primary" :loading="btnLoading" @click="handleSubmit">
        提交
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: { type: Object, default: () => {} },
    onPrevStep: { type: Function, default: () => {} },
    onNextStep: { type: Function, default: () => {} },
  },
  data() {
    return {
      btnLoading: false,
    };
  },
  created() {},
  methods: {
    /**
     * 上一步
     */
    handlePrevStep() {
      this.onPrevStep(1);
    },
    /**
     * 提交
     */
    handleSubmit() {
      console.log("提交信息到后台");
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.onNextStep(3, this.formData);
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.step-container {
  width: 640px;
  margin: 0 auto;
}
</style>
