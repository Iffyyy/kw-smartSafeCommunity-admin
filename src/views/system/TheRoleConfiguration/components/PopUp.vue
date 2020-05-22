<template>
  <el-dialog :visible.sync="showFlag" class="popUp center" @close="canceIt">
    <div class="role-pop-up">
      <p class="pop-up-title fontColor fontsize20">添加角色</p>
      <div class="pop-content">
        <el-form :model="userRole" ref="userRole" :rules="rules">
          <div class="user-input center">
            <el-form-item prop="roleName" class="name">
              <el-input v-model="userRole.roleName" placeholder="请输入角色名称">
                <template slot="prefix">
                  <p class="cal">
                    <img src="../../../../assets/report/person.png" alt/>
                  </p>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="description" class="remark">
              <el-input v-model="userRole.description" placeholder="请输入角色描述">
                <template slot="prefix">
                  <p class="cal">
                    <img src="../../../../assets/system/edit.png" alt/>
                  </p>
                </template>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="role-checkout">
          <div class="center">
            <p class="subtitle infoColor fontsize16">角色权限</p>
            <p class="infoColor fontsize12 export-report">
              <span>“ <img src="../../../../assets/report/tick.png" alt=""> ”</span>勾选添加条件
            </p>
          </div>
          <div class="checkout-list">
            <div v-for="(item,index) in menuList" class="row">
              <div>
                <el-checkbox
                  v-model="item.select"
                  @change="e => checkAllBasic(e,index)">
                  {{item.name}}
                </el-checkbox>
              </div>
              <div class="checkout-item">
                <el-checkbox-group v-model="item.permissions" @change="e => handleCheckedBasic(e,index)" size="mini">
                  <el-checkbox size="mini" v-for="menuSan in item.child" :label="menuSan.id" :value="menuSan.id">
                    {{menuSan.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
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
  import menuData from './menuData'
  import {getPermissions, addRole} from '@/api/system/role'

  export default {
    name: "PopUp",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户角色名称"));
        } else {
          // if (this.ruleForm.checkPass !== "") {
          //   this.$refs.ruleForm.validateField("checkPass");
          // }
          callback();
        }
      };
      return {
        menuList: [],
        menu: '',
        showFlag: this.visible,
        userRole: {
          roleName: '',
          description: ''
        },
        rules: {
          roleName: [{validator: validatePass, trigger: "blur"}],
        }
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
        this.resetData()
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
         return item.select == true || item.permissions.length > 0
        })
        list = list.map(item => {
          return {fatherId: item.id, sanValue: item.permissions}
        })
        let permissionsList = list.map(item => item.sanValue).flat()
        let fatherIdList = list.map(item => item.fatherId)
        data.permissions = JSON.stringify([].concat(permissionsList, fatherIdList))
        addRole(data).then(res => {
            this.$message({
              message:'添加账号成功',
              type:'success',
              offset:500
            })
          this.canceIt()
          this.$parent.initial()
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../../styles/variables.scss';

  .role-pop-up {
    width: 100%;
    /*height: 60%;*/
    height: 610px;
    background: #041D36;
    overflow: hidden;
    position: relative;
    border-radius: 30px;

    .pop-up-title {
      text-align: center;
      font-weight: 400;
      line-height: 66px;
      background-color: #002447;
    }

    .pop-content {
      padding: 0 30px;
      height: calc(100% - 66px);
      position: relative;

      .center {
        justify-content: space-between;
      }

      .user-input {
        padding-top: 3%;

        .name {
          width: 33%;
        }

        .remark {
          width: 58.6%;
        }
      }
    }

    .cal {
      width: 28px;
      margin: 0 10px;
    }

    .role-checkout {
      height: 75%;
      overflow-x: hidden;
      border: 1px solid #0cf;
      /*margin-top: 3%;*/
      overflow-y: scroll;
      max-height: 370px;
    }
  }

  .role-checkout {
    .center {
      width: 23%;
      height: 50px;
      min-width: 200px;

      .subtitle {
        padding-bottom: 0;
      }
    }

    .export-report {
      img {
        width: 16px;
      }
    }

    .checkout-list {
      padding-left: 21px;
      margin-top: 15px;

      .row {
        display: flex;
        align-items: flex-start;
        min-height: 42px;
      }

      .row > :first-child {
        position: relative;
        /*<!--top: -5px;-->*/
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-around;
    padding: 0 150px;
    margin-top: 20px;
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

  .checkout-list .checkout-item .el-checkbox__inner {
    width: 14px;
    height: 14px;
  }
</style>
<style lang="scss">
  @import "@/styles/variables.scss";

  .popUp .el-dialog {
    width: 58%;
    min-width: 800px;
    height: 610px;
    overflow: hidden;
    margin-top: 0vh !important;
    background-color: transparent;
    border-radius: 30px;

    .el-dialog__header {
      background-color: rgba(0, 57, 100, 1);
      text-align: center;
      height: 0;
      border-radius: 18px 18px 0 0;
      padding: 0;
      padding-bottom: 0;

      .el-dialog__title {
        color: white;
        letter-spacing: 1px;
      }
    }

    .el-dialog__body {
      background-color: rgba(4, 29, 54, 1);
      border-radius: 0 0 18px 18px;
      padding: 0 0 0 0;

      .el-form {
        .el-form-item .el-form-item__content .el-input {
          height: 44px;
          color: $navText;

          .el-input__inner {
            padding-left: 70px;
          }

          .el-input__suffix {
            .el-icon-circle-check,
            .el-icon-circle-close {
              line-height: 25px;
            }

            .el-icon-circle-check {
              color: $navText;
            }
          }

          &::before {
            /* content: "原密码"; */
            display: inline-block;
            padding: 0 20px;
            /* width: 68px; */
            height: 24px;
            line-height: 24px;
            position: absolute;
            /* margin-left: 20px; */
            margin-top: 8px;
            border-right: 1px solid;
          }
        }

        .is-error .el-input {
          /* color: #F56C6C!important;

          .el-input__inner{
            border-color: #F56C6C!important;
          } */
        }

        > .el-form-item:nth-child(1) .el-form-item__content .el-input {
          &::before {
            content: "原密码";
          }
        }

        > .el-form-item:nth-child(2) .el-form-item__content .el-input {
          &::before {
            content: "新密码";
          }
        }

        > .el-form-item:nth-child(3) .el-form-item__content .el-input::before {
          content: "确认密码";
        }

        > .el-form-item:not(:last-child) {
          padding: 0 88px;
        }
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
  }
</style>
