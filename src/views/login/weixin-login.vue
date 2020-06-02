<template>
  <registerTemplate class="wx-sign">
    <agree-agreement ref="agree"></agree-agreement>
    <div class="wx-login" v-show="showFlag" @click="winxinLogin">
      微信授权登录
    </div>
    <div class="login">
      <span @click="goLogin">账号登陆</span>
    </div>
  </registerTemplate>
</template>

<script>
import RegisterTemplate from "../../components/login/register-template";
import AgreeAgreement from "../../components/login/agree-agreement";
import { wechatLogin, checkLoginEnv } from "@/api/login";
import { mapMutations } from "vuex";
export default {
  name: "weixin-login",
  data() {
    return {
      showFlag: false
    };
  },
  components: {
    RegisterTemplate,
    AgreeAgreement
  },
  created() {
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
    goLogin() {
      this.$router.replace("/login");
    },
    async winxinLogin() {
      if (this.$refs.agree.agreeType) {
        let res = await this.$bridge.call("Tri_Login", { type: 1 });
        // console.log(res);
        let openid = res.auth_token || "";
        let pushId = res.jpush_id || "";
        // 存储vuex
        openid && this.setOpenId(openid);
        pushId && this.setPushId(pushId);
        if (openid) {
          try {
            this.$Indicator.open("加载中...");
            let wechatRes = await wechatLogin(openid, pushId);
            this.$Indicator.close();
            if (wechatRes.error_code === 0) {
              // 如果token不为空则向客户端注入token
              if (wechatRes.data.token) {
                this.$bridge.call("setToken", {
                  token: wechatRes.data.token
                });
              }
              console.log(wechatRes);
              // status -1调用微信注册接口,0需跳转用户完善信息页面,其他正常
              if (parseInt(wechatRes.data.status) === 0) {
                this.$router.push("/information");
              } else if (parseInt(wechatRes.data.status) === -1) {
                this.$router.push({
                  path: "/register-phone",
                  query: {
                    type: "wechat"
                  }
                });
              } else {
                // this.$router.replace("/user");
                this.$bridge.call("router_app", {
                  type: "app_home"
                });
              }
            } else {
              this.$Toast({
                message: wechatRes.error_msg,
                duration: 1500
              });
            }
          } catch (err) {
            console.log(err);
            this.$Indicator.close();
          }
        } else {
          this.$Toast("微信授权失败");
        }
      } else {
        this.$Toast("请同意《服务条款》和《用户隐私协议》");
      }
    },
    ...mapMutations({
      setToken: "SET_TOKEN",
      setPushId: "SET_PUSHID",
      setOpenId: "SET_OPENID"
    })
  }
};
</script>
<style lang="less" scoped>
.wx-sign {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}
/deep/ .logo {
  margin-bottom: 400px !important;
}
[class*="login"] {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 37px;
  height: 132px;
  border-radius: 66px;
}
.wx-login {
  margin: 80px 0 0;
  background: url("../../assets/img/login/wx_login.png") no-repeat center top /
    100% 100%;
}
.login {
  font-size: 48px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(114, 101, 227, 1);
}
</style>
