<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader>
      <template slot="logo">
        <Avatar
          class="dashboard-header-logo"
          :src="require('../../assets/head.png')"
          size="large"
        />
      </template>
      <template slot="title">
        <div class="dashboard-header-title">{{ welcomeList[nowWeekDay] }}</div>
      </template>
      <template slot="content">
        <div class="dashboard-header-content">
          <Icon type="md-cloudy" />
          今天{{ nowWeekDayStr }}，多云转晴，20℃ - 28℃，温度适宜出去郊游哦~
        </div>
      </template>
    </PageHeader>

    <!-- 统计卡片 -->
    <DashboardCard />
    <!-- 快捷菜单 -->
    <DashboardMenu />
    <!-- 首页统计 -->
    <DashboardStatis />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// 引入组件
import {
  DashboardMenu,
  DashboardCard,
  DashboardStatis,
} from "./components/index";
// 引入api
import { getWeather } from "@/api/common";
// 引入LimeUtil
import LimeUtil from "@lime-util/util";

export default {
  name: "Dashboard",
  components: { DashboardMenu, DashboardCard, DashboardStatis },
  data() {
    return {
      // 欢迎语，根据每周天不同显示
      welcomeList: [
        "欢迎您，全新的一周要元气满满哦！",
        "千里之行，始于足下！",
        "昔我往矣，杨柳依依。",
        "莫道不消魂，帘卷西风，人比黄花瘦。",
        "学而不思则罔，思而不学则殆。",
        "人生得意须尽欢，莫使金樽空对月。",
        "忙碌了一周，请好好让生活待自己。",
      ],
      // 当前的周几
      nowWeekDay: LimeUtil.getDayOfWeek(),
      nowWeekDayStr: LimeUtil.getDayOfWeek(new Date(), "zh"),
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    console.log(process.env);
    // this.getWeatherData();
  },
  methods: {
    getWeatherData() {
      getWeather().then();
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  // 登录欢迎信息
  .dashboard-header {
    &-logo {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    &-title {
      color: #17233d;
    }
    &-content {
      color: #808695;
    }
  }

  // 主要信息
  .main-container {
    margin-top: 0px;
  }
}
</style>
