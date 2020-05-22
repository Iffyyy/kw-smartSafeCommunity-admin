<template>
  <div class="user-car">
    <p class="subtitle text-center infoColor fontsize22 paddtop20 font-wight-bold">车辆信息</p>
    <div class="user-car-list" v-show="visible == true">
      <div
        class="user-list-item"
        v-for="(item ,index) in gridData"
        @click="getCarItem(item,index+1)"
      >
        <img class="car-bg" src="../../../../assets/analyze/carbg.png" />
        <p class="infoColor fontsize16 paddleft">车辆{{index+1}}</p>
        <div class="center">
          <div class="user-img">
            <img :src="item.picture" alt="车辆图片" />
          </div>
          <div class="user-info fontsize14">
            <div>
              <p>车主：{{item.name}}</p>
              <p>颜色：{{item.color}}</p>
              <p>车型：{{item.car_brand}}</p>
              <p>车牌号：{{item.car_number}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-car-list user-car-list-ed" v-show="visible == false">
      <div class="user-list-item" @click="visible = true">
        <img class="car-bg" src="../../../../assets/analyze/carbg.png" />
        <p class="infoColor fontsize16">车辆{{selCar.index}}</p>
        <div class="center">
          <div class="user-img">
            <img :src="selCar.picture" alt="车辆图片" />
          </div>
          <div class="user-info fontsize14">
            <div>
              <p>车主：{{selCar.name}}</p>
              <p>颜色：{{selCar.color}}</p>
              <p>车型：{{selCar.car_brand}}</p>
              <p>车牌号：{{selCar.car_number}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="car-plug-san">
        <div class="access-container">
          <div class="access-list">
            <div v-for="item in carAccessInfoList" :key="item.id">
              <img :src="item.pic_qjurl" />
              <div>
                <div>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <div></div>
                  <div></div>
                  <!-- 信息 -->
                  <div>
                    <div>
                      <span>姓名：{{item.name}}</span>
                      <span
                        class="user-house-type user-house-type1"
                        v-if="item.car_come_type == '出去'"
                      >{{item.car_come_type}}</span>
                      <span
                        class="user-house-type user-house-type2"
                        v-if="item.car_come_type == '进入'"
                      >{{item.car_come_type}}</span>
                    </div>
                    <span>出入时间：{{item.entrace_time}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carInfo, carAccessInfo } from "@/api/archives";

export default {
  name: "car",
  props: {
    userId: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      visible: true,
      gridData: [],
      carAccessInfoList: [],
      page: 1,
      pageCount: 0,
      selCar: {}
    };
  },
  methods: {
    getInitialData() {
      // alert(this.userId)
      let data = {
        person_id: this.userId
      };
      return new Promise((resolve, reject) => {
        carInfo(data).then(
          res => {
            console.log(res);
            this.gridData = res.data;
            this.$store.commit("archives/SET_LAYOUTFLAG", 3);
            resolve(true);
          },
          err => {
            reject();
          }
        );
      });
    },
    getCarItem(item, index) {
      this.visible = false;
      this.selCar = item;
      this.selCar.index = index;
      console.log(item.id);
      let data = {
        person_id: this.userId,
        car_id: item.id,
        number: 10,
        page: this.page
      };
      carAccessInfo(data).then(res => {
        console.log(res);
        this.carAccessInfoList = res.data.data;
        this.pageCount = res.data.sumPage;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.user-car {
  width: 100%;
  /*max-width: 405px;*/
  padding: 0 20px;
  /*height: 181px;*/
  height: 70vh;
  overflow: scroll;
}

.pla {
  width: 100%;
  height: 8%;
  position: relative;
  z-index: 10;
}

.user-car-list {
  /*position: relative;*/
  opacity: 1;
  height: 88%;
  /*padding-top: 8%;*/
  animation: all 1s linear forwards;
  /*margin-top: 8%;*/
  overflow-y: scroll;
}

.user-car-list-ed {
  /*height: 100%;*/
  overflow: hidden;
}

.car-plug-san {
  height: 100%;
}

.access-container {
  position: relative;
  margin-top: 20px;
  height: 0;
  opacity: 0;
  overflow-y: scroll;
  /* width: 36%; */
  animation: setHeight 0.3s ease-in-out forwards;

  > div.access-list {
    width: 40%;
    position: absolute;
    border-right: 2px solid $navText;

    > div {
      width: 94%;
      height: 110px;
      position: relative;

      > img {
        width: 100%;
        height: 85px;
      }

      > div {
        position: absolute;
        width: 160%;
        height: 87px;
        right: -164%;
        top: 0;
        display: flex;
        /* justify-content: space-between; */

        > div:nth-child(1) {
          width: 20px;
          height: 100%;
          position: relative;

          > span {
            display: inline-block;
            position: absolute;
            border-radius: 50%;
            background: $navText;
          }

          > span:nth-child(1) {
            width: 7px;
            height: 7px;
            top: 39px;
          }

          > span:nth-child(2) {
            width: 13px;
            height: 13px;
            opacity: 0.5;
            left: -3px;
            top: 36px;
          }
        }

        > div:nth-child(2) {
          width: 86.5%;
          height: 100%;
          border: 2px solid $navText;
          border-radius: 8px;
          margin-left: 14px;
          background: rgba(4, 229, 255, 0.09);
          position: relative;
          padding: 8px;

          .user-house-type {
            height: 19px;
          }

          > div:nth-child(1) {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-right: 20px solid $navText;
            border-bottom: 8px solid transparent;
            position: absolute;
            top: 32px;
            left: -20px;
          }

          > div:nth-child(2) {
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-right: 18px solid #042f48;
            border-bottom: 6px solid transparent;
            position: absolute;
            top: 34px;
            left: -18px;
          }

          > div:nth-child(3) {
            height: 100%;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            > div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
}

@keyframes setHeight {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 73%;
    opacity: 1;
  }
}

@keyframes setOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<style scoped lang="scss">
.user-list-item:first-child {
  margin-top: 0;
}

.user-list-item {
  width: 100%;
  height: 25.7%;
  position: relative;
  cursor: pointer;
  transition: all 0.1s linear;
  margin-top: 26px;

  .paddleft {
    padding-left: 8px;
  }

  .car-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  p {
    position: relative;
    z-index: 2;
    padding-bottom: 4px;
  }

  .center {
    height: 80%;
    position: relative;
    z-index: 2;
    padding-left: 4%;
  }

  .user-img {
    width: 48%;
    height: 82%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-info {
    width: 43%;
    height: 80%;
    color: #fff;
    padding: 0 10px;
    /*margin-top: 10%;*/
    position: relative;

    p {
      margin-bottom: 6px;
    }
  }
}

.user-list-item:hover {
  /*box-shadow: rgba(0, 204, 255, .45) 0px 0px 60px inset;*/
  /*transform: scale(1.001);*/
  box-shadow: rgba(0, 204, 255, 0.45) 0px 0px 40px,
    rgba(0, 204, 255, 0.45) 0px 0px 40px inset;
}
</style>
<style>
.el-popover {
  width: 405px;
  top: 191px;
}
</style>
