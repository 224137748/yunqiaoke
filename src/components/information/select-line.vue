<template>
  <div class="select-line">
    <div class="desc">
      <slot name="desc"></slot>
    </div>
    <div class="status-icon" :class="{ selected: selectId === id }"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件 当前选中的id
    selectId: {
      type: [String, Number],
      default: ""
    },
    // 当前选项id
    id: {
      type: [String, Number],
      default: -1
    }
  },
  name: "select-line"
};
</script>

<style lang="less" scoped>
.select-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 992px;
  height: 230px;
  margin: 0 auto 45px;
  padding: 0 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  .desc {
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(45, 49, 66, 1);
    line-height: 42px;
  }
  .status-icon {
    width: 72px;
    height: 72px;
    background: url("../../assets/img/infor/uselected.png") no-repeat left top /
      100% 100%;
    &.selected {
      background: url("../../assets/img/infor/selected.png") no-repeat left top /
        100% 100%;
    }
  }
}
</style>
