<template>
  <div class="home">
    <div class="height">
      <div class="_map" ref="map">
        <el-map name="gaodemap" :flag="flag" :newList="newListMap" @changeFlag="changeFlag" v-on:click="birMap" @newListChange="newListChange" :width="mapWidth"></el-map>
      </div>
      <div class="row">
        <el-row :gutter="24">
          <el-col :span="17">
            <div class="_pla" ref="span17"></div>
          </el-col>
          <el-col :span="7">
            <incident :newList="newList" name="incident" ></incident>
          </el-col>
        </el-row>
      </div>
      <div class="row2">
        <el-row :gutter="24">
          <el-col :span="17">
            <el-row :gutter="24">
              <el-col :span="12" class="rotate">
                <to-do-list name="gaodemap" title="今日待办事件" @updatePageToDay="updatePageToDay" :list="toDayList"
                            :total="toDayTotal" ref="todolist"></to-do-list>
              </el-col>
              <el-col :span="12">
                <to-do-list name="gaodemap" @timeUpdate="get_bEventInfo" @updatePageBygoneDay="updatePageBygoneDay"
                            title="往日待办事件" :list="bygoneDayList"
                            :total="bygoneDayTotal" ref="todolist1"></to-do-list>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <type-pie name="incident">
              <slot>
                <img class="pla" src="../../assets/home/pie.png" alt="/t">
              </slot>
            </type-pie>
          </el-col>
        </el-row>
        <!-- <div class="list center">
           <div class="list_san">
             <to-do-list name="gaodemap"></to-do-list>
           </div>
           <div class="list_san">
             <to-do-list name="gaodemap"></to-do-list>
           </div>
         </div>
         <div class="type_pie">
           <type-pie name="incident"></type-pie>
         </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import elMap from './components/map'
  import incident from './components/incident'
  import ToDoList from './components/ToDoList'
  import TypePie from '@/components/Charts/TypePie'
  import {mapGetters} from 'vuex'
  import {getNewestEventInfo, getEventInfo} from '@/api/home'


  export default {
    name: "index",
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    components: {elMap, incident, ToDoList, TypePie},
    data() {
      return {
        mapStatus: false,
        mapWidth: 0,
        newList: [],
        newListMap: [],
        todayPage: 1,
        toDayList: [],
        toDayTotal: 0,
        bygoneDayTotal: 0,
        bygoneDayList: [],
        bygoneDayPage: 1,
        bygoneDayTime: '',
        flag:false,
      }
    },
    watch: {
      'sidebar.opened': {
        handler() {
          setTimeout(() => {
            this.getMapWidth()
          }, 200)
        },
        immediate: true
      }
    },
    /*directives: {  // 使用局部注册指令的方式
      resize: { // 指令的名称
        bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
          let width = '', height = '';
          function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value();  // 关键
            }
            width = style.width;
            height = style.height;
          }
          el.__vueSetInterval__ = setInterval(isReize, 300);
        },
        unbind(el) {
          clearInterval(el.__vueSetInterval__);
        }
      }
    },*/
    mounted() {
      // this.getMapWidth()
      // this.sidebar.opened = false
      this.get_bEventInfo()
      this.get_EventInfo()
    },
    created() {
      this.get_NewestEventInfo()

    },
    methods: {
      get_NewestEventInfo() {
        getNewestEventInfo().then(res => {
          this.newList = res.data
          this.newListMap = res.data
          this.flag = true
        })
      },
      newListChange(data){
        this.newListMap = data
      },
      //获取当日
      get_EventInfo() {
        this.$refs.todolist.loadingStatus()
        let data = {
          page: this.todayPage,
          number: 5,
          getDate: this.getToday(1)
        }
        // console.log(year + month + _date)
        // console.log(month)
        console.log(data)
        getEventInfo(data).then(res => {
          this.$refs.todolist.loadingStatus()
          this.toDayList = res.data.data
          this.toDayTotal = res.data.sum
        })
      },
      //当日分页
      updatePageToDay(page) {
        this.todayPage = page;
        this.get_EventInfo()
      },
      //获取昨日
      get_bEventInfo(time) {
        this.$refs.todolist1.loadingStatus()
        this.bygoneDayTime = time
        let data = {
          page: this.bygoneDayPage,
          number: 5,
          getDate: this.bygoneDayTime || this.getToday(0)
        }
        // console.log(year + month + _date)
        // console.log(month)
        console.log('&&&&&&&&&&&&&&&&&&&&&')
        console.log(data)
        getEventInfo(data).then(res => {
          this.$refs.todolist1.loadingStatus()
          this.bygoneDayList = res.data.data
          this.bygoneDayTotal = res.data.sum
          console.log(this.bygoneDayList)
        })
      },
      //获取昨日分页
      updatePageBygoneDay(page) {
        this.bygoneDayPage = page;
        this.get_bEventInfo()
      },
      getToday(day) {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let _date;
        if (day == 1) {
          _date = date.getDate()
        } else {
          _date = date.getDate() - 1
        }
        if (month <= 9) {
          month = 0 + month.toString()
        }
        if (_date <= 9) {
          _date = 0 + _date.toString()
        }
        return year + '-' + month + '-' + _date;
      },
      getMapWidth() {
        // console.log(this.sidebar.opened)
        this.$nextTick(() => {
          this.mapWidth = this.$refs.span17.clientWidth;
          this.$refs.map.style.width = this.mapWidth + 'px';
        })

      },
      changeFlag(flag){
        this.flag = flag;
      },
      birMap() {
        this.mapStatus = !this.mapStatus
        if (this.mapStatus) {
          this.$refs.map.style.width = '100%'
          this.$refs.map.style.height = '100vh'
          this.$refs.map.style.paddingRight = '0'
        } else {
          this.$refs.map.style.width = this.mapWidth + 'px'
          this.$refs.map.style.height = '618px'
          // this.$refs.map.style.paddingRight = '2px'
        }

      },
    }
  }
</script>

<style scoped lang="scss">

  .margin34 {
    margin-right: 34px;
  }

  .home {
    position: relative;
    height: 100%;
  }

  ._pla {
    width: 100%;
    height: 618px;
    position: relative;
    opacity: 0;
    z-index: -1;
  }

  .height {
    height: 100vh;
    /*padding: 0 27px 36px 34px;*/
    position: relative;
    top: 0;
    width: 100%;
  }

  .margintop20 {
    margin-top: 25px;
  }

  .row {
    width: 100%;
    position: relative;
    top: 0;
    height: 618px;
    overflow: hidden;
  }

  ._map {
    position: absolute;
    top: 0;
    width: 100%;
    height: 618px;
    transition: all .05s linear;
  }

  .row2 {
    position: relative;
    height: 299px;
    margin-top: 30px;

    div {
      height: 100%;
    }
  }


</style>

<style lang="scss">
  .rotate{
    .pla {
      transform: rotateY(180deg);
    }
    .subtitle{
      text-align: right;
    }
  }
</style>
