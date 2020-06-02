<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"><img src="../../../assets/img/home/wh_jiantou1.png" alt=""></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"><img src="../../../assets/img/home/wh_jiantou2.png" alt=""></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(tag,index) in textTop" :key="index">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" :key="index">
          <div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"><p>{{item.id}}</p><p>{{item.downObj}}</p></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getPercent } from "../../../api/home.js";
import { mapState, mapActions } from "vuex";
import timeUtil from "./calendar";
export default {
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ""
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: "0"
    },
    futureDayHide: {
      type: String,
      default: "2554387200"
    }
  },
  created() {
    this.intStart();
    this.myDate = new Date();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function(item, index) {
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    async getList (date, chooseDay, isChosedDay = true) {
      !this.token && await this.getToken();
      const [markDate, markDateMore] = this.forMatArgs();
      var myMonths = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      this.dateTop = `${date.getFullYear()}-` + myMonths;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        // let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (new Date(nowTime).toDateString() === new Date().toDateString()) {
          k.isToday = true;
        };
        // if (chooseDay && chooseDay === nowTime && flag) {
        //   this.$emit("choseDay", nowTime);
        //   this.historyChose.push(nowTime);
        //   k.chooseDay = true;
        // } else if (
        //   this.historyChose[this.historyChose.length - 1] === nowTime &&
        //     !chooseDay &&
        //     flag
        // ) {
        //   k.chooseDay = true;
        // }
      }

      var statTime = arr[0].date.replace(/\//g, "-");
      var endTime = arr[arr.length - 1].date.replace(/\//g, "-");
      // console.log(statTime, endTime);
      var params = {
        token: this.token,
        start_date: statTime,
        end_date: endTime
      };
      var res = await getPercent(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          if (data) {
            for (var i = 0; i < arr.length; i++) {
              arr[i].downObj = "";
              for (var k = 0; k < data.length; k++) {
                if (arr[i].date.replace(/\//g, "-") === data[k].record_date) {
                  arr[i].downObj = parseInt(data[k].percent * 100) + "%";
                }
              }
            };
          } else {
            for (var j = 0; j < arr.length; j++) {
              arr[j].downObj = "　";
            };
            console.log("无数据");
          };
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(arr);
      this.list = arr;
    },
    ...mapActions(["getToken"])
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    $route(now, old) {
      if (now.path === "/sign") {
        this.getList(this.myDate);
      }
    },
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
  @media screen and (min-width: 460px) {
    .wh_item_date:hover {
      background: #71c7a5;
      cursor: pointer;
    }
  }

  * {
    margin: 0;
    padding: 0;
  }

  .wh_container {
    max-width: 100%;
    margin: auto;
  }

  li {
    list-style-type: none;
  }

  .wh_top_changge {
    display: flex;
    width: 90%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .wh_top_changge li {
    cursor: pointer;
    color: #2D3142;
    font-size: 0.533333rem;
    flex: 1;
    height: 1.466666rem;
    line-height: 1.466666rem;
    text-align: center;
    &:first-child{
      text-align: right;
    }
    &:last-child{
      text-align: left;
    }
  }
  .wh_jiantou1 {
    width: 0.266666rem;
    height: 0.328888rem;
    font-size: 0;
    display: inline-block;
    img{
      width: 100%;
    }
  }
  .wh_jiantou2 {
    width: 0.266666rem;
    height: 0.328888rem;
    font-size: 0;
    display: inline-block;
    img{
      width: 100%;
    }
  }
  .wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 1.5;
  }

  .wh_content_all {
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
  }

  .wh_content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3% 0 3%;
    width: 100%;
  }

  .wh_content:first-child .wh_content_item_tag,
  .wh_content:first-child .wh_content_item {
    color: #ddd;
    font-size: 16px;
  }

  .wh_content_item,
  .wh_content_item_tag {
    width: calc(100% / 7);
    text-align: center;
    color: #fff;
    position: relative;
    padding: 0.177777rem 0;
  }

  .wh_top_tag {
    width: 40px;
    height: 40px;
    color: #9C9EB9;
    font-size: 0.373333rem;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.533333rem;
    padding-bottom: 0.444444rem;
  }

  .wh_item_date {
    width: 0.96rem;
    /* height: 0.995555rem; */
    margin: auto;
    text-align: center;
    color: #2D3142;
    padding: 0.177777rem 0;
  }

  .wh_jiantou1:active,
  .wh_jiantou2:active {
    border-color: #ddd;
  }

  .wh_content_item>.wh_isMark {
    margin: auto;
    border-radius: 100px;
    background: blue;
    z-index: 2;
  }

  .wh_content_item .wh_other_dayhide {
    color: #9C9EB9;
  }

  .wh_content_item .wh_want_dayhide {
    color: #bfbfbf;
  }

  .wh_content_item .wh_isToday {
    background-color: #7265E3;
    color: #FFFFFF;
    border-radius: 0.133333rem;
  }

  .wh_content_item .wh_chose_day {
    background: green;
    border-radius: 100px;
  }
  .wh_item_date p{
    line-height: 1;
  }
  .wh_item_date p:first-child{
    font-size: 0.373333rem;
  }
  .wh_item_date p:last-child{
    font-size: 0.266666rem;
    color: #9C9EB9;
  }
  .wh_item_date.wh_isToday p:last-child{
    color: #FFFFFF;
  }
</style>
