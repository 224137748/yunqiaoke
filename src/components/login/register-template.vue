<template>
  <div class="register-page">
    <div class="logo"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "register-tenplate"
};
</script>

<style lang="less" scoped>
.register-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0 66px;
  background: #f4f6fa;
  overflow: hidden;
  .logo {
    width: 318px;
    height: 172px;
    margin: 360px auto 140px;
    background: url("../../assets/img/login/logo.png") no-repeat center / 100%;
  }
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 120px;
    width: 993px;
    height: 132px;
    background: linear-gradient(
      122deg,
      rgba(139, 99, 230, 1) 0%,
      rgba(114, 101, 227, 1) 100%
    );
    border-radius: 66px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style
>>
