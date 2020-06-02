<template>
  <!-- 用户空间 -->
  <div class="space">
    <!-- <head-nav :title="'个人中心'" class="mheader"></head-nav> -->
    <div class="head" style="background-image: url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg);">
      <div class="userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
      <div class="userName">Michelle Jane</div>
    </div>
    <div class="bd">
      <div class="item">
        <span>32</span>
        <p>掌声</p>
      </div>
      <div class="item">
        <span>64</span>
        <p>认可</p>
      </div>
      <div class="item">
        <span>88</span>
        <p>粉丝</p>
      </div>
      <div class="item">
        <span>155</span>
        <p>关注</p>
      </div>
    </div>
    <div class="box">
      <div class="hc mt"><i></i>关注Ta的</div>
      <ul class="bus-imgList">
        <li class="img0"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img1"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img2"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img3"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img4"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img5"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <li class="img6"><img src="../../assets/img/infor/identity1_s.png" alt=""></li>
        <div class="bus-dian" :style="'left:' + (8*0.8-0.2) + 'rem'"><img src="../../assets/img/home/threeDian.png"
            alt=""></div>
      </ul>
      <div class="hc mt"><i></i>绝技</div>
      <div class="hd">
        <div class="item">dashboards</div>
        <div class="item">growth hacking</div>
        <div class="item">mobile</div>
        <div class="item">product design</div>
        <div class="item">UI</div>
      </div>
    </div>
    <tablist :tabList="tabList" :scroll="true" :border="true" :indexs="tabListIndex" @getIndex="onTab" class="tablist"></tablist>
    <div class="pox">
      <div class="your">他的资料</div>
      <div class="short">描述</div>
      <div class="des">自我评价是简历中必不可少的非常重要的一部分，虽然看起来很简单，但是很能体现出一个人的能力如何，所以对于求职应聘者来说也是需要额外重视的。要额外重视的。要额外重视的。要额外重视的。要额外重视的。要额外重视的。<p>阅读更多</p></div>
      <div class="photoTitle">Ta的相册</div>
      <div class="photo">
        <div class="item"><img src="http://t7.baidu.com/it/u=378254553,3884800361&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=04780103986d8b779a45789aa5a01f56" alt=""></div>
        <div class="item"><img src="http://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=1af8f4548a483d9b0d5f7f18f42b2bde" alt=""></div>
        <div class="item"><img src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290" alt=""></div>
        <div class="item"><img src="http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=555c0fa8f1519fe4fffa25415e9cad3d" alt=""></div>
      </div>
    </div>
    <div class="bottom">
      <img src="../../assets/img/mine/bottom.png" alt="">
      <span>关注<img src="../../assets/img/mine/jia2.png" alt=""></span>
    </div>
  </div>
</template>

<script>
// import headNav from "../../components/home/headNav.vue";
import tablist from "../../components/home/tablist.vue";
export default {
  components: {
    // headNav,
    tablist
  },
  data() {
    return {
      tabListIndex: 0,
      tabList: [
        { name: "资料", num: "" },
        { name: "服务", num: "" },
        { name: "派单", num: "" },
        { name: "转让", num: "" },
        { name: "投资", num: "" },
        { name: "融资", num: "" },
        { name: "公开课", num: "" },
        { name: "技能", num: "" }
      ]
    };
  },
  methods: {
    // 切换
    onTab(index) {
      console.log(index);
      this.tabListIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
  .space{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .bottom{
      width: 3.777777rem;
      margin: 0 auto;
      margin-top: 1.12rem;
      margin-bottom: 1.137777rem;
      text-align: center;
      position: relative;
      font-size: 0;
      span{
        font-size: 0.355555rem;
        color: #FFFFFF;
        font-weight: 500;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        line-height: 1;
        img{
          width: 0.337777rem;
          vertical-align: middle;
          margin-left: 0.106666rem;
        }
      }
      img{
        width: 100%;
      }
    }
    .pox{
      width: 92%;
      margin: 0 auto;
      .photo{
        column-count: 3;
        width: 100%;
        column-gap: 0.213333rem;
        .item{
          width: 100%;
          font-size: 0;
          margin-bottom: 0.213333rem;
          img{
            width: 100%;
          }
        }
      }
      .photoTitle{
        font-size: 0.355555rem;
        color: #000000;
        line-height: 1;
        padding-top: 0.711111rem;
        padding-bottom: 0.444444rem;
      }
      .des{
        font-size: 0.355555rem;
        color: #333333;
        line-height: 0.533333rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        position: relative;
        text-align: justify;
        p{
          font-size: 0.355555rem;
          color: #7265E3;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1),rgba(255,255,255,1));
          display: inline-block;
          padding-left: 1.777777rem;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
      .short{
        font-size: 0.355555rem;
        color: #999999;
        padding-bottom: 0.266666rem;
      }
      .your{
        line-height: 1;
        font-size: 0.533333rem;
        color: #333333;
        font-weight: bold;
        padding-top: 0.622222rem;
        padding-bottom: 0.533333rem;
      }
    }
    .box{
      width: 92%;
      margin: 0 auto;
      .hd{
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        display: flex;
        .item{
          font-size: 0.355555rem;
          color: #9C9EB9;
          height: 0.8rem;
          line-height: 0.8rem;
          border: 0.026666rem solid rgba(234,234,234,1);
          padding: 0 0.444444rem;
          margin-right: 0.151111rem;
          margin-bottom: 0.213333rem;
          box-sizing: content-box;
        }
      }
      .bus-imgList {
        display: flex;
        position: relative;
        height: 1.093333rem;
        margin-top: 0.586666rem;
        margin-bottom: 0.417777rem;
        .img0 {
          left: 0;
          z-index: 10;
        }
        .img1 {
          left: 0.8rem;
          z-index: 9;
        }
        .img2 {
          left: 1.6rem;
          z-index: 8;
        }
        .img3 {
          left: 2.4rem;
          z-index: 7;
        }
        .img4 {
          left: 3.2rem;
          z-index: 6;
        }
        .img5 {
          left: 4rem;
          z-index: 5;
        }
        .img6 {
          left: 4.8rem;
          z-index: 4;
        }
        li {
          width: 1.093333rem;
          height: 1.093333rem;
          background-color: #FFFFFF;
          border: 1px solid #FFFFFF;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: 0;
          img {
            width: 1.066666rem;
            height: 1.066666rem;
          }
        }
        .bus-dian {
          width: 0.293333rem;
          height: 0.071111rem;
          position: absolute;
          top: 0.266666rem;
          z-index: 50;
          img {
            width: 0.293333rem;
            height: 0.071111rem;
          }
        }
      }
      .hc{
        font-size: 0.444444rem;
        color: #2D3142;
        line-height: 1;
        &.mt{
          margin-top: 0.8rem;
        }
        i{
          display: inline-block;
          width: 0.062222rem;
          height: 0.408888rem;
          background-color: #7265E3;
          border-radius: 0.026666rem;
          margin-right: 0.266666rem;
        }
      }
    }
    .bd{
      display: flex;
      padding-top: 2.168888rem;
      .item{
        flex: 1;
        line-height: 1;
        text-align: center;
        span{
          font-size: 0.284444rem;
          color: #2D3142;
          display: block;
        }
        p{
          font-size: 0.417777rem;
          color: #2D3142;
          padding-top: 0.186666rem;
        }
      }
    }
    .mheader{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .head{
      width: 100%;
      height: 4.622222rem;
      // overflow: hidden;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      position: relative;
      .userName{
        font-size: 0.533333rem;
        color: #2D3142;
        position: absolute;
        bottom:  -1.7rem;
        left: 0;
        text-align: center;
        width: 100%;
        line-height: 1;
      }
      .userImg{
        width: 1.893333rem;
        height: 1.893333rem;
        border-radius: 50%;
        border: 0.026666rem solid #FFFFFF;
        overflow: hidden;
        position: absolute;
        bottom: -0.942222rem;
        left: 50%;
        transform: translateX(-50%);
        img{
          width: 100%;
        }
      }
    }
  }
</style>
