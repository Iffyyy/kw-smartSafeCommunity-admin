<template>
  <div class="building-select">
    <el-form class="building-form center" :model="reportInfo">
      <el-form-item>
        <el-select class="padd-bo zxhs" clearable size="mini" @change="get_VillageGetUnit()" v-model="reportInfo.building">
          <el-option
            v-for="item in buildingList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" clearable class="padd-bo unit" @change="get_VillageGetHouse()" v-model="reportInfo.unit">
          <el-option
            v-for="item in unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" clearable class="padd-bo room" v-model="reportInfo.house">
          <el-option
            v-for="item in houseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {villageGetBuilding, villageGetUnit, villageGetHouse} from '@/api/report'

  export default {
    name: "buildingSelectIndex",
    props: {
      reportInfo: {
        type: Object,
      }
    },
    data() {
      return {
        buildingList: [],
        houseList: [],
        unitList: []
      }
    },
    created() {
      this.get_VillageGetBuilding()
    },
    methods: {
      get_VillageGetBuilding() {
    /*    if(this.reportInfo.building == ''){
          return
        }*/
        villageGetBuilding().then(res => {
          // console.log(res)
          // for (let i in res.data) {
          //   res.data[i].name = '33'
          // }
          // res.data.push({name: '哈哈', id: 2})
          this.buildingList = res.data
          console.log(this.buildingList)
        })
      },
      get_VillageGetHouse() {
        if(this.reportInfo.unit == ''){
          return
        }
        let data = {
          unit: this.reportInfo.unit,
        }
        console.log(data)
        villageGetHouse(data).then(res => {
          this.houseList = res.data
        })
      },
      get_VillageGetUnit() {
        if(this.reportInfo.building == ''){
          return
        }
        let data = {
          building: this.reportInfo.building,
        }
        console.log(data)
        villageGetUnit(data).then(res => {
          this.unitList = res.data
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .building-form {
    width: 100% !important;

  .padd-bo {
    margin-left: 10px;
  }

  }
  .building-select {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  .building-select {

    .zxhs .el-input__suffix-inner::before {
      content: '幢';
      font-size: 17px;
      margin-left: 10px;
      color: #00CCFF;
    }

    .unit .el-input__suffix-inner::before {
      content: '单元';
      font-size: 17px;
      margin-left: 10px;
      color: #00CCFF;
    }

    .room .el-input__suffix-inner::before {
      content: '室';
      font-size: 17px;
      margin-left: 10px;
      color: #00CCFF;
    }
  }
</style>
