import Layout from "@/layout";
import ParentView from "@/components/ParentView";

/**
 * 异步路由列表，模拟后台加载菜单后生成的路由数据
 */
export const asyncRoutes = [
  // 列表页面
  {
    path: "/table",
    component: Layout,
    redirect: "/table/basic-table",
    meta: {
      title: "列表页面",
      icon: "ivu-icon-md-list-box",
    },
    alwaysShow: true,
    children: [
      {
        path: "basic-table",
        name: "BasicTable",
        component: () => import("@/views/table/basic-table"),
        meta: {
          title: "基础列表",
        },
      },
      {
        path: "drag-table",
        name: "DragTable",
        component: () => import("@/views/table/drag-table"),
        meta: {
          title: "列表拖拽",
        },
      },
      {
        path: "inline-edit-table",
        name: "InlineEditTable",
        component: () => import("@/views/table/inline-edit-table"),
        meta: {
          title: "行内编辑",
        },
      },
    ],
  },

  // 表单页面
  {
    path: "/form",
    component: Layout,
    redirect: "/form/basic-form",
    meta: {
      title: "表单页面",
      icon: "ivu-icon-md-grid",
    },
    alwaysShow: true,
    children: [
      {
        path: "basic-form",
        name: "BasicForm",
        component: () => import("@/views/form/basic-form"),
        meta: {
          title: "基础表单",
        },
      },
      {
        path: "step-form",
        name: "StepForm",
        component: () => import("@/views/form/step-form"),
        meta: {
          title: "分步表单",
        },
      },
      {
        path: "detail-form",
        name: "DetailForm",
        component: () => import("@/views/form/detail-form"),
        meta: {
          title: "表单详情",
        },
      },
    ],
  },

  // 详情页面
  {
    path: "/detail",
    component: Layout,
    redirect: "/detail/basic-detail",
    meta: {
      title: "详情页面",
      icon: "ivu-icon-md-list-box",
    },
    alwaysShow: true,
    children: [
      {
        path: "basic-detail",
        name: "BasicDetail",
        component: () => import("@/views/detail/basic-detail"),
        meta: {
          title: "基础详情",
        },
      },
      {
        path: "high-detail",
        name: "HighDetail",
        component: () => import("@/views/detail/high-detail"),
        meta: {
          title: "高级详情",
        },
      },
    ],
  },

  // 结果页面
  {
    path: "/result",
    component: Layout,
    redirect: "/result/success",
    meta: {
      title: "结果页面",
      icon: "star",
    },
    alwaysShow: true,
    children: [
      {
        path: "success",
        name: "Success",
        component: () => import("@/views/result/success"),
        meta: {
          title: "成功结果",
        },
      },
      {
        path: "fail",
        name: "Fail",
        component: () => import("@/views/result/fail"),
        meta: {
          title: "失败结果",
        },
      },
    ],
  },

  // 错误页面
  {
    path: "/error",
    component: Layout,
    redirect: "/error/403",
    meta: {
      title: "错误页面",
      icon: "ivu-icon-md-warning",
    },
    alwaysShow: true,
    children: [
      {
        path: "403",
        name: "Error403",
        component: () => import("@/views/error/403"),
        meta: {
          title: "403页面",
        },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/error/404"),
        meta: {
          title: "404页面",
        },
      },
      {
        path: "500",
        name: "Error500",
        component: () => import("@/views/error/500"),
        meta: {
          title: "500页面",
        },
      },
    ],
  },

  // 多级菜单
  {
    path: "/netsted",
    component: Layout,
    redirect: "/netsted/menu1/menu1-1",
    meta: {
      title: "多级菜单",
      icon: "ivu-icon-md-menu",
    },
    alwaysShow: true,
    children: [
      {
        path: "menu1",
        name: "menu1",
        meta: {
          title: "菜单1",
        },
        // 多级菜单，需要设置parent的组件为ParentView才可以
        component: ParentView,
        children: [
          {
            path: "menu1-1",
            name: "menu1-1",
            meta: {
              title: "菜单1-1",
            },
            component: () => import("@/views/netsted/menu1/menu1-1"),
          },
          {
            path: "menu1-2",
            name: "menu1-2",
            meta: {
              title: "菜单1-2",
            },
            component: () => import("@/views/netsted/menu1/menu1-2"),
          },
        ],
      },
      {
        path: "menu2",
        name: "menu2",
        meta: {
          title: "菜单2",
        },
        component: () => import("@/views/netsted/menu2"),
      },
    ],
  },

  // 缓存页面
  {
    path: "/cache",
    component: Layout,
    redirect: "/cache/has-cache",
    meta: {
      title: "缓存页面",
      icon: "ivu-icon-md-albums",
    },
    alwaysShow: true,
    children: [
      {
        path: "has-cache",
        name: "HasCache",
        component: () => import("@/views/cache/has-cache"),
        meta: {
          title: "有缓存页面",
        },
      },
      {
        path: "no-cache",
        name: "NoCache",
        component: () => import("@/views/cache/no-cache"),
        meta: {
          title: "无缓存页面",
          noCache: true,
        },
      },
    ],
  },

  // 权限页面
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/index",
    meta: {
      title: "权限页面",
      icon: "ivu-icon-md-key",
    },
    alwaysShow: true,
    children: [
      {
        path: "index",
        name: "PermissionIndex",
        component: () => import("@/views/permission/index"),
        meta: {
          title: "权限",
        },
      },
    ],
  },

  // 组件页面
  {
    path: "/components-demo",
    component: Layout,
    redirect: "/components-demo/link",
    meta: {
      title: "组件页面",
      icon: "ivu-icon-md-apps",
    },
    alwaysShow: true,
    children: [
      {
        path: "link",
        name: "LinkDemo",
        component: () => import("@/views/components-demo/link"),
        meta: {
          title: "文字链接",
          subtitle: "Link",
        },
      },
      {
        path: "page-header",
        name: "PageHeaderDemo",
        component: () => import("@/views/components-demo/page-header"),
        meta: {
          title: "页头",
          subtitle: "PageHeader",
        },
      },
      {
        path: "title",
        name: "TitleDemo",
        component: () => import("@/views/components-demo/title"),
        meta: {
          title: "标题",
          subtitle: "Title",
        },
      },
      {
        path: "vue-scrollbar",
        name: "VueScrollbarDemo",
        component: () => import("@/views/components-demo/vue-scrollbar"),
        meta: {
          title: "滚动条",
          subtitle: "VueScrollbar",
        },
      },
      {
        path: "tinymce",
        name: "TinymceDemo",
        component: () => import("@/views/components-demo/tinymce"),
        meta: {
          title: "Tinymce编辑器",
          subtitle: "Tinymce",
        },
      },
      {
        path: "json-editor",
        name: "JsonEditorDemo",
        component: () => import("@/views/components-demo/json-editor"),
        meta: {
          title: "JSON编辑器",
          subtitle: "JsonEditor",
        },
      },
      {
        path: "svg-icon",
        name: "SvgIconDemo",
        component: () => import("@/views/components-demo/svg-icon"),
        meta: {
          title: "SvgIcon图标",
          subtitle: "SvgIcon",
        },
      },
      {
        path: "region-picker",
        name: "RegionPickerDemo",
        component: () => import("@/views/components-demo/region-picker"),
        meta: {
          title: "省市区级联选择",
          subtitle: "RegionPicker",
        },
      },
      {
        path: "clipboard",
        name: "ClipboardDemo",
        component: () => import("@/views/components-demo/clipboard"),
        meta: {
          title: "复制粘贴",
          subtitle: "Clipboard",
        },
      },
      {
        path: "count-to",
        name: "CountToDemo",
        component: () => import("@/views/components-demo/count-to"),
        meta: {
          title: "数字Count动画",
          subtitle: "CountTo",
        },
      },
      {
        path: "valid-slider",
        name: "ValidSliderDemo",
        component: () => import("@/views/components-demo/valid-slider"),
        meta: {
          title: "滑块验证码",
          subtitle: "ValidSlider",
        },
      },
      {
        path: "avatar-list",
        name: "AvatarListDemo",
        component: () => import("@/views/components-demo/avatar-list"),
        meta: {
          title: "头像组列表",
          subtitle: "AvatarList",
        },
      },
    ],
  },

  // 工具使用
  {
    path: "/tools",
    component: Layout,
    redirect: "/tools/export-excel",
    meta: {
      title: "工具使用",
      icon: "ivu-icon-md-hammer",
    },
    alwaysShow: true,
    children: [
      {
        path: "export-excel",
        name: "ExportExcel",
        component: () => import("@/views/tools/export-excel"),
        meta: {
          title: "导出Excel",
        },
      },
      {
        path: "export-zip",
        name: "ExportZip",
        component: () => import("@/views/tools/export-zip"),
        meta: {
          title: "导出Zip",
        },
      },
      {
        path: "guide",
        name: "Guide",
        component: () => import("@/views/tools/guide"),
        meta: {
          title: "操作指引",
        },
      },
    ],
  },

  // 跳转外部链接
  {
    path: "https://cn.bing.com",
    name: "linkBiying",
    meta: { title: "当前窗口打开", icon: "ivu-icon-md-share" },
  },
  {
    path: "https://www.baidu.com",
    name: "linkBaidu",
    meta: { title: "打开新窗口", icon: "ivu-icon-md-link", target: "_blank" },
  },
];
