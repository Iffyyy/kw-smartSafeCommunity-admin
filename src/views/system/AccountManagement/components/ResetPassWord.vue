<template>
  <el-dialog title="重置密码" :visible.sync="showFlag" class="reset-container" @close="canceIt">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="age">
        <el-input v-model.number="ruleForm.age" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"  placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item class="button-group">
        <button @click="resetForm('ruleForm')">取消</button>
        <button @click="submitForm('ruleForm')">确认</button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "ResetPassword",
  props: {
    visible: {
      type: Boolean
    }
    // showInfo: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showFlag: this.visible,
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  watch: {
    visible(newV) {
      this.showFlag = newV;
    }
  },
  methods: {
    canceIt() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("handleConfirm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$emit("update:visible", false);
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "../../assets/";
.reset-container {
  z-index: 3000;

  /* .reset-content {
  } */
}
</style>

<style lang="scss">
@import "@/styles/variables.scss";
.reset-container .el-dialog {
  width: 540px;
  height: 380px;
  background-color: transparent;

  .el-dialog__header {
    background-color: rgba(0, 57, 100, 1);
    text-align: center;

    border-radius: 18px 18px 0 0;

    .el-dialog__title {
      color: white;
      letter-spacing: 1px;
    }
  }

  .el-dialog__body {
    background-color: rgba(4, 29, 54, 1);
    border-radius: 0 0 18px 18px;
    padding: 40px 0 20px 0;

    .el-form {
      .el-form-item .el-form-item__content .el-input {
        height: 44px;
        color: $navText;

        .el-input__inner {
          /* width: 280px;
            margin-left: 70px; */
          padding-left: 110px;
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
          border-right: 1px solid ;
        }
      }

      /* .is-error .el-input{
        color: #F56C6C!important;

        .el-input__inner{
          border-color: #F56C6C!important;
        }
      } */

      /* > .el-form-item:nth-child(1) .el-form-item__content .el-input {
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
      } */

      >.el-form-item:not(:last-child){
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