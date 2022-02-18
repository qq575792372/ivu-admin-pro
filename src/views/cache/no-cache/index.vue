<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="无缓存页面"
      content="无缓存页面，vue页面的name不设置，或者路由中的meta设置noCache=true就可以使缓存失效"
    >
      <template slot="content">
        <div>无缓存页面，以下几种情况都可以使缓存失效</div>
        <div>1.当前vue页面的name不设置</div>
        <div>
          2.如果路由name已经设置，当前vue页面的name设置的不一样也可以失效
        </div>
        <div>
          3.如果路由name和当前vue页面的name一样，可以在路由中meta配置
          <em>noCache:true</em>
          ，也可以使缓存失效
        </div>
      </template>
    </PageHeader>

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
  name: "NoCache11",
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
