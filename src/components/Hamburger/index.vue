<template>
  <div class="hamburger-main" style="padding: 0 15px;" @click="toggleClick" :class="{'is-active':!isActive}" >
    <!-- <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <path d="M408 442h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8z m-8 204a8 8 0 0 0 8 8h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56z m504-486H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8z m0 632H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zM142.4 642.1L298.7 519a8.8 8.8 0 0 0 0-13.9L142.4 381.9a8.9 8.9 0 0 0-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" p-id="2286" fill="#00CCFF"/>
    </svg>-->
    <img src="../../assets/common/open.png" />
    <img src="../../assets/common/open.png"/>
    <img src="../../assets/common/open.png" />
    <!-- <span>收起</span> -->
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped lang="scss">
$height:22px;
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: $height;
  color: #0cf;
}

.cls-1 {
  fill: #0cf;
}

.hamburger-main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  width: 100%;
  height: 34px;
  /* background: center / contain url("../../assets/nav/open.png") no-repeat !important; */
  background-color: rgba(4, 29, 54, 0.8);
  box-shadow: 0px 0px 10px rgba(0, 204, 255, 0.4) inset;

  span{
    margin-left: 30px;
  }
  img {
    width: 14px;
    height: $height;
    margin-right: -4px;
  }

  img:nth-child(1) {
    animation: open0 .8s infinite running ease-in;
  }
  img:nth-child(2) {
    animation: open1 .8s -1s infinite running ease-in;
  }
  img:nth-child(3) {
    animation: open2 .8s -2s infinite running ease-in;
  }

  @keyframes open0 {
    0% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.5);
    }
  }

  @keyframes open1 {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(0.7);
    }
  }

  @keyframes open2 {
    0% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
}

.is-active {
  transform: rotate(180deg);
}
</style>
