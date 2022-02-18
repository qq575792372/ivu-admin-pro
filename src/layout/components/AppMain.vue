<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    // 当开启tabsView才会起作用
    cachedViews() {
      return this.$store.state.layout.tabsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="less" scoped>
.app-main {
  height: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
