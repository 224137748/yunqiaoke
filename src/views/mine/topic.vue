<template>
  <!-- 话题列表 -->
  <div class="topic">
    <tablist :tabList="tabList" :scroll="true" :indexs="tabListIndex" :border="true" @getIndex="onTab" class="tablist"></tablist>
    <div @click="searchTap">
      <m-search :value="text" :qxShow="false" @gokeyDown="keyDwon" :placeholder="'Search'" class="headbg"></m-search>
    </div>
    <div class="box">
      <div class="item" :style="'background-image: url('+item.pic+')'" v-for="(item,i) in list" :key="i">
        <img src="../../assets/img/mine/topicImg.png" alt="">
        <div class="title">#{{item.name}}#</div>
      </div>
      <div class="no" v-if="show">暂无数据</div>
    </div>
  </div>
</template>

<script>
import tablist from "../../components/home/tablist.vue";
import mSearch from "../../components/home/mSearch.vue";
import { mapState, mapActions } from "vuex";
import { getTopicIndex, getTopicmyIndex } from "../../api/home.js";
export default {
  components: {
    tablist,
    mSearch
  },
  data() {
    return {
      text: "",
      tabListIndex: 0,
      tabList: [
        { name: "热门", num: "" },
        { name: "我的", num: "" }
      ],
      list: [],
      page: 1,
      show: false
    };
  },
  mounted() {
    this.getData();
    document.addEventListener("scroll", this.scroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    async getData(index) {
      !this.token && (await this.getToken());
      var params = {
        name: this.text,
        page: this.page,
        per_page: 10
      };
      if (index === 1) {
        var leng = this.list.length;
        if (this.total === leng) {
          this.$Toast({
            message: "已经到最底啦",
            duration: 1500
          });
          this.page = this.page - 1;
          this.$Indicator.close();
          return false;
        }
      }
      this.$Indicator.open("加载中...");
      var res = await getTopicIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.total = data.total;
          for (var i = 0; i < data.data.length; i++) {
            this.list.push(data.data[i]);
          }
          this.$Indicator.close();
          if (this.list.length === 0) {
            this.show = true;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getmyData(index) {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        name: this.text,
        page: this.page,
        per_page: 10
      };
      if (index === 1) {
        var leng = this.list.length;
        if (this.total === leng) {
          this.$Toast({
            message: "已经到最底啦",
            duration: 1500
          });
          this.page = this.page - 1;
          this.$Indicator.close();
          return false;
        }
      }
      this.$Indicator.open("加载中...");
      var res = await getTopicmyIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.total = data.total;
          for (var i = 0; i < data.data.length; i++) {
            this.list.push(data.data[i]);
          }
          this.$Indicator.close();
          if (this.list.length === 0) {
            this.show = true;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    scroll() {
      var that = this;
      that.fnThrottle(function() {
        that.allLoaded = true;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight + 30 > scrollHeight) {
          that.$Indicator.open("加载中...");
          setTimeout(function() {
            that.page = that.page + 1;
            that.getData(1);
          }, 1500);
        }
      }, 500, 2000)();
    },
    // 节流函数
    fnThrottle(method, delay, duration) {
      var that = this;
      var timer = this.timer;
      var begin = new Date().getTime();
      return function() {
        var current = new Date().getTime();
        clearTimeout(timer);
        if (current - begin >= duration) {
          method();
          begin = current;
        } else {
          that.timer = setTimeout(function() {
            method();
          }, delay);
        }
      };
    },
    keyDwon(e) {
      this.text = e;
      this.list = [];
      if (this.tabListIndex === 0) {
        this.getData();
      } else {
        this.getmyData();
      }
    },
    searchTap() {
      this.$router.push("/search");
    },
    // 切换
    onTab(index) {
      this.text = "";
      this.tabListIndex = index;
      this.list = [];
      if (index === 0) {
        this.getData();
      } else {
        this.getmyData();
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .topic{
    // position: fixed;
    background-color: #FFFFFF;
    width: 100%;
    .box{
      width: 92%;
      margin: 0 auto;
      .no{
        text-align: center;
        padding-top: 0.711111rem;
      }
      .item{
        height: 5.333333rem;
        position: relative;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        margin-bottom: 0.266666rem;
        overflow: hidden;
        border-radius: 0.106666rem;
        .title{
          width: 100%;
          position: absolute;
          bottom: 0.533333rem;
          left: 0;
          font-size: 0.373333rem;
          color: #FFFFFF;
          padding: 0 0.408888rem;
        }
        img{
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
</style>
