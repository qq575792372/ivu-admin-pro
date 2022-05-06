<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="权限操作" content="控制页面级别操作权限" />

    <!-- main -->
    <div id="main-container" class="main-container">
      <!-- 指令方式 -->
      <div class="demo-block">
        <div class="demo-title">指令方式</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          用v-permission指令，如果元素没有权限，则会移除掉节点。
          <Button
            class="display-block margin-top-12"
            type="error"
            @click="codes = []"
          >
            隐藏文本
          </Button>
          <div
            v-permission="codes"
            class="text-success margin-top-12 font-18 text-bold"
          >
            能看到我，证明有显示权限，你可以点击上面的【隐藏文本】按钮。
          </div>
        </div>
      </div>

      <!-- 函数方式 -->
      <div class="demo-block">
        <div class="demo-title">函数方式</div>
        <div class="demo-desc">
          hasPermission() 函数通过 v-if 或 v-show 可以动态控制权限操作。
        </div>
        <div class="demo-use">
          显示权限：
          <ButtonGroup>
            <Button type="primary" @click="codes1 = ['CAN_VIEW']">显示</Button>
            <Button type="error" @click="codes1 = []">隐藏</Button>
          </ButtonGroup>
          <div
            v-show="hasPermission(codes1)"
            class="text-success margin-top-12 font-18 text-bold"
          >
            能看到我，证明有显示权限，你可以点击按钮来回切换效果。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codes: ["CAN_VIEW"],
      codes1: ["CAN_VIEW"],
    };
  },
  methods: {},
};
</script>
