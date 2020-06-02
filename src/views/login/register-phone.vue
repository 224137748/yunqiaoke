<template>
  <register-template>
    <div class="line">
      <div class="prefix">+86</div>
      <input autocomplete="off" ref="input" type="tel" maxlength="11" v-model.trim="phone" />
    </div>
    <div class="note">根据相关政策法规，当下操作需绑定手机号码</div>
    <div :class="{ disable: timer }" class="footer-btn" @click="getCaptcha">
      获取验证码
      <span v-show="timer">{{ showTime }}</span>
    </div>
  </register-template>
</template>

<script>
import RegisterTemplate from "../../components/login/register-template";
import { checkPhone } from "../../utils/lang";
import { checkMobile } from "../../api/login";
import { mapMutations } from "vuex";
import { getCaptcha } from "../../api/common";
export default {
  name: "register-phone",
  data() {
    return {
      phone: "",
      time: 10,
      timer: null,
      // 这个页面 注册 修改手机号码共用，此参数用于区分
      type: ""
    };
  },
  components: {
    RegisterTemplate
  },
  computed: {
    showTime() {
      if (this.timer) {
        return `(${this.time})`;
      }
      return "";
    }
  },
  mounted() {
    this.initFocus();
  },
  activated() {
    this.$bridge.call("setNav", {
      hidden: 0,
      // 非全面屏显示
      immersionStatusBar: 2
    });
    this.type = this.$route.query.type || "";
    if (this.type === "reset") {
      document.title = "修改手机号";
    }
    if (this.type === "wechat") {
      document.title = "绑定手机号";
    }
    // input键盘聚焦
    this.initFocus();
  },
  methods: {
    initFocus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    async getCaptcha() {
      if (!this.timer) {
        // 前端 检查电话号码
        if (!checkPhone(this.phone)) {
          this.$Toast({
            message: "请输入正确格式手机号",
            duration: 1500
          });
          return;
        }
        console.log("获取验证码");
        // 成功获取验证码开始倒计时
        this.$Indicator.open({
          text: "提交中..."
        });
        // ps只有注册 微信时才检查 后端 检查电话号码
        if (!this.type || this.type !== "wechat") {
          let res = await checkMobile(this.phone);
          // 检查不通过 code 不为 0 则不通过
          if (res.error_code !== 0) {
            this.$Indicator.close();
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
            return;
          }
        }
        // 获取验证码 type -- 类型,1注册,2改密,3换绑
        let type = 1;
        // 绑定 更换手机号
        if (this.type === "reset") {
          type = 3;
        }
        let captchaRes = await getCaptcha(this.phone, type);
        if (captchaRes.error_code === 0) {
          // 开始倒计时
          this.startTimer();
          // 存储到login仓库
          this.setRegistPhone(this.phone);
          this.$Toast({
            message: "获取验证码成功",
            duration: 1500
          });
          this.$router.push({
            path: "/register-captcha",
            query: {
              type: this.type
            }
          });
        } else {
          this.$Toast({ message: captchaRes.error_msg, duration: 1500 });
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
    ...mapMutations("login", {
      // 保存用户注册手机号
      setRegistPhone: "setRegistPhone"
    })
  }
};
</script>

<style lang="less" scoped>
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 996px;
  height: 174px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 30px 60px 0px rgba(64, 117, 205, 0.08);
  border-radius: 45px;
  margin-bottom: 76px;
  .prefix {
    width: 226px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    text-align: center;
    border-right: 3px solid rgba(235, 235, 235, 1);
  }
  input {
    flex: 1;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    padding-left: 62px;
  }
}
.note {
  font-size: 36px;
  font-weight: 400;
  color: rgba(254, 156, 94, 1);
}
/deep/ .footer-btn.disable {
  filter: grayscale(100%);
}
</style>
