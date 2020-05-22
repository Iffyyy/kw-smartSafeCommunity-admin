<template>
  <div class="top-bar" id="topBar"></div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";

import { buildingRanking } from "@/api/analyze/person";

import { changeArray,formatArray } from "@/utils/index";

export default {
  mixins: [resize],
  name: "TopBar",
  props: {},
  data() {
    return {
      chart: null,
      timer: null,
      buildingRankingData: []
    };
  },
  created() {
    ;
  },
  mounted() {
    this.getBuildingRanking().then(res=>{
      if(res){
        this.initCharts()
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("topBar"));

      let option = {
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        //   }
        // },
        color: ["#04E5FF", "rgba(4,229,255,0.2)"],
        grid: {
          top: "4%",
          containLabel: true,
          width: "74%",
          height: "84%"
        },
        xAxis: {
          type: "value",
          name: "事件/件",
          nameTextStyle: {
            color: "#00CCFF"
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(255,255,255,0.7)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,204,255,0.1)"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: "rgba(0,204,255,0.1)",
              type: "dotted"
            }
          }
        },
        yAxis: {
          type: "category",
          offset: 6,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(255,255,255,0.9)"
            }
          },
          nameTextStyle: {
            color: "#00CCFF"
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(255,255,255,0.7)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,204,255,0.1)"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: "rgba(0,204,255,0.1)",
              type: "dotted"
            }
          },

          data: formatArray(this.buildingRankingData,'name')
        },
        series: [
          {
            type: "bar",
            barWidth: 12,
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
                barBorderRadius: [0, 10, 10, 0],
                color: function(params) {
                  const color1=new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: "rgba(252,79,85, 1)" },
                  { offset: 0.5, color: "rgba(252,79,85, .4)" },
                  { offset: 1, color: "rgba(252,79,85, 0)" }
                ])
                const color2=new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: "rgba(255, 170, 35, 1)" },
                  { offset: 0.5, color: "rgba(255, 170, 35, .4)" },
                  { offset: 1, color: "rgba(255, 170, 35, 0)" }
                ])
                  const colorsList = [
                    color1,
                    color1,
                    color2,
                  ].reverse();
                  return colorsList[params.dataIndex];
                },

              }
            },
            emphasis: {
              label: {
                show: true,
                position: "right",
                color: "fff"
              }
            },
            data: formatArray(this.buildingRankingData,'value'),

            animationEasing: "cubicInOut",
            animationDuration: 2600
          },
          // {
          //   type: "bar",
          //   barWidth: 12,
          //   barGap: "-100%",
          //   itemStyle: {
          //     emphasis: {
          //       barBorderRadius: 7
          //     },
          //     normal: {
          //       barBorderRadius: [0, 10, 10, 0],
          //       color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          //         { offset: 0, color: "rgba(255, 170, 35, 1)" },
          //         { offset: 0.5, color: "rgba(255, 170, 35, .4)" },
          //         { offset: 1, color: "rgba(255, 170, 35, 0)" }
          //       ])
          //     }
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,
          //       position: "right",
          //       color: "fff"
          //     }
          //   },
          //   data: [70, 182, 200, 0, 0],

          //   animationEasing: "cubicInOut",
          //   animationDuration: 2000
          // }
        ]
      };
      this.chart.setOption(option);

      this.startMove(option);
      this.chart.on("mouseover", param => {
        clearInterval(this.timer);
      });
      this.chart.on("mouseout", param => {
        this.startMove(option);
      });
    },
    startMove(option) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.chart.clear();
        this.chart.setOption(option);
      }, 8000);
    },
    getBuildingRanking() {
      return new Promise(resolve => {
        buildingRanking().then(res => {
          if (res.code === 2000) {
            this.buildingRankingData = changeArray(res.data,['unit_code','access_records_count'],['name','value']).reverse()
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
.top-bar {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
