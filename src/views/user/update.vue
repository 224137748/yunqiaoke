<template>
  <div class="update-page">
    <div class="update-line">
      <div class="sub-tit">{{title}}</div>
      <input
        v-if="typeId===1 || typeId === 4"
        type="text"
        placeholder="请输入"
        v-model.trim="updateVal"
        :maxlength="maxLength"
      />
      <div class="radio" v-if="typeId === 2">
        <div class="select-item">
          <span class="status-icon" :class="{active: updateVal == 1}"></span>
          <span class="text">男</span>
          <input type="radio" name="sex" v-model="updateVal" value="1" data-sex="男" />
        </div>
        <div class="select-item">
          <span class="status-icon" :class="{active: updateVal == 2}"></span>
          <span class="text">女</span>
          <input type="radio" name="sex" v-model="updateVal" value="2" data-sex="女" />
        </div>
      </div>
      <textarea
        type="text"
        placeholder="请输入"
        v-model.trim="updateVal"
        :maxlength="maxLength"
        v-if="typeId === 3"
      ></textarea>
    </div>
    <div class="save-btn" @click="submitUpdateValue">保存</div>
  </div>
</template>

<script>
import {
  updateNickname,
  updateSex,
  updateDesc,
  updateWechat
} from "@/api/user";
import { mapState, mapMutations } from "vuex";
export default {
  name: "update-page",
  data() {
    return {
      // 1 昵称 2 性别 3 描述 4 微信号
      typeId: "",
      title: "",
      updateVal: ""
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    maxLength() {
      if (this.typeId) {
        switch (this.typeId * 1) {
          case 1:
            return 20;
          case 3:
            return 200;
          case 4:
            return 30;
          default:
            return "";
        }
      }
      return "";
    },
    ...mapState(["token"]),
    ...mapState("user", ["sex", "nickname", "wechat", "desc"])
  },
  methods: {
    init() {
      this.typeId = this.$route.query.id * 1;
      this.title = decodeURIComponent(this.$route.query.title);
      switch (this.typeId * 1) {
        case 1:
          document.title = "修改昵称";
          this.updateVal = this.nickname;
          break;
        case 2:
          document.title = "修改性别";
          this.updateVal = this.sex * 1;
          break;
        case 3:
          document.title = "修改描述";
          this.updateVal = this.desc;
          break;
        case 4:
          document.title = "绑定微信号";
          this.updateVal = this.wechat;
          break;
      }
    },
    async submitUpdateValue() {
      let submit;
      let vuexFn;
      switch (this.typeId) {
        case 1:
          if (!this.updateVal) {
            this.$Toast({
              message: "请输入昵称",
              duration: 1500
            });
            return;
          }
          submit = updateNickname;
          vuexFn = "setNickName";
          break;
        case 2:
          if (!this.updateVal) {
            this.$Toast({
              message: "请选择性别",
              duration: 1500
            });
            return;
          }
          submit = updateSex;
          vuexFn = "setSex";
          break;
        case 3:
          if (!this.updateVal) {
            this.$Toast({
              message: "请输入描述",
              duration: 1500
            });
            return;
          }
          submit = updateDesc;
          vuexFn = "setDesc";
          break;
        case 4:
          if (!this.updateVal) {
            this.$Toast({
              message: "请输入微信号",
              duration: 1500
            });
            return;
          }
          submit = updateWechat;
          vuexFn = "setWechat";
          break;
      }
      this.$Indicator.open("加载中...");
      let res = await submit(this.token, this.updateVal);
      console.log(res);
      if (res.error_code === 0) {
        this.$Toast({
          message: "修改成功",
          duration: 1500
        });
        this[vuexFn](this.updateVal);
        // this.updateVal = "";
        // 返回基本信息页面
        setTimeout(() => {
          this.$router.replace("/user");
        }, 1800);
      }
      this.$Indicator.close();
    },
    ...mapMutations("user", ["setNickName", "setDesc", "setSex", "setWechat"])
  }
};
</script>
<style lang="less" scoped>
.update-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  .update-line {
    width: 1025px;
    margin: 48px auto 100px;
    .sub-tit {
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      line-height: 36px;
      margin-bottom: 30px;
    }
    input[type="text"] {
      width: 100%;
      height: 174px;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      padding: 0 60px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      &::placeholder {
        color: rgba(214, 217, 224, 1);
      }
    }
    textarea {
      width: 100%;
      height: 320px;
      border: none;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      padding: 50px;
      &::placeholder {
        color: rgba(214, 217, 224, 1);
      }
      &::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }
    }
  }
  .radio {
    display: flex;
    margin: 60px 0 0;
    .select-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 90px;
      .status-icon {
        display: inline-block;
        width: 45px;
        height: 45px;
        background: #d6d9e0;
        border-radius: 12px;
        margin-right: 30px;
        &.active {
          background: #7265e3;
        }
      }
      .text {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        line-height: 42px;
      }
      input[type="radio"] {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1025px;
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
</style>
