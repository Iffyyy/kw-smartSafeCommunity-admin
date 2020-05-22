<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">

      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
.app-main {
  /*50 = navbar  */
  min-height: 937px;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow-y: scroll;
  padding: $navHeight 34px 30px 27px;
  background: linear-gradient(rgba(7, 33, 65, 1), rgba(7, 17, 37, 1));
  color: $textWhite;
  font-size: 20px;
}
/* .fixed-header+.app-main {
  padding-top: $navHeight;
} */
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
