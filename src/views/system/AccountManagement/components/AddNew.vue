<template>
  <el-dialog
    :title="ruleForm.id?'编辑账号':'添加账号'"
    :visible.sync="showFlag"
    class="add-account-container"
    @close="canceIt"
  >
    <!-- <el-steps :space="200" align-center :active="0" finish-status="success">
      <el-step title="添加基础信息"></el-step>
      <el-step title="添加详细信息"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item prop="nickName">
            <el-input v-model="ruleForm.nickName" placeholder="请输入账号名称">
              <template slot="prefix">
                <span>账号名称</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="4">
          <el-form-item prop="phone">
            <el-input v-model.number="ruleForm.phone" placeholder="请输入联系电话">
              <template slot="prefix">
                <span>联系电话</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="sex">
            <div class="gender-class">
              <span>性别</span>
              <img :style="ruleForm.sex===1?'border:2px solid #00ccff;box-shadow:0 0 10px #00ccff':''" :src="imgS.male"
                   @click="ruleForm.sex=1"/>
              <img :style="ruleForm.sex===0?'border:2px solid #00ccff;box-shadow:0 0 10px #00ccff':''"
                   :src="imgS.female" @click="ruleForm.sex=0"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="4">
          <el-form-item class="select-class" prop="roles">
            <el-select v-model="ruleForm.roles" multiple placeholder="请选择角色">
              <el-option
                v-for="item in options"
                :label="item.name"
                :value="item.id"
              ></el-option>

              <template slot="prefix">
                <span>用户角色</span>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名">
              <template slot="prefix">
                <span>姓名</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="organization">
            <div class="textarea-class">
              <span>组织管理</span>

              <el-input v-model.number="ruleForm.organization" placeholder="请输入组织管理" type="textarea"
                        :rows="2"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="button-group">
        <button @click="resetForm('ruleForm')">取消</button>
        <button @click="submitForm('ruleForm')">确认</button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import male from "@/assets/system/man.png";
  import female from "@/assets/system/woman.png";

  import {getRoles} from '@/api/system/account'

  export default {
    name: "AddNew",
    props: {
      visible: {
        type: Boolean
      },
      showData: {
        type: Object,
        required: true
      }
    },
    data() {
      let phoneTest = (rule, value, callback) => {
        // alert(value)
        if (value == '') {
          return callback(new Error("请输入手机号"));
        } else
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error("手机号码有误，请输入正确格式"));
          } else {
            callback();
          }

      };
      return {
        showFlag: this.visible,
        rules: {
          name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          phone: [{validator: phoneTest, trigger: 'blur'}],
          nickName: [{required: true, message: '请输入昵称', trigger: 'blur'}],
          roles: [{type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change'}],
        },
        imgS: {
          male: male,
          female: female
        },
        options: [],
        value1: [],
        ruleForm: {
          phone: '',
          nickName: '',
          name: '',
          sex: 1,
          roles: [],
          organization: '',
        }
      };
    },
    watch: {
      visible(newV) {
        this.showFlag = newV;
      },
      showData: {
        deep: true,
        immediate: true,
        handler: function (newValue) {

          let newV = JSON.parse(JSON.stringify(newValue))

          // delete newValue.roles
          /*  console.log(newV)
            console.log(data)*/
          if(newV.roles){

            newV.roles = newV.roles.map(item => {
              return item.id | item
            })
          }

          for (let i in newV) {
            this.ruleForm[i] = newV[i]
          }

        }
      }
    },
    created() {
      this.get_Roles()
    },
    methods: {
      canceIt() {
        this.$emit("update:visible", false);
        this.restForm()
      },
      confirm() {
        this.$emit("handleConfirm");
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // console.log(this.ruleForm.roles)
            // console.log(this.ruleForm)
            this.$emit('updateAccount', this.ruleForm)
            // this.$emit('updateAccount', {a: 'www', arr: [1, 2]})
          } else {
            return false;
          }
        });
      },
      //重置表单
      restForm() {
        let data = this.ruleForm
        for (let i in data) {
          data[i] = ''
        }
        data.sex = 1
        // this.$refs.ruleForm.resetFields();
        this.$emit('clearData')
      },
      //roles
      rolesList() {
        JSON.parse(this.ruleForm.roles).length = 0
        this.ruleForm.roles = this.ruleForm.roles.split('')
        this.ruleForm.roles.length = 0
      },
      resetForm(formName) {
        this.$emit("update:visible", false);
        this.restForm()
        // this.$refs[formName].clearValidate();
      },
      get_Roles() {
        getRoles().then(res => {
          this.options = res.data
          console.log(this.options)
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  $imgUrl: "../../assets/";
  .add-account-container {
    z-index: 3000;

    .gender-class {
      display: flex;
      align-items: center;

      > span {
        margin-left: 20px;
        margin-right: 40px;
        font-size: 16px;
      }

      > img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .textarea-class {
      display: flex;

      > span {
        display: inline-block;
        width: 100px;
        margin-left: 0 20px;
        font-size: 16px;
      }
    }
  }
</style>

<style lang="scss">
  @import "@/styles/variables.scss";

  $imgUrl: "../../../../assets/";
  .add-account-container .el-dialog {
    width: 70%;
    /* height: 80%; */
    background-color: transparent;

    .el-dialog__header {
      background-color: #002447;
      text-align: center;

      border-radius: 18px 18px 0 0;

      .el-dialog__title {
        color: white;
        letter-spacing: 1px;

        &::before {
          content: "";
          background: center / contain url($imgUrl+ "system/add.png") no-repeat !important;
          width: 24px;
          height: 24px;
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }

    .el-dialog__body {
      background-color: rgba(4, 29, 54, 1);
      border-radius: 0 0 18px 18px;
      padding: 40px 60px 20px 60px;

      .el-form {
        color: $navText;

        .el-textarea {
          background: none !important;

          .el-textarea__inner {
            background: none !important;
            border-color: $navText !important;
            color: $navText !important;
          }
        }

        .el-form-item .el-form-item__content .el-input {
          /* height: 44px; */
          color: $navText;

          .el-input__inner {
            /* width: 280px;
              margin-left: 70px; */
            padding-left: 100px;
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

  .add-account-container .el-steps {
    display: flex;
    justify-content: center;

    .el-step {
      .el-step__line {
        background: #007eaa;
        top: 9px;
        height: 6px;
      }

      .el-step__icon {
        background: #007eaa;
        color: #007eaa;
        border: none;
      }

      .el-step__title {
        color: #007eaa;
        font-size: 14px;
      }

      .is-process {
        color: $navText;

        > .el-step__icon {
          background: $navText;
          color: $navText;
        }
      }
    }
  }

  /* .add-account-container .el-select{
    line-height: 40px;

    &::before{
      content: '用户角色';
      display: inline-block;
      position: absolute;
      width: 82px;
      height: 25px;
      line-height: 25px;
      border-right: 1px solid;
      text-align: center;
      top: 8px;
    }
  } */

  .add-account-container .el-input__suffix {
    border-left: none;
  }

  .add-account-container .el-select {
    width: 100%;
    position: relative;
    align-items: flex-start;
    min-height: 40px;

    .el-select__tags {
      $color: #ffaa23;
      /* width: 90%!important; */
      /* margin-left: 10%; */
      /* height: 140%; */
      > span {
        > span {
          color: $color;
          background-color: transparent;
          border-color: $color;
          border-radius: 18px;

          .el-tag__close {
            color: rgba(255, 255, 255, 0.8);
            background-color: rgba($color: $color, $alpha: 0.6);
          }
        }

        > span:nth-child(1) {
          margin-left: 90px;
        }
      }
    }
  }

  .is-multiple {
    width: 420px;
    background-color: rgb(4, 21, 37);

    .selected {
      background: none !important;
    }

    .el-select-dropdown__list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 4px;

      > li {
        color: rgba(255, 255, 255, 0.9);
        background-color: #ffaa23;
        border: 1px solid rgba(255, 170, 35, 1);
        border-radius: 18px;
        margin: 4px;
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
      }

      > li.selected {
        background-color: rgba($color: #ffaa23, $alpha: 0.6) !important;
        color: rgba(255, 255, 255, 0.7) !important;
        border-color: rgba(255, 170, 35, 0.6) !important;

        &::after {
          content: "";
          display: none;
        }
      }
    }
  }
</style>
