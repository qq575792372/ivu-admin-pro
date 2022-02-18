<template>
  <div id="i-layout-navbar-notify" class="i-layout-navbar-notify">
    <Badge :count="10" :offset="[16, 0]">
      <Icon class="i-icon" type="md-notifications-outline" />
    </Badge>
  </div>
</template>
<script>
export default {
  name: "Notify",
};
</script>

<style lang="less" scoped>
.i-layout-navbar-notify {
  display: inline-block;
  cursor: pointer;
  line-height: 60px;
  color: #515a6e;
  padding: 0px 16px;

  .i-icon {
    font-size: 18px;
  }
}
</style>
