<template>
  <div class="draft-page" :data-type="showType">
    <div class="main">
      <div class="tab-bar">
        <div class="tab-item">
          <span :class="{ active: showType === 1 }" @click="selectShowType(1)">服务</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 5 }" @click="selectShowType(5)">派单</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 6 }" @click="selectShowType(6)">转让</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 3 }" @click="selectShowType(3)">投资</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 4 }" @click="selectShowType(4)">融资</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 7 }" @click="selectShowType(7)">公开课</span>
        </div>
        <div class="tab-item">
          <span :class="{ active: showType === 2 }" @click="selectShowType(2)">技能</span>
        </div>
      </div>
      <transition name="fade">
        <ul class="content-list" v-if="contentList.length">
          <mt-cell-swipe class="content-item" :class="`showType${showType}`" title="text" :right="editBtnList(item)" v-for="item in contentList" :key="item.id">
            <div slot="title" class="left-info">
              <img :src="item.content.thumb" alt class="cover" />
              <!-- <div class="hot-val">111111</div> -->
            </div>
            <!-- 右侧内容 -->
            <div class="content-info">
              <div class="cont-tit">{{item.content.name}}</div>
              <!-- <div class="create-time">
                提交时间：3333
              </div> -->
            </div>
            <div class="avatar">
              <img :src="item.content_user_info.avatar" alt />
            </div>
          </mt-cell-swipe>
        </ul>
      </transition>
      <div class="empty-box" v-show="!isLoading && !contentList.length">
        目前暂无草稿内容哦~！
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getUserCollectIndex } from "../../api/home.js";
import { getUserDestroy } from "../../api/buddy.js";
export default {
  name: "draft-page",
  data() {
    return {
      // 1 服务、2 技能、3 投资、4 融资、 5 派单、 6、转让 7、代表作
      showType: 1,
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
  created() {
    this.getData();
  },
  computed: {
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
      // 获取数据
      this.getData();
    },
    // 首次获取数据
    async getData() {
      !this.token && (await this.getToken());
      let params = {
        type: this.showType,
        token: this.token
      };
      try {
        this.$Indicator.open("加载中...");
        let res = await getUserCollectIndex(params);
        this.isLoading = false;
        if (res.error_code === 0) {
          // if (Array.isArray(res.data.data)) {
          //   this.$nextTick(() => {
          //     this.contentList = res.data.data;
          //   });
          // }
          this.contentList = res.data.data;
        }
        this.$Indicator.close();
      } catch (err) {
        this.$Indicator.close();
        console.log(err);
      }
    },
    // 编辑菜单列表
    editBtnList(item) {
      return [{
        content: "删除",
        style: {},
        handler: () => this.deletContentItem(item)
      }];
    },
    // 删除内容
    async deletContentItem(item) {
      this.$MessageBox({
        title: "提示",
        message: "确定要取消收藏此内容?",
        showCancelButton: true,
        ConfirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async val => {
        if (val === "confirm") {
          try {
            var params = {
              token: this.token,
              collect_content_id: item.id
            };
            this.$Indicator.open("加载中...");
            let res = await getUserDestroy(params);
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
    // 清空草稿箱内容
    async clearDraft() {},
    ...mapActions(["getToken"])
  },
  watch: {
    contentList(newVal) {
      // newVal.length
      // 节流
      if (this.timer) {
        console.log("clear");
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        if (!this.inited) {
          console.log("show");
          this.$bridge.call("setNav", {
            type: 1,
            data: "清空",
            method: "clearDraft"
          });
        } else {
          console.log("hide");
          this.$bridge.call("setNav", {
            type: 0
          });
        }
        this.inited = !this.inited;
        this.timer = null;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
  .draft-page {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #f4f6fa;
    overflow: hidden;

    .main {
      padding-top: 156px;
      width: 100%;
      overflow: hidden;

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
                    background: url("../../assets/img/user/hot-cion.png") no-repeat left top/100% 100%;
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
                background: url("../../assets/img/user/delete-content.png") no-repeat left top/100% 100%;
              }
            }
          }

          &.showType2 {
            /deep/ .mint-cell-swipe-button:first-child {
              &::before {
                background: url("../../assets/img/user/edit-conent.png") no-repeat left top/100% 100%;
              }
            }

            /deep/ .mint-cell-swipe-button:nth-child(2) {
              &::before {
                background: url("../../assets/img/user/delete-content.png") no-repeat left top/100% 100%;
              }
            }

            /deep/ .mint-cell-swipe-button:last-child {
              &::before {
                background: url("../../assets/img/user/pulldown-content.png") no-repeat left top/100% 100%;
              }
            }
          }

          &.showType3 {
            /deep/ .mint-cell-swipe-button:first-child {
              &::before {
                background: url("../../assets/img/user/delete-content.png") no-repeat left top/100% 100%;
              }
            }
          }

          /deep/ .mint-cell-swipe-button:last-child {
            &::before {
              background: url("../../assets/img/user/pulldown-content.png") no-repeat left top/100% 100%;
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
