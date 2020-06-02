<template>
  <div class="agreement">
    <span class="radio" @click="toggleAgreeType" :class="{ active: agreeType }"></span>
    同意
    <span class="spe" @click="goAgreement(9)">《服务条款》</span>和
    <span @click="goAgreement(8)" class="spe">《用户隐私协议》</span>
  </div>
</template>

<script>
export default {
  // 用户同意相关协议 页面
  name: "agree-agrement",
  data() {
    return {
      agreeType: true
    };
  },
  methods: {
    toggleAgreeType() {
      this.agreeType = !this.agreeType;
    },
    // 跳往用户协议
    goAgreement(id) {
      this.$router.push("/agreement?id=" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.agreement {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 42px;
  color: rgba(156, 158, 185, 1);
  line-height: 42px;
  font-weight: 400;
  .radio {
    position: relative;
    width: 45px;
    height: 45px;
    margin-right: 32px;
    background: rgb(214, 217, 224);
    border-radius: 12px;
    &.active {
      background-color: rgba(114, 101, 227, 1);
    }
  }
  .spe {
    color: hsla(246, 69%, 64%, 1);
  }
}
</style>
