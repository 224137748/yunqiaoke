<template>
  <div class="sex-page">
    <div class="desc-tit">选择您的性别</div>
    <div class="sex-select-item" @click="selectSex(1)">
      <div class="select" :class="{ active: sexType === 1 }"></div>
      <div class="infor">
        <div class="avatar man"></div>
        <div class="text">男性</div>
      </div>
    </div>
    <div class="sex-select-item" @click="selectSex(2)">
      <div class="select" :class="{ active: sexType === 2 }"></div>
      <div class="infor">
        <div class="avatar women"></div>
        <div class="text">女性</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sex-page",
  data() {
    return {
      sexType: "" // 性别:1男,2女
    };
  },
  computed: {
    ...mapState("information", ["sex"])
  },
  mounted() {
    this.initData();
    this.$bridge.call("setNav", {
      hidden: 0,
      // 非全面屏显示
      immersionStatusBar: 2
    });
  },
  methods: {
    initData() {
      this.sexType = this.sex || "";
    },
    selectSex(type) {
      this.sexType = type;
      this.setSex(type);
      setTimeout(() => {
        this.$router.push("/information/type");
      }, 500);
    },
    ...mapMutations("information", ["setSex"])
  }
};
</script>
<style lang="less" scoped>
.sex-page {
  position: fixed !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .desc-tit {
    margin-bottom: 226px;
  }
  .sex-select-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 528px;
    height: 438px;
    background: rgba(255, 255, 255, 1);
    border-radius: 30px;
    margin: 0 auto 60px;
    .select {
      position: absolute;
      right: 52px;
      top: 52px;
      width: 72px;
      height: 72px;
      background: url("../../assets/img/infor/uselected.png") no-repeat left
        top/ 100% 100%;
      &.active {
        background: url("../../assets/img/infor/selected.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .avatar {
      width: 126px;
      height: 144px;
      &.man {
        background: url("../../assets/img/infor/sex_man.png") no-repeat center
          top / 100% 100%;
      }
      &.women {
        background: url("../../assets/img/infor/sex_women.png") no-repeat center
          top / 100% 100%;
      }
    }
    .text {
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      margin-top: 20px;
    }
  }
}
</style>
