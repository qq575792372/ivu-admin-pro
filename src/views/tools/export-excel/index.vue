<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="导出Excel"
      content="Excel导出依赖于js-xlsx来实现，需要安装 xlsx，file-saver，script-loader 三个依赖包。框架中封装了 vendor/Export2Excel.js 工具方法导出"
    />

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
                <Input
                  v-model="listQuery.name"
                  placeholder="输入内容"
                  clearable
                  style="width: 180px"
                />
              </Col>
            </template>
            <Col>
              <Button type="primary" @click="queryData">查询</Button>
              <Button type="default" @click="handleReset">重置</Button>
              <!-- 查询条件展开和收起 -->
              <i-link
                type="primary"
                :underline="false"
                @click="searchCollapse = !searchCollapse"
              >
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
          <Button
            icon="md-cloud-download"
            :loading="exportLoading"
            type="warning"
            @click="handleExport"
          >
            导出Excel
          </Button>
        </div>
      </div>
      <!-- table -->
      <div class="table-box">
        <Alert show-icon>
          <div>
            已选择
            <span class="text-bold text-primary">{{ selectRows.length }}</span>
            条数据
            <i-link
              class="margin-left-10"
              type="danger"
              :underline="false"
              @click="handleClearRows"
            >
              清空
            </i-link>
          </div>
        </Alert>
        <Table
          ref="tableRef"
          :loading="listLoading"
          :columns="tableColumns"
          :data="list"
          @on-selection-change="handleChange"
        >
          <!-- 状态 -->
          <template slot-scope="{ row, index }" slot="status">
            <span class="text-success" v-if="row.status == 1">已上架</span>
            <span class="text-danger" v-if="row.status == 0">已下架</span>
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
      ],

      // 导出loading
      exportLoading: false,
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
     * 导出excel
     */
    handleExport() {
      if (this.selectRows.length == 0) {
        this.$Message.warning("请至少选择一条数据");
        return;
      }
      // 导出
      this.exportLoading = true;
      import("@/vendor/Export2Excel")
        .then((excel) => {
          const EXCEL_HEADER = [
            "ID",
            "商品编号",
            "商品名称",
            "商品类型",
            "状态",
          ];
          const EXCEL_FIELDS = [
            "id",
            "productNo",
            "productName",
            "productType",
            "status",
          ];
          const EXCEL_DATA = this.formatJson(EXCEL_FIELDS, this.selectRows);
          // 导出
          excel.export_json_to_excel({
            header: EXCEL_HEADER, // 导出的表头，必填
            data: EXCEL_DATA, // 导出的数据，必填
            filename: "商品信息", // 导出文件名称，非必填
            autoWidth: true, // 但愿地自适应宽度，非必填
            bookType: "xlsx", // 导出文件类型，非必填
          });
          // 关闭loading
          setTimeout(() => {
            this.exportLoading = false;
          }, 300);
        })
        .catch((error) => {
          this.exportLoading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          // 商品分类
          if (j == "productType") {
            let productType = v[j];
            return productType == 0
              ? "新鲜果蔬"
              : productType == 1
              ? "饮料乳品"
              : productType == 2
              ? "肉禽水产"
              : productType == 3
              ? "米面粮油"
              : productType == 4
              ? "日用百货"
              : productType == 5
              ? "其他"
              : "";
          }
          // 商品状态
          if (j == "status") {
            let status = v[j];
            return status == 1 ? "已上架" : status == 0 ? "已下架" : "";
          }
          // 其他字段
          else {
            return v[j];
          }
        })
      );
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
  },
};
</script>

<style lang="less" scoped></style>
