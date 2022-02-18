<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="导出Zip"
      content="使用jszip，file-saver依赖包导出zip文件"
    />

    <!-- main -->
    <div class="main-container">
      <div class="demo-block">
        <div class="demo-title">基本用法</div>
        <div class="demo-desc">
          导出带目录的txt压缩文件，该示例只最简单的压缩txt文件，更复杂的用法需要到
          jszip 官网。
        </div>
        <div class="demo-use">
          <Button type="primary" @click="handleExport">导出ZIP</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { saveAs } from "file-saver";
import JSZip from "jszip";

export default {
  methods: {
    handleExport() {
      const zip = new JSZip();
      // 声明第一个txt文件
      zip.file("hello.txt", "hello world");
      // 先创建目录，再声明txt文件
      zip.folder("test").file("test.txt", "这是test目录下的文本");
      // 生成压缩文件并弹出下载
      zip
        .generateAsync({ type: "blob" })
        .then((blob) => {
          saveAs(blob, "hello.zip");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
  }
}
</style>
