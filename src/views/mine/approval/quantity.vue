<template>
  <!-- 我的电量 -->
  <div class="qa">
    <div class="qa-head"></div>
    <head-nav :title="'我的电量'" :navShow="false" class="mheader">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHead.png" alt=""></div>
      <div slot="header" class="qa-Hright" @click="goWen"><img src="../../../assets/img/home/wen.png" alt=""></div>
    </head-nav>
    <div class="qa-box">
      <div class="qa-item">
        <div class="qa-title">{{current_battery}}<span>盎司</span></div>
        <div class="qa-bd">当前可用电量</div>
        <i class="qa-i1"></i>
      </div>
      <div class="qa-item">
        <div class="qa-title">{{total_battery}}<span>盎司</span></div>
        <div class="qa-bd">累计收入电量</div>
        <i class="qa-i2"></i>
      </div>
    </div>
    <div class="quan">
      <div class="qa-int">
        <div class="qa-month">充电记录</div>
        <div class="qa-flex" v-for="(item,i) in list" :key="i">
          <div class="qa-img"><img :src="item.user_info.avatar" alt=""></div>
          <div class="qa-left">
            <div class="qa-tm">{{item.user_info.nickname}}</div>
            <div class="qa-time">{{item.created_at}}</div>
          </div>
          <div class="qa-right">{{item.battery}}盎司</div>
        </div>
      </div>
      <div class="no" v-if="show">
        暂无充电记录
      </div>
    </div>
  </div>
</template>

<script>
import headNav from "../../../components/home/headNav.vue";
import { mapState, mapActions } from "vuex";
import { getCourseBatteryIndex } from "../../../api/home.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      list: [],
      page: 1,
      show: false,
      total: "",
      total_battery: "",
      current_battery: ""
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
    goback() {
      this.$bridge.call("back");
    },
    goWen() {
      this.$router.push("/content?id=13");
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
        type: 2,
        page: this.page,
        per_page: 10
      };
      var res = await getCourseBatteryIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data.data;
          this.total = res.data.total;
          this.total_battery = res.data.total_battery;
          this.current_battery = res.data.current_battery;
          for (var i = 0; i < data.length; i++) {
            this.list.push(data[i]);
          }
          this.$Indicator.close();
          if (this.list.length === 0) {
            this.show = true;
          }
        } else {
          console.log(res.error_msg);
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
            that.getData(1);
            that.page = that.page + 1;
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
  .mheader{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    .headLeft{
      width: 0.533333rem;
      height: 0.533333rem;
      position: absolute;
      left: 4%;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 100%;
        display: block;
      }
    }
    .qa-Hright{
      width: 0.355555rem;
      img{
        width: 100%;
      }
    }
  }
  .quan{
    margin-top: 2.488888rem;
    .no{
      margin: 0 auto;
      width: 92%;
      text-align: center;
    }
  }
  .qa-int{
    width: 92%;
    margin: 0 auto;
    margin-bottom: 0.8rem;
    .qa-flex{
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
      .qa-img{
        width: 1.12rem;
        height: 1.12rem;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 1.12rem;
          height: 1.12rem;
        }
      }
      .qa-left{
        width: 60%;
        height: 1.12rem;
        padding-left: 0.266666rem;
        line-height: 1;
        .qa-time{
          font-size: 0.32rem;
          color: #9C9EB9;
        }
        .qa-tm{
          font-size: 0.373333rem;
          color: #2D3142;
          padding-top: 0.124444rem;
          padding-bottom: 0.266666rem;
        }
      }
      .qa-right{
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
    .qa-month{
      font-size: 0.426666rem;
      color: #2D3142;
      font-weight:bold;
    }
  }
  .qa-info{
    width: 92%;
    margin: 0 auto;
    margin-top: 2.666666rem;
    margin-bottom: 0.622222rem;
    .qa-hb{
      line-height: 1;
      font-size: 0.32rem;
      color: #9C9EB9;
      background-color: #F4F6FA;
      padding: 0.266666rem 0;
      width: 2.346666rem;
      text-align: center;
      border-radius: 0.16rem;
      float: right;
      img{
        width: 0.266666rem;
        margin-left: 0.177777rem;
      }
    }
    .qa-bd{
      font-size: 0.533333rem;
      color: #2D3142;
      line-height: 1;
      float: left;
      padding-top: 0.177777rem;
      font-weight: bold;
    }
  }
  .mint-popup{
    width: 100%;
    .qa-pop{
      width: 100%;
      display: flex;
      border-bottom: 1px solid #ededed;
      .qa-tap{
        flex: 1;
        text-align: center;
        line-height: 1.066666rem;
        font-size: 0.426666rem;
        color: #0000FF;
      }
    }
  }
  .qa-box{
    width: 92%;
    height: 3.555555rem;
    background: #FFFFFF;
    box-shadow: 0px 30px 90px 0px rgba(112,136,210,0.1);
    border-radius: 0.4rem;
    position: absolute;
    top: 2.666666rem;
    left: 4%;
    display: flex;
    .qa-item{
      text-align: center;
      flex: 1;
      line-height: 1;
      .qa-i2{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #7265E3;
        display: block;
        margin: 0 auto;
      }
      .qa-i1{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #FFA56C;
        display: block;
        margin: 0 auto;
      }
      .qa-bd{
        font-size: 0.373333rem;
        color: #9C9EB9;
        padding: 0.32rem 0;
      }
      .qa-title{
        font-size: 0.853333rem;
        color: #2D3142;
        padding-top: 0.711111rem;
        span{
          font-size: 0.355555rem;
          margin-left: 0.177777rem;
        }
      }
    }
  }
  .qa-head{
    width: 100%;
    height: 4.444444rem;
    background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
    position: relative;
  }
  .clear{
    clear: both;
  }
</style>
