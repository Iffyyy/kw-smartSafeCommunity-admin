<template>
  <div class="account-container">
    <img :src="imgS.accountBg"/>
    <div>
      <el-button type="success" icon="el-icon-plus" @click="viewIt">添加</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="deleteIt">删除</el-button>
      <el-autocomplete
        class="search-input"
        v-model="search"
        ref="search"
        clearable
        :fetch-suggestions="querySearch"
        placeholder="请输入姓名/手机号搜索"
        :trigger-on-focus="false"
        @select="get_searchAccount(1)"
      >
        <el-button type="primary" slot="append" icon="el-icon-search" @click="get_searchAccount(1)">搜索</el-button>
      </el-autocomplete>
      <!--   <el-input class="search-input" v-model="search" placeholder="请输入姓名/手机号搜索" @input="getAccounts">
           <el-button type="primary" slot="append" icon="el-icon-search" @click="get_searchAccount(1)">搜索</el-button>
         </el-input>-->
      <el-table
        ref="multipleTable"
        :data="account"
        tooltip-effect="dark"
        height="85%"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号名称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="用户角色">
          <template slot-scope="scope">
            {{ getPermission(scope.row.roles) }}
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="管线区域" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" align="center" label="启用/禁用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="updateAccount(scope.row,'single')" active-color="#26CBA9"
                       inactive-color="#FC4F55"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="操作">
          <template slot-scope="scope">
            <el-button plain size="mini" @click="resetPassword(scope.row.id)">重置密码</el-button>
            <el-button plain size="mini" @click="updateAccount(scope.row,'multi')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="bottom-pagination">
        <el-pagination background :current-page="page" @current-change="updatePage" :page-size="10"
                       layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
    <add-new ref="addNew" :visible.sync="showInfo" @clearData="clearData" :showData="accountForm"
             @updateAccount="updateAccountSan"></add-new>
  </div>
</template>

<script>
  import accountBg from "@/assets/system/role-bg.png";
  import border from "@/assets/system/border.png";

  import AddNew from "./components/AddNew";
  import {
    getAccounts,
    searchAccount,
    compileAccount,
    resetPassword,
    deleteUsers,
    register,
    cutStatus
  } from '@/api/system/account'
  import {formatArray} from "../../../utils";

  export default {
    components: {
      AddNew
    },
    data() {
      return {
        imgS: {
          accountBg: accountBg,
          border: border
        },
        value: false,
        update: false,
        visible: false,
        showInfo: false,
        accountForm: {
          id: '',
          phone: '',
          nickName: '',
          name: '',
          sex: '',
          roles: '',
          organization: '',
        },
        keyWordList: [],//获取账号列表
        account: [],//获取表格数据存放List
        search: '',//用户搜索关键字
        total: 1,
        page: 1,
        deleteIdList: [],
        isType: ''
      };
    },
    created() {
      this.getAccounts()
      this.get_searchAccount()
    },
    methods: {
      handleSelectionChange(val) {
        this.deleteIdList = formatArray(val, "id");
      },
      //删除账号
      deleteIt() {
        if (this.deleteIdList.length < 1) {
          return this.$message({
            message: "请至少选择一条信息",
            type: "error",
            offset: 100
          });
        }
        let data = {
          users: JSON.stringify(this.deleteIdList)
        };
        deleteUsers(data).then(res => {
          if (res.code === 2000) {
            this.$message({
              message: "删除成功",
              type: "success",
              offset: 100
            });
            this.get_searchAccount();
            this.getAccounts();
          }
        });
      },
      //重置密码确认框
      resetPassword(id) {
        // this.visible = true
        this.$confirm("此操作将重置该账号的密码，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.reset_Password(id)
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
              offset: 500
            });
          });
      },
      //重置密码接口
      reset_Password(id) {
        let data = {
          id: id
        }
        resetPassword(data).then(res => {
          // alert(res.code)
          if (res.code === 2000) {
            this.$message({
              type: "success",
              message: "重置成功!",
              offset: 100,
              // duration:0
            });
          }
        })
      },
      viewIt() {
        this.isType = 'add'
        this.showInfo = true;
      },
      //获取所有关键字信息
      getAccounts() {
        console.log(this.search)
        getAccounts({search: this.search}).then(res => {
          console.log(res)
          let data = res.data.map(item => {
            return {value: item.name}
          })
          let data1 = res.data.map(item => {
            return {value: item.phone}
          })
          this.keyWordList = [].concat(data, data1)
        })
      },
      //获取表格信息
      get_searchAccount(page) {
        this.page = page || this.page;
        // if(typeof page != 'undefined'){
        //   this.page = page
        // }
        let data = {
          page: this.page,
          number: 10,
          search: this.search
        }
        searchAccount(data).then(res => {
          let data = JSON.parse(JSON.stringify(res.data.data))
          // console.log(res.data.data)
          // console.log(data)
          this.account = data.map(item => {
            if (item.status == 1) {
              item.status = true
            } else {
              item.status = false
            }
            return item
          });
          this.total = res.data.sum;
        })
      },
      //分页
      updatePage(page) {
        this.page = page;
        this.get_searchAccount()
      },
      //修改禁用启用状态
      updateAccount(itemData, status) {
        let data = JSON.parse(JSON.stringify(itemData))
        this.isType = 'update'
        if (data.status == true) {
          data.status = 1
        } else {
          data.status = 0
        }
        // alert(status)
        if (status == 'multi') {
          // console.log(data)
          this.accountForm = data;
          this.showInfo = true;
          return
        }
        if (status == 'single') {
          let sta = {
            id: data.id,
            status: data.status
          }
          this.update_cutStatus(data)
          return
        }
        // delete data.phone
        this.updateAccountSan(data)

      },
      //启用禁用
      update_cutStatus(data) {
        cutStatus(data).then(res => {
          console.log(res)
          this.$message({
            message:'修改成功',
            type:'success',
            offset:'500'
          })
          this.get_searchAccount()
        })
      },
      updateAccountSan(data) {
        data.roles = data.roles.length > 0 ? JSON.stringify(data.roles.map(item => item.id | item)) : '[]';
        if (this.isType === 'add') {
          this.add_register(data)
          return
        }
        compileAccount(data).then(res => {
          if (res.code === 2000) {
            this.get_searchAccount()
            this.$message.success('修改成功')
            this.$refs.addNew.canceIt()
          }
        })
      },
      add_register(data) {
        this.accountForm = {};
        delete data.id
        register(data).then(res => {
          // console.log(res)
          if (res.code === 2000) {
            this.get_searchAccount()
            this.$message.success('添加成功')
            this.$refs.addNew.canceIt()
          }
        }, error => {
          this.$refs.addNew.rolesList()
          // data.roles = []
        })
      },
      handleSelectionChange(val) {
        this.deleteIdList = formatArray(val, "id");
      },
      getPermission(data) {
        return formatArray(data, 'name').join('，')
      },
      querySearch(queryString, cb) {
        let restaurants = this.keyWordList;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      clearData() {
        this.accountForm = {};
      },
    }
  };
</script>

<style scoped lang="scss">
  .account-container {
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
        height: 40px;
        width: 24%;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .el-table {
        margin-top: 30px;
        /* height: 85%; */
        overflow-x: hidden;
        overflow-y: hidden;
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

