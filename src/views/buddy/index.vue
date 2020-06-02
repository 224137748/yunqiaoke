<template>
  <div class="buddy">
    <div ref="top">
      <div class="head">
        <div class="headLeft" @click="toNews"><img src="../../assets/img/buddy/xiaoxi.png" alt=""></div>
        <div class="title">伙伴</div>
        <div class="headRight" @click="toMine" :style="'background-image: url('+userInfo.get_user_info.avatar+')'"></div>
      </div>
      <div class="bTabList">
        <div class="left" @click="getGoCity">{{locat.city}}<img src="../../assets/img/buddy/addDown.png" alt=""></div>
        <div class="center">
          <tablist :tabList="tabList" :scroll="false" :indexs="tabListIndex" :itemClassFrist="'tabItem'" :heightActive="0.853333" @getIndex="onTab" class="makeMe-tablist"></tablist>
        </div>
        <div class="right" @click="goList">全部分类</div>
      </div>
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div>
          <div @click="searchTap">
            <m-search :value="text" :qxShow="false" :disabled="true" :qxTop="false" @gokeyDown="keyDwon" class="headbg"></m-search>
          </div>
          <div class="buddySwipe" v-if="banner.length">
            <mt-swipe :auto="3000">
              <mt-swipe-item class="swipeImg" :style="'background-image: url('+item.pic+')'" v-for="(item,i) in banner" :key="i"></mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="box">
            <div v-if="body.length">
              <div class="pt_service" v-for="(item,i) in body" :key="i" @click.stop="goDetail(tabListIndex, item.id)">
                <div class="fl">
                  <p @click.stop="zhantui(item.id)">赞推({{item.gem_count}})</p>
                  <p @click.stop="store(tabListIndex, item.id, 1)">鼓掌({{item.likes_count}})</p>
                  <p @click.stop="hit(item)">打榜({{item.hit_gem}})</p>
                </div>
                <div class="fr">
                  <div class="pt_img" :style="'background-image: url(' + item.thumb + ')'">
                    <p class="pt_cm" v-if="item.category">{{item.category.name}}</p>
                    <p class="pt_cn" v-if="item.envelope.length">互动可赚<span>￥{{item.envelope[0].battery}}</span><img src="../../assets/img/mine/zhang.png" alt=""></p>
                  </div>
                  <h3>{{item.name}}</h3>
                  <div class="pt-dn">
                    <div class="pt-talk" v-if="item.topic"><img src="../../assets/img/mine/icon5.png" alt="">{{item.topic.name}}</div>
                    <div v-else></div>
                    <div class="pt-price">￥{{item.price}}</div>
                  </div>
                  <div class="pt_info">
                    <img :src="item.user_info.avatar" class="fl">
                    <div class="fl">
                      <h5>{{item.user_info.nickname}}<span>距离您 {{item.length}}km</span></h5>
                      <h5>{{item.update}}更新</h5>
                    </div>
                    <div class="fr" v-if="!item.collect_user" @click.stop="collect(item.user_info, 0, 0)">关注<img src="../../assets/img/mine/jia.png" alt=""></div>
                    <div class="fr" v-else @click.stop="collect(item.user_info, 1, 0)">已关注</div>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div v-else>没有数据</div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div>
      <div class="p2" v-if="show">
        <div class="tui">
          <div class="flex">
            <div class="title">推荐伙伴</div>
            <div class="more">查看更多</div>
          </div>
          <div class="base">
            <div class="hd" :style="'width:' + width1 + 'px'">
              <div class="item width1" v-for="(item,i) in tui" :key="i">
                <div class="pt">
                  <div class="banner" :style="'background-image: url('+item.use_pic.url+')'">
                    <i></i>
                    <div class="tapImg"><img :src="item.user_info.avatar" alt=""></div>
                    <div class="name">{{item.user_info.nickname}}</div>
                    <div class="short">为你推荐</div>
                  </div>
                  <div class="tapBd" v-if="item.course">
                    <div class="bItem" v-for="(pic,index) in item.course" :key="index" :style="'background-image: url('+pic.thumb+')'"></div>
                  </div>
                  <div class="bottom" @click="collect(item.user_info, 0, 1)" v-if="!item.user_collection_count">关注</div>
                  <div class="bottom" @click="collect(item.user_info, 1, 1)" v-else>已关注</div>
                </div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="ad">
          <div class="title">马上成为技能达人</div>
          <div class="imgFex">
            <div @click="$router.push('/publish/lesson-type')"><img src="../../assets/img/buddy/index1.png" alt=""></div>
            <div @click="$router.push('/publish/skill-type')"><img src="../../assets/img/buddy/index2.png" alt=""></div>
          </div>
        </div>
        <div class="tui">
          <div class="flex">
            <div class="title">推荐话题</div>
            <div class="more">查看更多</div>
          </div>
          <div class="base">
            <div class="hd" :style="'width:' + width2 + 'px'">
              <div class="item width2">
                <div class="pt">
                  <div class="banner" style="background-image: url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg);">
                    <i></i>
                    <div class="tapImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
                    <div class="name">段鹏达的达</div>
                    <div class="short">为你推荐</div>
                  </div>
                  <div class="tapBd">
                    <div class="bItem" style="background-image: url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg);"></div>
                    <div class="bItem" style="background-image: url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg);"></div>
                    <div class="bItem" style="background-image: url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg);"></div>
                  </div>
                  <div class="bottom">关注</div>
                </div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="box navBottom" v-if="allLoaded">
        <div class="pt_service" v-for="(item,i) in pageBody" :key="i" @click.stop="goDetail(tabListIndex, item.id)">
          <div class="fl">
            <p @click.stop="zhantui(item.id)">赞推({{item.gem_count}})</p>
            <p @click.stop="store(tabListIndex, item.id)">鼓掌({{item.likes_count}})</p>
            <p @click.stop="hit(item)">打榜({{item.hit_gem}})</p>
          </div>
          <div class="fr">
            <div class="pt_img" :style="'background-image: url(' + item.thumb + ')'">
              <p class="pt_cm" v-if="item.category">{{item.category.name}}</p>
              <p class="pt_cn" v-if="item.envelope.length">互动可赚<span>￥{{item.envelope[0].battery}}</span><img src="../../assets/img/mine/zhang.png" alt=""></p>
            </div>
            <h3>{{item.name}}</h3>
            <div class="pt-dn">
              <div class="pt-talk" v-if="item.topic"><img src="../../assets/img/mine/icon5.png" alt="">{{item.topic.name}}</div>
              <div v-else></div>
              <div class="pt-price">￥{{item.price}}</div>
            </div>
            <div class="pt_info">
              <img :src="item.user_info.avatar" class="fl">
              <div class="fl">
                <h5>{{item.user_info.nickname}}<span>距离您 {{item.length}}km</span></h5>
                <h5>{{item.update}}更新</h5>
              </div>
              <div class="fr" v-if="!item.collect_user" @click.stop="collect(item.user_info, 0, 0)">关注<img src="../../assets/img/mine/jia.png" alt=""></div>
              <div class="fr" v-else @click.stop="collect(item.user_info, 1, 0)">已关注</div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div v-if="pageShow">没有数据</div>
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
import tablist from "../../components/home/tablist.vue";
import mSearch from "../../components/home/mSearch.vue";
import { mapState, mapActions } from "vuex";
import { getUserInfor } from "@/api/user";
import {
  getServiceList,
  getInvestmentList,
  getFinancingList,
  getDispatchList,
  getTransferList,
  getCourseList,
  getSkillList,
  getSiteList,
  getBannerList,
  getCollectStore,
  getCollectDestroy,
  getGemStore,
  getLikeStore,
  getSysconfig,
  getContentRanking
  // getTopicList
} from "../../api/buddy.js";
export default {
  components: {
    tablist,
    mSearch
  },
  data() {
    return {
      tabListIndex: 0,
      tabList: [
        { name: "服务", num: "" },
        { name: "投资", num: "" },
        { name: "融资", num: "" },
        { name: "派单", num: "" },
        { name: "转让", num: "" },
        { name: "公开课", num: "" },
        { name: "技能", num: "" }
      ],
      text: "",
      show: false,
      width1: 0,
      width2: 0,
      timer: "", // 节流函数
      locat: "", // 从原生中拿到的位置信息
      body: "1", // 后台返回数据
      tui: "", // 推荐用户列表
      banner: "",
      userInfo: "",
      allLoaded: false,
      page: 2,
      pageShow: false,
      pageBody: [],
      zt: "",
      zantuiShow: false,
      zantuiId: ""
    };
  },
  activated() {
    // if(this.$store.state.buddy.buddyAddres)
    if (this.$store.state.buddy.buddyAddres.length !== 0) {
      // console.log(this.$store.state.buddy.buddyAddres);
      this.locat.city = this.$store.state.buddy.buddyAddres.city;
      this.locat.latitude = this.$store.state.buddy.buddyAddres.lat;
      this.locat.longitude = this.$store.state.buddy.buddyAddres.lng;
      this.getData(this.tabListIndex);
    } else {
      // console.log("空了");
    }
    // console.log("来了");
  },
  async mounted() {
    document.addEventListener("scroll", this.scroll, true);
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
    await this.getData(0);
    this.getBanner();
    this.getTui();
    this.getUser();
    this.getSysfig();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    // 赞推
    zhantui(id) {
      this.zantuiShow = true;
      this.zantuiId = id;
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
          for (var i = 0; i < this.body.length; i++) {
            if (this.body[i].id === this.zantuiId) {
              this.body[i].gem_count = this.body[i].gem_count + 1;
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
    getGoCity() {
      this.$router.push("/partner/city");
    },
    goList() {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner/list",
        hideNav: 0,
        immersionStatusBar: 1
      });
    },
    // 跳转详情页
    goDetail(index, id) {
      var that = this;
      switch (index) {
        case 0:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 1:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 2:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 3:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 4:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 5:
          that.$bridge.call("router", {
            url: "http://yunqiaoke_h5.sinmore.vip/#/detail/server?id=" + id,
            hideNav: 1,
            immersionStatusBar: 1
          });
          break;
        case 6:
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
    toNews() {
      this.$Toast({
        message: "URL待定",
        duration: 1500
      });
    },
    toMine() {
      this.$bridge.call("router_app", {
        type: "app_mine"
      });
    },
    // 下拉加载更多数据
    loadTop() {
      var that = this;
      setTimeout(function() {
        that.$refs.loadmore.onTopLoaded();
        that.getData(that.tabListIndex, 1);
      }, 1500);
    },
    // 获取用户信息
    async getUser() {
      var res = await getUserInfor(this.token);
      try {
        if (res.error_code === 0) {
          this.userInfo = res.data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
      console.log(res);
    },
    // 添加鼓掌的接口
    async store(tapindex, id) {
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
            that.getData(that.tabListIndex);
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
            if (cur === 0) {
              that.getData(that.tabListIndex);
            } else if (cur === 1) {
              that.getTui();
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
    // 上拉加载数据
    async getDataTwo(index) {
      !this.token && (await this.getToken());
      // console.log("来了");
      var that = this;
      var params = {
        token: this.token,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        city: this.locat.city,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        page: this.page,
        per_page: 8
      };
      var res = null;
      switch (index) {
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
      var data = res.data.data;
      try {
        if (res.error_code === 0) {
          if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
              // 计算当前时间
              var now = new Date();
              var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
              var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
              var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
              data[i].updated_at = data[i].updated_at.replace(/-/g, "/");
              data[i].update = that.getDays(data[i].updated_at, nowDay);
              that.pageBody.push(data[i]);
            }
            setTimeout(function() {
              that.$Indicator.close();
            }, 500);
          } else {
            that.$Toast({
              message: "已经到底啦",
              duration: 1500
            });
            that.$Indicator.close();
            that.page = that.page - 1;
            return false;
          }
        }
        if (this.pageBody.length === 0) {
          that.$Indicator.close();
          this.pageShow = true;
        }
      } catch (err) {
        that.$Indicator.close();
        console.log(err);
      }
    },
    // 获取默认数据
    async getData(index, bd) {
      !this.token && (await this.getToken());
      // console.log("来了");
      var that = this;
      if (!bd) {
        that.$Indicator.open("加载中...");
      }
      var params = {
        token: this.token,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        city: this.locat.city,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        page: 1,
        per_page: 8
      };
      var res = null;
      switch (index) {
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
      var data = res.data.data;
      try {
        if (res.error_code === 0) {
          setTimeout(function() {
            that.$Indicator.close();
            if (data.length !== 0) {
              for (var i = 0; i < data.length; i++) {
                // 计算当前时间
                var now = new Date();
                var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
                var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
                var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                data[i].updated_at = data[i].updated_at.replace(/-/g, "/");
                data[i].update = that.getDays(data[i].updated_at, nowDay);
              }
              that.body = data;
            } else {
              that.body = [];
              that.show = true;
              setTimeout(function() {
                that.getWidth();
              }, 100);
            }
          }, 1000);
        } else {
          that.$Indicator.close();
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
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
    // 获取推荐数据
    async getTui() {
      var params = {
        token: this.token,
        site: 1
      };
      var res = await getSiteList(params);
      var data = res.data.data;
      try {
        if (res.error_code === 0) {
          if (data.length !== 0) {
            this.tui = data;
            console.log(data);
          } else {
            this.tui = [];
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取banner图
    async getBanner() {
      var params = {
        token: this.token,
        site: 3
      };
      var res = await getBannerList(params);
      var data = res.data.data;
      try {
        if (res.error_code === 0) {
          if (data.length !== 0) {
            console.log(data);
            this.banner = data;
          } else {
            this.banner = [];
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    getWidth() {
      var item1 = document.getElementsByClassName("width1");
      var item2 = document.getElementsByClassName("width2");
      var w1 = 0;
      var w2 = 0;
      for (var i = 0; i < item1.length; i++) {
        w1 += Math.ceil(Number(item1[i].offsetWidth));
      }
      for (var j = 0; j < item2.length; j++) {
        w2 += Math.ceil(Number(item2[j].offsetWidth));
      }
      this.width1 = w1;
      this.width2 = w2;
    },
    scroll() {
      var that = this;
      if (!that.show) {
        that.fnThrottle(function() {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          if (scrollTop + windowHeight + 30 > scrollHeight) {
            that.$Indicator.open("加载中...");
            that.show = true;
            setTimeout(function() {
              that.getWidth();
              that.$Indicator.close();
            }, 300);
          }
        }, 500, 2000)();
      } else {
        that.fnThrottle(function() {
          that.allLoaded = true;
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          if (scrollTop + windowHeight + 30 > scrollHeight) {
            that.$Indicator.open("加载中...");
            setTimeout(function() {
              that.getDataTwo(that.tabListIndex);
              that.page = that.page + 1;
            }, 1500);
          }
        }, 500, 2000)();
        // this.getDataTwo(this.tabListIndex);
      }
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
      this.getData(index);
      this.tabListIndex = index;
    },
    searchTap() {
      this.$router.push("/search");
    },
    keyDwon(val) {
      console.log(val);
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .buddy{
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
          background-image: url(../../assets/img/buddy/bt.png);
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
    .p2{
      width: 100%;
      .ad{
        background-color: #FFFFFF;
        padding-top: 0.604444rem;
        padding-bottom: 0.533333rem;
        .title{
          width: 92%;
          margin: 0 auto;
          font-size: 0.426666rem;
          color: #2D3142;
          line-height: 1;
          padding-bottom: 0.266666rem;
        }
        .imgFex{
          width: 92%;
          margin: 0 auto;
          display: flex;
          div{
            flex: 1;
            font-size: 0;
            img{
              width: 100%;
            }
            &:first-child{
              margin-right: 0.266666rem;
            }
          }
        }
      }
      .tui{
        background-color: #F6F5FA;
        padding-bottom: 0.533333rem;
        .base{
          width: 100%;
          overflow: hidden;
          overflow-x: auto;
          padding-left: 4%;
          .hd{
            .item{
              width: 4.266666rem;
              float: left;
              padding-right: 0.177777rem;
              &:last-child{
                padding-right: 0;
              }
              .pt{
                background-color: #FFFFFF;
                padding-bottom: 0.177777rem;
                border-radius: 0.106666rem;
                overflow: hidden;
                .bottom{
                  width: 2.426666rem;
                  height: 0.613333rem;
                  line-height: 0.613333rem;
                  font-size: 0.32rem;
                  color: #7265E3;
                  border: 0.026666rem solid #7265E3;
                  border-radius: 0.613333rem;
                  text-align: center;
                  margin: 0 auto;
                  margin-top: 0.195555rem;
                }
                .tapBd{
                  padding: 0 0.133333rem;
                  padding-top: 0.133333rem;
                  display: flex;
                  .bItem{
                    width: 33.33333%;
                    height: 1.226666rem;
                    margin-right: 0.133333rem;
                    background-repeat: no-repeat;
                    background-position: top center;
                    background-size: 100%;
                    border-radius: 0.08rem;
                    overflow: hidden;
                    &:last-child{
                      margin-right: 0;
                    }
                  }
                }
                .banner{
                  position: relative;
                  height: 3.2rem;
                  overflow: hidden;
                  background-repeat: no-repeat;
                  background-position: top center;
                  background-size: 100%;
                  .delete{
                    width: 0.177777rem;
                    height: 0.177777rem;
                    position: absolute;
                    right: 0.24rem;
                    top: 0.24rem;
                    z-index: 2;
                    font-size: 0;
                    img{
                      width: 100%;
                    }
                  }
                  .short{
                    font-size: 0.248888rem;
                    color: #FFFFFF;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                  }
                  .name{
                    font-size: 0.32rem;
                    text-align: center;
                    color: #FFFFFF;
                    line-height: 1;
                    padding-top: 0.266666rem;
                    padding-bottom: 0.177777rem;
                    position: relative;
                    z-index: 2;
                  }
                  .tapImg{
                    width: 1.093333rem;
                    height: 1.093333rem;
                    border-radius: 50%;
                    border: 0.044444rem solid #FFFFFF;
                    margin: 0 auto;
                    margin-top: 0.595555rem;
                    overflow: hidden;
                    position: relative;
                    z-index: 2;
                    img{
                      width: 100%;
                    }
                  }
                  i{
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,.5);
                    display: block;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                  }
                }
              }
            }
          }
        }
        .flex{
          margin: 0 auto;
          width: 92%;
          padding-top: 0.604444rem;
          padding-bottom: 0.266666rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .more{
            font-size: 0.32rem;
            color: #7265E3;
          }
          .title{
            font-size: 0.426666rem;
            color: #2D3142;
          }
        }
      }
    }
    .box {
      width: 92%;
      margin: 0 auto;
      &.navBottom{
        padding-bottom: 2.666666rem;
      }
      .pt_service {
        border-bottom: .03rem solid #EDEDF7;
        overflow: hidden;
        padding-top: 0.533333rem;
        .fl {
          width: 15%;
          text-align: center;
          float: left;
          p {
            font-size: 0.266666rem;
            padding-top: 1.45rem;
            background: url(../../assets/img/mine/icon1.png) center 0 no-repeat;
            color: #9C9EB9;
            background-size: cover;
            margin-bottom: 0.2rem;
          }
          p:nth-of-type(2) {
            background-image: url(../../assets/img/mine/icon2.png)
          }
          p:nth-of-type(3) {
            background-image: url(../../assets/img/mine/icon3.png)
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
              min-width: 2.293333rem;
              padding: 0 0.177777rem;
              height: 0.746666rem;
              line-height: 0.746666rem;
              text-align: center;
              background-color: rgba(114, 101, 227, .05);
              border-radius: 0.373333rem;
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
            .pt_cm {
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
            .pt_cn {
              // width: 2.248888rem;
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
              padding: 0 0.355555rem;
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
            position: relative;
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
              width: 80%;
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
              position: absolute;
              right: 0;
              bottom: 0.622222rem;
              img{
                width: 0.186666rem;
                height: 0.186666rem;
                vertical-align: middle;
                margin-bottom: 0.053333rem;
                margin-left: 0.088888rem;
                background-color: #FFFFFF;
              }
            }
          }
        }
      }
    }
    .buddySearch,.buddySwipe{
      width: 92%;
      margin: 0 auto;
    }
    .buddySwipe{
      border-radius: 0.106666rem;
      margin-top: 0.177777rem;
      margin-bottom: 0.177777rem;
      overflow: hidden;
      .mint-swipe{
        height: 1.955555rem;
        .swipeImg{
          background-repeat: no-repeat;
          background-position: top center;
          background-size: 100%;
        }
      }
    }
    .bTabList{
      width: 100%;
      height: 0.853333rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after{
        content: "";
        display: inline-block;
        width: 100%;
        height: 0.026666rem;
        background-color: #EDEDF7;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .center{
        width: 6rem;
        height: 0.853333rem;
        line-height: 0.853333rem;
        // padding-left: 0.444444rem;
        .tabItem{
          float: left;
          margin-right: 0.711111rem;
          font-size: 0.373333rem;
          font-weight: bold;
          color: #9C9EB9;
        }
      }
      .left{
        width: 1.85rem;
        text-align: left;
        font-size: 0.373333rem;
        color: #131314;
        line-height: 1;
        padding-left: 4%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        position: relative;
        img{
          width: 0.186666rem;
          margin-left: 0.177777rem;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .right{
        width: 2.133333rem;
        height: 0.853333rem;
        text-align: center;
        line-height: 0.853333rem;
        font-size: 0.373333rem;
        font-weight:500;
        color: #7265E3;
        position: relative;
        &::after{
          content: "";
          display: inline-block;
          width: 0.026666rem;
          height: 100%;
          background-color: #EDEDF7;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
    .head{
      width: 92%;
      height: 1.404444rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .title{
        width: 100%;
        font-size: 0.453333rem;
        color: #2D3142;
        line-height: 1;
        font-weight:600;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .headRight{
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        position: relative;
        z-index: 3;
      }
      .headLeft{
        width: 0.622222rem;
        img{
          width: 100%;
        }
      }
    }
    .clear{
      clear: both;
    }
  }
</style>
