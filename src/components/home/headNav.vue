<template>
  <div :style="'padding-top:' + statHeight + 'px'">
    <div class="nav">
      <div class="back" v-if="navShow" @click="goBack"><img src="../../assets/img/home/leftHead.png" alt=""></div>
      <slot name="headerLeft" v-else></slot>
      <span :style="'color:' + titleColor">{{title}}</span>
      <div class="rightContent"><slot name="header"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    navShow: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
      statHeight: ""
    };
  },
  async mounted() {
    let height = await this.$bridge.call("getStatusBarHeight");
    this.statHeight = height.height;
    // console.log(this.statHeight);
  },
  methods: {
    goBack() {
      this.$bridge.call("router_app", {
        type: "app_home"
      });
    }
  }
};
</script>

<style lang="less">
  .nav{
    width: 100%;
    height: 1.333333rem;
    line-height: 1.333333rem;
    text-align: center;
    position: relative;
    z-index: 99999;
    span{
      font-size: 0.462222rem;
      color: #FFFFFF;
    }
    .rightContent{
      position: absolute;
      right: 4%;
      top: 50%;
      transform: translateY(-50%);
    }
    .back{
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
