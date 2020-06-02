<template>
  <mt-loadmore
    class="fans-page"
    :top-method="refresh"
    :bottom-method="loadMore"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    bottomPullText="上拉加载更多"
  >
    <ul class="fans-list">
      <li class="fans-item" v-for="(item, index) in fansList" :key="index">
        <div class="avatar">
          <img :src="item.fans_info.avatar || baseAvatar" alt />
        </div>
        <div class="fans-info">
          <div class="info">
            <div class="base">
              <div class="fans-name">{{ item.fans_info.nickname }}</div>
              <div class="stunt">
                <span
                  v-for="stunt in item.fans_info.user_stunt"
                  :key="stunt.name"
                  >{{ stunt.name }}</span
                >
              </div>
            </div>
            <div
              class="follow-btn-colted"
              @click="_collectDelete(item)"
              v-if="item.collect_fans_count >= 1"
            >
              已关注
            </div>
            <div class="follow-btn" v-else @click="_collectionAdd(item)"></div>
          </div>
          <div class="reply">回复TA</div>
        </div>
      </li>
      <div v-show="!fansList.length" class="empty-note-text">
        您目前还没有粉丝哦~！
      </div>
    </ul>
  </mt-loadmore>
</template>

<script>
import { getFans, collectionAdd, collectDelete } from "@/api/user";
import { mapState, mapActions } from "vuex";
import BASEAVATAR from "../../assets/img/user/logo.png";
export default {
  name: "fans-page",
  data() {
    return {
      baseAvatar: BASEAVATAR,
      // allLoaded: false,
      pageInfo: {
        pageIndex: 1,
        pageNum: 10
      },
      fansList: [],
      totalPage: ""
    };
  },
  created() {
    this._getFans();
  },
  computed: {
    // 如果所有数据加载完成，则取消loadmore事件
    allLoaded() {
      if (this.totalPage && this.pageInfo.pageIndex < this.totalPage) {
        return false;
      }
      return true;
    },
    ...mapState(["token"])
  },
  methods: {
    async _getFans() {
      try {
        // 获取token
        !this.token && (await this.getToken());
        this.$Indicator.open("加载中...");
        let res = await getFans(
          this.token,
          this.pageInfo.pageIndex,
          this.pageInfo.pageNum
        );
        if (res.error_code === 0) {
          this.totalPage = res.data.last_page;
          if (Array.isArray(res.data.data)) {
            this.fansList = res.data.data;
          }
        }
        this.$Indicator.close();
        console.log(res);
      } catch (err) {
        this.$Indicator.close();
      }
      // if (res.)
    },
    // 关注
    async _collectionAdd(item) {
      this.$Indicator.open("加载中...");
      let res = await collectionAdd(this.token, item.user_id);
      if (res.error_code === 0) {
        item.collect_fans_count = 1;
      }
      this.$Indicator.close();
      console.log(res);
    },
    // 取消关注
    async _collectDelete(item) {
      this.$Indicator.open("加载中...");
      let res = await collectDelete(this.token, item.user_id);
      if (res.error_code === 0) {
        item.collect_fans_count = 0;
      }
      this.$Indicator.close();

      console.log(res);
    },
    async refresh() {
      this.pageInfo.pageIndex = 1;
      await this._getFans();
      this.$refs.loadmore.onTopLoaded();
    },
    async loadMore() {
      if (this.pageInfo.pageIndex < this.totalPage) {
        this.pageInfo.pageIndex++;
        try {
          let res = await getFans(
            this.token,
            this.pageInfo.pageIndex,
            this.pageInfo.pageNum
          );
          if (res.error_code === 0) {
            if (Array.isArray(res.data.data)) {
              this.fansList.push(...res.data.data);
            }
          }
          this.$refs.loadmore.onBottomLoaded();
        } catch (err) {
          this.$refs.loadmore.onBottomLoaded();
          console.log(err);
        }
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
/deep/ .mint-loadmore-text,
/deep/ .mint-loadmore-text {
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
}
.fans-page {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  background: #fff;
  .fans-list {
    overflow: hidden;
    min-height: 100vh;
    .fans-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 40px 50px 0;
      overflow: hidden;
      .avatar {
        width: 126px;
        height: 126px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 36px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .fans-info {
        flex: 1;
        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;

          .base {
            overflow: hidden;
            .fans-name {
              font-size: 48px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
              max-width: 600px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 12px 0 30px;
            }
            .stunt {
              max-width: 600px;
              white-space: nowrap;
              // text-overflow: ellipsis;
              overflow: hidden;
              border-top-right-radius: 24px;
              border-bottom-right-radius: 24px;
              span {
                max-width: 50%;
                height: 48px;
                text-overflow: ellipsis;
                overflow: hidden;
                border-radius: 24px;
                display: inline-block;
                padding: 0 24px;
                background: rgba(244, 246, 250, 1);
                font-size: 24px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(156, 158, 185, 1);
                line-height: 48px;
                text-align: center;
                margin-right: 18px;
              }
            }
          }
          .follow-btn {
            width: 182px;
            height: 82px;
            background: url("../../assets/img/user/follow_icon.png") no-repeat
              left top/100% 100%;
          }
          .follow-btn-colted {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 182px;
            height: 82px;
            border: 3px solid rgba(203, 204, 220, 1);
            border-radius: 41px;
            font-size: 36px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(203, 204, 220, 1);
          }
        }
        .reply {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(114, 101, 227, 1);
          line-height: 36px;
          padding-bottom: 40px;
          border-bottom: 3px solid rgba(234, 234, 234, 0.5);
        }
      }
    }
    .empty-note-text {
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(156, 158, 185, 1);
      text-align: center;
      margin-top: 200px;
      font-size: 42px;
    }
  }
}
</style>
