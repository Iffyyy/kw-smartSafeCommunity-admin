<template>
  <div class="type-pie ">
    <!--    <img class="pla" src="../../../../assets/home/pie.png" alt="/t">-->
    <slot></slot>
    <p class="subtitle text-center">事件类型占比</p>
    <div class="pietext" id="el"/>
    <div class="query-time">
      <el-radio-group v-model="radio">
        <el-radio :label="1">今日</el-radio>
        <el-radio :label="2">近七天</el-radio>
        <el-radio :label="3">近30天</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>

  let rotateNum = 360, xinYongTimer;
  require('echarts/theme/macarons') // echarts theme
  // require('echarts/lib/bar') // echarts theme
  // require('echarts/theme/category') // echarts theme
  import resize from './mixins/resize'
  import {eventTypeScale} from '@/api/home'

  export default {
    name: "TypePie",
    mixins: [resize],
    props: {
      radius: {
        type: Array,
        default: () => ['60%', '80%']
      },
      legendPosition: {
        type: Array,
        default: () => [60, 60]
      },
      // legendData: {
      //   type: Array,
      //   default: () => ['设备', '公共', '人员']
      // }
    },
    data() {
      return {
        chart: null,
        radio: 1,
        timeInterval: {},
        dataIndex: 0,
        TypeStatisticsData: 3,
        pieType: [],
        legendData: []
      }
    },
    watch: {
      radio() {
        this.get_eventTypeScale()
      }
    },
    created() {
      // this.stopRotate()
      clearInterval(this.timeInterval)

    },
    mounted() {
      this.get_eventTypeScale()
      // setTimeout(this.startRotate, 500);
    },
    beforeDestroy() {
      console.log('销毁')
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        // await this.get_eventTypeScale()
        // console.log(this.pieType)
        this.chart = echarts.init(document.getElementById('el'))
        console.log(this.legendData)
        let _data = this.legendData;
        let option = {

          legend: {
            // right: 'center',
            right: this.legendPosition[0],
            y: this.legendPosition[1],
            icon: 'circle',
            itemWidth: 15,  // 设置宽度
            itemHeight: 15, // 设置高度
            // width: 55,
            orient: 'vertical',
            // algin:'auto',
            itemGap: 20,
            textStyle: {
              color: '#fff',
              fontSize: '18',
              width: 55,
              padding: [0, 0, 0, 10]
            },
            data: _data
          },
          color: ['#FC4F55', '#FFAA23', '#26CBA9'],
          series: [
            {
              name: 'WEEKLY WRITE ARTICLES',
              type: 'pie',
              roseType: false,
              startAngle: rotateNum,
              radius: this.radius,
              center: ['30%', '50%'],
              label: {
                show: true,
                position: 'outside',
                textBorderColor: 'transparent',
                fontSize: 14,
                fontWeight:'600',
                formatter: '{d}%',
                rich: {
                  x1: {
                    width: 80,
                    padding: [0, 100, 0, 100]
                  },
                  x2: {
                    width: 80,
                    padding: [35, 0, 0, 50]
                  },
                  x3: {
                    width: 80,
                    padding: [0, 0, 40, 40]
                  },
                }
              },
              labelLine: {
                show: false,
                length: 1
              },
              emphasis: {
                label: {
                  show: true,
                }
              },
              itemStyle: {
                borderType: 'solid',
                borderWidth: '5',
                borderColor: 'rgba(16, 30, 46, 1)',
                // shadowColor: 'rgba(7, 33, 65, 1)',
                // shadowBlur: 10,
                // shadowOffsetX:0,
                // shadowOffsetY:0,
              },
              data: this.pieType,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        };
        this.chart.clear();
        this.chart.setOption(option)
        let self = this;
        this.timeFunc(this.chart)
        this.chart.on('mouseover', (param) => {
          clearInterval(self.timeInterval)
          self.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          // console.log(param)
          self.chart.dispatchAction({
            type: 'highlight',
            dataIndex: param.dataIndex
          })
        })
        this.chart.on('mouseout', _ => {
          this.timeFunc(this.chart)
        })

      },
      timeFunc(chartChild) {
        clearInterval(this.timeInterval)
        this.timeInterval = setInterval(() => {
          chartChild.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          this.TypeStatisticsData == this.dataIndex + 1
            ? (this.dataIndex = 0) : this.dataIndex++;
          // console.log(this.dataIndex)
          chartChild.dispatchAction({
            type: 'highlight',
            dataIndex: this.dataIndex
          })
        }, 2000)

      },
      get_eventTypeScale() {
        // console.log(1)
        let data = {
          timeType: this.radio
        }
        eventTypeScale(data).then(res => {
          let data = res.data
          console.log(res)
          this.legendData = data.map(item => {
            return item.name
          })
          this.pieType = data.map(item => {
            item.value = item.event_info_count
            return item
          })
          this.$store.commit('event/VIEW_EVENTLIST',res.data)

          sessionStorage.setItem('TypePieValue', JSON.stringify(data))
          // console.log(this.pieType)
          this.initChart()
        })
      }
      /* rotate() {

         rotateNum--;

         // if(rotateNum == 0){
         //
         //     rotateNum = 360;
         //
         // }

         try {
           let option = this.chart.getOption();
           option.series[0].startAngle = rotateNum;
           this.chart.setOption(option);
         } catch (e) {
           this.stopRotate()
         }
         // console.log(option)


       },

       startRotate() {

         xinYongTimer = setInterval(this.rotate, 100);

       },

       stopRotate() {

         clearInterval(xinYongTimer);

         xinYongTimer = null;

       },*/
    }
  }
</script>

<style scoped lang="scss">
  .pietext {
    width: 100%;
    height: calc(100% - 60px);
  }

  .type-pie {
    width: 100%;
    height: 100%;
    /*padding: 0 0 0 18px;*/
    box-sizing: border-box;
    float: right;
    overflow: hidden;
    position: relative;
    z-index: 7;
    .text-center{
      margin-top: 10px;
    }
  }

  .query-time {
    width: 56%;
    max-width: 275px;
    position: absolute;
    right: 5px;
    bottom: 20px;
  }
</style>
