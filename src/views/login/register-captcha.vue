<template>
  <register-template>
    <div class="line">
      <input
        class="captcha-input"
        type="tel"
        data-index="0"
        v-model.trim="captcha[0]"
        @input="handleInput($event)"
        maxlength="2"
      />
      <input
        class="captcha-input"
        type="tel"
        data-index="1"
        @input="handleInput($event)"
        v-model.trim="captcha[1]"
        maxlength="2"
      />
      <input
        class="captcha-input"
        type="tel"
        data-index="2"
        v-model.trim="captcha[2]"
        @input="handleInput($event)"
        maxlength="2"
      />
      <input
        class="captcha-input"
        type="tel"
        data-index="3"
        v-model.trim="captcha[3]"
        @input="handleInput($event)"
        maxlength="2"
      />
    </div>
    <div class="footer-btn" @click="submitCaptcha">继续</div>
  </register-template>
</template>

<script>
import RegisterTemplate from "../../components/login/register-template";
import { mapMutations, mapState } from "vuex";
import { updateMobile } from "@/api/user";
export default {
  name: "register-captcha",
  data() {
    return {
      captcha: ["", "", "", ""],

      // 这个页面 注册 修改手机号码共用，此参数用于区分
      type: ""
    };
  },
  components: {
    RegisterTemplate
  },
  computed: {
    // 排除空格和逗号
    captchaData() {
      return this.captcha
        .toString()
        .replace(/\s/g, "")
        .replace(/,/g, "");
    },
    ...mapState("login", ["registPhone"]),
    ...mapState(["token"])
  },
  activated() {
    this.type = this.$route.query.type;
    // input键盘聚焦
    this.$nextTick(() => {
      this.inputFocus();
    });
  },
  methods: {
    // 进入页面input输入框聚焦
    inputFocus() {
      document.querySelectorAll(".captcha-input")[0].focus();
    },
    // 监听 input 输入
    handleInput($evt) {
      let index = $evt.target.getAttribute("data-index");
      console.log(index);
      let value = this.captcha[index].substring(this.captcha[index].length - 1);
      if (parseInt(value) === 0 || value) {
        // 如果 captcha 中有值，则替换相应的2
        if (parseInt(this.captcha[index]) === 0 || this.captcha[index]) {
          this.captcha.splice(index, 1, value);
        }
        let nextInput = document.querySelectorAll(".captcha-input")[++index];
        nextInput && nextInput.focus();
      } else {
        document.addEventListener("keydown", deleteInput);
      }
      // 监听键盘事件
      function deleteInput(event) {
        if (event.keyCode === 8) {
          let nextInput = document.querySelectorAll(".captcha-input")[--index];
          nextInput && nextInput.focus();
          document.removeEventListener("keydown", deleteInput);
        }
      }
    },

    // 提交验证码
    async submitCaptcha() {
      if (this.captchaData.length !== 4) {
        this.$Toast("请输入完整的验证码！");
        return;
      }
      console.log("submit");
      // 存储校验码
      this.setRegistCaptcha(this.captchaData);
      // 如果 type = reset 则修改手机号
      if (this.type === "reset") {
        try {
          this.$Indicator.open("加载中...");
          let res = await updateMobile(
            this.token,
            this.registPhone,
            this.captchaData
          );
          // res.error_code = 0;
          if (res.error_code === 0) {
            this.$Toast({
              message: "修改成功",
              duration: 1500
            });
            // 返回基本信息页面
            setTimeout(() => {
              this.$router.replace("/user");
            }, 1800);
          } else {
            this.$Toast(res.error_msg);
          }
          this.$Indicator.close();
        } catch (err) {
          this.$Indicator.close();
          console.log(err);
        }
      } else {
        // 否则为注册,微信绑定 跳转到 输入密码页面
        this.$router.push({
          path: "/set-psw",
          query: {
            type: this.type
          }
        });
      }
    },
    ...mapMutations("login", {
      setRegistCaptcha: "setRegistCaptcha"
    })
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.line {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 996px;
  height: 174px;
  border-radius: 45px;
  margin-bottom: 76px;
  input {
    width: 186px;
    height: 186px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 30px 60px 0px rgba(64, 117, 205, 0.08);
    border-radius: 68px;
    text-align: center;
    font-size: 54px;
    font-weight: 400;
    color: rgba(59, 70, 100, 1);
  }
}
</style>
