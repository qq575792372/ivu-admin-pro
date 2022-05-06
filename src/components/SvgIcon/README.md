# SvgIcon 图标组件

为了方便使用项目中 svg 图标，封装为组件来直接使用。

## 代码示例

### 基础用法

```vue
<template>
  <SvgIcon type="user" />
</template>
```

### 图标大小

size 可以是数字，也可以是带像素单位的字符串

```vue
<template>
  <SvgIcon type="user" :size="20" class="margin-right-4" />
  <SvgIcon type="user" size="20px" />
</template>
```

### 图标颜色

```vue
<template>
  <SvgIcon type="user" color="rgba(237,64,20,1)" class="margin-right-4" />
  <SvgIcon type="user" size="20" color="#2d8cf0" />
</template>
```

## API

### 属性

| 参数  | 说明                                                | 类型          | 默认值 |
| :---- | :-------------------------------------------------- | :------------ | :----: |
| type  | 图标类型，也就是项目 src/icons/svg 目录下的文件名称 | String        |   --   |
| size  | 图标的大小                                          | Number,String |  14px  |
| color | 图标颜色，默认用父级元素颜色                        | String        |   --   |
