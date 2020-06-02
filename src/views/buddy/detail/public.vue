<template>
  <!-- 公开课详情 -->
  <div class="public">
    <div>
      <head-nav :navShow="false" :titleColor="'#FFFFFF'" class="header">
        <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHead.png" alt=""></div>
        <div slot="header" class="headRight">
          <div class="bd" @click="guzhang"><img src="../../../assets/img/buddy/hrand.png" alt=""></div>
          <div class="bd"><img src="../../../assets/img/buddy/fen.png" alt=""></div>
        </div>
      </head-nav>
      <div>
        <div v-if="body.has_gem === 1" data-userId="vip">
          <div class="player">
            <div id="player-user"></div>
            <div id="endPreviewTemplate"></div>
          </div>
        </div>
        <div v-else>
          <div class="player">
            <div id="player-con"></div>
            <div class="player_vip" id="endPreviewTemplate">
              <div class="player_vie-bt">付费播放</div>
            </div>
          </div>
        </div>
      </div>
      <div class="deNav">
        <div class="li" :class="active===item.id?'active':''" @click="scrollTo(item.id)" v-for="(item, i) in lists" :key="i"><span>{{item.name}}</span></div>
      </div>
      <!-- 简介 -->
      <div v-show="!active">
        <div class="user">
          <div class="pox">
            <div class="userImg"><img :src="body.user_info.avatar" alt=""></div>
            <div class="userName">
              <div class="name">{{body.user_info.nickname}}<span>距离您 {{body.length}}km</span></div>
              <div class="dayTime">{{body.update}}更新</div>
            </div>
            <div class="userMiny" v-if="!body.collect_user" @click="collect(body, body.id, 0)">关注<img src="../../../assets/img/mine/jia.png" alt=""></div>
            <div class="userMiny" v-else @click.stop="collect(body, body.id, 1)">已关注</div>
          </div>
        </div>
        <div class="content">
          <div class="tapTitle">{{body.name}}</div>
          <div class="short"><img src="../../../assets/img/buddy/b1.png" alt="">{{body.view}} <img src="../../../assets/img/buddy/b2.png" alt="">{{body.creat}} <img src="../../../assets/img/buddy/b3.png" alt="">未经作者授权禁止转载</div>
          <div class="des" :class="{tap:tapShow}">
            <p>{{body.desc}}</p>
            <span v-if="!tapShow" @click="tapShow = true">收回<img src="../../../assets/img/buddy/tap4.png" alt=""></span>
            <span v-else @click="tapShow = false">展开<img src="../../../assets/img/buddy/zhan.png" alt=""></span>
          </div>
          <div class="tapRight" v-if="body.envelope.length">互助可赚￥{{body.envelope[0].battery}}<img src="../../../assets/img/mine/icon4.png" alt=""></div>
        </div>
        <div class="pt-talk" v-if="body.topic"><img src="../../../assets/img/mine/icon5.png" alt="">{{body.topic.name}}</div>
        <div class="fex">
          <div class="item" @click="guzhang">
            <div class="img"><img src="../../../assets/img/buddy/q1.png" alt=""></div>
            <div class="font">鼓掌{{body.likes_count}}</div>
          </div>
          <div class="item">
            <div class="img"><img src="../../../assets/img/buddy/q2.png" alt=""></div>
            <div class="font">收藏{{body.collect_count}}</div>
          </div>
          <div class="item">
            <div class="img"><img src="../../../assets/img/buddy/q3.png" alt=""></div>
            <div class="font">赞推{{body.gem_count}}</div>
          </div>
          <div class="item">
            <div class="img"><img src="../../../assets/img/buddy/q4.png" alt=""></div>
            <div class="font">打榜{{body.hit_gem}}</div>
          </div>
          <div class="item">
            <div class="img"><img src="../../../assets/img/buddy/q5.png" alt=""></div>
            <div class="font">热度0</div>
          </div>
        </div>
        <div class="lBack"></div>
        <div class="sen">
          <div class="sTitle">相关推荐</div>
          <div class="bd">
            <div class="item" v-for="(item, i) in recommend" :key="i">
              <div class="left" :style="'background-image: url(' + item.thumb + ')'"></div>
              <div class="right">
                <div class="title">{{item.name}}</div>
                <div class="us">
                  <img :src="item.user_info.avatar" alt="">
                  {{item.nickname}}
                </div>
                <div class="time">
                  <div class="short"><img src="../../../assets/img/buddy/b1.png" alt="">{{item.view}} <img src="../../../assets/img/buddy/b2.png" alt="">{{item.creat}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="loader" v-show="active">
        <div class="forum">
          <div class="top">
            <div class="left" :style="'background-image: url(' + work.thumb +')'"></div>
            <div class="right">
              <div class="dTitle">{{work.name}}</div>
              <div class="desc"><span>认可：{{work.gem_count}}</span><span>掌声：{{work.likes_count}}</span></div>
              <div class="case">{{work.price}}币/小时</div>
            </div>
            <div class="bdBottom">巧主在售</div>
          </div>
          <div class="plc">
            <div class="box">
              <div class="left">{{list.length}}条评论</div>
              <div class="right">
                <span :class="ative===i?'active':''" v-for="(item, i) in tap" :key="i" @click="tapList(i, item.type)">{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="nd">
            <div class="pox" v-for="(item, i) in list" :key="i">
              <div class="cd">
                <div class="bd" :style="'background-image: url('+item.user_info.avatar+')'"></div>
                <div class="hd">
                  <div class="title">{{item.user_info.nickname}}</div>
                  <div class="time">{{item.creat}}</div>
                  <div class="des">{{item.content}}</div>
                  <div class="talk" v-if="item.forumShow && item.commentList.length">
                    <div class="item" v-for="(it, index) in item.commentList" :key="index"><span>{{it.user_info.nickname}}：</span>{{it.content}}</div>
                  </div>
                  <div class="tapz">
                    <span @click="close(i)" v-if="item.forumShow">收回<img src="../../../assets/img/buddy/tap4.png" alt=""></span>
                    <span @click="open(i)" v-else>展开<img src="../../../assets/img/buddy/zhan.png" alt=""></span>
                  </div>
                </div>
                <div class="talp">
                  <span @click="good(i, item.id)"><img src="../../../assets/img/buddy/pai.png" alt="">{{item.likes}}</span>
                  <span @click="reply(i, item.user_info.nickname, item.id)"><img src="../../../assets/img/buddy/talk.png" alt="">{{item.comment_count}}</span>
                </div>
              </div>
            </div>
          </div>
          <form action="javascript:;" ref="form" class="formBox felx">
            <div class="bd" @click="takeForm">
              <input type="text" value="" placeholder="喜欢就评论" disabled />
              <div class="inputRight">
                <i></i>
                <div class="happy">😀</div>
                <div class="getbottom">发送</div>
              </div>
            </div>
          </form>
          <div v-if="!formShow" @touchmove.prevent>
            <div action="javascript:;" ref="form" class="formBox formBottom" :class="!formShow?'tapForm':''">
              <div class="bd">
                <div contenteditable="true" :data-text="placeholder" ref="myInput" autofocus @blur="anBlur" @focus="anFocus" class="textarea"></div>
                <div class="inputRight">
                  <i></i>
                  <div class="happy" @click="expresShow = !expresShow">😀</div>
                  <div class="getbottom" @click="getSend">发送</div>
                </div>
              </div>
              <div class="biao" v-if="expresShow">
                <span v-for="(item, i) in expres" :key="i" @click="tapExpres(item.name)">{{item.name}}</span>
              </div>
            </div>
            <div class="bigBox" @click="takeFormHide"></div>
          </div>
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
            <div class="yx" @click="chongdianShow = true">为TA充电</div>
          </div>
        </div>
      </div>
      <!-- 赞推 -->
      <div class="zantui" v-if="zantuiShow" @click.stop="zantuiShow = false">
        <div class="bx">
          <div class="title">为我们助力吧</div>
          <div class="base">您的推荐将让我们有更多地曝光机会</div>
          <div class="bt" @click.stop="zant(sif.zantui.price1)">支付{{sif.zantui.price1}}经验宝石</div>
        </div>
      </div>
      <!-- 为TA充电 -->
      <div class="zantui" v-if="chongdianShow" @click.stop="chongdianShow = false">
        <div class="bx">
          <div class="aTitle">喜欢我就给我充电吧~</div>
          <div class="hd">
            <div class="item" :class="cur===i?'active':''" v-for="(item,i) in sif.chongdian" :key="i" @click.stop="tabCd(i)">{{item.price}}盎司</div>
          </div>
          <div class="cdBt" @click.stop="chongdian">支付经验宝石</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headNav from "../../../components/home/headNav.vue";
import expres from "../../../components/home/expression.json";
import { mapState, mapActions } from "vuex";
import {
  getCourseList,
  getCourseDetail,
  getLikeStore,
  getCollectStore,
  getCollectDestroy,
  getGemStore,
  getSysconfig,
  getAlivod,
  getCourseBuy,
  getServiceList,
  getCourseStore,
  getForumList,
  getCourseLike,
  getUserStore,
  getUserDestroy,
  getCourseBattery,
  getContentRanking
} from "../../../api/buddy.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      chongdianShow: false,
      zantuiShow: false,
      seeEnd: false,
      tapShow: true,
      play: "", // 视频
      active: 0,
      lists: [
        { name: "简介", id: 0 },
        { name: "评论", id: 1 }
      ],
      locat: "",
      body: "", // 默认数据
      recommend: "", // 推荐数据
      sif: "", // 常量数据保存
      cur: 0,
      placeholder: "喜欢就评论",
      disForum: 1, // 1为添加评论，0为评论回复
      forumId: "", // 评论id
      index: "", // 评论列表下标
      work: "",
      tap: [
        { name: "按热度", id: 0, type: "likes" },
        { name: "按时间", id: 1, type: "created_at" }
      ],
      type: "likes",
      ative: 0,
      formShow: true,
      expresShow: false,
      expres: expres,
      page: 1,
      total: "", // 总页面数
      list: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  async mounted() {
    this.id = Number(this.$route.query.id);
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
    await this.getContent();
    this.getSysfig();
    this.getList(this.type);
    this.getHisWork();
    document.addEventListener("scroll", this.scroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    scrollTo(id) {
      this.active = id;
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
          course_id: this.id
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
        content_type: "courses",
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
        content_type: "courses",
        service_thumb: this.body.thumb,
        service_name: this.body.name,
        service_ranking: rink
      });
    },
    // 排名
    async getRank() {
      var params = {
        course_id: this.id
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
    // 上拉加载评论列表
    async getLoadList(type) {
      var params = {
        token: this.token,
        course_id: this.body.id,
        orderBy: type,
        page: this.page,
        per_page: 10
      };
      this.$Indicator.open("加载中...");
      var res = await getForumList(params);
      try {
        if (res.error_code === 0) {
          var base = res.data.data;
          if (base.length) {
            for (var i = 0; i < base.length; i++) {
              base[i].forumShow = false;
              var date = new Date(base[i].created_at);
              var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
              var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
              base[i].creat = M + D;
              this.list.push(base[i]);
            }
            this.$Indicator.close();
          } else {
            this.$Indicator.close();
            this.$Toast({
              message: "已经到底啦！",
              duration: 1500
            });
            this.page = this.page - 1;
          }
          // this.list = base;
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    scroll() {
      if (!this.active) {
        window.removeEventListener("scroll", this.scroll);
        return false;
      }
      var that = this;
      if (!that.show) {
        that.fnThrottle(function() {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          if (scrollTop + windowHeight + 30 > scrollHeight) {
            that.page = that.page + 1;
            that.getLoadList(that.type);
          }
        }, 500, 2000)();
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
    // 打开评论回复输入框
    reply(index, name, id) {
      this.formShow = false;
      this.$nextTick(function () {
        this.$refs.myInput.focus();
      });
      this.placeholder = "@" + name;
      this.disForum = 0;
      this.forumId = id;
      this.index = index;
    },
    // 评论回复展开收缩
    close(index) {
      this.list[index].forumShow = false;
    },
    open(index) {
      if (this.list[index].commentList) {
        this.list[index].forumShow = true;
        return false;
      }
      var forumId = this.list[index].id;
      this.index = index;
      this.FList(index, forumId);
    },
    // 回复评论列表
    async FList(index, forumId) {
      var params = {
        token: this.token,
        course_id: this.body.id,
        course_comment_id: forumId,
        orderBy: this.type,
        page: this.page,
        per_page: 10
      };
      this.$Indicator.open("加载中...");
      var res = await getForumList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.list[index].commentList = data.data;
          this.list[index].forumShow = true;
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
    // 排序
    tapList(index, type) {
      this.ative = index;
      this.type = type;
      this.getList(type);
    },
    // 评论点赞
    async good(index, id) {
      var params = {
        token: this.token,
        course_comment_id: id
      };
      var res = await getCourseLike(params);
      try {
        if (res.error_code === 0) {
          this.list[index].likes = this.list[index].likes + 1;
          this.$Toast({
            message: "点赞成功",
            duration: 1500
          });
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 评论列表
    async getList(type) {
      var params = {
        token: this.token,
        course_id: this.body.id,
        orderBy: type,
        page: this.page,
        per_page: 10
      };
      var res = await getForumList(params);
      try {
        if (res.error_code === 0) {
          var base = res.data.data;
          for (var i = 0; i < base.length; i++) {
            base[i].forumShow = false;
            var date = new Date(base[i].created_at);
            var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/";
            var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            base[i].creat = M + D;
          }
          this.list = base;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 发送评论
    async getSend() {
      var text = this.$refs.myInput.innerText.replace(/(^\s*)|(\s*$)/g, "");
      this.formShow = true;
      this.expresShow = false;
      if (text) {
        var params;
        if (this.disForum === 1) { // 1评论回复
          params = {
            token: this.token,
            course_id: this.body.id,
            content: text
          };
        } else { // 回请评论
          params = {
            token: this.token,
            course_id: this.body.id,
            course_comment_id: this.forumId,
            content: text
          };
        }
        var res = await getCourseStore(params);
        try {
          if (res.error_code === 0) {
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
            // this.$refs.myInput.innerText = "";
            this.formShow = true;
            this.expresShow = false;
            if (this.disForum === 1) {
              this.page = 1;
              this.getList(this.type);
            } else {
              if (this.list[this.index].commentList) {
                this.FList(this.index, this.forumId);
              }
            }
          } else if (text.length > 200) {
            this.$Toast({
              message: "评论内容不能超过200字",
              duration: 1500
            });
          } else {
            console.log(res.error_msg);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$Toast({
          message: "评论内容不能为空",
          duration: 1500
        });
      }
    },
    // 他的作品
    async getHisWork() {
      var params = {
        token: this.token,
        user_id: this.body.user_info.user_id,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        page: 1,
        per_page: 1
      };
      var res = await getServiceList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.work = data.data[0];
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 输入框跟表情拼接
    tapExpres(item) {
      this.$refs.myInput.innerText = this.$refs.myInput.innerText + item;
    },
    // 失去焦点
    anBlur() {
      // console.log("失去焦点");
    },
    // 如果有焦点就关闭表情包
    anFocus() {
      if (this.expresShow === true) {
        this.expresShow = false;
      }
    },
    // 获取焦点
    takeForm() {
      this.formShow = false;
      this.$nextTick(function () {
        this.$refs.myInput.focus();
      });
    },
    takeFormHide() {
      this.formShow = true;
    },
    // 初始数据
    async getContent() {
      var that = this;
      !this.token && (await this.getToken());
      // 获取当前设备网络状态
      // var inter = await this.$bridge.call("getNetworkStatus");
      // console.log("123456");
      // console.log(inter);
      // end
      var params = {
        token: this.token,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        course_id: this.id
      };
      var res = await getCourseDetail(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          // 计算当前时间
          var now = new Date();
          var moth = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
          var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
          var nowDay = now.getFullYear() + "/" + moth + "/" + day + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
          data.updated_at = data.updated_at.replace(/-/g, "/");
          data.update = that.getDays(data.updated_at, nowDay);
          // 计算当前时间end
          // 获取发布时间并截取
          var date = new Date(data.created_at);
          var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/";
          var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          data.creat = M + D;
          // 获取发布时间并截取end
          that.body = data;
          that.getVideo(data.media);
          that.getRecommend();
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
      var days = parseInt((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
      if (days === 0) {
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
    // 相关推荐
    async getRecommend() {
      var json = [];
      json.push(this.body.category.id);
      var params = {
        token: this.token,
        lng: this.locat.longitude,
        lat: this.locat.latitude,
        // lng: "113.8529519314236",
        // lat: "23.026370713975695",
        category_id: json,
        page: 1,
        per_page: 5
      };
      var res = await getCourseList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data.data;
          // 获取发布时间并截取
          for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].created_at);
            var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/";
            var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            data[i].creat = M + D;
          }
          // 获取发布时间并截取end
          this.recommend = data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 为TA充电
    async chongdian() {
      var params = {
        token: this.token,
        course_id: this.id,
        battery: this.sif.chongdian[this.cur].price
      };
      this.chongdianShow = false;
      this.$Indicator.open("加载中...");
      var res = await getCourseBattery(params);
      try {
        this.$Indicator.close();
        if (res.error_code === 0) {
          this.$Toast({
            message: "充电成功",
            duration: 1500
          });
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    tabCd(index) {
      this.cur = index;
    },
    // 赞推付款
    async zant(price) {
      var that = this;
      var params = {
        token: this.token,
        gem: price,
        service_id: this.id
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
      var params = { token: this.token, course_id: g.id };
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
    // 获取系统常量-赞推
    async getSysfig() {
      var params = {
        type: "yinliu_xiaohaolujing",
        id: 3
      };
      var res = await getSysconfig(params);
      try {
        if (res.error_code === 0) {
          var json = JSON.parse(res.data.data[0].json);
          this.sif = json;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
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
    // 获取视频链接
    async getVideo(id) {
      var that = this;
      var params = {
        alivod_id: id
      };
      var res = await getAlivod(params);
      try {
        if (res.error_code === 0) {
          that.play = res.data;
          setTimeout(function() {
            if (that.body.has_gem === 1) {
              that.getPlayerUser(true);
            } else {
              that.getPlayer(true);
            }
          }, 300);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 会员视频播放
    getPlayerUser(boom) {
      var item = this.play;
      var str = "";
      for (var i = 0; i < item.play_info.length; i++) {
        str += item.play_info[i].Definition + "=" + item.play_info[i].PlayURL + ",";
      }
      var sc = str.substring(0, str.length - 1);
      var player = new window.Aliplayer({
        id: "player-user",
        source: JSON.stringify(this.getParseStr(sc, ",")),
        cover: item.video_base.CoverURL,
        width: "100%",
        height: "6.666666rem",
        "autoplay": boom,
        "isLive": false,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "click",
        "showBarTime": 5000,
        "useH5Prism": true,
        components: [{
          name: "PreviewVodComponent",
          type: window.AliPlayerComponent.PreviewVodComponent,
          args: [0, "#endPreviewTemplate", "付费播放全部"]
        },
        {
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
      }, function (player) {
        document.getElementsByClassName("preview-vod-close")[0].remove();
        var playerBottom = document.getElementsByClassName("prism-big-play-btn")[0];
        playerBottom.style.left = "50%";
        playerBottom.style.top = "50%";
        // var limit = document.querySelector(".player_vie-bt");
        // limit.addEventListener("click", function() {
        //   console.log("点击事件");
        // });
        player.on("sourceloaded", function(params) {
          var paramData = params.paramData;
          var desc = paramData.desc;
          var definition = paramData.definition;
          player.getComponent("QualityComponent").setCurrentQuality(desc, definition);
        });
      });
      console.log(player);
    },
    // 视频播放试看
    getPlayer(boom) {
      var that = this;
      var item = this.play;
      var str = "";
      for (var i = 0; i < item.play_info.length; i++) {
        str += item.play_info[i].Definition + "=" + item.play_info[i].PlayURL + ",";
      }
      var sc = str.substring(0, str.length - 1);
      var player = new window.Aliplayer({
        id: "player-con",
        source: JSON.stringify(this.getParseStr(sc, ",")),
        cover: item.video_base.CoverURL,
        width: "100%",
        height: "6.666666rem",
        "autoplay": boom,
        "isLive": false,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "click",
        "showBarTime": 5000,
        "useH5Prism": true,
        components: [{
          name: "PreviewVodComponent",
          type: window.AliPlayerComponent.PreviewVodComponent,
          args: [30, "#endPreviewTemplate", "付费播放全部"]
        },
        {
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
      }, function (player) {
        player.on("timeupdate", () => {
          let timePlay = player.getCurrentTime(); // 获取播放的时间
          if (timePlay >= 30) {
            // document.getElementsByName("video").style.display = "none";
            document.querySelector(".player_vip").style.display = "block";
            document.querySelector(".preview-component-layer").style.display = "none";
          }
        });
        document.getElementsByClassName("preview-vod-close")[0].remove();
        var playerBottom = document.getElementsByClassName("prism-big-play-btn")[0];
        playerBottom.style.left = "50%";
        playerBottom.style.top = "50%";
        var limit = document.querySelector(".player_vie-bt");
        limit.addEventListener("click", function() {
          that.$MessageBox({
            title: "提示",
            message: "支付" + that.body.price + "经验宝石",
            showCancelButton: true,
            confirmButtonText: "支付",
            confirmButtonClass: "mesBox",
            cancelButtonText: "取消"
          }).then(function(action) {
            if (action === "confirm") {
              that.getPlayBuy();
            }
          });
        });
        player.on("sourceloaded", function(params) {
          var paramData = params.paramData;
          var desc = paramData.desc;
          var definition = paramData.definition;
          player.getComponent("QualityComponent").setCurrentQuality(desc, definition);
        });
      });
      console.log(player);
    },
    async getPlayBuy() {
      // this.body.has_gem = 1;
      // this.getVideo("e049494f2a934f46a89e5061441d0616");
      var that = this;
      var params = {
        token: that.token,
        course_id: that.body.id
      };
      var res = await getCourseBuy(params);
      try {
        if (res.error_code === 0) {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          setTimeout(function() {
            that.body.has_gem = 1;
            that.getVideo(that.body.media);
          }, 1500);
        } else {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  @import "../../../assets/css/alipler.css";
  @import "../../../assets/css/toast.css";
  .mesBox{
    color: red;
  }
  .bigBox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    background-color: rgba(0,0,0,.5);
  }
  .formBox{
    width: 100%;
    margin-top: 1.955555rem;
    margin-bottom: 0.533333rem;
    z-index: 10001;
    height: 60%;
    background-color: #FFFFFF;
    padding-top: 0.355555rem;
    &.felx{
      position: fixed;
      left: 0;
      bottom: 2.222222rem;
      background-color: inherit;
      height: auto;
      margin-top: 0;
      margin-bottom: 0;
    }
    .biao{
      width: 92%;
      margin: 0 auto;
      background-color: #FFFFFF;
      flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      display: flex;
      margin-top: 0.177777rem;
      span{
        font-size: 0.533333rem;
        text-align: center;
        margin: 0 0.133333rem;
        margin-bottom: 0.177777rem;
      }
    }
    &.formBottom{
      margin-top: 0;
    }
    &.tapForm{
      position: fixed;
      margin-bottom: 0;
      bottom: 0;
    }
    .bd{
      background-color: #F6F6FB;
      border-radius: 0.16rem;
      width: 92%;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .inputRight{
        // position: absolute;
        // right: 0;
        // top: 50%;
        // transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.266666rem;
        width: 3.3rem;
        position: relative;
        i{
          width: 0.026666rem;
          height: 0.266666rem;
          background-color: #D8D8D8;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
        }
        .getbottom{
          color: #FFFFFF;
          background-color: #7265E3;
          padding: 0.133333rem;
          border-radius: 0.133333rem;
          font-size: 0.32rem;
        }
        .happy{
          font-size: 0.45rem;
          margin-right: 0.32rem;
          word-break: break-all;
          // padding-bottom: 0.177777rem;
        }
        div{
          display: inline-block;
          line-height: 1;
        }
      }
      input, .textarea{
        background-color: #F6F6FB;
        color: #333333;
        font-size: 0.373333rem;
        padding: 0.24rem 0.417777rem;
        width: 100%;
        border: 0;
        min-height: 0.906666rem;
        max-height: 1.813333rem;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
      }
      .textarea{
        -webkit-user-modify: read-write-plaintext-only;
      }
      [contentEditable=true]:empty:not(:focus):before {
        content: attr(data-text);
        color: #D6D9E0;
      }
      input::input-placeholder{
        color: #D6D9E0;
        font-size: 0.32rem;
      }
    }
  }
  .forum{
    .nd{
      padding-bottom: 2.666666rem;
    }
    .pox{
      width: 96%;
      margin-left: 4%;
      margin-top: 0.56rem;
      .cd{
        display: flex;
        position: relative;
        .tapz{
          text-align: center;
          margin-bottom: 0.4rem;
          span{
            color: #7265E3;
            display: inline-block;
            font-size: 0.32rem;
            img{
              width: 0.168888rem;
              vertical-align: middle;
              margin-left: 0.053333rem;
            }
          }
        }
        .talp{
          position: absolute;
          right: 4%;
          top: 0;
          span{
            font-size: 0.32rem;
            color: #9C9EB9;
            margin-left: 0.417777rem;
            img{
              vertical-align: middle;
              margin-right: 0.133333rem;
              width: 0.426666rem;
            }
          }
        }
        &:last-child{
          margin-bottom: 0.56rem;
        }
        .hd{
          flex: 1;
          margin-left: 0.302222rem;
          border-bottom: 0.026666rem solid #EAEAEA;
          .talk{
            margin-bottom: 0.391111rem;
            background-color: #F4F6FA;
            width: 95%;
            padding: 0.4rem;
            .item{
              font-size: 0.32rem;
              color: #9C9EB9;
              margin-bottom: 0.391111rem;
              &:last-child{
                margin-bottom: 0;
              }
              span{
                color: #2D3142;
              }
            }
          }
          .des{
            font-size: 0.373333rem;
            color: #000000;
            line-height: 0.497777rem;
            padding-right: 5%;
            text-align: justify;
            padding-bottom: 0.391111rem;
          }
          .time{
            font-size: 0.266666rem;
            color: #9C9EB9;
            line-height: 1;
            padding-top: 0.177777rem;
            padding-bottom: 0.373333rem;
          }
          .title{
            font-size: 0.373333rem;
            color: #2D3142;
            line-height: 1;
            padding-top: 0.142222rem;
          }
        }
        .bd{
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100%;
          width: 0.96rem;
          height: 0.96rem;
          border-radius: 50%;
        }
      }
    }
    .plc{
      padding: 0.266666rem 0;
      border-bottom: 0.026666rem solid #EAEAEA;
      .box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1;
        width: 92%;
        margin: 0 auto;
        .right{
          span{
            color: #9C9EB9;
            font-size: 0.32rem;
            line-height: 1;
            &:first-child{
              padding-right: 0.266666rem;
              border-right: 0.026666rem solid #9C9EB9;
            }
            &:last-child{
              padding-left: 0.266666rem;
            }
            &.active{
              color: #2D3142;
            }
          }
        }
        .left{
          font-size: 0.32rem;
          color: #2D3142;
        }
      }
    }
    .top{
      display: flex;
      position: relative;
      width: 92%;
      margin: 0 auto;
      padding-top: 0.4rem;
      padding-bottom: 0.266666rem;
      .bdBottom{
        width: 2.133333rem;
        height: 0.88rem;
        line-height: 0.88rem;
        background: linear-gradient(122.023deg,rgba(139,99,230,1) 0%,rgba(97,85,204,1) 100%);
        border-radius: 0.444444rem;
        color: #FFFFFF;
        font-size: 0.32rem;
        text-align: center;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .right{
        flex: 1;
        padding-left: 0.337777rem;
        .case{
          font-size: 0.32rem;
          color: #7265E3;
          line-height: 1;
        }
        .desc{
          line-height: 1;
          padding-top: 0.124444rem;
          padding-bottom: 0.551111rem;
          span{
            padding-right: 0.444444rem;
            font-size: 0.32rem;
            color: #9C9EB9;
          }
        }
        .dTitle{
          font-size: 0.426666rem;
          color: #2D3142;
          padding-top: 0.248888rem;
        }
      }
      .left{
        width: 2.133333rem;
        height: 2.133333rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        border-radius: 0.106666rem;
      }
    }
  }
  .public{
    width: 100%;
    .zantui{
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0,0,0,.4);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10001;
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
        // 为TA充电
        .cdBt{
          width: 3.555555rem;
          height: 0.933333rem;
          line-height: 0.933333rem;
          background: linear-gradient(122deg,rgba(139,99,230,1) 0%,rgba(114,101,227,1) 100%);
          text-align: center;
          color: #FFFFFF;
          margin: 0 auto;
          margin-top: 0.533333rem;
          margin-bottom: 0.533333rem;
          border-radius: 0.471111rem;
        }
        .hd{
          .item{
            font-size: 0.373333rem;
            color: #2D3142;
            width: 90%;
            margin: 0 auto;
            text-align: center;
            background-color: #F4F6FA;
            line-height: 0.933333rem;
            border-radius: 0.106666rem;
            margin-bottom: 0.266666rem;
            &.active{
              background-color: #E0DDF5;
              color: #7265E3;
            }
            &:first-child{
              margin-top: 0.533333rem;
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
        .aTitle{
          padding-top: 0.533333rem;
          color: #2D3142;
          font-size: 0.373333rem;
          font-weight: bold;
        }
        // 赞推
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
    .sen{
      width: 92%;
      margin: 0 auto;
      .bd{
        .item{
          display: flex;
          margin-top: 0.4rem;
          &:last-child{
            margin-bottom: 0.4rem;
          }
          &:first-child{
            margin-top: 0;
          }
          .right{
            flex: 1;
            margin-left: 36px;
            .time{
              .short{
                font-size: 0.266666rem;
                color: #9C9EB9;
                img{
                  vertical-align: middle;
                  width: 0.32rem;
                  height: 0.32rem;
                  margin-left: 0.177777rem;
                  &:first-child{
                    margin-left: 0;
                  }
                }
              }
            }
            .us{
              font-size: 0.32rem;
              color: #9C9EB9;
              line-height: 1;
              padding: 0.231111rem 0;
              img{
                width: 0.64rem;
                height: 0.64rem;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.24rem;
              }
            }
            .title{
              font-size: 0.32rem;
              color: #000000;
              font-weight:600;
              line-height: 1;
              padding-top: 0.213333rem;
            }
          }
          .left{
            width: 4rem;
            height: 2.222222rem;
            border-radius: 0.106666rem;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100%;
          }
        }
      }
      .sTitle{
        font-size: 0.426666rem;
        color: #000000;
        line-height: 1;
        padding-top: 0.471111rem;
        padding-bottom: 0.266666rem;
        font-weight:500;
      }
    }
    .lBack{
      width: 100%;
      height: 0.32rem;
      background-color: #F9F9F9;
    }
    .fex{
      display: flex;
      width: 92%;
      margin: 0 auto;
      padding: 0.391111rem 0;
      .item{
        flex: 1;
        text-align: center;
        .img{
          width: 0.622222rem;
          margin: 0 auto;
          img{
            width: 100%;
          }
        }
        .font{
          font-size: 0.266666rem;
          color: #9C9EB9;
          line-height: 1;
          padding-top: 0.213333rem;
        }
      }
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
      display: inline-block;
      margin-left: 4%;
      margin-top: 0.213333rem;
      img {
        width: 0.373333rem;
        vertical-align: middle;
        margin-right: 0.115555rem;
      }
    }
    .content{
      line-height: 1;
      padding-top: 0.444444rem;
      width: 92%;
      margin: 0 auto;
      position: relative;
      .tapRight{
        // width: 2.248888rem;
        height: 0.533333rem;
        line-height: 0.533333rem;
        background: linear-gradient(122deg, rgba(139,99,230,1), rgba(97,85,204,1));
        border-top-left-radius: 0.266666rem;
        border-bottom-left-radius: 0.266666rem;
        position: absolute;
        right: -4%;
        top: 50%;
        transform: translateY(-50%);
        color: #FFFFFF;
        text-align: center;
        padding: 0 0.355555rem;
        img{
          width: 0.328888rem;
        }
      }
      .tapTitle{
        font-size: 0.426666rem;
        color: #000000;
      }
      .short{
        font-size: 0.266666rem;
        color: #9C9EB9;
        padding: 0.248888rem 0;
        img{
          vertical-align: middle;
          width: 0.32rem;
          height: 0.32rem;
          margin-left: 0.177777rem;
          &:first-child{
            margin-left: 0;
          }
        }
      }
      .des{
        position: relative;
        p{
          font-size: 0.266666rem;
          color: #9C9EB9;
          display: inline-block;
        }
        &.tap{
          p{
            width: 5.333333rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        span{
          color: #7265E3;
          display: inline-block;
          margin-left: 0.088888rem;
          font-size: 0.32rem;
          img{
            width: 0.168888rem;
            vertical-align: middle;
            margin-left: 0.053333rem;
          }
        }
      }
    }
    .user{
      position: relative;
      padding: 0.355555rem 0;
      .pox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1;
        width: 92%;
        margin: 0 auto;
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
    .deNav{
      display: flex;
      position: relative;
      width: 100%;
      height: 0.986666rem;
      border-bottom: 0.044444rem solid #EAEAEA;
      .li{
        flex: 1;
        height: 0.986666rem;
        line-height: 0.986666rem;
        &:first-child{
          text-align: right;
          margin-right: 0.533333rem;
        }
        &:last-child{
          text-align: left;
          margin-left: 0.533333rem;
        }
        span{
          font-size: 0.4rem;
          color:rgba(0,0,0,.5);
        }
        &.active{
          transition: all 2s;
          span{
            color: #2D3142;
            display: inline-block;
            position: relative;
            height: 100%;
            font-weight: bold;
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
    .player{
      height: 6.666666rem;
      width: 100%;
      position: relative;
      .player_vip{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
        display: none;
        .player_vie-bt{
          width: 3.555555rem;
          height: 0.933333rem;
          background: linear-gradient(122deg,rgba(139,99,230,1) 0%,rgba(114,101,227,1) 100%);
          border-radius: 0.471111rem;
          margin: 0 auto;
          color: #FFFFFF;
          font-size: 0.373333rem;
          text-align: center;
          line-height: 0.933333rem;
          margin-top: 3rem;
        }
      }
    }
    .header{
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 999;
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
      .headRight{
        height: 0.568888rem;
        .bd{
          display: inline-block;
          height: 0.568888rem;
          width: 0.568888rem;
          font-size: 0;
          margin-left: 0.506666rem;
        }
        img{
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
</style>
