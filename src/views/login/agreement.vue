<template>
  <div class="agreement-page" v-html="rendata"></div>
</template>

<script>
import { getPageData } from "../../api/login";
export default {
  name: "agreement-page",
  data() {
    return {
      rendata: ""
    };
  },
  created() {
    this._getPageData();
    this.$bridge.call("setNav", {
      hidden: 0,
      // 非全面屏显示
      immersionStatusBar: 2
    });
  },
  methods: {
    async _getPageData() {
      let id = this.$route.query.id * 1;
      switch (id) {
        case 7:
          document.title = "新手引导";
          break;
        case 8:
          document.title = "用户隐私协议";
          break;
        case 9:
          document.title = "服务条款";
          break;
        case 10:
          document.title = "关于云巧客";
          break;
      }
      if (id) {
        this.$Indicator.open("加载中...");
        let res = await getPageData(id);
        if (res.error_code === 0) {
          this.rendata = res.data.content;
        }
        console.log(res);
        this.$Indicator.close();
      } else {
        console.log("内容列表和对应ID");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.agreement-page {
  padding: 56px 70px;
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 60px;
  .title {
    margin: 50px auto;
  }
}
</style>
