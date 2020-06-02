<template>
  <!-- 我的认可 -->
  <div class="appr">
    <div class="appr-head"></div>
    <div class="appr-box">
      <div class="appr-item">
        <div class="appr-title">196<span>次</span></div>
        <div class="appr-bd">累计认可</div>
        <i class="appr-i2"></i>
      </div>
    </div>
    <div class="appr-info">
      <div class="appr-bd">认可明细</div>
      <div class="appr-hb" @click="popupVisible = true">筛选日期<img src="../../assets/img/home/down.png" alt=""></div>
      <div class="clear"></div>
    </div>
    <div class="appr-int">
      <div class="appr-month"><i></i>10月份</div>
      <div class="appr-flex">
        <div class="appr-img"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="appr-left">
          <div class="appr-tm">产品原型设计服务</div>
          <div class="appr-time">￥600</div>
        </div>
        <div class="appr-right">+1</div>
      </div>
      <div class="appr-flex">
        <div class="appr-img"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="appr-left">
          <div class="appr-tm">产品原型设计服务</div>
          <div class="appr-time">￥600</div>
        </div>
        <div class="appr-right">+1</div>
      </div>
    </div>
    <div class="appr-int">
      <div class="appr-month"><i></i>11月份</div>
      <div class="appr-flex">
        <div class="appr-img"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="appr-left">
          <div class="appr-tm">产品原型设计服务</div>
          <div class="appr-time">￥600</div>
        </div>
        <div class="appr-right">+1</div>
      </div>
      <div class="appr-flex">
        <div class="appr-img"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="appr-left">
          <div class="appr-tm">产品原型设计服务</div>
          <div class="appr-time">￥600</div>
        </div>
        <div class="appr-right">+1</div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <div class="appr-pop">
        <div class="appr-tap" @click="MutualHide">取消</div>
        <div class="appr-tap" @click="MutualTrue">确认</div>
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
  .appr-int{
    width: 92%;
    margin: 0 auto;
    margin-bottom: 0.8rem;
    .appr-flex{
      padding-top: 0.533333rem;
      padding-bottom: 0.444444rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after{
        content: '';
        display: inline-block;
        width: 100%;
        height: 0.026666rem;
        background-color: #EBEBEB;
        position: absolute;
        bottom: 0;
      }
      .appr-img{
        width: 1.493333rem;
        height: 1.493333rem;
        border-radius: 0.106666rem;
        overflow: hidden;
        img{
          width: 1.493333rem;
          height: 1.493333rem;
        }
      }
      .appr-left{
        height: 1.493333rem;
        padding-left: 0.266666rem;
        line-height: 1;
        position: relative;
        .appr-time{
          font-size: 0.32rem;
          color: #9C9EB9;
          position: absolute;
          bottom: 0;
        }
        .appr-tm{
          font-size: 0.373333rem;
          color: #2D3142;
        }
      }
      .appr-right{
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
    .appr-month{
      font-size: 0.426666rem;
      color: #2D3142;
      font-weight:bold;
    }
  }
  .appr-info{
    width: 92%;
    margin: 0 auto;
    margin-top: 2.666666rem;
    margin-bottom: 0.622222rem;
    .appr-hb{
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
    .appr-bd{
      font-size: 0.533333rem;
      color: #2D3142;
      line-height: 1;
      float: left;
      padding-top: 0.177777rem;
      font-weight: bold;
    }
  }
  .mint-popup{
    width: 100%;
    .appr-pop{
      width: 100%;
      display: flex;
      border-bottom: 1px solid #ededed;
      .appr-tap{
        flex: 1;
        text-align: center;
        line-height: 1.066666rem;
        font-size: 0.426666rem;
        color: #0000FF;
      }
    }
  }
  .appr-box{
    width: 92%;
    height: 3.555555rem;
    background: #FFFFFF;
    box-shadow: 0px 30px 90px 0px rgba(112,136,210,0.1);
    border-radius: 0.4rem;
    position: absolute;
    top: 2.666666rem;
    left: 4%;
    display: flex;
    .appr-item{
      text-align: center;
      flex: 1;
      line-height: 1;
      .appr-i2{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #7265E3;
        display: block;
        margin: 0 auto;
      }
      .appr-i1{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #FFA56C;
        display: block;
        margin: 0 auto;
      }
      .appr-bd{
        font-size: 0.373333rem;
        color: #9C9EB9;
        padding: 0.32rem 0;
      }
      .appr-title{
        font-size: 0.853333rem;
        color: #2D3142;
        padding-top: 0.711111rem;
        span{
          font-size: 0.355555rem;
          margin-left: 0.177777rem;
        }
      }
    }
  }
  .appr-head{
    width: 100%;
    height: 4.444444rem;
    background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
    position: relative;
  }
  .clear{
    clear: both;
  }
</style>
