<template>
  <div class="page-publish-plan">
    <p class="title">选择互助金额</p>
    <div class="money-list-wrap flex flex-wrap">
      <div
        class="list"
        @click="selectValue(item)"
        :class="{ active: item.value == selfDefinedValue }"
        v-for="(item, index) in planList"
        :key="index"
      >
        <p class="value">{{ item.value }}</p>
        <p class="money">￥{{ item.money }}</p>
      </div>
    </div>
    <div class="money-wrap flex flex-align-center">
      <div class="affix">￥</div>
      <input
        type="number"
        v-model="selfDefinedValue"
        placeholder="自定义金额"
        maxlength="10"
      />
    </div>
    <p class="title">发放个数</p>
    <div class="count-wrap flex flex-align-center">
      <input
        type="number"
        v-model="count"
        placeholder="请输入"
        maxlength="10"
      />
      <div class="affix">个</div>
    </div>
    <div class="introduction">
      <p class="introduction-title">*发放规则说明</p>
      <p>
        一般指由群众共同制定、公认或由代表人统一制定并通过的，由
        群体里的所有成员一起遵。一般指由群众共同制定、公认或由代
        表人统一制定并通过的，由群体里的所有成员一起遵
      </p>
    </div>
    <div class="next-step" @click="goPublish">发布内容</div>
    <div class="skip" @click="goSkip">跳过</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  publishService,
  publishSkill,
  publishLesson,
  publishInvest,
  publishFinance,
  publishSupporter,
  publishTransfer
} from "@/api/publish";
export default {
  name: "page-publish-plan",
  data() {
    return {
      planList: [
        { money: 10, value: 100 },
        { money: 20, value: 200 },
        { money: 50, value: 500 }
      ],
      selfDefinedValue: "",
      count: "",
      type: 0,
      id: 0
    };
  },
  computed: {
    ...mapState({
      token: "token"
    })
  },
  mounted() {
    console.log(this.$route);
    // query id(/*服务id 、 课程id 等*/)  type // 1服务,2技能,3投资,4融资,5派单,6转让,7代表作
    this.type = parseInt(this.$route.query.type);
    this.id = parseInt(this.$route.query.id);
  },
  // router.back 不会执行mounted方法
  activated() {
    console.log(this.$route);
    // query id(/*服务id 、 课程id 等*/)  type // 1服务,2技能,3投资,4融资,5派单,6转让,7代表作
    this.type = parseInt(this.$route.query.type);
    this.id = parseInt(this.$route.query.id);
  },
  methods: {
    selectValue(item) {
      this.selfDefinedValue = item.value;
    },
    /**
     * 发布内容
     */
    goPublish() {
      if (this.selfDefinedValue < 100 || this.selfDefinedValue > 99999999) {
        return this.$Toast("自定义金额必须在100到99999999之间");
      }
      if (this.count < 1 || this.count > 100000) {
        return this.$Toast("发放个数必须在1到100000之间");
      }
      this.$Indicator.open("请求中...");
      console.log(this.type);
      switch (this.type) {
        case 1:
          publishService({
            token: this.token,
            service_id: this.id,
            battery: this.selfDefinedValue,
            num: parseInt(this.count)
          }).then(res => {
            this.$Indicator.close();
            console.log(res);
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 1 } });
            } else if (res.error_code === 3001) {
              this.$MessageBox
                .confirm("互助金不足，是否充值？")
                .then(action => {
                  this.$router.push({
                    path: "/publish/charge",
                    query: { type: this.type }
                  });
                });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 2:
          publishSkill({
            token: this.token,
            skill_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 2 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 3:
          publishInvest({
            token: this.token,
            investment_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 3 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 4:
          publishFinance({
            token: this.token,
            financing_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 4 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 5:
          publishSupporter({
            token: this.token,
            dispatch_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 5 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 6:
          publishTransfer({
            token: this.token,
            transfer_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 6 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        case 7:
          publishLesson({
            token: this.token,
            course_id: this.id,
            battery: this.selfDefinedValue,
            num: this.count
          }).then(res => {
            console.log(res);
            this.$Indicator.close();
            if (res.error_code === 0) {
              this.$router.push({ path: "/works", query: { type: 7 } });
            } else if (res.error_code === 3001) {
              this.$router.push({
                path: "/publish/charge",
                query: { type: this.type }
              });
            } else {
              this.$Toast(res.error_msg);
            }
          });
          break;
        default:
          break;
      }
    },
    /**
     * 跳过
     */
    goSkip() {
      this.$router.push({ path: "/works", query: { type: this.type } });
    }
  }
};
</script>

<style lang="less" scoped>
.page-publish-plan {
  padding: 50px 50px 100px 50px;
  .title {
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(45, 49, 66, 1);
    line-height: 36px;
    margin-bottom: 30px;
  }
  .money-list-wrap {
    .list {
      width: 320px;
      padding: 48px 0;
      margin-right: 32px;
      text-align: center;
      width: 320px;
      background: rgba(244, 246, 250, 1);
      border-radius: 12px;
      margin-bottom: 40px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &.active {
        background-color: #e0ddf5;
        .value {
          color: #7265e3;
        }
      }
      .value {
        font-size: 60px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        line-height: 60px;
      }
      .money {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(247, 119, 119, 1);
        line-height: 36px;
        margin-top: 28px;
      }
    }
  }
  .money-wrap {
    height: 174px;
    background: rgba(244, 246, 250, 1);
    border-radius: 30px;
    margin-bottom: 90px;
    .affix {
      width: 145px;
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
    input {
      flex: 1;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      background-color: transparent;
      padding-right: 60px;
      &::placeholder {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(214, 217, 224, 1);
      }
    }
  }
  .count-wrap {
    height: 174px;
    background: rgba(244, 246, 250, 1);
    border-radius: 30px;
    margin-bottom: 90px;
    .affix {
      width: 145px;
      text-align: center;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
    input {
      flex: 1;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      background-color: transparent;
      padding-left: 60px;
      &::placeholder {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(214, 217, 224, 1);
      }
    }
  }
  .introduction {
    p {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(156, 158, 185, 1);
      line-height: 60px;
      &.introduction-title {
        margin-bottom: 30px;
      }
    }
  }
  .next-step {
    width: 993px;
    padding: 44px 0;
    text-align: center;
    background: linear-gradient(
      122deg,
      rgba(139, 99, 230, 1) 0%,
      rgba(97, 85, 204, 1) 100%
    );
    border-radius: 66px;
    margin: 350px auto 0 auto;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 37px;
  }
  .skip {
    width: 100px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(114, 101, 227, 1);
    line-height: 48px;
    margin: 70px auto 0 auto;
  }
}
</style>
