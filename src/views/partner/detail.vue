<template>
  <div class="detail">
    <div class="bg" :style="{backgroundImage:'url('+info.thumb+')'}">
      <div><i class="back" @click="$router.go(-1)">&nbsp;</i><span>服务详情</span><a v-if="info.user_likes" href="javascript:;" class="pa"></a><a v-else href="javascript:;" @click="_applause(info.id)"></a></div>
      <h1>{{info.name}}</h1>
    </div>
    <div class="absd">
      <h3>￥{{info.price}}<p><span>互动可赚</span><span>￥15</span></p></h3>
      <div class="pt_info">
        <img :src="info.user_info.avatar" class="fl">
        <div class="fl">
          <h5>{{info.user_info.nickname}}<span>距离您 5km</span></h5>
          <h5>7 days ago</h5>
        </div>
        <div class="fork fr" v-if="info.collect_user">已关注</div>
        <div class="fr" v-else>关注</div>
      </div>
      <div class="clear"></div>
      <p class="base"><span>服务区域</span><b style="font-weight:normal" v-for="(v,i) in info.site" :key="i">{{v.prov}}-{{v.city}}-{{v.area}}</b></p>
      <p class="base"><span>类别</span>{{info.category.name}}</p>
    </div>
    <div class="pt_nav">
      <ul :class="{fixed:fixed}">
        <li class="active"><a href="#id1">优势亮点</a></li>
        <li><a href="#id2">服务体验</a></li>
        <li><a href="#id3">服务保障</a></li>
        <li><a href="#id4">他的作品</a></li>
      </ul>
      <div class="des mb30">
        <h3 id="id1">优势亮点</h3>
        <div class="dot">
          <div>
            <ul>
              <li><img src="../../assets/img/partner/banner.jpg"></li>
              <li><img src="../../assets/img/partner/banner.jpg"></li>
              <li><img src="../../assets/img/partner/banner.jpg"></li>
              <li><img src="../../assets/img/partner/banner.jpg"></li>
            </ul>
          </div>
        </div>
        <div class="ac">
          <p>{{showMiniDesc ? info.mindesc : info.desc}}</p>
          <!-- <p>零基础舞蹈教练培训</p>
          <p>爵士舞、钢管舞、肚皮舞性感秀、酒吧领舞、TB秀、瑜伽，包分配工作包考证</p>
          <p>姐妹们：(此贴长期有效)</p> -->
          <div class="more" v-if="info.desc&&info.desc.length>300">
            <span @click="showMiniDesc=false" v-if="showMiniDesc=true">展开更多</span>
            <span @click="showMiniDesc=true" v-if="showMiniDesc=false">收起</span>
          </div>
        </div>
      </div>
      <div class="des mb30">
        <h3 id="id2">服务体验</h3>
        <div class="poster">
          <div class="playicon"></div>
          <img :src="info.mediaPoster" alt="" />
        </div>
      </div>

      <div class="des mb30">
        <h3 id="id3">服务保障</h3>
        <div class="poster">
          <img :src="info.mediaPoster" alt="" />
        </div>
      </div>

      <div class="des mb30">
        <h3 id="id4">他的作品</h3>
        <div class="workless">
          <div><img src="../../assets/img/partner/banner.jpg"><p>Cause Dels</p></div>
          <div><img src="../../assets/img/partner/banner.jpg"><p>Cause Dels</p></div>
          <div><img src="../../assets/img/partner/banner.jpg"><p>Cause Dels</p></div>
        </div>
      </div>
      <div class="prom">
        <p>办理服务前请勿付定金、押金等费用！<br/>请先确认对方资质，谨防上当受骗！</p>
        <a href="javascript:;" @click="$router.push('/partner_complaints')">投诉</a>
      </div>
      <div class="clearfix"></div>
      <div class="ficx">
        <div>
          <a href="javascript:;">赞推</a>
          <a href="javascript:;">打榜</a>
          <a href="javascript:;">邀请下单</a>
          <a href="javascript:;">收藏</a>
        </div>
        <div>
          <a href="javascript:;">咨询</a>
          <a href="javascript:;">预约下单</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServiceInfo, applause } from "../../api/partner";
import { getVideoUrl } from "../../api/publish";
import { mapState } from "vuex";
export default {
  data () {
    return {
      id: this.$route.query.service_id,
      info: {
        thumb: "",
        user_info: {
          avatar: "",
          nickname: ""
        },
        category: {
          name: ""
        },
        mindesc: "",
        desc: ""
      },
      fixed: false,
      showMiniDesc: true
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted () {
    this._getServiceInfo();
    /* var _this = this;
    window.onscroll = function () {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      console.log(scrollTop);
      _this.fixed = scrollTop >= 455;
      console.log(_this.fixed);
    }; */
  },
  methods: {
    _getServiceInfo () {
      this.$Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      getServiceInfo({
        token: this.token,
        // lng: 117.1772575400,
        // lat: 31.8400868400,
        service_id: this.id
      }).then(res => {
        if (res.error_code) {
          this.$Toast(res.error_msg);
        } else {
          this.info = res.data;
          this.info.mindesc = this.info.desc.substring(0, 300);
          this._getVideoUrl(this.info.media);
        }
        this.$Indicator.close();
      });
    },
    _getVideoUrl (id) {
      getVideoUrl({ alivod_id: id }).then(res => {
        if (res.error_code === 0) {
          // this.info.mediaPoster = res.data.video_meta.CoverURL;
          this.$set(this.info, "mediaPoster", res.data.video_meta.CoverURL);
        }
      });
    },
    _applause (id) {
      applause({
        token: this.token,
        service_id: id
      }).then(res => {
        if (res.error_code) {
          this.$Toast(res.error_msg);
        } else {
          // this.dataList[i].likes_count = 1;
          this.$set(this.info, "user_likes", 1);
        }
      });
    }
  }
};
</script>
<style scoped>
.fl { float: left }
.fr { float: right }
.clear { clear: both; }
.mb30 { margin-bottom: .3rem; }
.detail { font-size: .36rem; }
.detail .bg { background: url(../../assets/img/partner/banner.jpg) no-repeat #666; height:7.81rem; position:relative; background-size: 100% 7.81rem; }
.detail .bg div { display: flex; padding-top: .3rem; color: #fff; position: relative; font-size: .4rem; line-height: .7rem; height: 1rem; }
.detail .bg div i { display: block; height: .5rem; position: absolute; left: .52rem; top: .4rem; background: url(../../assets/img/back_f.png) center no-repeat; background-size: .36rem; width: .5rem;}
.detail .bg div a,.detail .bg div span { text-align: center; flex: 1; }
.detail .bg div a { background: url(../../assets/img/partner/pa_f.png) center no-repeat; background-size: .5rem; position: absolute; right: .52rem; top: .4rem; width: .5rem; height: .5rem;}
.detail .bg > h1 { color: #fff; position:absolute; bottom:1rem; left:.4rem; font-size: .64rem; font-weight: 600;}
.detail .absd { border-radius:.2rem .2rem 0 0; background-color:#fff; margin-top:-.2rem; position: relative; padding:.39rem .45rem;}
.absd h3 { padding-bottom: .3822rem; color: #F77777; font-size: .53rem; display: flex; }
.absd h3 p { margin-left: auto; width: 2.54rem; height: .6rem; color: #fff; font-size: .32rem; line-height: .6rem; border-radius: .3rem 0 0 .3rem; font-weight: normal; background: url(../../assets/img/partner/icon4.png) 1.9rem center no-repeat #8B63E6; background-size: .4rem; padding-left: .23rem; margin-top: .05rem;}
.absd h3 p span:nth-of-type(1) { font-size: .21rem; vertical-align: top; }
.absd h3 p span:nth-of-type(2) { font-size: .32rem; }
.pt_info { margin-bottom: .4rem; overflow: hidden; border-bottom: 1px solid #EAEAEA; border-top: 1px solid #EAEAEA; padding: .2729rem 0;}
.pt_info img { width: .9rem; height: .9rem; border-radius: 50%; background-color:#dad6ff; }
.pt_info div { width: 50%; text-align: left; margin-left:.26rem;}
.pt_info  div h5:nth-of-type(1) { background-image: none; font-size:.36rem; color:#2D3142; font-weight:normal;}
.pt_info div h5:nth-of-type(1) span { font-size:.3rem; color:#7265E3; margin-left:.2rem; }
.pt_info div h5:nth-of-type(2) { font-size:.3rem; color:#9C9EB9; font-weight:normal; font-size: .32rem; }
.pt_info .fr { width: 1.84rem; height: .8rem; border: .03rem solid #7265E3; color:#7265E3; border-radius:.4rem; text-align: center; font-size:.32rem; line-height: .8rem;background: url(../../assets/img/partner/plus.png) 1.3rem center no-repeat; background-size: .22rem; padding-right:.22rem;}
.pt_info .fr span {font-size: .24rem;margin-left:.1rem;}
.base { color: #696969; margin-top: .2rem; font-size: .32rem; }
.base span { display: inline-block; color: #333; width: 1.72rem; }
.pt_nav { color: #9C9EB9; font-size: .4rem; }
.pt_nav > ul { display: flex; margin-bottom: .6rem; }
.pt_nav > ul.fixed { position: fixed; top: 0; left: 0; width: 100%; background: #fff; z-index: 2; padding-top: .1rem;}
.pt_nav > ul li { flex: 1; text-align: center; font-size: .4rem; height: .8rem;}
.pt_nav > ul li a { color: #2D3142; }
.pt_nav > ul li.active a { border-bottom: .04rem solid #7265E3; color: #2D3142; padding-bottom: .2rem; }
.des { padding: 0 .45rem; }
.des h3 { color: #2D3142; border-left: .07rem solid #7265E3; padding-left: .1rem; margin-bottom: .3rem; font-size: .44rem; line-height: 1; font-weight: 500; margin-top: .8rem; }
.dot { height: 4.78rem; width: 100%; overflow: hidden; }
.dot > div { height: 5rem; width: 100%; overflow-x: auto; overflow-y: hidden; }
.dot > div ul { width: 18.32rem; overflow: hidden; }
.dot > div li { height: 4.78rem; width: 4.43rem; margin-right: .2rem; background-color: #ccc; float: left; overflow: hidden;}
.dot li:nth-last-of-type(1) { margin-right: 0; }
.ac { margin-top: .2rem; }
.ac > p { color: #2D3142; line-height: .72rem; font-size: .36rem; }
.more { text-align: center; color: #9C9EB9; font-size: .32rem; margin-top: .2rem; }
.more span { position: relative; }
.more span:after { content: ""; display: block; width: 0; height: 0; border: .1rem solid transparent; border-top-color: #9C9EB9; position: absolute; top: .2rem; left: 50%; margin-left: .9rem; }
.clearfix { height: 1.8rem; }
.ficx { display: flex; position: fixed; height: 1.5rem; width: 100%; bottom: 0; left: 0; padding: 0 .45rem; background-color: #fff; padding-top: .2667rem; z-index: 5;}
.ficx div:nth-last-of-type(1) { margin-left: auto; display: flex;}
.ficx div:nth-last-of-type(1) a { display: block; width: 2.4rem; height: .9rem; border-radius: .45rem; background-color: #E0DDF5; color: #7265E3; text-align: center; line-height: .9rem; }
.ficx div:nth-last-of-type(1) a:nth-last-of-type(1) { color: #fff; background-color: #7265E3; margin-left: .2rem; }
.ficx div:nth-of-type(1) a { background: url(../../assets/img/partner/icons1.png) center 0 no-repeat; padding-top: .77rem; background-size: .5689rem; color: #666; width: .5689rem;display: inline-block; white-space: nowrap; font-size: .24rem; margin-right: .4rem; text-align: center;}
.ficx div:nth-of-type(1) a:nth-of-type(2) {background-image: url(../../assets/img/partner/icons2.png);}
.ficx div:nth-of-type(1) a:nth-of-type(3) {background-image: url(../../assets/img/partner/icons3.png);text-indent: -.28rem;}
.ficx div:nth-of-type(1) a:nth-of-type(4) {background-image: url(../../assets/img/partner/icons4.png);}
.prom { display: flex; padding: 0 .45rem; color: #9C9EB9; font-size: .34rem; margin-top: 1rem; }
.prom a { margin-left: auto; background: url(../../assets/img/partner/ts.png) center 0 no-repeat; color: #9C9EB9; background-size: .48rem; padding-top: .54rem; font-size: .32rem; }
.poster { width: 100%; height: 4.6933rem; border-radius: .1rem; overflow: hidden; position: relative;}
.poster .playicon { position: absolute; width: 1.1022rem; height: 1.1022rem; background: url(../../assets/img/partner/play.png) center no-repeat; background-size: cover; left: 50%; top: 50%; margin-left: -.5511rem; margin-top: -.5511rem; }
.poster img { width: 100%; height: 4.6933rem; }
.detail .bg div a.pa { background-image: url(../../assets/img/partner/pa_f_active.png);}
.workless { font-size: .3759rem; color: #000; margin-left: -.2667rem; overflow: hidden; }
.workless > div { width: 2.855533rem; border-radius: .0889rem; overflow: hidden; margin-left: .2667rem; float: left; }
.workless img { width: 100%; height: 3.1076rem; }
</style>
