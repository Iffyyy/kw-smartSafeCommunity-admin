<template>
  <div class="role-Configuration">
    <!--   <div>人员事件场景</div>
       <div>公共事件场景</div>
       <div>设备事件场景</div>-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="人员事件场景" name="first">
        <div class="border">
          <el-table
            ref="multipleTable"
            :data="tableData"
            cell-class-name="paddingLeft30"
            :show-header="false"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="角色名称" align="left" width="200"></el-table-column>
            <el-table-column prop="name" align="left" label="角色权限" width="350">
              <template slot-scope="scope">
                <div class="role">
                  <div class="roles">
                    <div class="role-input">
                      <el-input v-model="minute"></el-input>
                    </div>
                    <p class="infoColor">/ 时间段</p>
                  </div>
                  <div class="roles">
                    <div class="role-input">
                      <el-input v-model="minute"></el-input>
                    </div>
                    <p class="infoColor">/ 时间段</p>
                  </div>

                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="left" label="角色描述" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="bottom-pagination">
          <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公共事件场景" name="second">
        <div class="border">
          <el-table
            ref="multipleTable"
            :data="tableData"
            cell-class-name="paddingLeft30"
            :show-header="false"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="角色名称" align="left" width="200"></el-table-column>
            <el-table-column prop="name" align="left" label="角色权限" width="300"></el-table-column>
            <el-table-column prop="address" align="left" label="角色描述" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="bottom-pagination">
          <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备事件场景" name="third">
        <div class="border">
          <el-table
            ref="multipleTable"
            :data="tableData"
            cell-class-name="paddingLeft30"
            :show-header="false"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="name" label="角色名称" align="center" width="200"></el-table-column>
            <el-table-column prop="name" align="center" label="角色权限" width="300"></el-table-column>
            <el-table-column prop="address" align="center" label="角色描述" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="bottom-pagination">
          <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        total:0,
        tableData: [
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          }
        ],
        activeName: 'first',
        minute: 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .role-Configuration {
    .border {
      border: 1px solid #0cf;

      .role {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .roles {
          width: 50%;
          display: flex;
          align-items: center;
        }

        .role-input {
          width: 36%;
          margin-right: 10px;
        }
      }
    }

    .bottom-pagination {
      height: 40px;
      width: 100%;
      /*position: absolute;*/
      /*bottom: 1%;*/
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
</style>
<style lang="scss">

  .el-autocomplete-suggestion {
    background-color: rgb(13, 47, 88);
    border: none;
  }

  .el-autocomplete-suggestion li {
    color: rgba(255, 255, 255, 0.8);

    &:hover {
      background-color: rgba(6, 32, 63, 0.8);
    }
  }
</style>
<style lang="scss">
  .role-Configuration {
    .el-tabs__nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 108px;
    }

    .el-tabs__item {
      width: 100%;
      color: #fff;
      text-align: center;
      font-size: 18px;
      border-right: 1px solid #0cf;
    }

    .el-tabs--top .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
      text-align: left;
      box-sizing: border-box !important;
      flex: 1.5;
    }

    .el-tabs--top .el-tabs__item.is-top:nth-child(3), .el-tabs--top .el-tabs__item.is-bottom:nth-child(3), .el-tabs--bottom .el-tabs__item.is-top:nth-child(3), .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(3) {
      width: 46%;
      flex: 3;
    }

    .el-tabs--top .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
      border-right: none;
      text-align: right;
      flex: 1.5;
    }

    .el-tabs__header is-top {
      height: 40px;

    }

    .el-tabs__nav-wrap::after {
      content: '';
      height: 0;
    }

    .el-tabs__active-bar {
      height: 0;
    }

    .is-active {
      color: #0cf;
    }

    .el-table th, .el-table td {
      padding: 12px 0 12px 40px;
    }

    .el-input__inner {
      color: #FF2C2C !important;
      text-align: center;;
    }
  }
</style>
