# ILink 文字链接组件

常用于文字显示中的链接，或者表格中操作按钮。

## 代码示例

### 基础用法

```html
<Link href="https://www.baidu.com" target="_blank">默认链接</Link>
<Link type="primary">主要链接</Link>
<Link type="success">成功链接</Link>
<Link type="warning">警告链接</Link>
<Link type="danger">危险链接</Link>
<Link type="info">信息链接</Link>
```

### 文字链接大小

```html
<Link href="https://www.baidu.com" target="_blank">默认链接</Link>
<Link size="large">large文字</Link>
<Link icon="md-trash" size="large">large图标文字</Link>
<Link size="small">small文字</Link>
<Link icon="md-trash" size="small">small图标文字</Link>
```

### 禁用状态

```html
<Link target="_blank" disabled>默认链接</Link>
<Link type="primary" disabled>主要链接</Link>
<Link type="success" disabled>成功链接</Link>
<Link type="warning" disabled>警告链接</Link>
<Link type="danger" disabled>危险链接</Link>
<Link type="info" disabled>信息链接</Link>
```

### 下划线

```html
<Link target="_blank" underline>默认链接</Link>
<Link type="primary" underline>主要链接</Link>
<Link type="success" underline>成功链接</Link>
<Link type="warning" underline>警告链接</Link>
<Link type="danger" underline>危险链接</Link>
<Link type="info" underline>信息链接</Link>
```

### 图标

```html
<Link icon="md-add">添加</Link>
<Link icon="md-cloud" type="primary">上传</Link>
<Link icon="md-trash" type="danger">删除</Link>
<Link type="warning">
  <Icon type="ios-browsers" />
  自定义slot
</Link>
```

## API

### 属性

| 参数      | 说明                                                       | 类型    | 默认值  |
| :-------- | :--------------------------------------------------------- | :------ | :-----: |
| type      | 主题类型，有 `default/primary/success/warning/danger/info` | String  | default |
| underline | 是否显示下划线                                             | Boolean |  false  |
| disabled  | 是否禁用状态                                               | Boolean |  false  |
| size      | 文字大小，有 `small/large`                                 | String  | default |
| href      | 链接地址                                                   | String  |   --    |
| icon      | 链接图标，使用 viewUI 的图标 type 名称                     | String  |   --    |

### 插槽

| name    | 说明     | 参数 |
| :------ | :------- | :--- |
| default | 默认插槽 | --   |
