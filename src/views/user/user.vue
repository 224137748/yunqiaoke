<template>
  <div class="user-page" v-show="!loading">
    <line-item :showArrIcon="false" class="avatar-info" @handleClick="updateAvatar">
      <span slot="title">头像</span>
      <!-- <span class="mobile" slot="content">{{getBaseInfo.mobile}}</span> -->
      <img class="avatar" slot="content" :src="getBaseInfo.avatar || baseAvatar" alt />
    </line-item>
    <line-item @handleClick="goUpdatePage(1, '昵称')">
      <span slot="title">昵称</span>
      <span slot="content">{{ getBaseInfo.nickname }}</span>
    </line-item>
    <line-item @handleClick="goUpdatePage(2, '性别')">
      <span slot="title">性别</span>
      <span slot="content">
        {{
        parseInt(getBaseInfo.sex) === 1
        ? "男"
        : parseInt(getBaseInfo.sex) === 2
        ? "女"
        : "未知"
        }}
      </span>
    </line-item>
    <line-item class="desc-info" @handleClick="goUpdatePage(3, '描述')">
      <span slot="title">描述</span>
      <span class="desc" slot="content">{{ getBaseInfo.desc || "添加一条描述吧" }}</span>
    </line-item>
    <line-item @handleClick="goSkillPage" class="skill-info">
      <span slot="title">绝技</span>
      <span
        slot="content"
        class="skill-item"
        v-for="(item, index) in getBaseInfo.userStunt"
        :key="index"
      >{{ item.name }}</span>
    </line-item>
    <line-item @handleClick="goUpdatePage(4, '绑定微信')">
      <span slot="title">微信号</span>
      <span slot="content">{{ getBaseInfo.wechat || "未绑定" }}</span>
    </line-item>
    <line-item @handleClick="goRestMobile">
      <span slot="title">手机号</span>
      <span slot="content">{{ getBaseInfo.mobile }}</span>
    </line-item>
    <div class="img-gallery">
      <div class="title">相片墙</div>
      <div class="img-list">
        <div
          class="img-item"
          v-for="(item, index) in showPic"
          :key="index"
          @click="handlePic(item, index)"
        >
          <div v-if="item" class="img-bg" :style="`backgroundImage:url(${item.url})`"></div>
          <div v-else class="empty"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineItem from "../../components/user/line-item";
import { getUserInfor, updateAvatar, addPic, updatePic } from "../../api/user";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { getQueryString } from "../../utils/lang";
const BASE_AVATAR = "http://yunqiaoke.sinmore.vip/default_avatar.png";
export default {
  name: "user-page",
  data() {
    return {
      baseAvatar: BASE_AVATAR,
      loading: true
    };
  },
  components: {
    LineItem
  },
  created() {
    this._getUserInfor();
  },
  computed: {
    showPic() {
      let showPic = this.getBaseInfo.userPic.slice();
      while (showPic.length < 4) {
        showPic.push(null);
      }
      return showPic;
    },
    ...mapState(["token"]),
    ...mapGetters("user", ["getBaseInfo"])
  },
  methods: {
    // 获取用户基本信息
    async _getUserInfor() {
      // 获取token
      !this.token && (await this.getToken());
      let params = new Set();
      let id = getQueryString("id") * 1;
      // 如果有用户的id，则传入id， 否则就传入token
      if (id) {
        params.add(id);
      } else {
        if (this.token) params.add(this.token);
      }
      if (params.size > 0) {
        try {
          this.$Indicator.open("加载中...");
          let res = await getUserInfor(...params);
          if (res.error_code === 0) {
            this.loading = false;
            this.saveData(res.data);
          } else {
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
          }
          this.$Indicator.close();
        } catch (err) {
          console.log(err);
          this.$Indircator.close();
        }
      } else {
        console.log("未获取到用户id或者token");
      }
    },
    // 上传头像
    async updateAvatar() {
      let res = await this.$bridge.call("get_image", {
        count: 1,
        crop: 0,
        isCamera: 0,
        needBase64: 0 // 不需要base64
      });
      if (res) {
        // 开始上传到后端
        try {
          this.$Indicator.open("加载中...");
          let updateRes = await updateAvatar(this.token, res.image[0]);
          if (updateRes.error_code === 0) {
            // 通知 APP 刷新数据
            // this.$bridge.call("changeBindPhone");
            this.setAvatar(res.image[0]);
          } else {
            this.$Toast({
              message: updateRes.error_msg,
              duration: 1500
            });
          }

          this.$Indicator.close();
        } catch (err) {
          console.log(err);
          this.$Indicator.close();
        }
      }
    },
    // 跳转到修改信息页面
    goUpdatePage(id, title) {
      this.$router.push({
        path: "/update",
        query: {
          id,
          title: encodeURIComponent(title)
        }
      });
    },
    // 修改手机号
    goRestMobile() {
      // 如果有手机号则为修改交互，否则为绑定
      this.$router.push({
        path: "/register-phone",
        query: {
          type: "reset"
        }
      });
    },
    // 上传 修改照片墙
    async handlePic(item, index) {
      /* eslint-disable */
      let imglist = await this.$bridge.call("get_image", {
        count: 1,
        crop: 0,
        isCamera: 0,
        needBase64: 0 // 不需要base64
      });
      if (imglist) {
        let submit;
        let params;
        // 判断是上传还是修改行为
        if (!item) {
          submit = addPic;
          params = {
            token: this.token,
            url: imglist.image[0]
          };
        } else {
          submit = updatePic;
          params = {
            token: this.token,
            user_pic_id: item.id,
            url: imglist.image[0]
          };
        }
        // 提交后端
        try {
          this.$Indicator.open("加载中...");
          let uploadRes = await submit(params);
          console.log(uploadRes);
          if (uploadRes.error_code === 0) {
            let arr = this.getBaseInfo.userPic.slice();
            // arr[index].url = imglist.image[0];
            arr[index] = {
              id: uploadRes.data.user_pic_id,
              url: imglist.image[0]
            };
            console.log(arr);
            this.setUserPic(arr);
          } else {
            this.$Toast({
              message: uploadRes.error_msg,
              duration: 1500
            });
          }
          this.$Indicator.close();
        } catch (err) {
          console.log(err);
          this.$Indicator.close();
        }
      }
    },
    // 保存数据到vuex
    saveData(data) {
      let baseInfo = {
        id: "",
        // 存储全局token
        token: "",
        // 存储极光id
        pushid: "",
        // 用户手机号
        mobile: "",
        // 1正常,2临时冻结,3永久冻结
        status: "",
        // 冻结时间
        froze_at: "",
        // 冻结天数
        froze_days: "",
        // 认证状态,0未认证,1认证中,2技能者,3雇主方,4个人投资者,5企业投资者,6已拒绝
        auth_status: "",
        openid: "",
        // token过期时间
        expired_at: "",
        // 创建时间
        created_at: "",
        // 1安卓,2iOS
        terminal: "",
        collections: "",
        fans: ""
      };
      for (let key in baseInfo) {
        if (data[key]) {
          baseInfo[key] = data[key];
        }
      }
      this.setBaseInfo(baseInfo || {});
      this.setUser(data.get_user_info || {});
      this.setUserStunt(data.get_user_stunt || []);
      this.setUserCollection(data.collection || []);
      this.setUserFan(data.fan || []);
      this.setUserPic(data.pic || []);
      this.setUserSite(data.site || []);

      this.setUserAuth(data.get_user_auth || {});
    },
    // 跳转到绝技列表
    goSkillPage() {
      this.$router.push("/skill");
    },
    // 全局mutations
    ...mapMutations({
      setBaseInfo: "SET_BASE_INFO"
    }),
    // user mutations
    ...mapMutations("user", [
      "setUser",
      "setUserStunt",
      "setUserCollection",
      "setUserFan",
      "setUserPic",
      "setUserSite"
    ]),
    // user Auth
    ...mapMutations("user/userAuth", ["setUserAuth"]),
    ...mapActions(["getToken"]),
    ...mapMutations("user", ["setAvatar", "addPic", "updatePic"])
  }
};
</script>
<style lang="less" scoped>
.user-page {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  .avatar-info {
    .mobile {
      margin-right: 10px;
    }
    .avatar {
      display: block;
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }
  .skill-info {
    /deep/ .insert-content {
      border-radius: 42px;
      justify-content: space-between;
    }
    .skill-item {
      text-align: center;
      padding: 0 30px;
      height: 84px;
      line-height: 84px;
      border-radius: 42px;
      background: rgba(246, 246, 251, 1);
      margin-right: 20px;
      white-space: nowrap;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .img-gallery {
    width: 1035px;
    margin: 0 auto;
    .title {
      margin: 60px auto 40px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
    }
    .img-list {
      display: grid;
      // 设置行、列间距
      grid-gap: 20px 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 270px 270px;
      .img-item {
        background: rgb(246, 246, 251);
        .img-bg {
          width: 100%;
          height: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        &:nth-child(1) {
          grid-row-start: 1;
          grid-row-end: 3;
        }
        &:nth-child(3) {
          grid-row-start: 2;
          grid-row-end: 3;
          grid-column-start: 2;
          grid-column-end: 3;
        }
        &:nth-child(4) {
          grid-row-start: 1;
          grid-row-end: 3;
        }
        .empty {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgb(246, 246, 251);
          &::after {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            display: block;
            content: "";
            width: 100%;
            height: 270px;
            margin: auto;
            background: url("../../assets/img/user/upload_img.png") no-repeat
              center top / 100% 100%;
          }
        }
      }
    }
  }
}
</style>
