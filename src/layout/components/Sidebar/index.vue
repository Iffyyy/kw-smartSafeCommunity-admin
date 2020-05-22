<template>
  <div>
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <el-scrollbar wrap-class="scrollbar-wrapper" >
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <svg-icon :iconClass="isCollapse?'bottom-small':'sidebar-b'" :className="isCollapse?'bottom-small':'sidebar-bottom'"></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$store.getters.permission_routers
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

.hamburger-container {
  /* $width:60px;
  width: $width;
  height:22px; */
  /* background:rgba(7,32,64,1); */
  /* box-shadow:-7px 2px 20px rgba(0,204,255,0.2);
  border-radius:50%; */
  line-height: 53px;
  text-align: center;
  float: right;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;
  position: absolute;
  top: 0;
  /* right: 20px; */
  z-index: 1005;

  /* &:hover {
    background: rgba(0, 0, 0, .5);    
    box-shadow:-7px 7px 20px rgba(0,204,255,0.2);
  } */

}
</style>
