<template>
  <PersonBar title="近期出入统计" :listX="listX" :listOne="listOne" :listTwo="listTwo"></PersonBar>
</template>

<script>
  import PersonBar from '@/components/Charts/PersonBar'
  import {getPersonAccess} from '@/api/analyze/person'

  export default {
    name: "person-PersonBar",
    components: {
      PersonBar
    },
    data() {
      return {
        listX:[],
        listOne:[],
        listTwo:[]
      }
    },
    created() {
      this.get_PersonAccess()
    },
    methods: {
      get_PersonAccess() {
        getPersonAccess().then(res => {
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$')
          console.log(res)
          this.listX = res.data.weekDate.map(item=>{
            return item.substring(5)
          })
          this.listOne = res.data.count.map(item=>{
            return item[0]+=1
          })
          this.listTwo = res.data.count.map(item=>{
            return item[1]+=1
          })
          // console.log(this.listOne)
          // console.log(this.listTwo)

        })
      }
    }
  }
</script>
