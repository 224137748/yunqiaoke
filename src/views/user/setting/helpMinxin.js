import { mapState } from "vuex";
import { getHelpList } from "@/api/user";

// 问题列表， 加载更多 mixin
const helpMixin = {
  data() {
    return {
      totalPage: "",
      pageInfo: {
        pageIndex: 1,
        pageNum: 20
      },
      questionList: [],
      loading: false,
      // 问题类型
      type: ""
    };
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    //   获取问题列表
    async _getHelpList(recommendType) {
      this.$Indicator.open("加载中...");
      let res = await getHelpList(
        this.token,
        this.type,
        this.pageInfo.pageIndex,
        this.pageInfo.pageNum
      );
      if (res.error_code === 0) {
        this.totalPage = res.data.last_page;
        if (res.data.data && Array.isArray(res.data.data)) {
          if (recommendType) {
            this.questionList = res.data.data.filter(item => {
              return item.recommend === 1;
            });
          } else {
            this.questionList = res.data.data;
          }
        }
      }
      this.$Indicator.close();
      console.log(res);
    },
    // 加载更多
    async loadMore() {
      if (this.pageInfo.pageIndex < this.totalPage && !this.loading) {
        this.loading = true;
        this.pageInfo.pageIndex++;
        try {
          this.$Indicator.open("加载中...");
          let res = await getHelpList(
            this.token,
            this.type,
            this.pageInfo.pageIndex,
            this.pageInfo.pageNum
          );
          if (res.error_code === 0) {
            if (Array.isArray(res.data.data)) {
              this.questionList.push(...res.data.data);
            }
          }
          this.$Indicator.close();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        } catch (err) {
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          this.$Indicator.close();
          console.log(err);
        }
      }
    }
  }
};

export default helpMixin;
