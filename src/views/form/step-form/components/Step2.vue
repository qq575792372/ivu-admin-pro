<template>
  <div class="step-container">
    <Form
      ref="editFormRef"
      :model="editForm"
      :rules="editFormRules"
      :label-width="140"
      label-colon="："
    >
      <FormItem label="收款账户" prop="collectAccount">
        <Input
          v-model="editForm.collectAccount"
          placeholder="输入收款账户"
          style="width: 360px"
        >
          <Select
            slot="prepend"
            v-model="editForm.collectType"
            style="width: 80px"
          >
            <Option value="wechat">微信</Option>
            <Option value="alipay">支付宝</Option>
            <Option value="bankcard">银行卡</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="收款人真实姓名" prop="collectName">
        <Input
          v-model="editForm.collectName"
          placeholder="输入收款人真实姓名"
          style="width: 360px"
        />
      </FormItem>
      <FormItem label="转账金额" prop="transferAmount">
        <Input
          v-model="editForm.transferAmount"
          placeholder="输入转账金额"
          style="width: 360px"
        >
          <span slot="append">￥</span>
        </Input>
      </FormItem>
      <FormItem label="备注" prop="collectRemark">
        <Input
          type="textarea"
          placeholder="输入备注"
          :rows="4"
          style="width: 360px"
        />
      </FormItem>
    </Form>
    <div class="text-align-center">
      <Button type="default" style="margin-right: 10px" @click="handlePrevStep">
        返回上一步
      </Button>
      <Button type="primary" @click="handleNextStep">下一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: Object,
    onPrevStep: Function,
    onNextStep: Function,
  },
  data() {
    return {
      // 填写收款表单
      editForm: {
        collectType: "wechat",
        collectAccount: "",
        collectName: "",
        transferAmount: "",
        collectRemark: "",
      },
      editFormRules: {
        collectAccount: [
          {
            required: true,
            trigger: "blur",
            message: "请输入收款账户",
          },
        ],
        collectName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入收款人真实姓名",
          },
        ],
        transferAmount: [
          {
            required: true,
            trigger: "blur",
            message: "请输入转账金额",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 上一步
     */
    handlePrevStep() {
      console.log("返回上一步");
      this.onPrevStep(0);
    },
    /**
     * 下一步
     */
    handleNextStep() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          // 校验通过，调用父组件方法展示下一步
          this.onNextStep(2, this.editForm);
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
