<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="基础表单" content="基础表单用法" />

    <!-- 主要内容 -->
    <div class="main-container">
      <div class="form-box">
        <Form
          ref="editFormRef"
          :model="editForm"
          :rules="editFormRules"
          :label-width="120"
          label-colon="："
          class="basic-form"
        >
          <FormItem label="书名" prop="name">
            <Input
              v-model="editForm.name"
              placeholder="输入书名"
              style="width: 360px"
            ></Input>
          </FormItem>
          <FormItem label="作者" prop="author">
            <Input
              v-model="editForm.author"
              placeholder="输入作者"
              style="width: 360px"
            ></Input>
          </FormItem>
          <FormItem label="封面图" prop="coverImg">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block; width: 58px"
            >
              <div style="width: 58px; height: 58px; line-height: 58px">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input
              type="textarea"
              placeholder="输入备注"
              :rows="4"
              style="width: 360px"
            />
          </FormItem>
        </Form>
        <div class="text-align-center">
          <Button
            type="default"
            style="margin-right: 10px"
            @click="editModal = false"
          >
            取消
          </Button>
          <Button type="primary" @click="handleSubmit">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新增和编辑
      editModal: false,
      editForm: {
        id: "",
        name: "",
        author: "",
        status: "",
        coverImg: "",
        desc: "",
      },
      editFormRules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入书名",
          },
        ],
        author: [
          {
            required: true,
            trigger: "blur",
            message: "请输入作者",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    /**
     * 提交
     */
    handleSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          if (this.editForm.id) {
            this.handleUpdate();
          } else {
            this.handleAdd();
          }
        }
      });
    },
    handleAdd() {
      console.log("请求后台接口，参数：", this.editForm);
      this.$Message.success("保存成功");
      this.editModal = false;
    },
    handleUpdate() {
      console.log("请求后台接口，参数：", this.editForm);
      this.$Message.success("修改成功");
      this.editModal = false;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 30px;
    border-radius: 4px;
    .form-box {
      width: 640px;
      margin: 0 auto;
    }
  }
}
</style>
