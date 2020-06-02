<template>
  <div class="type-template">
    <div class="note-text">
      认证说明：之间就平台所提供的服务及相关事宜所立订的契约，请您仔细阅读
      本注册协议，在您确认阅读并
    </div>
    <slot></slot>
    <div class="footer">
      <div class="submit-btn" @click="submitForm">提交认证</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "type-template",
  methods: {
    submitForm() {
      this.$emit("submit");
    }
  }
};
</script>
<style lang="less" scoped>
.type-template {
  width: 100%;
  min-height: 110vh;
  background: #fff;
  overflow: hidden;
  .note-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    padding: 0 50px;
    margin-bottom: 50px;
    background: rgba(255, 239, 229, 1);
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(254, 156, 94, 1);
    line-height: 44px;
  }
  .line-input {
    width: 1025px;
    margin: 0 auto 90px;
    .tit {
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(45, 49, 66, 1);
      line-height: 36px;
      margin-bottom: 30px;
      .note {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(156, 158, 185, 1);
        line-height: 30px;
        margin-left: 20px;
      }
    }
    input[type="text"],
    input[type="number"] {
      width: 100%;
      height: 174px;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      padding: 0 60px;
      &::placeholder {
        color: rgba(214, 217, 224, 1);
      }
    }
  }
  .upload-identity {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1025px;
    margin: 0 auto;
    & > div {
      width: 450px;
      margin-bottom: 90px;
    }
    .img-wrap {
      width: 100%;
      height: 318px;
      margin-bottom: 44px;
      background: url("../../assets/img/loading.gif") no-repeat center center/
        80px 80px;
      border-radius: 16px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      [class*="empt-"] {
        width: 100%;
        height: 100%;
      }
      .empt-front {
        background: url("../../assets/img/user/identity_front.png") no-repeat
          left top / 100% 100% #fff;
      }
      .empt-back {
        background: url("../../assets/img/user/identity_back.png") no-repeat
          left top / 100% 100% #fff;
      }
      .empt-hold {
        background: url("../../assets/img/user/identity_hold.png") no-repeat
          left top / 100% 100% #fff;
      }
    }
    .desc-text {
      text-align: center;
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      line-height: 36px;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 230px;
    background: #fff;
    .submit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 993px;
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
