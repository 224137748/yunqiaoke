<template>
  <div class="question-list-page" v-show="questionList.length">
    <div
      class="sec2"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
    >
      <div class="sub-tit">{{title }}</div>
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
</template>

<script>
import helpMixin from "./helpMinxin";
export default {
  name: "question-list-page",
  mixins: [helpMixin],
  data() {
    return {
      title: ""
    };
  },
  created() {
    // 获取问题id
    this.type = this.$route.query.typeId;
    this.title = decodeURIComponent(this.$route.query.tit) || "问题列表";
    // 获取问题列表
    this._getHelpList();
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.question-list-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
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
}
</style>
