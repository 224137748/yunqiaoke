<template>
  <div class="pt_page">
    <div class="pt_head text-center pd45">
      <a href="javascript:;" class="fl">&nbsp;</a>
      <img src="" class="fr">
      <h3>伙伴</h3>
    </div>
    <div class="pt_top">
      <div class="pt_fix_left"><span>北京</span></div>
      <div class="pt_fix_right" @touchend="goto">全部分类</div>
      <div class="pt_nav">
        <ul>
          <li class="active">服务</li>
          <li>派单</li>
          <li>转让</li>
          <li>投资</li>
          <li>融资</li>
          <li>公开课</li>
          <li>技能</li>
        </ul>
      </div>
    </div>
    <div class="pt_search">
      <div><input type="text" placeholder="Search" disabled @touchend="$router.push('/partner_search')"></div>
    </div>
    <div class="pt_swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../../assets/img/partner/banner.jpg"></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/img/partner/banner.jpg"></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/img/partner/banner.jpg"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="pt_service">
      <div class="fl">
        <p>赞推(23)</p>
        <p>鼓掌(236)</p>
        <p>打榜(12)</p>
      </div>
      <div class="fr" @click="detail">
        <div class="pt_img">
          <img src="../../assets/img/partner/banner.jpg" height="100%">
          <p>个人服务</p>
          <p><span>互动可赚</span><span>￥15</span></p>
        </div>
        <h3>你知道电脑应该怎么用来合理吗？</h3>
        <h4><b>玩具摄影</b><span>￥1500.00</span></h4>
        <div class="pt_info">
          <img src="../../assets/img/partner/banner.jpg" class="fl">
          <div class="fl">
            <h5>Kate Sky<span>距离您 5km</span></h5>
            <h5>7 days ago</h5>
          </div>
          <div class="fr">关注</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="line"></div>
    <div class="pt_service">
      <div class="fl">
        <p>赞推(23)</p>
        <p>鼓掌(236)</p>
        <p>打榜(12)</p>
      </div>
      <div class="fr">
        <div class="pt_img" @click="detail(v.id)">
          <img src="../../assets/img/partner/banner.jpg" height="100%">
          <p>个人服务</p>
          <p><span>互动可赚</span><span>￥15</span></p>
        </div>
        <h3>你知道电脑应该怎么用来合理吗？</h3>
        <h4><b>玩具摄影</b><span>￥1500.00</span></h4>
        <div class="pt_info">
          <img src="../../assets/img/partner/banner.jpg" class="fl">
          <div class="fl">
            <h5>Kate Sky<span>距离您 5km</span></h5>
            <h5>7 days ago</h5>
          </div>
          <div class="fr">关注</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="pt_tui">
      <h2>推荐伙伴<a href="javascript:;">查看更多</a></h2>
      <div class="pt_over">
        <div>
          <ul class="pt_list">
            <li>
              <div>
                <div>
                  <img src="../../assets/img/partner/banner.jpg">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
            <li>
              <div>
                <div>
                  <img src="../../assets/img/partner/banner.jpg">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
            <li>
              <div>
                <div>
                  <img src="">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pt_da">
      <h2>马上成为技能达人</h2>
      <div>
        <div>发布一堂公开课</div>
        <div>炫一炫你的绝技</div>
      </div>
    </div>
    <div class="pt_tui">
      <h2>推荐话题<a href="javascript:;">查看更多</a></h2>
      <div class="pt_over">
        <div>
          <ul class="pt_list">
            <li>
              <div>
                <div>
                  <img src="../../assets/img/partner/banner.jpg">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
            <li>
              <div>
                <div>
                  <img src="../../assets/img/partner/banner.jpg">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
            <li>
              <div>
                <div>
                  <img src="../../assets/img/partner/banner.jpg">
                  <h4>段鹏达的达</h4>
                  <p>为你推荐</p>
                </div>
                <div class="pt_work"><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;"></a></div>
              </div>
              <a href="javascript:;" class="pt_g">关注</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goto () {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner_cate",
        hideNav: 1
      });
    },
    detail (id) {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/partner_detail?service_id=" + id,
        hideNav: 1
      });
    }
  }
};
</script>
<style lang="less" scoped>
.pt_page {
  .clearfix {
    height:3rem
  }
  .fl {
    float: left
  }
  .fr {
    float: right
  }
  .text-center {
    text-align: center
  }
  .pd45 {
    padding: .45rem
  }
  .pt_head {
    line-height: 1.08rem;
    a {
      width: .6222rem;
      height: .6222rem;
      background: url(../../assets/img/partner/ld.png) 0 center no-repeat;
      background-size: cover;
      margin-top: .19rem;
    }
    h3 {
      font-size: .46rem
    }
  }
  .pt_top {
    line-height: .96rem;
    font-size: .37rem;
    position: relative;
    border-bottom: .03rem solid #EDEDF7;
    height: 0.96rem;
    overflow: hidden;
  }
  .pt_fix_left {
    position: absolute;
    left: 0;
    padding-left: .45rem;
    width: 2rem;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 3;
    top: 0;
    span{
      position:relative;
      &:after {
        content:'';
        position:absolute;
        border:.14rem solid transparent;
        border-top-color:#1E1E1F;
        right:-.4rem;
        top:.2rem;
      }
    }
  }
  .pt_fix_right {
    position: absolute;
    width: 2.4rem;
    background: #fff;
    color: #7265E3;
    text-align: center;
    right: 0;
    top: 0;
    background: #fff;
  }
  .pt_nav {
    width: 100%;
    padding: 0 2rem 0 2rem;
    box-sizing: border-box;
    overflow-y: auto;
    background: #fff;
    ul {
      overflow: auto;
      width: 10rem;
      height: 1.2rem;
      li {
        float: left;
        margin-right: .3rem;
        color:#9C9EB9;
        &.active {
          color:#131314;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            width:100%;
            height:.04rem;
            border-radius:.02rem;
            background-color:#7265E3;
            left:0;
            bottom:.02rem;
          }
        }
      }
    }
  }
  .pt_search {
    padding: .3rem .45rem .2rem;
    div {
      height: .9067rem;
      line-height: .9067rem;
      background: url(../../assets/img/partner/search.png) .3rem center no-repeat #F4F6FA;
      background-size: .48rem;
      padding-left: 1rem;
      border-radius: .12rem;
      overflow: hidden;
      input {
        height: 100%;
        width: 100%;
        background: transparent;
      }
    }
  }
  .pt_swipe {
    height: 2.20rem;
    margin: 0 .45rem .2rem .45rem;
    background: rgba(218,214,255,1);
    border-radius: .12rem;
    img {
      width:100%;
      height:2.2rem;
    }
  }
  .mint-swipe-indicator{
    background:#fff;
  }
  .mint-swipe-indicator.is-active {
    background:#7265E3;
  }
  .line {
    margin: 0 .45rem;
    border-bottom: .03rem solid #EDEDF7;
  }
  .pt_service {
    margin: 0 .45rem .2rem;
    padding-bottom: .6rem;
    overflow: hidden;
    margin-top: .6rem;
    .fl {
      width: 1.5rem;
      text-align: center;
      p {
        font-size: .3rem;
        padding-top: 1.33rem;
        background: url(../../assets/img/partner/icon1.png) center 0 no-repeat;
        color: #9C9EB9;
        background-size: cover;
        margin-bottom: .28rem;
      }
      p:nth-of-type(2) {
        background-image: url(../../assets/img/partner/icon2.png)
      }
      p:nth-of-type(3) {
        background-image: url(../../assets/img/partner/icon3.png)
      }
    }
    .fr {
       width: 7.4rem;
      .pt_img {
        height: 6rem;
        background: #dad6ff;
        position: relative;
        p:nth-of-type(1) {
          width:2.28rem;
          height:.66rem;
          background:rgba(255,168,43,1);
          border-radius:0px .33rem .33rem 0px;
          line-height:.66rem;
          color:#fff;
          text-align:center;
          font-size:.37rem;
          position:absolute;
          left:0;
          top:.3rem;
        }
        p:nth-of-type(2) {
          width:2.54rem;
          height:.6rem;
          background:url(../../assets/img/partner/icon4.png) 1.9rem center no-repeat #8963e9;
          color:#fff;
          background-size:.48rem;
          line-height:.6rem;
          border-radius:.3rem 0 0 .3rem;
          position:absolute;
          right:0;
          bottom:0;
          padding-left: .2rem;
          span:nth-of-type(1) {
            vertical-align:top;
            font-size:.21rem;
          }
          span:nth-of-type(2) {
            font-size:.32rem;
          }
        }
      }
      h3 {
        font-size: .42rem;
        margin: .37rem 0;
      }
      h4 {
        height: .84rem;
        color:#7265E3;
        font-size:.36rem;
        background-size:.48rem;
        line-height:.84rem;
        display:flex;
        b {
          width:2.58rem;
          height:.84rem;
          float:left;
          padding-left:.84rem;
          background: url(../../assets/img/partner/icon5.png) .3rem center no-repeat rgba(114,101,227,.05);
          font-weight:500;
          background-size: .4rem;
          border-radius:.42rem;
        }
        span {
          color:#F77777;
          font-size:.53rem;
          font-weight:600;
          margin-left:auto;
        }
      }
      .pt_info {
        margin-top: .4rem;
        overflow: hidden;
        img {
          width: .9rem;
          height: .9rem;
          border-radius: 50%;
          background-color:#dad6ff;
        }
        div {
          width: 50%;
          text-align: left;
          margin-left:.26rem;
          h5:nth-of-type(1) {
            background-image: none;
            font-size:.36rem;
            color:#2D3142;
            font-weight:normal;
            span {
              font-size:.3rem;
              color:#7265E3;
              margin-left:.2rem;
            }
          }
          h5:nth-of-type(2) {
            font-size:.3rem;
            color:#9C9EB9;
            font-weight:normal;
          }
        }
        .fr {
          width: 1.84rem;
          height: .8rem;
          border: .03rem solid #7265E3;
          color:#7265E3;
          border-radius:.4rem;
          text-align: center;
          font-size:.36rem;
          line-height: .8rem;
          background: url(../../assets/img/partner/plus.png) 1.3rem center no-repeat;
          background-size: .22rem;
          padding-right:.22rem;
        }
      }
    }
  }
  .pt_tui {
    background-color:#F4F6FA;
    padding: 0.68rem 0 .3rem;
    h2 {
      margin-bottom:.3rem;
      font-size:.42rem;
      color:#2D3142;
      display:flex;
      padding: 0 .45rem;
      height: .6rem;
      a{
        font-size:.32rem;
        color:#7265E3;
        margin-left:auto;
        line-height:.6rem;
      }
    }
    .pt_over {
      height:6.4rem;
      overflow:hidden;
      >div {
        width: 100%;
        height:6.6rem;
        overflow-y:hidden;
        overflow-x:auto;
        padding:0 .45rem;
        .pt_list {
          width: 14.8rem;
          height:6.6rem;
          overflow-y:hidden;
          li {
            width:4.8rem;
            height:6.6rem;
            background:#fff;
            float:left;
            margin-right:.2rem;
            >div {
              width:4.8rem;
              height:5.2rem;
              >div:nth-of-type(1){
                background:url(../../assets/img/partner/banner.jpg);
                border-radius:.12rem .12rem 0 0;
                color:#fff;
                text-align:center;
                margin-bottom:.15rem;
                height: 3.6rem;
                img {
                  width: 1.24rem;
                  height: 1.24rem;
                  border-radius:50%;
                  margin-top:.67rem;
                  margin-bottom:.3rem;
                  border-radius:50%;
                  background-color:#8963e9;
                }
                h4 {
                  font-size:.36rem;
                  font-weight:normal;
                  margin-bottom:.1rem;
                }
                p {
                  font-size:.3rem;
                }
              }
            }
            .pt_g {
              width:2.74rem;
              border:.03rem solid #7265E3;
              color:#7265E3;
              text-align:center;
              line-height:.68rem;
              border-radius:.34rem;
              display:block;
              font-size: .36rem;
              margin:.22rem auto;
            }
          }
          li:nth-last-of-type(1) {
            margin-right:0
          }
        }
      }
    }
    .pt_work {
      overflow:hidden;
      a {
        float:left;
        width:1.38rem;
        height:1.38rem;
        background:url(../../assets/img/partner/banner.jpg);
        margin-left:.165rem;
      }
    }
  }
  .pt_da {
    padding: .6rem .45rem;
    h2 {
      margin-bottom: 0.3rem;
      font-size: 0.43rem;
      color: #2D3142;
    }
    >div{
      margin-left:-2.5%;
      color:#fff;
      overflow:hidden;
      >div{
        float:left;
        width:47.5%;
        background:url(../../assets/img/partner/bgp1.png) center no-repeat;
        background-size: cover;
        border-radius: .2rem;
        overflow: hidden;
        margin-left:2.5%;
        height:2.7rem;
        text-align:center;
        font-size:.32rem;
        padding-top:2rem;
      }
      >div:nth-of-type(2) {
        background-image:url(../../assets/img/partner/bgp2.png);
      }
    }
  }
}
</style>
