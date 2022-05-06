# ValidSlider 滑块验证码组件

用于登录，操作之前的校验等场景下

## 代码示例

### 基础用法

```vue
<template>
  <ValidSlider style="width: 360px" />
</template>
```

### 更换图标和文案

```vue
<template>
  <ValidSlider
    start-icon="md-arrow-round-forward"
    start-text="按住别动，一直拖到最右边^_^"
    success-icon="md-checkmark"
    success-text="恭喜，验证成功"
    style="width: 360px"
  />
</template>
```

### 滑块尺寸

size 的值：large，default，small，默认是 default

```vue
<template>
  <ValidSlider size="large" class="margin-bottom-10" style="width: 360px" />
  <ValidSlider size="default" class="margin-bottom-10" style="width: 300px" />
  <ValidSlider size="small" class="margin-bottom-10" style="width: 260px" />
</template>
```

### 回调

回调有 `on-success`，`on-error`，`on-reset` 三个方法

```vue
<template>
  <ValidSlider
    ref="slider1"
    :on-success="onSuccess"
    :on-error="onError"
    :on-reset="onReset"
    style="width: 360px"
  />
  <Button type="primary" class="margin-top-10" @click="handleReset">
    重置
  </Button>
</template>
<script>
export default {
  methods: {
    onSuccess() {
      this.$Message.success("回调成功");
    },
    onError() {
      this.$Message.error("回调失败");
    },
    onReset() {
      this.$Message.success("重置成功");
    },
    handleReset() {
      this.$refs.slider1.reset();
    },
  },
};
</script>
```

## API

### 属性

| 参数         | 说明                                       | 类型     |          默认值          |
| :----------- | :----------------------------------------- | :------- | :----------------------: |
| size         | 尺寸大小：`large/default/small`            | String   |         default          |
| start-icon   | 开始的图标，支持 viewUI 的 Icon 图标名     | String   |    ios-arrow-forward     |
| start-text   | 开始的文字                                 | String   | 请按住滑块，拖动到最右边 |
| success-icon | 拖动成功的图标，支持 viewUI 的 Icon 图标名 | String   |   md-checkmark-circle    |
| success-text | 拖动成功的文字                             | String   |            --            |
| on-success   | 拖动成功的回调方法                         | Function |            --            |
| on-error     | 拖动失败的回调方法                         | Function |            --            |
| on-reset     | 滑块重置的回调方法                         | Function |            --            |
