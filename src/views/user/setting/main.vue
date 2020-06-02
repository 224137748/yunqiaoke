<template>
  <div class="setting-main-page" v-show="!loading">
    <line-item @handleClick="goSetIdentity">
      <span slot="title">更改身份</span>
      <span slot="content">{{ identity }}</span>
    </line-item>
    <line-item @handleClick="goSetPsw">
      <span slot="title">更改密码</span>
    </line-item>
    <line-item @handleClick="goRegister">
      <span slot="title">更改手机号</span>
      <span slot="content">{{ getUserInfo.mobile }}</span>
    </line-item>
    <line-item @handleClick="goAgreement(8)">
      <span slot="title">用户协议</span>
    </line-item>
    <line-item @handleClick="goAgreement(10)">
      <span slot="title">关于云巧客</span>
    </line-item>
    <line-item @handleClick="goHelpPage">
      <span slot="title">帮助中心</span>
    </line-item>
    <line-item :showArrIcon="false">
      <span slot="title">消息通知</span>
      <span slot="content">
        <mt-switch @change="handleChange" v-model="noticeFlag"></mt-switch>
      </span>
    </line-item>
    <line-item @handleClick="clearCache">
      <span slot="title">清除缓存</span>
    </line-item>
    <line-item :showArrIcon="false">
      <span slot="title" class="logOut" @click="logout">退出登录</span>
    </line-item>
  </div>
</template>

<script>
import LineItem from "@/components/user/line-item";
import { getUserInfor, toggleMsg } from "@/api/user";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "setting-main-page",
  data() {
    return {
      noticeFlag: false,
      loading: true
    };
  },
  components: {
    LineItem
  },
  computed: {
    identity() {
      // 认证状态:1技能者,2雇主方,3个人投资者,4企业投资者
      switch (this.getUserInfo.auth_status) {
        case 1:
          return "技能者";
        case 2:
          return "雇主方";
        case 3:
          return "个人投资者";
        case 4:
          return "企业投资者";
      }
      return "";
    },
    ...mapState(["token"]),
    ...mapGetters("user/userAuth", ["getUserInfo"])
  },
  created() {
    this._getUserInfor();
  },
  methods: {
    // 获取用户基本信息 通过token获取用户数据
    async _getUserInfor() {
      // 获取token
      !this.token && (await this.getToken());
      let params = new Set();
      // 如果有用户的id，则传入id， 否则就传入token
      if (this.token) params.add(this.token);
      if (params.size > 0) {
        try {
          this.$Indicator.open("加载中...");
          let res = await getUserInfor(...params);
          if (res.error_code === 0) {
            this.saveData(res.data);
            // 消息通知 1是开启 2是关闭
            this.noticeFlag = parseInt(res.data.msg) === 1;
          } else {
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
          }
          this.$Indicator.close();
          this.loading = false;
        } catch (err) {
          this.$Indicator.close();
          this.loading = false;
          console.log(err);
        }
      } else {
        console.log("未获取到用户id或者token");
      }
    },
    // 跳转到更改身份
    goSetIdentity() {
      this.$router.push("/identity");
    },
    // 跳转到更改手机号(同注册页面)
    goRegister() {
      this.$router.push({
        path: "/register-phone",
        query: {
          type: "reset"
        }
      });
    },
    // 跳转更改密码页面
    goSetPsw() {
      this.$router.push("/reset-psw");
    },
    // 跳转用户隐私协议
    goAgreement(id) {
      this.$router.push({
        path: "/agreement",
        query: {
          id
        }
      });
    },
    // 跳转帮助中心
    goHelpPage() {
      this.$router.push("/setting/help");
    },
    // 清楚缓存
    async clearCache() {
      try {
        let res = await this.$bridge.call("clearCache", {});
        console.log(res);
      } catch (err) {
        console.log("err");
      }
    },
    // 开启、关闭消息通知
    async handleChange() {
      console.log(1);
      try {
        this.$Indicator.open("加载中...");
        let res = await toggleMsg(this.token);
        console.log(res);
        this.$Indicator.close();
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
    },
    // 退出登录
    logout() {
      this.$bridge.call("setToken", {
        token: ""
      });
    },
    // 保存数据到vuex
    saveData(data) {
      let baseInfo = {
        id: "",
        // 存储全局token
        token: "",
        // 存储极光id
        pushid: "",
        // 用户手机号
        mobile: "",
        // 1正常,2临时冻结,3永久冻结
        status: "",
        // 冻结时间
        froze_at: "",
        // 冻结天数
        froze_days: "",
        // 认证状态,0未认证,1认证中,2技能者,3雇主方,4个人投资者,5企业投资者,6已拒绝
        auth_status: "",
        openid: "",
        // token过期时间
        expired_at: "",
        // 创建时间
        created_at: "",
        // 1安卓,2iOS
        terminal: "",
        collections: "",
        fans: ""
      };
      for (let key in baseInfo) {
        if (data[key]) {
          baseInfo[key] = data[key];
        }
      }
      this.setBaseInfo(baseInfo || {});
      this.setUser(data.get_user_info || {});
      this.setUserStunt(data.get_user_stunt || []);
      this.setUserCollection(data.collection || []);
      this.setUserFan(data.fan || []);
      this.setUserPic(data.pic || []);
      this.setUserSite(data.site || []);

      this.setUserAuth(data.get_user_auth || {});
    },
    // 全局mutations
    ...mapMutations({
      setBaseInfo: "SET_BASE_INFO"
    }),
    // user mutations
    ...mapMutations("user", [
      "setUser",
      "setUserStunt",
      "setUserCollection",
      "setUserFan",
      "setUserPic",
      "setUserSite"
    ]),
    // user Auth
    ...mapMutations("user/userAuth", ["setUserAuth"]),
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
.logOut {
  font-size: 48px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(114, 101, 227, 1);
  line-height: 42px;
}
/deep/ .mint-switch-input:checked + .mint-switch-core {
  border-color: #3ec8bc;
  background-color: #3ec8bc;
}
</style>
