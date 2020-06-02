<template>
  <div class="action-bar-container">
    <div class="action-bar flex">
      <div class="draft-wrap flex flex-column flex-justify-between flex-align-center" @click="saveDraft">
        <img src="../../assets/img/publish/save-draft.png" alt="" srcset="" />
        <p>存草稿</p>
      </div>
      <div class="action-btn" @click="nextStep">
        下一步
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 发布模块底部公共模块
  name: "bottom-action-bar",
  data() {
    return {};
  },
  methods: {
    saveDraft() {
      this.$emit("saveDraft");
    },
    nextStep() {
      this.$emit("nextStep");
    }
  }
};
</script>

<style lang="less" scoped>
.action-bar-container {
  height: 232px;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: #fff;
}
.action-bar {
  width: 1000px;
  height: 132px;
  margin-left: 80px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .draft-wrap {
    width: 115px;
    height: 132px;
    img {
      width: 90px;
      height: 90px;
    }
    p {
      text-align: center;
      font-size: 27px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(156, 158, 185, 1);
      line-height: 37px;
    }
  }
  .action-btn {
    width: 830px;
    height: 132px;
    background-image: url(../../assets/img/publish/btn-next-step.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 132px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
