<template>
  <div>
    <div class="buttom" @click="btn">{{vals}}</div>
  </div>
</template>

<script>
export default {
  props: {
    vals: {
      type: String,
      default: ""
    }
  },
  name: "btn",
  data() {
    return {

    };
  },
  methods: {
    btn(data) {
      this.$emit("btnClick");
    }
  }
};
</script>

<style lang="less">
  .buttom{
    width: 100%;
    height: 1.173333rem;
    border-radius:0.586666rem;
    background:linear-gradient(122deg,rgba(139,99,230,1) 0%,rgba(97,85,204,1) 100%);
    text-align: center;
    font-size: 0.426666rem;
    line-height: 1.173333rem;
    color: #fff;
  }
</style>
