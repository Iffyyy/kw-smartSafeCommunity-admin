<template>
  <div class="inout-container">
    <div>
      <div>出入记录</div>
      <el-form :model="queryInfo" class="query-input-part">
      <!--  <el-form-item>
          <el-select size="mini" v-model="queryInfo.building">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="mini" v-model="queryInfo.unit">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="mini" v-model="queryInfo.house">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <div class="building">
          <BuildingSelect :reportInfo="queryInfo"></BuildingSelect>
        </div>
        <div class="center">
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth170"
              v-model="queryInfo.phone"
              placeholder="请输入手机号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img style="width:20px" src="../../../assets/report/phone.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth170 room"
              v-model="queryInfo.name"
              placeholder="请输入姓名"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../../assets/report/person.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth195"
              v-model="queryInfo.access_card_no"
              placeholder="请输入卡号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../../assets/report/cal.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              class="date-query"
              v-model="queryInfo.datetime"
              type="daterange"
              range-separator="—"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchUser(1)">查询</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="86%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column align="center" label="性别" width="100">
        <template slot-scope="scope">{{ scope.row.sex===1?'男':'女' }}</template>
      </el-table-column>
      <el-table-column prop="role" align="center" label="角色" show-overflow-tooltip>
        <template slot-scope="scope">
         {{ getPermission(scope.row.roles) }}
          <!-- <span v-for="item in scope.row.roles">{{item}}&nbsp;&nbsp;</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="door_name" align="center" label="出入位置">
        <template slot-scope="scope">{{ scope.row.door_name|| scope.row.unit_code}}</template>
      </el-table-column>
      <el-table-column prop="attrstationName" align="center" label="授权方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="IC" align="center" width="200" label="卡号"></el-table-column>
      <el-table-column prop="entrace_time" align="center" width="200" label="出入时间"></el-table-column>
      <!-- <el-table-column prop="unit_code" align="center" label="楼栋室号" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="address" align="center" label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="showPic(scope.row)">查看截图</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom-pagination">
      <el-pagination background layout="prev, pager, next"  :current-page="queryInfo.page" :page-size='queryInfo.number' :total="total" @current-change="updatePage"></el-pagination>
    </div>

    <!-- 截图信息 -->
    <el-dialog :visible.sync="showFlag" class="show-picinfo">
      <img :src="picInfo.pic_url" />
      <div class="person-access">
        <div>姓名：{{picInfo.name}}</div>
        <div>
          <span>{{picInfo.door_name||picInfo.unit_code}}</span>
          <span>{{picInfo.entrace_time}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import accountBg from "@/assets/system/role-bg.png";
import border from "@/assets/system/border.png";

import { getAccessRecord } from "@/api/system/access";
import BuildingSelect from '@/components/BuildingSelect'
import {formatArray} from "../../../utils";

export default {
  components: {BuildingSelect},
  data() {
    let _minTime = null;
    let _maxTime = null;
    return {
      imgS: {
        accountBg: accountBg,
        border: border
      },
      tableData: [],
      visible: false,
      showFlag: false,
      queryInfo: {
        // building:'',
        // unit:'',
        // house:'',
        // phone:'',
        // name:'',
        // access_card_no:'',
        page: 1,
        number: 15
      },
      total:0,
      options: [],
      pickerOptions: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            let timeRange = 6 * 24 * 60 * 60 * 1000; // 6天
            _minTime = time.minDate.getTime() - timeRange; // 最小时间
            _maxTime = time.minDate.getTime() + timeRange; // 最大时间
            // alert(_maxTime > Date.now())
            if (_maxTime > Date.now()) {
              _maxTime = Date.now(); // 最大时间
            } //如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null;
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime;
          }
          return time.getTime() > Date.now();
        }
      },
      picInfo:{},
    };
  },
  created() {
    if(this.$route.query.id){
      const id=this.$route.query.id
      this.queryInfo.building=id
    }
    this.loadAccessRecord();
  },
  methods: {
    handleSelectionChange() {},
    searchUser(page) {
      this.loadAccessRecord(page)
    },
    showPic(data) {
      this.showFlag = true;
      this.picInfo=data
    },
    loadAccessRecord(page) {
      let data = JSON.parse(JSON.stringify(this.queryInfo))
      data.page = page || data.page
      try {
        if(data.datetime.length){
          data.datetime = JSON.stringify(data.datetime)
        }
      }catch (e) {

      }
      getAccessRecord(data).then(res => {
        this.tableData = res.data.data;
        this.total=res.data.sum
      });
    },
    updatePage(page){
      this.queryInfo.page = page;
      this.loadAccessRecord()
    },
    getPermission(data){
      return data.join('，')
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
$imgUrl: "../../../assets/";
.inout-container {
  width: 100%;
  height: 100%;
  position: relative;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
      font-size: 28px;
      color: $navText;
      font-weight: 400;
      min-width: 120px;
      margin-right: 10px;
      margin-top: 4px;
    }
  }

  .search-input {
    height: 40px;
    width: 24%;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .el-table {
    /* margin-top: 30px; */
    overflow: hidden;
    border: 1px solid #00ccff;
    padding: 4px;
  }
  .bottom-pagination {
    height: 40px;
    width: 100%;
    position: absolute;
    bottom: -1%;
    display: flex;
    justify-content: center;
  }
}
.cal {
  width: 28px;
  margin: 0 10px;
}

.date-query {
  width: 300px;
}
.show-picinfo {
  z-index: 3000;

  img {
    width: 800px;
    min-height: 360px;
    max-height: 560px;
  }

  .person-access {
    position: absolute;
    bottom: 6px;
    background: rgba(4, 29, 54, 0.72);
    width: 800px;
    height: 78px;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 8px 20px;
    font-size: 18px;
    opacity: 0;
    transition: all 0.5s;

    > div:nth-child(2) {
      > span:nth-child(1)::before {
        content: "";
        background: center / contain url($imgUrl+"common/location.png")
          no-repeat !important;
        width: 14px;
        height: 16px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: baseline;
      }

      > span:nth-child(2)::before {
        content: "";
        background: center / contain url($imgUrl+"common/time.png") no-repeat !important;
        width: 14px;
        height: 16px;
        display: inline-block;
        margin-right: 10px;
        margin-left: 80px;
        vertical-align: baseline;
      }
    }
  }
}
</style>

<style lang="scss">
.query-input-part {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  height: 70px;
   width: 90%;
  .building{
    flex: 3;
    padding-top: 3px;
    margin-right: 10px;
  }
  .center{
    flex: 5;
  }
  > .el-form-item:not(:last-child) {
    /* width: 13%; */
  }
  > .center .el-form-item:not(:nth-child(1)) {
    margin-left: 10px;
  }


  .el-button--primary {
    color: #041d36;
  }
}
.show-picinfo .el-dialog {
  width: 800px;
  background-color: transparent;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
    position: relative;
    margin-top: 260px;
    /* background: red; */

    &:hover {
      .person-access {
        opacity: 1;
      }
    }
  }
}
</style>

