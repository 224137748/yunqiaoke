<template>
  <li class="section">
    <h1 class="page-title">选择您的身份</h1>
    <ul class="identity-container">
      <div
        class="identity-item"
        v-for="(item, index) in selectList"
        :key="item.id + index"
        @click="selectServiceType(item)"
      >
        <div class="icon" :class="{ active: service_type === item.id }"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </ul>
    <div class="footer">
      <div class="prev-btn" @click="prevStep">上一步</div>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import mainData from "../../views/information/data";
export default {
  name: "service-time",
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
    ...mapState("information", ["service_type", "type"])
  },
  components: {},
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    selectServiceType(item) {
      // 如果 用户选择了--技能赚钱--这一类
      if (this.type === 5) {
        let pageData = {};
        // 要根据用户是个人还是企业，填写不同的页面
        if (item.id === 1) {
          pageData = {
            name: "Other",
            title: "",
            selectList: [
              {
                id: "setPlanningTime",
                title: "您现在的企业规模"
              },
              {
                id: "setPlanned",
                title: "您今年的目标业绩（万元）"
              },
              {
                id: "setCurrent",
                title: "您今年已经完成的目标业绩（万元）"
              }
            ]
          };
        } else {
          pageData = {
            name: "Other",
            title: "",
            selectList: [
              {
                id: "setPlanned",
                title: "您计划的月收入（元）"
              },
              {
                id: "setCurrent",
                title: "您目前的月收入（元）"
              },
              {
                id: "setPlanningTime",
                title: "您预计多久达到计划（天）"
              }
            ]
          };
        }
        mainData[this.type - 1][2] = pageData;
      }
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
.identity-container {
  width: 270px;
  margin: 280px auto 0;
  .identity-item {
    margin-bottom: 140px;
    .icon {
      width: 270px;
      height: 270px;
    }
    &:nth-child(1) {
      .icon {
        background: url("../../assets/img/infor/identity2.png") no-repeat left
          top/100% 100%;
      }
      .icon.active {
        background: url("../../assets/img/infor/identity2_s.png") no-repeat left
          top/100% 100%;
      }
    }
    &:nth-child(2) {
      .icon {
        background: url("../../assets/img/infor/identity1.png") no-repeat left
          top/100% 100%;
      }
      .icon.active {
        background: url("../../assets/img/infor/identity1_s.png") no-repeat left
          top/100% 100%;
      }
    }
    .title {
      text-align: center;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(95, 98, 111, 1);
      margin-top: 35px;
    }
  }
}
</style>
