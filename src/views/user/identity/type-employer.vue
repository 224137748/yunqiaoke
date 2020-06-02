<template>
  <type-template class="type-employer-page" @submit="submit">
    <div class="line-input">
      <div class="tit">机构名称</div>
      <input
        type="text"
        placeholder="请输入"
        maxlength="50"
        name="setCompany"
        @blur="saveValue($event)"
      />
    </div>
    <div class="upload-identity">
      <div class="id-front">
        <div class="img-wrap" @click="uploadImage('setLicense')">
          <img :src="license" v-if="license" alt />
          <div class="empt-front"></div>
        </div>
        <div class="desc-text">营业执照（或副本）</div>
      </div>
    </div>
  </type-template>
</template>

<script>
import TypeTemplate from "../../../components/user/type-template";
import mixin from "./mixin";
export default {
  name: "type-employer-page",
  mixins: [mixin],
  components: {
    TypeTemplate
  }
};
</script>
<style lang="less" scoped>
.type-employer-page {
  min-height: 100vh;
  .upload-identity .img-wrap .empt-front {
    background: url("../../../assets/img/user/identity_unit.png") no-repeat
      center center / 100% 100% #fff;
  }
}
</style>
