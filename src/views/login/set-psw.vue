<template>
  <register-template>
    <div class="line">
      <input ref="input" :type="inputType" v-model.trim="password" />
      <div class="show-pw-btn" @click="toggleShowPsw" :class="{ show: showPswType }"></div>
    </div>
    <agree-agreement ref="agreement"></agree-agreement>
    <div class="footer-btn" @click="_register">登录</div>
  </register-template>
</template>

<script>
import RegisterTemplate from "../../components/login/register-template";
import AgreeAgreement from "../../components/login/agree-agreement";
import { checkPassword } from "../../utils/lang";
import { mapState, mapMutations } from "vuex";
import { register, wechatRegister } from "../../api/login";
export default {
  name: "set-psw",
  data() {
    return {
      showPswType: false,
      password: ""
    };
  },
  components: {
    RegisterTemplate,
    AgreeAgreement
  },
  computed: {
    inputType() {
      return this.showPswType ? "text" : "password";
    },
    ...mapState("login", ["registPhone", "registCaptcha"]),
    ...mapState(["deviceInfo", "openid"])
  },
  activated() {
    this.type = this.$route.query.type;
    if (this.type === "wechat") {
      document.title = "输入密码";
    }
    this.$nextTick(() => {
      this.initFocus();
    });
  },
  methods: {
    initFocus() {
      this.$refs.input.focus();
    },
    // 是否展示密码
    toggleShowPsw() {
      this.showPswType = !this.showPswType;
    },

    // 登录
    async _register() {
      if (!this.$refs.agreement.agreeType) {
        this.$Toast({
          message: "请同意《服务条款》和《用户隐私协议》",
          duration: 1500
        });
        return;
      }
      // 检验密码格式
      //  6 - 16位数字，大小写英文和基础英文符号
      if (!this.password) {
        this.$Toast({
          message: "请输入密码",
          duration: 1500
        });
        return;
      }
      if (!checkPassword(this.password)) {
        this.$Toast({
          message: "《密码格式错误，请重试》",
          duration: 1500
        });
        return;
      }
      this.setRegistPassword(this.password);

      if (this.type === "wechat") {
        // 微信绑定
        this.$Indicator.open("加载中...");

        let wechatRes = await wechatRegister(
          this.registPhone,
          this.password,
          this.registCaptcha,
          this.openid,
          this.deviceInfo === "ios" ? 2 : 1
        );
        if (wechatRes.error_code === 0) {
          this.$Toast({
            message: "微信注册成功",
            duration: 1500
          });
          // 向客户端注入token
          this.$bridge.call("setToken", {
            token: wechatRes.data.token
          });
          // type 为0时需跳转用户完善信息，不为0时，则进入：会员中心
          setTimeout(() => {
            if (parseInt(wechatRes.data.type) === 0) {
              this.$router.replace("/information");
            } else {
              // this.$router.replace("/user");
              this.$bridge.call("router_app", {
                type: "app_home"
              });
            }
          }, 1800);
        } else {
          this.$Toast({
            message: wechatRes.error_msg,
            duration: 1500
          });
        }
        this.$Indicator.close();
        return false;
      }
      // 注册
      this.$Indicator.open("加载中...");
      let res = await register(
        this.registPhone,
        this.password,
        this.registCaptcha,
        this.deviceInfo === "ios" ? 2 : 1
      );
      if (res.error_code === 0) {
        this.$Toast({
          message: "注册成功",
          duration: 1500
        });
        // 为0时需跳转用户完善信息，不为0时，则进入：会员中心
        if (parseInt(res.type) === 0) {
          this.$router.replace("/information");
        } else {
          this.$router.replace("/login");
        }
      } else {
        this.$Toast({
          message: res.error_msg,
          duration: 1500
        });
      }
      this.$Indicator.close();
    },
    ...mapMutations("login", ["setRegistPassword"])
  }
};
</script>
<style lang="less" scoped>
.line {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 996px;
  height: 174px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 30px 60px 0px rgba(64, 117, 205, 0.08);
  border-radius: 45px;
  margin-bottom: 76px;
  text-align: center;
  padding: 0 140px 0 100px;

  input {
    flex: 1;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    text-align: center;
    // letter-spacing: 10px;
  }
  .show-pw-btn {
    position: absolute;
    top: 50%;
    right: 40px;
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
</style>
