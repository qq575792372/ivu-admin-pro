<!-- 页头组件 -->
<template>
  <div class="i-page-header">
    <!-- logo slot -->
    <div v-if="$slots.logo" class="i-page-header-logo">
      <slot name="logo" />
    </div>

    <!-- back slot -->
    <div v-if="back" class="i-page-header-back" @click="onBack">
      <Icon class="i-page-header-back-icon" type="md-arrow-back" />
      <span v-if="back !== '' && back !== true" class="i-page-header-back-text">
        {{ back }}
      </span>
      <span v-else class="i-page-header-back-text">返回</span>
      <Divider v-if="$slots.title || title" type="vertical" />
    </div>

    <!-- main -->
    <div class="i-page-header-main">
      <div class="i-page-header-main-row">
        <!-- title and slot -->
        <div v-if="$slots.title || title" class="i-page-header-title">
          <slot v-if="$slots.title" name="title" />
          <span v-else>{{ title }}</span>
        </div>
        <!-- actions slot-->
        <div v-if="$slots.actions" class="i-page-header-actions">
          <slot name="actions" />
        </div>
      </div>
      <div class="i-page-header-main-row">
        <!-- content and slot -->
        <div class="i-page-header-content">
          <slot v-if="$slots.content" name="content" />
          <span v-else>{{ content }}</span>
        </div>
        <!-- extra slot -->
        <div v-if="$slots.extra || extra" class="i-page-header-extra">
          <slot v-if="$slots.extra" name="extra" />
          <span v-else>{{ extra }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
    back: {
      type: [Boolean, String],
      default: false || "",
    },
    content: {
      type: String,
      default: "",
    },
    extra: {
      type: String,
      default: "",
    },
  },
  methods: {
    onBack() {
      this.$emit("on-back");
    },
  },
};
</script>
<style lang="less" scoped>
.i-page-header {
  background: #fff;
  padding: 16px 30px;
  display: flex;
  font-size: 14px;

  &-logo {
    -webkit-box-flex: 0;
    flex: 0 1 auto;
    margin-right: 14px;
    margin-bottom: 14px;
  }

  &-back {
    display: flex;
    align-items: center;
    -webkit-box-flex: 0;
    flex: 0 1 auto;
    margin-bottom: 14px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
    }
    &-icon {
      font-size: 18px;
      vertical-align: middle;
    }
    &-text {
      font-size: 14px;
    }
    .ivu-divider-vertical {
      height: 1.2em;
      margin: 0 14px;
    }
  }

  &-main {
    flex: 1;
    &-row {
      display: flex;
      width: 100%;
      // title
      .i-page-header-title {
        color: #17233d;
        font-weight: 500;
        font-size: 20px;
        flex: auto;
        margin-bottom: 14px;
      }
      // content
      .i-page-header-content {
        flex: auto;
      }
      .i-page-header-actions {
        margin-bottom: 14px;
        min-width: 240px;
      }
      // actions and extra common
      .i-page-header-actions,
      .i-page-header-extra {
        flex: 0 1 auto;
        text-align: right;
        margin-left: 50px;
        // has ivu-btn styles
        .ivu-btn:not(:last-child) {
          margin-right: 8px;
        }
      }
      // extra
      .i-page-header-extra {
        min-width: 220px;
        margin-left: 70px;
      }
    }
  }
}

// 小屏幕下的样式
@media screen and (max-width: 768px) {
  .i-page-header {
    display: block;
    &-logo {
      margin-right: 0px;
    }
    &-main {
      &-row {
        display: block;
        .i-page-header-actions {
          margin-left: 0px;
          text-align: left;
        }
        .i-page-header-content {
          margin-bottom: 14px;
        }
        .i-page-header-extra {
          margin-left: 0px;
          text-align: left;
        }
      }
    }
  }
}
</style>
