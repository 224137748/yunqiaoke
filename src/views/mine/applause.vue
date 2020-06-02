<template>
  <!-- 我的鼓掌 -->
  <div class="appse">
    <div></div>
    <head-nav :title="'我的鼓掌'" class="mheader">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../assets/img/home/leftHead.png" alt=""></div>
    </head-nav>
    <div class="height"></div>
    <tablist :tabList="tabList" :scroll="true" :indexs="tabListIndex" @getIndex="onTab" class="makeMe-tablist"></tablist>
    <div class="appse-bg">
      <div class="appse-box" v-if="tabListIndex === 0">
        <div class="appse-fItem" v-for="(item,i) in list" :key="i">
          <div class="appse-left">
            <div class="appse-title">您为这条内容鼓掌了</div>
            <div class="appse-time">{{item.update}}</div>
          </div>
          <div class="appse-img"><img :src="item.content.thumb" alt=""></div>
        </div>
      </div>
      <div class="appse-box" v-else>
        <div class="appse-fItem appse-pd" v-for="(item,i) in list" :key="i">
          <div class="appse-userImg"><img :src="item.user_info.avatar" alt=""></div>
          <div class="appse-w">
            <div class="appse-title">{{item.user_info.nickname}}</div>
            <div class="appse-time">为你鼓掌</div>
            <div class="appse-deTime">{{item.update}}</div>
          </div>
          <div class="appse-img"><img :src="item.content.thumb" alt=""></div>
        </div>
      </div>
      <div class="no" v-if="show">暂无数据</div>
    </div>
  </div>
</template>

<script>
import tablist from "../../components/home/tablist.vue";
import headNav from "../../components/home/headNav.vue";
import { mapState, mapActions } from "vuex";
import { getlikeIndex } from "../../api/home.js";
export default {
  components: {
    tablist,
    headNav
  },
  data() {
    return {
      tabListIndex: 0,
      tabList: [
        { name: "我鼓掌的", num: "" },
        { name: "被鼓掌的", num: "" }
      ],
      list: [],
      show: false
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    async getData(index) {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        type: this.tabListIndex + 1
      };
      this.$Indicator.open("加载中...");
      var res = await getlikeIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            var now = new Date();
            var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
            var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            data[i].created_at = data[i].created_at.replace(/-/g, "/");
            data[i].update = this.getDays(data[i].created_at, nowDay);
            this.list.push(data[i]);
          }
          // this.list = data;
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
    onTab(index) {
      this.tabListIndex = index;
      this.list = [];
      this.show = false;
      this.getData();
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
  }
  .height{
    height: 1.333333rem;
    width: 100%;
  }
  .appse{
    background-color: #6554D5;
    .appse-bg{
      background-color: #FFFFFF;
    }
    .no{
      width: 92%;
      margin: 0 auto;
      padding-top: 0.711111rem;
    }
    .appse-box{
      width: 92%;
      margin: 0 auto;
      background-color: #FFFFFF;
      .appse-fItem{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.444444rem 0;
        position: relative;
        &.appse-pd{
          padding-bottom: 0.844444rem;
        }
        &::after{
          content: "";
          display: inline-block;
          width: 100%;
          height: 0.026666rem;
          background-color: #EDEDF7;
          position: absolute;
          bottom: 0;
        }
        .appse-userImg{
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.355555rem;
          img{
            width: 100%;
          }
        }
        .appse-w{
          flex: 1;
          height: 1.12rem;
          position: relative;
          line-height: 1;
          .appse-deTime{
            font-size: 0.284444rem;
            color: #CBCCDC;
            position: absolute;
            left: 0;
            bottom: -0.355555rem;
          }
          .appse-title{
            font-size: 0.373333rem;
            color: #2D3142;
            padding-top: 0.115555rem;
            padding-bottom: 0.222222rem;
          }
          .appse-time{
            font-size: 0.32rem;
            color: #9C9EB9;
          }
        }
        .appse-left{
          height: 1.511111rem;
          flex: 1;
          line-height: 1;
          .appse-title{
            font-size: 0.373333rem;
            color: #2D3142;
            padding-top: 0.32rem;
            padding-bottom: 0.266666rem;
          }
          .appse-time{
            font-size: 0.32rem;
            color: #CBCCDC;
          }
        }
        .appse-img{
          width: 1.511111rem;
          height: 1.511111rem;
          overflow: hidden;
          img{
            width: 100%;
          }
        }
      }
    }
    .makeMe-tablist{
      border-bottom: 0.026666rem solid #EDEDF7;
      background-color: #FFFFFF;
    }
  }
</style>
