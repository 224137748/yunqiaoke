<template>
  <div class="plaint">
    <head-nav :navShow="false" :title="'内容举报'" :titleColor="'#000000'" class="header">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHeadback.png" alt=""></div>
    </head-nav>
    <div class="box">
      <div class="income-item">
        <div class="income-title">投诉类型</div>
        <div class="income-input" @click="popupVisible = !popupVisible">
          <sinput :type="'text'" :placeholder="'请选择'" :srcImg="true" :value="typeName" :disabled="true"></sinput>
        </div>
      </div>
      <div class="income-item">
        <div class="income-title">投诉描述</div>
        <div class="income-input">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入" v-model="form.content"></textarea>
        </div>
      </div>
      <div class="income-item">
        <div class="income-title">上传凭证</div>
        <div class="income-input">
          <img :src="item" alt="" v-for="(item, i) in form.pics" :key="i">
          <img src="../../../assets/img/home/unload.jpg" alt="" @click="sheetVisible = true">
        </div>
      </div>
      <div class="ic"></div>
      <btn :vals="'提交'" @btnClick="kepUp" class="income-buttom"></btn>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="popupType">
      <div class="popupTop">
        <div class="popupSay">
          <div class="item left"><span @click="closePopup">取消</span></div>
          <div class="item centers"><span>请选择</span></div>
          <div class="item right"><span @click="frimPopup">确认</span></div>
        </div>
      </div>
      <mt-picker :slots="slot" valueKey="name" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import headNav from "../../../components/home/headNav.vue";
import sinput from "../../../components/home/input.vue";
import btn from "../../../components/home/btn.vue";
import { mapState, mapActions } from "vuex";
import { getReport } from "../../../api/buddy.js";
export default {
  components: {
    headNav,
    sinput,
    btn
  },
  data() {
    return {
      form: {
        content_type: "",
        content_id: "",
        type: "",
        content: "",
        pics: []
      },
      typeName: "",
      slotTypeId: "",
      slot: [{
        flex: 1,
        values: [
          { "name": "出售违禁品", id: 1 },
          { "name": "疑似欺诈", id: 2 },
          { "name": "发布违反国家法律规定的相关内容", id: 3 },
          { "name": "发布色情，淫秽，低俗等不适内容", id: 4 },
          { "name": "发布垃圾广告信息", id: 5 },
          { "name": "其他", id: 6 }
        ],
        className: "slot1"
      }],
      slotType: "",
      popupVisible: false,
      sheetVisible: false,
      actions: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.form.content_type = this.$route.query.type;
    this.form.content_id = this.$route.query.id;
    this.getData();
    this.actions = [{
      name: "拍照",
      method: this.takePhoto
    }, {
      name: "从相册中选择",
      method: this.openAlbum
    }];
  },
  methods: {
    goback() {
      this.$bridge.call("back");
    },
    async getData() {
      !this.token && (await this.getToken());
    },
    async kepUp() {
      if (this.form.type === "") {
        this.$Toast({
          message: "请选择投诉类型",
          duration: 1500
        });
        return false;
      }
      if (!(this.form.content.length > 0 && this.form.content.length <= 200)) {
        this.$Toast({
          message: "请填写1-200字以内的描述",
          duration: 1500
        });
        return false;
      }
      if (!(this.form.pics.length > 0 && this.form.pics.length <= 9)) {
        this.$Toast({
          message: "请上传1-9张图片",
          duration: 1500
        });
        return false;
      }
      this.$Indicator.open("加载中...");
      var params = this.form;
      params.token = this.token;
      var res = await getReport(params);
      try {
        if (res.error_code === 0) {
          this.$Indicator.close();
          this.$Toast({
            message: "提交成功",
            duration: 1500
          });
          setTimeout(function() {
            this.$bridge.call("router_app", {
              type: "app_home"
            });
          }, 1500);
        } else {
          this.$Indicator.close();
          console.log(res.error_msg);
        }
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    // 图片上传
    async takePhoto() {
      if (this.form.pics.length >= 9) return;
      let img = await this.$bridge.call("get_image", {
        count: 9 - this.form.pics.length,
        crop: 0,
        isCamera: 1
      });
      this.form.pics = this.form.pics.concat(img.image[0]);
    },
    async openAlbum() {
      if (this.form.pics.length >= 9) return;
      let img = await this.$bridge.call("get_image", {
        count: 9 - this.form.pics.length,
        crop: 0,
        isCamera: 0
      });
      this.form.pics = this.form.pics.concat(img.image[0]);
    },
    closePopup() {
      this.popupVisible = false;
    },
    frimPopup() {
      this.typeName = this.slotType;
      this.form.type = this.slotTypeId;
      this.popupVisible = false;
    },
    onValuesChange(picker, values) {
      this.slotTypeId = values[0].id;
      this.slotType = values[0].name;
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .popupType{
    width: 100%;
    .popupTop{
      width: 100%;
      border-bottom: 0.026666rem solid #EDEDF7;
      .popupSay{
        display:  flex;
        align-items: center;
        justify-content: space-between;
        width: 92%;
        margin: 0 auto;
        height: 1.066666rem;
        .item{
          flex: 1;
        }
        .centers{
          text-align: center;
        }
        .right{
          text-align: right;
        }
        span{
          font-size: 0.337777rem;
          line-height: 1.066666rem;
          display: inline-block;
        }
      }
    }
  }
  .box{
    width: 92%;
    margin: 0 auto;
    .ic{
      width: 100%;
      height: 1.673333rem;
    }
    .income-buttom{
      width: 92%;
      position: absolute;
      bottom: 0.533333rem;
      left: 4%;
    }
    .income-item{
      padding-bottom: 0.6rem;
      .income-title{
        font-size: 0.373333rem;
        padding-top: 0.444444rem;
        padding-bottom: 0.444444rem;
      }
      .income-input{
        position: relative;
        img{
          width: 2.666666rem;
          height: 2.666666rem;
          position: relative;
          z-index: 1;
          margin-right: 0.355555rem;
          margin-bottom: 0.355555rem;
        }
        textarea{
          width: 100%;
          height: 2.844444rem;
          background: rgba(244,246,250,1);
          border-radius: 0.266666rem;
          border: 0;
          padding: 0.533333rem;
          font-size: 0.426666rem;
          line-height: 1.4;
        }
        input{
          width: 100%;
          height: 1.546666rem;
          line-height: 1.546666rem;
          background: rgba(244,246,250,1);
          border-radius: 0.266666rem;
          padding: 0 0.533333rem;
          font-size: 0.426666rem;
        }
        input::-webkit-input-placeholder{
          color: #D6D9E0;
          font-size: 0.426666rem;
        }
        textarea::-webkit-input-placeholder{
          color: #D6D9E0;
          font-size: 0.426666rem;
        }
      }
    }
  }
  .header{
    width: 100%;
    border-bottom: 0.026666rem solid #EDEDF7;
    .headLeft{
      width: 0.533333rem;
      height: 0.533333rem;
      position: absolute;
      left: 4%;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 100%;
        display: block;
      }
    }
  }
</style>
