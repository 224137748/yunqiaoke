<template>
  <div class="type1-page">
    <ul tag="ul" class="steps">
      <!-- 动态组件 渲染要填写的内容 -->
      <component
        :is="item.name"
        v-for="(item, index) in stepList"
        :selectList="item.selectList"
        :title="item.title"
        v-show="progress === index"
        :key="item.name + index"
        @prevStep="prevStep"
        @nextStep="nextStep"
      ></component>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ServiceTime from "../../components/information/service-time";
import ServiceType from "../../components/information/service-type";
import Other from "../../components/information/other";
import SelectIdentity from "../../components/information/select-identity";
import SelectCategory from "../../components/information/select-category";
import mainData from "./data";
import { completeInfo } from "../../api/information";
export default {
  name: "main-page",
  data() {
    return {
      progress: "0",
      stepList: []
    };
  },
  components: {
    ServiceTime,
    ServiceType,
    Other,
    SelectIdentity,
    SelectCategory
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState(["token"]),
    ...mapState("information", [
      "sex",
      "type",
      "service_type",
      "service_time",
      // 与收入
      "planned",
      // 目前收入
      "current",
      // 计划时长
      "planning_time",
      "category"
    ])
  },
  methods: {
    // 获取url参数 确认data
    initData() {
      let id = this.type || "";
      if (!id) {
        this.$router.back();
      }
      this.stepList = mainData[id - 1];
      this.progress = 0;
    },
    // 上一步
    prevStep() {
      // 增加节流
      if (!this.isTouched) {
        this.isTouched = true;
        setTimeout(() => {
          this.isTouched = false;
        }, 700);
        if (this.progress === 0) {
          this.$router.replace("/information/type");
          return;
        }
        this.progress--;
      }
    },
    // 下一步
    nextStep() {
      // 增加节流
      if (!this.isTouched) {
        this.isTouched = true;
        setTimeout(() => {
          this.isTouched = false;
        }, 700);
        if (this.progress === this.stepList.length - 1) {
          this.submitForm();
          return;
        }
        this.progress++;
      }
    },
    async submitForm() {
      // 提交表单
      !this.token && (await this.getToken());
      let data = {
        token: this.token,
        sex: this.sex,
        type: this.type
        // service_type: this.service_type,
        // service_time: this.service_time,
        // planned: this.planned,
        // current: this.current,
        // planning_time: this.planning_time,
        // category: this.category
      };
      switch (this.type) {
        case 1:
          data.service_type = this.service_type;
          data.service_time = this.service_time;
          data.planned = this.planned;
          data.current = this.current;
          data.planning_time = this.planning_time;
          break;
        case 2:
        case 6:
          data.service_type = this.service_type;
          data.planned = this.planned;
          data.current = this.current;
          data.planning_time = this.planning_time;
          break;
        case 3:
          data.service_time = this.service_time;
          data.planned = this.planned;
          data.current = this.current;
          data.planning_time = this.planning_time;
          break;
        case 4:
          data.service_time = this.service_time;
          data.category = this.category;
          break;
        case 5:
          data.service_type = this.service_type;
          data.planned = this.planned;
          data.current = this.current;
          data.planning_time = this.planning_time;
          data.category = this.category;
          break;
      }
      console.log("submit", data);
      // return false;
      /* eslint-disable*/
      if (data.token) {
        try {
          this.$Indicator.open("加载中...");
          let res = await completeInfo(data);
          console.log(res);
          if (res.error_code === 0) {
            this.$Toast({
              message: "提交成功，进入主页",
              duration: 1500
            });
            setTimeout(() => {
              this.$bridge.call("router_app", {
                type: "app_home"
              });
            }, 1800);
          } else {
            this.$Toast({
              message: res.error_msg,
              duration: 1500
            });
          }
          this.$Indicator.close();
        } catch (err) {}
      } else {
        console.log("未获取到token");
      }
    },
    ...mapActions(["getToken"])
  }
};
</script>

<style lang="less" scoped>
.swp-fade-enter-active,
.swp-fade-leave-active {
  transition: all 10s ease;
}
.swp-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.swp-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.list-complete-item {
  transition: all 100s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
