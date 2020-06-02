<template>
  <li class="section">
    <h1 class="page-title">{{title || '预计获取服务时间'}}</h1>
    <select-line
      @click.native="selectServiceTime(item)"
      :id="item.id"
      :selectId="service_time"
      v-for="(item, index) in selectList"
      :key="index"
    >
      <span class="desc" slot="desc">{{ item.title }}</span>
    </select-line>
    <div class="footer">
      <div class="prev-btn" @click="prevStep">上一步</div>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SelectLine from "./select-line";
export default {
  name: "service-time",
  props: {
    title: String,
    selectList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("information", ["service_time"])
  },
  components: {
    SelectLine
  },
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    selectServiceTime(item) {
      this.setServiceTime(item.id);
      setTimeout(() => {
        this.$emit("nextStep");
      }, 500);
    },
    ...mapMutations("information", ["setServiceTime"])
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/information.less";
</style>
