<template>
<!--  <div class="type-pie ">
    <img class="pla" src="../../../../assets/home/pie.png" alt="/t">
    <p class="subtitle text-center paddtop20">事件类型占比</p>
    <div class="pietext" id="el"/>
    <div class="query-time">
      <el-radio-group v-model="radio">
        <el-radio :label="3">当日</el-radio>
        <el-radio :label="6">当月</el-radio>
        <el-radio :label="9">当周</el-radio>
      </el-radio-group>
    </div>
  </div>-->
</template>

<script>
/*  import echarts from 'echarts'

  let rotateNum = 360, xinYongTimer;
  require('echarts/theme/macarons') // echarts theme
  // require('echarts/lib/bar') // echarts theme
  // require('echarts/theme/category') // echarts theme
  import resize from '../mixins/resize'
  import {eventTypeScale} from '@/api/home/eventTypeScale'

  export default {
    name: "TypePie",
    mixins: [resize],
    data() {
      return {
        chart: null,
        radio: 3,
        timeInterval: {},
        dataIndex: 0,
        TypeStatisticsData: 3
      }
    },
    created() {
      this.get_eventTypeScale()
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
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

        this.chart = echarts.init(document.getElementById('el'))
        let _data = ['设备', '公共', '人员'];
        let option = {

          legend: {
            // right: 'center',
            right: '80',
            y: '60',
            icon: 'circle',
            itemWidth: 15,  // 设置宽度
            itemHeight: 15, // 设置高度
            // width: 55,
            orient: 'vertical',
            // algin:'auto',
            itemGap: 20,
            textStyle: {
              color: '#fff',
              fontSize: '14',
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
              radius: ['63%', '84%'],
              center: ['30%', '50%'],
              label: {
                show: false,
                position: 'inside',
                textBorderColor: 'transparent',
                fontSize: 12,
                formatter: (data) => {
                  // console.log(data)
                  for (let i = 0; i < _data.length; i++) {
                    if (data.name === _data[i]) {
                      // console.log(i)
                      return '{x' + (i + 1) + '|' + data.percent + '%}'
                      // return
                    }
                  }
                },
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
              data: [
                {value: 320, name: '设备'},
                {value: 240, name: '公共'},
                {value: 149, name: '人员'},
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        };
        // this.chart.clear();
        this.chart.setOption(option)
        let self = this;
        this.timeFunc(this.chart)
        this.chart.on('mouseover', (param) => {
          clearInterval(self.timeInterval)
          self.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          console.log(param)
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
        console.log(1)
        eventTypeScale.then(res=>{
          console.log(res)
        })
      }
      /!* rotate() {

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

       },*!/
    }
  }*/
</script>

<style scoped>
  .pietext {
    width: 100%;
    height: calc(100% - 60px);
  }

  .type-pie {
    width: 100%;
    height: 299px;
    /*padding: 0 0 0 18px;*/
    box-sizing: border-box;
    float: right;
    overflow: hidden;
    position: relative;
    z-index: 7;
  }

  .query-time {
    width: 46%;
    position: absolute;
    right: 5px;
    bottom: 40px;
  }
</style>
