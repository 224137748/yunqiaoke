<template>
  <div class="request-type-page">
    <div class="type-outer" v-for="(item, outerIndex) in serviceData" :key="outerIndex">
      <p class="title">
        {{ item.name }}
      </p>
      <div class="type-inner" v-for="(inner, innerIndex) in item.get_child" :key="innerIndex" @click="goForm(inner)">
        {{ inner.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { getServiceList } from "@/api/publish";
export default {
  name: "request-type-page",
  data() {
    return {
      serviceData: [
      ]
    };
  },
  computed: {},
  async mounted() {
    this.$Indicator.open("加载中...");
    let res1 = await getServiceList(3);
    let res2 = await getServiceList(4);
    let res3 = await getServiceList(5);
    let res4 = await getServiceList(6);
    this.$Indicator.close();
    this.serviceData = [...res1.data, ...res2.data, ...res3.data, ...res4.data];
  },
  methods: {
    goForm({ type, id, name }) {
      switch (type) {
        case 3:
          this.$router.push({
            path: "/publish/request-form-invest",
            query: { cate: id, name: name }
          });
          break;
        case 4:
          this.$router.push({
            path: "/publish/request-form-finance",
            query: { cate: id, name: name }
          });
          break;
        case 5:
          this.$router.push({
            path: "/publish/request-form-supporter",
            query: { cate: id, name: name }
          });
          break;
        case 6:
          this.$router.push({
            path: "/publish/request-form-transfer",
            query: { cate: id, name: name }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.request-type-page {
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
