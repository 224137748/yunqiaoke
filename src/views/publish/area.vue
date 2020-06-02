<template>
  <!-- 区域选择 -->
  <div class="publish-area-container">
    <div class="publish-area flex ">
      <div class="prov-container">
        <div
          class="prov"
          @click="selectProv(provIndex)"
          :class="{ active: provIndex == config.proAffix }"
          v-for="(prov, provIndex) in areaData"
          :key="provIndex"
        >
          {{ prov.name }}
        </div>
      </div>
      <div class="city-container">
        <div
          class="city"
          @click="selectCity(cityIndex)"
          :class="{ active: cityIndex == config.cityAffix }"
          v-for="(city, cityIndex) in areaData[config.proAffix].city"
          :key="cityIndex"
        >
          {{ city.name }}
        </div>
      </div>
      <div class="area-container">
        <div class="area flex flex-justify-between flex-align-center">
          <span class="area-name">全选</span>
          <span
            class="area-check"
            @click="
              toggleSelectAll(
                areaData[config.proAffix].city[config.cityAffix].area
              )
            "
            :class="{ active: selectedAllFlag }"
          ></span>
        </div>
        <div
          class="area flex flex-justify-between flex-align-center"
          v-for="(area, areaIndex) in areaData[config.proAffix].city[
            config.cityAffix
          ].area"
          :key="areaIndex"
        >
          <span class="area-name">{{ area.name }}</span>
          <span
            class="area-check"
            @click="toggleSelect(area, areaIndex)"
            :class="{ active: selectedArea.indexOf(area.name) > -1 }"
          ></span>
        </div>
      </div>
    </div>
    <div class="area-save" @click="saveArea">确定</div>
  </div>
</template>

<script>
//  service/skill 只有两个类型会选择区域
import areaData from "@/assets/area.json";
import { mapState, mapMutations } from "vuex";
export default {
  // 发布模块区域模块
  name: "publish-area-select",
  data() {
    return {
      areaData: areaData,
      config: {
        proAffix: 0,
        cityAffix: 0,
        areaAffix: 2
      },
      selectedArea: [],
      selectedAreaConfig: [{ prov: "北京市", city: "市辖区", area: "朝阳区" }],
      formType: ""
    };
  },
  computed: {
    ...mapState({
      serviceForm: state => state.publish.serviceForm,
      skillForm: state => state.publish.skillForm
    }),
    selectedAllFlag: function() {
      let areas = this.areaData[this.config.proAffix].city[this.config.cityAffix].area;
      let count = 0;
      areas.map(item => {
        if (this.selectedArea.indexOf(item.name) > -1) {
          count += 1;
        }
      });
      if (count === areas.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.formType = this.$route.query.type;
    if (this.formType === "service") {
      if (this.serviceForm.site.length > 0) {
        this.selectedAreaConfig = JSON.parse(
          JSON.stringify(this.serviceForm.site)
        );
      } else {
        this.selectedAreaConfig = [
          { prov: "北京市", city: "市辖区", area: "朝阳区" }
        ];
      }
    } else if (this.formType === "skill") {
      if (this.skillForm.site.length > 0) {
        this.selectedAreaConfig = JSON.parse(
          JSON.stringify(this.skillForm.site)
        );
      } else {
        this.selectedAreaConfig = [
          { prov: "北京市", city: "市辖区", area: "朝阳区" }
        ];
      }
    }

    this.selectedAreaConfig.map(item => {
      this.selectedArea.push(item.area);
    });
  },
  methods: {
    ...mapMutations("publish", {
      saveServiceForm: "saveServiceForm",
      saveSkillForm: "saveSkillForm"
    }),
    /**
     * 选择省
     */
    selectProv(index) {
      this.config.proAffix = index;
      this.config.cityAffix = 0;
      this.config.areaAffix = 0;
    },
    /**
     * 选择市
     */
    selectCity(index) {
      this.config.cityAffix = index;
    },
    /**
     * 选中 反选
     */
    toggleSelect(area, areaIndex) {
      if (this.selectedArea.indexOf(area.name) > -1) {
        // 取消选中
        let idx = this.selectedArea.findIndex(value => value === area.name);
        this.selectedArea.splice(idx, 1);
        this.selectedAreaConfig.splice(idx, 1);
      } else {
        // 选中
        if (this.selectedArea.length >= 99) {
          return this.$Toast("最多选择99个区域");
        }
        this.selectedArea.push(area.name);
        this.selectedAreaConfig.push({
          prov: this.areaData[this.config.proAffix].name,
          city: this.areaData[this.config.proAffix].city[this.config.cityAffix]
            .name,
          area: this.areaData[this.config.proAffix].city[this.config.cityAffix]
            .area[areaIndex].name
        });
      }
    },
    /**
     *  全选 全不选
     */
    toggleSelectAll(areas) {
      if (this.selectedAllFlag) {
        let areas = JSON.parse(
          JSON.stringify(
            this.areaData[this.config.proAffix].city[this.config.cityAffix].area
          )
        );
        // 全不选
        areas.map(area => {
          if (this.selectedArea.indexOf(area.name) > -1) {
            let idx = this.selectedArea.findIndex(value => value === area.name);
            this.selectedArea.splice(idx, 1);
            this.selectedAreaConfig.splice(idx, 1);
          }
        });
      } else {
        let areas = JSON.parse(
          JSON.stringify(
            this.areaData[this.config.proAffix].city[this.config.cityAffix].area
          )
        );
        areas.map(area => {
          if (this.selectedArea.indexOf(area.name) === -1) {
            this.selectedArea.push(area.name);
            this.selectedAreaConfig.push({
              prov: this.areaData[this.config.proAffix].name,
              city: this.areaData[this.config.proAffix].city[this.config.cityAffix].name,
              area: area.name
            });
          }
        });
        // 全选
      }
    },
    /**
     * 保存选中的省市区
     */
    saveArea() {
      if (this.selectedArea.length > 99) {
        return this.$Toast("最多选择99个区域");
      }
      let temp = {};
      switch (this.formType) {
        case "service":
          temp = JSON.parse(JSON.stringify(this.serviceForm));
          temp.site = JSON.parse(JSON.stringify(this.selectedAreaConfig));
          this.saveServiceForm(temp);
          this.$router.back();
          break;
        case "skill":
          temp = JSON.parse(JSON.stringify(this.skillForm));
          temp.site = JSON.parse(JSON.stringify(this.selectedAreaConfig));
          this.saveSkillForm(temp);
          this.$router.back();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.publish-area-container {
  height: 100vh;
  .area-save {
    width: 993px;
    height: 132px;
    position: fixed;
    left: 66px;
    bottom: 60px;
    text-align: center;
    background-image: url(../../assets/img/publish/area-btn.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 132px;
    font-size: 48px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.publish-area {
  height: 100%;
  .prov-container {
    width: 280px;
    padding-bottom: 240px;
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
    .prov {
      padding: 60px 45px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(45, 49, 66, 1);
      line-height: 66px;
      &.active {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(19, 19, 20, 1);
        background-color: #f4f6fa;
      }
    }
  }
  .city-container {
    width: 420px;
    padding-bottom: 240px;
    background: rgba(244, 246, 250, 1);
    height: 100%;
    overflow-y: auto;
    .city {
      padding: 60px 40px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #2d3142;
      background: rgba(244, 246, 250, 1);
      line-height: 66px;
      &.active {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2d3142;
        background: rgba(235, 237, 240, 1);
      }
    }
  }
  .area-container {
    width: 425px;
    padding-bottom: 240px;
    background: #ebedf0;
    height: 100%;
    overflow-y: auto;
    .area {
      padding: 60px 40px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #2d3142;
      background: #ebedf0;
      line-height: 66px;
      .area-name {
        flex: 1;
      }
      .area-check {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 30px;
        margin-left: 40px;
        &.active {
          background-image: url(../../assets/img/publish/check.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      &.active {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2d3142;
        background: rgba(235, 237, 240, 1);
      }
    }
  }
}
</style>
