<template>
  <div>
    <div class="head">
      <i class="back" @click="$router.go(-1)">&nbsp;</i>
      <span>内容举报</span>
    </div>
    <div class="content pd45">
      <div class="cform">
        <label>投诉类型</label>
        <div class="type">
          <input type="text" placeholder="请选择" disabled @touchend.prevent="sheetVisible=true" /><span></span>
        </div>
        <label>投诉描述</label>
        <div>
          <textarea rows="5" placeholder="请输入"></textarea>
        </div>
        <label>上传凭证<span class="gray">（最多可上传9张）</span></label>
        <div class="upload">
          <img v-for="(v,k) in files" :key="k" :src="v">
          <label v-show="files.length<9"><input type="file" @change="upload"></label>
        </div>
      </div>
    </div>
    <mt-actionsheet
      :actions="actions"
      cancelText=""
      v-model="sheetVisible">
    </mt-actionsheet>
    <button class="fixbtn">提交</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: "",
      actions: [{
        name: "类型1",
        method: () => { this.type = "1"; }
      }, {
        name: "类型2",
        method: () => { this.type = "2"; }
      }],
      sheetVisible: false,
      count: 0,
      files: []
    };
  },
  methods: {
    upload (obj) {
      var t = obj.target.files[0];
      var imgSrcI = this.getObjectURL(t);
      this.files.push(imgSrcI);
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  }
};
</script>
<style src="../../assets/css/base.css"></style>
<style scoped>
.content { padding-bottom: 2.5rem; }
.cform > label {color: #2D3142; font-size: .37rem; display: block; margin:.3rem .1rem;}
.cform textarea { padding: .2rem; background: #F4F6FA; border: none; width: 100%; }
.type { position: relative; height: 1rem; }
.type input { height: 1rem; line-height: 1rem; margin: 0 .1rem; width: 100%; background-color: #F4F6FA; text-indent: .2rem; }
.type span { position: absolute; height: 0; width: 0; border: .14rem solid transparent; border-top-color: #D7DAE0; right: .1rem; top: .42rem; }
.upload label { width: 2.6667rem; height: 2.6667rem; background-color: #F6F5FA; border: 1px dashed #ccc; display: inline-block; background: url(../../assets/img/partner/plus2.png) center no-repeat; background-size: cover; vertical-align: top;}
.upload input { opacity: 0; }
.upload img { width: 2.6667rem; margin-right: 0.366666667rem; margin-bottom: .3rem; }
.gray { font-size: .24rem; color: #999; }
.fixbtn { background: linear-gradient(to right,#8E61E7,#6355CB);margin: 0 .45rem; width: 9.1rem; height: 1.1733rem; color: #fff; border-radius: .58665rem; border: none; outline: none; position: fixed; bottom: .4rem; left: 0; }
</style>
