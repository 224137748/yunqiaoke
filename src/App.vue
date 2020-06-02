<template>
  <div id="app">
    <!-- 对部分页面做缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "app",

  created() {
    // 获取全局基本信息
    this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
      let tokenData = await this.$bridge.call("getToken");
      if (tokenData.token) {
        this.setToken(tokenData.token);
      }
      // let res = await this.$bridge.call("getJPushId");
      // let pushId = res.jpush_id || 123;
      // pushId && this.setPushid(pushId);
      // this.$bridge.call("setNav", {
      //   type: 1,
      //   data: "测试",
      //   method: "edit"
      // });
      // this.$bridge.registerHandler("edit", function(data) {
      //   alert("接收到response");
      // });
      // let res = await this.$bridge.call("setNav", {
      //   title: "123",
      //   type: 1,
      //   data: "编辑",
      //   method: "edit"
      // });
      // console.log(res);
    },
    ...mapMutations({
      setPushid: "SET_PUSHID",
      setToken: "SET_TOKEN"
    })
  }
};
</script>
<style lang="less">
@import "./assets/css/common.less";
</style>
