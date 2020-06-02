<template>
  <li class="section other">
    <h1 class="page-title">其他信息</h1>
    <radio-line :buinessInfo="buinessInfo" v-if="buinessInfo"></radio-line>
    <div class="input-item" v-for="item in selectList" :key="item.id" v-show="showBuiness(item)">
      <div class="describe">{{ item.title }}</div>
      <input
        :key="`${service_type}item.id`"
        :name="item.id"
        max="1000000"
        min="1"
        type="number"
        placeholder="0"
        @blur="saveInputValue($event)"
      />
    </div>
    <div class="footer">
      <div class="submit-btn" @click="nextStep">进入主页</div>
      <div class="prev-btn" @click="prevStep">上一步</div>
    </div>
  </li>
</template>

<script>
import RadioLine from "./radio-line";
import { mapState, mapMutations } from "vuex";
export default {
  name: "other",
  props: {
    selectList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      buinessInfo: null
    };
  },
  computed: {
    ...mapState("information", [
      "type",
      // 技能赚钱中，用到身份信息 1企业 2个人
      "service_type",
      // 与收入
      "planned",
      // 目前收入
      "current",
      // 计划时长
      "planning_time"
    ])
  },
  components: { RadioLine },
  methods: {
    // 展示企业规模
    showBuiness(item) {
      if (item.id !== "setPlanningTime") return true;
      // 找人派单 || 技能赚钱
      if (this.type === 3) {
        this.buinessInfo = item;
        return false;
      }
      if (this.type === 5 && this.service_type === 1) {
        this.buinessInfo = item;
        return false;
      } else if (this.type === 5 && this.service_type === 2) {
        this.buinessInfo = null;
      }
      return true;
    },
    prevStep() {
      this.$emit("prevStep");
    },
    // 将input表单数值进行保存
    saveInputValue($evt) {
      let inputName = $evt.target.name || "";
      let value = $evt.target.value.trim();
      if (this[inputName]) {
        this[inputName](value);
      }
    },
    toast(msg) {
      this.$Toast({
        message: msg,
        duration: 1500
      });
    },
    // 验证表单
    nextStep() {
      var errMsg = "";
      if (this.planned <= 0 || this.planned > 1000000) {
        switch (this.type) {
          case 1:
            errMsg = "请重新输入计划月收入";
            break;
          case 2:
            errMsg = "请重新输入众筹目标";
            break;
          case 3:
            errMsg = "请重新输入目标业绩";
            break;
          case 5:
            if (this.service_type === 1) {
              errMsg = "请重新输入目标业绩";
            } else if (this.service_type === 2) {
              errMsg = "请重新输入计划月收入";
            }
            break;
          case 6:
            errMsg = "请重新输入投资目标";
            break;
        }
        return this.toast(errMsg);
      }
      if (this.current <= 0 || this.current > 1000000) {
        switch (this.type) {
          case 1:
            errMsg = "请重新输入目前月收入";
            break;
          case 2:
            errMsg = "请重新输入已完成的募资金额";
            break;
          case 3:
            errMsg = "请重新输入已完成的目标业绩";
            break;
          case 5:
            if (this.service_type === 1) {
              errMsg = "请重新输入已完成的目标业绩";
            } else if (this.service_type === 2) {
              errMsg = "请重新输入目前月收入";
            }
            break;
          case 6:
            errMsg = "请重新输入完成的投资金额";
            break;
        }
        return this.toast(errMsg);
      }
      if (
        (this.planning_time <= 0 || this.planning_time > 999) &&
        this.type !== 6
      ) {
        switch (this.type) {
          case 1:
            errMsg = "请重新输入预计达到时间";
            break;
          case 2:
            errMsg = "请重新输入预计完成时间";
            break;
          case 5:
            if (this.service_type === 2) {
              errMsg = "请重新输入预计达到时间";
            }
            break;
        }
        return this.toast(errMsg);
      }

      this.$emit("nextStep");
    },
    ...mapMutations("information", [
      "setPlanned",
      "setCurrent",
      "setPlanningTime"
    ])
  },
  watch: {
    buinessInfo(newVal) {
      if (newVal) {
        this.setPlanned("");
        this.setCurrent("");
        this.setPlanningTime(2);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/information.less";
</style>
