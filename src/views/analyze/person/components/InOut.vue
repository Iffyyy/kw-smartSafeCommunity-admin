<template>
  <div class="in-out" id="inOut"></div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";

import { getDayPersonAccess } from "@/api/analyze/person";
import { changeArray } from "@/utils/index";

export default {
  mixins: [resize],
  name: "InOut",
  props: {},
  data() {
    return {
      chart: null,
      dayPersonAccessData: []
    };
  },
  created() {
    // this.getDayPersonAccessData();
  },
  mounted() {
    this.getDayPersonAccessData().then(data => {
      if (data) {
        this.initCharts();
      }
    });
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("inOut"));

      let option = {
        legend: {
          left: "4%",
          bottom: "1%",
          icon: "circle",
          itemWidth: 15, // 设置宽度
          itemHeight: 12, // 设置高度
          orient: "vertical",
          itemGap: 12,
          textStyle: {
            color: "rgba(255,255,255,0.9)",
            fontSize: "13",
            width: 55,
            padding: [0, 0, 0, 10]
          },
          data: this.dayPersonAccessData
        },
        color: ["#26CBA9", "#FFAA23"],
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: false,
            radius: ["40%", "56%"],
            center: ["50%", "40%"],
            label: {
              show: true,
              position: "outside",
              textBorderColor: "transparent",
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
            data: this.dayPersonAccessData,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      };
      this.chart.setOption(option);
    },
    getDayPersonAccessData() {
      this.dayPersonAccessData = [];
      return new Promise(resolve => {
        getDayPersonAccess().then(res => {
          if (res.code === 2000) {
            // this.dayPersonAccessData = Object.values(res.data).map(item => {
            //   return {
            //     name: item[0].name,
            //     value: item[0].access_records_count
            //   };
            // });
            for (let k in res.data) {
              this.dayPersonAccessData.push({
                name: k==1?"本地人口":'外来人口',
                value: res.data[k]
              });
            }
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
.in-out {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
