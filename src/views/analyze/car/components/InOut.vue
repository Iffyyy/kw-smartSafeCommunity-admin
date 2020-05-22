<template>
  <div class="in-out" id="inOut"></div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";

export default {
  mixins: [resize],
  name: "InOut",
  props: {
    chartData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    // this.initCharts();
  },
  watch:{
    chartData:{
      deep:true,
      handler:function(newV){
        this.initCharts();
      }
    }
  },
  methods: {
    initCharts() {
      if(this.chart){
        this.chart.clear()
      }
      this.chart = echarts.init(document.getElementById("inOut"));
      let option = {
        legend: {
          right: "14%",
          top: "1%",
          icon: "circle",
          itemWidth: 15, // 设置宽度
          itemHeight: 12, // 设置高度
          orient: "vertical",
          itemGap: 12,
          textStyle: {
            color: "rgba(255,255,255,0.9)",
            fontSize: "11",
            width: 55,
            padding: [0, 0, 0, 10]
          },
          data: this.chartData
        },
        color: [
          "#26CBA9",
          "#FFAA23"
        ],
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: false,
            radius: ["60%", "88%"],
            center: ["50%", "50%"],
            label: {
              show: true,
              position: "outside",
              textBorderColor: "transparent",formatter: function(data) {
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
            labelLine:{
              show:false,
              length:1
            },
            itemStyle: {
              borderType: "solid",
              borderWidth: "5",
              borderColor: "rgba(16, 30, 46, 1)"
            },
            data: this.chartData,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      };
      this.chart.setOption(option);
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
