<template>
  <div class="mList">
    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <head-nav :title="'全部分类'" :navShow="false" :titleColor="'#000000'">
        <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../assets/img/home/leftHeadback.png" alt=""></div>
      </head-nav>
      <div class="filter">
        <div class="item" :class="item.isActive?'active':''" v-for="(item,i) in jl" :key="i">
          <span @click="kep(i)">{{item.name}}<i></i></span>
          <div v-if="item.list.length != 0">
            <div class="le" :class="item.isActive?'block':''">
              <div class="li" @click="isList(i, mt, item)" v-for="(mt,index) in item.list" :key="index" >{{mt.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sortLisst" v-if="sortShow">
        <div class="item" @click="sortFt(id)" :class="item.active?'active':''" v-for="(item,i) in sortList" :key="i">
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="box">
        <div>
          <div class="pt_service" v-for="(item,i) in body" :key="i"  @click.stop="goDetail(tapIndex, item.id)">
            <div class="fl">
              <p @click.stop="zhantui(item.id)">赞推({{item.gem_count}})</p>
              <p @click.stop="store(tapIndex, item.id)">鼓掌({{item.likes_count}})</p>
              <p @click.stop="hit(item)">打榜({{item.hit_gem}})</p>
            </div>
            <div class="fr">
              <div class="pt_img" :style="'background-image: url(' + item.thumb + ')'">
                <p class="pt_cm" v-if="item.category">{{item.category.name}}</p>
                <p class="pt_cn" v-if="item.envelope.length">互动可赚<span>￥{{item.envelope[0].battery}}</span><img src="../../assets/img/mine/zhang.png" alt=""></p>
              </div>
              <h3 v-if="item.name">{{item.name}}</h3>
              <div class="pt-dn">
                <div class="pt-talk" v-if="item.topic"><img src="../../assets/img/mine/icon5.png" alt="">{{item.topic.name}}</div>
                <div class="pt-price">￥{{item.price}}</div>
              </div>
              <div class="pt_info">
                <img :src="item.user_info.avatar" class="fl">
                <div class="fl">
                  <h5>{{item.user_info.nickname}}<span>距离您 {{item.length}}km</span></h5>
                  <h5>{{item.update}}更新</h5>
                </div>
                <div class="fr" v-if="!item.collect_user" @click.stop="collect(item, item.id, 0)">关注<img src="../../assets/img/mine/jia.png" alt=""></div>
                <div class="fr" v-else @click.stop="collect(item, item.id, 1)">已关注</div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="noMessage" v-if="!body.length">{{noMessage}}</div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
        <span v-show="bottomStatus === 'loading'">
          加载中...
        </span>
      </div>
    </mt-loadmore>
    <mt-popup v-model="popupVisible" position="right" @touchmove.native.stop.prevent class="mint-popup">
      <div class="box">
        <div class="title">热门分类</div>
        <div class="base clearfix">
          <div class="item" :class="item.is?'active':''" @click="getHot(i, item)" v-for="(item,i) in hot" :key="i"><span>{{item.name}}</span></div>
        </div>
        <div class="title parice">价格<i></i></div>
        <div class="int">
          <div class="item"><input type="number" placeholder="最低价" v-model="filt.min"></div>
          <div class="item"><i></i></div>
          <div class="item"><input type="number" placeholder="最高价" v-model="filt.max"></div>
        </div>
        <div class="title parice">发布时间<i></i></div>
        <div class="int">
          <div class="items" :class="deDayIndex===item.num?'active':''" @click="day(item)" v-for="(item,i) in deData" :key="i"><span>{{item.name}}</span></div>
        </div>
        <div class="title parice">筛选条件<i></i></div>
        <div class="int">
          <div class="items" :class="myCur===i?'active':''" v-for="(item,i) in myList" :key="i" @click="myClickList(i)"><span>{{item.name}}</span></div>
        </div>
        <div class="int city">
          <div class="items"><span>{{fimSave.city}}</span></div>
          <div class="items" @click="popupVisible2 = true"><span>切换城市</span></div>
        </div>
        <div class="tapBottom">
          <div class="rest" @click="reset">重置</div>
          <div class="take" @click="frm">确定</div>
        </div>
      </div>
    </mt-popup>
    <!-- 城市切换 -->
    <mt-popup v-model="popupVisible2" position="bottom" class="popCity">
      <div class="pop-btn">
        <p @click="cancel">取消</p>
        <p @click="save">确定</p>
      </div>
      <mt-picker :slots="slots" value-key="name" @change="changeCity" :visible-item-count="3"></mt-picker>
    </mt-popup>
    <div class="zantui" v-if="zantuiShow" @click.stop="zantuiShow = false">
      <div class="bx">
        <div class="title">为我们助力吧</div>
        <div class="base">您的推荐将让我们有更多地曝光机会</div>
        <div class="bt" @click.stop="zant(zt.zantui.price1)">支付{{zt.zantui.price1}}经验宝石</div>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import city from "../../components/home/city2.json";
import headNav from "../../components/home/headNav.vue";
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
  getLikeStore,
  getCollectStore,
  getCollectDestroy,
  getCategory,
  getSysconfig,
  getContentRanking
} from "../../api/buddy.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      myCur: "",
      myList: [
        { "name": "掌声最多", id: 0 },
        { "name": "热度最高", id: 1 },
        { "name": "我发布的", id: 2 }
      ],
      // 筛选数据
      filt: {
        min: "",
        max: "",
        ended_at: "",
        started_at: "",
        category_id: []
      },
      hot: [], // 热门分类数据
      deDayIndex: "",
      deData: [ // N天内的数据
        { name: "1天内", num: 1 },
        { name: "7天内", num: 7 },
        { name: "14天内", num: 14 },
        { name: "30天内", num: 30 }
      ],
      // tap数据
      jl: [
        {
          name: "附近距离",
          isActive: false,
          isClass: false,
          list: [
            { name: "500米", isSelect: false, mi: 0.5 },
            { name: "1000米", isSelect: false, mi: 1 },
            { name: "3000米", isSelect: false, mi: 3 },
            { name: "5000米", isSelect: false, mi: 5 },
            { name: "20公里", isSelect: false, mi: 20 }
          ]
        },
        {
          name: "全部服务",
          isActive: false,
          isClass: false,
          list: [
            { name: "服务", isSelect: false, mi: 0 },
            { name: "投资", isSelect: false, mi: 1 },
            { name: "融资", isSelect: false, mi: 2 },
            { name: "派单", isSelect: false, mi: 3 },
            { name: "转让", isSelect: false, mi: 4 },
            { name: "公开课", isSelect: false, mi: 5 },
            { name: "技能", isSelect: false, mi: 6 }
          ]
        },
        {
          name: "默认排序",
          isActive: false,
          isClass: false,
          list: []
        },
        {
          name: "筛选",
          isActive: false,
          isClass: false,
          list: []
        }
      ],
      listIndex: "", // 上一次点击的mi值
      // 默认排序的显示隐藏
      sortShow: false,
      sortList: [
        { title: "距离最远/近", active: true, sorts: "asc" },
        { title: "金额高/底", active: false, sorts: "asc" },
        { title: "预约数", active: false, sorts: "asc" }
      ],
      // 筛选弹窗
      popupVisible: false,
      popupVisible2: false,
      // 传给接口的数据
      tapKey: {
        // length: "", // 距离(千米)
        // length_sort: "asc", // 距离排序desc(远到近),asc(近到远)
        // price_level: "", // 价格排序desc(高到低),asc(低到高)
        page: 1, // 页数
        per_page: 10 // 每页显示10条
      },
      // 路由ID
      routerId: "",
      // 默认显示服务数据
      tapIndex: 0,
      locat: "", // 从原生中拿到的位置信息
      body: [], // 后台返回数据
      noMessage: "", // 没有数据时，显示这个
      total: "", // 总数据条数
      allLoaded: false, // 上拉加载
      bottomStatus: "",
      zt: "",
      zantuiShow: false,
      zantuiId: "",
      // 切换城市
      slots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: city, // 省份数组
          className: "slot1",
          textAlign: "center"
        }, {
          divider: true,
          content: "-",
          className: "slot2"
        }, {
          flex: 1,
          values: ["北京市"],
          className: "slot3",
          textAlign: "center"
        }
      ],
      // 用户选择城市后要保存的数据
      popcity: "",
      fimSave: {
        city: "北京"
      }
    };
  },
  computed: {
    ...mapState(["token"])
  },
  async mounted() {
    this.body = [];
    this.tapKey.page = 1;
    this.allLoaded = false;
    document.addEventListener("scroll", this.scroll, true);
    // 取得路由传值信息
    this.routerId = this.$route.query.id;
    this.tapIndex = Number(this.$route.query.tapIndex) - 1;
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
    var json = this.tapKey;
    json.token = this.token;
    json.lng = this.locat.longitude;
    json.lat = this.locat.latitude;
    json.city = this.locat.city;
    this.fimSave.city = this.locat.city;
    // json.lng = "113.8529519314236";
    // json.lat = "23.026370713975695";
    json.length_sort = this.tapKey.length_sort;
    json.category_id = [];
    json.category_id.push(this.routerId);
    this.getData(json);
    this.getSysfig();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
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
      switch (this.tapIndex) {
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
      switch (this.tapIndex) {
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
    goback() {
      this.$bridge.call("back");
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    // 跳转详情页
    goDetail(index, id) {
      var that = this;
      switch (index) {
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
    // 上拉加载
    loadBottom() {
      var that = this;
      var length = that.body.length;
      if (length === that.total) {
        that.allLoaded = true;
        return that.$Toast({
          message: "到底啦",
          duration: 1500
        });
      } else {
        that.tapKey.page = that.tapKey.page + 1;
        that.lsGetData(true);
      }
      setTimeout(function() {
        that.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    // 筛选时地址切换
    save() {
      var that = this;
      window.AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new window.AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: that.popcity
        });
        geocoder.getLocation(that.popcity, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            var lat = result.geocodes[0].location.lat;
            var lng = result.geocodes[0].location.lng;
            var json = {
              lat: lat,
              lng: lng,
              city: that.popcity
            };
            that.fimSave = json;
            that.popupVisible2 = false;
          }
        });
      });
    },
    cancel() {
      this.popupVisible2 = false;
    },
    changeCity(picker, values) {
      picker.setSlotValues(1, values[0].children);
      this.popcity = values[1].name;
    },
    // 筛选重置
    reset() {
      this.deDayIndex = "";
      this.myCur = "";
      this.filt.min = "";
      this.filt.max = "";
      for (var i = 0; i < this.hot.length; i++) {
        this.hot[i].is = false;
      }
    },
    // 筛选点击确定
    frm() {
      if (this.deDayIndex === "") {
        return this.$Toast({
          message: "请选择发布时间",
          duration: 1500,
          className: "notToast"
        });
      }
      if (this.myCur === "") {
        return this.$Toast({
          message: "请选择筛选条件",
          duration: 1500,
          className: "notToast"
        });
      }
      if (this.filt.min > this.filt.max) {
        return this.$Toast({
          message: "最底价不能高于最高价",
          duration: 1500,
          className: "notToast"
        });
      }
      if (this.filt.min === "") {
        return this.$Toast({
          message: "请输入最低价格",
          duration: 1500,
          className: "notToast"
        });
      }
      if (this.filt.max === "") {
        return this.$Toast({
          message: "请输入最高价格",
          duration: 1500,
          className: "notToast"
        });
      }
      var checkNum = 0;
      for (var i = 0; i < this.hot.length; i++) {
        if (this.hot[i].is) {
          checkNum++;
        }
      }
      if (checkNum === 0) {
        return this.$Toast({
          message: "请选择热门分类",
          duration: 1500,
          className: "notToast"
        });
      }
      this.tapKey = {};
      var json = this.tapKey;
      json.token = this.token;
      if (this.fimSave.lng) {
        json.lng = this.fimSave.lng;
        json.lat = this.fimSave.lat;
        json.city = this.fimSave.city;
      } else {
        json.lng = this.locat.longitude;
        json.lat = this.locat.latitude;
        json.city = this.locat.city;
      }
      // json.lng = "113.8529519314236";
      // json.lat = "23.026370713975695";
      json.category_id = this.filt.category_id;
      json.started_at = this.filt.started_at;
      // json.started_at = "2019-02-02";
      json.ended_at = this.filt.ended_at;
      json.length_sort = this.filt.length_sort;
      json.min = this.filt.min;
      json.max = this.filt.max;
      json.page = 1;
      json.per_page = 10;
      // 筛选条件
      if (this.myCur === 2) {
        json.my = 1;
      } else if (this.myCur === 0) {
        json.like_sort = "desc";
      } else if (this.myCur === 1) {
        json.hit_sort = "desc";
      }
      this.body = [];
      this.getData(json);
      this.popupVisible = false;
    },
    // 筛选条件
    myClickList(index) {
      this.myCur = index;
    },
    // 选择热门
    getHot(i, item) {
      if (this.hot[i].is) {
        this.hot[i].is = false;
        var index = this.filt.category_id.indexOf(item.id);
        this.filt.category_id.splice(index, 1);
      } else {
        this.hot[i].is = true;
        this.filt.category_id.push(item.id);
      }
    },
    // 选择N天前
    day(item) {
      this.deDayIndex = item.num;
      var nowDay = this.getDay(0);
      this.filt.started_at = this.getDay(-item.num);
      this.filt.ended_at = nowDay;
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
      return tYear + "/" + tMonth + "/" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    // 关注0和取消1按钮
    async collect(item, id, index) {
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
            for (var i = 0; i < that.body.length; i++) {
              if (that.body[i].id === id) {
                if (index) {
                  that.body[i].collect_user = 0;
                } else {
                  that.body[i].collect_user = 1;
                }
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
    // 添加鼓掌的接口
    async store(id) {
      var that = this;
      var params = null;
      if (this.tapIndex === 0) {
        params = { token: that.token, service_id: id };
      } else if (this.tapIndex === 1) {
        params = { token: that.token, investment_id: id };
      } else if (this.tapIndex === 2) {
        params = { token: that.token, financing_id: id };
      } else if (this.tapIndex === 3) {
        params = { token: that.token, dispatch_id: id };
      } else if (this.tapIndex === 4) {
        params = { token: that.token, transfer_id: id };
      } else if (this.tapIndex === 5) {
        params = { token: that.token, course_id: id };
      } else if (this.tapIndex === 6) {
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
            for (var i = 0; i < that.body.length; i++) {
              if (that.body[i].id === id) {
                // 鼓掌
                if (that.body[i].user_likes) {
                  that.body[i].user_likes = 0;
                } else {
                  that.body[i].user_likes = 1;
                  that.body[i].likes_count = that.body[i].likes_count + 1;
                }
              }
            }
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
    // 上拉拉取数据
    async lsGetData(vs) {
      !this.token && (await this.getToken());
      var that = this;
      var params = this.tapKey;
      var res = null;
      switch (Number(this.tapIndex)) {
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
            if (data.length !== 0) {
              for (var i = 0; i < data.length; i++) {
                that.body.push(data[i]);
              }
              that.total = res.data.total;
            } else {
              that.body = [];
              that.noMessage = "暂无数据";
            }
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取默认数据
    async getData(params) {
      !this.token && (await this.getToken());
      var that = this;
      this.$Indicator.open("加载中...");
      if (!params) {
        params = this.tapKey;
      }
      var res = null;
      switch (Number(this.tapIndex)) {
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
              that.total = res.data.total;
            } else {
              that.body = [];
              that.noMessage = "暂无数据";
            }
          }, 1000);
        } else {
          that.$bridge.call("app_home");
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
    // 顶部切换
    async kep(index) {
      for (var i = 0; i < this.jl.length; i++) {
        if (i === index) {
          continue;
        } else {
          this.jl[i].isActive = false;
        }
      }
      if (this.jl[index].isActive) {
        this.jl[index].isActive = false;
      } else {
        this.jl[index].isActive = true;
      }
      if (index === 2) {
        if (this.sortShow) {
          this.sortShow = false;
        } else {
          this.sortShow = true;
        }
      } else if (index === 3) {
        var params = {
          type: Number(this.tapIndex) + 1
        };
        // 调接口获取分类的子类目
        var res = await getCategory(params);
        try {
          if (res.error_code === 0) {
            if (res.data.length !== 0) {
              if (this.listIndex === "") { // 用户第一次进入页面且没有点击“全部服务”
                this.listIndex = this.tapIndex; // 赋值用于下一次做判断
                for (var k = 0; k < res.data.length; k++) {
                  for (var q = 0; q < res.data[k].get_child.length; q++) {
                    var childa = res.data[k].get_child[q];
                    childa.is = false;
                    this.hot.push(childa);
                  }
                }
              } else {
                if (this.listIndex !== this.tapIndex) {
                  this.listIndex = this.tapIndex; // 赋值用于下一次做判断
                  this.hot = [];
                  for (var c = 0; c < res.data.length; c++) {
                    for (var kb = 0; kb < res.data[c].get_child.length; kb++) {
                      var childb = res.data[c].get_child[kb];
                      childb.is = false;
                      this.hot.push(childb);
                    }
                  }
                } else {
                  if (this.hot.length === 0) {
                    this.listIndex = this.tapIndex; // 赋值用于下一次做判断
                    for (var v = 0; v < res.data.length; v++) {
                      for (var w = 0; w < res.data[v].get_child.length; w++) {
                        var childs = res.data[v].get_child[w];
                        childs.is = false;
                        this.hot.push(childs);
                      }
                    }
                  }
                }
              }
              this.list = res.data;
            } else {
              this.list = [];
            }
          } else {
            console.log(res.error_code);
          }
        } catch (err) {
          console.log(err);
        }
        // end
        this.popupVisible = true;
        this.jl[index].isActive = false;
      } else {
        this.sortShow = false;
      }
    },
    // 点击二级菜单
    isList(i, mt, item) {
      if (i === 0) {
        this.tapKey.length = mt.mi;
        this.getData(this.tapKey);
      } else if (i === 1) {
        this.tapIndex = mt.mi;
        this.filt.category_id = []; // 每次点击二级服务分类时，都要初始化;
        this.body = [];
        this.tapKey.page = 1;
        this.getData(this.tapKey);
      }
      for (var j = 0; j < this.jl.length; j++) {
        this.jl[j].isActive = false;
      }
    },
    // 选择排序
    sortFt(index) {
      for (var i = 0; i < this.sortList.length; i++) {
        this.sortList[i].active = false;
      }
      this.sortList[index].active = true;
      this.tapKey.length_sort = "";
      this.tapKey.price_level = "";
      if (this.sortList[index].sorts === "desc") {
        this.sortList[index].sorts = "asc";
      } else {
        this.sortList[index].sorts = "desc";
      }
      if (index === 0) {
        this.tapKey.length_sort = this.sortList[index].sorts;
      } else if (index === 1) {
        this.tapKey.price_level = this.sortList[index].sorts;
      }
      var json = this.tapKey;
      this.getData(json);
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .mList{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #FFFFFF;
    overflow-y: scroll;
    .mint-popup.popCity{
      height: 20%;
      width: 100%;
      .pop-btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 4%;
        line-height: 0.782222rem;
        height: 0.782222rem;
        border-bottom: 0.026666rem solid #EEEEEE;
      }
    }
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
    .noMessage{
      height: 7.111111rem;
    }
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
    .mint-popup{
      width: 80%;
      height: 100%;
      background-color: #fff;
      .box{
        height: 100%;
        width: 100%;
        padding-left: 0.533333rem;
        padding-right: 0.4rem;
        position: relative;
        .tapBottom{
          position: absolute;
          bottom: 1.066666rem;
          left: 4%;
          width: 92%;
          display: flex;
          div{
            text-align: center;
            line-height: 0.88rem;
            font-size: 0.32rem;
            border-radius: 0.88rem;
          }
          .take{
            flex: 1;
            color: #FFFFFF;
            background:linear-gradient(122deg,rgba(139,99,230,1) 0%,rgba(97,85,204,1) 100%);
          }
          .rest{
            width: 2.24rem;
            margin-right: 0.266666rem;
            color: #7265E3;
            background-color: #E1DDF5;
          }
        }
        .int{
          flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          display: flex;
          padding-top: 0.355555rem;
          &.city{
            padding-top: 0;
            .items:nth-of-type(2) span{
                background-color: #FFFFFF;
                color: #7265E3;
                text-align: left;
              }
          }
          .items{
            width: 33.33333%;
            padding-right: 0.266666rem;
            padding-bottom: 0.266666rem;
            &.active{
              span{
                color: #7265E3;
                background-color: #E1DDF5;
              }
            }
            span{
              display: block;
              background-color: #F6F6FB;
              font-size: 0.32rem;
              color: #2D3142;
              text-align: center;
              line-height: 0.746666rem;
              border-radius: 0.746666rem;
            }
            &:nth-of-type(3n){
              padding-right: 0;
            }
          }
          .item{
            text-align: center;
            height: 0.746666rem;
            line-height: 0.746666rem;
            background-color: #F6F6FB;
            border-radius: 0.746666rem;
            font-size: 0.32rem;
            input{
              width: 100%;
              background-color: #F6F6FB;
              color: #2D3142;
              text-align: center;
            }
            input::-webkit-input-placeholder{
              color: #D6D9E0;
              font-size: .32rem;
            }
            i{
              width: 75%;
              height: 0.026666rem;
              background-color: #F6F6FB;
              display: block;
              margin: 0 auto;
              margin-top: 0.373333rem;
            }
            &:nth-of-type(1){
              flex: 2;
            }
            &:nth-of-type(2){
              flex: 1;
              background-color: #FFFFFF;
            }
            &:nth-of-type(3){
              flex: 2;
            }
          }
        }
        .base{
          padding-top: 0.355555rem;
          &.clearfix:after{
            content: "";
            display: block;
            height: 0;
            clear:both;
            visibility: hidden;
          }
          &.clearfix{
            *zoom: 1;
          }
          .item{
            width: 33.33333%;
            height: 0.746666rem;
            line-height: 0.746666rem;
            float: left;
            padding-right: 0.266666rem;
            margin-bottom: 0.266666rem;
            &.active{
              span{
                color: #7265E3;
                background-color: #E1DDF5;
              }
            }
            span{
              font-size: 0.32rem;
              color: #2D3142;
              display: block;
              text-align: center;
              background-color: #F6F6FB;
              border-radius: 0.373333rem;
            }
          }
        }
        .title{
          font-size: 0.426666rem;
          color: #2D3142;
          line-height: 1;
          padding-top: 1.4rem;
          &.parice{
            padding-top: 0.6rem;
            position: relative;
            i{
              background: url(../../assets/img/buddy/more.png) no-repeat;
              background-size: 0.08rem 0.355555rem;
              width: 0.08rem;
              height: 0.355555rem;
              display: inline-block;
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
    .sortLisst{
      display: flex;
      width: 92%;
      margin: 0 auto;
      padding: 0.444444rem 0;
      .item{
        flex: 1;
        text-align: center;
        height: 0.746666rem;
        line-height: 0.746666rem;
        padding-right: 0.266666rem;
        span{
          display: inline-block;
          font-size: 0.32rem;
          color: #2D3142;
          background-color: #F4F6FA;
          width: 100%;
          border-radius: 0.746666rem;
        }
        &.active{
          span{
            color: #7265E3;
            background-color: #E1DDF5;
          }
        }
        &:last-child{
          padding-right: 0;
        }
      }
    }
    .filter{
      display: flex;
      height: 1.386666rem;
      line-height: 1.386666rem;
      position: relative;
      &::after{
        content: "";
        width: 100%;
        height: 0.026666rem;
        background-color: #EDEDF7;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .item{
        flex: 1;
        text-align: center;
        position: relative;
        .le{
          width: 80%;
          box-shadow: 0 0.08rem 0.266666rem 0 rgba(0, 0, 0, 0.09);
          border-radius: 0.08rem;
          position: absolute;
          left: 50%;
          top: 1.155555rem;
          transform: translateX(-50%);
          z-index: 3;
          display: none;
          &.block{
            display: block;
          }
          .li{
            line-height: 0.746666rem;
            height: 0.746666rem;
            background-color: #FFFFFF;
            font-size: 0.32rem;
            text-align: center;
            color: #9C9EB9;
          }
        }
        &.active{
          span{
            color: #7265E3;
            i{
              background-image: url(../../assets/img/buddy/tap3.png);
              &.t{
                background-image: url(../../assets/img/buddy/tap4.png);
              }
            }
          }
        }
        span{
          display: inline-block;
          font-size: 0.373333rem;
          color: #2D3142;
          font-weight: 500;
          position: relative;
          i{
            background-image: url(../../assets/img/buddy/tap1.png);
            background-repeat: no-repeat;
            background-size: 0.195555rem 0.151111rem;
            width: 0.195555rem;
            height: 0.151111rem;
            display: inline-block;
            position: absolute;
            right: -0.311111rem;
            top: 50%;
            transform: translateY(-50%);
            &.t{
              background-image: url(../../assets/img/buddy/tap2.png);
            }
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
                margin-left: 0.088888rem;
              }
            }
          }
        }
      }
    }
  }
</style>
