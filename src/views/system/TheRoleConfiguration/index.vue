<template>
  <div class="role-container">
    <img :src="imgS.roleBg" />
    <div>
      <el-button type="success" icon="el-icon-plus" @click="add">添加</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteIt">删除</el-button>
      <el-autocomplete
        class="search-input"
        :fetch-suggestions="querySearch"
        placeholder="请输入角色名称"
        v-model="queryInfo.search"
        clearable
        @clear="initial"
      >
        <el-button type="primary" slot="append" icon="el-icon-search" @click="initial">搜索</el-button>
      </el-autocomplete>

      <el-table
        ref="multipleTable"
        :data="roleList"
        tooltip-effect="dark"
        style="width: 100%"
        height="85%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center" width="200"></el-table-column>
        <el-table-column prop="role_permission" align="center" label="角色权限" width="700">
          <template slot-scope="scope">{{ getPermission(scope.row.role_permission) }}</template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="角色描述" show-overflow-tooltip></el-table-column>
      </el-table>

      <div class="bottom-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="queryInfo.number"
          :total="total"
          :current-page="queryInfo.page"
          @current-change="updatePage"
        ></el-pagination>
      </div>
    </div>
    <PopUp :visible.sync="visible"></PopUp>
  </div>
</template>

<script>
import roleBg from "@/assets/system/role-bg.png";
import border from "@/assets/system/border.png";
import PopUp from "@/views/system/TheRoleConfiguration/components/PopUp";

import {
  searchRole,
  deleteRole,
  systemGetRoles,
  compileRole
} from "@/api/system/role";
import { changeArray, formatArray } from "../../../utils";

export default {
  data() {
    return {
      imgS: {
        roleBg: roleBg,
        border: border
      },
      visible: false,
      deviceCountData: [],
      roleList: [],
      queryInfo: {
        search: "",
        page: 1,
        number: 10
      },
      total: 0,
      allRoles: [],
      deleteIdList: []
    };
  },
  components: { PopUp },
  created() {
    this.loadAllRole();
    this.searchRoleName();
  },
  methods: {
    initial() {
      this.queryInfo.page = 1;
      this.searchRoleName();
    },
    handleSelectionChange(val) {
      this.deleteIdList = formatArray(val, "id");
    },
    deleteIt() {
      if (this.deleteIdList.length < 1) {
        return this.$message({
          message: "请至少选择一条信息",
          type: "error",
          offset: 100
        });
      }
      let data = {
        roles: JSON.stringify(this.deleteIdList)
      };
      deleteRole(data).then(res => {
        if (res.code === 2000) {
          this.$message({
            message: "删除成功",
            type: "success",
            offset: 100
          });
          this.searchRoleName();
        }
      });
    },
    add() {
      this.visible = true;
    },
    searchRoleName() {
      searchRole(this.queryInfo).then(res => {
        if (res.code === 2000) {
          this.roleList = res.data.data;
          this.total = res.data.sum;
        }
      });
    },
    updatePage(page) {
      this.queryInfo.page = page;
      this.searchRoleName();
    },
    loadAllRole() {
      systemGetRoles().then(res => {
        if (res.code === 2000) {
          this.allRoles = changeArray(res.data, "name", "value");
        }
      });
    },
    querySearch(queryString, cb) {
      let allRoles = this.allRoles;
      let results = queryString
        ? allRoles.filter(role => {
            return (
              role.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          })
        : allRoles;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.searchRoleName();
    },
    getPermission(data) {
      return formatArray(data, "name").join(",");
    }
  }
};
</script>

<style scoped lang="scss">
.role-container {
  width: 100%;
  height: 100%;
  position: relative;

  > img {
    width: 100%;
    height: 101%;
  }

  > div {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 20px 30px;

    .search-input {
      height: 46px;
      width: 24%;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .el-table {
      margin-top: 30px;
      overflow: hidden;
      border: 1px solid #00ccff;
      padding: 4px;
    }

    .bottom-pagination {
      height: 40px;
      width: 100%;
      position: absolute;
      bottom: 1%;
      display: flex;
      justify-content: center;
    }
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
