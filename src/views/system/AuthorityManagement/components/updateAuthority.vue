<template>
  <el-dialog :visible.sync="showFlag" class="updateAuthority center" @close="canceIt">
    <div class="role-pop-up">
      <p class="pop-up-title fontColor fontsize20">角色切换</p>
      <div class="pop-content">
        <div>
          <el-select class="selectWidth" >
            <template slot="prefix">
              <span class="author infoColor fontsize16">角色切换</span>
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="role-checkout">
          <p class="subtitle fontColor fontsize16">*小区大门出入口</p>
          <div class="checkout-list">
            <div v-for="(item,index) in menuList" class="row">
              <div class="checkout-item">
                <el-checkbox-group v-model="item.permissions" @change="e => handleCheckedBasic(e,index)" size="mini">
                  <el-checkbox size="mini" v-for="menuSan in item.child" :label="menuSan.id" :value="menuSan.id">
                    {{menuSan.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="larg ">
            <el-checkbox>南门</el-checkbox>
            <el-checkbox>南门</el-checkbox>
            <el-checkbox>南门</el-checkbox>
            <el-checkbox>南门</el-checkbox>
          </div>
        </div>
        <div class="button-group">
          <button @click="resetForm('userRole')">取消</button>
          <button @click="confirm('userRole')">确定</button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {getPermissions, addRole} from '@/api/system/role'

  export default {
    name: "updateAuthority",
    data() {
      return {
        options: [
          {value: 1, label: '物业人员'},
          {value: 2, label: '保洁人员'},
          {value: 3, label: '物业人员A'},
          {value: 4, label: '保洁人员A'},
        ],
        showFlag: this.visible,
        menuList:[]
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible(newV) {
        this.showFlag = newV;
      }
    },
    created() {
      // console.log(this.menuList)
      this.get_Permissions()
    },
    methods: {
      get_Permissions() {
        getPermissions().then(res => {
          let data = res.data
          for (let i in data) {
            data[i].permissions = []
            data[i].select = false
            data[i].isIndeterminate = false
          }
          this.menuList = data
          console.log(this.menuList)

        })
      },
      checkAllBasic(value, index) {
        let menuList = this.menuList[index]
        let menuChildList = 'child'
        let menuChildListEd = 'permissions'
        let isIndeterminate = 'isIndeterminate'
        let data = menuList[menuChildList].map(item => {
          return item.id
        })
        menuList[menuChildListEd] = value ? data : [];

        menuList[isIndeterminate] = false;
      },
      handleCheckedBasic(value, index) {
        let menuList = this.menuList[index]
        let menuChildList = 'child'
        let select = 'select'
        let menuChildListEd = 'permissions'
        let isIndeterminate = 'isIndeterminate'
        let checkedCount = value.length;
        menuList[select] = checkedCount === menuList[menuChildList].length;
        this[isIndeterminate] = checkedCount > 0 && checkedCount < menuList[menuChildList].length;
      },
      //关闭弹框
      canceIt() {
        // this.resetData()
        this.$emit("update:visible", false);
      },
      resetForm(formName) {
        this.$emit("update:visible", false);
        this.$refs[formName].resetFields();
      },
      resetData() {
        let data = this.menuList
        for (let i in data) {
          data[i].permissions = []
          data[i].select = false
          data[i].isIndeterminate = false
          this.$refs.userRole.resetFields();
        }
      },
      confirm(formName) {

        this.$refs[formName].validate(valid => {
          if (valid) {
            // alert("submit!");
            // alert(1)
            this.add_Role()
          } else {
            // alert(2)
            console.log("error submit!!");
            return false;
          }
        });
      },
      add_Role() {

        let data = this.userRole
        let list = this.menuList.filter(item => {
          // console.log(item.permissions)
          return item.permissions.length > 0
        })
        list = list.map(item => {
          return {fatherId: item.id, sanValue: item.permissions}
        })
        let permissionsList = list.map(item => item.sanValue).flat()
        let fatherIdList = list.map(item => item.fatherId)
        data.permissions = JSON.stringify([].concat(permissionsList, fatherIdList))
        console.log(data)
        console.log(list)
        addRole(data).then(res => {
          console.log(res)
          this.resetData()
          Message.success('添加角色成功')
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../../styles/variables.scss';

  .role-pop-up {
    width: 100%;
    height: 100%;
    /*height: 610px;*/
    background: #041D36;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    padding: 0 30px 30px 30px;

    .pop-up-title {
      text-align: left;
      font-weight: 400;
      line-height: 66px;
      padding-left: 30px;
      /*background-color: #002447;*/
    }

    .pop-content {
      padding: 0 30px;
      height: calc(100% - 100px);
      position: relative;
      border: 1px solid #0cf;
      padding-top: 20px;

      .center {
        justify-content: space-between;
      }

      .selectWidth {
        width: 418px;
        .author {
          display: inline-block;
          padding: 0 8px;
          line-height: 35px;
          display: inline-block;
          border-right:1px solid #0cf ;
        }
      }
    }

    .cal {
      width: 28px;
      margin: 0 10px;
    }

    .role-checkout {
      /*height: 75%;*/
      height: 80%;
      margin-top: 10px;
      /*height: 600px;*/
      overflow-x: hidden;

      .subtitle {
        padding-bottom: 10px;
        padding-left: 0 !important;
      }
    }
  }

  .role-checkout {
    .center {
      width: 23%;
      height: 50px;
      min-width: 200px;

      .subtitle {
        padding-bottom: 0;
        padding-left: 0 !important;
      }
    }

    .export-report {
      img {
        width: 16px;
      }
    }

    .checkout-list {
      /*padding-left: 21px;*/
      height: 64%;
      width: 100%;
      display: flex;
      justify-content: start;
      overflow: hidden;
      /*margin-top: 15px;*/

      .row {
        display: flex;
        width: 200px;
        /*align-items: flex-start;*/
        min-height: 42px;
      }

      .row > :first-child {
        position: relative;
        /*<!--top: -5px;-->*/
      }
    }

    .larg {
      margin-top: 95px;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-around;
    padding: 0 150px;
    /*margin-top: 20px;*/
    /*position: absolute;*/
    /*bottom: 60px;*/
    /*left: 0;*/
    width: 100%;

    button {
      width: 136px;
      height: 46px;
      border-radius: 18px;
      color: $textWhite;
      cursor: pointer;
      letter-spacing: 2px;
    }

    button:nth-child(1) {
      background: none;
      border-color: $navText;
      color: $navText;
    }

    button:nth-child(2) {
      background: $navText;
      border-color: $navText;
    }
  }

  .reset-container {
    z-index: 3000;
  }
</style>
<style>
  .checkout-list .checkout-item .el-checkbox__label {
    font-size: 12px;
  }

</style>
<style lang="scss">
  @import "@/styles/variables.scss";

  .updateAuthority .el-dialog {
    width: 80%;
    min-width: 800px;
    height: 90%;
    overflow: hidden;
    margin-top: 0vh !important;
    background-color: transparent;
    border-radius: 30px;

    .el-dialog__header {
      height: 0;
      padding: 0;
      padding-bottom: 0;
    }

    .el-dialog__body {
      background-color: rgba(4, 29, 54, 1);
      border-radius: 0 0 18px 18px;
      padding: 0 0 0 0;
      height: 100%;


      .el-form-item .el-form-item__content .el-input {
        height: 44px;
        color: $navText;

      }

      .el-input--prefix .el-input__inner {
        padding-left: 100px !important;
        font-size: 16px;
        height: 50px!important;
      }

      .button-group .el-form-item__content {
        display: flex;
        justify-content: space-between;
        width: 100%;

        button {
          width: 136px;
          height: 46px;
          border-radius: 18px;
          color: $textWhite;
          cursor: pointer;
          letter-spacing: 2px;
        }

        button:nth-child(1) {
          background: none;
          border-color: $navText;
          color: $navText;
        }

        button:nth-child(2) {
          background: $navText;
          border-color: $navText;
        }
      }
    }

    .el-dialog__header .el-dialog__headerbtn {
      display: none;
    }

    .role-checkout .checkout-list .el-checkbox__inner {
      width: 13px;
      height: 13px;
    }

    .el-input__suffix {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-left: none;
    }
    .el-input__prefix{
      border-right: 0;
    }
    .el-select .el-input .el-select__caret{
      margin-top: 12px;
    }
    .larg .el-checkbox__label{
      font-size: 20px;
    }
    .larg .el-checkbox__inner{
      width: 18px;
      height:  18px;
    }
  }
</style>
