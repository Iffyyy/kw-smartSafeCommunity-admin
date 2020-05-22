<template>
  <div class="login-container">
    <div class="logo">
      <div class="logo-style">
        <svg-icon iconClass="logo" class-name="logo-style"></svg-icon>
        <!--      夸吾智能-->
      </div>
      <p>智慧社区综合管理平台</p>
    </div>
    <div class="login-content">
      <div class="title-container">
        <h3 class="title infoColor">用户登录</h3>
      </div>

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">


        <el-form-item prop="phone">
          <!--        <span class="svg-container">-->
          <!--          <svg-icon icon-class="user" />-->
          <!--        </span>-->
          <el-input
            ref="username"
            v-model="loginForm.phone"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <template slot="prefix">
              <p class="cal"><img src="../../assets/report/person.png" alt=""></p>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <!--        <span class="svg-container">-->
          <!--          <svg-icon icon-class="password" />-->
          <!--        </span>-->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin">
            <template slot="prefix">
              <p class="cal lock"><img src="../../assets/login/lock.png" alt=""></p>
            </template>
          </el-input>
          <!--          <span class="show-pwd" @click="showPwd">-->
          <!--          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
          <!--        </span>-->
        </el-form-item>

        <el-form-item class="pass-flag">
          <el-checkbox v-model="rememberPass">记住密码</el-checkbox>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="login-btn fontsize22"
                   @click.native.prevent="handleLogin">登录
        </el-button>

        <!--        <div class="tips">-->
        <!--          <span style="margin-right:20px;">username: admin</span>-->
        <!--          <span> password: any</span>-->
        <!--        </div>-->

      </el-form>
    </div>
  </div>
</template>

<script>
  import {validUsername} from '@/utils/validate'
  import {getUserName, setUserName, setUserPwd, getUserPwd, removeUserInfo} from '@/utils/auth'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请填写你的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('请填写用户密码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          phone: '',
          password: ''
        },
        loginRules: {
          phone: [{required: true, trigger: 'blur', message:'不能为空'}],
          password: [{required: true, trigger: 'blur', message:'请输入密码'}]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        rememberPass: false
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
          if(this.redirect==='/'){
            this.redirect='/index/index'
          }
        },
        immediate: true
      },
      rememberPass(newData, oldData) {

      }
    },
    created() {
      // alert(newData)
      let phone = getUserName() || ''
      let password = getUserPwd() || ''
      let flag = localStorage.getItem('login-flag') || ''
      // alert(flag)
      if (flag == 'true') {
        this.loginForm = {
          phone: getUserName(this.loginForm.phone),
          password: getUserPwd(this.loginForm.password)
        }
        this.rememberPass = true
      }else{
        this.rememberPass = false
      }
    },
    methods: {
      //cookie获取用户信息
      getUserInfo() {
        let newData = this.rememberPass
        if (newData) {
          setUserName(this.loginForm.phone)
          setUserPwd(this.loginForm.password)
        } else {
          removeUserInfo()
        }
        localStorage.setItem('login-flag',newData)

      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then((res) => {
              this.getUserInfo()
              this.$router.push({path: this.redirect || '/index/index'})
              // alert(this.redirect)
              this.loading = false
            }).catch((err) => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 64px;
      width: 100%;
      margin: 0 auto;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 64px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }

      .el-input__inner {
        width: 100%;
        height: 64px !important;
      }
    }

    .el-form-item {
      width: 86%;
      margin: 0 auto;
      margin-bottom: 14px;
      /*border: 1px solid rgba(255, 255, 255, 0.1);*/
      /*background: rgba(0, 0, 0, 0.1);*/
      /*border-radius: 5px;*/
      /*color: #454545;*/
    }

    .pass-flag {
      text-align: right;
      margin-bottom: 0;
      position: relative;
      top: -10px;
    }
  }

  .login-container .el-input__prefix, .login-container .el-input__suffix {
    height: 25px;
    margin-top: 20px;
  }

  .login-container .el-input .el-input__inner {
    padding-left: 70px;
    font-size: 22px;
  }
</style>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .cal {
    width: 28px;
    margin: 0 10px;
  }
.lock{
  position: relative;
  top: -6px;
}
  .login-content {
    width: 562px;
    height: 467px;
    background: url("../../assets/login/logobg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 202px;
    right: 160px;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background: url("../../assets/login/logo_gb_big.png") no-repeat 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 86%;
      max-width: 100%;
      text-align: center;
      /*padding: 160px 35px 0;*/
      margin: 0 auto;
      overflow: hidden;
    }


    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        /*<!--color: $light_gray;-->*/
        padding-top: 30px;
        margin: 0px auto 80px auto;
        text-align: center;
        font-weight: 400;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .login-btn {
    width: 86%;
    margin: 0 auto;
    height: 64px;
    position: relative;
    top: -10px;
    letter-spacing: 2px;
  }

  .logo {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 26px;
    width: 45%;
    margin-top: 10px;

    p {
      margin-left: 60px;
    }

    .logo-style {
      $width: 172.53px;
      width: $width;
      height: 63.12px;
      margin-left: 10px;
    }
  }

</style>
