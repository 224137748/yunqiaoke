<template>
  <div class="grade">
    <div class="grade_head">
      <img src="../../assets/img/mine/gradeBg.png" alt="" class="grade-Bg">
      <!-- <head-nav :title="'我的鼓掌'" class="mheader">
        <div slot="header" class="qa-Hright"><img src="../../assets/img/home/wen.png" alt=""></div>
      </head-nav> -->
      <div class="wen" @click="goWen"><img src="../../assets/img/home/wen.png" alt=""></div>
      <div class="grade-lave">
        <div class="grade-num">LV{{level}}</div>
        <div class="grade-fn">当前经验值{{experience}}</div>
      </div>
    </div>
    <div class="grade-int">
      <div class="grade-month">等级明细</div>
      <div class="grade-flex" v-for="(item,i) in list" :key="i">
        <div class="grade-left">
          <div class="grade-tm">任务完成</div>
          <div class="grade-time">{{item.update}}</div>
        </div>
        <div class="grade-right">+{{item.experience}}经验</div>
      </div>
      <div class="no" v-if="show">暂无数据</div>
    </div>
  </div>
</template>

<script>
// import headNav from "../../components/home/headNav.vue";
import { mapState, mapActions } from "vuex";
import { getUserLevel } from "../../api/home.js";
export default {
  // components: {
  //   headNav
  // },
  data() {
    return {
      list: [],
      page: 1,
      level: "",
      experience: "",
      total: "",
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
    goWen() {
      this.$router.push("/content?id=12");
      this.$bridge.call("setNav", {
        hideNav: 1,
        immersionStatusBar: 1
      });
    },
    async getData(index) {
      !this.token && (await this.getToken());
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
      var params = {
        token: this.token,
        page: this.page,
        per_page: 10
      };
      var res = await getUserLevel(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.level = data.level;
          this.experience = data.experience;
          this.total = data.total;
          var list = data.index.data;
          for (var i = 0; i < list.length; i++) {
            var now = new Date();
            var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
            var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            list[i].updated_at = list[i].updated_at.replace(/-/g, "/");
            data[i].update = this.getDays(data[i].updated_at, nowDay);
            this.list.push(list[i]);
          }
          this.$Indicator.close();
          if (this.list.length === 0) {
            this.show = true;
          }
        } else {
          this.$Indicator.close();
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 计算两日期相差天数
    getDays(dateString, nowDate) {
      var startDate = Date.parse(dateString);
      var endDate = Date.parse(nowDate);
      // var days = parseInt((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
      var days = parseInt((endDate - startDate) / (1 * 24 * 60 * 60));
      if (days <= 60) {
        return days + "分钟前";
      } else if (days < 60 * 24) {
        return days + "小时前";
      } else {
        return dateString;
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
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .grade{
    width: 100%;
    position: relative;
    .grade-int{
      width: 92%;
      margin: 0 auto;
      margin-bottom: 0.8rem;
      background-color: #FFFFFF;
      box-shadow: 0px 12px 60px 0px rgba(3,0,130,0.03);
      border-radius: 0.4rem;
      padding: 0.462222rem;
      position: relative;
      top: -1.2rem;
      .no{
        padding-top: 0.711111rem;
        text-align: center;
      }
      .grade-flex{
        padding-top: 0.533333rem;
        padding-bottom: 0.444444rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        &::after{
          content: '';
          display: inline-block;
          width: 100%;
          height: 0.026666rem;
          background-color: #EBEBEB;
          position: absolute;
          bottom: 0;
        }
        .grade-left{
          width: 80%;
          line-height: 1;
          .grade-time{
            font-size: 0.32rem;
            color: #9C9EB9;
            padding-top: 0.266666rem;
          }
          .grade-tm{
            font-size: 0.373333rem;
            color: #2D3142;
          }
        }
        .grade-right{
          flex: 1;
          text-align: right;
          font-size: 0.373333rem;
          color: #2D3142;
        }
      }
      i{
        display: inline-block;
        width: 0.08rem;
        height: 0.355555rem;
        border-radius: 0.044444rem;
        background-color: #7265E3;
        margin-right: 0.266666rem;
      }
      .grade-month{
        font-size: 0.426666rem;
        color: #2D3142;
        font-weight:bold;
      }
    }
    .grade_head{
      position: relative;
      font-size: 0;
      .wen{
        position: absolute;
        width: 0.364444rem;
        height: 0.364444rem;
        right: 4%;
        top: 1.333333rem;
        img{
          width: 100%;
        }
      }
      .grade-lave{
        line-height: 1;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 1.822222rem;
        text-align: center;
        .grade-fn{
          font-size: 0.32rem;
          color: #A27600;
          padding-top: 0.391111rem;
        }
        .grade-num{
          font-size: 1.333333rem;
          color: #A27600;
          font-weight: bold;
        }
      }
      .mheader{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
    .mheader{
      .qa-Hright{
        width: 0.355555rem;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
