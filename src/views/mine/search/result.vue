<template>
  <!-- 搜索结果页 -->
  <div class="result" :style="'background-color:'+(tabListIndex!==5?'#FFFFFF':'#F4F5FC')">
    <div class="tops">
      <m-search v-model="text" :qxTop="false" @gokeyDown="keyDwon" @fim="keyFim" class="headbg"></m-search>
      <tablist :tabList="tabList" :scroll="true" :indexs="tabListIndex" :border="true" @getIndex="onTab" class="tablist"></tablist>
    </div>
    <div ref="wrapper" class="body" :style="'height:'+wrapperHeight+'px'">
      <div class="box" v-if="tabListIndex!==5" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <div class="pt_service" v-for="(item,i) in list" :key="i" @click.stop="goDetail(item.id)">
          <div class="fl">
            <p @click.stop="zhantui(item.id)">赞推({{item.gem_count}})</p>
            <p @click.stop="store(tabListIndex, item.id, i)">鼓掌({{item.likes_count}})</p>
            <p @click.stop="hit(item)">打榜({{item.hit_gem}})</p>
          </div>
          <div class="fr">
            <div class="pt_img" :style="'background-image: url(' + item.thumb + ')'">
              <p class="pt_cm" v-if="item.category">{{item.category.name}}</p>
              <p class="pt_cn" v-if="item.envelope.length">互动可赚<span>￥{{item.envelope[0].battery}}</span><img src="../../../assets/img/mine/zhang.png" alt=""></p>
            </div>
            <h3>{{item.name}}</h3>
            <div class="pt-dn">
              <div class="pt-talk" v-if="item.topic"><img src="../../../assets/img/mine/icon5.png" alt="">{{item.topic.name}}</div>
              <div v-else></div>
              <div class="pt-price">￥{{item.price}}</div>
            </div>
            <div class="pt_info">
              <img :src="item.user_info.avatar" class="fl">
              <div class="fl">
                <h5>{{item.user_info.nickname}}<span>距离您 {{item.length}}km</span></h5>
                <h5>{{item.update}}更新</h5>
              </div>
              <div class="fr" v-if="!item.collect_user" @click.stop="collect(item.user_info, 0, i)">关注<img src="../../../assets/img/mine/jia.png" alt=""></div>
              <div class="fr" v-else @click.stop="collect(item.user_info, 1, i)">已关注</div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="pox" v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <div class="item" v-for="(item,i) in list" :key="i" @click="goDetail(item.id)">
          <div class="left">
            <img :src="item.thumb" alt="" style="height: 100%;">
            <img src="../../../assets/img/mine/bo.png" alt="" class="bo">
          </div>
          <div class="right">
            <div class="title">{{item.name}}</div>
            <div class="mcenter">
              <div class="ct"><img src="../../../assets/img/mine/huo2.png" alt="">{{item.hit_gem}}</div>
              <div class="ct"><img src="../../../assets/img/mine/hu.png" alt="">{{item.likes_count}}</div>
            </div>
            <div class="bottom"><img src="../../../assets/img/mine/icon4.png" alt="">互助可赚<span>￥{{item.envelope.battery}}</span></div>
          </div>
        </div>
      </div>
      <div class="noSearch" v-if="show"><img src="../../../assets/img/mine/noSearch.png" alt=""></div>
    </div>
    <div class="zantui" v-if="zantuiShow" @click.stop="zantuiShow = false">
      <div class="bx">
        <div class="title">为我们助力吧</div>
        <div class="base">您的推荐将让我们有更多地曝光机会</div>
        <div class="bt" @click.stop="zant(zt.zantui.price1)">支付{{zt.zantui.price1}}经验宝石</div>
      </div>
    </div>
  </div>
</template>

<script>
import mSearch from "../../../components/home/mSearch.vue";
import tablist from "../../../components/home/tablist.vue";
import { mapState, mapActions } from "vuex";
import {
  getServiceList,
  getInvestmentList,
  getFinancingList,
  getDispatchList,
  getTransferList,
  getCourseList,
  getSkillList,
  getGemStore,
  getSysconfig,
  getLikeStore,
  getContentRanking,
  getCollectStore,
  getCollectDestroy
} from "../../../api/buddy.js";
export default {
  components: {
    mSearch,
    tablist
  },
  data() {
    return {
      text: "",
      tabListIndex: 0,
      tabList: [
        { name: "服务", num: "" },
        { name: "派单", num: "" },
        { name: "转让", num: "" },
        { name: "投资", num: "" },
        { name: "融资", num: "" },
        { name: "公开课", num: "" },
        { name: "技能", num: "" }
      ],
      wrapperHeight: "",
      list: [],
      page: 1,
      show: false,
      loading: false,
      totalPage: "",
      zt: "",
      zantuiShow: false,
      zantuiId: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  async mounted() {
    this.text = this.$route.params.keyworder;
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    this.getData();
  },
  methods: {
    // 跳转详情页
    goDetail(id) {
      var that = this;
      switch (this.tabListIndex) {
        case 0:
          // that.$router.push("/detail/server?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 1:
          // that.$router.push("/detail/investment?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 2:
          // that.$router.push("/detail/financing?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 3:
          // that.$router.push("/detail/dispatch?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 4:
          // that.$router.push("/detail/transfer?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 5:
          // that.$router.push("/detail/public?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 6:
          // that.$router.push("/detail/skill?id=" + id);
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        default:
          break;
      }
    },
    // 加载更多
    loadMore() {
      this.loading = true;
      if (this.page < this.totalPage) {
        this.page = this.page + 1;
        this.loading = true;
        this.getData();
      } else if (this.page === this.totalPage) {
        this.$Toast({
          message: "到底啦",
          duration: 2000
        });
      }
    },
    // 首次获取数据
    async getData() {
      !this.token && (await this.getToken());
      this.show = false;
      var that = this;
      var params = {
        token: this.token,
        type: 1,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        keyword: this.text,
        page: this.page,
        per_page: 10
      };
      that.$Indicator.open("加载中...");
      var res = null;
      switch (this.tabListIndex) {
        case 0:
          res = await getServiceList(params);
          break;
        case 1:
          res = await getInvestmentList(params);
          break;
        case 2:
          res = await getFinancingList(params);
          break;
        case 3:
          res = await getDispatchList(params);
          break;
        case 4:
          res = await getTransferList(params);
          break;
        case 5:
          res = await getCourseList(params);
          break;
        case 6:
          res = await getSkillList(params);
          break;
        default:
          break;
      }
      try {
        if (res.error_code === 0) {
          var data = res.data.data;
          that.totalPage = res.data.last_page;
          that.$Indicator.close();
          for (var i = 0; i < data.length; i++) {
            // 计算当前时间
            var now = new Date();
            var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
            var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            data[i].updated_at = data[i].updated_at.replace(/-/g, "/");
            data[i].update = that.getDays(data[i].updated_at, nowDay);
            that.list.push(data[i]);
          }
          if (that.list.length === 0) {
            that.show = true;
          }
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    // 用户确认事件
    keyFim() {
      this.page = 1;
      this.list = [];
      this.getData();
    },
    // 用户输入事件
    keyDwon(e) {
      this.text = e;
    },
    // 切换
    onTab(index) {
      this.tabListIndex = index;
      this.page = 1;
      this.list = [];
      this.getData();
    },
    // 计算两日期相差天数
    getDays(dateString, nowDate) {
      var startDate = Date.parse(dateString);
      var endDate = Date.parse(nowDate);
      var days = parseInt((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
      if (days <= 0) {
        return "几秒前";
      } else if (days === 1) {
        return "今天";
      } else if (days > 1 && days < 3) {
        return "一天前";
      } else if (days > 3 && days < 7) {
        return "三天前";
      } else if (days > 7 && days < 30) {
        return "七天前";
      } else if (days > 30) {
        return "一个月前";
      }
      return days;
    },
    // 关注0和取消1按钮
    async collect(user, index, cur) {
      var that = this;
      var params = {
        token: that.token,
        user_id: user.user_id
      };
      var res = null;
      that.$Indicator.open("加载中...");
      switch (index) {
        case 0:
          res = await getCollectStore(params);
          break;
        case 1:
          res = await getCollectDestroy(params);
          break;
        default:
          break;
      }
      try {
        if (res.error_code === 0) {
          setTimeout(function() {
            that.$Toast({
              message: index ? "已取消关注" : "关注成功",
              duration: 1500
            });
            if (that.list[cur].collect_user === 1) {
              that.list[cur].collect_user = 0;
            } else {
              that.list[cur].collect_user = 1;
            }
            that.$Indicator.close();
          }, 500);
        } else {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          console.log(res.error_msg);
          that.$Indicator.close();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 打榜
    async hit(item) {
      var rink = await this.getRank();
      var type = null;
      switch (this.tabListIndex) {
        case 0:
          type = "services";
          break;
        case 1:
          type = "investments";
          break;
        case 2:
          type = "financings";
          break;
        case 3:
          type = "dispatches";
          break;
        case 4:
          type = "transfers";
          break;
        case 5:
          type = "courses";
          break;
        case 6:
          type = "skills";
          break;
        default:
          break;
      }
      this.$bridge.call("router_app", {
        type: "app_share",
        share_type: 2,
        content_id: item.id,
        content_type: type,
        service_thumb: item.thumb,
        service_name: item.name,
        service_ranking: rink
      });
    },
    // 添加鼓掌的接口
    async store(tapindex, id, index) {
      var that = this;
      var params = null;
      if (tapindex === 0) {
        params = { token: that.token, service_id: id };
      } else if (tapindex === 1) {
        params = { token: that.token, investment_id: id };
      } else if (tapindex === 2) {
        params = { token: that.token, financing_id: id };
      } else if (tapindex === 3) {
        params = { token: that.token, dispatch_id: id };
      } else if (tapindex === 4) {
        params = { token: that.token, transfer_id: id };
      } else if (tapindex === 5) {
        params = { token: that.token, course_id: id };
      } else if (tapindex === 6) {
        params = { token: that.token, skill_id: id };
      }
      that.$Indicator.open("加载中...");
      var res = await getLikeStore(params);
      try {
        if (res.error_code === 0) {
          setTimeout(function() {
            that.$Toast({
              message: "鼓掌成功",
              duration: 1500
            });
            that.list[index].likes_count = that.list[index].likes_count + 1;
            that.$Indicator.close();
          }, 500);
        } else {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          that.$Indicator.close();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 赞推
    async zhantui(id) {
      await this.getSysfig();
      this.zantuiShow = true;
      this.zantuiId = id;
    },
    // 赞推付款
    async zant(price) {
      var that = this;
      var params = {
        token: this.token,
        gem: price
      };
      switch (this.tabListIndex) {
        case 0:
          params.service_id = this.zantuiId;
          break;
        case 1:
          params.investment_id = this.zantuiId;
          break;
        case 2:
          params.financing_id = this.zantuiId;
          break;
        case 3:
          params.dispatch_id = this.zantuiId;
          break;
        case 4:
          params.transfer_id = this.zantuiId;
          break;
        case 5:
          params.course_id = this.zantuiId;
          break;
        case 6:
          params.skill_id = this.zantuiId;
          break;
        default:
          break;
      }
      var res = await getGemStore(params);
      try {
        if (res.error_code === 0) {
          that.zantuiShow = false;
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id === this.zantuiId) {
              this.list[i].gem_count = this.list[i].gem_count + 1;
            }
          }
        } else {
          that.zantuiShow = false;
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取系统常量-赞推
    async getSysfig() {
      var params = {
        type: "yinliu_xiaohaolujing",
        id: 3
      };
      var res = await getSysconfig(params);
      try {
        if (res.error_code === 0) {
          this.zt = JSON.parse(res.data.data[0].json);
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 排名
    async getRank() {
      var params = {
        service_id: this.id
      };
      var res = await getContentRanking(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          var rink = data.ranking;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
      return rink;
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .result {
    height: 100vh;
    width: 100%;
    .zantui{
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0,0,0,.4);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 101;
      .bx{
        width: 5.688888rem;
        // height: 5.688888rem;
        background-color: #FFFFFF;
        border-radius: 0.266666rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        .bt{
          width: 3.555555rem;
          height: 0.933333rem;
          line-height: 0.933333rem;
          background-image: url(../../../assets/img/buddy/bt.png);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          text-align: center;
          color: #FFFFFF;
          margin: 0 auto;
          margin-top: 1.6rem;
          margin-bottom: 0.533333rem;
        }
        .base{
          font-size: 0.266666rem;
          color: #9C9EB9;
          padding-top: 0.337777rem;
        }
        .title{
          font-size: 0.373333rem;
          color: #2D3142;
          padding-top: 1.635555rem;
          line-height: 1;
        }
      }
    }
    .tops{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 340px;
    }
    .body{
      position: fixed;
      left: 0;
      top: 340px;
      width: 100%;
      overflow-y: auto;
    }
    .headbg{
      background-color: #FFFFFF;
    }
    .tablist{
      background-color: #FFFFFF;
    }
    .noSearch{
      width: 53%;
      margin: 0 auto;
      margin-top: 3.555555rem;
      img{
        width: 100%;
      }
    }
    .pox{
      width: 100%;
      padding-right: 4%;
      background-color: #F4F5FC;
      .item{
        display: flex;
        background-color: #FFFFFF;
        margin-bottom: 0.355555rem;
        box-shadow: 0 0.088888rem 0.177777rem 0 rgba(64,117,205,0.08);
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        .right{
          flex: 1;
          padding-left: 0.444444rem;
          padding-top: 0.444444rem;
          .bottom{
            width: 2.248888rem;
            height: 0.533333rem;
            background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
            border-radius:0 0.266666rem 0.266666rem 0.106666rem;
            font-size: 0.231111rem;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.533333rem;
            margin-top: 0.355555rem;
            img{
              width: 0.32rem;
              vertical-align: middle;
              margin-right: 0.088888rem;
            }
            span{
              font-size: 0.32rem;
            }
          }
          .mcenter{
            margin-top: 0.4rem;
            .ct{
              display: inline-block;
              font-size: 0.266666rem;
              color: #9C9EB9;
              line-height: 1;
              &:nth-of-type(2){
                margin-left: 0.711111rem;
              }
              img{
                width: 0.32rem;
                margin-right: 0.133333rem;
                vertical-align: middle;
              }
            }
          }
          .title{
            width: 70%;
            font-size: 0.373333rem;
            color: #2D3142;
            line-height: 0.533333rem;
          }
        }
        .left{
          width: 3.324444rem;
          height: 3.324444rem;
          position: relative;
          overflow: hidden;
          border-top-right-radius: 0.8rem;
          border-bottom-right-radius: 0.8rem;
          .bo{
            width: 0.888888rem;
            position: absolute;
            right: 0.222222rem;
            bottom: 0.222222rem;
          }
          img{
            width: 100%;
          }
        }
      }
    }
    .box {
      width: 94%;
      margin: 0 auto;
      .pt_service {
        border-bottom: .03rem solid #EDEDF7;
        overflow: hidden;
        padding-top: 0.533333rem;
        &:last-child{
          margin-bottom: 0.266666rem;
        }
        .fl {
          width: 15%;
          text-align: center;
          float: left;
          p {
            font-size: 0.266666rem;
            padding-top: 1.45rem;
            background: url(../../../assets/img/mine/icon1.png) center 0 no-repeat;
            color: #9C9EB9;
            background-size: cover;
            margin-bottom: 0.2rem;
          }
          p:nth-of-type(2) {
            background-image: url(../../../assets/img/mine/icon2.png)
          }
          p:nth-of-type(3) {
            background-image: url(../../../assets/img/mine/icon3.png)
          }
        }
        .fr {
          width: 80%;
          float: right;
          .pt-dn {
            align-items: center;
            justify-content: space-between;
            display: flex;
            .pt-price{
              font-size: 0.533333rem;
              color: #F77777;
            }
            .pt-talk {
              font-size: 0.32rem;
              height: 0.746666rem;
              line-height: 0.746666rem;
              text-align: center;
              background-color: rgba(114, 101, 227, .05);
              border-radius: 0.373333rem;
              padding: 0 40px;
              img {
                width: 0.373333rem;
                vertical-align: middle;
                margin-right: 0.115555rem;
              }
            }
          }
          .pt_img {
            height: 6rem;
            position: relative;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            p:nth-of-type(1) {
              width: 2.026666rem;
              height: 0.586666rem;
              background: rgba(255, 168, 43, 1);
              border-radius: 0px 0.293333rem 0.293333rem 0px;
              line-height: 0.586666rem;
              color: #fff;
              text-align: center;
              font-size: 0.373333rem;
              position: absolute;
              top: 0.355555rem;
            }
            p:nth-of-type(2) {
              width: 2.248888rem;
              height: 0.533333rem;
              background: #8963e9;
              color: #fff;
              text-align: center;
              background-size: .48rem;
              line-height: 0.533333rem;
              border-radius: .3rem 0 0 .3rem;
              position: absolute;
              right: 0;
              bottom: 0;
              font-size: 0.213333rem;
              span {
                font-size: 0.32rem;
              }
              img {
                width: 0.328888rem;
                margin-left: 0.088888rem;
                vertical-align: sub;
              }
            }
          }
          h3 {
            font-size: 0.373333rem;
            margin: 0.328888rem 0;
          }
          h4 {
            width: 2.293333rem;
            height: 0.746666rem;
            color: #7265E3;
            line-height: 0.746666rem;
            padding-left: 1rem;
            background-color: rgba(114, 101, 227, .07);
            border-radius: 0.373333rem;
            text-align: center;
            span {
              color: #F77777;
              font-size: .7rem;
              margin-left: auto;
            }
          }
          .pt_info {
            margin-top: 0.266666rem;
            padding-bottom: 0.533333rem;
            .clear{
              clear: both;
            }
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              background-color: #dad6ff;
            }
            div {
              width: 50%;
              text-align: left;
              margin-left: .26rem;
              h5:nth-of-type(1) {
                background-image: none;
                font-size: 0.32rem;
                color: #2D3142;
                font-weight: 600;
                line-height: 1;
                padding-top: 0.1rem;
                padding-bottom: 0.1rem;
                span {
                  font-size: 0.266666rem;
                  color: #7265E3;
                  margin-left: .2rem;
                }
              }
              h5:nth-of-type(2) {
                line-height: 1;
                font-size: 0.266666rem;
                color: #9C9EB9;
                font-weight: normal;
              }
            }
            .fr {
              width: 1.6rem;
              height: 0.711111rem;
              border: 0.026666rem solid #7265E3;
              color: #7265E3;
              border-radius: 0.355555rem;
              text-align: center;
              font-size: 0.32rem;
              line-height: 0.711111rem;
              img{
                width: 0.186666rem;
                height: 0.186666rem;
                vertical-align: middle;
                margin-left: 0.088888rem;
              }
            }
          }
        }
      }
    }
  }
</style>
