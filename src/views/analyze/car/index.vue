<template>
  <div class="car-container">
    <community-info></community-info>
    <el-row :gutter="24" class="echarts-list">
      <el-col :span="10" class="car-flow">
        <img :src="imgS.carTrend"/>
        <div>
          <span>车流趋势</span>
          <div>
            <div>今日</div>
            <line-chart
              v-if="todayTrendData.length>0"
              :legend="legend"
              :axisData="todayTrendAxis"
              :chartData="todayTrendData"
              name="today"
              axisName="日期"
            ></line-chart>
          </div>
          <div>
            <div>近7天</div>
            <line-chart
              v-if="weekTrendData.length>0"
              name="week"
              width="80%"
              :axisData="weekTrendAxis"
              :chartData="weekTrendData"
              axisName="日期"
            ></line-chart>
          </div>
          <div>
            <div>近30天</div>
            <line-chart
              v-if="monthTrendData.length>0"
              name="month"
              width="80%"
              :axisData="monthTrendAxis"
              :chartData="monthTrendData"
              axisName="日期"
            ></line-chart>
          </div>
        </div>
      </el-col>
      <el-col :span="14" class="right-part">
        <div>
          <el-col :span="12">
            <img :src="imgS.rateBg"/>
            <div>
              <span>车位空置率</span>
              <div>
                <rate-bar :proportion="placeVacancyRateData.placeNumber-placeVacancyRateData.carNumber"
                          :sumOf="placeVacancyRateData.placeNumber"></rate-bar>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <img :src="imgS.rateBg"/>
            <div>
              <span>入口车流占比</span>
              <div>
                <in-out :chartData="entryScaleData"></in-out>
                <el-radio-group v-model="timeType" class="type-radio" @change="handleCarTrendChange">
                  <el-radio :label="1">今日</el-radio>
                  <el-radio :label="2">近7天</el-radio>
                  <el-radio :label="3">近30天</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-col>
        </div>
        <div>
          <!--          <img/>-->
          <!--          <div>-->
          <!--            <div>车辆近期出入统计</div>-->
          <PersonBar></PersonBar>
          <!--          </div>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import totalBg from "@/assets/common/device-total.png";
  import carTrend from "@/assets/analyze/car-trend.png";
  import rateBg from "@/assets/analyze/rate-bg.png";

  import lineChart from "@/components/LineChart";
  import lineChart1 from "./components/linechart1";
  import PersonBar from "./components/PersonBar";
  import RateBar from "@/components/RateBar";
  import InOut from "./components/InOut";

  import CommunityInfo from '../components/CommunityInfo'

  import {
    trafficTrendsDay,
    trafficTrendsWeek,
    trafficTrendsMonth,
    trafficEntryScale,
    placeVacancyRate
  } from "@/api/analyze/car";

  import {changeArray} from '@/utils/index'

  export default {
    components: {
      lineChart,
      RateBar,
      InOut,
      PersonBar,
      CommunityInfo,
      lineChart1
    },
    data() {
      return {
        // position:{top:2%, right:15%, orient:'horizontal'},
        imgS: {
          totalBg: totalBg,
          carTrend: carTrend,
          rateBg: rateBg
        },
        legend: [],
        todayTrendAxis: [],
        todayTrendData: [],
        weekTrendAxis: [],
        weekTrendData: [],
        monthTrendAxis: [],
        monthTrendData: [],
        todayTrend: {},
        weekTrend: {},
        monthTrend: {},
        timeType: 1,//1：日；2：周；3月
        entryScaleData: [],
        placeVacancyRateData: [],
      };
    },
    created() {
      this.loadTrafficTrendsDay();
      this.loadTrafficTrendsWeek();
      this.loadTrafficTrendsMonth();
      this.loadtrafficEntryScale();
      this.loadPlaceVacancyRate();
    },
    methods: {
      loadTrafficTrendsDay() {
        this.todayTrendData = [];
        trafficTrendsDay().then(res => {
          if (res.code === 2000) {
            // this.todayTrend=this.handleTrendData(this.todayTrend,res.data)
            let data = res.data;
            this.legend = Object.keys(data)
            this.todayTrendAxis = Object.keys(data[this.legend[0]]);
            this.legend.forEach(item => {
              this.todayTrendData.push(Object.values(data[item]))
            })
          }
        });
      },
      loadTrafficTrendsWeek() {
        this.weekTrendData = [];
        trafficTrendsWeek().then(res => {
          if (res.code === 2000) {
            this.legend = Object.keys(res.data)
            this.weekTrendAxis = Object.keys(res.data[this.legend[0]]);
            this.legend.forEach(item => {
              this.weekTrendData.push(Object.values(res.data[item]))
            })
          }
        });
      },
      loadTrafficTrendsMonth() {
        this.monthTrendData = [];
        trafficTrendsMonth().then(res => {
          if (res.code === 2000) {
            this.legend = Object.keys(res.data)
            this.monthTrendAxis = Object.keys(res.data[this.legend[0]]);
            this.legend.forEach(item => {
              this.monthTrendData.push(Object.values(res.data[item]))
            })
          }
        });
      },
      loadtrafficEntryScale() {
        trafficEntryScale({
          timeType: this.timeType
        }).then(res => {
          if (res.code === 2000) {
            this.entryScaleData = changeArray(res.data, ['door_name', 'car_access_records_count'], ['name', 'value'])
          }
        })
      },
      loadPlaceVacancyRate() {
        placeVacancyRate().then(res => {
          this.placeVacancyRateData = res.data
        })
      },
      handleCarTrendChange() {
        this.loadtrafficEntryScale()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/variables.scss";

  $imgUrl: "../../assets/";
  .car-container {
    height: 100%;

    .echarts-list {
      height: 85%;
      margin-top: 1%;
      color: $navTitle;
      font-size: 22px;
      font-weight: 400;

      .car-flow {
        position: relative;
        height: 100%;
        & > img {
          height: 100%;
          width: 100%;
          position: absolute;
        }

        & > div {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          padding: 16px;
          text-align: center;
          & > div {
            height: 30%;
            font-size: 14px;
            color: white;
            position: relative;
            top: -10px;
            left: -20px;
            & > div:nth-child(1) {
              margin-top: 10px;
              position: relative;
              top: 50px;
              text-align: right;
              font-size: 18px;
            }
          }
        }
      }

      .right-part {
        height: 100%;

        & > div:nth-child(2) {
          padding: 0 12px;
          height: 50%;
          margin-top: 1.7%;
        }

        & > div:nth-child(1) {
          height: 47%;
          /*margin-top: 2%;*/

          & > .el-col {
            position: relative;
            height: 100%;

            & > img {
              width: 100%;
              height: 100%;
            }

            & > div {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              padding: 30px 0;

              & > span {
                margin-left: 40px;
              }

              & > div {
                height: 80%;
                width: 100%;

                .type-radio {
                  margin-left: 10%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .car-container {
    .el-col-14 {
      padding-left: 19px!important;
    }
  }
</style>
