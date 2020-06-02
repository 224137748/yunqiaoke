<template>
  <div class="service-type-page">
    <div class="type-outer" v-for="(item, outerIndex) in serviceData" :key="outerIndex">
      <p class="title">
        {{ item.name }}
      </p>
      <div class="type-inner" v-for="(inner, innerIndex) in item.get_child" :key="innerIndex" @click="goForm(inner.id,inner.name)">
        {{ inner.name}}
      </div>
    </div>
  </div>
</template>
<script>
import { getServiceList } from "@/api/publish";
export default {
  name: "service-type-page",
  data() {
    return {
      serviceData: []
    };
  },
  computed: {},
  async mounted() {
    this.$Indicator.open("加载中...");
    let res = await getServiceList(1);
    if (res.error_code === 0) {
      this.serviceData = res.data;
      this.$Indicator.close();
    } else {
      this.$Indicator.close();
    }
  },
  methods: {
    goForm(cate, name) {
      this.$router.push({
        path: "/publish/service-form",
        query: { cate: cate, name: name }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.service-type-page {
  min-height: 100vh;
  width: 1035px;
  margin: 0 auto;
  .type-outer {
    .title {
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 48px;
      padding: 40px 0;
    }
    .type-inner {
      display: inline-block;
      margin-right: 40px;
      padding: 25px 37px;
      background-color: #f6f6fb;
      border-radius: 42px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 36px;
      margin-bottom: 40px;
    }
  }
}
</style>
