<template>
  <div class="pd45">
    <div class="pt_search">
      <div class="fl"><input type="text" placeholder="搜索动态、文章、话题、用户"></div>
      <button class="fr">取消</button>
    </div>
    <div class="bar">
      <h2>搜索历史<a href="javascript:;">清空</a></h2>
      <div>
        <p>21324</p><p>fssfs</p><p>hhh</p>
      </div>
      <h2>热门话题<a href="javascript:;">全部</a></h2>
      <div>
        <p>21324</p><p>fssfs</p><p>hhh</p>
      </div>
      <h2>推荐</h2>
      <div class="cards">
        <div class="card">
          <div class="m">
            <img src="../../assets/img/partner/banner.jpg">
            <p>电商运营</p>
            <div class="b">
              <span>12.3km</span>
              <p>互动可赚<span>￥15</span></p>
            </div>
          </div>
          <h3>创业走过的那些坑！</h3>
          <div class="t"><img src="../../assets/img/partner/banner.jpg"><span>Tina</span><p>232</p></div>
        </div>
        <div class="card">
          <div class="m">
            <img src="../../assets/img/partner/banner.jpg">
            <p>电商运营</p>
            <div class="b">
              <span>12.3km</span>
              <p>互动可赚<span>￥15</span></p>
            </div>
          </div>
          <h3>创业走过的那些坑！</h3>
          <div class="t"><img src="../../assets/img/partner/banner.jpg"><span>Tina</span><p>232</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../../assets/css/base.css"></style>
<style scoped>
.pt_search { overflow: hidden; }
.pt_search button { line-height: .9067rem; color: #2D3142; height: .9067rem; border: none; outline: none; background: no-repeat; padding-left: .3rem;}
.pt_search div { height: .96rem; line-height: .96rem; background: url(../../assets/img/partner/search.png) .3rem center no-repeat #F4F6FA; background-size: .48rem; padding-left: 1rem; border-radius: .12rem; overflow: hidden; width: 8rem; }
.pt_search div input { height: 100%; width: 100%; background: transparent;}
.bar h2 { margin-top: .7289rem; font-size: .43rem; color: #000; font-weight: 500; display: flex; margin-bottom: .3566rem;}
.bar a { color: #7265E3; font-size: .32rem; margin-left: auto; }
.bar > div > p { height: .7467rem; line-height: .7467rem; color: #000; font-weight:400; font-size: .32rem; background-color: #F6F6FB; border-radius: .3733rem; text-align: center; display: inline-block; margin-right: .2667rem; padding: 0 .3289rem; }
.cards {}
.cards .card:nth-of-type(odd) { margin-right: .1867rem; }
.card { width: 4.49775rem; float: left;}
.card .m { overflow: hidden; height: 4.5333rem; position: relative; background-color: #DEDEDE; border-radius: .11rem; }
.card .m > p { width: 1.8133rem; height: .5333rem; background-color: #FFA82B; font-size: .32rem; text-align: center; line-height: .5333rem; color: #fff; border-radius: 0 .2666rem .2666rem 0; top: .4rem; position: absolute; }
.card .b { position: absolute; height: .8rem; padding-top: .26667rem; background: linear-gradient(to bottom,rgba(0,0,0,0),#000); bottom: 0; display: flex; line-height: .5333rem; font-size: .27rem; width: 100%; color: #fff;}
.card .b p { width: 2.2489rem; height: .5333rem; line-height: .5333rem; background:url(../../assets/img/partner/icon4.png) 1.7422rem center no-repeat rgba(97,85,204,1); background-size: .3289rem .2844rem; margin-left: auto; border-radius: .2666rem 0 0 .2666rem; font-size: .21rem; padding-left: .2044rem;}
.card .b p span { font-size: .32rem; }
.card h3 { color: #2D3142;font-size: .37rem;font-weight:600; margin-top: .3289rem; line-height: 1; }
.card .t { margin-top: .22rem; font-size: .37rem; display: flex; line-height: .7467rem; color: #9C9EB9; }
.card .t img { background-color: #ccc; width: .7467rem; height: .7467rem; border-radius: 50%; vertical-align: middle; margin-right: .16rem;}
.card .t p { margin-left: auto; background:url(../../assets/img/partner/pa.png) 0 center no-repeat; background-size: .3733rem .3467rem; padding-left: .4711rem; font-size: .32rem; }
</style>
