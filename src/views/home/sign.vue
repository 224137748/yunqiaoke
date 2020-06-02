<template>
  <!-- 打卡 -->
  <div class="sign">
    <img src="../../assets/img/home/topImg.png" alt="" class="sign_bgImg">
    <head-nav :title="'打卡'" :navShow="false" :titleColor="'#FFFFFF'">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../assets/img/home/leftHead.png" alt=""></div>
    </head-nav>
    <div class="daka" @click="goincome">打卡</div>
    <div class="sign_send">
      <Calendar ref="Calendar" agoDayHide="1530115221" v-on:changeMonth="changeDate"></Calendar>
    </div>
    <div class="sign_history">
      <div class="sign_h2">历史收入明细</div>
      <div class="sign_content">
          <div class="no" v-if="body == ''">暂无数据</div>
          <div class="sign_item" v-for="(item,i) in body" :key="i" v-else>
            <div class="sign_left">
              <p>{{item.remark}}</p>
              <span>{{item.time}}</span>
            </div>
            <div class="sign_right">￥{{item.price}}</div>
          </div>
      </div>
    </div>
    <div class="btBG"></div>
  </div>
</template>

<script>
import headNav from "../../components/home/headNav.vue";
import { getHistory } from "../../api/home.js";
import { mapState, mapActions } from "vuex";
import Calendar from "../../components/home/vue-calendar-component/calendar.vue";
export default {
  components: {
    Calendar,
    headNav
  },
  data() {
    return {
      orderTime: "",
      page: 1,
      per_page: 10,
      body: [],
      keyUp: ""
    };
  },
  async mounted() {
    this.history();
    document.addEventListener("scroll", this.scroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  watch: {
    $route(now, old) {
      if (now.path === "/sign") {
        this.history();
      }
    }
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    goincome() {
      this.$router.push("/sign/income");
    },
    goback() {
      this.$bridge.call("app_home");
    },
    scroll() {
      var that = this;
      that.fnThrottle(function() {
        that.allLoaded = true;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight + 30 > scrollHeight) {
          var lastPage = that.keyUp.last_page;
          that.page = that.page + 1;
          if (that.page > lastPage) {
            // this.allLoaded = true;
            that.$Toast({
              message: "到底啦",
              duration: 1500
            });
          } else {
            that.history();
          }
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
    // 首次拿数据
    async history() {
      !this.token && (await this.getToken());
      var date = new Date();
      var moth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var s2 = date.getFullYear() + "-" + moth + "-" + day;
      console.log(s2);
      var params = {
        token: this.token,
        // record_date: s2,
        page: this.page,
        per_page: this.per_page
      };
      var res = await getHistory(params);
      this.keyUp = res.data;
      console.log(this.keyUp);
      try {
        if (res.error_code === 0) {
          if (res.data.data !== []) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.body.push(res.data.data[i]);
              // console.log(res.data.data[i]);
            }
            // this.body = [];
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    sign() {
      this.$router.push({
        path: "/sign/income"
      });
    },
    changeDate(data) {
      // 接口在插件calendar里面调用
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
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
  .sign {
    width: 100%;
    height: 100%;
    // position: fixed;
    background-color: #F0F3F9;
    .mint-loadmore-bottom {
      span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
        .is-rotate{
          transform: rotate(180deg);
        }
      }
    }
    .daka{
      width: 3.733333rem;
      height: 1.173333rem;
      border-radius: 1.173333rem;
      line-height: 0.977777rem;
      text-align: center;
      margin: 0 auto;
      background: rgba(24,226,166,1);
      font-size: 0.426666rem;
      color: #FFFFFF;
      border: 0.106666rem solid rgba(255, 255, 255, 0.3);
      margin-top: 0.355555rem;
      position: relative;
      z-index: 1;
    }
    .btBG{
      background-color: #F0F3F9;
      width: 100%;
      height: 0.711111rem;
    }
    .sign_history {
      width: 9.2rem;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.4rem;
      margin-top: 0.266666rem;
      padding-bottom: 0.533333rem;
      .sign_content {
        padding: 0 0.408888rem;

        .no {
          text-align: center;
          font-size: 0.426666rem;
          padding-top: 0.444444rem;
        }

        .sign_item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;
          padding-top: 0.391111rem;
          border-bottom: 1px solid #EAEAEA;

          .sign_right {
            font-size: 0.373333rem;
            color: #2D3142;
          }

          .sign_left {
            p {
              font-size: 0.373333rem;
              color: #2D3142;
            }

            span {
              display: block;
              font-size: 0.32rem;
              color: #9C9EB9;
              padding-bottom: 0.391111rem;
              padding-top: 0.266666rem;
            }
          }
        }
      }

      .sign_h2 {
        padding: 0 0.408888rem;
        padding-top: 0.533333rem;
        padding-bottom: 0.177777rem;
        font-size: 0.426666rem;
        font-weight: bold;
        color: #2D3142;
      }
    }

    .sign_send {
      width: 9.2rem;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.4rem;
      margin-top: 0.888888rem;
      position: relative;
      z-index: 1;
    }

    .sign_ka {
      width: 3.733333rem;
      height: 1.173333rem;
      line-height: 1;
      background-color: rgba(24, 226, 166, 0.3);
      border-radius: 0.586666rem;
      margin: 0 auto;
      margin-top: 0.8rem;
      text-align: center;

      span {
        display: inline-block;
        width: 3.555555rem;
        height: 0.995555rem;
        line-height: 0.995555rem;
        background-color: #18E2A6;
        font-size: 0.426666rem;
        color: #ffffff;
        text-align: center;
        border-radius: 0.586666rem;
        margin-top: 0.088888rem;
        padding-top: 3px;
      }
    }

    .sign_bgImg {
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: -0.8rem;
      z-index: 1;
    }
  }

  .sign>div {
    position: relative;
    z-index: 2;
  }
</style>
