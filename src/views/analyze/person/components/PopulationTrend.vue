<template>
  <div class="population-trend">
    <div class="fontsize18">人口趋势</div>
    <div>
      <div class="radar-container" id="container"></div>
      <div class="line-container">
        <line-chart
          v-if="inOutData.length>0"
          :axisData="inOutAxis"
          :chartData="inOutData"
          :legend="legend"
        ></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import lineChart from "@/components/LineChart";
import resize from "@/components/Charts/mixins/resize";

import { personAction, personProperty } from "@/api/analyze/person";

import { changeArray } from "@/utils/index";
import { formatArray } from '../../../../utils';

let radarTimer = null;

export default {
  mixins: [resize],
  name: "PopulationTrend",
  props: {},
  components: {
    lineChart
  },
  data() {
    return {
      chart: null,
      legend: [],
      personPropertyData: [],
      inOutAxis: [],
      inOutData: []
    };
  },
  computed: {},
  created() {
    this.loadPersonProperty();
    this.getPersonProperty();
  },
  mounted() {
    // this.getPersonProperty()
    // this.loadPersonProperty();
  },
  beforeDestroy() {
    clearInterval(radarTimer);
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("container"));

      let option = {
        tooltip: {},
        radar: {
          // shape: "circle",

          center: ["50%", "50%"],
          radius: "60%",
          name: {
            textStyle: {
              color: "rgba(255,255,255,0.7)"
              // padding: [3, 2]
            }
          },
          indicator: this.personPropertyData,
          splitLine: {
            lineStyle: {
              color: ["rgba(255,170,35,0.2)"]
            }
          },
          splitNumber: 5,
          splitArea: {
            // show: false
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,170,35,0.12)"
                },
                {
                  offset: 0.5,
                  color: "rgba(255,170,35,0.02)"
                },
                {
                  offset: 1,
                  color: "rgba(255,170,35,0.12)"
                }
              ])
            }
          },
          axisLine: {
            lineStyle: {
              color: ["rgba(255,170,35,0.24)"]
            }
          }
        },
        series: [
          {
            type: "radar",
            label: {
              normal: {
                position: "right",
                show: true
              }
            },
            lineStyle: {
              color: "#FC4F55"
            },
            symbol: "none",
            itemStyle: {
              color: "#FFAA23"
            },
            areaStyle: {
              opacity: 0.4
            },
            data: [
              {
                value: formatArray(this.personPropertyData,'value'),
                name: "人口趋势（2020）",

                areaStyle: {
                  opacity: 0.3,
                  color: "#FC4F55"
                }
              }
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2000
          }
        ]
      };
      this.chart.setOption(option);
      clearInterval(radarTimer);
      this.startMove(option);
      this.chart.on("mouseover", param => {
        clearInterval(radarTimer);
      });
      this.chart.on("mouseout", param => {
        this.startMove(option);
      });
    },
    startMove(option) {
      clearInterval(radarTimer);
      radarTimer = setInterval(() => {
        this.chart.clear();
        this.chart.setOption(option);
      }, 8000);
    },
    loadPersonProperty() {
      personAction().then(res => {
        if (res.code===2000) {
          let data=[]
          for(let k in res.data){
            if(k!=='check'&&k!=='family_count'){
              data.push(res.data[k])
            }
          }
          this.personPropertyData = changeArray(
            data,
            ["name", "person_house_count"],
            ["name", "value"]
          );
          this.personPropertyData.forEach(item=>{
            item.max=Math.max(...formatArray(this.personPropertyData,'value'))
          })
          this.initCharts();
        }
      });
    },
    getPersonProperty() {
      this.inOutData = [];
      return new Promise(resolve => {
        personProperty().then(res => {
          if (res.code === 2000) {
            this.inOutAxis = Object.keys(res.data);
            let tempData = Object.values(res.data);
            for (let i = 0; i < 2; i++) {
              let temp = [];
              tempData.forEach(element => {
                temp.push(element[i].person_count);
              });
              this.legend.push(tempData[0][i].name);
              this.inOutData.push(temp);
            }
            resolve(true)
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "@/assets/";
.population-trend {
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 16px;
  padding: 14px;

  & > div:nth-child(2) {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    height: 80%;

    .radar-container {
      position: relative;
      width: 40%;
      height: 100%;
    }

    .line-container {
      position: relative;
      width: 60%;
      height: 100%;
    }
  }
}
</style>
