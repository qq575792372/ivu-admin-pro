<template>
  <div class="step-container">
    <Result type="success" title="操作成功">
      <div slot="desc">预计两个小时内到账</div>
      <div slot="extra">
        <Form :label-width="140" label-colon="：">
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
      </div>
      <div slot="actions">
        <Button type="primary" @click="handleAgain">再转一笔</Button>
        <Button>查看账单</Button>
      </div>
    </Result>
  </div>
</template>

<script>
export default {
  props: {
    formData: { type: Object, default: () => {} },
    onResetStep: { type: Function, default: () => {} },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    /**
     * 再转一笔
     */
    handleAgain() {
      this.onResetStep(0);
    },
  },
};
</script>
<style lang="less" scoped>
.step-container {
  width: 960px;
  margin: 0 auto;
}
</style>
