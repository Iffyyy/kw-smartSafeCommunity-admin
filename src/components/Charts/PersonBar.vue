<template>
  <div class="bar bg shadow">
    <p class="fontColor fontsize22">{{title}}</p>
    <div id="personBar"></div>
  </div>
</template>

<script>
  import resize from '@/components/Charts/mixins/resize'

  let timer;
  export default {
    name: "PersonBar",
    mixins: [resize],
    props: {
      title: {
        type: String,
        default: '模块标题'
      },
      unitsY: {
        type: String,
        default: '总数/人'
      },
      legendData: {
        type: Array,
        default: () => ['本地人口', '外地人口']
      },
      listX:{
        type:Array,
        default:()=>[]
      },
      listOne:{
        type:Array,
        default:()=>[0,0,0,0,0,0,0]
      },
      listTwo:{
        type:Array,
        default:()=>[]
      },
    },
    data() {
      return {
        chart: {}
      }
    },
    beforeDestroy() {
      clearInterval(timer)
    },
    mounted() {
      this.initChart()
      clearInterval(timer)
      timer = setInterval(this.initChart, 5000)

    },
    watch:{
      listOne:{
        handler(data,data1){
          console.log(data)
          console.log(data1)
          this.initChart()
        },
        deep:true
      }
    },
    methods: {
      initChart() {
        // console.log(1)
        this.chart = echarts.init(document.getElementById('personBar'))
        this.chart.clear()
        this.chart.setOption({
          legend: {
            // right: 'center',
            left: '20%',
            y: '15%',
            icon: 'circle',
            // itemWidth: 12,  // 设置宽度
            // itemHeight: 12, // 设置高度
            orient: 'horizontal',
            itemGap: 10,
            textStyle: {
              color: '#fff',
              fontSize: '14',
              width: 55,
              padding: [0, 0, 0, 0]
            },
            data: this.legendData
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
        /*  grid: {
            left: '3%',
            top:'22%',
            right: '14.5%',
            bottom: '3%',
            containLabel: true
          },*/
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
            name: '日期/日',
            nameTextStyle: {
              color: '#00CCFF',
              padding: [15, 20, 0, 0]
            },

            type: 'category',
            data: this.listX,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: '#fff'
            },
            minorTick: {
              type: 'dotted'
            },
            axisLine: {
              lineStyle: {
                color: '#042E4A',
                opacity: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            nameTextStyle: {
              color: '#00CCFF'
            },
            name: this.unitsY,
            splitLine: false,
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#042E4A',
                opacity: 0.5
              }
            },
            axisTick: {
              show: false
            }
          },
          // animationDuration: 2000,
          series: [
            {
              name: this.legendData[0],
              type: 'bar',
              width: '13px',
              barMinWidth: '13px',
              barMaxWidth: '13px',
              barMinHeight:'2px',
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: [10, 10, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: 'rgba(255, 170, 35, 1)'},
                      {offset: 0.5, color: 'rgba(255, 170, 35, .5)'},
                      {offset: 1, color: 'rgba(255, 170, 35, 0)'}
                    ]
                  )
                },
              },
              data: this.listOne
            },
            {
              name: this.legendData[1],
              type: 'bar',
              barMinWidth: '13px',
              barMinHeight:'2px',
              barMaxWidth: '13px',
              barCategoryGap: '5%',
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: [10, 10, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: 'rgba(38, 203, 169, 1)'},
                      {offset: 0.5, color: 'rgba(38, 203, 169, .5)'},
                      {offset: 1, color: 'rgba(38, 203, 169, 0)'}
                    ]
                  ),
                },

              },
              data: this.listTwo
            },
          ]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .bar {
    width: 100%;
    height: 100%;
    overflow: hidden;

    p {

      padding-top: 13px;
      padding-left: 18px;

    }
  }

  #personBar {
    height: calc(100% - 30px);
    width: 100%;
    padding-bottom: 7px;
    position: relative;
    top: -14px;
  }
</style>
