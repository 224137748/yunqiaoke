<template>
  <div class="topic flex flex-align-center" @click="triggerSelectTopic">
    <img class="topic-img" src="../../assets/img/publish/topic.png" alt="">
    <span class="flex-1 topic-text">{{tname?tname:'选择话题'}}</span>
    <img class="arrow" src="../../assets/img/publish/arrow-right.png" alt="">
  </div>
</template>

<script>
export default {
  // 发布模块底部公共模块
  name: "publish-topic",
  props: ["type", "tname"],
  data() {
    return {};
  },
  methods: {
    triggerSelectTopic() {
      this.$emit("selectTopic");
      // this.$router.push({ path: "/publish/topic", query: { type: this.type } });
    }
  }
};
</script>

<style lang="less" scoped>
.topic {
  width: 1035px;
  height: 158px;
  background: rgba(244, 246, 250, 1);
  border-radius: 30px;
  padding: 0 45px;
  margin-top: 50px;
  .topic-img {
    width: 60px;
    height: 61px;
    margin-right: 32px;
  }
  .topic-text {
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(114, 101, 227, 1);
    line-height: 158px;
  }
  .arrow {
    width: 20px;
    height: 34px;
  }
}
</style>
