<template>
  <!-- 提现记录 -->
  <div class="wRecord">
    <div class="wRecord-head">
      <div class="wRecord-headItem">
        <span class="wRecord-headColor orgin"></span>
        <div class="wRecord-headName">提现中</div>
        <div class="wRecord-headPrice">￥96.3</div>
      </div>
      <div class="wRecord-headItem">
        <span class="wRecord-headColor spe"></span>
        <div class="wRecord-headName">已提现</div>
        <div class="wRecord-headPrice">￥96.3</div>
      </div>
    </div>
    <div class="wRecord-bd"></div>
    <div class="eMutual-info">
      <div class="eMutual-bd">收支明细</div>
      <div class="eMutual-hb" @click="popupVisible = true">筛选日期<img src="../../../assets/img/home/down.png" alt=""></div>
      <div class="clear"></div>
    </div>
    <div class="eMutual-int">
      <div class="eMutual-month"><i></i>10月份</div>
      <div class="eMutual-flex">
        <div class="eMutual-left">
          <div class="eMutual-tm">已完成</div>
          <div class="eMutual-time">2018-05-04 12:28:17</div>
        </div>
        <div class="eMutual-right">￥1000</div>
      </div>
      <div class="eMutual-flex">
        <div class="eMutual-left">
          <div class="eMutual-tm">已拒绝</div>
          <div class="eMutual-time">2018-05-04 12:28:17</div>
          <div class="eMutual-show">拒绝原因：收款信息错误，请重新完善后再次提交</div>
        </div>
        <div class="eMutual-right">￥1000</div>
      </div>
    </div>
    <div class="eMutual-int">
      <div class="eMutual-month"><i></i>11月份</div>
      <div class="eMutual-flex">
        <div class="eMutual-left">
          <div class="eMutual-tm">已完成</div>
          <div class="eMutual-time">2018-05-04 12:28:17</div>
        </div>
        <div class="eMutual-right">￥1000</div>
      </div>
      <div class="eMutual-flex">
        <div class="eMutual-left">
          <div class="eMutual-tm">已拒绝</div>
          <div class="eMutual-time">2018-05-04 12:28:17</div>
          <!-- <div class="eMutual-show">拒绝原因：收款信息错误，请重新完善后再次提交</div> -->
        </div>
        <div class="eMutual-right">￥1000</div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <div class="eMutual-pop">
        <div class="eMutual-tap" @click="MutualHide">取消</div>
        <div class="eMutual-tap" @click="MutualTrue">确认</div>
      </div>
      <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onStartDate: "", // 确认起始月份
      onEndDate: "", // 确认终止月份
      popupVisible: false,
      dateStart: "", // 默认起始月份
      dateEnd: "", // 默认终止月份
      dateSlots: [
        {
          flex: 1,
          values: ["1月份", "2月份", "3月份", "4月份", "5月份", "7月份", "8月份", "9月份", "10月份", "11月份", "12月份"],
          className: "slot1",
          textAlign: "right"
        }, {
          divider: true,
          content: "-",
          className: "slot2"
        }, {
          flex: 1,
          values: ["1月份", "2月份", "3月份", "4月份", "5月份", "7月份", "8月份", "9月份", "10月份", "11月份", "12月份"],
          className: "slot3",
          textAlign: "left"
        }
      ]
    };
  },
  methods: {
    // 选择月份筛选弹窗
    MutualTrue() {
      this.onStartDate = this.dateStart;
      this.onEndDate = this.dateEnd;
      this.popupVisible = false;
    },
    MutualHide() {
      this.popupVisible = false;
    },
    onDateChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.dateStart = values[0];
      this.dateEnd = values[1];
    }
  }
};
</script>

<style lang="less" scoped>
  .wRecord{
    height: 100vh;
    position: relative;
    .eMutual-int{
      width: 92%;
      margin: 0 auto;
      margin-bottom: 0.8rem;
      .eMutual-flex{
        padding-top: 0.533333rem;
        padding-bottom: 0.444444rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        border-bottom: 0.026666rem solid #EBEBEB;
        .eMutual-left{
          width: 80%;
          line-height: 1;
          .eMutual-show{
            font-size: 0.266666rem;
            color: #FFA56C;
            padding-top: 0.391111rem;
          }
          .eMutual-time{
            font-size: 0.32rem;
            color: #9C9EB9;
            padding-top: 0.266666rem;
          }
          .eMutual-tm{
            font-size: 0.373333rem;
            color: #2D3142;
          }
        }
        .eMutual-right{
          flex: 1;
          text-align: right;
          font-size: 0.373333rem;
          color: #2D3142;
        }
      }
      i{
        display: inline-block;
        width: 0.08rem;
        height: 0.355555rem;
        border-radius: 0.044444rem;
        background-color: #7265E3;
        margin-right: 0.266666rem;
      }
      .eMutual-month{
        font-size: 0.426666rem;
        color: #2D3142;
        font-weight:bold;
      }
    }
    .mint-popup{
      width: 100%;
      .eMutual-pop{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ededed;
        .eMutual-tap{
          flex: 1;
          text-align: center;
          line-height: 1.066666rem;
          font-size: 0.426666rem;
          color: #0000FF;
        }
      }
    }
    .clear{
      clear: both;
    }
    .eMutual-info{
      width: 92%;
      margin: 0 auto;
      margin-top: 0.533333rem;
      margin-bottom: 0.622222rem;
      .eMutual-hb{
        line-height: 1;
        font-size: 0.32rem;
        color: #9C9EB9;
        background-color: #F4F6FA;
        padding: 0.266666rem 0;
        width: 2.346666rem;
        text-align: center;
        border-radius: 0.16rem;
        float: right;
        img{
          width: 0.266666rem;
          margin-left: 0.177777rem;
        }
      }
      .eMutual-bd{
        font-size: 0.533333rem;
        color: #2D3142;
        line-height: 1;
        float: left;
        padding-top: 0.177777rem;
        font-weight: bold;
      }
    }
    .wRecord-bd{
      width: 100%;
      height: 0.266666rem;
      background: #f0f2f5;
    }
    .wRecord-head{
      width: 92%;
      margin: 0 auto;
      .wRecord-headItem{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.564444rem;
        border-bottom: 0.026666rem solid #EAEAEA;
        &:last-child{
          border-bottom: 0;
        }
        .wRecord-headPrice{
          font-size: 0.426666rem;
          color: #2D3142;
        }
        .wRecord-headName{
          flex: 1;
          padding-left: 0.266666rem;
          font-size: 0.426666rem;
          color: #2D3142;
        }
        .wRecord-headColor{
          width: 0.426666rem;
          height: 0.426666rem;
          display: block;
          &.orgin{
            background: #FFA56A;
          }
          &.spe{
            background: #7462E8;
          }
        }
      }
    }
  }
</style>
