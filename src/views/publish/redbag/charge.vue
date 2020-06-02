<template>
  <div class="page-publish-charge">
    <div class="money-list-wrap flex flex-wrap">
      <div
        class="list"
        @click="selectItem(item)"
        :class="{ active: item.value == batteryNum }"
        v-for="(item, index) in planList"
        :key="index"
      >
        <p class="value">{{ item.value }}</p>
        <p class="money">￥{{ item.money }}</p>
      </div>
    </div>
    <div class="next-step" @click="goCharge">立即充值</div>
    <div class="mask" v-if="isMaskShow" @click="isMaskShow = false">
      <div class="pay-wrapper flex flex-column flex-align-center" @click.stop>
        <p>选择支付方式</p>
        <img
          class="wx"
          @click="hideMask(1)"
          src="../../../assets/img/publish/wx.png"
          alt=""
          srcset=""
        />
        <img
          class="zfb"
          @click="hideMask(2)"
          src="../../../assets/img/publish/zfb.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>

<script>
// 生成订单 支付订单
import { mapState } from "vuex";
import { generateOrder, payOrder } from "@/api/publish";
export default {
  name: "page-publish-charge",
  data() {
    return {
      isMaskShow: false,
      planList: [
        { money: 10, value: 100 },
        { money: 20, value: 200 },
        { money: 50, value: 500 }
      ],
      batteryNum: 0,
      count: "",
      orderId: 0
    };
  },
  computed: {
    ...mapState({
      token: "token"
    })
  },
  methods: {
    selectItem(item) {
      this.batteryNum = item.value;
    },
    /**
     * 选择支付方式 支付订单 调用支付方法 隐藏蒙层
     * payType 1支付宝 2微信
     */
    hideMask(payType) {
      this.$Indicator.open("请求中...");
      // this.isMaskShow = false;
      payOrder({
        token: this.token,
        order_battery_id: this.orderId,
        type: payType
      }).then(res => {
        this.$Indicator.close();
        console.log(res);
        if (res.error_code === 0) {
          this.$bridge
            .call("pay", {
              type: payType === 1 ? 0 : 1,
              data: res.data
            })
            .then(payInfo => {
              console.log(payInfo);
              if (payInfo && payInfo.success === 1) {
                this.$Toast("支付成功");
                this.$router.back();
              } else {
                this.$Toast("支付失败");
              }
            });
        } else {
          this.$Toast(res.error_msg);
        }
      });
    },
    /**
     * 生成订单 成功后弹出充值方式选择
     */
    goCharge() {
      if (!this.batteryNum) return this.$Toast("请选择充值金额");
      this.$Indicator.open("请求中...");
      // 生成订单
      generateOrder({ token: this.token, battery: this.batteryNum }).then(
        res => {
          this.$Indicator.close();
          console.log(res);
          if (res.error_code === 0) {
            this.isMaskShow = true;
            this.orderId = res.data.order_battery_id;
          } else {
            this.$Toast(res.error_msg);
          }
        }
      );
      // this.$router.push({ path: "/works", query: { type: this.$router.type } });
    }
  }
};
</script>

<style lang="less" scoped>
.page-publish-charge {
  padding: 50px 50px 100px 50px;
  .title {
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    line-height: 36px;
    margin-bottom: 30px;
  }
  .money-list-wrap {
    .list {
      width: 320px;
      padding: 48px 0;
      margin-right: 32px;
      text-align: center;
      width: 320px;
      background: rgba(244, 246, 250, 1);
      border-radius: 12px;
      margin-bottom: 40px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &.active {
        background-color: #e0ddf5;
        .value {
          color: #7265e3;
        }
      }
      .value {
        font-size: 60px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        line-height: 60px;
      }
      .money {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(247, 119, 119, 1);
        line-height: 36px;
        margin-top: 28px;
      }
    }
  }
  .money-wrap {
    height: 174px;
    background: rgba(244, 246, 250, 1);
    border-radius: 30px;
    margin-bottom: 90px;
    .affix {
      width: 145px;
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
    input {
      flex: 1;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      background-color: transparent;
      padding-right: 60px;
      &::placeholder {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(214, 217, 224, 1);
      }
    }
  }
  .count-wrap {
    height: 174px;
    background: rgba(244, 246, 250, 1);
    border-radius: 30px;
    margin-bottom: 90px;
    .affix {
      width: 145px;
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
    input {
      flex: 1;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      background-color: transparent;
      padding-left: 60px;
      &::placeholder {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(214, 217, 224, 1);
      }
    }
  }
  .introduction {
    p {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(156, 158, 185, 1);
      line-height: 60px;
      &.introduction-title {
        margin-bottom: 30px;
      }
    }
  }
  .next-step {
    width: 993px;
    padding: 44px 0;
    text-align: center;
    background: linear-gradient(
      122deg,
      rgba(139, 99, 230, 1) 0%,
      rgba(97, 85, 204, 1) 100%
    );
    border-radius: 66px;
    margin: 350px auto 0 auto;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 37px;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .pay-wrapper {
      background-color: #fff;
      position: relative;
      top: 700px;
      width: 640px;
      margin: 0 auto;
      border-radius: 30px;
      padding: 56px 0 120px 0;
      p {
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(45, 49, 66, 1);
        line-height: 42px;
      }
      .wx {
        width: 320px;
        display: block;
        margin-top: 120px;
      }
      .zfb {
        display: block;
        margin-top: 120px;
        width: 310px;
      }
    }
  }
}
</style>
