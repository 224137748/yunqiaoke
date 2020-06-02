<template>
  <div class="searchBd" :class="border?'sBd':''" :style="'margin-top:' + statHeight + 'px'">
    <form action="javascript:;" ref="form">
      <div class="msearch" :class="!qxShow?'qx':''">
        <div class="minput">
          <img src="../../assets/img/mine/search.png" alt="">
          <input type="serch" :placeholder="placeholder" :disabled="disabled" :value="value" @input="searchGoods">
        </div>
        <div v-if="qxShow" >
          <!-- <div class="mbd" v-if="value===''" @click="restInput">取消</div> -->
          <div class="mbd" @click="fimInput">搜索</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// gokeyDown键盘搜索
// border是否显示底部线条,默认不显示
// qxShow是否显示取消按钮,默认显示
// qxTop是否显示顶部的距离，默认显示
export default {
  props: {
    border: {
      type: Boolean,
      default: false
    },
    qxShow: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "搜索动态、文章、话题、用户"
    },
    qxTop: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      statHeight: 0
    };
  },
  async mounted() {
    if (this.qxTop) {
      let height = await this.$bridge.call("getStatusBarHeight");
      this.statHeight = height.height;
    }
  },
  methods: {
    // 用户点击确认搜索事件
    fimInput() {
      this.$emit("fim");
    },
    // 用户输入事件
    searchGoods(event) {
      this.$emit("gokeyDown", event.target.value);
    },
    restInput() {
      this.$refs["form"].reset();
    }
  }
};
</script>

<style lang="less" scoped>
  .searchBd{
    width: 100%;
    padding: 0.266666rem 0;
    &.sBd{
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        height: 0.026666rem;
        width: 100%;
        background-color: #EDEDF7;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .msearch{
      width: 96%;
      margin-left: 4%;
      height: 0.888888rem;;
      display: flex;
      position: relative;
      &.qx{
        width: 92%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: auto;
        margin-right: auto;
      }
      .mbd{
        font-size: 0.373333rem;
        color: #000000;
        width: 1.422222rem;
        text-align: center;
        line-height: 0.888888rem;
      }
      .minput{
        flex: 1;
        line-height: 0.888888rem;;
        background-color: #F4F6FA;
        position: relative;
        border-radius: 0.106666rem;
        img{
          width: 0.435555rem;
          position: absolute;
          left: 0.266666rem;
          top: 50%;
          transform: translateY(-50%);
        }
        input{
          width: 100%;
          border: 0;
          background-color: #F4F6FA;
          font-size: 0.32rem;
          color: #2D3142;
          padding-left: 0.977777rem;
        }
        input::input-placeholder{
          color: #D6D9E0;
          font-size: 0.32rem;
        }
      }
    }
  }
</style>
