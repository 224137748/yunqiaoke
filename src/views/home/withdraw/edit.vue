<template>
  <!-- 编辑收款信息 -->
  <div class="medit">
    <div class="draw-item">
      <div class="draw-title">收款账户类型</div>
      <div class="draw-input" @click="onDraw">
        <sinput :type="'text'" :srcImg="true" :placeholder="'0.0'" :disabled="true"></sinput>
      </div>
    </div>
    <div class="draw-item">
      <div class="draw-title">收款人姓名</div>
      <div class="draw-input">
        <sinput :type="'text'" :placeholder="'0.0'" @inputValue="tapInput"></sinput>
      </div>
    </div>
    <div class="draw-item">
      <div class="draw-title">收款人手机</div>
      <div class="draw-input">
        <sinput :type="'number'" :placeholder="'0.0'" @inputValue="tapPhone"></sinput>
      </div>
    </div>
    <div class="draw-item">
      <div class="draw-title">收款人账号</div>
      <div class="draw-input">
        <sinput :type="'number'" :placeholder="'0.0'" @inputValue="tapAccount"></sinput>
      </div>
    </div>
    <btn :vals="'保存信息'" @btnClick="kepUp" class="draw-buttom"></btn>
  </div>
</template>

<script>
import sinput from "../../../components/home/input.vue";
import btn from "../../../components/home/btn.vue";
export default {
  components: {
    sinput,
    btn
  },
  data() {
    return {

    };
  },
  methods: {
    kepUp() {
      console.log("123");
    },
    onDraw() {
      console.log("123");
    },
    tapInput(val) {
      console.log(val);
    },
    tapPhone(val) {
      console.log(val);
    },
    tapAccount(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
  .medit{
    width: 92%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    .draw-buttom{
      width: 92%;
      position: fixed;
      left: 4%;
      bottom: 1.244444rem;
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
