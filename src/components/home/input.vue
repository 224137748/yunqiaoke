<template>
  <div class="target-input">
    <input :type="type" :placeholder="placeholder" :value="value" :disabled="disabled" @input="inputChange">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAdCAYAAADoxT9SAAABzElEQVRYhdXYwUvbYBjH8e+TNtWeJ1SqVQiUF91xh0Grt+0P2dWDt7G/bQPxIl48yA5WIpjR1ggFPZexzseDdLgurumbN6b5HcNL8nx487x53wjAxdWPT/IgBwjvAKE8OVfk81uzfSS9q/4HVL9RLsDzqCIfPVS/UF4EgKAPhx7KetGVZI5I21Pha9F1ZI2gZ3J5efNGvcl3YKPogiwTV6i893Z2Nu/xa11VHRRdkUVi/FrXmFbsAewGzX5Vqp2SYWL8Wnc3aPZhZrUKw+HGRCenIrJVTG2p8xcCEpbdEmD+QQB4s6OMacXL+pqp6iAJAQkQWE6Mqg6qUu0kIWDOF31ZXrMpwphW/NKYuVuTojFpEJByj1UUJi0CXuiR2fzpGYiyl5cuiyBgwV1vFI0a41/jU4HArrx0WRQBFtv3vDE2CLA8h+SFsUVAyh6ZTRA0RnW/7rRnFCJbBGQ8GbqaGYWo7tc7QdAY2d4j8xE3K8YFAhyd1W0xrhDg8KfDohiXCLBs9qRMFwBUw3ljXSPAIQSeMBVZ2fsfJg8E5PQ/Kwxv137rzxNEzPPreSHA8YxMY0zzzq+s7qtyPL2mcJIX4lXSux62e9fDdt7PeQSabP6AlgCxdwAAAABJRU5ErkJggg==" alt="" v-if="srcImg">
  </div>
</template>

<script>
// placeholder  String    输入框空时占位符
// type         String  text    输入框类型
// @inputValue  用于获取输入框的值
export default {
  props: {
    type: { // 输入框类型
      type: String,
      default: "text"
    },
    placeholder: { // 输入框空时占位符
      type: String,
      default: "请输入"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    srcImg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    };
  },
  methods: {
    inputChange (e) {
      this.$emit("inputValue", e.target.value);
    }
  }
};
</script>

<style lang="less">
  .target-input{
    position: relative;
    background: rgba(244,246,250,1);
    border-radius: 0.266666rem;
    img{
      width: 0.355555rem;
      height: 0.266666rem;
      position: absolute;
      right: 0.533333rem;
      top: .7rem;
    }
    input{
      width: 100%;
      line-height: .46rem;
      background: rgba(244,246,250,1);
      padding: 0.533333rem 0.533333rem;
      font-size: .46rem;
      border-radius: 0.266666rem;
    }
    input::-webkit-input-placeholder{
      color: #D6D9E0;
      font-size: .46rem;
    }
  }
</style>
