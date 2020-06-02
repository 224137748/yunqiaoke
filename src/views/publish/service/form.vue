<template>
  <div class="service-form-page">
    <div class="main">
      <div class="upload-wrap flex flex-justify-between">
        <div class="poster-wrap">
          <div class="poster flex flex-column flex-align-center">
            <img v-if="videoStatus == 0" class="default-img" src="@/assets/img/publish/video.png" alt="" />
            <img v-if="videoStatus == 1" class="loading-img" src="@/assets/img/publish/loading.png" alt="" />

            <img v-if="videoStatus == 2" class="complete-img" src="@/assets/img/publish/video2.png" alt="" />
            <p v-if="videoStatus !== 0" class="desc">
              {{ videoStatus == 1 ? "视频上传中" : "视频上传完成" }}
            </p>
          </div>
          <div class="upload" @click="uploadVideo" />
        </div>
        <div class="poster-wrap">
          <div class="poster flex flex-align-center flex-justify-around">
            <img v-if="form.thumb" :src="form.thumb" alt="" />
            <img v-else class="default-img" src="@/assets/img/publish/poster.png" alt="" />
          </div>
          <div class="upload" @click="uploadPoster" />
        </div>
      </div>
      <Topic type="service" @selectTopic="selectTopic" :tname="form.topicConfig.name"></Topic>
      <div class="form">
        <div class="input-list flex flex-align-center">
          <span class="title">服务名称</span>
          <input type="text" v-model.trim="form.name" maxlength="50" placeholder="请输入" />
          <span class="affix-text"></span>
        </div>
        <div class="input-list flex flex-align-center">
          <span class="title">服务价格</span>
          <input type="text" v-model="form.price" placeholder="请输入" />
          <span class="affix-text">元</span>
        </div>
        <div class="input-list flex flex-align-center">
          <span class="title">服务区域</span>
          <span class="desc" @click="reSelectArea">{{
            form.site.length ? "已选择" : "请选择"
          }}</span>
          <span class="affix-img"></span>
        </div>
        <div class="input-list flex flex-align-center">
          <span class="title">服务行业</span>
          <span class="desc" @click="reSelectType">{{
            form.cateConfig.name
          }}</span>
          <span class="affix-img" @click="reSelectType"></span>
        </div>
        <div class="input-textarea">
          <p class="title">服务体验</p>
          <div class="textarea-wrap">
            <textarea placeholder="请输入" v-model="form.desc"></textarea>
            <div class="upload-images-container flex flex-wrap">
              <div class="upload-item" v-for="(image, index) in form.pic" :key="index">
                <div class="img-wrap flex flex-align-center flex-justify-around">
                  <img :src="image" alt="" />
                </div>
                <span class="close" @click="delImages(index)"></span>
              </div>
              <div class="upload-item upload-btn" v-if="form.pic.length < 9" @click="uploadImages">
                <div class="img-wrap">
                  <div class="upload"></div>
                  <!-- <div class="plus">+</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="spot-container flex-align-center" @click="getSpot">
        <img src="@/assets/img/publish/spot.png" alt="" srcset="" />
        <span class="spot" v-if="form.prov">
          {{ form.prov }}
          {{ form.city }}
          {{ form.area }}
        </span>
        <span class="tip" v-else>添加发布地点</span>
      </div>
    </div>
    <!-- bottom -->
    <actionBar @saveDraft="saveDraft(true)" @nextStep="nextStep"></actionBar>
  </div>
</template>
<script>
// import lang from "@/utils/lang.js";
// token 直接写1  this.$store.state.token
import { mapState, mapMutations } from "vuex";
import actionBar from "@/components/publish/bottom-action-bar.vue";
import Topic from "@/components/publish/topic.vue";
import { addService, getService } from "@/api/publish";
export default {
  name: "service-form-page",
  components: {
    actionBar,
    Topic
  },
  data() {
    return {
      videoStatus: 0, // 0 未上传 1上传中 2已上传
      form: {
        id: "",
        name: "",
        price: "", // 0-999999
        prov: "", // 省市区
        city: "",
        area: "",
        lng: "",
        lat: "", // 经纬度
        desc: "",
        category_id: "", // 分类id
        cateConfig: {
          id: "",
          name: ""
        },
        media: "", // 视频
        thumb: "", //  视频封面
        topicConfig: {
          id: "",
          name: ""
        },
        topic_id: "", // 话题id
        site: [],
        pic: [] // 服务图片列表
      },
      isAdd: true
    };
  },
  computed: {
    ...mapState({
      token: "token",
      saveForm: state => state.publish.serviceForm
    })
  },
  mounted() {
    // 编辑
    if (this.$route.query.id) {
      this.$Indicator.open("加载中...");
      getService({ token: this.token, service_id: this.$route.query.id }).then(
        res => {
          this.$Indicator.close();
          if (res.error_code === 0) {
            this.videoStatus = 2;
            let modifyForm = res.data;
            let picArr = [];
            let siteArr = [];
            if (modifyForm.site && modifyForm.site.length) {
              modifyForm.site.map(item => {
                siteArr.push({
                  prov: item.prov,
                  city: item.city,
                  area: item.area
                });
              });
            }
            if (modifyForm.pic && modifyForm.pic.length) {
              modifyForm.pic.map(item => {
                picArr.push(item.url);
              });
            }

            this.form = {
              id: this.$route.query.id,
              name: modifyForm.name,
              price: parseInt(modifyForm.price), // 0-999999
              prov: "", // 省市区
              city: "",
              area: "",
              lng: "",
              lat: "", // 经纬度
              desc: modifyForm.desc || "",
              category_id: modifyForm.category_id || "", // 分类id
              cateConfig: {
                id: modifyForm.category_id || "",
                name: modifyForm.category.name || ""
              },
              media: modifyForm.media || "", // 视频
              thumb: modifyForm.thumb, //  视频封面
              topicConfig: {
                id: modifyForm.topic_id ? modifyForm.topic.id : "",
                name: modifyForm.topic_id ? modifyForm.topic.name : ""
              },
              topic_id: modifyForm.topic_id || "", // 话题id
              site: siteArr,
              pic: picArr // 服务图片列表
            };
            // 获取缓存数据
            if (this.saveForm) {
              this.form = Object.assign(
                this.form,
                JSON.parse(JSON.stringify(this.saveForm))
              );
            }
            // 获取修改分类id
            if (this.$route.query.cate) {
              this.form.category_id = this.$route.query.cate;
              this.form.cateConfig.id = this.$route.query.cate;
              this.form.cateConfig.name = this.$route.query.name;
            }
          } else {
            this.$Toast.fail(res.error_msg);
          }
        }
      );
      this.isAdd = false;
    } else {
      // 获取缓存数据
      if (this.saveForm) {
        this.form = Object.assign(
          this.form,
          JSON.parse(JSON.stringify(this.saveForm))
        );
      }
      if (this.form.media) {
        this.videoStatus = 2;
      }
      // 获取修改分类id
      if (this.$route.query.cate) {
        this.form.category_id = this.$route.query.cate;
        this.form.cateConfig.id = this.$route.query.cate;
        this.form.cateConfig.name = this.$route.query.name;
      }
    }
  },
  methods: {
    ...mapMutations("publish", {
      saveServiceForm: "saveServiceForm"
    }),
    /**
     * 上传视频
     */
    async uploadVideo() {
      let video = await this.$bridge.call("get_video");
      this.form.media = video.video_id;
      this.videoStatus = 1;
      this.videoStatus = 2;
    },
    /**
     * 上传封面
     */
    async uploadPoster() {
      let poster = await this.$bridge.call("get_image", {
        count: 1,
        crop: 0,
        isCamera: 0
      });
      console.log(poster);
      this.form.thumb = poster.image[0];
    },
    /**
     * 重选区域
     */
    reSelectArea() {
      this.saveDraft();
      this.$router.push({ path: "/publish/area", query: { type: "service" } });
    },
    /**
     * 重选服务行业
     */
    reSelectType() {
      this.saveDraft();
      this.$router.push("/publish/service-type");
    },
    /**
     * 选择话题
     */
    selectTopic() {
      if (!this.form.thumb) return this.$Toast("请先上传封面图");
      this.saveDraft();
      this.$router.push({ path: "/publish/topic", query: { type: "service" } });
    },
    // 保存草稿 flag true->存储到后台
    saveDraft(flag) {
      this.saveServiceForm(this.form);
      if (flag) {
        if (!this.form.thumb) {
          return this.$Toast({
            message: "请上传视频封面图片",
            duration: 1500
          });
        }
        if (!this.form.name) {
          return this.$Toast({
            message: "服务名称未填写",
            duration: 1500
          });
        }

        if (
          this.form.price &&
          !(this.form.price >= 0 && this.form.price <= 999999)
        ) {
          return this.$Toast({
            message: "服务价格范围为0-999999",
            duration: 1500
          });
        }
        if (this.form.price && !/^\d+$/.test(this.form.price)) {
          return this.$Toast({
            message: "服务价格应为整数",
            duration: 1500
          });
        }
        this.$Indicator.open("请求中...");
        let tempForm = {
          token: this.token,
          name: this.form.name,
          thumb: this.form.thumb,
          type: 4
        };
        if (this.form.price) {
          tempForm.price = this.form.price;
        }
        if (this.form.prov) {
          tempForm.prov = this.form.prov;
          tempForm.city = this.form.city;
          tempForm.area = this.form.area;
          tempForm.lng = this.form.lng;
          tempForm.lat = this.form.lat;
        }
        if (this.form.desc) {
          tempForm.desc = this.form.desc;
        }
        if (this.form.category_id) {
          tempForm.category_id = this.form.category_id;
        }

        if (this.form.media) {
          tempForm.media = this.form.media;
        }
        if (this.form.topic_id) {
          tempForm.topic_id = this.form.topic_id;
        }
        if (this.form.site && this.form.site.length) {
          tempForm.site = this.form.site;
        }
        if (this.form.pic && this.form.pic.length) {
          tempForm.pic = this.form.pic;
        }
        addService(tempForm, true).then(res => {
          this.$Indicator.close();
          if (res.error_code === 0) {
            this.$Toast({
              message: "保存草稿成功",
              duration: 1500
            });
            this.saveServiceForm(null);
            // this.$router.push({ path: "/publish/plan", query: { type: 1 } });
            // this.$router.push({ path: "/works", query: { type: 1 } });
          } else {
            this.$Toast(res.error_msg);
          }
        });
      }
    },
    nextStep() {
      if (!this.form.media) {
        return this.$Toast({
          message: "请上传服务视频",
          duration: 1500
        });
      }
      if (!this.form.thumb) {
        return this.$Toast({
          message: "请上传视频封面图片",
          duration: 1500
        });
      }
      if (!this.form.name) {
        return this.$Toast({
          message: "服务名称未填写",
          duration: 1500
        });
      }
      if (!this.form.price) {
        return this.$Toast({
          message: "服务价格未填写",
          duration: 1500
        });
      }
      if (!(this.form.price >= 0 && this.form.price <= 999999)) {
        return this.$Toast({
          message: "服务价格范围为0-999999",
          duration: 1500
        });
      }
      if (!/^\d+$/.test(this.form.price)) {
        return this.$Toast({
          message: "服务价格应为整数",
          duration: 1500
        });
      }
      if (!this.form.desc) {
        return this.$Toast({
          message: "服务体验未填写",
          duration: 1500
        });
      }
      if (!this.form.pic || this.form.pic.length === 0) {
        return this.$Toast({
          message: "请上传缩略图",
          duration: 1500
        });
      }
      if (!this.form.site.length) {
        return this.$Toast({
          message: "请选择服务区域",
          duration: 1500
        });
      }
      if (!this.form.prov) {
        return this.$Toast({
          message: "请选择发布地点",
          duration: 1500
        });
      }
      this.$Indicator.open("请求中...");
      if (this.isAdd) {
        let temForm = {
          token: this.token,
          name: this.form.name,
          price: this.form.price,
          prov: this.form.prov,
          city: this.form.city,
          area: this.form.area,
          lng: this.form.lng,
          lat: this.form.lat,
          desc: this.form.desc,
          category_id: this.form.category_id,
          media: this.form.media,
          thumb: this.form.thumb,
          site: this.form.site,
          pic: this.form.pic
        };
        if (this.form.topic_id) {
          temForm["topic_id"] = this.form.topic_id;
        }
        addService(temForm, true).then(res => {
          this.$Indicator.close();
          if (res.error_code === 0) {
            // this.$Toast("发布成功，系统审核中");
            this.saveServiceForm(null);
            this.$router.push({
              path: "/publish/plan",
              query: { type: 1, id: res.data.service_id }
            });
            // this.$router.push({ path: "/works", query: { type: 1 } });
          } else {
            this.$Toast(res.error_msg);
          }
        });
      } else {
        let temForm = {
          service_id: this.form.id,
          token: this.token,
          name: this.form.name,
          price: this.form.price,
          prov: this.form.prov,
          city: this.form.city,
          area: this.form.area,
          lng: this.form.lng,
          lat: this.form.lat,
          desc: this.form.desc,
          category_id: this.form.category_id,
          media: this.form.media,
          thumb: this.form.thumb,
          site: this.form.site,
          pic: this.form.pic
        };
        if (this.form.topic_id) {
          temForm["topic_id"] = this.form.topic_id;
        }
        addService(temForm, false).then(res => {
          this.$Indicator.close();
          if (res.error_code === 0) {
            // this.$Toast("发布成功，系统审核中");
            this.saveServiceForm(null);
            this.$router.push({
              path: "/publish/plan",
              query: { type: 1, id: res.data.service_id }
            });
            // this.$router.push({ path: "/works", query: { type: 1 } });
          } else {
            this.$Toast(res.error_msg);
          }
        });
      }
    },
    // 获取定位
    async getSpot() {
      let a = await this.$bridge.call("get_location", {});
      console.log(a);
      if (a.success === 0) {
        this.form.prov = a.province;
        this.form.city = a.city;
        this.form.area = a.district;
        this.form.lng = a.longitude;
        this.form.lat = a.latitude;
      } else if (a.success === 2) {
        this.$Toast("获取定位失败,请开启定位权限");
      } else {
        this.$Toast("获取定位失败");
      }
      // success:状态码：0：成功，1：失败，未知原因，2失败，未开启权限
      // longitude:经度
      // latitude:纬度
      // province:省
      // city:市
      // district:区
      // street:街道
      // number：门牌号
      // POIName:兴趣点名称（比如小区名称）
    },
    /**
     * 上传描述图片
     */
    async uploadImages() {
      if (this.form.pic.length >= 9) return;
      let pics = await this.$bridge.call("get_image", {
        count: 9 - this.form.pic.length,
        crop: 0,
        isCamera: 0
      });
      console.log(pics);
      this.form.pic = this.form.pic.concat(pics.image);
    },
    // 删除图片
    delImages(index) {
      this.form.pic.splice(index, 1);
    }
  }
};
</script>
<style lang="less" scoped>
.service-form-page {
  min-height: 100vh;
  width: 1035px;
  margin: 0 auto;
  .main {
    padding-bottom: 332px;
    overflow-y: auto;
    padding-top: 50px;
  }
  .upload-wrap {
    .video-wrap {
      width: 500px;
      height: 500px;
      position: relative;
      .default-img {
        width: 500px;
        height: 500px;
      }
      .video video {
        width: 500px;
        height: 500px;
      }
      .upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        opacity: 0;
      }
    }
    .poster-wrap {
      width: 500px;
      height: 500px;
      position: relative;
      .poster {
        height: 100%;
        background-color: #f6f5f8;
        border-radius: 30px;
        img {
          max-width: 500px;
          max-height: 500px;
        }

        @keyframes rotate {
          0% {
            transform: rotateZ(0deg); /*从0度开始*/
          }
          100% {
            transform: rotateZ(360deg); /*360度结束*/
          }
        }
        .loading-img {
          width: 140px;
          height: 140px;
          margin-top: 134px;
          animation: rotate 1s linear infinite;
        }
        .complete-img {
          width: 140px;
          height: 140px;
          margin-top: 134px;
        }
        .desc {
          font-size: 48px;
          font-weight: 400;
          color: #2d3142;
          line-height: 48px;
          margin-top: 35px;
        }
      }

      .upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        opacity: 0;
      }
    }
  }
  .form {
    .input-list {
      height: 160px;
      border-bottom: solid #ededf7 3px;
      .title {
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        line-height: 42px;
        margin-right: 50px;
      }
      input {
        font-size: 42px;
        line-height: 42px;
        padding-left: 10px;
        flex: 1;
      }
      .desc {
        font-size: 42px;
        line-height: 42px;
        padding-left: 10px;
        flex: 1;
      }
      .affix-text {
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
        margin-left: 20px;
      }
      .affix-img {
        width: 20px;
        height: 35px;
        background-image: url(../../../assets/img/publish/arrow-right.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
      }
    }
    .input-textarea {
      .title {
        height: 130px;
        line-height: 110px;
        font-size: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(45, 49, 66, 1);
      }
      .textarea-wrap {
        background-color: #f4f6fa;
        border-radius: 30px;
        padding: 50px;
        textarea {
          width: 100%;
          height: 400px;
          border: none;
          outline: none;
          background-color: transparent;
          font-family: PingFang SC;
          font-weight: 400;
          &::placeholder {
            color: rgba(214, 217, 224, 1);
          }
        }
      }
      .upload-images-container {
        .upload-item {
          width: 220px;
          height: 220px;
          position: relative;
          margin-top: 20px;
          overflow: hidden;
          margin-right: 10px;
          .img-wrap {
            border-radius: 10px;
            width: 200px;
            height: 200px;
            position: absolute;
            left: 0;
            bottom: 0;
            overflow: hidden;
            background-color: #fff;
            img {
              max-width: 200px;
            }
          }
          .close {
            cursor: pointer;
            width: 48px;
            height: 48px;
            position: absolute;
            top: 0;
            right: 0;
            background-image: url(../../../assets/img/publish/del.png);
            background-size: 48px 48px;
            background-repeat: no-repeat;
          }
          &.upload-btn {
            .upload {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              z-index: 2;
              display: block;
              background-image: url(../../../assets/img/publish/upload.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  .spot-container {
    display: inline-flex;
    height: 84px;
    padding: 0 32px;
    background: rgba(244, 246, 250, 1);
    border-radius: 42px;
    margin-top: 60px;
    img {
      margin-right: 20px;
      width: 28px;
      height: 36px;
    }
    .tip {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(214, 217, 224, 1);
    }
  }
  .type-outer {
    .title {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 48px;
      padding: 40px 0;
    }
    .type-inner {
      display: inline-block;
      margin-right: 40px;
      padding: 25px 37px;
      background-color: #f6f6fb;
      border-radius: 42px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 36px;
      margin-bottom: 40px;
    }
  }
}
</style>
