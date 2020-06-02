<template>
  <!-- 收入记录 -->
  <div class="income">
    <head-nav :title="'打卡'" :titleColor="'#000000'" :navShow="false">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHeadback.png" alt=""></div>
    </head-nav>
    <div class="income-item">
      <div class="income-title">收入金额(元)</div>
      <div class="income-input">
        <sinput :type="'text'" :placeholder="'0.0'" @inputValue="myMoney"></sinput>
      </div>
    </div>
    <div class="income-item">
      <div class="income-title">收入时间</div>
      <div class="income-input" @click="onPick">
        <sinput :type="'text'" :placeholder="'请选择'" :value="form.time" :disabled="true"></sinput>
      </div>
    </div>
    <div class="income-item">
      <div class="income-title">收入备注</div>
      <div class="income-input">
        <textarea name="" id="" placeholder="请输入" v-model="form.remark"></textarea>
      </div>
    </div>
    <div class="income-item">
      <div class="income-title">上传凭证</div>
      <div class="income-input">
        <img :src="item" alt="" v-for="(item, i) in form.pics" :key="i">
        <img src="../../../assets/img/home/unload.jpg" alt="" @click="sheetVisible = true">
      </div>
    </div>
    <btn :vals="'保存'" @btnClick="kepUp(1)" class="income-buttom"></btn>
    <div class="income-now">
      <a href="javascript:;" class="income-font" @click="kepUp(2)">继续记录</a>
    </div>
    <mt-datetime-picker ref="picker" type="datetime" year-format="{value}" month-format="{value}" date-format="{value}" hour-format="{value}" minute-format="{value}" v-model="pickerValue" @confirm="handleConfirm"></mt-datetime-picker>

    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import sinput from "../../../components/home/input.vue";
import btn from "../../../components/home/btn.vue";
import headNav from "../../../components/home/headNav.vue";
import { getStore } from "../../../api/home.js";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    btn,
    sinput,
    headNav
  },
  data () {
    return {
      das: "",
      pickerValue: "",
      form: {
        price: "",
        time: "",
        remark: "",
        pics: []
      },
      sheetVisible: false,
      actions: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  async mounted() {
    await this.getData();
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
      !this.token && await this.getToken();
    },
    myMoney(val) {
      this.form.price = val;
    },
    // 保存
    async kepUp(n) {
      if (!(this.form.price > 0 && this.form.price <= 99999999.99)) {
        this.$Toast({
          message: "金额范围0.1-99999999.99",
          duration: 1500
        });
        return false;
      }
      if (!this.form.time) {
        this.$Toast({
          message: "请填写收入时间",
          duration: 1500
        });
        return false;
      }
      if (!(this.form.remark.length > 0 && this.form.remark.length <= 200)) {
        this.$Toast({
          message: "请填写1-200字以内的备注",
          duration: 1500
        });
        return false;
      }
      this.$Indicator.open("保存中...");
      var res = await getStore({
        token: this.token,
        price: this.form.price,
        time: this.form.time + ":00",
        remark: this.form.remark,
        pics: this.form.pics
      });
      this.$Indicator.close();
      try {
        if (res.error_code === 0) {
          this.form = {
            price: "",
            time: "",
            remark: "",
            pics: []
          };
          if (n === 1) {
            this.$router.push("/sign");
          } else {
            this.$Toast({
              message: "保存成功",
              duration: 1500
            });
          }
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(n);
        console.log(err);
      }
    },
    // 时间日期选择器  用户一点击输入框即改变为当前时间
    onPick() {
      var date = new Date();
      var moth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.pickerValue = date.getFullYear() + "/" + moth + "/" + day + " " + date.getHours() + ":" + date.getMinutes();// 设定初始日期时间
      this.$refs.picker.open();
    },
    async handleConfirm(val) {
      var month = new Date(val).getMonth() + 1 < 10 ? "0" + (new Date(val).getMonth() + 1) : new Date(val).getMonth() + 1;
      var day = new Date(val).getDate() < 10 ? "0" + new Date(val).getDate() : new Date(val).getDate();
      this.form.time = new Date(val).getFullYear() + "-" + month + "-" + day + " " + new Date(val).getHours() + ":" + new Date(val).getMinutes();
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
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .income{
    width: 9.2rem;
    margin: 0 auto;
    .headLeft{
      width: 0.533333rem;
      height: 0.533333rem;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 100%;
        display: block;
      }
    }
    .income-now{
      text-align: center;
      margin-top: 0.622222rem;
      margin-bottom: 0.622222rem;
      .income-font{
        font-size: 0.426666rem;
        color: #7265E3;
        line-height: 1;
      }
    }
    .income-buttom{
      width: 100%;
      margin-top: 0.977777rem;
    }
    .income-item{
      padding-bottom: 0.8rem;
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
</style>
