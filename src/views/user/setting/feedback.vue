<template>
  <div class="feedback-page">
    <div class="main">
      <div class="line-item">
        <div class="line-tit">反馈类型</div>
        <div class="select-box" :class="{selected: type}">
          {{type || '请选择'}}
          <select v-model="type">
            <option value>请选择</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
      <div class="line-item">
        <div class="line-tit">联系方式</div>
        <input placeholder="请输入" type="text" maxlength="50" v-model.trim="contact" />
      </div>
      <div class="line-item">
        <div class="line-tit">反馈内容</div>
        <textarea placeholder="请输入" v-model.trim="message" name id maxlength="200"></textarea>
      </div>
    </div>
    <div class="footer">
      <div class="footer-btn" @click="submit">在线反馈</div>
    </div>
  </div>
</template>

<script>
import { feedback } from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "feedback-page",
  data() {
    return {
      type: "",
      // 联系方式
      contact: "",
      // 留言内容
      message: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    async submit() {
      if (!this.type) {
        this.$Toast({
          message: "请选择反馈类型",
          duration: 1500
        });
        return;
      }
      if (!this.contact) {
        this.$Toast({
          message: "请填写联系方式",
          duration: 1500
        });
        return;
      }
      if (!this.message) {
        this.$Toast({
          message: "请填写反馈内容",
          duration: 1500
        });
        return;
      }
      try {
        this.$Indicator.open("加载中...");
        let res = await feedback(
          this.token,
          this.type,
          this.contact,
          this.message
        );
        if (res.error_code === 0) {
          this.$Toast({
            message: "提交成功",
            duration: 1500
          });
          // 清空内容
          this.type = this.contact = this.message = "";
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
        this.$Indicator.close();
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.feedback-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 240px;
  overflow: hidden;
  .main {
    width: 1025px;
    margin: 52px auto 0;
    overflow: hidden;
    .line-item {
      margin-bottom: 92px;
      .line-tit {
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        line-height: 42px;
        margin-bottom: 30px;
      }
      textarea,
      .select-box,
      input[type="text"] {
        width: 100%;
        height: 174px;
        border: none;
        background: rgba(244, 246, 250, 1);
        border-radius: 30px;
        padding: 0 50px;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        &::placeholder {
          color: rgba(214, 217, 224, 1);
        }
      }
      .select-box {
        display: flex;
        align-items: center;
        position: relative;
        color: rgba(214, 217, 224, 1);
        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 74px;
          right: 45px;
          width: 40px;
          height: 32px;
          background: url("../../../assets/img/user/select-icon.png") no-repeat
            left top/ 100% 100%;
        }
        &.selected {
          color: #000;
        }
      }
      select {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        padding: 0 50px;
        font-size: 48px;
        font-family: PingFang SC;
        background: rgba(244, 246, 250, 1);
        font-weight: 400;
        outline: none;
        &:focus {
          border: none;
          outline: none;
          appearance: none;
        }
      }
      textarea {
        padding: 50px;
        height: 320px;
        &::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 100%;
    height: 240px;
    background: #fff;
    .footer-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 992px;
      height: 132px;
      margin: 0 auto;
      background: linear-gradient(
        122deg,
        rgba(139, 99, 230, 1) 0%,
        rgba(97, 85, 204, 1) 100%
      );
      border-radius: 66px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 37px;
    }
  }
}
</style>
