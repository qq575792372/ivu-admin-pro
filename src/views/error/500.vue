<template>
  <div class="error-container">
    <img class="error-image" src="../../assets/500_images/500.png" />
    <div class="error-content">
      <div><h1>500</h1></div>
      <div class="desc">抱歉，服务器出现了异常</div>
      <Button type="primary" size="large" icon="md-home" @click="backHome">
        返回首页
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error500",
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
