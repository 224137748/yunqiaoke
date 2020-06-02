<template>
  <!-- 预约我的 -->
  <div class="makeMe">
    <tablist :tabList="tabList" :scroll="true" :indexs="tabListIndex" @getIndex="onTab" class="makeMe-tablist"></tablist>
    <div>
      <div class="makeMe-item" v-for="(item,i) in list" :key="i">
        <div class="makeMe-box">
          <div class="makeMe-head">
            <div class="makeMe-hdLeft">预约编号：{{item.sn}}</div>
            <div class="makeMe-hdRight"><img src="../../assets/img/mine/shi.png" alt="">{{item.gem}}</div>
          </div>
          <div class="makeMe-center">
            <div class="makeMe-cLeft">
              <div class="makeMe-cTitle">{{item.content_name}}</div>
              <div class="makeMe-cDes">{{item.content_user_auth.company}}</div>
            </div>
            <div class="makeMe-cRight">￥{{item.content_price}}/天</div>
          </div>
          <div class="makeMe-last">
            <img :src="item.user_info.avatar" alt="">{{item.user_info.nickname}}于{{item.created_at}}发起的预约
          </div>
          <div class="makeMe-btn" @click="play(item)">联系服务方</div>
        </div>
      </div>
      <div v-if="show">暂无数据</div>
    </div>
  </div>
</template>
<script>
import tablist from "../../components/home/tablist.vue";
import { mapState, mapActions } from "vuex";
import { getOrderIndex } from "../../api/home.js";
export default {
  components: {
    tablist
  },
  data() {
    return {
      tabListIndex: 0,
      tabList: [
        { name: "已预约", num: "" },
        { name: "已拒绝", num: "" },
        { name: "已结束", num: "" },
        { name: "已下架", num: "" }
      ],
      page: 1,
      list: [],
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
    play(item) {
      this.$bridge.call("to_chat", {
        token: this.token,
        to_user_id: item.user_info.user_id,
        content: item.id,
        type: item.content_type,
        title: item.content_name,
        price: item.content_price,
        time: item.created_at,
        updated: item.content_updated_at
      });
    },
    async getData(index) {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        type: 1,
        status: this.tabListIndex + 1,
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
      var res = await getOrderIndex(params);
      try {
        if (res.error_code === 0) {
          var data = res.data.data;
          this.total = res.data.total;
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
    onTab(index) {
      this.tabListIndex = index;
      this.page = 1;
      this.list = [];
      this.getData();
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  html,body,#app{
    height: 100%;
  }
  .makeMe{
    background-color: #F6F5F8;
    height: 100%;
    .makeMe-item{
      width: 100%;
      background-color: #FFFFFF;
      border-top: 0.266666rem solid #F6F5F8;
      padding-bottom: 0.533333rem;
      &:first-child{
        border-top: 0;
      }
      &:last-child{
        border-bottom: 0.266666rem solid #F6F5F8;
      }
      .makeMe-box{
        width: 92%;
        margin: 0 auto;
        .makeMe-btn{
          font-size: 0.32rem;
          color: #7265E3;
          text-align: center;
          line-height: 0.764444rem;
          background-color: #E1DDF5;
          border-radius: 0.764444rem;
          width: 90%;
          margin: 0 auto;
          margin-top: 0.533333rem;
        }
        .makeMe-last{
          font-size: 0.32rem;
          color: #9C9EB9;
          margin-top: 0.266666rem;
          img{
            width: 0.533333rem;
            border-radius: 50%;
            overflow: hidden;
            vertical-align: middle;
            margin-right: 0.284444rem;
          }
        }
        .makeMe-center{
          background-color: #F4F6FA;
          display: flex;
          justify-content: space-between;
          line-height: 1;
          padding: 0.4rem;
          .makeMe-cLeft{
            .makeMe-cDes{
              font-size: 0.32rem;
              color: #9C9EB9;
              padding-top: 0.266666rem;
            }
            .makeMe-cTitle{
              font-size: 0.373333rem;
              color: #2D3142;
            }
          }
          .makeMe-cRight{
            font-size: 0.373333rem;
            color: #2D3142;
          }
        }
        .makeMe-head{
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;
          padding: 0.426666rem 0;
          .makeMe-hdRight{
            font-size: 0.32rem;
            color: #FFD02C;
            img{
              width: 0.32rem;
              vertical-align: middle;
              margin-right: 0.088888rem;
            }
          }
          .makeMe-hdLeft{
            font-size: 0.32rem;
            color: #2D3142;
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
