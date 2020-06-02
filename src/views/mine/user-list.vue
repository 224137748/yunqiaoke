<template>
  <!-- 推荐用户列表 -->
  <div class="uList">
    <div class="box">
      <div class="item">
        <div class="userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="right">
          <div class="ft">
            <p>Tina</p>
            <div class="short">
              <span>创意策略</span>
              <span>内容写作</span>
            </div>
          </div>
          <div class="gz">关注<img src="../../assets/img/mine/jia.png" alt=""></div>
          <div class="delete"><img src="../../assets/img/mine/X.png" alt=""></div>
        </div>
      </div>
      <div class="item">
        <div class="userImg"><img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4090061760,3566002114&fm=26&gp=0.jpg" alt=""></div>
        <div class="right">
          <div class="ft">
            <p>Tina</p>
            <div class="short">
              <span>创意策略</span>
              <span>内容写作</span>
            </div>
          </div>
          <div class="gz">关注<img src="../../assets/img/mine/jia.png" alt=""></div>
          <div class="delete"><img src="../../assets/img/mine/X.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
  .uList{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #FFFFFF;
    .box{
      width: 92%;
      margin: 0 auto;
      .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.444444rem 0;
        position: relative;
        &::after{
          content: "";
          display: inline-block;
          width: 100%;
          height: 0.026666rem;
          background-color: #EAEAEA;
          position: absolute;
          bottom: 0;
          left: 1.44rem;
        }
        .right{
          flex: 1;
          display: flex;
          height: 0.373333rem;
          align-items: center;
          justify-content: space-between;
          height: 1.12rem;
          &::after{
            content: "";
          }
          .delete{
            width: 0.266666rem;
            height: 0.266666rem;
            margin-left: 0.337777rem;
            img{
              width: 100%;
            }
          }
          .gz{
            width: 1.6rem;
            height: 0.711111rem;
            line-height: 0.711111rem;
            border-radius: 0.711111rem;
            border: 0.026666rem solid #7265E3;
            font-size: 0.32rem;
            color: #7265E3;
            text-align: center;
            img{
              width: 0.195555rem;
              margin-left: 0.088888rem;
            }
          }
          .ft{
            flex: 1;
            line-height: 1;
            padding-left: 0.32rem;
            .short{
              display: flex;
              span{
                height: 0.426666rem;
                line-height: 0.426666rem;
                font-size: 0.213333rem;
                color: #9C9EB9;
                text-align: center;
                display: inline-block;
                margin-right: 0.16rem;
                background-color: #F4F6FA;
                border-radius: 0.426666rem;
                padding: 0 0.213333rem;
                &:last-child{
                  margin-right: 0;
                }
              }
            }
            p{
              font-size: 0.426666rem;
              color: #000000;
              padding-top: 0.115555rem;
            }
          }
        }
        .userImg{
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
