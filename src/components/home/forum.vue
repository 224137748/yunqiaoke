<template>
  <div class="forum">
    <div class="top">
      <div class="left" :style="'background-image: url(' + work.thumb +')'"></div>
      <div class="right">
        <div class="dTitle">{{work.name}}</div>
        <div class="desc"><span>认可：{{work.gem_count}}</span><span>掌声：{{work.likes_count}}</span></div>
        <div class="case">{{work.price}}币/小时</div>
      </div>
      <div class="bdBottom">巧主在售</div>
    </div>
    <div class="plc">
      <div class="box">
        <div class="left">{{list.length}}条评论</div>
        <div class="right">
          <span :class="active===i?'active':''" v-for="(item, i) in tap" :key="i" @click="tapList(i, item.type)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="nd">
      <div class="pox" v-for="(item, i) in list" :key="i">
        <div class="cd">
          <div class="bd" :style="'background-image: url('+item.user_info.avatar+')'"></div>
          <div class="hd">
            <div class="title">{{item.user_info.nickname}}</div>
            <div class="time">{{item.creat}}</div>
            <div class="des">{{item.content}}</div>
            <div class="talk" v-if="item.forumShow && item.commentList.length">
              <div class="item" v-for="(it, index) in item.commentList" :key="index"><span>{{it.user_info.nickname}}：</span>{{it.content}}</div>
            </div>
            <div class="tapz">
              <span @click="close(i)" v-if="item.forumShow">收回<img src="../../assets/img/buddy/tap4.png" alt=""></span>
              <span @click="open(i)" v-else>展开<img src="../../assets/img/buddy/zhan.png" alt=""></span>
            </div>
          </div>
          <div class="talp">
            <span @click="good(i, item.id)"><img src="../../assets/img/buddy/pai.png" alt="">{{item.likes}}</span>
            <span @click="reply(i, item.user_info.nickname, item.id)"><img src="../../assets/img/buddy/talk.png" alt="">{{item.comment_count}}</span>
          </div>
        </div>
      </div>
    </div>
    <form action="javascript:;" ref="form" class="formBox felx">
      <div class="bd" @click="takeForm">
        <input type="text" value="" placeholder="喜欢就评论" disabled />
        <div class="inputRight">
          <i></i>
          <div class="happy">😀</div>
          <div class="getbottom">发送</div>
        </div>
      </div>
    </form>
    <div v-if="!formShow" @touchmove.prevent>
      <div action="javascript:;" ref="form" class="formBox formBottom" :class="!formShow?'tapForm':''">
        <div class="bd">
          <div contenteditable="true" :data-text="placeholder" ref="myInput" autofocus @blur="anBlur" @focus="anFocus" class="textarea"></div>
          <div class="inputRight">
            <i></i>
            <div class="happy" @click="expresShow = !expresShow">😀</div>
            <div class="getbottom" @click="getSend">发送</div>
          </div>
        </div>
        <div class="biao" v-if="expresShow">
          <span v-for="(item, i) in expres" :key="i" @click="tapExpres(item.name)">{{item.name}}</span>
        </div>
      </div>
      <div class="bigBox" @click="takeFormHide"></div>
    </div>
  </div>
</template>

<script>
import {
  getServiceList,
  getCourseStore,
  getForumList,
  getCourseLike
} from "../../api/buddy.js";
import expres from "./expression.json";
export default {
  props: {
    token: {
      type: String,
      default: ""
    },
    arr: {
      type: Object,
      default: () => []
    },
    locat: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      placeholder: "喜欢就评论",
      disForum: 1, // 1为添加评论，0为评论回复
      forumId: "", // 评论id
      index: "", // 评论列表下标
      work: "",
      tap: [
        { name: "按热度", id: 0, type: "likes" },
        { name: "按时间", id: 1, type: "created_at" }
      ],
      type: "likes",
      active: 0,
      formShow: true,
      expresShow: false,
      expres: expres,
      page: 1,
      list: []
    };
  },
  mounted() {
    this.getList(this.type);
    this.getHisWork();
  },
  methods: {
    // 打开评论回复输入框
    reply(index, name, id) {
      this.formShow = false;
      this.$nextTick(function () {
        this.$refs.myInput.focus();
      });
      this.placeholder = "@" + name;
      this.disForum = 0;
      this.forumId = id;
      this.index = index;
    },
    // 评论回复展开收缩
    close(index) {
      this.list[index].forumShow = false;
    },
    open(index) {
      if (this.list[index].commentList) {
        this.list[index].forumShow = true;
        return false;
      }
      var forumId = this.list[index].id;
      this.index = index;
      this.FList(index, forumId);
    },
    // 回复评论列表
    async FList(index, forumId) {
      var params = {
        token: this.token,
        course_id: this.arr.id,
        course_comment_id: forumId,
        orderBy: this.type,
        page: this.page,
        per_page: 10
      };
      this.$Indicator.open("加载中...");
      var res = await getForumList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.list[index].commentList = data.data;
          this.list[index].forumShow = true;
          this.$Indicator.close();
        } else {
          console.log(res.error_msg);
          this.$Indicator.close();
        }
      } catch (err) {
        console.log(err);
        this.$Indicator.close();
      }
    },
    // 排序
    tapList(index, type) {
      this.active = index;
      this.type = type;
      this.getList(type);
    },
    // 评论点赞
    async good(index, id) {
      var params = {
        token: this.token,
        course_comment_id: id
      };
      var res = await getCourseLike(params);
      try {
        if (res.error_code === 0) {
          this.list[index].likes = this.list[index].likes + 1;
          this.$Toast({
            message: "点赞成功",
            duration: 1500
          });
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 评论列表
    async getList(type) {
      var params = {
        token: this.token,
        course_id: this.arr.id,
        orderBy: type,
        page: this.page,
        per_page: 10
      };
      var res = await getForumList(params);
      try {
        if (res.error_code === 0) {
          var base = res.data.data;
          for (var i = 0; i < base.length; i++) {
            base[i].forumShow = false;
            var date = new Date(base[i].created_at);
            var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            base[i].creat = M + D;
          }
          this.list = base;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 发送评论
    async getSend() {
      var text = this.$refs.myInput.innerText.replace(/(^\s*)|(\s*$)/g, "");
      this.formShow = true;
      this.expresShow = false;
      if (text) {
        var params;
        if (this.disForum === 1) { // 1评论回复
          params = {
            token: this.token,
            course_id: this.arr.id,
            content: text
          };
        } else { // 回请评论
          params = {
            token: this.token,
            course_id: this.arr.id,
            course_comment_id: this.forumId,
            content: text
          };
        }
        var res = await getCourseStore(params);
        try {
          if (res.error_code === 0) {
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
            // this.$refs.myInput.innerText = "";
            this.formShow = true;
            this.expresShow = false;
            if (this.disForum === 1) {
              this.page = 1;
              this.getList(this.type);
            } else {
              if (this.list[this.index].commentList) {
                this.FList(this.index, this.forumId);
              }
            }
          } else if (text.length > 200) {
            this.$Toast({
              message: "评论内容不能超过200字",
              duration: 1500
            });
          } else {
            console.log(res.error_msg);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$Toast({
          message: "评论内容不能为空",
          duration: 1500
        });
      }
    },
    // 他的作品
    async getHisWork() {
      var params = {
        token: this.token,
        user_id: this.arr.user_info.user_id,
        // lng: this.locat.longitude,
        // lat: this.locat.latitude,
        lng: "113.8529519314236",
        lat: "23.026370713975695",
        page: 1,
        per_page: 1
      };
      var res = await getServiceList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.work = data.data[0];
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 输入框跟表情拼接
    tapExpres(item) {
      this.$refs.myInput.innerText = this.$refs.myInput.innerText + item;
    },
    // 失去焦点
    anBlur() {
      // console.log("失去焦点");
    },
    // 如果有焦点就关闭表情包
    anFocus() {
      if (this.expresShow === true) {
        this.expresShow = false;
      }
    },
    // 获取焦点
    takeForm() {
      this.formShow = false;
      this.$nextTick(function () {
        this.$refs.myInput.focus();
      });
    },
    takeFormHide() {
      this.formShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/toast.css";
.bigBox{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0,0,0,.5);
}
.formBox{
  width: 100%;
  margin-top: 1.955555rem;
  margin-bottom: 0.533333rem;
  z-index: 10001;
  height: 60%;
  background-color: #FFFFFF;
  padding-top: 0.355555rem;
  &.felx{
    position: fixed;
    left: 0;
    bottom: 2.222222rem;
    background-color: inherit;
    height: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  .biao{
    width: 92%;
    margin: 0 auto;
    background-color: #FFFFFF;
    flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    display: flex;
    margin-top: 0.177777rem;
    span{
      font-size: 0.533333rem;
      text-align: center;
      margin: 0 0.133333rem;
      margin-bottom: 0.177777rem;
    }
  }
  &.formBottom{
    margin-top: 0;
  }
  &.tapForm{
    position: fixed;
    margin-bottom: 0;
    bottom: 0;
  }
  .bd{
    background-color: #F6F6FB;
    border-radius: 0.16rem;
    width: 92%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .inputRight{
      // position: absolute;
      // right: 0;
      // top: 50%;
      // transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 0.266666rem;
      width: 3.3rem;
      position: relative;
      i{
        width: 0.026666rem;
        height: 0.266666rem;
        background-color: #D8D8D8;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
      }
      .getbottom{
        color: #FFFFFF;
        background-color: #7265E3;
        padding: 0.133333rem;
        border-radius: 0.133333rem;
        font-size: 0.32rem;
      }
      .happy{
        font-size: 0.45rem;
        margin-right: 0.32rem;
        word-break: break-all;
        // padding-bottom: 0.177777rem;
      }
      div{
        display: inline-block;
        line-height: 1;
      }
    }
    input, .textarea{
      background-color: #F6F6FB;
      color: #333333;
      font-size: 0.373333rem;
      padding: 0.24rem 0.417777rem;
      width: 100%;
      border: 0;
      min-height: 0.906666rem;
      max-height: 1.813333rem;
      overflow-x: hidden;
      overflow-y: auto;
      outline: 0;
    }
    .textarea{
      -webkit-user-modify: read-write-plaintext-only;
    }
    [contentEditable=true]:empty:not(:focus):before {
      content: attr(data-text);
      color: #D6D9E0;
    }
    input::input-placeholder{
      color: #D6D9E0;
      font-size: 0.32rem;
    }
  }
}
.forum{
  .nd{
    padding-bottom: 2.666666rem;
  }
  .pox{
    width: 96%;
    margin-left: 4%;
    margin-top: 0.56rem;
    .cd{
      display: flex;
      position: relative;
      .tapz{
        text-align: center;
        margin-bottom: 0.4rem;
        span{
          color: #7265E3;
          display: inline-block;
          font-size: 0.32rem;
          img{
            width: 0.168888rem;
            vertical-align: middle;
            margin-left: 0.053333rem;
          }
        }
      }
      .talp{
        position: absolute;
        right: 4%;
        top: 0;
        span{
          font-size: 0.32rem;
          color: #9C9EB9;
          margin-left: 0.417777rem;
          img{
            vertical-align: middle;
            margin-right: 0.133333rem;
            width: 0.426666rem;
          }
        }
      }
      &:last-child{
        margin-bottom: 0.56rem;
      }
      .hd{
        flex: 1;
        margin-left: 0.302222rem;
        border-bottom: 0.026666rem solid #EAEAEA;
        .talk{
          margin-bottom: 0.391111rem;
          background-color: #F4F6FA;
          width: 95%;
          padding: 0.4rem;
          .item{
            font-size: 0.32rem;
            color: #9C9EB9;
            margin-bottom: 0.391111rem;
            &:last-child{
              margin-bottom: 0;
            }
            span{
              color: #2D3142;
            }
          }
        }
        .des{
          font-size: 0.373333rem;
          color: #000000;
          line-height: 0.497777rem;
          padding-right: 5%;
          text-align: justify;
          padding-bottom: 0.391111rem;
        }
        .time{
          font-size: 0.266666rem;
          color: #9C9EB9;
          line-height: 1;
          padding-top: 0.177777rem;
          padding-bottom: 0.373333rem;
        }
        .title{
          font-size: 0.373333rem;
          color: #2D3142;
          line-height: 1;
          padding-top: 0.142222rem;
        }
      }
      .bd{
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
      }
    }
  }
  .plc{
    padding: 0.266666rem 0;
    border-bottom: 0.026666rem solid #EAEAEA;
    .box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      width: 92%;
      margin: 0 auto;
      .right{
        span{
          color: #9C9EB9;
          font-size: 0.32rem;
          line-height: 1;
          &:first-child{
            padding-right: 0.266666rem;
            border-right: 0.026666rem solid #9C9EB9;
          }
          &:last-child{
            padding-left: 0.266666rem;
          }
          &.active{
            color: #2D3142;
          }
        }
      }
      .left{
        font-size: 0.32rem;
        color: #2D3142;
      }
    }
  }
  .top{
    display: flex;
    position: relative;
    width: 92%;
    margin: 0 auto;
    padding-top: 0.4rem;
    padding-bottom: 0.266666rem;
    .bdBottom{
      width: 2.133333rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background: linear-gradient(122.023deg,rgba(139,99,230,1) 0%,rgba(97,85,204,1) 100%);
      border-radius: 0.444444rem;
      color: #FFFFFF;
      font-size: 0.32rem;
      text-align: center;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .right{
      flex: 1;
      padding-left: 0.337777rem;
      .case{
        font-size: 0.32rem;
        color: #7265E3;
        line-height: 1;
      }
      .desc{
        line-height: 1;
        padding-top: 0.124444rem;
        padding-bottom: 0.551111rem;
        span{
          padding-right: 0.444444rem;
          font-size: 0.32rem;
          color: #9C9EB9;
        }
      }
      .dTitle{
        font-size: 0.426666rem;
        color: #2D3142;
        padding-top: 0.248888rem;
      }
    }
    .left{
      width: 2.133333rem;
      height: 2.133333rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      border-radius: 0.106666rem;
    }
  }
}
</style>
