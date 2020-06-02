<template>
  <!-- 提现 -->
  <div class="draw">
    <div class="draw-item">
      <div class="draw-title">收款信息</div>
      <div class="draw-input" @click="onDraw">
        <sinput :type="'text'" :srcImg="true" :placeholder="'请选择'" :disabled="true"></sinput>
      </div>
    </div>
    <div class="draw-item">
      <div class="draw-title">提现金额</div>
      <div class="draw-input">
        <sinput :type="'number'" :srcImg="true" :placeholder="'0.0'"></sinput>
      </div>
    </div>
    <div class="draw-item">
      <div class="draw-title">最终到账 <img src="../../assets/img/home/wen.png" alt=""></div>
      <div class="draw-input">
        <sinput :type="'number'" :srcImg="true" :placeholder="'0.0'"></sinput>
      </div>
    </div>
    <div class="draw-agree">
      <span class="draw-radio" @click="toggleAgreeType" :class="{ active: agreeType }"></span>
      同意 <span class="draw-spe">《云巧客零钱使用协议》</span>
    </div>
    <btn :vals="'提现'" @btnClick="kepUp(1)" class="draw-buttom"></btn>
    <div class="draw-now">提现记录</div>
  </div>
</template>

<script>
import sinput from "../../components/home/input.vue";
import btn from "../../components/home/btn.vue";
export default {
  components: {
    btn,
    sinput
  },
  data() {
    return {
      agreeType: true
    };
  },
  methods: {
    onDraw() {
      console.log("123");
    },
    toggleAgreeType() {
      this.agreeType = !this.agreeType;
    }
  }
};
</script>

<style lang="less" scoped>
  .draw{
    width: 92%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    .draw-now{
      width: 92%;
      text-align: center;
      line-height: 1;
      font-size: 0.426666rem;
      color: #7265E3;
      position: fixed;
      bottom: 0.888888rem;
    }
    .draw-agree{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 0.373333rem;
      color: #9c9eb9;
      line-height: 0.373333rem;
      font-weight: 400;
      .draw-radio{
          position: relative;
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.284444rem;
          background: #d6d9e0;
          border-radius: 0.106667rem;
          &.active {
            background-color: rgba(114, 101, 227, 1);
          }
          .draw-spe{
            color: #7265E3;
          }
      }
    }
    .draw-buttom{
      width: 92%;
      position: fixed;
      left: 4%;
      bottom: 1.911111rem;
    }
    .draw-item{
      padding-bottom: 0.4rem;
      .draw-title{
        font-size: 0.373333rem;
        padding-top: 0.444444rem;
        padding-bottom: 0.444444rem;
        img{
          width: 0.364444rem;
          height: 0.364444rem;
          vertical-align: middle;
          display: inline-block;
        }
      }
      .draw-input{
        position: relative;
        input{
          width: 100%;
          height: 1.546666rem;
          line-height: 1.546666rem;
          background: rgba(244,246,250,1);
          border-radius: 0.266666rem;
          padding: 0 0.533333rem;
          font-size: 0.426666rem;
        }
        input::-webkit-input-placeholder{
          color: #D6D9E0;
          font-size: 0.426666rem;
        }
      }
    }
  }
</style>
