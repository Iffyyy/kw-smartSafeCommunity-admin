
<template>
  <div class="authority-container">
    <div>
      <div>权限管理</div>
      <el-form :model="queryInfo" class="query-input-part">
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
              class="selectWidth170 room "
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
<!--
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
-->
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
            <el-button type="primary" icon="el-icon-search" @click="get_personSearch(1)">查询</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="personSearchList"
      tooltip-effect="dark"
      style="width: 100%"
      height="86%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="90"></el-table-column>
      <el-table-column prop="phone1" align="center" label="手机"></el-table-column>
      <el-table-column prop="paper_number" align="center" label="身份证" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" align="center" width="130" label="角色" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ getPermission(scope.row.person_role) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" width="100" label="卡号">
        <template slot-scope="scope">
<!--          {{ getPermission(scope.row.access_card) }}-->
<!--          {{scope.row.access_card_id >= 1?'1':'暂无办卡'}}-->
          <i v-if="scope.row.access_card_id >= 1" class="el-icon-success success fontsize20"></i>
          <i v-else class="el-icon-error error fontsize20"></i>
        </template>
      </el-table-column>
      <el-table-column prop="face" width="100" align="center" label="人脸">
        <template slot-scope="scope">
          <i v-if="scope.row.face_id >= 1" class="el-icon-success success fontsize20"></i>
          <i v-else class="el-icon-error error fontsize20"></i>
        </template>
      </el-table-column>
      <el-table-column prop="unit_code" align="center" label="楼栋号" show-overflow-tooltip>
        <template slot-scope="scope">
          <p v-for="item in scope.row.building_name">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="statusImg" v-if="scope.row.status == 1"><img src="../../../assets/system/success.png" alt="正常"></span>
          <span class="statusImg" v-else><img src="../../../assets/system/error.png" alt="禁用"></span>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="showPic(scope)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-pagination">
      <el-pagination background :current-page="page" layout="prev, pager, next" :total="total" @current-change="updatePage"></el-pagination>
    </div>
    <updateAuthority :visible.sync="visible"></updateAuthority>

  </div>
</template>

<script>
  import accountBg from "@/assets/system/role-bg.png";
  import border from "@/assets/system/border.png";
  import updateAuthority from "./components/updateAuthority";
  import { personSearch } from '@/api/system/authority'
  import {formatArray} from "../../../utils";
  import BuildingSelect from '@/components/BuildingSelect'

  export default {
    components: {updateAuthority,BuildingSelect},
    data() {
      let _minTime = null;
      let _maxTime = null;
      return {
        imgS: {
          accountBg: accountBg,
          border: border
        },
        value: false,
        tableData: [],
        visible: false,
        showFlag: false,
        queryInfo: {
          number:10
        },
        options: [],
        page:1,
        total:0,
        personSearchList:[],
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
      };
    },
    created() {
      this.get_personSearch()
    },
    methods: {
      handleSelectionChange() {},
      searchUser() {},
      deleteIt() {
        this.$message({
          showClose: true,
          message: "请至少选择一条信息",
          type: "error",
          offset: 500
        });
      },
      showPic() {
        this.visible = true;
      },
      canceIt() {},
      get_personSearch(page){
        this.page = this.page || page
        let data = JSON.parse(JSON.stringify(this.queryInfo))
        data.page = this.page;
        try {
          if(data.datetime.length){
            data.datetime = JSON.stringify(data.datetime)
          }
        }catch (e) {

        }

        personSearch(data).then(res=>{

          this.personSearchList = res.data.data
          this.total = res.data.sum
        })
      },
      updatePage(page){
        this.page = page;
        this.get_personSearch()
      },
      getPermission(data) {
        return formatArray(data, 'name').join(',')
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";
  $imgUrl: "../../../assets/";
  .authority-container {
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

    > img {
      /* width: 28px; */
      /* height: 20px; */
    }
  }
  .show-picinfo {
    z-index: 3000;

    /* .reset-content {
    } */
    img{
      width: 800px;
      /* height: 400px; */
    }

    .person-access{
      position: absolute;
      bottom: 6px;
      background: rgba(4,29,54,0.72);
      width: 800px;
      height: 70px;
      color: rgba(255,255,255,0.9);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 8px 20px;
      font-size: 14px;

      >div:nth-child(2){
        >span:nth-child(1)::before{
          content: "";
          background: center / contain url($imgUrl+"common/location.png")
        no-repeat !important;
          width: 14px;
          height: 16px;
          display: inline-block;
          margin-right: 10px;
          vertical-align: baseline;
        }

        >span:nth-child(2)::before{
          content: "";
          background: center / contain url($imgUrl+"common/time.png")
        no-repeat !important;
          width: 14px;
          height: 16px;
          display: inline-block;
          margin-right: 10px;
          margin-left: 80px;
          vertical-align: middle;
        }
      }
    }
  }
  .statusImg{
    width: 34px;
    height: 34px;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
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
      width: 13%;
    }
    > .center .el-form-item:not(:nth-child(1)) {
      margin-left: 10px;
    }

    .el-button--primary {
      color: #041d36;
    }
  }
</style>
