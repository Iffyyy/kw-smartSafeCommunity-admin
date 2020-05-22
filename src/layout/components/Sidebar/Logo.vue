<template>
  <div class="sidebar-logo-container">
    <svg-icon iconClass="logo" className="logo-style"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed:{
    logoName(){
      return this.collapse?'logo-i':'logo'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 190px;
  height: 80px;
  line-height: 80px;
  overflow: hidden;

  .logo-style{
    $width: 190px;
    width: $width;
    height: 48px;
    margin-top: 10px;
    margin-left: ($sideBarWidth - $width) / 2;
  }

  /* .logo-small{
    $width: 63.81px;
    width: $width;
    height: 63.12px;
    margin-top: 27.44px;
    margin-left: ($sideBarHideWidth - $width) / 2;
  } */
}
</style>
