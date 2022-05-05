# PageHeader 页头组件

常用于文字显示中的链接，或者表格中操作按钮。

## 代码示例

### 基础用法

```html
<PageHeader
  title="页头标题"
  content="内容描述"
  action="操作内容"
  extra="附加内容"
/>
```

### 自定义 slot 方式

```html
<PageHeader title="页头标题" content="内容描述" extra="附加内容">
  <template slot="action">
    <ButtonGroup class="margin-right-8">
      <button type="default">操作1</button>
      <button type="default">操作2</button>
    </ButtonGroup>
    <button type="primary">编辑</button>
  </template>
</PageHeader>
```

### 返回按钮

```html
<PageHeader back="返回列表" @on-back="goback" />
```

## API

### 属性

| 参数    | 说明                                                                | 类型            | 默认值  |
| :------ | :------------------------------------------------------------------ | :-------------- | :-----: |
| title   | 页头标题名称                                                        | String          | default |
| back    | 是否显示返回按钮，并且可以自定义文案，需要绑定`on-back`事件结合使用 | Boolean, String |  false  |
| content | 页头内容                                                            | Boolean         |  false  |
| action  | 操作内容                                                            | String          |    -    |
| extra   | 附加内容                                                            | String          |   --    |

### 事件

| 事件名  | 说明                   | 参数 |
| :------ | :--------------------- | :--- |
| on-back | 开启返回按钮后触发事件 | --   |

### 插槽

| name    | 说明                       |
| :------ | :------------------------- |
| logo    | 标题左侧 logo 图标         |
| back    | 返回按钮                   |
| title   | 页头标题                   |
| action  | 页头标题右侧部分的操作     |
| content | 页头内容                   |
| extra   | 页头内容右侧部分的附加内容 |
