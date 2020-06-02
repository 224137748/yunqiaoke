<template>
  <div class="works-manage-page" :data-type="pageType">
    <div class="main">
      <div class="tab-bar">
        <div class="tab-item">
          <span :class="{ active: showType === 1 }" @click="selectShowType(1)">审核中</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 2 }" @click="selectShowType(2)">发布中</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 3 }" @click="selectShowType(3)">已下架</span>
        </div>
      </div>
      <transition name="fade">
        <ul
          class="content-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-if="contentList.length"
        >
          <mt-cell-swipe
            class="content-item"
            :class="`showType${showType}`"
            title="text"
            :right="editBtnList(item)"
            v-for="item in contentList"
            :key="item.id"
          >
            <div slot="title" class="left-info">
              <img :src="item.thumb" alt class="cover" />
              <div class="hot-val">{{ item.view }}</div>
            </div>
            <!-- 右侧内容 -->
            <div class="content-info">
              <div class="cont-tit">{{ item.name }}</div>
              <div class="create-time">提交时间：{{ formatTime(item.created_at) }}</div>
            </div>
            <div class="avatar">
              <img
                :src="
                  item.user_info.avatar ||
                    'http://yunqiaoke.sinmore.vip/default_avatar.png'
                "
                alt
              />
            </div>
          </mt-cell-swipe>
        </ul>
      </transition>
      <div class="empty-box" v-show="!isLoading && !contentList.length">没有更多了~！</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import getApi from "@/api/content";
var API = null;
export default {
  name: "works-manage-page",
  data() {
    return {
      // 1 审核中 2 已上架 3 已下架
      showType: 2,
      pageInfo: {
        pageIndex: 1,
        pageNum: 20
      },
      isLoading: true,
      contentList: [],
      totalPage: "", // 最长页码
      // loading 控制flag
      loading: false
    };
  },
  components: {},
  created() {
    this.pageType = this.$route.query.type * 1 || 1;
    API = getApi(this.pageType);
    console.log(API);
    this.getData();
  },
  computed: {
    ajaxParams() {
      switch (this.showType) {
        case 1: // 审核中
          return {
            type: 1
          };
        case 2:
          return {
            status: 1,
            type: 2
          };
        case 3:
          return {
            status: 2
          };
        default:
          return null;
      }
    },
    detailPath() {
      switch (this.pageType * 1) {
        case 1:
          return "/publish/service-form";
        case 2:
          return "/publish/skill-form";
        case 3:
          return "/publish/request-form-invest";
        case 4:
          return "/publish/request-form-finance";
        case 5:
          return "/publish/request-form-supporter";
        case 6:
          return "/publish/request-form-transfer";
        case 7:
          return "/publish/lesson-form";
      }
      return "";
    },
    ...mapState(["token"])
  },
  methods: {
    // 选择不同的类型
    selectShowType(type) {
      if (parseInt(type) === this.showType) {
        return;
      }
      // 加载中
      this.isLoading = true;
      // 改变展示类型
      this.showType = parseInt(type);
      // 重置页码
      this.totalPage = "";
      this.pageInfo.pageIndex = 1;
      // 此时设置位空数组，重新初始化 mint-ui cellspwie组件
      this.contentList = [];
      // 获取数据
      this.getData();
    },
    // 首次获取数据
    async getData() {
      !this.token && (await this.getToken());
      let params = Object.assign({}, this.ajaxParams, {
        token: this.token,
        page: this.pageInfo.pageIndex,
        per_page: this.pageInfo.pageNum
      });
      try {
        this.$Indicator.open("加载中...");
        let res = await API.getContentList(params);
        this.isLoading = false;
        if (res.error_code === 0) {
          this.totalPage = res.data.last_page;

          if (Array.isArray(res.data.data)) {
            this.$nextTick(() => {
              this.contentList = res.data.data;
            });
          }
        }
        this.$Indicator.close();
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    // 加载更多
    async loadMore() {
      if (this.pageInfo.pageIndex < this.totalPage) {
        this.pageInfo.pageIndex++;
        this.loading = true;
        let params = Object.assign({}, this.ajaxParams, {
          token: this.token,
          page: this.pageInfo.pageIndex,
          per_page: this.pageInfo.pageNum
        });
        try {
          this.$Indicator.open("加载中...");
          let res = await API.getContentList(params);
          if (res.error_code === 0) {
            this.totalPage = res.data.last_page;
            if (Array.isArray(res.data.data)) {
              this.contentList.push(...res.data.data);
            }
          }
          this.$Indicator.close();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        } catch (err) {
          this.$Indicator.close();
          console.log(err);
        }
      }
      console.log(11);
    },
    // 编辑菜单列表
    editBtnList(item) {
      switch (this.showType) {
        case 1: // 审核中
          return [
            {
              content: "删除",
              style: {},
              handler: () => this.deletContentItem(item)
            }
          ];
        case 2:
          return [
            {
              content: "编辑",
              style: {},
              handler: () => this.editContentItem(item)
            },
            {
              content: "删除",
              style: {},
              handler: () => this.deletContentItem(item)
            },
            {
              content: "下架",
              style: {},
              handler: () => this.putDownContentItem(item)
            }
          ];
        case 3:
          return [
            {
              content: "删除",
              style: {},
              handler: () => this.deletContentItem(item)
            },
            {
              content: "上架",
              style: {},
              handler: () => this.putOnlineContentItem(item)
            }
          ];
        default:
          return [];
      }
    },
    // 删除内容
    async deletContentItem(item) {
      this.$MessageBox({
        title: "提示",
        message: "确定要删除此内容?",
        showCancelButton: true,
        ConfirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async val => {
        if (val === "confirm") {
          try {
            this.$Indicator.open("加载中...");
            let res = await API.deletContent(this.token, [item.id]);
            if (res.error_code === 0) {
              let index = this.contentList.findIndex(el => {
                return el.id === item.id;
              });
              this.contentList.splice(index, 1);
            }
            this.$Indicator.close();
          } catch (err) {
            this.$Indicator.close();
            console.log(err);
          }
        }
      });
    },
    // 编辑内容
    editContentItem(item) {
      console.log(item.id);
      this.$router.push({
        path: this.detailPath,
        query: {
          id: item.id
        }
      });
    },
    // 上架内容
    async putOnlineContentItem(item) {
      try {
        this.$Indicator.open("加载中...");
        let res = await API.editContent(this.token, item.id);
        if (res.error_code === 0) {
          let index = this.contentList.findIndex(el => {
            return el.id === item.id;
          });
          this.contentList.splice(index, 1);
        }
        this.$Indicator.close();
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    // 下架内容
    async putDownContentItem(item) {
      this.$MessageBox({
        title: "提示",
        message: "确定要下架此内容?",
        showCancelButton: true,
        ConfirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async val => {
        if (val === "confirm") {
          try {
            this.$Indicator.open("加载中...");
            let res = await API.editContent(this.token, item.id);
            if (res.error_code === 0) {
              let index = this.contentList.findIndex(el => {
                return el.id === item.id;
              });
              this.contentList.splice(index, 1);
            }
            this.$Indicator.close();
          } catch (err) {
            this.$Indicator.close();
            console.log(err);
          }
        }
      });
    },
    // 格式化 时间
    formatTime(time) {
      return time.substring(0, time.length - 3);
    },
    ...mapActions(["getToken"])
  }
};
</script>
<style lang="less" scoped>
.works-manage-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f4f6fa;
  overflow: auto;
  .main {
    padding-top: 156px;

    .tab-bar {
      display: flex;
      align-content: center;
      align-items: center;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 156px;
      background: #fff;
      z-index: 1;
      .tab-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        span {
          height: 100%;
          line-height: 156px;
          font-size: 42px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(156, 158, 185, 1);
          &.active {
            border-bottom: 2px solid #693cf3ff;
          }
        }
      }
    }
    .content-list {
      position: fixed;
      left: 0;
      right: 0;
      top: 156px;
      bottom: 0;
      padding: 50px 45px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }
      .content-item {
        height: 1000px;
        height: 280px;
        box-shadow: 0px 10px 20px 0px rgba(64, 117, 205, 0.08);
        border-radius: 40px;
        margin-bottom: 30px;
        overflow: hidden;
        transform: rotate(0deg);
        /deep/ .mint-cell-wrapper {
          height: 100%;
          padding: 0;
          .mint-cell-title {
            max-width: 280px;
            margin-right: 40px;
            .left-info {
              position: relative;
              width: 280px;
              height: 280px;
              img {
                display: block;
                width: 100%;
                height: 100%;
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
              }
              .hot-val {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 68px;
                background: #7265e3ff;
                background: rgba(114, 101, 227, 1);
                opacity: 0.7;
                border-radius: 0 0px 0px 40px;
                font-size: 36px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 47px;
                &::before {
                  display: block;
                  content: "";
                  width: 30px;
                  height: 36px;
                  background: url("../../../assets/img/user/hot-cion.png")
                    no-repeat left top/100% 100%;
                  margin-right: 20px;
                }
              }
            }
          }
          .mint-cell-value {
            height: 100%;
            flex: 1;
            display: flex;
            padding-right: 30px;
            justify-content: space-between;
            align-items: center;
            .content-info {
              padding: 50px 0 38px;
              height: 100%;
              display: flex;
              flex: 1;
              flex-direction: column;
              justify-content: space-between;
              margin-right: 30px;
              .cont-tit {
                font-size: 40px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(45, 49, 66, 1);
                line-height: 62px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .create-time {
                font-size: 36px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(156, 158, 185, 1);
                line-height: 47px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
            .avatar {
              width: 98px;
              min-width: 98px;
              height: 98px;
              border-radius: 50%;
              overflow: hidden;
              img {
                display: block;
                width: 98px;
                height: 98px;
                border-radius: 50%;
                overflow: hidden;
              }
            }
          }
        }
        /deep/ .mint-cell-swipe-buttongroup {
          .mint-cell-swipe-button {
            padding: 0 40px;
            overflow: hidden;
            text-align: center;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(45, 49, 66, 1);
            line-height: 40px;
            &::before {
              display: block;
              content: "";
              width: 90px;
              height: 90px;
              margin: 72px 0 18px;
            }
          }
        }
        // 侧滑按钮图标样式
        &.showType1 {
          /deep/ .mint-cell-swipe-button {
            &::before {
              background: url("../../../assets/img/user/delete-content.png")
                no-repeat left top/100% 100%;
            }
          }
        }
        &.showType2 {
          /deep/ .mint-cell-swipe-button:first-child {
            &::before {
              background: url("../../../assets/img/user/edit-conent.png")
                no-repeat left top/100% 100%;
            }
          }
          /deep/ .mint-cell-swipe-button:nth-child(2) {
            &::before {
              background: url("../../../assets/img/user/delete-content.png")
                no-repeat left top/100% 100%;
            }
          }
          /deep/ .mint-cell-swipe-button:last-child {
            &::before {
              background: url("../../../assets/img/user/pulldown-content.png")
                no-repeat left top/100% 100%;
            }
          }
        }
        &.showType3 {
          /deep/ .mint-cell-swipe-button:first-child {
            &::before {
              background: url("../../../assets/img/user/delete-content.png")
                no-repeat left top/100% 100%;
            }
          }
        }
        /deep/ .mint-cell-swipe-button:last-child {
          &::before {
            background: url("../../../assets/img/user/pulldown-content.png")
              no-repeat left top/100% 100%;
          }
        }
      }
    }
    .empty-box {
      margin-top: 300px;
      text-align: center;
      font-size: 42px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(156, 158, 185, 1);
    }
  }
}
</style>
