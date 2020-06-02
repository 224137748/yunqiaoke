<template>
  <!-- 经验宝石收支明细 -->
  <div class="eMutual">
    <div class="eMutual-head"></div>
    <!-- <head-nav :title="'经验宝石收支明细'" class="mheader"></head-nav> -->
    <div class="eMutual-box">
      <div class="eMutual-item">
        <div class="eMutual-title">{{current_gem}}<span>枚</span></div>
        <div class="eMutual-bd">经验宝石余额</div>
        <i class="eMutual-i1"></i>
      </div>
      <div class="eMutual-item">
        <div class="eMutual-title">{{total_gem}}<span>枚</span></div>
        <div class="eMutual-bd">经验宝石总收入</div>
        <i class="eMutual-i2"></i>
      </div>
    </div>
    <div class="eMutual-info">
      <div class="eMutual-bd">收支明细</div>
      <div class="eMutual-hb" @click="popupVisible = true">筛选日期<img src="../../../assets/img/home/down.png" alt=""></div>
      <div class="clear"></div>
    </div>
    <div class="eMutual-int" v-for="(item,i) in list" :key="i">
      <div class="eMutual-month"><i></i>{{item.month}}</div>
      <div class="eMutual-flex" v-for="(em,index) in item.content" :key="index">
        <div class="eMutual-left">
          <div class="eMutual-tm">176 0022 0747 打榜</div>
          <div class="eMutual-time">{{em.created_at}}</div>
        </div>
        <div class="eMutual-right" v-if="em.type === 2">+{{em.gem}}杖</div>
        <div class="eMutual-right" v-else>-{{em.gem}}杖</div>
      </div>
    </div>
    <div v-if="show">暂无数据</div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <div class="eMutual-pop">
        <div class="eMutual-tap" @click="MutualHide">取消</div>
        <div class="eMutual-tap" @click="MutualTrue">确认</div>
      </div>
      <mt-picker :slots="dateSlots" @change="onDateChange" value-key="name" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    </mt-popup>
    <btn :vals="'赚取经验宝石'" class="btn"></btn>
  </div>
</template>

<script>
// import headNav from "../../../components/home/headNav.vue";
import btn from "../../../components/home/btn.vue";
import { mapState, mapActions } from "vuex";
import { getUserGem } from "../../../api/home.js";
export default {
  components: {
    // headNav
    btn
  },
  data() {
    return {
      ondateStart: "",
      ondateEnd: "",
      popupVisible: false,
      dateStart: "", // 默认起始月份
      dateEnd: "", // 默认终止月份
      dateSlots: [
        {
          flex: 1,
          values: [
            { name: "1月份", id: 1 },
            { name: "2月份", id: 2 },
            { name: "3月份", id: 3 },
            { name: "4月份", id: 4 },
            { name: "5月份", id: 5 },
            { name: "6月份", id: 6 },
            { name: "7月份", id: 7 },
            { name: "8月份", id: 8 },
            { name: "9月份", id: 9 },
            { name: "10月份", id: 10 },
            { name: "11月份", id: 11 },
            { name: "12月份", id: 12 }
          ],
          className: "slot1",
          textAlign: "right",
          defaultIndex: 0
        }, {
          divider: true,
          content: "-",
          className: "slot2"
        }, {
          flex: 1,
          values: [
            { name: "1月份", id: 1 },
            { name: "2月份", id: 2 },
            { name: "3月份", id: 3 },
            { name: "4月份", id: 4 },
            { name: "5月份", id: 5 },
            { name: "6月份", id: 6 },
            { name: "7月份", id: 7 },
            { name: "8月份", id: 8 },
            { name: "9月份", id: 9 },
            { name: "10月份", id: 10 },
            { name: "11月份", id: 11 },
            { name: "12月份", id: 12 }
          ],
          className: "slot3",
          textAlign: "left",
          defaultIndex: 0
        }
      ],
      current_gem: "",
      total_gem: "",
      list: [],
      show: false
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      !this.token && (await this.getToken());
      var params = "";
      if (this.ondateStart) {
        params = {
          token: this.token,
          started_at: this.ondateStart,
          ended_at: this.ondateEnd
        };
      } else {
        params = {
          token: this.token
        };
      }
      var res = await getUserGem(params);
      try {
        if (res.error_code === 0) {
          this.current_gem = res.data.current_gem;
          this.total_gem = res.data.total_gem;
          var data = res.data.data;
          var months = data[0].created_at.substring(5, 7); // 设置一个月份用于作比较
          var index = 0; // 数组下标
          var json = [ { month: "", content: [] } ];
          for (var i = 0; i < data.length; i++) {
            var day = data[i].created_at.substring(5, 7);
            var month = (day > 10 ? day : day.substring(1, 2)) + "月份";
            if (day < months) {
              months = day;
              index = index + 1;
              json.push({ month: "", content: [] });
            }
            json[index].month = month;
            json[index].content.push(data[i]);
          }
          for (var j = 0; j < json.length; j++) {
            this.list.push(json[j]);
          }
          if (this.list.length === 0) {
            this.show = true;
          }
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 选择月份筛选弹窗
    MutualTrue() {
      this.popupVisible = false;
      let curDate = new Date();
      let y = curDate.getFullYear();
      var lastMonth = this.dateEnd.id > 10 ? this.dateEnd.id : "0" + this.dateEnd.id;
      var firstMonth = this.dateStart.id > 10 ? this.dateStart.id : "0" + this.dateStart.id;
      var last = y + "-" + lastMonth + "-" + new Date(y, this.dateEnd.id, 0).getDate();
      var first = y + "-" + firstMonth + "-01";
      this.ondateEnd = last;
      this.ondateStart = first;
      this.list = [];
      this.getData();
    },
    MutualHide() {
      this.popupVisible = false;
    },
    onDateChange(picker, values) {
      if (values[0].id > values[1].id) {
        this.dateSlots[0].defaultIndex = values[0].id - 1;
        this.dateSlots[2].defaultIndex = values[0].id - 1;
      }
      this.dateStart = values[0];
      this.dateEnd = values[1];
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
  .btn{
    width: 92%;
    margin: 0 auto;
    margin-bottom: 0.8rem;
  }
  .mheader{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
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
      &::after{
        content: '';
        display: inline-block;
        width: 100%;
        height: 0.026666rem;
        background-color: #EBEBEB;
        position: absolute;
        bottom: 0;
      }
      .eMutual-left{
        width: 80%;
        line-height: 1;
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
  .eMutual-info{
    width: 92%;
    margin: 0 auto;
    margin-top: 2.666666rem;
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
  .eMutual-box{
    width: 92%;
    height: 3.555555rem;
    background: #FFFFFF;
    box-shadow: 0px 30px 90px 0px rgba(112,136,210,0.1);
    border-radius: 0.4rem;
    position: absolute;
    top: 2.666666rem;
    left: 4%;
    display: flex;
    .eMutual-item{
      text-align: center;
      flex: 1;
      line-height: 1;
      .eMutual-i2{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #7265E3;
        display: block;
        margin: 0 auto;
      }
      .eMutual-i1{
        width: 0.888888rem;
        height: 0.053333rem;
        background-color: #FFA56C;
        display: block;
        margin: 0 auto;
      }
      .eMutual-bd{
        font-size: 0.373333rem;
        color: #9C9EB9;
        padding: 0.32rem 0;
      }
      .eMutual-title{
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
  .eMutual-head{
    width: 100%;
    height: 4.444444rem;
    background:linear-gradient(122deg,rgba(139,99,230,1),rgba(97,85,204,1));
    position: relative;
  }
  .clear{
    clear: both;
  }
</style>
