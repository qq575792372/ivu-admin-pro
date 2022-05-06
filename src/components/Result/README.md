# Result 操作结果反馈组件

用于显示操作结果页面，分别有成功和失败两种场景。

## 代码示例

### 基础用法

操作成功

```vue
<template>
  <Result
    type="success"
    title="提交成功"
    description="预计两个小时内到账"
    extra="已提交申请，等待部门审核"
  >
    <template slot="description">预计两个小时内到账</template>
    <div slot="extra" class="text-align-center">已提交申请，等待部门审核</div>
    <div slot="action">
      <Button type="primary">主要操作</Button>
      <Button type="default">次要操作</Button>
      <Button type="error">警告操作</Button>
    </div>
  </Result>
</template>
```

操作失败

```vue
<template>
  <Result type="error" title="提交失败">
    <template slot="description">请核对并修改以下信息后，再重新提交</template>
    <template slot="extra">
      <div>1.重新检查信息</div>
      <div>2.再次尝试提交</div>
    </template>
    <div slot="action">
      <Button type="primary">主要操作</Button>
      <Button type="default">次要操作</Button>
      <Button type="error">警告操作</Button>
    </div>
  </Result>
</template>
```

## API

### 属性

| 参数        | 说明                         | 类型    | 默认值  |
| :---------- | :--------------------------- | :------ | :-----: |
| type        | 主题类型，有 `success/error` | String  |   --    |
| title       | 标题名称                     | String  |   --    |
| description | 内容描述                     | Boolean |  false  |
| extra       | 附加内容                     | String  | default |

### 插槽

| name        | 说明         |
| :---------- | :----------- |
| title       | 标题名称插槽 |
| description | 内容描述插槽 |
| extra       | 附加内容插槽 |
| action      | 操作按钮插槽 |
