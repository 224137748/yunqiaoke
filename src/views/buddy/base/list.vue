<template>
  <div class="list">
    <head-nav :title="'全部分类'" :navShow="false" :titleColor="'#000000'">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../../assets/img/home/leftHeadback.png" alt=""></div>
    </head-nav>
    <div class="box">
      <div class="left">
        <div class="item" :class="tapIndex===item.id?'active':''" @click="tap(item.id)" v-for="(item,i) in tabList" :key="i">{{item.title}}</div>
      </div>
      <div class="right">
        <div class="say" v-if="list.length">
          <div class="item" v-for="(item,i) in list" :key="i" :data-id="item.id" @click="roter(tapIndex, item.id)"><span>{{item.name}}</span></div>
        </div>
        <div v-else>暂无分类</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
import headNav from "../../../components/home/headNav.vue";
import { getCategory } from "../../../api/buddy.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      tapIndex: 1,
      tabList: [
        { title: "服务", id: 1 },
        { title: "技能", id: 2 },
        { title: "投资", id: 3 },
        { title: "融资", id: 4 },
        { title: "派单", id: 5 },
        { title: "转让", id: 6 },
        { title: "代表作", id: 7 }
      ],
      list: 1
    };
  },
  computed: {
    // ...mapState(["token"])
  },
  mounted() {
    this.getList(this.tapIndex);
  },
  methods: {
    roter(index, id) {
      this.$bridge.call("router", {
        url: "http://yunqiaoke_h5.sinmore.vip/#/mList?id=" + id + "&tapIndex=" + index,
        hideNav: 1,
        immersionStatusBar: 1
      });
      // this.$router.push("/mList?id=" + id + "&tapIndex=" + index);
    },
    goback() {
      this.$bridge.call("back");
    },
    async getList(id) {
      // !this.token && (await this.getToken());
      var params = {
        type: id
      };
      var res = await getCategory(params);
      try {
        if (res.error_code === 0) {
          var v = [];
          if (res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              for (var k = 0; k < res.data[i].get_child.length; k++) {
                if (res.data[i].get_child.length) {
                  v.push(res.data[i].get_child[k]);
                }
              }
            }
            this.list = v;
          } else {
            this.list = [];
          }
        } else {
          console.log(res.error_code);
        }
      } catch (err) {
        console.log(err);
      }
    },
    tap(id) {
      this.tapIndex = id;
      this.getList(id);
    }
    // ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .list{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #FFFFFF;
    overflow-y: auto;
    .headLeft{
      width: 0.533333rem;
      height: 0.533333rem;
      position: absolute;
      left: 4%;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 100%;
        display: block;
      }
    }
    .box{
      display: flex;
      height: 100%;
      .right{
        flex: 1;
        height: 100%;
        background-color: #F8F5FD;
        padding-left: 0.355555rem;
        padding-right: 0.4rem;
        .say{
          flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          display: flex;
          .item{
            width: 50%;
            text-align: center;
            padding-right: 0.177777rem;
            margin-bottom: 0.4rem;
            span{
              height: 1.066666rem;
              line-height: 1.066666rem;
              display: block;
              background-color: #FFFFFF;
              border-radius: 1.066666rem;
              font-size: 0.355555rem;
              color: #2D3142;
            }
            &:nth-of-type(1), &:nth-of-type(2){
              margin-top: 0.4rem;
            }
            &:nth-of-type(2n){
              padding-left: 0.177777rem;
              padding-right: 0;
            }
          }
        }
      }
      .left{
        width: 2.488888rem;
        height: 100%;
        background-color: #FFFFFF;
        .item{
          width: 100%;
          height: 1.466666rem;
          line-height: 1.466666rem;
          padding-left: 0.408888rem;
          background-color: #FFFFFF;
          color: #2D3142;
          font-size: 0.355555rem;
          &.active{
            background-color: #C7C1F4;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>
