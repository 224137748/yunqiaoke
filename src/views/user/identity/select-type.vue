<template>
  <div class="select-type-page">
    <div
      class="type-item"
      v-for="(item, index) in typeList"
      :key="index"
      @click="selectType(item.id)"
    >
      <div :class="bindCls(item)"></div>
      <div class="type-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "select-type-page",
  data() {
    return {
      // 1技能者,2雇主方,3个人投资者,4企业投资者
      typeList: [
        {
          id: 1,
          text: "技能者"
        },
        {
          id: 2,
          text: "雇主方"
        },
        {
          id: 3,
          text: "投资人"
        }
      ]
    };
  },
  computed: {
    ...mapState("identity", ["auth_status"])
  },
  methods: {
    // cls
    bindCls(item) {
      let clsArr = [
        `type-img${item.id}`,
        { active: this.auth_status === item.id }
      ];
      // 投资人选项当 auth_status == 3 或者 4 时都要高亮
      if (item.id === 3) {
        if (this.auth_status === 4) {
          clsArr.push("active");
        }
      }
      return clsArr;
    },
    selectType(id) {
      this.setAuthStatus(id);
      let path = "";
      switch (id) {
        case 1:
          path = "type-skill";
          break;
        case 2:
          path = "type-employer";
          break;
        case 3:
          path = "type-invest";
          break;
      }
      setTimeout(() => {
        this.$router.push(path);
      }, 500);
    },
    ...mapMutations("identity", ["setAuthStatus"])
  }
};
</script>
<style lang="less" scoped>
.select-type-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 50px 0;
  background: #fff;
  overflow: hidden;
  .type-item {
    width: 270px;
    text-align: center;
    [class*="type-img"] {
      width: 270px;
      height: 270px;
      margin-bottom: 30px;
    }
    .type-img1 {
      background: url("../../../assets/img/user/type_skill.png") no-repeat
        center center / 100% 100%;
      &.active {
        background: url("../../../assets/img/user/type_skill_s.png") no-repeat
          center center / 100% 100%;
      }
    }
    .type-img2 {
      background: url("../../../assets/img/user/type_employer.png") no-repeat
        center center / 100% 100%;
      &.active {
        background: url("../../../assets/img/user/type_employer_s.png")
          no-repeat center center / 100% 100%;
      }
    }
    .type-img3 {
      background: url("../../../assets/img/user/type_invest.png") no-repeat
        center center / 100% 100%;
      &.active {
        background: url("../../../assets/img/user/type_invest_s.png") no-repeat
          center center / 100% 100%;
      }
    }
    .type-text {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
  }
}
</style>
