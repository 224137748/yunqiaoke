<template>
  <div class="bgf8">
    <div class="head">
      <i class="back" @touchend="$router.go(-1)">&nbsp;</i>
      <span>全部分类</span>
    </div>
    <div class="content">
      <div class="cate_left bgff">
        <ul>
          <li v-for="(v,i) in cates" :key="i" :class="{active:active[i]}" @touchend="getCate(i)">{{v}}</li>
        </ul>
      </div>
      <div class="cate_right">
        <p @touchend="goto">企业管理</p>
        <p @touchend="goto">企业管理</p>
        <p @touchend="goto">企业管理</p>
        <p @touchend="goto">企业管理</p>
        <p @touchend="goto">企业管理</p>
        <p @touchend="goto">企业管理</p>
      </div>
    </div>
  </div>
</template>

<style src="../../assets/css/base.css"></style>
<script>
export default {
  data () {
    return {
      cates: ["服务", "派单", "转让", "投资", "融资", "公开课", "技能"],
      active: [true, false, false, false, false, false, false]
    };
  },
  methods: {
    getCate (i) {
      this.active = [false, false, false, false, false, false, false];
      this.$set(this.active, i, true);
    },
    goto () {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner_all",
        hideNav: 1
      });
    }
  }
};
</script>
<style scoped>
.content { display: flex; height: calc(100% - 1.4293rem); }
.cate_left { flex: 0 0 2.4889rem; }
.cate_left li { height: 1.4667rem; color: #2D3142; line-height: 1.4667rem; padding-left: .4rem; }
.cate_left li.active { background-color: #C7C1F4; color: #fff; }
.cate_right { padding-right: .4rem; padding-top: .45rem; }
.cate_right p { margin-left: .3556rem; height: 1.0667rem; border-radius: .53335rem; background-color: #fff; width: 3.2rem; margin-bottom: .4rem; text-align: center; line-height: 1.2rem; font-size: .36rem;  float: left;}
</style>
