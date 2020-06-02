<template>
  <!-- 搜索 -->
  <div class="search">
    <m-search v-model="text" :qxTop="false" @gokeyDown="keyDwon" @fim="keyFim" :border="true" class="headSearch"></m-search>
    <div class="search-box">
      <div class="search-hd">
        <div class="search-hLeft">搜索历史</div>
        <div class="search-dRight" @click="historyResat">清空</div>
      </div>
      <div class="search-bd">
        <div class="search-item" v-for="(item,i) in historySearch" :key="i" @click="hisSeach(item)">{{item}}</div>
      </div>
      <div class="search-hd search-mt1">
        <div class="search-hLeft">热门话题</div>
        <div class="search-dRight">全部</div>
      </div>
      <div class="search-bd">
        <div class="search-item" v-for="(item,i) in topic" :key="i">{{item.name}}</div>
      </div>
      <div class="search-hd search-mt2">
        <div class="search-hLeft">推荐</div>
      </div>
      <div class="search-pd">
        <div class="search-item">
          <div class="search-img">
            <span>电商运营</span>
            <img src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290" alt="">
            <div class="search-imgbg"></div>
            <div class="search-dw">
              <img src="../../assets/img/mine/dingwei.png" alt="">
              12.6km
            </div>
            <div class="search-rg">互助可赚￥15</div>
          </div>
          <div class="search-title">创业走过的那些坑！</div>
          <div class="search-user">
            <div class="search-userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
            <div class="search-userName">Tina</div>
            <div class="search-rd"><img src="../../assets/img/mine/hu.png" alt="">2121</div>
          </div>
        </div>
        <div class="search-item">
          <div class="search-img">
            <span>电商运营</span>
            <img src="http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=555c0fa8f1519fe4fffa25415e9cad3d" alt="">
            <div class="search-imgbg"></div>
            <div class="search-dw">
              <img src="../../assets/img/mine/dingwei.png" alt="">
              12.6km
            </div>
            <div class="search-rg">互助可赚￥15</div>
          </div>
          <div class="search-title">创业走过的那些坑！</div>
          <div class="search-user">
            <div class="search-userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
            <div class="search-userName">Tina</div>
            <div class="search-rd"><img src="../../assets/img/mine/hu.png" alt="">2121</div>
          </div>
        </div>
        <div class="search-item">
          <div class="search-img">
            <span>电商运营</span>
            <img src="http://t7.baidu.com/it/u=378254553,3884800361&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=04780103986d8b779a45789aa5a01f56" alt="">
            <div class="search-imgbg"></div>
            <div class="search-dw">
              <img src="../../assets/img/mine/dingwei.png" alt="">
              12.6km
            </div>
            <div class="search-rg">互助可赚￥15</div>
          </div>
          <div class="search-title">创业走过的那些坑！</div>
          <div class="search-user">
            <div class="search-userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
            <div class="search-userName">Tina</div>
            <div class="search-rd"><img src="../../assets/img/mine/hu.png" alt="">2121</div>
          </div>
        </div>
        <div class="search-item">
          <div class="search-img">
            <span>电商运营</span>
            <img src="http://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581143753&t=1af8f4548a483d9b0d5f7f18f42b2bde" alt="">
            <div class="search-imgbg"></div>
            <div class="search-dw">
              <img src="../../assets/img/mine/dingwei.png" alt="">
              12.6km
            </div>
            <div class="search-rg">互助可赚￥15</div>
          </div>
          <div class="search-title">创业走过的那些坑！</div>
          <div class="search-user">
            <div class="search-userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
            <div class="search-userName">Tina</div>
            <div class="search-rd"><img src="../../assets/img/mine/hu.png" alt="">2121</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mSearch from "../../components/home/mSearch.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { getTopicList } from "../../api/buddy.js";
export default {
  components: {
    mSearch
  },
  data() {
    return {
      text: "",
      history: "", // 搜索历史
      topic: [] // 热门话题
    };
  },
  async mounted() {
    // var historySearch = this.$store.state.buddy.buddySearch;
    // this.history = historySearch;
    this.getAuto();
    this.getHotType();
  },
  computed: {
    ...mapState(["token"]),
    ...mapState({
      historySearch: state => state.buddy.buddySearch
    })
  },
  methods: {
    async getAuto() {
      !this.token && (await this.getToken());
    },
    // 点击历史搜索
    hisSeach(item) {
      this.$router.push({
        name: "searchResult",
        params: {
          keyworder: item
        }
      });
    },
    // 热门话题
    async getHotType() {
      var params = {
        site: 2,
        page: 1,
        per_page: 10
      };
      var res = await getTopicList(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.topic = data.data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 清空历史搜索记录
    historyResat() {
      this.$MessageBox({
        title: "提示",
        message: "确定清除历史记录?",
        showCancelButton: true
      }).then(res => {
        if (res === "confirm") {
          this.setSearchStatus("0");
        } else {
          return false;
        }
      });
    },
    // 用户搜索确认事件并保存搜索历史
    keyFim() {
      if (this.text === "") {
        return this.$Toast({
          message: "请输入关键词",
          duration: 1500
        });
      }
      this.$router.push({
        name: "searchResult",
        params: {
          keyworder: this.text
        }
      });
      this.setSearchStatus(this.text);
    },
    // 用户输入事件
    keyDwon(e) {
      this.text = e;
    },
    ...mapActions(["getToken"]),
    ...mapMutations("buddy", ["setSearchStatus"])
  }
};
</script>

<style lang="less" scoped>
  .search{
    .search-box{
      width: 92%;
      margin: 0 auto;
      .search-pd{
        column-count: 2;
        width: 100%;
        column-gap: 0.177777rem;
        .search-item{
          width: 100%;
          padding-bottom: 0.32rem;
          .search-user{
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            .search-rd{
              width: 30%;
              text-align: right;
              img{
                width: 0.373333rem;
                vertical-align: middle;
                margin-right: 0.088888rem;
              }
            }
            .search-userName{
              font-size: 0.373333rem;
              color: #9C9EB9;
              flex: 1;
              padding-left: 0.177777rem;
            }
            .search-userImg{
              width: 0.746666rem;
              height: 0.746666rem;
              border-radius: 50%;
              overflow: hidden;
            }
            img{
              width: 100%;
            }
          }
          .search-title{
            font-size: 0.373333rem;
            font-weight: 600;
            color: #2D3142;
            line-height: 1;
            padding-top: 0.328888rem;
            padding-bottom: 0.222222rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .search-img > img{
            width: 100%;
            height: auto;
            position: relative;
            z-index: 1;
          }
          .search-img{
            background-color: #DEDEDE;
            width: 100%;
            font-size: 0;
            border-radius: 0.106666rem;
            overflow: hidden;
            position: relative;
            .search-rg{
              font-size: 0.231111rem;
              color: #FFFFFF;
              width: 40%;
              height: 0.533333rem;
              line-height: 0.533333rem;
              background: linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
              border-radius: 0.266666rem 0 0 0.266666rem;
              position: absolute;
              bottom: 0;
              right: 0;
              z-index: 2;
              text-align: center;
            }
            .search-dw{
              font-size: 0.32rem;
              color: #FFFFFF;
              position: absolute;
              left: 0.177777rem;
              bottom: 0.177777rem;
              z-index: 2;
              img{
                width: 0.231111rem;
                vertical-align: middle;
              }
            }
            .search-imgbg{
              height: 0.8rem;
              background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
              opacity: 0.5;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              z-index: 2;
            }
            span{
              width: 1.813333rem;
              height: 0.533333rem;
              line-height: 0.533333rem;
              background-color: #FFA82B;
              font-size: 0.32rem;
              color: #FFFFFF;
              text-align: center;
              border-radius:0 0.266666rem 0.266666rem 0;
              position: absolute;
              left: 0;
              top: 0.4rem;
              z-index: 2;
            }
          }
        }
      }
      .search-bd{
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        display: flex;
        width: 100%;
        .search-item{
          font-size: 0.32rem;
          color: #000000;
          height: 0.746666rem;
          line-height: 0.746666rem;
          padding: 0 0.337777rem;
          border-radius: 0.373333rem;
          background-color: #F6F6FB;
          margin-right: 0.604444rem;
          margin-top: 0.266666rem;
        }
      }
      .search-hd{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 0.088888rem;
        &.search-mt1{
          margin-top: 0.871111rem;
        }
        &.search-mt2{
          margin-top: 0.871111rem;
          padding-bottom: 0.355555rem;
        }
        .search-dRight{
          font-size: 0.32rem;
          color: #7265E3;
        }
        .search-hLeft{
          font-size: 0.426666rem;
          color: #000000;
          font-weight: 500;
        }
      }
    }
    .headSearch{
      margin-bottom: 0.444444rem;
    }
  }
</style>
