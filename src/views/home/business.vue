<template>
  <!-- 商机分析 -->
  <div class="bus">
    <div class="bus-head">
      <div class="bus-bd">
        <div class="bus-Interest">他们可能对你感兴趣</div>
        <ul class="bus-imgList">
          <li :class="'img' + i" v-for="(item,i) in siteUser" :key="i"><img :src="item.user_info.avatar" alt=""></li>
          <div class="bus-dian" :style="'left:' + ((siteUser.length+1)*0.8-0.2) + 'rem'"><img src="../../assets/img/home/threeDian.png" alt=""></div>
        </ul>
        <div class="bus-Interest bus-m">浏览数据概览</div>
        <div class="bus-stat">
          <div class="bus-sItem">
            <p>{{boring.today_add_conversation}}</p>
            <span>今日新增</span>
          </div>
          <div class="bus-sItem">
            <p>{{boring.today_browses}}</p>
            <span>今日浏览量</span>
          </div>
          <div class="bus-sItem">
            <p>{{boring.browses_persons}}</p>
            <span>总浏览人数</span>
          </div>
          <div class="bus-sItem">
            <p>{{boring.today_browses}}</p>
            <span>总浏览量</span>
          </div>
        </div>
        <div class="bus-Interest bus-m">互动列表</div>
        <tablist :tabList="tabList" :indexs="tabListIndex" :scroll="true" @getIndex="onTab"></tablist>
      </div>
    </div>
    <div class="bus-moth">
      <div class="bus-mothItem" :class="cur===7?'active':''" @click="tabDay(7)">最近7天({{boring.seven_days}})</div>
      <div class="bus-mothItem" :class="cur===30?'active':''" @click="tabDay(30)">最近一个月({{boring.one_month}})</div>
      <div class="bus-mothItem" :class="cur===90?'active':''" @click="tabDay(90)">最近三个月({{boring.three_month}})</div>
    </div>
    <div class="bus-box">
      <div class="bus-item" v-for="(item,i) in list" :key="i">
        <div class="bus-img"><img :src="item.get_user_info.avatar" alt=""></div>
        <div class="bus-center">
          <div class="bus-name">{{item.get_user_info.nickname}}</div>
          <div class="bus-centent">{{item.content}}</div>
        </div>
        <div class="bus-time">{{item.update}}</div>
      </div>
      <div class="no" v-if="show">暂无数据</div>
    </div>
  </div>
</template>

<script>
import tablist from "../../components/home/tablist.vue";
import { mapState, mapActions } from "vuex";
import { getUserSiteIndex, getHomePage, getMessageIndex } from "../../api/home.js";
export default {
  components: {
    tablist
  },
  data() {
    return {
      cur: 7,
      startDate: "",
      endDate: "",
      tabListIndex: 0,
      tabList: [
        { name: "全部消息", num: "" },
        { name: "技能者", num: "" },
        { name: "雇主方", num: "" },
        { name: "投资人", num: "" },
        { name: "未认证", num: "" }
      ],
      show: false,
      siteUser: [],
      boring: [],
      list: []
    };
  },
  async mounted() {
    !this.token && (await this.getToken());
    this.tabDay(7);
    await this.getData();
    this.getCentent();
    this.getSys();
    document.addEventListener("scroll", this.scroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    // 下方数据
    async getSys() {
      this.list = [];
      this.show = false;
      var params = {};
      if (this.tabListIndex === 0) {
        params = {
          token: this.token,
          start_date: this.startDate,
          end_date: this.endDate
        };
      } else {
        params = {
          token: this.token,
          start_date: this.startDate,
          end_date: this.endDate,
          auth_status: this.tabListIndex
        };
      }
      var res = await getMessageIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
            // 计算当前时间
            var now = new Date();
            var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
            var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            // data[i].updated_at = data[i].created_at.replace(/-/g, "/");
            data[i].update = this.getDays(data[i].created_at, nowDay);
            this.list.push(data[i]);
          }
          this.$Indicator.close();
          if (this.list.length === 0) {
            this.show = true;
          } else {
            this.show = false;
          }
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 中间数据
    async getCentent() {
      var res = await getHomePage({ token: this.token });
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.boring = data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 最上方数据
    async getData() {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        site: 1,
        page: 1,
        per_page: 7
      };
      var res = await getUserSiteIndex(params);
      try {
        if (res.error_code === 0) {
          this.siteUser = res.data.data;
        } else {
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
    // 天数切换
    tabDay(index) {
      this.$Indicator.open("加载中...");
      this.cur = index;
      // 计算当前时间
      var now = new Date();
      var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
      var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      var nowDay = now.getFullYear() + "-" + moth + "-" + day;
      this.endDate = nowDay;
      this.startDate = this.getDay(index);
      console.log(this.getDay(index));
      this.getSys();
    },
    // 获取近几天的天数
    getDay(day) {
      var today = new Date();
      var targetday = today.getTime() - 1000 * 60 * 60 * 24 * day;
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
    onTab(index) {
      this.$Indicator.open("加载中...");
      this.tabListIndex = index;
      this.getSys();
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  body {
    overflow-x: auto;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  .bus {
    width: 100%;
    height: 100%;
    background-color: #F0F3F9;
    position: fixed;
    left: 0;top: 0;
    .bus-box{
      width: 9.2rem;
      margin: 0 auto;
      .no{
        text-align: center;
        padding-top: 0.711111rem;
      }
      .bus-item{
        background-color: #FFFFFF;
        border-radius: 0.115555rem;
        display: flex;
        padding: 0.426666rem 0.444444rem;
        margin-bottom: 0.266666rem;
        &:last-child{
          margin-bottom: 50px;
        }
        .bus-time{
          padding-left: 0.622222rem;
          padding-top: 0.248888rem;
          line-height: 1;
          font-size: 0.32rem;
          color: #CBCCDC;
        }
        .bus-center{
          width: 5.297777rem;
          padding-left: 0.337777rem;
          line-height: 1;
          .bus-centent{
            font-size: 0.373333rem;
            color: #9C9EB9;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .bus-name{
            font-size: 0.426666rem;
            color: #2D3142;
            padding-top: 0.16rem;
            padding-bottom: 0.231111rem;
          }
        }
        .bus-img{
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
    .bus-moth{
      width: 9.2rem;
      display: flex;
      margin: 0.444444rem auto;
      .bus-mothItem.active{
        background-color: #E1DDF5;
      }
      .bus-mothItem{
        width: 32%;
        height: 0.746666rem;
        border-radius: 0.746666rem;
        background-color: #FFFFFF;
        font-size: 0.32rem;
        line-height: 0.746666rem;
        color: #7265E3;
        text-align: center;
        margin-right: 4%;
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .bus-head {
      background-color: #fff;
      position: relative;
      &::after {
        content: '';
        display: inline-block;
        width: 100%;
        height: 0.026666rem;
        background-color: #EDEDF7;
        position: absolute;
        bottom: 0;
      }

      .bus-bd {
        width: 9.2rem;
        margin: 0 auto;

        .bus-stat {
          display: flex;
          margin-top: 0.266666rem;
          margin-bottom: 0.533333rem;

          .bus-sItem {
            width: 23%;
            background-color: #F6F6FB;
            line-height: 1;
            padding: 44px 0;
            text-align: center;
            border-radius: 0.106666rem;
            margin-right: 3%;

            &:last-child {
              margin-right: 0;
            }

            p {
              font-size: 0.48rem;
              color: #7265E3;
              font-weight: bold;
            }

            span {
              font-size: 0.266666rem;
              color: #2D3142;
              display: block;
              padding-top: 0.195555rem;
            }
          }
        }

        .bus-imgList {
          display: flex;
          position: relative;
          height: 1.093333rem;
          margin-top: 0.355555rem;
          margin-bottom: 0.533333rem;

          .img0 {
            left: 0;
            z-index: 10;
          }

          .img1 {
            left: 0.8rem;
            z-index: 9;
          }

          .img2 {
            left: 1.6rem;
            z-index: 8;
          }

          .img3 {
            left: 2.4rem;
            z-index: 7;
          }

          .img4 {
            left: 3.2rem;
            z-index: 6;
          }

          .img5 {
            left: 4rem;
            z-index: 5;
          }

          .img6 {
            left: 4.8rem;
            z-index: 4;
          }

          li {
            width: 1.093333rem;
            height: 1.093333rem;
            background-color: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 0;

            img {
              width: 1.066666rem;
              height: 1.066666rem;
            }
          }

          .bus-dian {
            width: 0.293333rem;
            height: 0.071111rem;
            position: absolute;
            top: 0.266666rem;
            z-index: 50;

            img {
              width: 0.293333rem;
              height: 0.071111rem;
            }
          }
        }

        .bus-Interest {
          font-size: 0.426666rem;
          font-weight: bold;
          color: #2D3142;
          padding-top: 0.4rem;
        }

        .bus-m {
          padding-top: 0;
        }
      }
    }
  }
</style>
