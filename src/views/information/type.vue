<template>
  <div class="type-page">
    <div class="desc-tit">选择您需要什么服务？</div>
    <div class="note-text">最多可以选一个</div>
    <div class="select-container">
      <div class="item" v-for="item in typeList" :key="item.id" @click="selectType(item)">
        <div :class="iconCls(item)"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="footer-prev-btn" @click="back">上一步</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "type",
  data() {
    return {
      // 默认选中的类型
      currentType: "",
      // 1找企业,2众筹,3找人派单,4学习财商知识,5技能赚钱,6找项目投资
      typeList: [
        {
          id: 1,
          title: "找企业服务"
        },
        {
          id: 2,
          title: "众筹"
        },
        {
          id: 3,
          title: "找人派单"
        },
        {
          id: 4,
          title: "学习财商知识"
        },
        {
          id: 5,
          title: "技能赚钱"
        },
        {
          id: 6,
          title: "找项目投资"
        }
      ]
    };
  },
  computed: {
    ...mapState("information", ["type"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.currentType = this.type || "";
    },
    iconCls(item) {
      return [`icon${item.id}`, { active: this.currentType === item.id }];
    },
    // 返回
    back() {
      this.$router.replace("/information/sex");
    },
    selectType(item) {
      if (!this.isTouched) {
        this.isTouched = true;
        this.currentType = item.id;
        this.setType(item.id);
        setTimeout(() => {
          this.$router.push({
            path: "/information/main"
          });
          this.isTouched = false;
        }, 300);
      }
    },
    // 重新选择type后要重置数据
    resetData() {
      this.setServiceType("");
      this.setServiceTime("");
      this.setPlanned("");
      this.setCurrent("");
      this.setPlanningTime("");
      this.setCategory("");
    },
    ...mapMutations("information", [
      "setType",
      "setServiceType",
      "setServiceTime",
      "setPlanned",
      "setCurrent",
      "setPlanningTime",
      "setCategory"
    ])
  },
  watch: {
    type(newVal) {
      if (newVal) {
        this.resetData();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.type-page {
  overflow: hidden;
}
.select-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1022px;
  margin: 276px auto 0;
  .item {
    width: 270px;
    margin-bottom: 140px;
    [class*="icon"] {
      width: 270px;
      height: 270px;
      margin-bottom: 32px;
    }
    .icon1 {
      background: url("../../assets/img/infor/type1.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type1_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .icon2 {
      background: url("../../assets/img/infor/type2.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type2_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .icon3 {
      background: url("../../assets/img/infor/type3.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type3_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .icon4 {
      background: url("../../assets/img/infor/type4.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type4_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .icon5 {
      background: url("../../assets/img/infor/type5.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type5_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .icon6 {
      background: url("../../assets/img/infor/type6.png") no-repeat left top/
        100% 100%;
      &.active {
        background: url("../../assets/img/infor/type6_s.png") no-repeat left
          top/ 100% 100%;
      }
    }
    .title {
      white-space: nowrap;
      text-align: center;
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
  }
}
</style>
