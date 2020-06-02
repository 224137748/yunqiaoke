<template>
  <div>
    <div class="effect-tab" :class="border?'bgBd':''">
      <div class="effect-scroll" :style="'width:'+tabWidth+'px'" v-if="!scroll">
        <div class="itemClass" v-for="(item,i) in tabList" :key="i" :class="i===indexs?itemClassFrist+' active':itemClassFrist" @click="onClick(i)">{{item.name}} <span v-if="item.num">({{item.num}})</span></div>
        <div class="clearfix"></div>
      </div>
      <div class="effect-scroll exflex" :style="'height:'+heightActive+'rem;line-height:'+heightActive+'rem'" v-else>
        <div class="effect-tItem" :style="'width:' + (100/tabList.length) + '%'" v-for="(item,i) in tabList" :key="i" :class="i===indexs?'active':''" @click="onClick(i)">
          <div class="hover">{{item.name}} <span v-if="item.num">({{item.num}})</span></div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
// tabList数据
// scroll是否可以滚动,默认滚动
// border是否有下划线,默认没有
// indexs设置默认下标,必填
export default {
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    scroll: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    indexs: {
      type: Number,
      default: 0
    },
    heightActive: {
      type: Number,
      default: 1.422222
    },
    itemClassFrist: {
      type: String,
      default: "effect-tabItem"
    }
  },
  data() {
    return {
      tabWidth: ""
    };
  },
  mounted() {
    // 给tabitem设置宽度
    var that = this;
    var item = document.getElementsByClassName(that.itemClassFrist);
    var w = 0;
    for (var i = 0; i < item.length; i++) {
      var oDivMargin = that.getStyle(item[i], "marginRight").slice(0, -2);
      w += (item[i].offsetWidth + Math.ceil(Number(oDivMargin)));
    }
    this.tabWidth = w;
    // end
  },
  methods: {
    onClick(i) {
      this.$emit("getIndex", i);
    },
    // 获取margin属性的方法
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    }
  }
};
</script>

<style lang="less">
  .effect-tab {
    width: 100%;
    overflow-x: scroll;
    &.bgBd{
      position: relative;
      &::after{
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
    .exflex{
      display: flex;
    }
    .effect-scroll::-webkit-scrollbar {
      display: none;
    }
    .effect-scroll {
      .effect-tItem{
        font-size: 0.373333rem;
        font-weight: bold;
        color: #9C9EB9;
        text-align: center;
      }
      .effect-tItem.active {
        .hover{
          display: inline-block;
          color: #2D3142;
          position: relative;
          &::after{
            content: "";
            display: inline-block;
            width: 100%;
            height: 0.044444rem;
            background-color: #7265E3;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
      .effect-tabItem.active {
        border-bottom: 0.044444rem solid #7265E3;
        color: #2D3142;
      }
      .itemClass{
        float: left;
        margin-right: 0.711111rem;
        font-size: 0.373333rem;
        font-weight: bold;
        color: #9C9EB9;
        &.active {
          border-bottom: 0.044444rem solid #7265E3;
          color: #2D3142;
        }
      }
      .effect-tabItem {
        padding-top: 0.533333rem;
        padding-bottom: 0.444444rem;
      }
      .clearfix {
        clear: both;
      }
    }
  }
</style>
