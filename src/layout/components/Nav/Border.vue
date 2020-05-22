<template>
  <div class="border-container">
    <div class="border-inside">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name:"Border",
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
@import '../../../styles/variables';
$imgUrl:'../../../assets/nav/';

.border-container {
  transform: skewX(-38deg);
  box-shadow:0px 0px 20px rgba(0,204,255,0.5) inset;
  border: 2px solid $navBg;
  cursor: pointer;

  &:hover{
    box-shadow:0px 0px 20px rgba(0,204,255,0.4),0px 0px 20px rgba(0,204,255,0.5) inset;
    border: 2px solid rgba(0,204,255,0.3);
    transition: box-shadow 2s;
  }

  .border-inside{      
    width: 100%;
    height: 100%;
    transform: skewX(38deg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}
</style>
