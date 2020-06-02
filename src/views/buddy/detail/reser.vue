<template>
  <div>
    <div class="header">
      <head-nav :title="'预约下单'" :navShow="false" :titleColor="'#FFFFFF'">
        <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHead.png" alt=""></div>
      </head-nav>
    </div>
    <div class="box">
      <div class="centers">
        <div class="left" :style="'background-image: url('+buddyContent.thumb+')'"></div>
        <div class="right">
          <div class="title">{{buddyContent.name}}</div>
          <div class="price">￥{{buddyContent.price}}/天</div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="hd">
            <div class="num">01</div>
            <div class="font">支付意向金</div>
          </div>
        </div>
        <div class="item">
          <div class="hd">
            <div class="num">02</div>
            <div class="font">交换联系方式</div>
          </div>
        </div>
        <div class="item">
          <div class="hd">
            <div class="num">03</div>
            <div class="font">线下达成交易</div>
          </div>
        </div>
      </div>
      <div class="des">为了表示双方诚意，在预约对方服务前，需支付少量平台金币给对方。平台金币可通过完成平台任务获得，不支持在线充值获取金币！</div>
    </div>
    <div class="mfooter">
      <div class="bd">
        <div class="left">{{price}}<span>经验宝石</span></div>
        <div class="right" @click="play">支付预约金</div>
      </div>
    </div>
  </div>
</template>

<script>
import headNav from "../../../components/home/headNav.vue";
import { mapState, mapActions } from "vuex";
import {
  getSysconfig
  // getOrderStore
} from "../../../api/buddy.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      id: "",
      type: "",
      body: [],
      price: ""
    };
  },
  computed: {
    ...mapState(["token"]),
    // ...mapState({
    //   print: state => state.buddy.buddyContent
    // })
    ...mapState("buddy", ["buddyContent"])
  },
  mounted() {
    this.id = Number(this.$route.query.id);
    this.type = this.$route.query.types;
    // this.body = this.buddyContent;
    this.getData();
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    async play() {
      var that = this;
      // console.log(this.buddyContent);
      that.$bridge.call("to_chat", {
        token: that.token,
        to_user_id: that.buddyContent.user_info.user_id,
        content: that.buddyContent.id,
        type: that.buddyContent.type,
        title: that.buddyContent.name,
        pic: that.buddyContent.thumb,
        price: that.buddyContent.price,
        time: that.buddyContent.created_at,
        updated: that.buddyContent.updated_at
      });
      // var that = this;
      // var params = {
      //   token: this.token,
      //   content_id: this.body.id,
      //   content_type: this.type
      // };
      // var res = await getOrderStore(params);
      // try {
      //   if (res.error_code === 0) {
      //     that.$Toast({
      //       message: res.error_msg,
      //       duration: 1500
      //     });
      //     setTimeout(function() {
      //       that.$bridge.call("to_chat");
      //     }, 1500);
      //   } else {
      //     that.$Toast({
      //       message: res.error_msg,
      //       duration: 1500
      //     });
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    },
    async getData() {
      !this.token && (await this.getToken());
      var params = {
        type: "yinliu_xiaohaolujing",
        id: 3
      };
      var res = await getSysconfig(params);
      try {
        if (res.error_code === 0) {
          var json = JSON.parse(res.data.data[0].json);
          this.price = json.yuyuejin.price1;
        } else {
          console.log(res.error_msg);
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
  .mfooter{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    box-shadow:0 -0.204444rem 0.32rem 0 rgba(0, 0, 0, 0.05);
    .bd{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 92%;
      margin: 0 auto;
      height: 1.333333rem;
      .right{
        color: #FFFFFF;
        width: 2.4rem;
        height: 0.8rem;
        text-align: center;
        background: linear-gradient(122deg, #8b63e6 0%, #6155cc 100%);
        margin-left: 0.213333rem;
        border-radius: 0.8rem;
        line-height: 0.8rem;
      }
      .left{
        font-size: 0.533333rem;
        color: #F77777;
        span{
          font-size: 0.355555rem;
          padding-left: 0.177777rem;
        }
      }
    }
  }
  .box{
    width: 92%;
    margin: 0 auto;
    .des{
      font-size: 0.355555rem;
      color: #333333;
      line-height: 0.533333rem;
      padding-top: 0.533333rem;
    }
    .list{
      display: flex;
      padding-top: 0.533333rem;
      .item{
        flex: 1;
        padding-right: 0.328888rem;
        &:last-child{
          padding-right: 0;
        }
        .hd{
          line-height: 1;
          background-color: #F6F6FB;
          border-radius: 0.106666rem;
          text-align: center;
          .num{
            font-size: 0.48rem;
            color: #7265E3;
            padding-top: 0.346666rem;
            padding-bottom: 0.266666rem;
          }
          .font{
            font-size: 0.266666rem;
            color: #000000;
            padding-bottom: 0.355555rem;
          }
        }
      }
    }
    .centers{
      display: flex;
      padding: 0.4rem 0;
      border-bottom: 0.026666rem solid #EDEDF7;
      .right{
        flex: 1;
        padding-left: 0.266666rem;
        line-height: 1;
        .price{
          font-size: 0.32rem;
          color: #000000;
        }
        .title{
          font-size: 0.426666rem;
          color: #000000;
          padding-top: 0.088888rem;
          padding-bottom: 0.337777rem;
        }
      }
      .left{
        width: 1.777777rem;
        height: 1.226666rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        border-radius: 0.106666rem;
      }
    }
  }
  .header{
    background-color: #7265E3;
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
</style>
