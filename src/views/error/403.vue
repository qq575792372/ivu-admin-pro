<template>
  <div class="error-container">
    <img class="error-image" src="../../assets/403_images/403.png" />
    <div class="error-content">
      <div><h1>403</h1></div>
      <div class="desc">抱歉，您无权访问该页面</div>
      <Button type="primary" size="large" icon="md-home" @click="backHome">
        返回首页
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error403",
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
