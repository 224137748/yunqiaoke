<template>
  <div class="login-page">
    <div class="top-corner">
      <div class="text">登录</div>
    </div>
    <div class="form-container">
      <h2 class="tit">登录</h2>
      <div class="line">
        <label for="phone" class="label-phone">电话</label>
        <input
          autocomplete="off"
          placeholder
          type="tel"
          id="phone"
          maxlength="11"
          v-model.trim="phoneNum"
        />
        <!-- 此input 没有使用，意在修复在ios键盘输入要闪动问题 -->
        <input class="specil" style="position: absolute;width:0;height:0; opacity:0;" />
      </div>
      <div class="line">
        <label for="password" class="label-psw">密码</label>
        <input
          autocomplete="off"
          :type="inputType"
          id="password"
          v-model.trim="password"
          maxlength="16"
          minlength="6"
        />
        <div class="show-pw-btn" @click="toggleShowPsw" :class="{ show: showPwType }"></div>
      </div>
      <div class="forget-line">
        <span class="register-psw" @click="goRegister">账户注册</span>
        <span class="forget-psw" @click="goResetPsw">忘记密码？</span>
      </div>
      <div class="signIn btn" @click="login">登录</div>
      <div class="wx-singin btn" v-show="showFlag" @click="callWeixin">
        <span class="wx"></span>微信登录
      </div>
    </div>
  </div>
</template>
<script>
import lang from "../../utils/lang.js";
import { login, checkLoginEnv } from "../../api/login";
import { mapMutations, mapState } from "vuex";
export default {
  name: "login-page",
  data() {
    return {
      phoneNum: "",
      password: "",
      showPwType: false,
      showFlag: false
    };
  },
  computed: {
    inputType() {
      return this.showPwType ? "text" : "password";
    },
    ...mapState(["deviceInfo"])
  },
  async created() {
    this._checkLoginEnv();
  },
  activated() {
    this.$bridge.call("setNav", {
      hidden: 1,
      // 全面屏显示
      immersionStatusBar: 1
    });
  },
  methods: {
    // 判断是否展示微信登录
    // 安卓直接展示，ios 要判断客户端版本号
    async _checkLoginEnv() {
      if (this.deviceInfo === "android") {
        this.showFlag = true;
        return;
      }
      this.$bridge.call("getVersion").then(vData => {
        this.version = vData.version || "";
      });
      try {
        let res = await checkLoginEnv(6);
        if (res.error_code === 0) {
          if (res.data) {
            let dataArr = res.data.data;
            if (Array.isArray(dataArr) && dataArr.length) {
              let wxData = dataArr.find(item => {
                return parseInt(item.id) === 6;
              });
              //  APP版本跟常量数值一致时候，则隐藏
              if (this.version !== parseInt(wxData.code)) {
                this.showFlag = true;
              }
            }
          }
        }
      } catch (err) {
        console.log("err", err);
      }
    },
    // 切换密码显示
    toggleShowPsw() {
      this.showPwType = !this.showPwType;
    },
    // 登录
    async login() {
      if (!this.phoneNum) {
        this.$Toast({
          message: "请输入手机号码",
          duration: 1500
        });
        return;
      }
      if (!this.password) {
        this.$Toast({
          message: "请输入密码",
          duration: 1500
        });
        return;
      }
      if (
        !lang.checkPhone(this.phoneNum) ||
        !lang.checkPassword(this.password)
      ) {
        this.$Toast({
          message: "《手机号或密码格式错误，请重试》",
          duration: 1500
        });
        return;
      }
      this.$Indicator.open("加载中...");
      try {
        let res = await login(this.phoneNum, this.password);
        if (res.error_code === 0) {
          this.$Toast({
            message: "登录成功",
            duration: 1000
          });
          // 存储全局 Vuex
          this.setToken(res.data.token || "");
          this.setMobile(res.data.mobile || "");
          // 向客户端注入token
          this.$bridge.call("setToken", {
            token: res.data.token
          });
          // type 为0时需跳转用户完善信息，不为0时，则进入：会员中心
          setTimeout(() => {
            if (parseInt(res.data.type) === 0) {
              this.$router.push("/information");
            } else {
              this.$bridge.call("router_app", {
                type: "app_home"
              });
            }
          }, 800);
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
      this.$Indicator.close();
    },
    // 账户注册
    goRegister() {
      this.$router.push("/register-phone");
    },
    // 忘记密码
    goResetPsw() {
      this.$router.push("/reset-psw");
    },
    // 微信登录
    callWeixin() {
      this.$router.replace("/wxlogin");
    },
    ...mapMutations({ setToken: "SET_TOKEN", setMobile: "SET_MOBILE" })
  }
};
</script>
<style lang="less" scoped>
.login-page {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/login/login_bg.png") no-repeat center top /
    cover;
  .top-corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 680px;
    height: 412px;
    background: url("../../assets/img/login/top-corner.png") no-repeat left top/
      100% 100%;
    .text {
      position: absolute;
      top: 206px;
      right: 175px;
      color: #fff;
      font-size: 54px;
    }
  }
  .form-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1905px;
    padding-left: 70px;
    background: url("../../assets/img/login/form_bg.png") no-repeat left bottom/
      100%;
    overflow: hidden;
    .tit {
      font-size: 84px;
      font-family: PingFang SC;
      font-weight: 600;
      margin: 422px auto 260px;
      color: rgba(34, 36, 42, 1);
    }
    .line {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 885px;
      height: 150px;
      border-bottom: 3px solid rgba(205, 205, 215, 0.42);
      margin-bottom: 54px;
      [class*="label"] {
        display: flex;
        align-items: center;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(166, 166, 179, 1);
        line-height: 66px;
        margin-right: 52px;
        white-space: nowrap;
        &::before {
          content: "";
          display: inline-block;
          margin-right: 52px;
        }
      }
      .label-phone {
        &::before {
          width: 48px;
          height: 64px;
          background: url("../../assets/img/login/label-phone.png") no-repeat
            center/ 100%;
        }
      }
      .label-psw {
        &::before {
          width: 50px;
          height: 54px;
          background: url("../../assets/img/login/label-psw.png") no-repeat
            center/ 100%;
        }
      }
      input {
        flex: 1;
        font-size: 48px;
        font-weight: 400;
        color: #000;
        line-height: 66px;
        margin-top: 2px;
        background: transparent;
        &[type="password"] {
          letter-spacing: 10px;
        }
      }
      .show-pw-btn {
        position: absolute;
        top: 50%;
        right: -20px;
        width: 95px;
        height: 68px;
        background: url("../../assets/img/login/show_psw.png") no-repeat center /
          100%;
        background-origin: content-box;
        transform: translate3d(0, -50%, 0);
        padding: 20px;
        &.show {
          width: 97px;
          height: 82px;
          background: url("../../assets/img/login/hide_psw.png") no-repeat
            center/100%;
          background-origin: content-box;
        }
      }
    }
    .forget-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 885px;
      text-align: right;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(166, 166, 179, 1);
      margin-bottom: 256px;
    }
    [class*="btn"] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 492px;
      height: 132px;
      border-radius: 66px;
    }
    .signIn {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 66px;
      background: url("../../assets/img/login/login_btn_bg.png") no-repeat
        center/100%;
      margin-bottom: 48px;
    }
    .wx-singin {
      background: #fff;
      .wx {
        display: inline-block;
        width: 55px;
        height: 46px;
        background: url("../../assets/img/login/wx_icon.png") no-repeat center/
          100%;
        margin-right: 20px;
      }
    }
  }
}
</style>
