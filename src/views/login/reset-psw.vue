<template>
  <div class="reset-psw-page">
    <div class="line">
      <div class="tit">手机号</div>
      <div class="input-container">
        <input placeholder="请输入" ref="inputF" type="tel" maxlength="11" v-model.trim="phone" />
      </div>
    </div>
    <div class="line">
      <div class="tit">验证码</div>
      <div class="input-container">
        <input placeholder="请输入" type="tel" maxlength="6" v-model.trim="captcha" />
        <div class="getCaptcha" @click="_getCaptcha" :class="{ disable: timer }">{{ showTime }}</div>
      </div>
    </div>
    <div class="line">
      <div class="tit">新密码</div>
      <div class="input-container">
        <input v-model.trim="password" placeholder="请输入" :type="inputType" />
        <div class="show-pw-btn" @click="toggleShowPsw" :class="{ show: showPswType }"></div>
      </div>
    </div>
    <div class="footer-btn" @click="updatePassword">更改密码</div>
  </div>
</template>

<script>
import { checkPassword, checkPhone } from "../../utils/lang";
import { restPassword } from "../../api/login";
import { getCaptcha } from "../../api/common";
export default {
  name: "reset-psw",
  data() {
    return {
      // 手机号
      phone: "",
      //   验证码
      captcha: "",
      // 密码
      password: "",
      showPswType: false,
      time: 10,
      timer: null
    };
  },
  mounted() {
    this.$bridge.call("setNav", {
      hidden: 0,
      // 非全面屏显示
      immersionStatusBar: 2
    });
    this.initFocus();
  },
  activated() {
    this.$bridge.call("setNav", {
      hidden: 0,
      // 非全面屏显示
      immersionStatusBar: 2
    });
    // input键盘聚焦
    this.initFocus();
  },
  computed: {
    inputType() {
      return this.showPswType ? "text" : "password";
    },
    showTime() {
      if (this.timer) {
        return `重新获取(${this.time})`;
      }
      return "获取验证码";
    }
  },
  methods: {
    initFocus() {
      this.$nextTick(() => {
        this.$refs.inputF.focus();
      });
    },
    // 是否展示密码
    toggleShowPsw() {
      this.showPswType = !this.showPswType;
    },
    async _getCaptcha() {
      if (!this.timer) {
        if (!checkPhone(this.phone)) {
          this.$Toast({
            message: "请输入正确格式手机号",
            duration: 1500
          });
          return;
          // 成功获取验证码开始倒计时
        }
        this.$Indicator.open("加载中...");
        let res = await getCaptcha(this.phone, 2);
        if (res.error_code === 0) {
          // 开始倒计时
          this.startTimer();
          this.$Toast({
            message: "获取验证码成功",
            duration: 1500
          });
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
        this.$Indicator.close();
      }
    },
    // 获取验证码成功后倒计时
    startTimer() {
      this.time = 60;
      this.timer = setInterval(() => {
        --this.time;
        if (this.time <= 0) {
          this.time = "";
          window.clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    // 更改密码
    async updatePassword() {
      // 验证手机号
      if (!checkPhone(this.phone)) {
        this.$Toast({
          message: "请输入正确格式手机号",
          duration: 1500
        });
        return;
      }
      //  检查验证码
      if (this.captcha.length !== 4) {
        this.$Toast({
          message: "请输入4位验证码",
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
      // 检验密码格式
      //  6 - 16位数字，大小写英文和基础英文符号
      if (!checkPassword(this.password)) {
        this.$Toast({
          message: "《密码格式错误，请重试》",
          duration: 1500
        });
      }

      // 开始修改密码
      try {
        this.$Indicator.open("提交中...");
        let res = await restPassword(this.phone, this.password, this.captcha);
        console.log(res);
        if (res.error_code === 0) {
          this.$Toast({
            message: "更改密码成功",
            duration: 1500
          });
          this.$router.replace("/login");
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
    }
  }
};
</script>

<style lang="less" scoped>
.reset-psw-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 50px;
  .line {
    position: relative;
    margin-bottom: 90px;
    .tit {
      margin-bottom: 30px;
      font-size: 42px;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      line-height: 36px;
    }
    .input-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 174px;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      padding: 0 58px;
      input {
        flex: 1;
        font-size: 48px;
        font-weight: 400;
        background: transparent;
        &::placeholder {
          font-family: PingFang SC;
          color: rgba(214, 217, 224, 1);
        }
      }
      .getCaptcha {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(114, 101, 227, 1);
        white-space: nowrap;
        &.disable {
          filter: grayscale(100%);
        }
      }
    }
  }
  .show-pw-btn {
    width: 95px;
    height: 68px;
    background: url("../../assets/img/login/show_psw.png") no-repeat center /
      100%;
    background-origin: content-box;
    padding: 20px;
    &.show {
      width: 97px;
      height: 82px;
      background: url("../../assets/img/login/hide_psw.png") no-repeat
        center/100%;
      background-origin: content-box;
    }
  }
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 120px;
    width: 993px;
    height: 132px;
    background: linear-gradient(
      122deg,
      rgba(139, 99, 230, 1) 0%,
      rgba(114, 101, 227, 1) 100%
    );
    border-radius: 66px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
