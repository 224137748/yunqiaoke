<template>
  <li class="section">
    <h1 class="page-title">{{title || '课程分类'}}</h1>
    <ul class="type-list">
      <li
        class="type-item"
        :class="{active: category === item.name}"
        v-for="(item) in typeList"
        :key="item.id"
        @click="selectCategory(item)"
      >{{item.name}}</li>
      <li class="type-item" v-if="selectList == 2">
        <input
          :class="{active: category === addCategory}"
          type="text"
          class="add-category"
          placeholder="自定义输入"
          v-model.trim="addCategory"
          @blur="wirteCategory"
          maxlength="10"
        />
      </li>
    </ul>
    <div class="footer">
      <div class="prev-btn" @click="prevStep">上一步</div>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getCategoryData } from "../../api/information";
export default {
  name: "select-category",
  props: {
    title: String,
    // 获取类别的参数
    selectList: {
      type: Number
    }
  },
  data() {
    return {
      typeList: [],
      addCategory: ""
    };
  },
  computed: {
    ...mapState("information", ["category"])
  },
  components: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      console.log("getCategoryData");
      try {
        let res = await getCategoryData(this.selectList);
        console.log(res);
        if (res.error_code === 0) {
          this.typeList = res.data || [];
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 用户自定义技能；
    wirteCategory() {
      if (this.addCategory) {
        this.selectCategory({ name: this.addCategory });
      }
    },
    prevStep() {
      this.$emit("prevStep");
    },
    selectCategory(item) {
      this.setCategory(item.name);
      setTimeout(() => {
        this.$emit("nextStep");
      }, 500);
    },
    ...mapMutations("information", ["setCategory"])
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/information.less";
.type-item {
  &.active {
    color: #8b63e6;
  }
  .add-category {
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 66px;
    padding: 0 50px;
    &.active {
      color: #8b63e6;
    }
    &::placeholder {
      color: rgba(214, 217, 224, 1);
    }
  }
}
</style>
