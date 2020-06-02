<template>
  <type-template class="type-invest-page" @submit="submit">
    <div class="line-input auth-status">
      <div class="tit">您的投资身份</div>
      <div class="auth-check">
        <div class="radio-item" @click="handleAuthCheck(3)">
          <span class="radio" :class="{ active: auth_status === 3 }"></span>
          <span class="text">个人投资</span>
        </div>
        <div class="radio-item" @click="handleAuthCheck(4)">
          <span class="radio" :class="{ active: auth_status === 4 }"></span>
          <span class="text">企业投资</span>
        </div>
      </div>
    </div>
    <div class="line-input">
      <div class="tit">您的职位</div>
      <input type="text" placeholder="例如：法人" maxlength="50" name="setJob" @blur="saveValue($event)" />
    </div>
    <div class="line-input">
      <div class="tit">您今年的投资目标(万元)</div>
      <input
        type="number"
        min="1"
        max="10000"
        placeholder="0"
        name="setPlanned"
        @blur="saveValue($event)"
      />
    </div>
    <div class="line-input">
      <div class="tit">您今年已完成的投资金额(万元)</div>
      <input
        type="number"
        min="1"
        max="10000"
        placeholder="0"
        name="setCurrent"
        @blur="saveValue($event)"
      />
    </div>
  </type-template>
</template>

<script>
import TypeTemplate from "../../../components/user/type-template";
import mixin from "./mixin";
export default {
  name: "type-invest-page",
  mixins: [mixin],
  components: {
    TypeTemplate
  },
  methods: {
    handleAuthCheck(id) {
      id && this.setAuthStatus(id);
    }
  }
};
</script>
<style lang="less" scoped>
.type-invest-page {
  min-height: 100vh;
}
.auth-status {
  .tit {
    margin-bottom: 60px;
  }
  .auth-check {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .radio-item {
      display: flex;
      align-items: center;
      margin-right: 90px;
      .text {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        // line-height: 42px;
      }
    }
    .radio {
      display: inline-block;
      width: 45px;
      height: 45px;
      background: #d6d9e0;
      margin-right: 30px;
      border-radius: 10px;
      &.active {
        background: #7265e3;
      }
    }
  }
}
</style>
