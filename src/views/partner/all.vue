<template>
  <div>
    <div class="head">
      <i class="back" @click="$router.go(-1)">&nbsp;</i>
      <span>全部服务</span>
    </div>
    <div class="content">
      <div class="tabdown">
        <div @touchend="setDis">
          <span>附近{{sele1}}</span>
          <div v-show="show" id="sele1">
            <p data-index="0" data-val="500" :class="{active:active_1[0]}">500米</p>
            <p data-index="1" data-val="1000" :class="{active:active_1[1]}">1000米</p>
            <p data-index="2" data-val="3000" :class="{active:active_1[2]}">3000米</p>
            <p data-index="3" data-val="5000" :class="{active:active_1[3]}">5000米</p>
            <p data-index="4" data-val="20000" :class="{active:active_1[4]}">20公里</p>
          </div>
        </div>
        <div style="text-align:center;"><span>全部服务</span></div>
        <div style="text-align:center;flex:0 0 35%;" @touchend="setSel">
          <span>{{sele2}}</span>
          <div v-show="show2" id="sele2">
            <p data-index="0" data-type="" :class="{active:active_2[0]}">默认排序</p>
            <p data-index="1" data-type="length_sort" data-val="desc" :class="{active:active_2[1]}">距离降序</p>
            <p data-index="2" data-type="length_sort" data-val="asc" :class="{active:active_2[2]}">距离升序</p>
            <p data-index="3" data-type="price_level" data-val="desc" :class="{active:active_2[3]}">金额降序</p>
            <p data-index="4" data-type="price_level" data-val="asc" :class="{active:active_2[4]}">金额升序</p>
            <p data-index="5" data-type="view_sort" data-val="desc" :class="{active:active_2[5]}">预约数量降序</p>
            <p data-index="6" data-type="view_sort" data-val="asc" :class="{active:active_2[6]}">预约数量升序</p>
          </div>
        </div>
        <div @click="choose" style="text-align:right;flex:0 0 15%;"><span>筛选</span></div>
      </div>
      <div v-if="dataList.length" v-infinite-scroll="getDataList" infinite-scroll-distance="200">
        <div class="pt_service" v-for="(v,i) in dataList" :key="i">
          <div class="fl">
            <p @click="_praise(v.id,i)">赞推(23)</p>
            <p v-if="v.user_likes" class="pa">鼓掌({{v.likes_count}})</p>
            <p v-else @click="_applause(v.id,i)">鼓掌({{v.likes_count}})</p>
            <p>打榜(12)</p>
          </div>
          <div class="fr">
            <!-- <div class="pt_img" @click="$router.push({name: 'partner_detail', query:{service_id: v.id}})"> -->
            <div class="pt_img" @click="detail(v.id)">
              <img :src="v.thumb" height="100%" width="100%">
              <p>{{v.category.name}}</p>
              <p><span>互动可赚</span><span>￥15</span></p>
            </div>
            <h3>{{v.name}}</h3>
            <h4><b>{{v.topic.name}}</b><span>￥{{v.price}}</span></h4>
            <div class="pt_info">
              <img :src="v.user_info.avatar" class="fl">
              <div class="fl">
                <h5>{{v.user_info.nickname}}<span>距离您 {{v.length}}km</span></h5>
                <h5>7 days ago</h5>
              </div>
              <div class="fork fr" v-if="v.collect_user">已关注</div>
              <div class="fr" v-else>关注</div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <!-- <div class="pd45 nomore" v-if="total==dataList.length">没有更多了...</div> -->
      </div>
      <div v-else>
        <div class="nodata">暂无内容</div>
      </div>
    </div>

    <drawer :visible.sync="visible" @close="close">
      <div slot="slot" class="choose">
        <h4>热门分类</h4>
        <div>
          <p v-for="(v,k) in cates" :key="k" :class="{active:actives[k]}" @click="add(k)">{{v}}</p>
        </div>
        <h4>价格</h4>
        <div>
          <input placeholder="最低价" v-model="min" /><span></span><input placeholder="最高价" v-model="max" />
        </div>
        <h4>发布时间</h4>
        <div>
          <p v-for="(v,k) in times" :key="k" :class="{active:actived[k]}" @click="add2(k)">{{v}}</p>
        </div>
        <h4>筛选条件</h4>
        <div>
          <p v-for="(v,k) in solus" :key="k" :class="{active:activet[k]}" @click="add3(k)">{{v}}</p>
        </div>
        <div>
          <p>苏州</p><a href="javascript:;">切换城市</a>
        </div>
        <div class="btns">
          <button @click="reset">重置</button>
          <button @click="getDataList();visible=false">确定</button>
        </div>
      </div>
    </drawer>
  </div>
</template>

<style src="../../assets/css/base.css"></style>
<script>
import drawer from "../../components/drawer/index";
import { getAllServiceList, applause, praise } from "../../api/partner";
import { mapState } from "vuex";
export default {
  components: {
    drawer
  },
  data () {
    return {
      show: false,
      show2: false,
      visible: false,
      cates: ["股权投资", "专利权", "商标权", "著作权", "商铺", "写字楼", "厂房", "土地"],
      actives: [false, false, false, false, false, false, false, false],
      times: ["1天内", "7天内", "14天内", "30天内"],
      solus: ["掌声最多", "认可度最高", "热度最高", "我发布的"],
      actived: [false, false, false, false],
      activet: [false, false, false, false],
      dataList: [],
      min: "",
      max: "",
      length: "5000",
      type: "",
      length_sort: "",
      view_sort: "",
      sele1: "距离",
      sele2: "默认排序",
      lng: "",
      lat: "",
      total: 0,
      page: 1,
      active_1: [false, false, false, false, false],
      active_2: [false, false, false, false, false, false]
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted () {
    var _this = this;
    document.addEventListener("touchend", hide, false);
    function hide (e) {
      var sele = e.target.parentNode.id;
      // 附件距离
      // if (sele !== "sele1" || sele !== "sele2") {
      //   _this.show = _this.show2 = false;
      // }
      // 默认排序
      if (e.target.nodeName.toLowerCase() === "p" && (sele === "sele1" || sele === "sele2")) {
        _this.show = _this.show2 = false;
        if (sele === "sele1") {
          _this.length = e.target.getAttribute("data-val");
          // _this.sele1 = e.target.innerText;
          _this.active_1 = [false, false, false, false, false];
          _this.$set(_this.active_1, e.target.getAttribute("data-index"), true);
        } else if (sele === "sele2") {
          _this.type = e.target.getAttribute("data-type");
          // _this.sele2 = e.target.innerText;
          _this[_this.type] = e.target.getAttribute("data-val");
          _this.active_2 = [false, false, false, false, false, false];
          _this.$set(_this.active_2, e.target.getAttribute("data-index"), true);
        }
        _this.getDataList();
      }
    }
    // 获取定位
    // this._getPos();
    this.getDataList();
  },
  methods: {
    async _getPos () {
      let a = await this.$bridge.call("get_location", {});
      console.log(a);
      if (a.success === 0) {
        this.lng = a.longitude;
        this.lat = a.latitude;
        this.getDataList();
      } else if (a.success === 2) {
        this.$Toast("获取定位失败,请开启定位权限");
      } else {
        this.$Toast("获取定位失败");
      }
    },
    async getDataList () {
      this.$Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      var params = {
        length: this.length,
        token: "37d8f52c850d0b08433d2f82b0e47982", // this.token,
        lng: 117.1772575400, // this.lng, // 117.1772575400,
        lat: 31.8400868400, // this.lat, // 31.8400868400,
        page: this.page,
        per_page: 200
      };
      if (this.type) {
        params[this.type] = this[this.type];
      }
      if (this.min) {
        params.min = parseFloat(this.min);
      }
      if (this.max) {
        params.max = parseFloat(this.max);
      }
      getAllServiceList(params).then(res => {
        if (res.error_code) {
          this.$Toast(res.error_msg);
        } else {
          this.dataList = [...this.dataList, ...res.data.data];
          // this.total = res.data.total;
          // this.page += 1;
        }
        this.$Indicator.close();
      });
    },
    setDis () {
      this.show = !this.show;
    },
    setSel () {
      this.show2 = !this.show2;
    },
    choose () {
      this.visible = true;
    },
    close () {
      this.visible = false;
    },
    add (k) {
      this.$set(this.actives, k, !this.actives[k]);
    },
    add2 (k) {
      this.actived = [false, false, false, false];
      this.$set(this.actived, k, true);
    },
    add3 (k) {
      this.$set(this.activet, k, !this.activet[k]);
    },
    reset () {
      this.actives = [false, false, false, false, false, false, false, false];
      this.actived = [false, false, false, false];
      this.activet = [false, false, false, false];
      this.min = this.max = "";
    },
    _applause (id, i) {
      applause({
        token: this.token,
        service_id: id
      }).then(res => {
        if (res.error_code) {
          this.$Toast(res.error_msg);
        } else {
          // this.dataList[i].likes_count = 1;
          this.$set(this.dataList[i], "user_likes", 1);
        }
      });
    },
    _praise (id, i) {
      praise({
        token: this.token,
        service_id: id
      }).then(res => {
        if (res.error_code) {
          this.$Toast(res.error_msg);
        } else {
          // this.dataList[i].likes_count = 1;
          this.$set(this.dataList[i], "user_likes", 1);
          this.$set(this.dataList[i], "user_likes", this.dataList[i].likes_count + 1);
        }
      });
    },
    detail (id) {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner_detail?service_id=" + id,
        hideNav: 1
      });
    }
  }
};
</script>
<style scoped>
.tabdown { display: flex; padding:0 .45rem; }
.tabdown > div { flex: 0 0 25%; color: #2D3142; font-size: .42rem; position: relative; }
.tabdown > div > span { position: relative; }
.tabdown > div > span:after { content: ""; position: absolute; width: .21rem; height: .16rem; background: url(../../assets/img/down.png) center no-repeat; background-size: cover; top: .16rem; right: -.35rem; }
.tabdown > div:nth-of-type(4) > span { padding-right: .4rem; }
.tabdown > div:nth-of-type(4) > span:after { right: 0; }
.tabdown > div > div {color: #9C9EB9; line-height: .8rem; font-size: .36rem; text-align: center; width:3rem; box-shadow:0px 9px 30px 0px rgba(0, 0, 0, 0.09); border-radius:.09rem; position: absolute; top: .8rem; left: 0; background-color: #fff; z-index: 2; }
.tabdown p.active { color: #7265E3; }
.choose { padding: .4rem; overflow-y: auto; overflow-x: hidden; position: relative; height: 100%; }
.choose h4 { font-size: .4rem; margin-top: .4rem; margin-bottom: .4rem; }
.choose > div { margin-left: -.2rem; overflow: hidden; }
.choose p { width: 1.92rem; height: .7466rem; float: left; margin-left: .2rem; background-color: #F6F6FB; text-align: center; line-height: .7466rem; font-size: .32rem; margin-bottom: .2667rem; border-radius: .3733rem; }
.choose p.active { background-color: #6656D0; color: #fff; }
.choose input { width: 2.48rem; height: .7466rem; line-height: .7466rem; text-align: center; background-color: #F6F6FB; border-radius: .3733rem; font-size: .32rem; }
.choose input + span { display: inline-block; width: .64rem; height: .0267rem; background-color: #F6F6FB; margin: 0 .4rem; vertical-align: middle; }
.choose a { font-size: .32rem; color: #7265E3; margin-left: .2756rem; line-height: .7466rem; }
/*.btns { position: absolute; bottom: .4rem; left: .4rem; }*/
.choose .btns { margin-left: 0; }
.btns button { width:2.24rem; height:.88rem; background:#E1DDF5; border-radius:.44rem; border: none; color: #7265E3; font-size: .32rem; outline: none;}
.btns button:nth-of-type(2) { width: 4rem; background-color: #6656D0; color: #fff; margin-left: .2667rem; }
</style>
