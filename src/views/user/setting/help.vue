<template>
  <div class="help-page" v-show="typeJson">
    <div class="main">
      <div
        class="scroll-wrap"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="20"
      >
        <div class="sec1">
          <div class="sub-tit">自助服务</div>
          <div class="type-list">
            <div
              @click="selectType(val,key)"
              class="type-item"
              v-for="(key, val) in typeJson"
              :key="key"
            >{{key}}</div>
          </div>
        </div>
        <div class="sec2" v-show="questionList.length">
          <div class="sub-tit">猜你想问</div>
          <div class="question-list">
            <div class="question-item" v-for="(item) in questionList" :key="item.name">
              <div class="q-icon"></div>
              <div class="que-info">
                <div class="que-tit">{{item.name}}</div>
                <div class="que-desc">{{item.desc}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-btn" @click="goFeedBack">在线反馈</div>
    </div>
  </div>
</template>

<script>
import { checkLoginEnv } from "@/api/login";
import helpMixin from "./helpMinxin";
export default {
  name: "help-app",
  mixins: [helpMixin],
  data() {
    return {
      typeJson: ""
    };
  },
  created() {
    // 获取类别
    this._getTypeList();
    // 获取问题列表
    this._getHelpList(true);
  },
  methods: {
    // 获取自助服务内容
    async _getTypeList() {
      this.$Indicator.open("loading");
      let res = await checkLoginEnv(5, "neirong_bangzhu_fenlei");
      if (res.error_code === 0) {
        if (res.data.data && Array.isArray(res.data.data)) {
          res.data.data[0] &&
            (this.typeJson = JSON.parse(res.data.data[0].json) || null);
        }
      }
      this.$Indicator.close();
      // console.log(res);
    },
    // 选择问题类型
    selectType(val, key) {
      this.$router.push({
        path: "/setting/quelist",
        query: {
          typeId: val,
          tit: encodeURIComponent(key)
        }
      });
    },
    goFeedBack() {
      this.$router.push("/setting/feedback");
    }
  }
};
</script>
<style lang="less" scoped>
.help-page {
  width: 100%;
  background: #fff;
  min-height: 100vh;
  padding-bottom: 240px;
  overflow: hidden;
  .main {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 240px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
  .sec1 {
    padding: 50px 45px 0;
    border-bottom: 3px solid rgba(245, 245, 245, 1);
    .sub-tit {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(45, 49, 66, 1);
      line-height: 48px;
      border-left: 9px solid #7265e3;
      padding-left: 40px;
      margin-bottom: 44px;
    }
    .type-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-left: -30px;
      .type-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 230px;
        height: 180px;
        background: rgba(245, 245, 245, 1);
        border-radius: 12px;
        margin-left: 30px;
        margin-bottom: 45px;
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(45, 49, 66, 1);
        line-height: 30px;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          color: #7265e3;
        }
      }
    }
  }
  .sec2 {
    padding: 50px 45px 0;
    .sub-tit {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(45, 49, 66, 1);
      line-height: 48px;
      border-left: 9px solid #7265e3;
      padding-left: 40px;
      margin-bottom: 44px;
    }

    .question-list {
    }
    .question-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 64px;
      .q-icon {
        width: 54px;
        height: 42px;
        margin-right: 22px;
        // background: url("../../../assets/img/user/ques-icon.png") no-repeat left
        //   top / 100% 100%;
      }
      .que-info {
        flex: 1;
        position: relative;
        border-bottom: 3px solid rgba(232, 235, 236, 1);
        &::before {
          display: block;
          content: "";
          position: absolute;
          left: -76px;
          top: 8px;
          width: 54px;
          height: 42px;
          background: url("../../../assets/img/user/ques-icon.png") no-repeat
            left top / 100% 100%;
        }
        .que-tit {
          // height: 40px;
          font-size: 42px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(45, 49, 66, 1);
          // line-height: 66px;
          margin-bottom: 50px;
        }
        .que-desc {
          font-size: 42px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(156, 158, 185, 1);
          line-height: 72px;
          margin-bottom: 58px;
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
