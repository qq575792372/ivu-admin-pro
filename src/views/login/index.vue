<template>
  <div class="login-container">
    <!-- 登录背景 -->
    <div class="login-bg" :style="{ filter: `blur(${loginBgBlur}px)` }"></div>
    <!-- 登录窗口 -->
    <div class="login-main">
      <!-- 标题 -->
      <div class="login-title">后台管理登录</div>
      <Form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-align="left"
      >
        <!-- 用户名 -->
        <FormItem prop="username">
          <Input
            v-model="loginForm.username"
            placeholder="输入用户名"
            type="text"
            size="large"
            tabindex="1"
            autocomplete
          >
            <Icon slot="prefix" type="md-contact" />
          </Input>
        </FormItem>
        <!-- 密码 -->
        <FormItem prop="password">
          <Input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="输入密码"
            size="large"
            tabindex="2"
            password
          >
            <SvgIcon slot="prefix" type="password" />
          </Input>
        </FormItem>
        <!-- 验证码 -->
        <FormItem ref="validcode" prop="validcode" :auto-link="false">
          <div class="valid-box">
            <Input
              v-model="loginForm.validcode"
              placeholder="输入验证码"
              size="large"
              type="text"
              class="valid-input"
              tabindex="3"
            >
              <SvgIcon slot="prefix" type="valid-code" />
            </Input>
            <img
              class="valid-img"
              :src="validImageUrl"
              @click="handleChangeValidImageUrl"
            />
          </div>
        </FormItem>
        <!-- 记住登录和忘记密码 -->
        <div class="login-operate">
          <Checkbox v-model="isRemberLogin">记住登录</Checkbox>
          <i-link :underline="false" type="primary">忘记密码?</i-link>
        </div>
        <!-- 登录 -->
        <Button
          :loading="loginLoading"
          type="primary"
          tabindex="4"
          size="large"
          style="
            width: 100%;
            margin-bottom: 15px;
            font-size: 14px;
            margin-top: 10px;
            border-radius: 6px;
          "
          @click.native.prevent="handleLogin"
        >
          {{ loginLoading ? "登录中.." : "登录" }}
        </Button>
      </Form>
      <!-- 其他登录方式和注册账号 -->
      <div class="login-operate padding-left-20 padding-right-20">
        <div>
          其他登录方式：
          <img src="../../assets/login/wechat.png" />
          <img src="../../assets/login/qq.png" />
          <img src="../../assets/login/weibo.png" />
          <img src="../../assets/login/alipay.png" />
        </div>
        <i-link :underline="false" type="primary">注册账号</i-link>
      </div>
      <!-- 底部提示 -->
      <div class="login-tips clearfix">
        <span style="float: right">账号，密码，验证码随意输入</span>
      </div>
    </div>
    <!-- 登录底部 -->
    <div class="login-footer">
      Copyright © 2021 ivu-admin-pro All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { loginBgBlur } from "@/settings";
export default {
  name: "Login",
  data() {
    return {
      // 登录表单
      loginForm: {
        username: "",
        password: "",
        validcode: "",
      },
      // 登录表单验证规则
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入用户名"));
              } else {
                callback();
              }
            },
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入密码"));
              } else {
                callback();
              }
            },
          },
        ],
        validcode: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入验证码"));
              } else {
                callback();
              }
            },
          },
        ],
      },

      // 记住登录
      isRemberLogin: false,

      // 验证码图片地址
      validImageUrl:
        "http://captcha.qq.com/getimage?aid=2000201&uin=0&0.9914836314873827",

      // 登录loading
      loginLoading: false,

      // 切换显示隐藏密码
      passwordType: "password",

      // 跳转登录来源
      redirect: null,
    };
  },
  computed: {
    // 背景图片高斯模糊像素，通过settings配置中获取，值0-100，默认20
    loginBgBlur() {
      return loginBgBlur;
    },
  },
  watch: {
    // 监听首页路由地址来源，登录后跳转到该地址
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    window.addEventListener("keydown", this.onKeyDown);
  },
  destroyed() {
    // 离开页面，清空回车事件
    window.removeEventListener("keydown", this.onKeyDown, false);
  },
  methods: {
    /**
     * 点击回车登录
     */
    onKeyDown(e) {
      if (e.keyCode == 13) {
        this.handleLogin();
      }
    },
    /**
     * 切换密码显示
     */
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    /**
     * 点击登录
     */
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              setTimeout(() => {
                this.loginLoading = false;
              }, 300);
              if (res.code == 0) {
                this.$router.push({ path: this.redirect || "/" });
              } else {
                this.$message({
                  message: res.message,
                  type: "error",
                });
              }
            })
            .catch(() => {
              this.loginLoading = false;
            });
        } else {
          this.loginLoading = false;
          return false;
        }
      });
    },
    /**
     * 点击更改验证码图片
     */
    handleChangeValidImageUrl() {
      this.validImageUrl =
        "http://captcha.qq.com/getimage?aid=2000201&uin=0&0.9914836314873827&t=" +
        new Date().getTime();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  // 背景图片，加入高斯模糊
  .login-bg {
    position: absolute;
    background: url("../../assets/login/login_bg_1.jpg") no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transform: scale(1.06); // 放大图片，可以解决模糊后四周有白边的问题
  }

  // 登录主窗口
  .login-main {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: auto;
    left: 0;
    right: 0;
    width: 460px;
    min-height: 420px;
    z-index: 1000;
    margin: auto;
    margin-top: 10%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    // 登录标题
    .login-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      color: #303133;
      height: 64px;
      line-height: 64px;
      border-bottom: solid 1px #e8eaec;
    }

    // 登录表单
    .login-form {
      padding: 25px 20px 0px 20px;
      // 定义form表单中svg的样式
      .svg-icon {
        position: absolute;
        top: 0;
        left: 8px;
        bottom: 0;
        color: #808695;
        margin: auto;
      }

      // 验证码样式
      .valid-box {
        display: flex;
        .valid-input {
          flex: 1;
          margin-right: 10px;
        }

        .valid-img {
          width: 140px;
          height: 40px;
          cursor: pointer;
        }
      }
    }

    // 去注册和忘记密码
    .login-operate {
      display: flex;
      justify-content: space-between;
      img {
        width: 24px;
        margin-right: 16px;
        cursor: pointer;
        vertical-align: middle;
        opacity: 0.7;
        transition: all 0.2s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }

    // 登录小提示
    .login-tips {
      font-size: 12px;
      color: #909399;
      padding: 20px;
    }
  }

  // 底部工商备案信息
  .login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
    z-index: 10;
  }
}

// 是手机设备
@media screen and (max-width: 640px) {
  .login-container {
    .login-main {
      margin-top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
}
</style>
<style lang="less">
// view design登录表单样式调整
.login-form {
  .ivu-input-large {
    font-size: 14px;
  }
  .ivu-form-item-error-tip {
    font-size: 12px;
  }
  .ant-input-prefix {
    color: #808695;
  }
}
</style>
