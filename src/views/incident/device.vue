<template>
  <div class="device-incident" :class="{'is-open':open}">
    <el-row :gutter="24" class="top-content">
      <el-col :span="17" class="total-device">
        <div class="device-main">
          <img :src="imgS.totalBg"/>
          <div class="base-line"></div>
          <div class="total-list">   
            <div class="total-item">
              <span>设备总数</span>
              <span>{{deviceInfo.deviceCount}}</span>
            </div>       
            <div class="total-item" v-for="item in deviceInfo.deviceTypeCount" :key="item.id">
              <span>{{item.name}}</span>
              <span>{{item.device_count}}</span>
            </div> 
          </div>
        </div>
        <div class="device-item">
          <incident-item
            v-for="(item,index) in deviceList"
            :key="index"
            class="item-style"
            :event="item"
            :showRate="false"
            
            @view="viewMore"
          ></incident-item>
        </div>
      </el-col>
      <el-col :span="7" class="device-analyze">
        <img :src="imgS.deviceBg"/>
        <div>
          <div>统计分析</div>
          <device-analyze :deviceData="deviceInfo"></device-analyze>
        </div>
      </el-col>
    </el-row>
    <el-row class="table-container">
      <img :src="listBg" style="position:absolute;width:100%;height:100%" />
      <div class="table-content">
        <div class="table-title">
          <span>设备报警记录</span>
          <span @click="switchList">展开列表</span>
        </div>
        <el-table :data="eventList" :height="open?'84%':'70%'" size="mini">
          <el-table-column align="center" :filters="eventTypeList" prop="devicetype.device_type" label="设备类别"></el-table-column>
          <el-table-column align="center" :filters="warningType" prop="eventlist.name" label="报警类型"></el-table-column>
          <el-table-column align="center" :filters="statusList" :filter-method="eventTypeFilter" prop="eventstatus.name" label="状态"></el-table-column>
          <el-table-column align="center" prop="building.code" label="位置"></el-table-column>
          <el-table-column align="center" prop="devicetype.device_ip" label="ip"></el-table-column>
          <!-- <el-table-column align="center" min-width="120px" prop="date" label="处理人"></el-table-column> -->
          <el-table-column align="center" min-width="120" prop="happen" label="发生时间"></el-table-column>
          <el-table-column align="center" min-width="120" prop="dispose_time" label="完成时间"></el-table-column>
          <el-table-column align="center" prop="text" label="操作" width="260">
            <template slot-scope="scope">
              <el-button plain size="small">报警推送</el-button>
              <el-button plain size="small" @click="$store.commit('event/VIEW_DETAIL',scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-pagination">
          <el-pagination
            v-if="open"
            background
            :current-page="queryInfo.page"
            :page-size='queryInfo.number'
            layout="prev, pager, next"
            :total="listTotal"
            @current-change="updateList">
          </el-pagination>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import IncidentItem from "./components/IncidentItem";
import DeviceAnalyze from "./components/DeviceAnalyze";

import imgUrl from "../../assets/common/event-table-bg.png";
import imgUrlLarge from "../../assets/common/table-bg-l.png";
import totalBg from "../../assets/common/device-total.png";
import deviceBg from "../../assets/common/device-bg.png";

import {loadList,loadEventList,loadDeviceCount} from '@/api/incident/device'

export default {
  components:{
    IncidentItem,
    DeviceAnalyze
  },
  data(){
    return {
      imgS:{
        totalBg:totalBg,
        deviceBg:deviceBg
      },
      iconList:['monitor','power','door','speak','room','other'],
      open: false,
      deviceList:[],
      eventList:[],
      deviceInfo:{},
      queryInfo:{
        page:1,
        number:5
      },
      listTotal:0,
      eventTypeList:[],
      warningType:[],
      handlerList:[],
      statusList:[],
    };
  },
  created(){
    this.loadListData()
    this.loadEventListData()
    this.loadDeviceInfo()
  },
  computed: {
    listBg() {
      return this.open ? imgUrlLarge : imgUrl;
    }
  },
  watch:{
    open(newV){
      if(newV){        
        this.queryInfo.page = 1
        this.queryInfo.number=20
      }else{
        this.queryInfo.page = 1
        this.queryInfo.number=5
      }
    }
  },
  methods: {
    updateList(val){
      this.queryInfo.page=val
      this.loadEventListData()
    },
    switchList() {
      if(this.open){
        delete this.queryInfo.eventList
      }
      this.open = !this.open;
      this.loadEventListData();
    },
    viewIt(){
       this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success',
        offset: 100
      });
    },
    loadListData(){
      loadList().then((res)=>{
        if(res.code===2000){
          this.deviceList=res.data
          let i=0
          this.deviceList.forEach(element => {
            // this.eventTypeList.push({
            //   value:element.name,
            //   text:element.name
            // })
            element.icon=this.iconList[i++]
          });
        }
      })
    },
    loadEventListData(){
      loadEventList(this.queryInfo).then((res)=>{
        if(res.code===2000){
          this.eventList=res.data.data
          this.listTotal=res.data.sum
          this.eventList.forEach(item=>{

            const tempList1=this.warningType.map(item=>item.value)
            if(tempList1.indexOf(item.eventlist.name)===-1){
              this.warningType.push({
                value:item.eventlist.name,
                text:item.eventlist.name,
              })
            }

            const tempList2=this.eventTypeList.map(item=>item.value)
            if(tempList2.indexOf(item.devicetype.device_type)===-1){
              this.eventTypeList.push({
                value:item.devicetype.device_type,
                text:item.devicetype.device_type,
              })
            }

            const tempList3=this.statusList.map(item=>item.value)
            if(tempList3.indexOf(item.eventstatus.name)===-1){
              this.statusList.push({
                value:item.eventstatus.name,
                text:item.eventstatus.name,
              })
            }
          })
        }
      })
    },
    eventTypeFilter(value, row, column){
      const property = column['property'].split('.');
      if(property.length===2){
        const temp=row[property[0]]
        return temp[property[1]] === value;
      }
      return row[property] === value;
    },
    loadDeviceInfo(){
      loadDeviceCount().then(res=>{
        if(res.code===2000){
          this.deviceInfo=res.data
        }
      })
    },
    viewMore(id){
      this.open=true
      this.queryInfo.eventList=id
      this.loadEventListData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
$imgUrl:'../../assets/';
.device-incident{
  width: 100%;
  height: 100%;

  .top-content{
    position: relative;
    height: 69%;
    transition: all 1s ease-in;

    .total-device{
      height: 100%;
      .device-main{
        position: relative;
        display: flex;
        justify-content: space-around;
        height: 19%;
        color: white;

        &>img{
          width: 100%;
          height: 100%;
        }
        .base-line{
          position: absolute;
          $width:90%;
          width: $width;
          height:2px;
          background:radial-gradient(circle,rgba(4,229,255,1) 0%,rgba(4,229,255,0) 100%);
          opacity:1;
          top: 50%;
        }
        .total-list{
          position: absolute;
          width: 100%;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          height: 100%;
          font-size: 22px;
          font-weight: 500;

          .total-item{
            display: flex;
            height: 68%;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          >div.total-item:nth-child(1){
            color: #04E5FF;
          }
        }
      }

      .device-item{
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        transition: all 1s ease-in;
        overflow-x: hidden;
        overflow-y: hidden;
        height: 79%;
        opacity:1;
        
        $width: 30%;
        .item-style {
          width: $width;
          height: 45.2%;
          font-size: 24px;
          margin-bottom: 20px;
        }

        &::after {
          content: "";
          display: block;
          width: $width;
        }
      }
    }

    .device-analyze{
      height: 100%;
      position: relative;

      &>img{
        position: absolute;
        width: calc(100% - 24px);
        height: calc(100% - 20px);
      }

      &>div{
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
        padding: 10px 0;
        font-weight: 500;
      }
    }
  }

  .table-container{
    width: 100%;
    position: relative;
    transition: all 0.4s ease-in;
    height: 33.2%;
    /* background: center / contain url($imgUrl+'common/event-table-bg.png') no-repeat; */

    .table-content {
      position: absolute;
      width: 100%;
      height: 99%;

      .table-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        & > span:nth-child(1) {
          font-size: 26px;
          color: white;
        }

        & > span:nth-child(2) {
          font-size: 22px;
          color: $navText;
          margin-top: 20px;
          cursor: pointer;

          &::after {
            content: "";
            display: inline-block;
            width: 24px;
            height: 18px;
            background: center / contain url($imgUrl+"common/up.png") no-repeat;
            margin: 0 80px 0 10px;
            vertical-align: text-bottom;
          }
        }
      }

      .bottom-pagination{
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
  }
}

.is-open{
  &>.top-content{
    height: 0;
    opacity: 0;
  }

  &>.table-container{
    width: 100%;
    height: 101%;
  }
  
  .table-title{
    & > span:nth-child(2){
      &::after{
        transform: rotate(180deg);
      }
    }
  }
}
</style>
