<template>
  <div class="line-chart" :id="name"></div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";

export default {
  mixins: [resize],
  name: "LineChart",
  props: {
    legend: {
      type: Array,
      default: () => {
        return ["", ""];
      }
    },
    width:{
      type:String,
      default:'85%'
    },
    axisName: {
      type: String,
      default: "日期/月"
    },
    name: {
      type: String,
      default: "lineContainer"
    },
    chartData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    axisData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      chart: null,
      dataIndex: 0,
      timer: null
    };
  },
  mounted() {
    console.log(this.chartData)
    if (this.chartData.length > 0) {
      this.initCharts(this.chartData);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts(chartData) {
      this.chart = echarts.init(document.getElementById(this.name));

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: [
          {
            data: this.legend,
            top: "2%",
            left: "20%",
            orient: "horizontal",
            icon: "circle",
            textStyle: {
              color: "rgba(255,255,255,0.8)",
              fontSize: "13"
            }
          }
        ],
        grid: [
          {
            top: "24%",
            width: '80%',
            left:'6%',
            height: "70%",
            containLabel: true
          }
        ],
        xAxis: {
          type: "category",
          name: this.axisName,
          nameTextStyle: {
            color: "#00CCFF"
          },
          boundaryGap: false,
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
          axisTick: {
            lineStyle: {
              color: "rgba(0,204,255,0.1)",
              type: "dotted"
            }
          },
          data: this.axisData
        },
        yAxis: {
          type: "value",
          name: "总数/人",
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
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "circle",
            silent: true,
            itemStyle: {
              normal: {
                color: "#FFAA23"
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,170,35,0.4)"
                },
                {
                  offset: 1,
                  color: "rgba(255,170,35,0)"
                }
              ])
            },
            name: this.legend[0],
            emphasis: {
              label: {
                show: true
              }
            },
            data: chartData[0]
          },
          {
            type: "line",
            smooth: true,
            symbol: "circle",
            silent: true,
            itemStyle: {
              normal: {
                color: "#26CBA9"
              }
            },
            emphasis: {
              label: {
                show: true
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(38,203,169,0.4)"
                },
                {
                  offset: 1,
                  color: "rgba(38,203,169,0)"
                }
              ])
            },
            name: this.legend[1],
            data: chartData[1]
          }
        ]
      };
      this.chart.setOption(option);

      this.startAnimation(this.chart);
      this.chart.on("mouseover", param => {
        clearInterval(this.timer);
        this.chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0
        });
        this.chart.dispatchAction({
          type: "highlight",
          dataIndex: param.dataIndex
        });
      });
      this.chart.on("mouseout", _ => {
        this.startAnimation(this.chart);
      });
    },
    startAnimation(chartChild) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        chartChild.dispatchAction({
          type: "downplay",
          dataIndex: this.dataIndex
        });
        this.dataIndex == 5 ? (this.dataIndex = 0) : this.dataIndex++;
        // console.log(this.dataIndex)
        chartChild.dispatchAction({
          type: "highlight",
          dataIndex: this.dataIndex
        });
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "@/assets/";
.line-chart {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
