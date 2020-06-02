<template>
  <div class="input-item" v-if="buinessInfo">
    <div class="describe">{{ buinessInfo.title }}</div>
    <!-- <input :name="buinessInfo.id" type="number" placeholder="0" @blur="saveInputValue($event)" /> -->
    <div class="radio-line">
      <div class="cirl-line">
        <div class="cirl" :class="actCls(1)" @click="setPlanningTime(1)"></div>
        <div class="line"></div>
        <div class="cirl" :class="actCls(2)" @click="setPlanningTime(2)"></div>
        <div class="line"></div>
        <div class="cirl" :class="actCls(3)" @click="setPlanningTime(3)"></div>
      </div>
      <div class="text-line">
        <div class="text" :class="actCls(1)" @click="setPlanningTime(1)">30人及以下</div>
        <div class="text" :class="actCls(2)" @click="setPlanningTime(2)">30-100人</div>
        <div class="text" :class="actCls(3)" @click="setPlanningTime(3)">100人以上</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "iadio-line",
  props: {
    buinessInfo: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      // 找人派单: 1三十人一下, 2三十人到一百人, 3一百人以上;
    };
  },
  created() {},
  computed: {
    ...mapState("information", ["planning_time"])
  },
  methods: {
    actCls(id) {
      if (this.planning_time === id) {
        return "active";
      }
    },
    ...mapMutations("information", ["setPlanningTime"])
  }
};
</script>

<style lang="less" scoped>
.input-item {
  width: 996px;
  margin: 0 auto 90px;
  .describe {
    margin-bottom: 30px;
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
  }
  .radio-line {
    .cirl-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      .cirl {
        width: 60px;
        height: 60px;
        background: rgba(214, 217, 224, 1);
        border-radius: 50%;
        border: 12px solid rgba(244, 246, 250, 1);
        &:first-child {
          margin-left: -12px;
        }
        &:last-child {
          margin-right: -12px;
        }
        &.active {
          background: #7265e3;
        }
      }
      .line {
        flex: 1;
        height: 15px;
        background: rgba(214, 217, 224, 1);
      }
    }
    .text-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(156, 158, 185, 1);
      line-height: 54px;
      .text.active {
        color: #7265e3;
      }
    }
  }
}
</style>
