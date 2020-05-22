<template>
  <div class="sex-age">
    <div class="pie-container" id="el" />
    <div class="bar-container" id="barContainer"></div>
  </div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";

import { ageSection } from "@/api/analyze/person";
import { formatArray } from "../../../../utils";

const colorList = [
  "rgb(0,204,255)",
  "rgb(38,203,169)",
  "rgb(252,79,85)",
  "rgb(238,255,0)",
  "rgb(255,170,35)"
].reverse();
let timer = null;
export default {
  name: "SexAge",
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      chart: null,
      barChart: null,
      dataIndex: 0,
      ageSectionPieData: [],
      manBarData: [],
      ageSectionData: []
    };
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart();
    //   this.initBarChart();
    // });
    this.getAgeSection().then(res => {
      if (res) {
        this.initChart();
        this.initBarChart();
      }
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    clearInterval(timer);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("el"));
      let option = {
        color: colorList,
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: false,
            radius: ["52%", "74%"],
            center: ["50%", "50%"],
            label: {
              show: true,
              position: "outside",
              textBorderColor: "transparent",
              fontSize: 14,
              formatter: function(data) {
                return `{a|${data.percent.toFixed(0)}%}`;
              },
              rich: {
                a: {
                  fontWeight: "bold",
                  fontSize: 16
                  // fontFamily:'Microsoft YaHei'
                }
              }
            },
            labelLine: {
              show: false,
              length: 1
            },
            itemStyle: {
              borderType: "solid",
              borderWidth: "5",
              borderColor: "rgba(16, 30, 46, 1)"
            },
            data: formatArray(this.ageSectionData, "count"),
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      };
      this.chart.clear();
      this.chart.setOption(option);
      this.startAnimation(this.chart);
      this.chart.on("mouseover", param => {
        clearInterval(timer);
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
      clearInterval(timer);
      timer = setInterval(() => {
        chartChild.dispatchAction({
          type: "downplay",
          seriesIndex: 0
        });
        this.dataIndex == 4 ? (this.dataIndex = 0) : this.dataIndex++;
        // console.log(this.dataIndex)
        chartChild.dispatchAction({
          type: "highlight",
          dataIndex: this.dataIndex
        });
      }, 2000);
    },
    initBarChart() {
      this.barChart = echarts.init(document.getElementById("barContainer"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: (params, ticket, callback) => {
            if (params.length === 2) {
              let count = this.ageSectionData.find(
                item => item.name === params[0].axisValue
              ).count;
              let manCount = ((params[0].value * count) / 1000).toFixed(0) | 0;
              return `${params[0].seriesName}:${manCount}<br />${
                params[1].seriesName
              }:${(count - manCount) | 0}`;
            }
            return;
          }
        },
        legend: {
          data: ["男", "女"],
          top: "4%",
          right: "10%",
          icon: "none",
          textStyle: {
            color: "rgba(255,255,255,0.9)",
            fontSize: "12"
          }
        },
        // color: ["#04E5FF", "rgba(4,229,255,0.2)"],
        grid: {
          left: "6%",
          right: "4%",
          bottom: "-10%",
          containLabel: true,
          width: "90%",
          height: "94%"
        },
        xAxis: {
          type: "value",
          show: false
        },
        yAxis: {
          type: "category",
          offset: 10,
          align: "left",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(255,255,255,0.8)",
              fontSize: 13
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: formatArray(this.ageSectionData, "name")
        },
        series: [
          {
            name: "男",
            type: "bar",
            label: {
              show: false,
              position: "insideRight"
            },
            barWidth: 14,
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                },
                barBorderRadius: 11
              }
            },
            data: this.manBarData
          },
          {
            name: "女",
            type: "bar",
            label: {
              show: false,
              position: "insideRight"
            },
            barWidth: 14,
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: function(params) {
                  const colorsList = [
                    "rgba(0,204,255,0.45)",
                    "rgba(38,203,169,0.45)",
                    "rgba(252,79,85,0.45)",
                    "rgba(238,255,0,0.45)",
                    "rgba(255,170,35,0.45)"
                  ].reverse();
                  return colorsList[params.dataIndex];
                },
                barBorderRadius: 11
              }
            },
            data: [1000, 1000, 1000, 1000, 1000]
          }
        ]
      };

      this.barChart.setOption(option);
    },
    getAgeSection() {
      return new Promise(resolve => {
        ageSection().then(res => {
          if (res.code === 2000) {
            for (let key in res.data) {
              const options = {
                "0-6": "0-6岁  学龄前",
                "7-13": "7-13岁  中小学",
                "14-17": "14-17岁  高 中",
                "18-49": "18-49岁  青年期",
                "<50": "50岁以上  老年人"
              };
              res.data[key].name = options[key];
            }
            this.ageSectionData = Object.values(res.data).reverse();
            this.manBarData = this.ageSectionData.map(item => {
              return (1000 / item.count) * item.sex;
            });
            resolve(true);
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

.sex-age {
  width: 100%;
  height: 100%;
  position: relative;

  .pie-container {
    position: relative;
    height: 50%;
  }

  .bar-container {
    position: relative;
    height: 50%;
  }
  .total-num {
    position: absolute;
    z-index: 999;
    right: 20px;
    bottom: 64px;
    font-size: 14px;

    & > span {
      font-size: 26px;
      font-family: "Dinpro";
      color: #04e5ff;
      vertical-align: baseline;
    }
  }
}
</style>
