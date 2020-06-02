<template>

  <div class="topics">
    <div class="top-wrap">
      <div class="serch-wrap flex flex-align-center">
        <i class="mintui mintui-search"></i>
        <form class="flex-1" @submit.prevent action="#">
          <input class="search_input" ref="input" v-model.trim="searchValue" @keypress="doSearch" placeholder="商品名称" type="search" />
        </form>
      </div>
      <div class="add-wrap flex flex-align-center">
        <input type="text" maxlength="50" class="flex-1" placeholder="添加话题" v-model.trim="topicValue">
        <div class="save" @click="addTopic">保存</div>
      </div>
    </div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loasding" infinite-scroll-distance="10">
      <li v-for="item in list" @click="selectTopic(item)" :key="item.id">#{{ item.name}}#</li>
    </ul>
  </div>
</template>

<script>
//  多个type区分 7中
import { getAllTopic, addTopic } from "@/api/publish";
import { mapState, mapMutations } from "vuex";
export default {
  name: "page-topic-select",
  data() {
    return {
      // 搜索值
      searchValue: "",
      // 新增话题名称
      topicValue: "",
      isSearch: false,
      list: [],
      loading: true,
      pageConfig: {
        page: 1,
        per_page: 20
      },
      totalPage: 0,
      topicType: ""
    };
  },
  computed: {
    ...mapState({
      serviceForm: state => state.publish.serviceForm,
      skillForm: state => state.publish.skillForm,
      investForm: state => state.publish.investForm,
      financeForm: state => state.publish.financeForm,
      supporterForm: state => state.publish.supporterForm,
      transferForm: state => state.publish.transferForm,
      lessonForm: state => state.publish.lessonForm,
      token: ["token"]
    })
  },
  mounted() {
    this.topicType = this.$route.query.type;
    this.$Indicator.open("加载中...");
    getAllTopic(this.pageConfig).then(res => {
      this.$Indicator.close();
      this.loading = false;
      if (res.error_code === 0) {
        this.list = res.data.data;
        this.totalPage = res.data.last_page;
      } else {
        this.$Toast({
          message: res.error_msg,
          duration: 1500
        });
      }
    });
  },
  methods: {
    ...mapMutations("publish", {
      saveServiceForm: "saveServiceForm",
      saveSkillForm: "saveSkillForm",
      saveInvestForm: "saveInvestForm",
      saveFinanceForm: "saveFinanceForm",
      saveSupporterForm: "saveSupporterForm",
      saveTransferForm: "saveTransferForm",
      saveLessonForm: "saveLessonForm"
    }),
    /**
     * 搜索话题
     */
    doSearch() {
      this.pageConfig.page = 1;
      this.$Indicator.open("加载中...");
      getAllTopic({ name: this.searchValue, ...this.pageConfig }).then(res => {
        this.$Indicator.close();
        this.loading = false;
        if (res.error_code === 0) {
          this.list = res.data.data;
          this.totalPage = res.data.last_page;
        } else {
          this.$Toast({
            message: res.error_msg,
            duration: 1500
          });
        }
      });
    },
    /**
     * 加载更多
     */
    loadMore() {
      if (this.pageConfig.page < this.totalPage && !this.loading) {
        this.loading = true;
        this.pageConfig.page += 1;
        let a = this.isSearch
          ? { name: this.searchValue, ...this.pageConfig }
          : this.pageConfigs;
        getAllTopic(a).then(res => {
          this.loading = false;
          if (res.error_code === 0) {
            this.list.push(res.data.data);
            this.totalPage = res.data.last_page;
          }
        });
      }
    },
    // 选择话题
    selectTopic(item) {
      let temp = "";
      switch (this.topicType) {
        case "service":
          temp = JSON.parse(JSON.stringify(this.serviceForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveServiceForm(temp);
          this.$router.back();
          break;
        case "skill":
          temp = JSON.parse(JSON.stringify(this.skillForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveSkillForm(temp);
          this.$router.back();
          break;
        case "invest":
          temp = JSON.parse(JSON.stringify(this.investForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveInvestForm(temp);
          this.$router.back();
          break;
        case "finance":
          temp = JSON.parse(JSON.stringify(this.financeForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveFinanceForm(temp);
          this.$router.back();
          break;
        case "supporter":
          temp = JSON.parse(JSON.stringify(this.supporterForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveSupporterForm(temp);
          this.$router.back();
          break;
        case "transfer":
          temp = JSON.parse(JSON.stringify(this.transferForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveTransferForm(temp);
          this.$router.back();
          break;
        case "lesson":
          temp = JSON.parse(JSON.stringify(this.lessonForm));
          temp.topicConfig = {
            id: item.id,
            name: item.name
          };
          temp.topic_id = item.id;
          this.saveLessonForm(temp);
          this.$router.back();
          break;
        default:
          break;
      }
    },
    /**
     * 添加话题
     */
    addTopic() {
      if (!this.topicValue) return this.$Toast("话题名称不能为空");
      let tempThumb = "";
      switch (this.topicType) {
        case "service":
          tempThumb = this.serviceForm.thumb;
          break;
        case "skill":
          tempThumb = this.skillForm.thumb;
          break;
        case "invest":
          tempThumb = this.investForm.thumb;
          break;
        case "finance":
          tempThumb = this.financeForm.thumb;
          break;
        case "supporter":
          tempThumb = this.supporterForm.thumb;
          break;
        case "transfer":
          tempThumb = this.transferForm.thumb;
          break;
        case "lesson":
          tempThumb = this.lessonForm.thumb;
          break;
        default:
          break;
      }
      if (!tempThumb) return this.$Toast("请先上传封面图");
      addTopic({
        name: this.topicValue,
        pic: tempThumb,
        token: this.token
      }).then(res => {
        if (res.error_code === 0) {
          this.$Toast("话题名称添加成功");
          this.pageConfig.page = 1;
          this.$Indicator.open("加载中...");
          getAllTopic(this.pageConfig).then(res => {
            this.$Indicator.close();
            this.loading = false;
            if (res.error_code === 0) {
              this.list = res.data.data;
              this.totalPage = res.data.last_page;
            } else {
              this.$Toast({
                message: res.error_msg,
                duration: 1500
              });
            }
          });
        } else {
          this.$Toast(res.error_msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
.topics {
  padding-top: 30px;
  .top-wrap {
    width: 1035px;
    margin: 0 auto;
    .serch-wrap {
      height: 128px;
      background: rgba(244, 246, 250, 1);
      border-radius: 12px;
      i {
        margin-left: 30px;
      }
      input[type="search"] {
        -webkit-appearance: textfield;
        -webkit-box-sizing: content-box;
        font-family: inherit;
        font-size: 100%;
      }
      input::-webkit-search-decoration,
      input::-webkit-search-cancel-button {
        display: none;
      }
      form {
        line-height: 128px;
        padding-left: 22px;
      }
      input {
        width: 100%;
        background: rgba(244, 246, 250, 1);
        font-size: 42px;
        &::placeholder {
          font-size: 42px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(156, 158, 185, 1);
        }
      }
    }
    .add-wrap {
      height: 174px;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      margin-top: 60px;
      input {
        background: rgba(244, 246, 250, 1);
        font-size: 48px;
        line-height: 174px;
        padding: 0 50px;
        &::placeholder {
          font-size: 48px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(156, 158, 185, 1);
        }
      }
      .save {
        background-image: url(../../assets/img/publish/topic-save.png);
        background-size: 100% 100%;
        width: 160px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-right: 45px;
      }
    }
  }
  ul {
    height: 1500px;
    overflow-y: auto;
    padding-left: 45px;
    margin-top: 20px;
    li {
      height: 142px;
      line-height: 142px;
      border-bottom: solid 2px #e3e3e3;
      font-size: 45px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(63, 67, 71, 1);
    }
  }
}
</style>
