<template>
  <div class="incident-container">
    <community-info></community-info>
    <div class="row-one">
      <div class="left">
        <TypePie>
        </TypePie>
      </div>
      <div class="bg shadow right">
        <!--          <img src="../../../assets/" alt="">-->
        <div class="line-title center">
          <span class="infoColor">所有事件趋势</span>
          <div class="line-icon fontsize16">
            <p @click="thisLineShowOrHide(1)">
              <span class="icon" :class="lineShow.indexOf(1) >= 0 ?'icon3':'icon3-n'"></span><span>居民事件</span>
            </p>
            <p @click="thisLineShowOrHide(2)">
              <span class="icon" :class="lineShow.indexOf(2) >= 0 ?'icon2':'icon2-n'"></span><span>公共事件</span>
            </p>
            <p @click="thisLineShowOrHide(3)">
              <span class="icon " :class="lineShow.indexOf(3)>= 0 ?'icon1':'icon1-n'"></span><span>设备事件</span>
            </p>
          </div>

        </div>
        <div class="line">
          <lineChart width="80%" :typeCount="lineShow" name="EventTrend"></lineChart>

        </div>
      </div>
    </div>
    <div class="row-two">
      <el-row :gutter="24">
        <el-col :span="8">
          <div>
            <img src="../../../assets/analyze/rate-bg.png" class="pal" alt="">
            <p class="subtitle infoColor fontsize20">居民事件类型占比</p>
            <div class="pie">
              <RateBar :proportion="personProportion" :sumOf="sumOf<=0?100:sumOf" name="personnel1"></RateBar>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <img src="../../../assets/analyze/rate-bg.png" class="pal" alt="">
            <p class="subtitle infoColor fontsize20">公共事件类型占比</p>
            <div class="pie">
              <RateBar :proportion="commonalityProportion" :sumOf="sumOf<=0?100:sumOf" name="personnel3"
                       :color="['rgba(255, 170, 35, 1)','rgba(255, 170, 35, .31)']"></RateBar>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <img src="../../../assets/analyze/rate-bg.png" class="pal" alt="">
            <p class="subtitle infoColor fontsize20">设备事件类型占比</p>
            <div class="pie">
              <RateBar :proportion="equipmentProportion" :sumOf="sumOf<=0?100:sumOf" name="personnel2"
                       :color="['rgba(38, 203, 169, 1)','rgba(38, 203, 169, .31)']"></RateBar>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import totalBg from "@/assets/common/device-total.png";
  import carTrend from "@/assets/analyze/car-trend.png";
  import rateBg from "@/assets/analyze/rate-bg.png";

  import lineChart from "./components/linechart";
  import TypePie from "./components/typepie";
  import RateBar from "@/components/RateBar";

  import CommunityInfo from '../components/CommunityInfo'

  export default {
    components: {lineChart, TypePie, RateBar, CommunityInfo},
    data() {
      return {
        imgS: {
          totalBg: totalBg,
          carTrend: carTrend,
          rateBg: rateBg,
        },
        lineShow: [1],
        commonalityProportion: 0,//公共设备事件类型占比
        personProportion: 0,//居民事件类型占比
        equipmentProportion: 0,//设备事件类型占比
        sumOf: 0
      };
    },
    // filters:{
    //   isTrue(value){
    //
    //   }
    // },
    created() {
      this.get_typePieValue()

    },
    methods: {
      thisLineShowOrHide(index) {
        // console.log(this.lineShow)
        let lineShow = this.lineShow
        let flag = lineShow.indexOf(index)
        if (flag >= 0) {
          if (lineShow.length == 1) {
            this.lineShow = lineShow
            return
          }
          lineShow.splice(flag, 1)
        } else {
          lineShow.push(index)
        }
        // lineShow.some(a, b => a - b)
        this.lineShow = lineShow.sort((a, b) => a - b)
        console.log(this.lineShow)
      },
      get_typePieValue() {
        let pieData = JSON.parse(sessionStorage.getItem('TypePieValue'));
        console.log(pieData)
        let data = pieData.data
        let sum = 0;
        for (let i in data) {
          let typeId = data[i].id
          switch (typeId) {
            case 1:
              this.personProportion = data[i].event_info_count
              break;
            case 2:
              this.commonalityProportion = data[i].event_info_count
              break;
            case 3:
              this.equipmentProportion = data[i].event_info_count
              break;
          }
          sum += data[i].event_info_count
        }
        this.sumOf = sum
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/variables.scss";

  $imgUrl: "../../assets/";
  .incident-container {
    height: 100%;

    .device-main {
      position: relative;
      display: flex;
      justify-content: space-around;
      height: 13.44%;

      & > img {
        width: 100%;
        height: 100%;
      }

      .base-line {
        position: absolute;
        $width: 90%;
        width: $width;
        height: 2px;
        background: radial-gradient(
            circle,
            rgba(4, 229, 255, 1) 0%,
            rgba(4, 229, 255, 0) 100%
        );
        opacity: 1;
        top: 50%;
      }

      .total-list {
        position: absolute;
        width: 100%;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        height: 100%;
        font-size: 18px;

        .total-item {
          display: flex;
          height: 64%;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

  .row-one {
    height: 45%;
    overflow: hidden;
    margin-top: 1%;

    .left {
      float: left;
      width: 39.6%;
      height: 100%;

      .type-pie {
        .subtitle {
          color: #0cf !important;
        }
      }
    }

    .right {
      height: 100%;
      float: right;
      width: 59%;

      .line-title {
        width: 80%;
        height: 60px;
        padding-left: 30px;
        margin-top: 2px;
      }

      .line-icon {
        width: 70%;
        min-width: 400px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        z-index: 5;

        p {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .icon {
          display: inline-block;
          width: 13px;
          height: 13px;
          padding: 1px;
          /*border-radius: 50%;*/
          margin-right: 6px;
        }

        .icon:after {
          content: '';
          display: inline-block;
          width: 7px;
          height: 7px;
          position: relative;
          top: -9px;
          left: 1px;
        }

        .icon1 {
          border: 1px solid #26CBA9;
          /*background-color: #26CBA9;*/
        }

        .icon1:after {
          background-color: #26CBA9;
        }

        .icon2:after {
          background-color: #FFAA23;
        }

        .icon3:after {
          background-color: #FC4F55;
        }

        .icon2 {
          border: 1px solid #FFAA23;
          /*background-color: #FFAA23;*/
        }

        .icon3 {
          border: 1px solid #FC4F55;
          /*background-color: #FC4F55;*/
        }

        .icon1-n {
          border: 1px solid rgba(38, 203, 169, 1);
        }

        .icon2-n {
          border: 1px solid rgba(255, 170, 35, 1);
        }

        .icon3-n {
          border: 1px solid rgba(252, 79, 85, 1);
        }
      }

      .line {
        width: 100%;
        height: 100%;
        position: relative;
        top: -47px;
      }
    }
  }

  .row-two {
    height: 36%;
    margin-top: 1%;

    div {
      height: 100%;
      position: relative;

      p {
        position: relative;
        z-index: 5;
        padding-left: 35px;
        padding-top: 25px;
        font-weight: 400;
        padding-bottom: 0;
      }

      .pie {
        height: calc(100% - 80px);
        margin-top: 9px;
      }

      .pal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }


</style>
<style lang="scss">
  .incident-container {
    .query-time {
      max-width: 280px;
      bottom: 50px !important;
    }

    .type-pie .subtitle {
      color: #0cf;
      font-size: 20px;
      padding-top: 10px;
    }
  }
</style>
