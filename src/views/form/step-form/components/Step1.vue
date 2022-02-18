<template>
  <div class="step-container">
    <Form
      ref="editFormRef"
      :model="editForm"
      :rules="editFormRules"
      :label-width="140"
      label-colon="："
    >
      <FormItem label="转账账户" prop="transferAccount">
        <Input
          v-model="editForm.transferAccount"
          placeholder="输入转账账户"
          style="width: 360px"
        >
          <Select
            slot="prepend"
            v-model="editForm.transferType"
            style="width: 80px"
          >
            <Option value="wechat">微信</Option>
            <Option value="alipay">支付宝</Option>
            <Option value="bankcard">银行卡</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="转账人真实姓名" prop="transferName">
        <Input
          v-model="editForm.transferName"
          placeholder="输入转账人真实姓名"
          style="width: 360px"
        />
      </FormItem>
    </Form>
    <div class="text-align-center">
      <Button type="primary" @click="handleNextStep">下一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onNextStep: Function,
  },
  data() {
    return {
      // 填写转账表单
      editForm: {
        transferType: "wechat",
        transferAccount: "",
        transferName: "",
      },
      editFormRules: {
        transferAccount: [
          {
            required: true,
            trigger: "blur",
            message: "请输入转账账户",
          },
        ],
        transferName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入转账人真实姓名",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 下一步
     */
    handleNextStep() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          // 校验通过，调用父组件方法展示下一步
          this.onNextStep(1, this.editForm);
        }
      });
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
