<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div class="nav"></div> -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <div class="fixed-header">
      <navbar />
    </div>
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation, //侧边栏只显示icon
        mobile: this.device === "mobile" //不侧边栏
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
/* .main-container{
    position: relative;
  } */
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: $navBg;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  /* width: calc(100% - #{$sideBarWidth}); */
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  /* width: calc(100% - #{$sideBarHideWidth}); */
}

.mobile .fixed-header {
  width: 100%;
}
</style>
