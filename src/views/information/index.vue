<template>
  <div class="information">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "infor-home"
};
</script>
<style lang="less">
// 公共样式
.information {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #f4f6fa;
  overflow: hidden;
  [class$="-page"] {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }
  .desc-tit {
    font-size: 56px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(45, 49, 66, 1);
    text-align: center;
    margin: 50px auto 40px;
  }
  .note-text {
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(156, 158, 185, 1);
    text-align: center;
  }
  .footer-prev-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100px;
    width: 993px;
    height: 132px;
    margin: 0 auto;
    background: linear-gradient(
      122deg,
      rgba(139, 99, 230, 1) 0%,
      rgba(97, 85, 204, 1) 100%
    );
    border-radius: 66px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.swp-fade-enter-active,
.swp-fade-leave-active {
  transition: all 0.3s ease;
}
.swp-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.swp-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
