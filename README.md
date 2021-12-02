## 开始

```bash
# 克隆项目
git clone https://gitee.com/qq575792372/ivu-admin-pro.git

# 进入项目目录
cd ivu-admin-pro

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 你也可以预先设置全局的npm淘宝镜像
npm config set registry https://registry.npm.taobao.org
# 切换回默认全局镜像
npm config set registry https://registry.npmjs.org

# 启动服务
npm run dev

# 或者npm start命令快捷启动
npm start

# 也可以自定义端口启动
npm run dev --port=8000

# 支持stage环境启动
npm run stage
```

服务启动成功后，浏览器访问 [http://localhost:9000](http://localhost:9000)

## 环境

```bash
# 修改接口连接地址
在 .env.[development/staging/production] 中修改 VUE_APP_BASE_API='http://接口地址'

# 运行环境
在使用npm run dev 和 build dev/stage/prod 会根据.env.XXX.js里的配置来连接不同环境的接口地址
```

环境配置可以参考 Vue CLI 官网的 [模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)，使用 **.env[model]** 文件来指定环境变量

## 发布

```bash
# 构建开发环境
npm run build:dev

# 构建预发布环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 演示效果

支持 PC、平板和手机端

<table>
    <tr>
        <td colspan="2"><img alt="登录" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/login.png"/></td>
    </tr>
    <tr>
        <td><img alt="功能1" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/1.png"/></td>
        <td><img alt="功能2" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/2.png"/></td>
    </tr>
    <tr>
        <td><img alt="功能3" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/3.png"/></td>
        <td><img alt="功能4" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/4.png"/></td>
    </tr>
     <tr>
        <td><img alt="功能5" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/5.png"/></td>
        <td><img alt="功能6" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/6.png"/></td>
    </tr>
     <tr>
        <td><img alt="功能7" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/7.png"/></td>
        <td><img alt="功能8" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/8.png"/></td>
    </tr>
     <tr>
        <td><img alt="功能9" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/9.png"/></td>
        <td><img alt="功能10" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/10.png"/></td>
    </tr>
     <tr>
        <td><img alt="手机端1" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/mobile-1.png"/></td>
        <td><img alt="手机端2" src="https://gitee.com/qq575792372/images/raw/master/ivu-admin-pro/mobile-2.png"/></td>
    </tr>
</table>

> #### 未来开放功能
>
> - 用户，角色和权限管理模块
> - 框架中权限控制，预计提供权限指令和鉴权方法
> - 框架中细节优化，以及设备兼容性优化
> - 其他更多的慢慢思考...

> #### 重要说明
>
> - ivu-admin-pro 开源框架是个人业余兴趣开发之作，如有第三者作为商用等其他用途，本人概不承担任何责任。
> - 框架中的一些 UI 效果和配置参数借鉴[iview-admin-pro（需付费授权）](https://pro.iviewui.com/admin-pro/introduce)和[vue-element-admin（开源免费）](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)，如感兴趣的可以跳转到对应的官方文档。
