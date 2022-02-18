<!-- 头像列表 -->
<template>
  <div class="ivu-avatar-list" :class="avatarListClasses">
    <div
      v-for="(item, index) in currentList"
      :key="index"
      class="ivu-avatar-list-item"
    >
      <Tooltip :disabled="!tooltip" :content="item.tips" :placement="placement">
        <Avatar :src="item.src" :size="size" :shape="shape" />
      </Tooltip>
    </div>
    <div
      v-if="max > 0 && max < list.length"
      class="ivu-avatar-list-item ivu-avatr-list-item-excess"
    >
      <Avatar :style="excessStyle" :size="size" :shape="shape">
        +{{ list.length - max }}
      </Avatar>
    </div>
  </div>
</template>
<script>
export default {
  name: "AvatarList",
  props: {
    // 头像列表
    list: {
      type: Array,
    },
    // Avatar组件样式
    excessStyle: {
      type: Object,
      default: () => {
        return {
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        };
      },
    },
    // Avatar组件形状，可选值为 circle、square
    shape: {
      type: String,
      default: "circle",
    },
    // 头像列表最大展示数目
    max: { type: Number },
    // Avatar组件大小，small，default，large
    size: {
      type: String,
      default: "default",
    },
    // 是否开启tooltip组件提示
    tooltip: {
      type: Boolean,
      default: true,
    },
    // tooltip组件提示框出现位置，参考官网api的placement
    placement: {
      type: String,
      default: "bottom",
    },
  },
  computed: {
    // 计算当前展示的头像列表
    currentList() {
      let list = this.list;
      if (this.max && this.max > 0) {
        list = this.list.slice(0, this.max);
      }
      return list;
    },
    // 当前头像size
    avatarListClasses() {
      return "ivu-avatar-list-" + (this.size ? this.size : "");
    },
  },
};
</script>
<style lang="less" scoped>
.ivu-avatar-list {
  // default
  .ivu-avatar-list-item {
    display: inline-block;
    margin-left: -12px;
    cursor: pointer;
  }
  .ivu-avatar-list-item:first-child {
    margin-left: 0px;
  }
  .ivu-avatar-list-item .ivu-avatar {
    border: 1px solid #fff;
  }
  // small
  &.ivu-avatar-list-small {
    .ivu-avatar-list-item {
      margin-left: -8px;
      &.ivu-avatr-list-item-excess {
        font-size: 12px;
      }
    }
  }
  // large
  &.ivu-avatar-list-large {
    .ivu-avatar-list-item {
      margin-left: -16px;
      &.ivu-avatr-list-item-excess {
        font-size: 16px;
      }
    }
  }
}
</style>
