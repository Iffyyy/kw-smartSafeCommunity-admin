<template>
  <div class="operation-container">
    <div>
      <div>操作日志</div>
      <el-select
        size="mini"
        v-model="queryInfo.type"
        class="input-class"
        placeholder="请选择日志类型"
        @change="searchLog"
      >
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <!-- <el-date-picker v-model="queryInfo.start" type="datetime" placeholder="选择开始时间"></el-date-picker>
      <el-date-picker v-model="queryInfo.end" type="datetime" placeholder="选择结束时间"></el-date-picker>-->

      <el-date-picker
        class="date-query"
        v-model="datetime"
        type="daterange"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        @change="searchLog"
      ></el-date-picker>
      <el-input
        size="mini"
        prefix-icon="padd-bo"
        class="input-class"
        v-model="queryInfo.user_name"
        placeholder="请输入用户名称或昵称"
      >
        <template slot="prefix">
          <p class="cal">
            <img src="../../../assets/report/person.png" alt />
          </p>
        </template>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchLog(1)">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="85%">
      <el-table-column prop="user_name" align="center" width="200" label="用户名"></el-table-column>
      <el-table-column prop="operation_type" align="center"  width="320" label="类型"></el-table-column>
      <el-table-column prop="content" align="center" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="created_at" align="center"  width="300" label="时间"></el-table-column>
    </el-table>

    <div class="bottom-pagination">
      <el-pagination
        background
        :current-page="queryInfo.page"
        layout="prev, pager, next"
        :page-size="queryInfo.number"
        :total="total"
        @current-change="updatePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import accountBg from "@/assets/system/role-bg.png";
import border from "@/assets/system/border.png";

import { getList, getType } from "@/api/system/log";

export default {
  components: {},
  data() {
    return {
      imgS: {
        accountBg: accountBg,
        border: border
      },
      value: false,
      tableData: [],
      visible: false,
      showFlag: false,
      datetime: [],
      queryInfo: {
        number: 15,
        page: 1,
        datetime:[]
      },
      total: 0,
      options: [],
      typeList: []
    };
  },
  created() {
    this.loadType();
    this.searchLog();
  },
  methods: {
    searchLog() {
      let data = JSON.parse(JSON.stringify(this.queryInfo))
      if (data.datetime.length) {
        data.datetime = data.stringify(data.datetime);
      }
      getList(this.queryInfo).then(res => {
        if (res.code === 2000) {
          this.tableData = res.data.data;
          this.total = res.data.sum
        }
      });
    },
    loadType() {
      getType().then(res => {
        if (res.code === 2000) {
          this.typeList = res.data;
        }
      });
    },
    updatePage(page) {
      this.queryInfo.page = page;
      this.searchLog();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
$imgUrl: "../../../assets/";
.operation-container {
  width: 100%;
  height: 100%;
  position: relative;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 66%;

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
  }

  .el-table {
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

.input-class {
  width: 200px;
}
</style>

<style lang="scss">
.operation-container .el-button--primary {
  width: 89px;
  height: 40px;
  color: #041d36;
}
.operation-container .el-input__suffix-inner::before {
  content: "类型";
  font-size: 16px;
  margin-left: 10px;
  color: #00ccff;
}
</style>

