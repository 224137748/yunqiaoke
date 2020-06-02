<template>
  <div>
    <div class="cityList">
      <div class="result" v-if="result">
        <div class="item" v-for="(item,i) in newArr" :key="i"><span><img src="../../../assets/img/mine/search.png" alt="" @click="getAdd(item)">{{item}}</span></div>
      </div>
      <div class="black" v-if="black" @click="outInput"></div>
      <mt-index-list>
        <mt-index-section index="#" class="hotP">
          <div class="citySerch">
            <img src="../../../assets/img/mine/search.png" alt="">
            <input type="text" placeholder="搜索" v-model="searchVal" @blur="outInput" @focus="getInput">
          </div>
          <div class="title">当前定位</div>
          <div class="hotCity">
            <div class="item" @click="getAdd(locat.city)"><span><img src="../../../assets/img/buddy/diqu.png" alt="">{{locat.city}}</span></div>
          </div>
        </mt-index-section>
        <mt-index-section index="热" class="hotP">
          <div class="title">热门城市</div>
          <div class="hotCity">
            <div v-if="hotCity.length">
              <div class="item" v-for="(item,i) in hotCity" :key="i" @click="getAdd(item.name)"><span>{{item.name}}</span></div>
            </div>
          </div>
        </mt-index-section>
        <mt-index-section v-for="(letter,index) in arr" :key="index" :index="letter.initial">
          <div v-for="(cityName,i) in letter.list" :key="i" class="cell" @click="getAdd(cityName.name)">{{cityName.name}}</div>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
import city from "../../../components/home/city.json";
import { getHotCity } from "../../../api/buddy.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      searchVal: "",
      arr: [], // 默认城市数据
      newArr: [], // 用户搜索时返回的数据
      time: "",
      black: false,
      result: false,
      locat: "", // 当前定位
      hotCity: [] // 热门城市
    };
  },
  watch: {
    searchVal(newVal, oldVal) {
      clearTimeout(this.time);
      var that = this;
      that.time = setTimeout(function() {
        that.newArr = [];
        if (newVal === "") {
          that.newArr = [];
        } else {
          for (var i = 0; i < city.city.length; i++) {
            for (var j = 0; j < city.city[i].list.length; j++) {
              if (city.city[i].list[j].name.indexOf(newVal) !== -1) {
                that.newArr.push(city.city[i].list[j].name);
              }
            }
          }
        }
      }, 1000);
    }
  },
  async mounted() {
    this.arr = city.city;
    this.getHCity();
    var getLoc = await this.$bridge.call("get_location");
    this.locat = getLoc;
  },
  methods: {
    getAdd(add) {
      var that = this;
      window.AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new window.AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: add
        });
        geocoder.getLocation(add, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            var lat = result.geocodes[0].location.lat;
            var lng = result.geocodes[0].location.lng;
            var arr = { city: add, lat: lat, lng: lng };
            that.setAddStatus(arr);
            that.$router.go(-1);
          }
        });
      });
    },
    ...mapMutations("buddy", ["setAddStatus"]),
    // 热门城市
    async getHCity() {
      var params = {
        page: 1,
        per_page: 8
      };
      var res = await getHotCity(params);
      try {
        if (res.error_code === 0) {
          this.hotCity = res.data.data;
        } else {
          console.log(res.error_msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 搜索框获取焦点
    getInput() {
      this.black = true;
      this.result = true;
    },
    // 搜索框失去焦点
    outInput() {
      this.black = false;
      this.result = false;
      this.searchVal = "";
      this.newArr = [];
    }
    // handlChange() {
    //   if (this.searchVal === "") {
    //     this.arr = city;
    //     return false;
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
  @import "../../../assets/css/city.css";
</style>
