<template>
  <!-- 设置新目标 -->
  <div class="target">
    <div class="target-body">
      <div class="target-item">
        <div class="target-title">您今年的计划业绩目标(万元)</div>
        <sinput :type="'number'" :placeholder="'0.0'" @inputValue="myMoney"></sinput>
      </div>
      <div class="target-item">
        <div class="target-title">您准备未来多久达成目标(天)</div>
        <div class="target-input">
          <sinput :type="'number'" :placeholder="'0'" @inputValue="myDay"></sinput>
        </div>
      </div>
      <btn :vals="'保存'" @btnClick="kep" class="target-btn"></btn>
    </div>
  </div>
</template>

<script>
import sinput from "../../components/home/input.vue";
import btn from "../../components/home/btn.vue";
import { getUpdate } from "../../api/home.js";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    btn,
    sinput
  },
  data() {
    return {
      money: "",
      day: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      !this.token && (await this.getToken());
    },
    myDay(val) {
      this.day = val;
    },
    myMoney(val) {
      this.money = val;
    },
    async kep() {
      var that = this;
      if (!(this.money > 0 && this.money <= 10000)) {
        this.$Toast({
          message: "业绩目标范围1 - 10000",
          duration: 1500
        });
        return false;
      }
      if (!(this.day > 0 && this.day <= 999)) {
        this.$Toast({
          message: "目标天数范围1 - 999",
          duration: 1500
        });
        return false;
      };
      this.$Indicator.open("加载中...");
      let res = await getUpdate(this.token, this.money, this.day);
      this.$Indicator.close();
      try {
        if (res.error_code === 0) {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
          setTimeout(() => {
            that.$bridge.call("router_app", {
              type: "app_home"
            });
          }, 1800);
        } else {
          that.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .target{
    position: fixed;
    width: 100%;
    height: 100%;
    .target-body{
      width: 9.2rem;
      margin: 0 auto;
      height: 100%;
      position: relative;
      .target-btn{
        position: absolute;
        bottom: 0.888888rem;
        width: 100%;
      }
      .target-item{
        &:first-child{
          padding-bottom: 0.8rem;
        }
        .target-title{
          font-size: 0.373333rem;
          padding-top: 0.444444rem;
          padding-bottom: 0.444444rem;
        }
      }
    }
  }
</style>
