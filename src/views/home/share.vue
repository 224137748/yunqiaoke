<template>
  <!-- 分享收入 -->
  <div class="eShare-pox">
    <div class="eShare" ref="printMe">
      <img src="../../assets/img/home/shareBg.jpg" alt="">
      <div class="eShare-box">
        <div class="eShare-head">
          <div class="eShare-info">
            <div class="eShare-userImg"><img :src="body.avatar" alt=""></div>
            <img src="../../assets/img/home/eShare-bg.png" alt="">
            <div class="eShare-img"></div>
            <div class="eShare-name">{{body.nickname}}</div>
            <div class="eShare-bd">我加入云巧客<span>{{body.join_days}}天</span>，已收入<span>{{body.envelope}}元</span></div>
            <i></i>
            <div class="eShare-code">
              <img src="../../assets/img/home/eShare-code.png" alt="">
            </div>
            <div class="eShare-hand">长按识别二维码</div>
            <div class="eShare-last">加入云巧客，共同成长</div>
          </div>
        </div>
      </div>
    </div>
    <div class="eShare-foot">
      <div class="eShare_btnLeft" @click="fenxiang">
        <div class="eShare_btn"><img src="../../assets/img/home/weicat.png" alt="">分享到微信</div>
      </div>
      <div class="eShare_btnRight" @click="print"><btn :vals="'保存图片到本地'"></btn></div>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="right">
      <img src="../../assets/img/home/X.png" alt="" class="eShare-x" @click="outPrint">
      <img :src="output" alt="" class="eShare-canvas">
    </mt-popup> -->
  </div>
</template>

<script>
import btn from "../../components/home/btn.vue";
import { mapState, mapActions } from "vuex";
import { getUserShow } from "../../api/home.js";
export default {
  components: {
    btn
  },
  data() {
    return {
      // popupVisible: false,
      // output: ""
      body: ""
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
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
        share_type: 1,
        days: this.body.join_days,
        income: this.body.envelope
      });
    },
    fenxiang() {
      this.$bridge.call("share", {
        url: "https://mp.weixin.qq.com/s/4gU2MMiJliUUqZaNRvI-fw",
        title: "加入云巧客，共同成长",
        desc: "我已加入平台" + this.body.join_days + "天，收入" + this.body.envelope + "元",
        thumb: "https://yunqiaoke.oss-cn-beijing.aliyuncs.com/slt.png",
        type: 1
      });
    },
    async getData() {
      var params = {
        token: this.token
      };
      var res = await getUserShow(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.body = data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // outPrint() {
    //   this.popupVisible = false;
    // },
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
    ...mapActions(["getToken"])
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
