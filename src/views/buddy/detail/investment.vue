<template>
  <!-- 投资详情 -->
  <div class="server">
    <div class="bg" :style="'background-image: url('+body.thumb+')'">
      <i class="back"></i>
      <head-nav :title="'投资详情'" :navShow="false" :titleColor="'#FFFFFF'">
        <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHead.png" alt=""></div>
        <div slot="header" class="headRight" @click="guzhang"><img src="../../../assets/img/buddy/hrand.png" alt=""></div>
      </head-nav>
      <div class="h1">{{body.name}}</div>
    </div>
    <div class="top">
      <div class="box">
        <div class="centers">
          <div class="title">￥{{body.price}}</div>
          <div class="hd" v-if="body.envelope.length !== 0">互助可赚<span>￥{{body.envelope[0].battery}}</span><img src="../../../assets/img/mine/icon4.png" alt=""></div>
        </div>
      </div>
      <div class="user">
        <div class="pox">
          <div class="userImg"><img :src="body.user_info.avatar" alt=""></div>
          <div class="userName">
            <div class="name">{{body.user_info.nickname}}<span>距离您 {{body.length}}km</span></div>
            <div class="dayTime">{{body.update}}更新</div>
          </div>
          <div class="userMiny" v-if="!body.collect_user" @click.stop="collect(body, body.id, 0)">关注<img src="../../../assets/img/mine/jia.png" alt=""></div>
          <div class="userMiny" v-else @click.stop="collect(body, body.id, 1)">已关注</div>
        </div>
      </div>
      <div class="int">
        <!-- <div class="item">
          <div class="left">投资区域</div>
          <div class="right"></div>
        </div> -->
        <div class="item" v-if="body.category">
          <div class="left">投资类型</div>
          <div class="right">{{body.category.name}}</div>
        </div>
      </div>
    </div>
    <div class="deNav">
      <div class="li" :class="active===item.id?'active':''" @click="scrollTo(item.id)" v-for="(item, i) in lists" :key="i"><span>{{item.name}}</span></div>
    </div>
    <!-- 滚动区域 -->
    <div class="scroller">
      <div>
        <div class="conent">
          <div class="title"><i></i>投资描述</div>
        </div>
        <!-- <div class="base"> -->
          <!-- <div class="hd" :style="'width:' + width1 + 'px'">
            <div class="item width1 clearfix" v-for="(img, i) in body.pic" :key="i">
              <div class="pt">
                <div class="banner" :style="'background-image: url('+img.url+')'"></div>
              </div>
            </div>
          </div> -->
          <!-- <div class="photo">
            <div class="item"><img :src="img.url" alt="" v-for="(img, i) in body.pic" :key="i"></div>
          </div> -->
        <!-- </div> -->
        <div class="des" :class="!moreShow?'hide':''" v-html="body.desc"></div>
        <div class="more" @click="moreShow = true" v-if="!moreShow">展开更多<img src="../../../assets/img/buddy/moreDown.png" alt=""></div>
        <div class="more" @click="moreShow = false" v-else>收回<img src="../../../assets/img/buddy/moreup.png" alt=""></div>
      </div>
      <div>
        <div class="conent mt">
          <div class="title"><i></i>投资要求</div>
        </div>
        <div class="des" :class="!moreShow2?'hide':''" v-html="body.claim"></div>
        <div class="more" @click="moreShow2 = true" v-if="!moreShow2">展开更多<img src="../../../assets/img/buddy/moreDown.png" alt=""></div>
        <div class="more" @click="moreShow2 = false" v-else>收回<img src="../../../assets/img/buddy/moreup.png" alt=""></div>
      </div>
      <div>
        <div class="conent mt">
          <div class="title"><i></i>视频介绍</div>
        </div>
        <div class="myPlayer">
          <div class="prism-player" id="player-con"></div>
        </div>
      </div>
      <div>
        <div class="conent mt">
          <div class="title"><i></i>服务保障</div>
        </div>
        <div class="tea">
          <img :src="bz.fileUrl" alt="" class="deImg">
        </div>
      </div>
    </div>
    <!-- 滚动区域end -->
    <div class="complaint">
      <div class="ft">
        <span>办理服务前请勿付定金、押金等费用！</span>
        <span>请先确认对方资质，谨防上当受骗！</span>
      </div>
      <div class="fi" @click="goPlaint">
        <div class="tousu"><img src="../../../assets/img/buddy/tousu.png" alt=""></div>
        <div class="ts">投诉</div>
      </div>
    </div>
    <div class="ic"></div>
    <div class="myFooter">
      <div class="sFoot">
        <div class="left">
          <div class="item" @click="zantuiShow = true">
            <div class="tapicon"><img src="../../../assets/img/buddy/tapIcon1.png" alt=""></div>
            <div class="fts">赞推</div>
          </div>
          <div class="item" @click="hit">
            <div class="tapicon"><img src="../../../assets/img/buddy/tapIcon2.png" alt=""></div>
            <div class="fts">打榜</div>
          </div>
          <div class="item" @click="goOrder">
            <div class="tapicon"><img src="../../../assets/img/buddy/tapIcon3.png" alt=""></div>
            <div class="fts">邀请下单</div>
          </div>
          <div class="item" @click="keyDown(body.user_collect)">
            <div class="tapicon">
              <img src="../../../assets/img/buddy/tapIcon4.png" alt="" v-if="!body.user_collect">
              <img src="../../../assets/img/buddy/tapIcon5.png" alt="" v-else>
            </div>
            <div class="fts">收藏</div>
          </div>
        </div>
        <div class="right">
          <div class="zx">咨询</div>
          <div class="yx" @click="reser(body.id)">预约下单</div>
        </div>
      </div>
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
import headNav from "../../../components/home/headNav.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import {
  getFInvestmentDetail,
  getAlivod,
  getCollectDestroy,
  getCollectStore,
  getSysconfig,
  getGemStore,
  getLikeStore,
  getUserStore,
  getUserDestroy,
  getContentRanking
} from "../../../api/buddy.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      zantuiShow: false,
      fuwuHide: false,
      moreShow: false,
      moreShow2: false,
      active: 0,
      lists: [
        { name: "投资描述", id: 0 },
        { name: "投资要求", id: 1 },
        { name: "视频介绍", id: 2 },
        { name: "服务保障", id: 3 }
      ],
      // width1: 0,
      id: "", // 当前信息详情的id
      locat: "", // 用户当前定位位置
      body: [],
      userinfo: "",
      zt: "", // 常量数据保存-赞推
      bz: "" // 常量数据保存-保障
    };
  },
  async mounted() {
    this.id = Number(this.$route.query.id);
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
    document.addEventListener("scroll", this.downScroll, true);
    await this.getData();
    this.getSysfig();
    this.getBaoZhang();
    // this.getWidth();
  },
  destroyed() {
    window.removeEventListener("scroll", this.downScroll);
    console.log("页面关闭");
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    // 收藏
    async keyDown(index) {
      var that = this;
      var res = null;
      var params = null;
      that.$Indicator.open("加载中...");
      if (index === 1) {
        params = {
          token: this.token,
          collect_content_id: this.body.collect[0].id
        };
        res = await getUserDestroy(params);
        try {
          if (res.error_code === 0) {
            setTimeout(function() {
              that.$Toast({
                message: "已取消收藏",
                duration: 1500
              });
              that.getData();
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
      } else {
        params = {
          token: this.token,
          investment_id: this.id
        };
        res = await getUserStore(params);
        try {
          if (res.error_code === 0) {
            setTimeout(function() {
              that.$Toast({
                message: "收藏成功",
                duration: 1500
              });
              that.getData();
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
      }
    },
    // 邀请下单
    goOrder() {
      this.$bridge.call("router_app", {
        type: "app_share",
        share_type: 3,
        content_id: this.id,
        content_type: "investments",
        service_thumb: this.body.thumb,
        service_name: this.body.name
      });
    },
    // 邀请打榜
    async hit() {
      var rink = await this.getRank();
      this.$bridge.call("router_app", {
        type: "app_share",
        share_type: 2,
        content_id: this.id,
        content_type: "investments",
        service_thumb: this.body.thumb,
        service_name: this.body.name,
        service_ranking: rink
      });
    },
    // 排名
    async getRank() {
      var params = {
        investment_id: this.id
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
    // 投诉
    goPlaint() {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner/complaint?type=3&id=" + this.id,
        hideNav: 1,
        immersionStatusBar: 1
      });
    },
    // 预约下单
    reser(id) {
      this.$router.push("/detail/reser?types=investments&id=" + id);
      this.$bridge.call("setNav", {
        hideNav: 1,
        immersionStatusBar: 1
      });
    },
    // 鼓掌
    async guzhang() {
      var g = this.body;
      var that = this;
      if (g.user_likes === 1) {
        that.$Toast({
          message: "请勿重复鼓掌",
          duration: 1500
        });
        return false;
      } else {
        this.body.user_likes = 1;
      }
      that.$Indicator.open("加载中...");
      var params = { token: this.token, investment_id: g.id };
      var res = await getLikeStore(params);
      try {
        if (res.error_code === 0) {
          setTimeout(function() {
            that.$Toast({
              message: "鼓掌成功",
              duration: 1500
            });
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
    // 首次获取数据
    async getData() {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        investment_id: this.id
      };
      var res = await getFInvestmentDetail(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          // 计算当前时间
          var now = new Date();
          var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
          var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
          var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
          data.updated_at = data.updated_at.replace(/-/g, "/");
          data.update = this.getDays(data.updated_at, nowDay);
          if (data.site) {
            var site = "";
            for (var k = 0; k < data.site.length; k++) {
              site += data.site[k].area + "、";
            }
            data.webCity = site.substring(0, site.length - 1);
          }
          this.getVideo(data.media);
          data.type = "investments";
          this.body = data;
          this.setContentStatus(data);
          // console.log(data);
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapMutations("buddy", ["setContentStatus"]),
    // 赞推付款
    async zant(price) {
      var that = this;
      var params = {
        token: this.token,
        gem: price,
        investment_id: this.id
      };
      var res = await getGemStore(params);
      try {
        if (res.error_code === 0) {
          that.zantuiShow = false;
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
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
    // 获取系统常量-服务保障
    async getBaoZhang() {
      var params = {
        type: "neirong_xitongbaozhang",
        id: 2
      };
      var res = await getSysconfig(params);
      try {
        if (res.error_code === 0) {
          this.bz = JSON.parse(res.data.data[0].json);
          console.log(this.bz);
        } else {
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
    // 关注0和取消1按钮
    async collect(item, id, index) {
      console.log(item);
      var that = this;
      var params = {
        token: that.token,
        user_id: item.user_info.user_id
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
            if (that.body.id === id) {
              if (index) {
                that.body.collect_user = 0;
              } else {
                that.body.collect_user = 1;
              }
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
    // 获取视频链接
    async getVideo(id) {
      var params = {
        alivod_id: id
      };
      var res = await getAlivod(params);
      try {
        if (res.error_code === 0) {
          console.log(res.data);
          this.play = res.data;
          this.getVideoLink();
        }
      } catch (err) {
        console.log(err);
      }
    },
    getVideoLink() {
      var item = this.play;
      var str = "";
      for (var i = 0; i < item.play_info.length; i++) {
        str += item.play_info[i].Definition + "=" + item.play_info[i].PlayURL + ",";
      }
      var sc = str.substring(0, str.length - 1);
      // 阿里云播放器视频功能
      let player = new window.Aliplayer({
        id: "player-con",
        source: JSON.stringify(this.getParseStr(sc, ",")),
        cover: item.video_base.CoverURL,
        width: "100%",
        height: "4.693333rem",
        "autoplay": false,
        "isLive": false,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "click",
        "showBarTime": 5000,
        "useH5Prism": true,
        components: [{
          name: "QualityComponent",
          type: window.AliPlayerComponent.QualityComponent
        },
        {
          name: "RateComponent",
          type: window.AliPlayerComponent.RateComponent
        }],
        "skinLayout": [
          {
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "H5Loading",
            "align": "cc"
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "tooltip",
            "align": "blabs",
            "x": 0,
            "y": 56
          },
          {
            "name": "thumbnail"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "playButton",
                "align": "tl",
                "x": 15,
                "y": 12
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 7
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 12
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ]
      }, function(player) {
        player.on("sourceloaded", function(params) {
          var paramData = params.paramData;
          var desc = paramData.desc;
          var definition = paramData.definition;
          player.getComponent("QualityComponent").setCurrentQuality(desc, definition);
        });
        var playerBottom = document.getElementsByClassName("prism-big-play-btn")[0];
        playerBottom.style.left = "50%";
        playerBottom.style.top = "50%";
      });
      console.log(player);
    },
    // 字符串分隔
    getParseStr(strDes, delimiter) {
      var obj = {};
      if (strDes === null || strDes === "") {
        return obj;
      }
      delimiter = delimiter || ";";
      var arr = strDes.split(delimiter);
      var k, v, sub;
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== "") {
          sub = arr[i].split("=");
          k = sub[0];
          v = sub[1];
          if (k !== "") {
            obj[k] = v;
          }
        }
      }
      return obj;
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
    // 图片左右滚动
    // getWidth() {
    //   var that = this;
    //   setTimeout(function() {
    //     var item = document.getElementsByClassName("width1");
    //     var w = 0;
    //     for (var i = 0; i < item.length; i++) {
    //       w += Math.ceil(Number(item[i].offsetWidth));
    //     }
    //     that.width1 = w;
    //   }, 400);
    // },
    // 上下锚点滚动
    downScroll() {
      const navContents = document.querySelectorAll(".scroller>div");
      const offsetTopArr = [];
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop);
      });
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n;
        }
      }
      this.active = navIndex;
    },
    scrollTo(index) {
      const targetOffsetTop = document.querySelector(`.scroller>div:nth-child(${index + 1})`).offsetTop;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const STEP = 50;
      if (scrollTop > targetOffsetTop) {
        smoothUp();
      } else {
        smoothDown();
      }
      function smoothDown() {
        if (scrollTop < targetOffsetTop) {
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothDown);
        }
      }
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  @import "../../../assets/css/alipler.css";
  .server{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
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
    .bgT{
      width: 100%;
      height: 0.008888rem;
    }
    .ic{
      width: 100%;
      height: 1.8rem;
    }
    .myFooter{
      background-color: #FFFFFF;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 10001;
      .sFoot{
        width: 92%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.355555rem 0;
        background-color: #FFFFFF;
        .right{
          width: 4.755555rem;
          line-height: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div{
            font-size: 0.32rem;
            border-radius: 0.8rem;
          }
          .zx{
            color: #7265E3;
            flex: 1;
            height: 0.8rem;
            text-align: center;
            background-color: #E0DDF5;
          }
          .yx{
            color: #FFFFFF;
            width: 2.4rem;
            height: 0.8rem;
            text-align: center;
            background:linear-gradient(122deg,rgba(139,99,230,1) 0%,rgba(97,85,204,1) 100%);
            margin-left: 0.213333rem;
          }
        }
        .left{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item{
            flex: 1;
            text-align: center;
            .fts{
              font-size: 0.248888rem;
              color: #000000;
              line-height: 1;
              padding-top: 0.088888rem;
            }
            .tapicon{
              width: 0.568888rem;
              margin: 0 auto;
              img{
                width: 100%;
              }
            }
          }
        }
      }
    }
    .complaint{
      position: relative;
      width: 92%;
      margin: 0 auto;
      padding: 0.311111rem 0;
      .fi{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        .ts{
          font-size: 0.32rem;
          color: #9C9EB9;
          padding-top: 0.142222rem;
          line-height: 1;
        }
        .tousu{
          font-size: 0;
          width: 0.426666rem;
          img{
            width: 100%;
          }
        }
      }
      .ft{
        width: 73%;
        span{
          font-size: 0.337777rem;
          color: #9C9EB9;
          display: block;
          &:first-child{
            padding-bottom: 0.133333rem;
          }
        }
      }
    }
    .works{
      width: 92%;
      margin: 0 auto;
      display: flex;
      padding-bottom: 1.333333rem;
      position: relative;
      &::after{
        content: "";
        display: inline-block;
        width: 100%;
        height: 0.026666rem;
        background-color: #EAEAEA;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .item{
        flex: 1;
        padding-right: 0.266666rem;
        .title{
          font-size: 0.382222rem;
          color: #000000;
          line-height: 1;
          padding-top: 0.204444rem;
          font-weight: 600;
        }
        .bs{
          img{
            width: 100%;
            height: 3.111111rem;
          }
        }
        &:last-child{
          padding-right: 0;
        }
      }
    }
    .tea{
      width: 92%;
      margin: 0 auto;
      border-radius: 0.088888rem;
      img{
        width: 100%;
      }
    }
    .myPlayer{
      width: 92%;
      margin: 0 auto;
      height: 4.693333rem;
      border-radius: 0.088888rem;
      position: relative;
      .deImg{
        width: 100%;
      }
    }
    .more{
      font-size: 0.32rem;
      color: #9C9EB9;
      line-height: 1;
      text-align: center;
      margin-top: 0.266666rem;
      img{
        width: 0.177777rem;
        vertical-align: middle;
        margin-left: 0.151111rem;
      }
    }
    .des{
      width: 92%;
      margin: 0 auto;
      font-size: 0.355555rem;
      color: #2D3142;
      line-height: 0.622222rem;
      padding-top: 0.177777rem;
      &.hide{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
    }
    .base{
      width: 92%;
      overflow: hidden;
      overflow-x: auto;
      margin: 0 auto;
      .photo{
        width: 100%;
        .item{
          width: 100%;
          font-size: 0;
          margin-bottom: 0.213333rem;
          img{
            width: 100%;
            overflow: hidden;
            &:first-child{
              border-top-left-radius: 0.142222rem;
              border-top-right-radius: 0.142222rem;
            }
            &:last-child{
              border-bottom-left-radius: 0.142222rem;
              border-bottom-right-radius: 0.142222rem;
            }
          }
        }
      }
      // .hd{
      //   .item{
      //     width: 3.937777rem;
      //     float: left;
      //     padding-right: 0.355555rem;
      //     &.clearfix:after{
      //       content: "";
      //       display: block;
      //       height: 0;
      //       clear:both;
      //       visibility: hidden;
      //     }
      //     &.clearfix{
      //       *zoom: 1;
      //     }
      //     &:last-child{
      //       padding-right: 0.355555rem;
      //     }
      //     .pt{
      //       background-color: #FFFFFF;
      //       border-radius: 0.088888rem;
      //       overflow: hidden;
      //       .banner{
      //         position: relative;
      //         width: 3.937777rem;
      //         height: 4.248888rem;
      //         background-repeat: no-repeat;
      //         background-position: center center;
      //         background-size: 100%;
      //       }
      //     }
      //   }
      // }
    }
    .conent{
      width: 92%;
      margin: 0 auto;
      font-weight: 600;
      &.mt{
        margin-top: 1.066666rem;
      }
      .dataImg{
        width: 100%;
      }
      .title{
        font-size: 0.444444rem;
        color: #2D3142;
        line-height: 1;
        position: relative;
        padding-bottom: 0.248888rem;
        i{
          display: inline-block;
          width: 0.062222rem;
          background-color: #7265E3;
          height: 0.408888rem;
          margin-right: 0.195555rem;
          margin-top: 0.035555rem;
        }
      }
    }
    .deNav{
      display: flex;
      margin-bottom: 0.533333rem;
      position: relative;
      width: 100%;
      border-bottom: 0.044444rem solid #EAEAEA;
      .li{
        flex: 1;
        text-align: center;
        span{
          font-size: 0.4rem;
          color: #9C9EB9;
        }
        &.active{
          transition: all 2s;
          span{
            color: #2D3142;
            display: inline-block;
            position: relative;
            padding-bottom: 0.302222rem;
            &::after{
              content: "";
              display: inline-block;
              width: 100%;
              height: 0.044444rem;
              background-color: #7265E3;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
      }
    }
    .top{
      position: relative;
      top: -0.355555rem;
      border-top-right-radius: 0.266666rem;
      border-top-left-radius: 0.266666rem;
      background-color: #FFFFFF;
      .int{
        width: 92%;
        margin: 0 auto;
        padding-top: 0.4rem;
        padding-bottom: 0.497777rem;
        .item{
          display: flex;
          line-height: 1;
          padding-bottom: 0.4rem;
          .left{
            font-size: 0.32rem;
            font-weight: 600;
            color: #2D3142;
            width: 1.777777rem;
          }
          .right{
            width: 60%;
            font-size: 0.32rem;
            color: #2D3142;
            font-weight: 300;
            &.fuwuhide{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .user{
        width: 92%;
        margin: 0 auto;
        position: relative;
        padding: 0.266666rem 0;
        .pox{
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;
          .userMiny{
            width: 1.6rem;
            height: 0.72rem;
            text-align: center;
            line-height: 0.72rem;
            font-size: 0.32rem;
            color: #7265E3;
            border-radius: 0.72rem;
            border: 0.026666rem solid #7265E3;
            img{
              width: 0.186666rem;
              margin-bottom: 0.035555rem;
              margin-left: 0.115555rem;
            }
          }
          .userName{
            flex: 1;
            text-align: left;
            .dayTime{
              font-size: 0.266666rem;
              color: #9C9EB9;
              padding-top: 0.16rem;
            }
            .name{
              font-size: 0.4rem;
              color: #2D3142;
              span{
                font-size: 0.266666rem;
                color: #7265E3;
                margin-left: 0.213333rem;
              }
            }
          }
          .userImg{
            width: 1.173333rem;
            height: 1.173333rem;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 0.284444rem;
            font-size: 0;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        &::after{
          content: "";
          width: 100%;
          height: 0.026666rem;
          background-color: #EAEAEA;
          position: absolute;
          left: 0;
          bottom: 0;
          display: inline-block;
        }
      }
      .box{
        width: 92%;
        margin: 0 auto;
        position: relative;
        &::after{
          content: "";
          width: 100%;
          height: 0.026666rem;
          background-color: #EAEAEA;
          position: absolute;
          left: 0;
          bottom: 0;
          display: inline-block;
        }
        .centers{
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;
          padding: 0.391111rem 0;
          .hd{
            // width: 2.248888rem;
            height: 0.533333rem;
            line-height: 0.533333rem;
            background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
            border-top-left-radius: 0.266666rem;
            border-bottom-left-radius: 0.266666rem;
            border-bottom-right-radius: 0.106666rem;
            font-size: 0.231111rem;
            color: #FFFFFF;
            text-align: center;
            padding: 0 0.355555rem;
            img{
              width: 0.328888rem;
              vertical-align: middle;
              margin-left: 0.151111rem;
            }
            span{
              font-size: 0.32rem;
            }
          }
          .title{
            font-size: 0.533333rem;
            color: #F77777;
          }
        }
      }
    }
    .bg{
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      width: 100%;
      height: 6.933333rem;
      position: relative;
      .h1{
        font-size: 0.64rem;
        color: #FFFFFF;
        line-height: 1;
        position: absolute;
        bottom: 1.102222rem;
        left: 4%;
      }
      .headRight{
        width: 0.568888rem;
        height: 0.568888rem;
        font-size: 0;
        img{
          width: 100%;
          vertical-align: top;
        }
      }
      .back{
        width: 100%;
        height: 6.933333rem;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.4);
      }
    }
  }
</style>
