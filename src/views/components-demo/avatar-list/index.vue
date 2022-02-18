<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="头像组列表"
      content="一组用户头像列表的展示，可以设置尺寸/形状/最多显示数量"
    />

    <!-- main -->
    <div class="main-container">
      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <AvatarList :list="avatarList" />
        </div>
      </div>
      <!-- 头像组最大数目 -->
      <div class="demo-block">
        <div class="demo-title">头像组最大数目</div>
        <div class="demo-desc">设置max属性，值为Number类型</div>
        <div class="demo-use">
          <AvatarList :list="avatarList" :max="5" :excess-style="excessStyle" />
        </div>
      </div>
      <!-- 头像组大小 -->
      <div class="demo-block">
        <div class="demo-title">头像组大小</div>
        <div class="demo-desc">设置size属性，值为：small、default、large</div>
        <div class="demo-use">
          <span class="display-inline-block margin-right-30">
            <AvatarList :list="avatarList" :max="5" size="small" />
          </span>
          <span class="display-inline-block margin-right-30">
            <AvatarList :list="avatarList" :max="5" size="default" />
          </span>
          <span class="display-inline-block">
            <AvatarList :list="avatarList" :max="5" size="large" />
          </span>
        </div>
      </div>
      <!-- 头像组形状 -->
      <div class="demo-block">
        <div class="demo-title">头像组形状</div>
        <div class="demo-desc">设置shape属性，值为：circle、square</div>
        <div class="demo-use">
          <AvatarList
            :list="avatarList"
            :max="5"
            shape="square"
            :tooltip="true"
          />
        </div>
      </div>
      <!-- 开启和关闭tooltip -->
      <div class="demo-block">
        <div class="demo-title">开启和关闭tooltip</div>
        <div class="demo-desc">
          默认是开启的，开启需要手动设置tooltip属性，值为：ture和false
        </div>
        <div class="demo-use">
          <span class="display-inline-block margin-right-30">
            <AvatarList :list="avatarList" :max="5" :tooltip="true" />
          </span>
          <span class="display-inline-block margin-right-30">
            <AvatarList :list="avatarList" :max="5" :tooltip="false" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      excessStyle: {
        color: "#f56a00",
        backgroundColor: "#fde3cf",
      },
      avatarList: [
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
        {
          src: require("../../../assets/head.png"),
          tips: "妲己",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
  }
}
</style>
