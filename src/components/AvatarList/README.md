# AvatarList 头像列表组件

常用于文字显示中的链接，或者表格中文字操作按钮。

## 代码示例

### 基础用法

```vue
<template>
  <AvatarList :list="avatarList" />
</template>
<script>
export default{
  data() {
    return {
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
    }
  }
}
</script>
```

### 头像组最大数目

```vue
<template>
  <AvatarList :list="avatarList" :max="5" />
</template>
<script>
export default{
  data() {
    return {
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
    }
  }
}
</script>
```

### 头像组大小

```vue
<template>
  <span class="display-inline-block margin-right-30">
    <AvatarList :list="avatarList" :max="5" size="small" />
  </span>
  <span class="display-inline-block margin-right-30">
    <AvatarList :list="avatarList" :max="5" size="default" />
  </span>
  <span class="display-inline-block">
    <AvatarList :list="avatarList" :max="5" size="large" />
  </span>
</template>
<script>
export default{
  data() {
    return {
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
    }
  }
}
</script>
```

## API

### 属性

| 参数        | 说明                                                  | 类型    |                        默认值                         |
| :---------- | :---------------------------------------------------- | :------ | :---------------------------------------------------: |
| list        | 头像列表数组，每项需要有 `src` 属性                   | Array   |                          []                           |
| excessStyle | 头像的样式，默认包含 `color` 和 `background-color`    | Object  | `{ color: "#f56a00", "background-color" : "#fde3cf"}` |
| shape       | 形状，可选值为 `circle/square`                        | String  |                        circle                         |
| max         | 头像列表最大展示数目                                  | Number  |                           4                           |
| size        | 头像大小，`small/default/large`                       | String  |                        default                        |
| tooltip     | 是否开启 `tooltip` 组件提示                           | Boolean |                         true                          |
| placement   | tooltip 组件提示框出现位置，参考官网 api 的 placement | String  |                        bottom                         |
