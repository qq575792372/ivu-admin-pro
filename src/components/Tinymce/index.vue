<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <!-- 注释掉element admin官方自定义的上传按钮组件 -->
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>-->
  </div>
</template>

<script>
import editorImage from "./components/EditorImage";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
import request from "@/utils/request";

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

export default {
  name: "Tinymce",
  // components: { editorImage }, // 注释掉element admin框架自定义的右上角的上传按钮
  props: {
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: "modern",
        };
      },
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    accept: {
      default: "image/jpeg, image/png ,image/jpg ,image/bmp ,image/gif",
      type: String,
    },

    url: {
      default: "",
      type: String,
    },

    maxSize: {
      default: 2097152,
      type: Number,
    },
    withCredentials: {
      default: false,
      type: Boolean,
    },

    menubar: {
      type: String,
      default: "file edit insert view format table tools",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 430,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto",
    },
  },
  data() {
    return {
      Value: "",
      Url: "",

      // 上传文件路径，图片和视频路径修改这个参数
      uploadFileUrl: "/hltrip_shop/file/saveFile",

      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        zh: "zh_CN",
        en: "en",
        es: "es_MX",
        ja: "ja",
      },
      api: {
        uploadImage: "/api/imageUpload",
      },
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      //  const _this = this
      const _this = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList["zh"],
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        readonly: false, // 是否只读
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        // CONFIG: Paste  粘贴
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        file_picker_types: "media", // 文件选择类型是视频
        media_live_embeds: true,

        // 路径转换，回传路径是域名开头
        relative_urls: false,
        remove_script_host: false,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

        insert_button_items: "image link | inserttable",

        // CONFIG: StyleSelect
        style_formats: [
          {
            title: "首行缩进",
            block: "p",
            styles: { "text-indent": "2em" },
          },
          {
            title: "行高",
            items: [
              { title: "1", styles: { "line-height": "1" }, inline: "span" },
              {
                title: "1.5",
                styles: { "line-height": "1.5" },
                inline: "span",
              },
              { title: "2", styles: { "line-height": "2" }, inline: "span" },
              {
                title: "2.5",
                styles: { "line-height": "2.5" },
                inline: "span",
              },
              { title: "3", styles: { "line-height": "3" }, inline: "span" },
            ],
          },
        ],
        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ":prev,:next",
        object_resizing: true,
        // Image
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions",

        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          // 自定义功能
          editor.on("FullscreenStateChanged", (e) => {
            _this.fullscreen = e.state;
          });
        },

        // 上传视频操作
        file_picker_callback: (cb, value, meta) => {
          console.log(cb, value, meta);
          let self = this;
          if (meta.filetype == "media") {
            // 模拟文件点击上传
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.click();
            input.onchange = function () {
              // 选择了文件后调用上传接口
              let file = this.files[0];
              let formData = new FormData();
              formData.append("path", "medias");
              formData.append("file", file);
              request({
                url: self.uploadFileUrl,
                method: "post",
                data: formData,
              }).then((res) => {
                if (res.code == "0000") {
                  let url = res.data;
                  console.log(url);
                  cb(url, { title: file.name });
                }
              });
            };
          }
        },

        // 上传图片操作
        images_upload_handler: (blobInfo, success, failure, progress) => {
          progress(0);
          let formData = new FormData();
          formData.append("path", "imgs");
          formData.append("file", blobInfo.blob());
          request({
            url: this.uploadFileUrl,
            method: "post",
            data: formData,
          }).then((res) => {
            if (res.code == "0000") {
              let url = res.data;
              success(url);
              console.log(url);
              progress(100);
            }
          });
        },

        // prop内传入的的config
        ...this.config,
        content_style: "img {max-width:100% !important; height:auto; }", // 初始化赋值  这个主要是防止图片拉升变形的 （上传的图片再app显示会变形要加上这个）

        setup: (editor) => {
          // 抛出 'on-ready' 事件钩子
          editor.on("init", () => {
            _this.loading = false;
            _this.$emit("on-ready");
            editor.setContent(_this.value);
          });
          // 抛出 'input' 事件钩子，同步value数据
          editor.on("input change undo redo", () => {
            _this.$emit("input", editor.getContent());
          });
        },
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    clearContent() {
      window.tinymce.get(this.tinymceId).setContent("");
    },
    imageSuccessCBK(arr) {
      const _this = this;
      arr.forEach((v) => {
        window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    },
  },
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
