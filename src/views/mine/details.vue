<template>
  <!-- 预约详情 -->
  <div class="details">
    <div class="deta-bg">
      <div class="deta-box">
        <div class="deta-hd" v-if="body.status === 1"><img src="../../assets/img/mine/detail-hd.png" alt="">已预约</div>
        <div class="deta-hd" v-if="body.status === 2"><img src="../../assets/img/mine/detail-hd.png" alt="">已拒绝</div>
        <div class="deta-hd" v-if="body.status === 3"><img src="../../assets/img/mine/detail-hd.png" alt="">已取消</div>
        <div class="deta-hd" v-if="body.status === 4"><img src="../../assets/img/mine/detail-hd.png" alt="">已完成</div>
        <div class="deta-bd">
          <div class="deta-head">
            <div class="deta-Img"><img :src="body.content_thumb" alt=""></div>
            <div class="deta-ft">
              <div class="deta-title">{{body.content_name}}</div>
              <div class="deta-price">￥{{body.content_price}}</div>
            </div>
          </div>
          <div class="deta-last">
            <div class="deta-item">服务方昵称：{{body.content_user_info.nickname}}</div>
            <div class="deta-item">买家账号：{{body.user_info.nickname}}</div>
            <div class="deta-item">交易单号：{{body.sn}}</div>
            <div class="deta-item">交易时间：{{body.created_at}}</div>
            <div class="deta-item">服务金额：￥{{body.content_price}}</div>
            <div class="deta-item">预约金：{{body.gem}}</div>
          </div>
        </div>
      </div>
    </div>
    <btn :vals="'联系服务方'" @click="play" class="deta-buttom"></btn>
  </div>
</template>

<script>
import btn from "../../components/home/btn.vue";
import { mapState, mapActions } from "vuex";
import { getOrderShow } from "../../api/home.js";
export default {
  components: {
    btn
  },
  data() {
    return {
      id: "",
      body: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    async getData() {
      !this.token && (await this.getToken());
      var params = {
        token: this.token,
        order_id: this.id
      };
      var res = await getOrderShow(params);
      try {
        if (res.error_code === 0) {
          this.body = res.data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    play() {
      this.$bridge.call("to_chat", {
        token: this.token,
        to_user_id: this.body.content_user_info.user_id,
        content: this.id,
        type: this.body.content_type,
        title: this.body.content_name,
        price: this.body.content_price,
        time: this.body.created_at,
        updated: this.body.content_updated_at
      });
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .details{
    width: 100%;
    height: 100vh;
    background-color: #F2F6FC;
    position: relative;
  }
  .deta-buttom{
    position: fixed;
    bottom: 1.244444rem;
    left: 4%;
    width: 92%;
  }
  .deta-bg{
    width:100%;
    height:7.111111rem;
    background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
    .deta-box{
      width: 92%;
      margin: 0 auto;
      .deta-bd{
        background:rgba(255,255,255,1);
        box-shadow:0px 30px 90px 0px rgba(112,136,210,0.1);
        border-radius: 0.4rem;
        margin-top: 0.4rem;
        padding: 0.4rem;
        .deta-last{
          .deta-item{
            font-size: 0.32rem;
            color: #9C9EB9;
            line-height: 1;
            padding-top: 0.391111rem;
          }
        }
        .deta-head{
          display: flex;
          padding-bottom: 0.382222rem;
          position: relative;
          &::after{
            content: "";
            display: inline-block;
            width: 100%;
            height: 0.026666rem;
            background-color: #F5F5F5;
            position: absolute;
            bottom: 0;
          }
          .deta-ft{
            flex: 1;
            position: relative;
            line-height: 1;
            margin-left: 0.266666rem;
            .deta-price{
              font-size: 0.373333rem;
              color: #F77777;
              position: absolute;
              bottom: 0;
            }
            .deta-title{
              font-size: 0.355555rem;
              color: #2D3142;
            }
          }
          .deta-Img{
            width: 1.866666rem;
            height: 1.866666rem;
            border-radius: 0.106666rem;
            img{
              width: 1.866666rem;
              height: 1.866666rem;
            }
          }
        }
      }
      .deta-hd{
        font-size: 0.64rem;
        color: #FFFFFF;
        padding-top: 1.066666rem;
        img{
          width: 0.8rem;
          vertical-align: middle;
          margin-right: 0.426666rem;
        }
      }
    }
  }
</style>
