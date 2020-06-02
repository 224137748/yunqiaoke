<template>
  <!-- 效果分析 -->
  <div class="effect">
    <!-- <head-nav :title="'邀请注册'"></head-nav> -->
    <div class="effect-box">
      <img src="../../assets/img/home/efBg.png" alt="">
      <div class="effect-head">
        <div class="effect-title">{{body.num}}<span>次</span></div>
        <div class="effect-oc">成功邀请</div>
        <i class="effect-i"></i>
      </div>
    </div>
    <div class="effect-pox">
      <div class="effect-Interest">您累计邀请次</div>
      <div class="effect-moth">
        <div class="effect-mothItem" :class="item.id===tabId?'active':''" @click="tapDay(item.id)" v-for="(item,i) in tabDay" :key="i">{{item.name}}({{item.num}})</div>
      </div>
      <tablist :tabList="tabList" :indexs="tabListIndex" :scroll="true" @getIndex="onTab"></tablist>
      <div class="effect-content" v-if="!hide">
        <div class="effect-item" v-for="(item, i) in list" :key="i">
          <div class="effect-img"><img :src="item.get_user_info.avatar" alt=""></div>
          <div class="effect-center">
            <div class="effect-name">{{item.get_user_info.nickname}}</div>
            <div class="effect-centent">用户注册</div>
            <div class="effect-deTime">{{item.created_at}}</div>
          </div>
          <div class="effect-time">{{item.invite_user_gem.gem}}枚经验宝</div>
        </div>
      </div>
      <div v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
// import headNav from "../../components/home/headNav.vue";
import tablist from "../../components/home/tablist.vue";
import { mapState, mapActions } from "vuex";
import { getInviteTimes, getInviteRegister } from "../../api/home.js";
export default {
  components: {
    tablist
    // headNav
  },
  data() {
    return {
      tabListIndex: 0,
      tabList: [
        { name: "全部消息", num: "" },
        { name: "雇主方", num: "" },
        { name: "技能", num: "" },
        { name: "投资人", num: "" },
        { name: "未认证", num: "" }
      ],
      tabDay: [
        { name: "最近7天", num: "", id: 1 },
        { name: "最近一个月", num: "", id: 2 },
        { name: "最近三个月", num: "", id: 3 }
      ],
      tabId: 1,
      body: "",
      list: [],
      page: 1,
      per_page: 10,
      hide: false
    };
  },
  async mounted() {
    await this.getData();
    this.getSay(this.tabListIndex);
    document.addEventListener("scroll", this.scroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    scroll() {
      var that = this;
      that.fnThrottle(function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight + 30 > scrollHeight) {
          that.$Indicator.open("加载中...");
          that.page = that.page + 1;
          setTimeout(function() {
            that.getData();
            that.$Indicator.close();
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
    // 用户数据
    async getSay() {
      var params;
      if (this.tabListIndex === 0) {
        params = {
          token: this.token,
          page: this.page,
          per_page: this.per_page
        };
      } else {
        params = {
          token: this.token,
          auth_status: this.tabListIndex,
          page: this.page,
          per_page: this.per_page
        };
      }
      this.$Indicator.open("加载中...");
      var res = await getInviteRegister(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          for (var i = 0; i < data.data.length; i++) {
            this.list.push(data.data[i]);
          }
          this.$Indicator.close();
        } else {
          console.log(res.error_msg);
          this.$Indicator.close();
        }
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
    },
    // 获取切换初始数据
    async getData(statDay) {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        type: this.tabId
      };
      var res = await getInviteTimes(params);
      try {
        if (res.error_code === 0) {
          this.tabDay[0].num = res.data.seven_days;
          this.tabDay[1].num = res.data.one_month;
          this.tabDay[2].num = res.data.three_month;
          this.tabList[1].num = res.data.employer;
          this.tabList[2].num = res.data.skilled;
          this.tabList[3].num = res.data.investor;
          this.tabList[4].num = res.data.uncertified;
          this.body = res.data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 切换刷新数据
    onTab(index) {
      this.tabListIndex = index;
      this.page = 1;
      this.list = [];
      this.getSay();
    },
    // 选择天数
    async tapDay(day) {
      this.tabId = day;
      var stat = await this.getDay(-day);
      this.page = 1;
      this.list = [];
      this.getData(stat);
      this.getSay();
    },
    // 获取近几天的天数
    getDay(day) {
      var today = new Date();
      var targetday = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  html,
  body,
  #app {
    height: 100%;
  }
  .effect{
    position: relative;
    height: 100%;
    .effect-pox{
      width: 9.2rem;
      margin: 0 auto;
      .effect-content{
        .effect-item{
          display: flex;
          padding: 0.533333rem 0;
          position: relative;
          &:last-child{
            margin-bottom: 0.533333rem;
          }
          &::after{
            content: "";
            display: inline-block;
            width: 100%;
            height: 0.026666rem;
            background-color: #EBEBEB;
            position: absolute;
            bottom: 0;
          }
          .effect-time{
            padding-left: 0.622222rem;
            padding-top: 0.648888rem;
            line-height: 1;
            font-size: 0.373333rem;
            font-weight: bold;
            color: #2D3142;
          }
          .effect-center{
            width: 5.297777rem;
            padding-left: 0.337777rem;
            line-height: 1;
            .effect-deTime{
              font-size: 0.32rem;
              color: #CBCCDC;
            }
            .effect-centent{
              font-size: 0.32rem;
              color: #9C9EB9;
              padding: 0.231111rem 0;
            }
            .effect-name{
              color: #2D3142;
              font-size: 0.373333rem;
            }
          }
          .effect-img{
            width: 1.28rem;
            height: 1.28rem;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .effect-moth{
        display: flex;
        margin: 0.444444rem auto;
        .effect-mothItem.active{
          background-color: #E1DDF5;
          color: #7265E3;
        }
        .effect-mothItem{
          width: 32%;
          height: 0.746666rem;
          border-radius: 0.746666rem;
          background-color: #F4F6FA;
          font-size: 0.32rem;
          line-height: 0.746666rem;
          color: #2D3142;
          text-align: center;
          margin-right: 4%;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .effect-Interest {
        font-size: 0.426666rem;
        font-weight: bold;
        color: #2D3142;
        padding-top: 0.8rem;
      }
    }
    .effect-box{
      padding-top: 1.777777rem;
      .effect-head{
        width: 92%;
        margin: 0 auto;
        background-color: #FFFFFF;
        box-shadow:0px 30px 90px 0px rgba(112,136,210,0.1);
        border-radius: 0.4rem;
        height: 3.555555rem;
        text-align: center;
        .effect-i{
          display: inline-block;
          width: 0.888888rem;
          height: 0.053333rem;
          background-color: #7265E3;
        }
        .effect-oc{
          font-size: 0.373333rem;
          color: #9C9EB9;
          line-height: 1;
          padding-top: 0.266666rem;
        }
        .effect-title{
          font-size: 0.853333rem;
          color: #2D3142;
          line-height: 1;
          padding-top: 1.093333rem;
          span{
            font-size: 0.355555rem;
          }
        }
      }
      img{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
      }
      div{
        position: relative;
        z-index: 2;
      }
    }
  }
</style>
