<template>
  <div class="line-item">
    <div class="line-title">
      <slot name="title"></slot>
    </div>
    <div class="line-other" @click="handleClick">
      <div class="insert-content">
        <slot name="content"></slot>
      </div>
      <div class="arr-icon" v-show="showArrIcon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "line-item",
  props: {
    // 是否展示右边的箭头图标
    showArrIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    }
  }
};
</script>
<style lang="less" scoped>
.line-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1035px;
  height: 178px;
  margin: 0 auto;
  border-bottom: 3px solid rgba(237, 237, 247, 1);
  .line-title {
    white-space: nowrap;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    margin-right: 30px;
  }
  .line-other {
    max-width: 800px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 200px;
    min-height: 50px;
  }
  .insert-content {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-items: center;
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(156, 158, 185, 1);
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 0;
    }
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .arr-icon {
    width: 22px;
    height: 35px;
    margin-left: 30px;
    background: url("../../assets/img/user/arr-icon.png") no-repeat left top /
      100% 100%;
  }
}
</style>
