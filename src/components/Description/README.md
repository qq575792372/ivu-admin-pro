# Description 描述信息组件

常用于文字显示中的链接，或者表格中文字操作按钮。

## 代码示例

### 基础用法

```vue
<template>
  <Description title="基础信息" :label-width="labelWidth" label-position="left">
    <!-- 操作按钮slot -->
    <template slot="action">
      <Button type="default">操作1</Button>
      <Button type="primary">操作2</Button>
      <Button type="error">操作3</Button>
    </template>
    <DescriptionItem label="商品编号：" v-bind="grid">
      SP20210729001
    </DescriptionItem>
    <DescriptionItem label="商品名称：" v-bind="grid">
      可口可乐6罐/件
    </DescriptionItem>
    <DescriptionItem label="所属分类：" v-bind="grid">酒水饮料</DescriptionItem>
    <DescriptionItem label="商品原价：" v-bind="grid">￥12.99</DescriptionItem>
    <DescriptionItem label="商品现价：" v-bind="grid">￥9.99</DescriptionItem>
    <DescriptionItem label="单位：" v-bind="grid">件</DescriptionItem>
    <DescriptionItem label="库存：" v-bind="grid">100件</DescriptionItem>
  </Description>
</template>
<script>
export default {
  data() {
    return {
      labelWidth: 80,
      grid: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24,
      },
    };
  },
};
</script>
```

### 自定义描述内容

```vue
<template>
  <Description title="表格信息" :label-width="labelWidth" label-position="left">
    <!-- 操作按钮slot -->
    <template slot="action">
      <Button type="default">操作1</Button>
      <Button type="primary">操作2</Button>
    </template>
    <!-- 自定义描述信息内容slot -->
    <template slot="custom">
      <div class="text-desc">
        注：以下内容是表格信息展示，通过
        <em>slot="custom"</em>
        方式自定义描述信息内容
      </div>
      <Table :columns="tableColumns" :data="tableData">
        <template slot="originPrice" slot-scope="{ row }">
          ￥{{ row.originPrice }}
        </template>
        <template slot="sellPrice" slot-scope="{ row }">
          ￥{{ row.sellPrice }}
        </template>
      </Table>
    </template>
  </Description>
</template>
<script>
export default {
  data() {
    return {
      labelWidth: 80,
      grid: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24,
      },
      tableData: [],
      tableColumns: [],
    };
  },
};
</script>
```

## API

### Description 属性

| 参数           | 说明                                                              | 类型   | 默认值  |
| :------------- | :---------------------------------------------------------------- | :----- | :-----: |
| title          | 描述标题                                                          | String | default |
| label-width    | `DescriptionItem` 的 `label` 宽度                                 | Number |   --    |
| label-position | `DescriptionItem` 的 `label` 对齐位置，分别为 `left/center/right` | String |  right  |

### Description 插槽

| name   | 说明                                                                                     |
| :----- | :--------------------------------------------------------------------------------------- |
| title  | 自定义 title                                                                             |
| action | 自定义 action 操作                                                                       |
| custom | 当内容不是 `DescriptionItem`组件时候，需要使用 `custom` 插槽，比如嵌入表格，图片等等内容 |

### DescriptionItem 属性

| 参数   | 说明                                    | 类型   |     默认值     |
| :----- | :-------------------------------------- | :----- | :------------: |
| label  | 描述项的文字                            | String |    default     |
| v-bind | 描述项栅格，接收 `<Col>` 组件支持的属性 | Object | `{ span : 8 }` |

### DescriptionItem 插槽

| name    | 说明               |
| :------ | :----------------- |
| default | 描述项默认插槽内容 |
