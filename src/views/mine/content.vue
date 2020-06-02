<template>
  <div class="box">
    <head-nav :title="title" class="mheader" :navShow="false" :titleColor="'#000000'">
      <div slot="headerLeft" class="headLeft" @click="goback"><img src="../../assets/img/home/leftHeadback.png" alt=""></div>
    </head-nav>
    <div class="content" v-html="body"></div>
  </div>
</template>

<script>
import headNav from "../../components/home/headNav.vue";
import { getPageData } from "../../api/home.js";
export default {
  components: {
    headNav
  },
  data() {
    return {
      title: "",
      body: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    async getData() {
      var params = {
        id: this.id
      };
      var res = await getPageData(params);
      try {
        if (res.error_code === 0) {
          var data = res.data;
          this.title = data.title;
          this.body = data.content;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .box{
    width: 100%;
    .mheader{
      width: 100%;
      position: relative;
      border-bottom: 0.026666rem solid #EEEEEE;
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
    }
    .content{
      width: 92%;
      margin: 0 auto;
      margin-top: 0.355555rem;
    }
  }
</style>
