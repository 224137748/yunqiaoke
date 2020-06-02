<template>
  <li class="section">
    <h1 class="page-title">找企业服务？</h1>
    <select-line
      @click.native="selectServiceType(item)"
      :id="item.id"
      :selectId="service_type"
      v-for="(item, index) in selectList"
      :key="index"
      ><span class="desc" slot="desc">{{ item.title }}</span>
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
  name: "service-type",
  props: {
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
    ...mapState("information", ["service_type"])
  },
  components: {
    SelectLine
  },
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    selectServiceType(item) {
      this.setServiceType(item.id);
      setTimeout(() => {
        this.$emit("nextStep");
      }, 500);
    },
    ...mapMutations("information", ["setServiceType"])
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/information.less";
</style>
