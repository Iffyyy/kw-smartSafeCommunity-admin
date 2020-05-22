<template>
  <div class="person-container">
    <community-info></community-info>
    <el-row :gutter="24" class="echarts-list">
      <el-col :span="10" class="first-container">
        <div class="top-one">
          <img :src="imgS.indexBg" />
          <div>
            <div>运行指标</div>
            <population-trend></population-trend>
          </div>
        </div>
        <div class="top-two">
          <img :src="imgS.oneBottom" />
          <div>
            <div>
              <span>出入口人流趋势</span>
              <el-radio-group v-model="timeType" @change="getPersonInoutData">
                <el-radio :label="1">今日</el-radio>
                <el-radio :label="2">近7天</el-radio>
                <el-radio :label="3">近30天</el-radio>
              </el-radio-group>
            </div>
            <div>
              <line-chart
                v-if="personOrientedData.length>0"
                :axisData="personOrientedAxis"
                :chartData="personOrientedData"
                :legend="legend"
                name="inOutLine"
              ></line-chart>
            </div>
            <div>
              <PersonBar></PersonBar>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="first-container" :class="{'unfoldList':unfoldListShow}">
        <div class="place-container">
          <NativePlace @updateUnfold="updateUnfold" :unfoldListShow="unfoldListShow"></NativePlace>
        </div>
        <div class="person-bar bg shadow">
          <div>热点楼栋排行</div>
          <div style="height:80%">
            <top-bar></top-bar>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="three-container">
        <div>
          <img :src="imgS.threeTop" />
          <div>
            <div>今日出入类型</div>
            <div>
              <in-out></in-out>
            </div>
          </div>
        </div>
        <div>
          <img :src="imgS.threeBottom" />
          <div>
            <div>性别年龄比例</div>
            <div>
              <sex-age></sex-age>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import totalBg from "@/assets/common/device-total.png";
import indexBg from "@/assets/analyze/index-bg.png";
import oneBottom from "@/assets/analyze/one-bottom.png";
import threeTop from "@/assets/analyze/three-top.png";
import threeBottom from "@/assets/analyze/three-bottom.png";

import PopulationTrend from "./components/PopulationTrend";
import TopBar from "./components/TopBar";
import lineChart from "@/components/LineChart";
import PersonBar from "./components/PersonBar";
import NativePlace from "./components/NativePlace";
import InOut from "./components/InOut";
import SexAge from "./components/SexAge";
import CommunityInfo from "../components/CommunityInfo";

import { personOriented } from "@/api/analyze/person";
import { formatArray } from "@/utils/index";

export default {
  components: {
    PopulationTrend,
    lineChart,
    TopBar,
    PersonBar,
    NativePlace,
    InOut,
    SexAge,
    CommunityInfo
  },

  data() {
    return {
      imgS: {
        totalBg: totalBg,
        indexBg: indexBg,
        oneBottom: oneBottom,
        threeTop: threeTop,
        threeBottom: threeBottom
      },
      legend: ["南门", "北门"],
      unfoldListShow: false,
      timeType: 1, //1 : 当日 ， 2 ：当周 ，3：当月
      personOrientedData: [],
      personOrientedAxis: [],
      personPropertyData: [],
      inOutAxis: [],
      inOutData: []
    };
  },
  created() {
    this.getPersonInoutData();
  },
  methods: {
    updateUnfold() {
      this.unfoldListShow = !this.unfoldListShow;
    },
    getPersonInoutData() {
      this.personOrientedData = [];
      personOriented({
        timeType: this.timeType
      }).then(res => {
        // this.personOrientedData=res.data
        this.legend = Object.keys(res.data);
        this.personOrientedAxis = Object.keys(res.data[this.legend[0]]);
        this.legend.forEach(item => {
          this.personOrientedData.push(Object.values(res.data[item]));
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

$imgUrl: "../../assets/";
.person-container {
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
      font-size: 20px;

      .total-item {
        display: flex;
        height: 64%;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .echarts-list {
    height: 85%;
    margin-top: 1%;
    color: $navText;

    .first-container {
      height: 100%;

      .top-one {
        position: relative;
        height: 42%;
        color: #fff;

        & > img {
          width: 100%;
          height: 100%;
        }

        & > div {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          font-size: 22px;
          font-weight: 400;

          & > div:first-child {
            margin-top: 2%;
            text-align: center;
          }
        }
      }

      .top-two {
        margin-top: 2%;
        position: relative;
        height: 56%;

        & > img {
          width: 100%;
          height: 100%;
        }

        & > div {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          padding: 14px;
          font-size: 18px;
          font-weight: 400;

          & > div:nth-child(1) {
            display: flex;
            justify-content: space-between;
            /*align-items: center;*/
            div:last-child {
              position: absolute;
              top: 26px;
              right: 20px;
            }
          }

          & > div:nth-child(2),
          & > div:nth-child(3) {
            height: 46%;
            width: 100%;
            position: relative;
          }
        }
      }

      .place-container {
        width: 100%;
        height: 70.5%;
        position: relative;
        transition: all 0.8s;
      }

/*<<<<<<< HEAD
        .person-bar {
          margin-top: 2%;
          width: 100%;
          height: 0%;
          padding-top: 0;
          overflow: hidden;
        }
=======*/
      .person-bar {
        margin-top: 2%;
        width: 100%;
        height: 28%;
        padding-top: 16px;
        padding-left: 20px;
        font-weight: 400;
/*>>>>>>> 6f517405c7cff05c4bd641ae3fcf2f9b29acc8a9*/
      }
    }

    /*改变高宽高*/
    .unfoldList {
      .place-container {
        width: 100%;
        height: 100%;
        position: relative;
        transition: all 0.8s;
      }

      .person-bar {
        margin-top: 2%;
        width: 100%;
        height: 0%;
        overflow: hidden;
        padding-top: 0;
      }
    }

    .three-container {
      height: 100%;
      position: relative;

      & > div {
        position: relative;

        & > img {
          width: 100%;
          height: 100%;
        }

        & > div {
          padding: 10px;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          font-size: 16px;
          font-weight: 400;
          text-align: center;

          & > div:nth-child(2) {
            width: 100%;
            height: 94%;
            position: relative;
          }
        }
      }

      & > div:nth-child(1) {
        height: 40%;
      }

      & > div:nth-child(2) {
        margin-top: 6%;
        height: 58%;
      }
    }
  }
}
</style>
<style lang="scss">
.person-container {
  .top-one {
    .population-trend {
      color: #0cf;
    }
  }
  .top-two {
    .fontsize22 {
      font-size: 18px;
      padding-left: 0;
    }

    .fontColor {
      color: #0cf;
    }

    .bg {
      background: transparent;
    }

    .shadow {
      box-shadow: none;
    }

    #personBar {
      top: 4px;
    }
  }
}
</style>
