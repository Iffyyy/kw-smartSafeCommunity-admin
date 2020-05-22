<template>
  <div class="analyze-container">
    <div class="pie-container" id="el" />
    <div class="bar-container" id="barContainer"></div>
    <div class="total-num">
      运行时间
      <span>{{deviceData.deviceRuntime}}</span>
      小时
    </div>
  </div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";
import { formatArray,changeArray } from "@/utils/index";

let rotateNum = 360,
  timer = null;

export default {
  name: "DeviceAnalyze",
  mixins: [resize],
  props: {
    deviceData:{
      type:Object
    }
  },
  data() {
    return {
      chart: null,
      barChart: null,
      dataIndex: 0,
      deviceTypeCount:[{
        name:'监控设备',
        device_count:300,
        device_online_count:200,
        device_offline_count:100,
      },{
        name:'充电设备',
        device_count:120,
        device_online_count:100,
        device_offline_count:20,
      },{
        name:'门禁设备',
        device_count:300,
        device_online_count:230,
        device_offline_count:70,
      },{
        name:'云对讲设备',
        device_count:220,
        device_online_count:200,
        device_offline_count:20,
      },{
        name:'机房设备',
        device_count:140,
        device_online_count:130,
        device_offline_count:10,
      },{
        name:'其他设备',
        device_count:100,
        device_online_count:90,
        device_offline_count:10,
      }],
      
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.initBarChart();
    });
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  computed:{
    deviceTypeList(){
      return changeArray(this.deviceTypeCount,['name','device_count'],['name','value'])
    },
    nameList(){
      return formatArray(this.deviceTypeCount,'name')
    },
    onlineBarData(){
      return formatArray(this.deviceTypeCount,'device_online_count')
    },
    offlineBarData(){
      return formatArray(this.deviceTypeCount,'device_count')
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("el"));
      let option = {
        legend: {
          right: "60",
          y: "30",
          icon: "circle",
          itemWidth: 16, // 设置宽度
          itemHeight: 16, // 设置高度
          orient: "vertical",
          itemGap: 12,
          textStyle: {
            color: "#fff",
            fontSize: "16",
            width: 55,
            padding: [0, 0, 0, 10]
          },
          data: this.nameList
        },
        color: [
          "#FC4F55",
          "#FFAA23",
          "#26CBA9",
          "#00CCFF",
          "#CDD2D9",
          "#EEFF00"
        ],
        series: [
          {
            type: "pie",
            roseType: false,
            // startAngle: rotateNum,
            radius: ["44%", "62%"],
            center: ["30%", "50%"],
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
                  fontSize: 18
                  // fontFamily:'Microsoft YaHei'
                }
              }
            },
            labelLine: {
              show: false,
              length: 1
            },
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              borderType: "solid",
              borderWidth: "5",
              borderColor: "rgba(16, 30, 46, 1)"
            },
            data: this.deviceTypeList,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      };
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
        this.dataIndex ==this.deviceTypeList.length-1
          ? (this.dataIndex = 0)
          : this.dataIndex++;
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
          // '{b0}: {c0}<br />{b1}: {c1} - {c0}'
          formatter:(params,ticket,callback)=>{
            if(params.length===2){
              return `${params[0].seriesName}:${params[0].value}<br />${params[1].seriesName}:${params[1].value-params[0].value}`
            }
            return
          }
        },
        legend: {
          data: ["在线", "离线"],
          bottom: "20%",
          left: "10%",
          icon: "circle",
          itemWidth: 16, 
          itemHeight: 16,
          itemGap:18,
          textStyle: {
            color: "rgba(255,255,255,0.9)",
            fontSize: "16",            
            padding: [0, 0, 0, 4]
          }
        },
        color: ["#04E5FF", "rgba(4,229,255,0.2)"],
        grid: {
          left: "15%",
          right: "4%",
          top: "3%",
          containLabel: true,
          width: "78%",
          height: "70%"
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          offset: 20,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(255,255,255,0.9)",
              fontSize:'16'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: this.nameList.reverse()
        },
        series: [
          {
            name: "在线",
            type: "bar",
            barWidth: 16,
            barGap: "-100%",
            itemStyle: {
              barBorderRadius: 11
            },
            data: this.onlineBarData.reverse()
          },
          {
            name: "离线",
            type: "bar",
            barWidth: 16,
            barGap: "-100%",
            itemStyle: {
              barBorderRadius: 11
            },
            data: this.offlineBarData.reverse()
          }
        ]
      };

      this.barChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";
$imgUrl: "../../../assets/";

.analyze-container {
  width: 100%;
  height: 100%;
  position: relative;

  .pie-container {
    position: relative;
    height: 40%;
  }

  .bar-container {
    position: relative;
    height: 60%;
  }
  .total-num {
    position: absolute;
    right: 20px;
    bottom: 64px;
    font-size: 16px;

    & > span {
      font-size: 26px;
      font-family: "Dinpro";
      color: #04e5ff;
      vertical-align: baseline;
    }
  }
}
</style>
