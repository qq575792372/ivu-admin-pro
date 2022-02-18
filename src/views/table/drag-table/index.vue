<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="列表拖拽" content="基础列表基础上增加增加鼠标拖拽效果" />

    <!-- main -->
    <div class="main-container">
      <!-- header -->
      <div class="header-box">
        <!-- 查询条件 -->
        <div class="search-box">
          <Row>
            <Col>
              <Input
                v-model="listQuery.productName"
                placeholder="商品名称"
                clearable
                style="width: 180px"
              />
            </Col>
            <Col>
              <Select
                v-model="listQuery.productType"
                placeholder="商品类型"
                clearable
                style="width: 120px"
              >
                <Option value="0">新鲜果蔬</Option>
                <Option value="1">饮料乳品</Option>
                <Option value="2">肉禽水产</Option>
                <Option value="3">米面粮油</Option>
                <Option value="4">日用百货</Option>
                <Option value="5">其他</Option>
              </Select>
            </Col>
            <Col>
              <Select
                v-model="listQuery.status"
                placeholder="商品状态"
                clearable
                style="width: 120px"
              >
                <Option value="0">已下架</Option>
                <Option value="1">已上架</Option>
              </Select>
            </Col>
            <Col>
              <DatePicker
                type="date"
                placeholder="创建时间"
                style="width: 180px"
              />
            </Col>
            <!-- eslint-disable -->
            <template v-if="!searchCollapse">
              <Col v-for="(item, index) in 14" :key="index">
                <Input v-model="listQuery.name" placeholder="输入内容" clearable style="width: 180px" />
              </Col>
            </template>
            <Col>
              <Button type="primary" @click="queryData">查询</Button>
              <Button type="default" @click="handleReset">重置</Button>
              <!-- 查询条件展开和收起 -->
              <i-link type="primary" :underline="false" @click="searchCollapse = !searchCollapse">
                <template v-if="searchCollapse">
                  <Icon type="ios-arrow-down" />
                  展开
                </template>
                <template v-else>
                  <Icon type="ios-arrow-up" />
                  收起
                </template>
              </i-link>
            </Col>
          </Row>
        </div>
        <!-- 操作按钮 -->
        <div class="operate-box">
          <Button icon="md-add" type="primary" @click="showAddModal">新增</Button>
          <Button icon="md-done-all" type="primary">批量操作</Button>
        </div>
      </div>
      <!-- table -->
      <div class="table-box">
        <Alert show-icon>
          <div>
            已选择
            <span class="text-bold text-primary">{{ selectRows.length }}</span>
            条数据
            <i-link class="margin-left-10" type="danger" :underline="false" @click="handleClearRows">清空</i-link>
          </div>
        </Alert>
        <Table
          ref="tableRef"
          :loading="listLoading"
          :columns="tableColumns"
          :data="list"
          :draggable="true"
          @on-drag-drop="handleDrag"
          @on-selection-change="handleChange"
        >
          <!-- 状态 -->
          <template slot-scope="{ row, index }" slot="status">
            <span class="text-success" v-if="row.status == 1">已上架</span>
            <span class="text-danger" v-if="row.status == 0">已下架</span>
          </template>
          <!-- 操作 -->
          <template slot-scope="{ row, index }" slot="action" :width="100">
            <i-link type="primary" :underline="false" @click="showEditModal(row)">编辑</i-link>
            <i-link type="danger" :underline="false" @click="handleDelete(row)">删除</i-link>
          </template>
        </Table>
      </div>
      <!-- paging -->
      <div class="pagination-box">
        <Page
          :total="listTotal"
          :current.sync="listQuery.pageNo"
          :page-size="listQuery.pageSize"
          show-sizer
          show-elevator
          show-total
          :page-size-opts="[10, 20, 30, 50]"
          @on-change="changePageNo"
          @on-page-size-change="changePageSize"
        />
      </div>
    </div>

    <!-- 弹框 -->
    <!-- 编辑和新增 -->
    <Modal v-model="editModal" :title="editForm.id ? '编辑商品' : '添加商品'" width="640px">
      <div>
        <Form ref="editFormRef" :model="editForm" :rules="editFormRules" :label-width="80">
          <FormItem v-if="editForm.id" label="商品编号">
            {{ editForm.productNo }}
          </FormItem>
          <FormItem label="商品名称" prop="productName">
            <Input
              v-model="editForm.productName"
              placeholder="输入商品名称"
              maxlength="100"
              style="width: 360px"
              clearable
            ></Input>
          </FormItem>
          <FormItem label="商品分类" prop="productType">
            <Select v-model="editForm.productType" placeholder="选择商品分类" style="width: 360px" clearable>
              <Option value="0">新鲜果蔬</Option>
              <Option value="1">饮料乳品</Option>
              <Option value="2">肉禽水产</Option>
              <Option value="3">米面粮油</Option>
              <Option value="4">日用百货</Option>
              <Option value="5">其他</Option>
            </Select>
          </FormItem>
          <FormItem label="商品原价" prop="originPrice">
            <InputNumber
              v-model="editForm.originPrice"
              :min="0"
              :precision="2"
              placeholder="输入商品原价"
              style="width: 360px"
            />
          </FormItem>
          <FormItem label="商品售价" prop="sellPrice">
            <InputNumber
              v-model="editForm.sellPrice"
              :min="0"
              :precision="2"
              placeholder="输入商品原价"
              style="width: 360px"
            />
          </FormItem>
          <FormItem label="单位" prop="unit">
            <Input
              v-model="editForm.unit"
              placeholder="输入单位（如：双，个，件，箱..）"
              maxlength="2"
              style="width: 360px"
              clearable
            />
          </FormItem>
          <FormItem label="库存" prop="stock">
            <InputNumber v-model="editForm.stock" :min="0" placeholder="输入库存" style="width: 360px" />
          </FormItem>
          <FormItem v-if="editForm.id" label="状态">
            <span v-if="editForm.status == 0" class="text-danger">已下架</span>
            <span v-if="editForm.status == 1" class="text-success">已上架</span>
          </FormItem>
        </Form>
      </div>
      <div class="text-align-center" slot="footer">
        <Button type="default" @click="editModal = false">取消</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// 引入LimeUtil
import LimeUtil from "@lime-util/util";
// 引入api
import {
  getList,
  getDetail,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/api/product";
export default {
  data() {
    return {
      // 搜索输入收起和展开
      searchCollapse: true,

      // 列表分页
      list: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        name: "",
        productType: "",
        pageNo: 1,
        pageSize: 10,
      },

      // 表格多选和单选
      selectRows: [],
      selectRow: {},

      // 表格列数据
      tableColumns: [
        {
          type: "selection",
          width: 40,
        },
        {
          key: "index",
          title: "序号",
          width: 70,
          align: "center",
          render: (h, { row, index }) => {
            return h(
              "span",
              this.listQuery.pageSize * (this.listQuery.pageNo - 1) + index + 1
            );
          },
        },
        {
          title: "商品编号",
          key: "productNo",
          minWidth: 200,
        },
        {
          title: "商品名称",
          key: "productName",
          width: 120,
        },
        {
          title: "商品分类",
          key: "productType",
          width: 120,
          render: (h, { row, index }) => {
            return h(
              "span",
              row.productType == 0
                ? "新鲜果蔬"
                : row.productType == 1
                ? "饮料乳品"
                : row.productType == 2
                ? "肉禽水产"
                : row.productType == 3
                ? "米面粮油"
                : row.productType == 4
                ? "日用百货"
                : row.productType == 5
                ? "其他"
                : ""
            );
          },
        },
        {
          title: "状态",
          slot: "status",
          width: 120,
        },
        {
          title: "商品原价",
          key: "originPrice",
          width: 120,
          sortable: true,
          render: (h, { row, index }) => {
            return h("span", "￥" + LimeUtil.toFixed(row.originPrice));
          },
        },
        {
          title: "商品售价",
          key: "sellPrice",
          width: 120,
          sortable: true,
          render: (h, { row, index }) => {
            return h("span", "￥" + LimeUtil.toFixed(row.originPrice));
          },
        },
        {
          title: "单位",
          key: "unit",
          width: 120,
        },
        {
          title: "库存",
          key: "stock",
          width: 120,
          sortable: true,
          render: (h, { row, index }) => {
            let text = row.stock + row.unit;
            return h("span", text);
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 180,
        },
        {
          title: "更新时间",
          key: "updateTime",
          width: 180,
        },
        {
          title: "操作",
          slot: "action",
          fixed: "right",
          width: 120,
        },
      ],

      // 新增和编辑
      editModal: false,
      // 表单
      editForm: {
        id: "",
        productNo: "",
        productName: "",
        productType: "",
        status: "",
        originPrice: null,
        sellPrice: null,
        unit: "",
        stock: null,
      },
      // 表单校验
      editFormRules: {
        productName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入商品名称",
          },
        ],
        productType: [
          {
            required: true,
            trigger: "change",
            message: "请选择商品类型",
          },
        ],
        originPrice: [
          {
            type: "number",
            required: true,
            trigger: "blur",
            message: "请输入商品原价",
          },
        ],
        sellPrice: [
          {
            type: "number",
            required: true,
            trigger: "blur",
            message: "请输入商品售价",
          },
        ],
        unit: [
          {
            required: true,
            trigger: "blur",
            message: "请输入单位",
          },
        ],
        stock: [
          {
            type: "number",
            required: true,
            trigger: "blur",
            message: "请输入库存",
          },
        ],
      },
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    /**
     * 查询列表
     */
    queryData() {
      this.listLoading = true;
      getList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
      })
        .then((res) => {
          setTimeout(() => {
            this.listLoading = false;
          }, 300);
          if (res.code === 0) {
            this.list = res.data.records;
            this.listTotal = res.data.total;
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch((error) => {
          this.listLoading = false;
        });
      // 关闭loading
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
    },
    // 重置查询列表
    handleReset() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
      };
      this.queryData();
    },
    // 分页
    changePageNo(val) {
      this.listQuery.pageNo = val;
      this.queryData();
    },
    changePageSize(val) {
      this.listQuery.pageSize = val;
      this.queryData();
    },

    /**
     * 列表拖拽排序
     * @param {Number} sourceIndex 源位置下标
     * @param {Number} targetIndex  替换位置后的下标
     */
    handleDrag(sourceIndex, targetIndex) {
      this.list[sourceIndex] = this.list.splice(
        targetIndex,
        1,
        this.list[sourceIndex]
      )[0];
    },
    /**
     * 表格多选
     */
    handleChange(rows) {
      this.selectRows = rows;
    },
    /**
     * 清空表格多选
     */
    handleClearRows() {
      this.$refs.tableRef.selectAll(false);
    },

    /**
     * 新增和编辑
     */
    showAddModal() {
      this.editModal = true;
      // 需要先设置表单数据为空后，再调用重置表单才会起作用
      this.editForm = {
        id: "",
        productNo: "",
        productName: "",
        productType: "",
        status: "",
        originPrice: null,
        sellPrice: null,
        unit: "",
        stock: null,
      };
      if (this.$refs.editFormRef) {
        this.$refs.editFormRef.resetFields();
      }
    },
    showEditModal(row) {
      this.editModal = true;
      this.editForm = {
        id: row.id,
        productNo: row.productNo,
        productName: row.productName,
        productType: String(row.productType),
        status: String(row.status),
        originPrice: row.originPrice,
        sellPrice: row.sellPrice,
        unit: row.unit,
        stock: row.stock,
      };
    },
    handleSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          if (this.editForm.id) {
            this.handleUpdate();
          } else {
            this.handleAdd();
          }
        }
      });
    },
    // 保存
    handleAdd() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          addProduct(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$Message.success("添加成功");
              this.queryData();
              this.editModal = false;
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    // 修改
    handleUpdate() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          updateProduct(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$Message.success("修改成功");
              this.queryData();
              this.editModal = false;
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },

    /**
     * 删除
     */
    handleDelete(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除该条数据吗？",
        closable: true,
        onOk: () => {
          deleteProduct({ id: row.id }).then((res) => {
            if (res.code === 0) {
              this.$Message.success("删除成功");
              this.queryData();
            } else {
              this.$Message.error(res.message);
            }
          });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
