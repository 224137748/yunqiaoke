<template>
  <div class="skill-page">
    <div class="add-skill">
      <input type="text" placeholder="添加绝技" v-model.trim="addSkill" maxlength="20" />
      <div class="save-btn" @click="_addSkill">保存</div>
    </div>
    <div class="skill-wraper" @scroll="removeFocus">
      <ul
        class="skill-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li class="skill-item" v-for="(item, index) in userStunt" :key="index">
          <input
            ref="input"
            @focus="recordInput(index)"
            type="text"
            :value="item.name"
            @blur="checkValue($event, item)"
          />
          <div class="delete-btn" @click="_deleteSkill(item)"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  updateSkill,
  addSkill,
  getSkillList,
  deleteSkill
} from "../../api/user";
export default {
  name: "skill-page",
  data() {
    return {
      // 添加绝技
      addSkill: "",
      // 绝技列表
      userStunt: [],

      totalPage: 0,
      // 页码
      pageIndex: 1,
      // 每页长度
      pageNum: 20,
      // 判断是否处于加载中
      loading: false
    };
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 获取页面数据
    this._getSkillList();
  },
  methods: {
    // 记录正在编辑的input表单索引
    recordInput(index) {
      this.focusInputIndex = index;
    },
    // 修改绝技
    async _updateSkill() {
      let res = await updateSkill();
      console.log(res);
    },
    // input失去焦点时，value检查
    async checkValue($event, item) {
      let val = $event.target.value;
      if (val !== item.name) {
        console.log("回复");
        // this.token, stuntId, name
        this.$Indicator.open("加载中...");
        let res = await updateSkill(this.token, item.id, val);
        if (res.error_code === 0) {
          item.name = val;
        }
        this.$Indicator.close();
      }
    },
    // 添加绝技
    async _addSkill() {
      if (!this.addSkill) {
        this.$Toast("请填写绝技内容");
        return;
      }
      this.$Indicator.open("加载中...");
      let res = await addSkill(this.token, this.addSkill);
      this.$Indicator.close();

      if (res.error_code === 0) {
        this.pageIndex = 1;
        this.addSkill = "";
        this._getSkillList();
      } else {
        this.$Toast({
          message: res.error_msg
        });
      }
      console.log(res);
    },
    // 获取绝技列表 加载更多
    async _getSkillList() {
      try {
        this.$Indicator.open("加载中...");
        this.loading = true;
        let res = await getSkillList(this.token, this.pageIndex, this.pageNum);
        console.log(res);
        if (res.error_code === 0) {
          this.totalPage = res.data.last_page;
          // 如果res.data.data 存在 ，且为一个数组，防止后端返回null时报错
          if (res.data.data && Array.isArray(res.data.data)) {
            this.userStunt = res.data.data;
          }
        }
        this.loading = false;
        this.$Indicator.close();
      } catch (err) {
        this.loading = false;
        this.$Indicator.close();
        console.log(err);
      }
    },
    // 加载更多
    async loadMore() {
      if (this.pageIndex < this.totalPage && !this.loading) {
        this.loading = true;
        this.pageIndex++;
        try {
          this.$Indicator.open("加载中...");
          let res = await getSkillList(
            this.token,
            this.pageIndex,
            this.pageNum
          );
          if (res.error_code === 0) {
            if (Array.isArray(res.data.data)) {
              this.userStunt.push(...res.data.data);
            }
          }
          this.$Indicator.close();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        } catch (err) {
          this.$Indicator.close();
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          console.log(err);
        }
      }
    },
    // 滚动时 input失去焦点
    removeFocus() {
      if (typeof this.focusInputIndex === "number") {
        this.$refs.input[this.focusInputIndex].blur();
      }
    },
    async _deleteSkill(item) {
      this.$MessageBox({
        title: "提示",
        message: "确定要删除此绝技?",
        showCancelButton: true,
        ConfirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async val => {
        if (val === "confirm") {
          try {
            this.$Indicator.open("加载中...");
            let res = await deleteSkill(this.token, item.id);
            if (res.error_code === 0) {
              // let index = this.userStunt.findIndex(el => {
              //   return el.id === item.id;
              // });
              // this.userStunt.splice(index, 1);
              this.pageIndex = 1;
              this._getSkillList();
            }
            console.log(res);
            this.$Indicator.close();
          } catch (err) {
            this.$Indicator.close();
          }
        }
      });
    },
    ...mapMutations("user", ["setUserStunt"])
  },
  watch: {
    userStunt(newVal) {
      if (newVal) {
        let newArr = newVal.slice();
        this.setUserStunt(newArr);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.skill-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding: 60px 50px;
  overflow: hidden;
  .add-skill {
    position: relative;
    input[type="text"] {
      width: 100%;
      height: 174px;
      background: rgba(244, 246, 250, 1);
      border-radius: 30px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      padding: 0 210px 0 50px;
      &::placeholder {
        color: rgba(214, 217, 224, 1);
      }
    }
    .save-btn {
      position: absolute;
      right: 50px;
      top: 42px;
      width: 160px;
      height: 90px;
      border-radius: 45px;
      background: #6b58d2;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 90px;
      text-align: center;
    }
  }
  .skill-wraper {
    position: absolute;
    left: 0;
    right: 0;
    top: 274px;
    bottom: 100px;
    width: 1035px;
    margin: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
  .skill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 178px;
    border-bottom: 3px solid rgba(237, 237, 247, 1);
    input[type="text"] {
      width: 830px;
      font-size: 48px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      line-height: 42px;
    }
    .delete-btn {
      width: 64px;
      height: 68px;
      background: url("../../assets/img/user/delete_icon.png") no-repeat left
        top / 100% 100%;
    }
  }
  .edit-save-btn {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1035px;
    height: 1.173333rem;
    background: linear-gradient(122deg, #8b63e6 0%, #6155cc 100%);
    border-radius: 0.586667rem;
    font-size: 0.426667rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.328889rem;
  }
}
</style>
