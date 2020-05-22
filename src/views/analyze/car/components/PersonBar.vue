<template>
  <PersonBar title="车辆近期出入统计" :listX="PersonBarX" v-if='tempList.length > 0' :listOne="tempList" :listTwo="rentList" unitsY="总数/辆" :legendData="['临时车','月租车']"></PersonBar>
</template>

<script>
  import PersonBar from "@/components/Charts/PersonBar";
  import {statisticsCarAccess} from '@/api/analyze/car'
  import {formatArray} from '@/utils/index'

  export default {
    name: "PersonBarSan",
    components: {PersonBar},
    data() {
      return {
        tempList: [],
        rentList: [],
        PersonBarX: []
      }
    },
    created() {
      this.get_statisticsCarAccess()
    },
    methods: {
      get_statisticsCarAccess() {
        statisticsCarAccess().then(res => {
          console.log(res)
          let data = res.data
          let arr = []
          for (let i in data) {
            arr.push({time: i.substring(5), temp: data[i].temp, rent: data[i].rent})
          }
          this.PersonBarX = formatArray(arr,'time')
          this.tempList = formatArray(arr,'temp').map(item=>{
            return item+=1
          })
          this.rentList = formatArray(arr,'rent').map(item=>{
            return item+=0.5
          })

          console.log(this.tempList)
          // console.log(this.rentList)
        })
      }
    }
  }
</script>

<style scoped>

</style>
