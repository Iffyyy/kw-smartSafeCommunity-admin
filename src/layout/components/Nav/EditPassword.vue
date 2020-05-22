<template>
  <el-dialog title="修改密码" :visible.sync="showFlag" class="edit-container" @close="resetForm">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="password">
        <el-input type="password" v-model.number="ruleForm.password" placeholder="请输入原密码">
          <template slot="prefix">
            <span>原密码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          type="password"
          v-model="ruleForm.newPassword"
          autocomplete="off"
          placeholder="请输入新密码"
        >
          <template slot="prefix">
            <span>新密码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password_confirmation">
        <el-input
          type="password"
          v-model="ruleForm.password_confirmation"
          autocomplete="off"
          placeholder="请输入确认密码"
        >
          <template slot="prefix">
            <span>确认密码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="button-group">
        <button @click="resetForm('ruleForm')">取消</button>
        <button @click="submitForm('ruleForm')">确认</button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { changePassworde } from "@/api/system/account";
export default {
  name: "EditPassword",
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showFlag: this.visible,
      ruleForm: {
        password: "",
        newPassword: "",
        password_confirmation: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        password_confirmation: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    id() {
      return this.$store.state.user.accountId;
    }
  },
  watch: {
    visible(newV) {
      this.showFlag = newV;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.id = this.id;
          changePassworde(this.ruleForm).then(res => {
            if (res.code === 2000) {
              this.resetForm()
              this.$alert("修改成功，请重新登录", "", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push(`/login?redirect=${this.$route.fullPath}`);
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$store.commit('SET_EDITPWD',false)
      this.$refs['ruleForm'].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "../../assets/";
.edit-container {
  /* z-index: 3000 !important; */
  /* .reset-content {
  } */
}
</style>

<style lang="scss">
@import "@/styles/variables.scss";
.edit-container .el-dialog {
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