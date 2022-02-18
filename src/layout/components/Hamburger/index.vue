<template>
  <div
    id="i-layout-navbar-hamburger"
    class="i-layout-navbar-hamburger"
    @click="toggleClick"
  >
    <svg
      :class="{ 'is-active': !isMobile && isCollapse, 'is-mobile': isMobile }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M880 800c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h736zM576 587c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h432z m320.657-205.062c5.899-4.6 14.403-0.498 14.403 6.9v246.178c0 7.4-8.603 11.495-14.403 6.896L740.372 518.826c-4.496-3.5-4.496-10.297 0-13.796zM576 373c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h432z m304-213c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h736z"
        p-id="16352"
      />
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Hamburger",
  computed: {
    ...mapGetters(["sidebar", "device"]),
    // 设备类型
    isMobile() {
      return this.device === "mobile";
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    toggleClick() {
      if (this.isMobile) {
        this.$store.dispatch("layout/app/showSideBar");
      } else {
        this.$store.dispatch("layout/app/toggleSideBar");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.i-layout-navbar-hamburger {
  display: inline-block;
  cursor: pointer;
  line-height: 60px;
  color: #515a6e;
  padding: 0px 10px;

  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: transform 0.28s linear;
    &.is-active {
      transform: rotate(180deg);
    }
    // 手机设备
    &.is-mobile {
      transition: none;
      transform: rotate(180deg);
    }
  }
}
</style>
