<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" /> -->
    <!-- <img class="logo-style" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
      <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'"> -->
    <div class="nav-title">智慧社区平安管理平台</div>       
    <div class="nav-left">
      <div class="hover-style">
        <div class="center-title">
          <svg-icon iconClass="lamp"></svg-icon>
          <span>督办事件</span>
          <span class="circle-num">50</span>
        </div>
      </div>
      <div class="community-info">
        <svg-icon iconClass="community"></svg-icon>
        <span>社区名称名称名</span>
      </div>
    </div>
    <div class="nav-right">
      <svg-icon iconClass="user"></svg-icon>
      <span>用户名</span>
      <svg-icon iconClass="exit" className="exit"></svg-icon>
    </div>
          
          <div class="right-menu">
            <!-- <span>xxxx社区</span>
            <div>
              <img class="nav-icon" :src="avatar+'?imageView2/1/w/80/h/80'">
              <span>督办事件</span>
            </div>
            <div>
              <img class="nav-icon" :src="avatar+'?imageView2/1/w/80/h/80'">
              <span>李四</span>
            </div>
            <div>
              <img class="nav-icon" :src="avatar+'?imageView2/1/w/80/h/80'">
              <span>注销</span>
            </div> -->
            <!-- <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item>
                    Home
                  </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                  <el-dropdown-item>Github</el-dropdown-item>
                </a>
                <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                  <el-dropdown-item>Docs</el-dropdown-item>
                </a>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display:block;">Log Out</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
$imgUrl:'../../assets/nav/';

.navbar {
  height: $navHeight;  
  overflow: hidden;
  position: relative;
  background: $navBg;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $navText;
  font-size: 18px;

  .logo-style{
    margin-left: 15px;
    width: 116px;
    height: 50px;
  }

  .nav-left{
    display: flex;
    align-items: center;
  }

  .nav-title{
    color: $navTitle;
    font-size: 28px;
    margin-left: 27px;
  }

  .hover-style{
    transform: skewX(-38deg);
    box-shadow:0px 0px 20px rgba(0,204,255,0.5) inset;
    border: 4px solid $navBg;

    &:hover{
      box-shadow:-7px 2px 16px rgba(0,204,255,0.3);
    }
  }

  .center-title{
    color: $navText;
    width: 245.31px;
    height: 56.98px;
    /* background: center / contain url($imgUrl+'title-bg.png') no-repeat; */
    /* background: radial-gradient(rgba(7,32,64,1),rgba(7,32,64,0.6), rgba(0,204,255,0.3)); */
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    transform: skewX(38deg);


    .svg-icon {
      width: 30.46px;
      height: 37px;
      margin-right: 6.62px;
      margin-left: 42.8px;
    }

    .circle-num{
      width:23px;
      height:23px;
      background:rgba(255,44,44,1);
      border-radius:50%;
      color: #ffffff;
      font-size: 12px;
      display: inline-block;
      line-height: 23px;
      text-align: center;
      position: absolute;
      top: 5px;
      right: 56px;
    }

  }

  .community-info{
    color: $navText;
    width: 245.31px;
    height: 56.98px;
    background: center / contain url($imgUrl+'title-bg.png') no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    .svg-icon {
      width: 30.46px;
      height: 37px;
      margin-right: 6.62px;
    }

  }

  .nav-right{
    color: $navText;
    width: 295.31px;
    height: 56.98px;
    margin-right: 35px;
    background: center / contain url($imgUrl+'title-bg1.png') no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    cursor: pointer;

    .svg-icon {
      width: 30.46px;
      height: 37px;
      margin-right: 6.62px;
    }

    .exit{
      width: 25px;
      height: 25px;
      margin-left: 26px;
    }

  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $navText;
    font-size: 16px;

    &>div{
      display: flex;
      align-items: center;
    }

    .nav-icon{
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }


    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
