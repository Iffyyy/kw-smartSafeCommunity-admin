<template>
  <div class="lineLedend">
    <div class="line-chart" :id="name"></div>
    <div class="incident">
      <p class="fontColor fontsize14" @click="typeListIsShow">事件选择
        <span></span>
      </p>
      <el-popover
        placement="right"
        width="60"
        v-model="visible">
        <div>
          <el-checkbox @change="selectAll" :isIndeterminate="isIndeterminate" v-model="selAll">全部</el-checkbox>
          <el-checkbox-group v-model="list" @change="handleCheckedBasic">
            <el-checkbox @change="e => updateLine(e,index)" v-for="(item,index) in checkEdList" :label="item.id"
                         :value="item.id">{{item.name}}
            </el-checkbox>

          </el-checkbox-group>
        </div>

      </el-popover>
    </div>
  </div>
</template>

<script>
  import resize from '@/components/Charts/mixins/resize'
  import {getEventAnalyze, getEventListAnalyze} from '@/api/analyze/events'

  let color = ['', 'rgba(252, 79, 85, 0.8)', 'rgba(255, 170, 35, 0.8)', 'rgba(38, 203, 169, 0.8)', 'rgba(252, 79, 85, .4)', 'rgba(255, 170, 35, .4)', 'rgba(38, 203, 169, .4)','rgba(252, 79, 85, 0)', 'rgba(255, 170, 35, 0)', 'rgba(38, 203, 169, 0)']
  export default {
    mixins: [resize],
    name: "LineChart",
    props: {
      typeCount: {
        type: Array,
        default: () => []
      },
      legend: {
        type: Array,
        default: () => {
          return ['', '']
        }
      },
      width: {
        type: String,
        default: '100%'
      },
      axisName: {
        type: String,
        default: "日期/日"
      },
      name: {
        type: String,
        default: "lineContainer"
      },
    },
    watch: {
      typeCount(newData, oldData) {
        if (newData.length > 1) {
          this.visible = false
          this.initCheckStatus()
        }
        this.get_EventAnalyze()
      }
    },
    data() {
      return {
        chart: null,
        lineList: [],
        visible: false,
        list: [],
        checkEdList: [],
        TypeStatisticsData1: 6,
        dataIndex1: -1,
        timeInterval1: {},
        selAll: false,
        isIndeterminate: false,
        sevenDays: [],
        DataNameList: []
      };
    },
    created() {
      clearInterval(this.timeInterval1)
      this.get_EventAnalyze()
    },
    mounted() {
      // this.initCharts();

    },
    methods: {
      initCharts() {
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
          legend: {
            show: false,
            data: this.DataNameList,
            /* selected:{
               '人员事件':false,
               '公共事件':false,
               '设备事件':false,
             }*/
          },
          grid: [
            {
              top: '22%',
              width: '82%',
              left:'5%',
              height: "66%",
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
            data: this.sevenDays
          },
          yAxis: {
            type: "value",
            name: "总数/件",
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
          series: this.lineList
        };
        this.chart.clear()
        this.chart.setOption(option);

        let self = this;
        // this.timeFunc(this.chart)
        this.chart.on('click', 'series',(param) => {
          // alert(1)
          clearInterval(self.timeInterval)
          self.chart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0
          })
          // console.log(param)
          this.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: param.dataIndex
          })
          /*  self.chart.dispatchAction({
              type: 'highlight',
              dataIndex: param.dataIndex
            })*/
        })
        this.chart.on('mouseout', _ => {
          clearInterval(this.timeInterval1)
          this.timeFunc(this.chart)
        })
      },
      //获取总趋势图
      get_EventAnalyze() {
        let data = {
          eventType: JSON.stringify(this.typeCount)
        }
        getEventAnalyze(data).then(res => {
          let data = res.data
          let arr = []
          for (let i in data) {
            arr.push(data[i])
          }

          if (arr.length <= 1) {
            this.checkEdList = arr[0].Eventlist[0].eventlist
            this.DataNameList = this.checkEdList.map(item => item.name)
            for (let j in this.checkEdList) {
              this.checkEdList[j].checkEd = true
            }
            this.get_EventListAnalyze()
            this.initCharts()
            return
          }

          this.get_lines(arr)
          // this.initCharts()
        })
      },
      //大种类的多条线
      get_lines(data) {
        let data_d = JSON.parse(JSON.stringify(data))
        let arr = []
        for (let i in data_d) {
          let arrList = []
          for (let j in data_d[i]) {
            arrList.push({time: j.substring(5), value: data_d[i][j]})
          }

          arr.push(arrList)
        }

        console.log(arr)
        let arrL = []
        for (let j in arr) {
          let arr2 = []
          for (let h in arr[j]) {
            if (arr[j][h].time == 'list') {
              continue
            }
            for (let l in arr[j][h].value) {
              arr2.push(arr[j][h].value[l])
            }
          }
          arrL.push(arr2)
        }
        this.sevenDays = arr[0].map(res => {
          if (res.time == 'list') {
            return
          }
          return res.time
        })
        this.sevenDays.shift()
        console.log(this.sevenDays)
        this.lineBigDataAndStyle(arrL)
        // this.lineDataAndStyle(arr)
      },
      //获取类型详细事件的数据
      get_EventListAnalyze() {
        let idList = this.checkEdList.map(item => {
          return item.id
        })
        let data = {
          eventList: JSON.stringify(idList)
        }
        getEventListAnalyze(data).then(res => {
          let res_data = res.data
          let arr = []
          for (let i in res_data) {
            // arr.push(res_data[i])
            arr.push({time: i.substring(5), value: res_data[i]})

          }
          this.initCheckStatus()
          this.lineDataAndStyle(arr)
        })
      },
      //画线数据、颜色 配置
      lineDataAndStyle(data) {
        console.log(data)
        let arrList = []
        for (let i in data) {
          let arr = []
          let data_value = data[i].value
          let name, value;
          for (let j in data_value) {
            name = data_value[j][0].name
            value = data_value[j][0].event_info_count
            arr.push({time: data[i].time, name: name, value: value})
          }
          arrList.push(arr)
        }
        this.sevenDays = arrList.map(res => {
          return res[0].time
        })
        let lineList = []
        for (let l = 0; l < arrList.length; l++) {
          // console.log(arrList)
          let lineD
          let nameList = []
          // let colorLine= this.typeCount+3
          // alert(colorLine)
          for (let h in arrList[l]) {
            lineD = {
              type: "line",
              smooth: true,
              name: '',
              symbol: "circle",
              silent: true,
              lineStyle: {
                color: color[this.typeCount[0]],
                opacity: 0.4
              },
              itemStyle: {
                normal: {
                  color: color[this.typeCount[0] + 3]
                },
                emphasis: {
                  color: color[this.typeCount[0]]
                },
              },
              emphasis: {
                label: {
                  show: true
                },
              },
              data: arrList[l].map(res => res.value)
            }
            nameList = arrList[l].map(res => res.name)
          }
          lineD.name = nameList[l]
          lineList.push(lineD)

        }
        this.lineList = lineList
        this.initCharts()
        // console.log(arrList)
      },
      //大的typeId画线数据、颜色 配置
      lineBigDataAndStyle(data) {
        console.log(data)
        let arr = []
        for (let i = 0; i < data.length; i++) {
          let lineD = {
            type: "line",
            smooth: true,
            symbol: "circle",
            silent: true,
            itemStyle: {
              normal: {
                color: color[this.typeCount[i]]
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color:  color[this.typeCount[i] + 3]
                },
                {
                  offset: 1,
                  color: color[this.typeCount[i] + 6]
                }
              ])
            },
            name: data[i][0].name,
            emphasis: {
              label: {
                show: true
              }
            },
            data: data[i].map(res => res.event_info_count)
          }
          // alert(this.typeCount[i] + 2)
          arr.push(lineD)
        }
        console.log(arr)
        this.lineList = arr;
        this.initCharts()
      },
      //初始化checkoutList全选状态
      initCheckStatus() {
        /*  this.checkEdList = this.lineList.map((item, index) => {
            let dat = {name: item.name, checkEd: true}
            return dat
          })*/
        // this.checkEdList.push({name:'全部',checkEd:'all'})
        /*  this.list = this.checkEdList.map((item, index) => {
            return item.id
          })
          this.selAll = true
          this.isIndeterminate = true*/
        this.list = this.checkEdList.map((item, index) => {
          return item.id
        })
        this.selAll = true
        this.isIndeterminate = true
      },
      //计时器选中状态
      timeFunc(chartChild) {
        this.timeInterval1 = setInterval(() => {
          chartChild.dispatchAction({
            type: 'hideTip',
            seriesIndex: 0
          })
          this.TypeStatisticsData1 == this.dataIndex1 + 1
            ? (this.dataIndex1 = 0) : this.dataIndex1++;
          // console.log(this.dataIndex1)
          chartChild.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.dataIndex1
          })

        }, 3000)
        // console.log(1)
      },
      updateLine(value, index) {
        // alert('updateLine')

        let dt = this.checkEdList
        dt[index].checkEd = value
        // this.upLine()
      },
      //修改line显示条目
      upLine() {
        let option = this.chart.getOption()
        let dt = this.checkEdList
        option.legend[0].selected = this.arrayToObj(dt)
        console.log(option)
        this.chart.clear()
        this.chart.setOption(option)
      },
      //修改全选全部选 line条目
      upLine1(i) {
        let option = this.chart.getOption()
        let dt = this.checkEdList
        if (i == 0) {
          for (let j in dt) {
            dt[j].checkEd = false
          }

        } else {
          for (let j in dt) {
            dt[j].checkEd = true
          }
        }

        option.legend[0].selected = this.arrayToObj(dt)
        this.chart.clear()
        this.chart.setOption(option)
      },
      //是否可以选择事件类型
      typeListIsShow() {
        // alert(this.typeCount)
        if (this.typeCount.length <= 1) {
          this.visible = !this.visible
        }
      },
      //全部事件类型 复选框
      selectAll(value) {
        let dataList = this.checkEdList.map(item => {
          return item.id
        })
        // console.log(dataList)
        // console.log(value)
        this.list = value ? dataList : [];
        this.isIndeterminate = false;
        if (value) {
          this.upLine1()
        } else {
          this.upLine1(0)
        }
      },
      //复选框change事件
      handleCheckedBasic(value) {
        let checkedCount = value.length;
        this.selAll = checkedCount === this.checkEdList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkEdList.length;
        this.upLine()
      },
      //数组转对象
      arrayToObj(arr) {
        // console.log(arr)
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
          // console.log(typeof arr[i].name)
          obj[arr[i].name] = arr[i].checkEd;
        }
        return obj
      },

    },
    beforeDestroy() {
      // console.log('销毁')
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  $imgUrl: "../../../../assets/";
  .lineLedend {
    width: 100%;
    height: 100%;
    position: relative;

    .incident {
      width: 85px;
      position: absolute;
      top: 0;
      right: 30px;
      cursor: pointer;

      p span {
        /*content: '';*/
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url($imgUrl + 'common/up.png') no-repeat;
        background-size: 100%;
        transform: rotate(180deg);
        margin-bottom: -1px;
      }
    }
  }

  .line-chart {
    position: relative;
    width: 95%;
    height: 100%;
  }
</style>

<style>
  .lineLedend .el-popover {
    min-width: 144px;
    left: -66px;
    top:24px;
    overflow-y: scroll;
    background-color: #012447 !important;
  }

  .lineLedend .el-checkbox__inner {
    width: 14px;
    height: 14px;
  }

  .lineLedend .el-checkbox__label {
    font-size: 14px;
  }

  .lineLedend .el-checkbox {
    width: 100%;
    margin-right: 0;
    margin-bottom: 8px;
  }
</style>
