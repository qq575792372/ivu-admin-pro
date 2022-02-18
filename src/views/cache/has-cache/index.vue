<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="有缓存页面"
      content="有缓存页面，当前vue页面的name值必须要写，并且和路由name值一样缓存才会生效"
    />

    <!-- 主要内容 -->
    <div class="main-container">
      <div class="form-box">
        <Form
          ref="editFormRef"
          :label-width="120"
          label-colon="："
          class="basic-form"
        >
          <FormItem label="名称" prop="name">
            <Input
              v-model="name"
              placeholder="输入名称"
              style="width: 360px"
            ></Input>
            <div class="font-12 text-desc">
              输入一些内容，然后切换到别的页面，再切换回来查看效果
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HasCache",
  data() {
    return {
      name: "",
    };
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
