<template>
  <div class="rate-bar" :id="name"></div>
</template>

<script>
  import resize from "@/components/Charts/mixins/resize";

  export default {
    mixins: [resize],
    name: "RateBar",
    props: {
      color: {
        type: Array,
        default: () => {
          return ['rgba(252,79,85,1)', 'rgba(252,79,85,0.3)'];
        }
      },
      // color: {
      //   type: String,
      //   default: "#FC4F55"
      // },
      name: {
        type: String,
        default: "lineContainer"
      },
      fontSize: {
        type: Number,
        default: 22
      },
      //圆环的占比
      proportion: {
        type: Number,
        default: 0
      },
      //圆环背景的值
      sumOf: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        chart: null,
        proportionValue: 0
      };
    },
    mounted() {
      console.log(1)
      this.$nextTick(() => {

        this.initCharts();
      })
    },
    watch: {
      proportion(newData, oldData) {
        this.computedValue()
      }
    },
    created() {
      this.computedValue()
    },
    methods: {
      initCharts() {
        this.chart = echarts.init(document.getElementById(this.name));
        let option = {
          color: this.color,
          grid: {
            width: '100%',
            height: '100%'
          },
          angleAxis: {
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          radiusAxis: {
            type: "category",
            // data: ["周一", "周二"],
            z: 100,
            name: this.proportionValue + '%',
            nameLocation: 'start',
            nameGap: '-10',
            nameTextStyle: {
              color: this.color,
              fontSize: this.fontSize,
              fontWeight: 'bold',
            },
            boundaryGap: ['20%', '20%'],
            axisLabel: {
              // show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            interval: 30,
          },
          polar: {
            radius: '160%' //总体的最小半径，最大半径
          },
          series: [
            {
              type: "bar",
              data: [this.proportionValue],
              barGap: '-100%',
              barWidth: '14%',
              coordinateSystem: "polar",
              name: "A",
              roundCap: "true",
              itemStyle: {
                borderWidth: 1
              }
            },
            {
              type: "bar",
              data: [100],
              barWidth: '14%',
              coordinateSystem: "polar",
              name: "B",
              animation: false
            }
          ]
        };
        this.chart.setOption(option);
      },
      computedValue(){
        console.log(this.proportion)
        console.log(this.sumOf)
        if(this.sumOf == 0){
          this.proportionValue = 0
          return
        }
        let value = (this.proportion / this.sumOf)*100
        // console.log(value)
        if(value <= 0){
          value = value.toFixed(0)
        }else{
          value = value.toFixed(2)
        }
        // alert(value)
        this.proportionValue = value
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  $imgUrl: "@/assets/";
  .rate-bar {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
