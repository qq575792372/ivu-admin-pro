<template>
  <div class="error-container">
    <img class="error-image" src="../../assets/404_images/404.png" />
    <div class="error-content">
      <div><h1>404</h1></div>
      <div class="desc">抱歉，您访问的页面不存在</div>
      <Button type="primary" size="large" icon="md-home" @click="backHome">
        返回首页
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {};
  },
  methods: {
    /**
     * 返回首页
     */
    backHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
