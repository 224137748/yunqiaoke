<template>
  <!-- 收款信息 -->
  <div class="info">
    <div class="info_box">
      <div class="info_item">
        <div class="info_leftImg"><img src="../../../assets/img/home/weCat.png" alt=""></div>
        <div class="info_center">
          <div class="info_name">时振川</div>
          <div class="info_num">1760000921</div>
        </div>
        <div class="info_right">
          <div class="info_edit"><img src="../../../assets/img/home/edit.png" alt=""></div>
          <div class="info_del"><img src="../../../assets/img/home/del.png" alt=""></div>
        </div>
      </div>
      <div class="info_item">
        <div class="info_leftImg"><img src="../../../assets/img/home/aLi.png" alt=""></div>
        <div class="info_center">
          <div class="info_name">时振川</div>
          <div class="info_num">1760000921</div>
        </div>
        <div class="info_right">
          <div class="info_edit"><img src="../../../assets/img/home/edit.png" alt=""></div>
          <div class="info_del"><img src="../../../assets/img/home/del.png" alt=""></div>
        </div>
      </div>
      <div class="info_item">
        <div class="info_leftImg"><img src="../../../assets/img/home/blank.png" alt=""></div>
        <div class="info_center">
          <div class="info_name">时振川</div>
          <div class="info_num">民生银行 | 1545454545</div>
        </div>
        <div class="info_right">
          <div class="info_edit"><img src="../../../assets/img/home/edit.png" alt=""></div>
          <div class="info_del"><img src="../../../assets/img/home/del.png" alt=""></div>
        </div>
      </div>
    </div>
    <btn :vals="'新建收款信息'" @btnClick="kepUp" class="info-buttom"></btn>
  </div>
</template>

<script>
import btn from "../../../components/home/btn.vue";
export default {
  components: {
    btn
  },
  data() {
    return {

    };
  },
  methods: {
    kepUp() {

    }
  }
};
</script>

<style lang="less" scoped>
  .info{
    width: 92%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    .info-buttom{
      width: 92%;
      position: fixed;
      left: 4%;
      bottom: 1.244444rem;
    }
    .info_box{
      width: 100%;
      .info_item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.848888rem;
        border-bottom: 0.026666rem solid #F5F5F5;
        .info_right{
          width: 1.955555rem;
          img{
            width: 100%;
          }
          .info_del{
            width: 0.577777rem;
            display: inline-block;
            margin-left: 0.533333rem;
          }
          .info_edit{
            width: 0.577777rem;
            height: 0.577777rem;
            display: inline-block;
          }
        }
        .info_center{
          flex: 1;
          padding-left: 0.391111rem;
          line-height: 1;
          .info_name{
            font-size: 0.426666rem;
            color: #2D3142;
            padding-bottom: 0.266666rem;
          }
          .info_num{
            font-size: 0.32rem;
            color: #9C9EB9;
          }
        }
        .info_leftImg{
          width: 0.96rem;
          height: 0.96rem;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
