<template>
  <!-- 邀请打榜 -->
  <div class="eShare-pox">
    <head-nav :title="'邀请打榜'" :navShow="false" :titleColor="'#FFFFFF'" class="header">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHead.png" alt=""></div>
    </head-nav>
    <div class="eShare" ref="printMe">
      <img src="../../../assets/img/home/shareBg.jpg" alt="">
      <div class="eShare-box">
        <div class="eShare-head">
          <div class="eShare-info">
            <div class="eShare-userImg">
              <img :src="body.avatar" alt="">
              <div class="eShare-Vip">
                <span>V4</span>
              </div>
            </div>
            <img src="../../../assets/img/buddy/eShare-bg2.png" alt="">
            <div class="eShare-img"></div>
            <div class="eShare-name">{{body.nickname}}</div>
            <div class="eShare-bd">高品质的服务值得购买</div>
            <div class="eShare-user">
              <div class="eShare-myImg"><img :src="detail.thumb" alt=""></div>
              <div class="eShare-myName">{{detail.name}}</div>
              <div class="eShare-pai">当前排名{{rink}}</div>
            </div>
            <i></i>
            <div class="eShare-code">
              <img :src="imgUrl" alt="">
            </div>
            <div class="eShare-hand">长按识别二维码</div>
            <div class="eShare-last">加入云巧客，共同成长</div>
          </div>
        </div>
      </div>
    </div>
    <div class="eShare-foot">
      <div class="eShare_btnLeft" @click="fenxiang">
        <div class="eShare_btn"><img src="../../../assets/img/home/weicat.png" alt="">分享到微信</div>
      </div>
      <div class="eShare_btnRight" @click="print"><btn :vals="'保存图片到本地'"></btn></div>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="right">
      <img src="../../../assets/img/home/X.png" alt="" class="eShare-x" @click="outPrint">
      <img :src="output" alt="" class="eShare-canvas">
    </mt-popup> -->
  </div>
</template>

<script>
// import OSS from "ali-oss";
import headNav from "../../../components/home/headNav.vue";
import btn from "../../../components/home/btn.vue";
import { mapState, mapActions } from "vuex";
import {
  getInviteHit,
  getContentRanking,
  getServiceDetail,
  getSkillDetail,
  getFInvestmentDetail,
  getFinancingDetail,
  getDispatchDetail,
  getFTransferDetail,
  getCourseDetail
} from "../../../api/buddy.js";
import { getUserShow } from "../../../api/home.js";
export default {
  components: {
    btn,
    headNav
  },
  data() {
    return {
      popupVisible: false,
      output: "",
      id: "",
      type: "",
      body: "",
      imgUrl: "",
      rink: "",
      detail: ""
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    await this.getData();
    this.getRank();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    outPrint() {
      this.popupVisible = false;
    },
    fenxiang() {
      this.$bridge.call("share", {
        url: "https://mp.weixin.qq.com/s/4gU2MMiJliUUqZaNRvI-fw",
        title: this.body.name,
        desc: "加入云巧客，查看更多实用内容",
        thumb: this.buddyContent.thumb,
        type: 1
      });
    },
    async getDatas() {
      var params = {
        token: this.token,
        lng: "113.8529519314236",
        lat: "23.026370713975695"
      };
      var res = null;
      switch (this.type) {
        case "services":
          params.service_id = this.id;
          res = await getServiceDetail(params);
          break;
        case "skills":
          params.skill_id = this.id;
          res = await getSkillDetail(params);
          break;
        case "investments":
          params.investment_id = this.id;
          res = await getFInvestmentDetail(params);
          break;
        case "financings":
          params.financing_id = this.id;
          res = await getFinancingDetail(params);
          break;
        case "dispatches":
          params.dispatch_id = this.id;
          res = await getDispatchDetail(params);
          break;
        case "transfers":
          params.transfer_id = this.id;
          res = await getFTransferDetail(params);
          break;
        case "courses":
          params.course_id = this.id;
          res = await getCourseDetail(params);
          break;
        default:
          break;
      }
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.detail = data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取二维码
    async getData() {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        content_id: this.id,
        content_type: this.type
      };
      var res = await getInviteHit(params);
      try {
        if (res.error_code === 0) {
          this.imgUrl = res.data.url;
          this.getUser();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 保存图片
    print() {
      // share_app方法中添加参数
      // type:app_share
      // share_type:1、邀请注册  2、打榜  3、邀请下单
      // content_id:接口需要参数
      // content_type：接口需要参数
      // service_thumb：服务封面
      // service_name：服务名称
      // service_ranking：服务排名，没有不传
      // days：天数
      // income：收入
      this.$bridge.call("router_app", {
        type: "app_share",
        share_type: 2,
        content_id: this.id,
        content_type: this.type,
        service_thumb: this.detail.thumb,
        service_name: this.detail.name,
        service_ranking: this.rink
      });
    },
    // 排名
    async getRank() {
      var params = {};
      switch (this.type) {
        case "services":
          params.service_id = this.id;
          break;
        case "skills":
          params.skill_id = this.id;
          break;
        case "investments":
          params.investment_id = this.id;
          break;
        case "financings":
          params.financing_id = this.id;
          break;
        case "dispatches":
          params.dispatch_id = this.id;
          break;
        case "transfers":
          params.transfer_id = this.id;
          break;
        case "courses":
          params.course_id = this.id;
          break;
        default:
          break;
      }
      var res = await getContentRanking(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.rink = data.ranking;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getUser() {
      var params = {
        token: this.token
      };
      var res = await getUserShow(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.body = data;
          this.getDatas();
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions(["getToken"])
    // async print() {
    //   var that = this;
    //   that.$Indicator.open("生成中...");
    //   const el = that.$refs.printMe;
    //   const options = {
    //     type: "dataURL"
    //   };
    //   that.output = await that.$html2canvas(el, options);
    //   var imgDate = Date.parse(new Date());
    //   var imgFile = await that.dataURLtoFile(that.output, imgDate + ".png");
    //   console.log(imgFile.name);
    //   setTimeout(function() {
    //     that.popupVisible = true;
    //     that.$Indicator.close();
    //     that.$Toast({
    //       message: "长按图片保存",
    //       duration: 1500
    //     });
    //   }, 1000);
    // },
    // dataURLtoFile(dataurl, filename) { // 将base64转换为文件
    //   var arr = dataurl.split(","); var mime = arr[0].match(/:(.*?);/)[1];
    //   var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // }
  }
};
</script>

<style lang="less" scoped>
  html,body,#app{
    height: 100%;
  }
  .mint-indicator{
    position: relative;
    z-index: 2;
  }
  .mint-toast{
    z-index: 2200;
  }
  .eShare-pox{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .header{
      position: absolute;
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
    .eShare-x{
      width: 0.711111rem;
      position: absolute;
      right: 8%;
      top: 0.711111rem;
    }
    .eShare-canvas{
      width: 100%;
    }
    .eShare-foot{
      display: flex;
      position: absolute;
      bottom: 1.066666rem;
      width: 92%;
      margin-left: 4%;
      .eShare_btnRight{
        padding-left: 0.177777rem;
      }
      .eShare_btnLeft{
        padding-right: 0.177777rem;
        .eShare_btn{
          background: #FFFFFF;
          font-size: 0.426666rem;
          color: #22242A;
          height: 1.173333rem;
          line-height: 1.173333rem;
          text-align: center;
          border-radius: 1.173333rem;
          img{
            width: 0.497777rem;
            vertical-align: middle;
            margin-right: 0.177777rem;
          }
        }
      }
      div{
        flex: 1;
      }
    }
  }
  .eShare > img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .eShare{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .eShare-box{
      width: 92%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .eShare-head{
        width: 100%;
        line-height: 1;
        text-align: center;
        position: absolute;
        bottom: 3.022222rem;
        .eShare-info{
          position: relative;
          // background-color: #FFFFFF;
          // box-shadow: 0 0.106666rem 0.533333rem 0 rgba(3,0,130,0.03);
          // border-radius: 0.106666rem;
          .eShare-user{
            display: flex;
            background-color: #F4F6FA;
            padding: 0.266666rem;
            width: 78%;
            margin: 0 auto;
            margin-top: 0.533333rem;
            position: relative;
            z-index: 1;
            .eShare-pai{
              background-color: #FFA82B;
              color: #FFFFFF;
              font-size: 0.32rem;
              text-align: center;
              padding: 0 0.355555rem;
              height: 0.533333rem;
              border-radius:0.266666rem 0 0 0.266666rem;
              line-height: 0.533333rem;
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 1;
            }
            .eShare-myName{
              line-height: 1.226666rem;
              padding-left: 0.355555rem;
            }
            .eShare-myImg{
              width: 1.777777rem;
              height: 1.226666rem;
              border-radius: 0.106666rem;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          .eShare-userImg{
            width: 2.133333rem;
            height: 2.133333rem;
            position: absolute;
            left: 50%;
            top: -1.066666rem;
            transform: translateX(-50%);
            z-index: 2;
            background: #FFFFFF;
            border-radius: 50%;
            .eShare-Vip{
              width: 0.871111rem;
              height: 0.48rem;
              line-height: 0.48rem;
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              background-color: #FFA82B;
              border-radius: 0.24rem;
              font-size: 0.284444rem;
              z-index: 2;
              span{
                color: #FFFFFF;
              }
            }
            img{
              width: 1.777777rem;
              margin-top: 0.177777rem;
              border-radius: 50%;
              overflow: hidden;
            }
          }
          .eShare-last{
            font-size: 48px;
            color: #333333;
            padding-top: 0.266666rem;
            position: relative;
            z-index: 2;
            padding-bottom: 0.711111rem;
          }
          .eShare-hand{
            font-size: 0.32rem;
            color: #999999;
            position: relative;
            z-index: 2;
            padding-top: 0.355555rem;
          }
          .eShare-code{
            width: 3.555555rem;
            height: 3.555555rem;
            margin: 0 auto;
            margin-top: 0.711111rem;
            padding: 30px;
            border: 1px solid #EAEAEA;
            position: relative;
            z-index: 2;
            img{
              width: 100%;
            }
          }
          i{
            display: block;
            width: 78%;
            margin: 0 auto;
            border: 0.026666rem dashed #EAEAEA;
            margin-top: 0.8rem;
            position: relative;
            z-index: 2;
          }
          .eShare-bd{
            font-size: 0.32rem;
            color: #999999;
            padding-top: 0.266666rem;
            position: relative;
            z-index: 2;
            span{
              color: #FF9C23;
            }
          }
          .eShare-name{
            font-size: 0.373333rem;
            color: #333333;
            padding-top: 1.333333rem;
            position: relative;
            z-index: 2;
          }
        }
        .eShare-info > img{
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
      .eShare-foot{}
    }
  }
</style>
