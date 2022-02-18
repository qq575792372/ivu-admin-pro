<!-- 登录用户信息 -->
<template>
  <div id="i-layout-navbar-user" class="i-layout-navbar-user">
    <Dropdown class="avatar-dropdown" transfer-class-name="overlay-menu">
      <Avatar class="avatar-image" :src="require('../../../assets/head.png')" />
      <span class="avatar-title">{{ name }}</span>

      <DropdownMenu slot="list">
        <router-link to="/">
          <DropdownItem>首页</DropdownItem>
        </router-link>
        <DropdownItem divided @click.native="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "UserInfo",
  computed: {
    ...mapGetters(["sidebar", "name"]),
  },
  methods: {
    async logout() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定退出登录吗？",
        onOk: async () => {
          // clcik ok
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        onCancel: () => {
          // click no
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
// 登录用户信息
.i-layout-navbar-user {
  display: inline-block;
  padding: 0px 12px;
  .avatar-dropdown {
    cursor: pointer;
    .avatar-image {
      border-radius: 50%;
      vertical-align: middle;
    }
    .avatar-title {
      font-size: 14px;
      position: relative;
      margin-left: 10px;
    }
  }
}
</style>
