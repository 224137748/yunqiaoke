<template>
  <type-template @submit="submit">
    <div class="line-input">
      <div class="tit">您的姓名</div>
      <input
        type="text"
        placeholder="请输入"
        maxlength="10"
        name="setName"
        @blur="saveValue($event)"
      />
    </div>
    <div class="line-input">
      <div class="tit">
        您的身份证号
        <span class="note">将用于您平台收益的个人所得税缴纳</span>
      </div>
      <input
        type="text"
        placeholder="请输入"
        maxlength="20"
        name="setIdNumber"
        @blur="saveValue($event)"
      />
    </div>
    <div class="upload-identity">
      <div class="id-front">
        <div class="img-wrap" @click="uploadImage('setIdCardFront')">
          <img v-lazy="id_card_front" v-if="id_card_front" alt />
          <div class="empt-front" v-else></div>
        </div>
        <div class="desc-text">身份证人像面</div>
      </div>
      <div class="id-back">
        <div class="img-wrap" @click="uploadImage('setIdCardBack')">
          <img :src="id_card_back" v-if="id_card_back" alt />
          <div v-else class="empt-back"></div>
        </div>
        <div class="desc-text">身份证国徽面</div>
      </div>
      <div class="id-hold">
        <div class="img-wrap" @click="uploadImage('setHoldIdCard')">
          <img :src="hold_id_card" v-if="hold_id_card" alt />
          <div class="empt-hold" v-else></div>
        </div>
        <div class="desc-text">手持身份证</div>
      </div>
    </div>
  </type-template>
</template>

<script>
import TypeTemplate from "../../../components/user/type-template";
import mixin from "./mixin";
// import native from "../../bridge/test";
export default {
  name: "type-skill-page",
  mixins: [mixin],
  data() {
    return {};
  },
  components: {
    TypeTemplate
  }
};
</script>
<style lang="less" scoped></style>
