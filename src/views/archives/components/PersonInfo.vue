<template>
  <div class="person-info-con">
    <img :src="imgS.track" />
    <img src="../../../assets/common/right.png" />
    <img src="../../../assets/common/right.png" />
    <div
      class="boll"
      v-for="(item,index) in titleList"
      :key="item"
      @click.capture="handleClick(index)"
    >
      <img src="../../../assets/common/boll.png" />
      <div>{{item}}</div>
    </div>
    <div>
      <img :src="currentUser.img" />
    </div>

    <span @click="closeIt"></span>
  </div>
</template>

<script>
import track from "@/assets/common/track.png";
import boll from "@/assets/common/boll.png";

export default {
  name: "PersonInfo",
  data() {
    return {
      imgS: {
        track: track,
        boll: boll
      },
      titleList: [
        "基本信息",
        "事件信息",
        "出入信息",
        "关系网络",
        "车辆信息",
        "房屋信息"
      ]
    };
  },
  mounted() {
    const bolls = document.getElementsByClassName("boll");
    for (let i = 0; i < bolls.length; i++) {
      bolls[i].onmouseover = function() {
        for (let j = 0; j < bolls.length; j++) {
          bolls[j].style.animationPlayState = "paused";
        }
      };

      bolls[i].onmouseout = function() {
        for (let j = 0; j < bolls.length; j++) {
          bolls[j].style.animationPlayState = "running";
        }
        // bolls[i].style.animationPlayState='running';
      };
    }
  },
  computed: {
    viewType() {
      return this.$store.state.archives.viewType;
    },
    currentUser() {
      return this.$store.state.archives.currentUser;
    }
  },
  methods: {
    handleClick(index) {
      // this.$emit("view-info", index);
      if (index === 3) {
        this.$store.commit("archives/SET_LAYOUTFLAG", 2);
      }
      this.$store.commit("archives/SET_VIEWTYPE", index);
    },
    closeIt(){
      this.$store.commit("archives/SET_LAYOUTFLAG", 1);
      this.$store.commit("archives/SET_VIEWTYPE", 9);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "../../../assets/";
.person-info-con {
  $height: 60%;
  $width: 84%;
  width: 100%;
  height: 100%;
  position: relative;
  color: $navText;
  overflow: hidden;
  /* background: center / cover url($imgUrl+'common/rotate-bg.png') no-repeat; */

  &:hover {
    /* transform: scale(1.2); */
    > div {
      animation-play-state: paused;
    }
  }

  > img:nth-child(1) {
    width: 82%;
    height: 66%;
    margin-top: 110px;
    transform: rotateY(180deg);
  }
  > img:nth-child(2) {
    position: absolute;
    width: 500px;
    height: 316px;
    top: 16%;
    right: 20%;
  }
  > img:nth-child(3) {
    position: absolute;
    width: 500px;
    height: 316px;
    top: 16%;
    left: 20%;
    transform: rotateY(180deg);
  }

  > div.boll {
    position: absolute;
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    /* background: center / contain url($imgUrl+"common/boll.png") no-repeat; */
    &:hover {
      > img {
        animation: rotateboll 6s infinite linear;
      }
    }

    > img {
      width: 180px;
      height: 180px;
    }

    > div {
      position: absolute;
      top: 10;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(4, 229, 255, 0) 0%,
        rgba(4, 229, 255, 0) 33%,
        rgba(4, 229, 255, 0.4) 60%,
        rgba(4, 229, 255, 0.6) 76%,
        rgba(4, 229, 255, 1) 100%
      );
      font-size: 32px;
      font-weight: 500;
      line-height: 45px;
      color: rgba(255, 255, 255, 1);
      padding: 30px;
      letter-spacing: 4px;
    }

    /* &:hover {
      background: center / contain url($imgUrl+"common/boll-a.png") no-repeat;
      color: $textWhite;
    } */

    /* > img {
      width: 100%;
      height: 100%;
      position: absolute;
    } */
  }

  > div.active-one {
    /* background: center / contain url($imgUrl+"common/boll-a.png") no-repeat;
    color: $textWhite; */
    > img {
      animation: rotateboll 6s infinite linear;
    }
  }

  > div:nth-child(4) {
    top: 6%;
    right: 20%;

    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
  }

  > div:nth-child(5) {
    top: 24%;
    right: 1%;

    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -16.667s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) -6.667s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) -6.667s infinite alternate;
  }

  > div:nth-child(6) {
    bottom: 16%;
    right: 14%;
    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -23.333s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) -13.333s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) -13.333s infinite alternate;
  }

  > div:nth-child(7) {
    bottom: 16%;
    left: 14%;
    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -30s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) -20s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) -20s infinite alternate;
  }

  > div:nth-child(8) {
    top: 24%;
    left: 1%;
    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -36.667s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) -26.667s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) -26.667s infinite alternate;
  }

  > div:nth-child(9) {
    top: 6%;
    left: 20%;
    animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -43.333s infinite alternate,
      animY 20s cubic-bezier(0.36, 0, 0.64, 1) -33.333s infinite alternate,
      scale 40s cubic-bezier(0.36, 0, 0.64, 1) -33.333s infinite alternate;
  }

  > div:nth-child(10) {
    position: absolute;
    top: 26%;
    left: 44%;
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: center / contain url($imgUrl+"common/boll-center.png") no-repeat;

    transform: scale(1.42);

    > img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }

  @keyframes rotateboll {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animX {
    0% {
      left: 4%;
    }
    100% {
      left: $width;
    }
  }
  @keyframes animY {
    0% {
      top: 0px;
    }
    100% {
      top: $height;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(0.7);
    }
  }

  >span{
    width: 33px;
    height: 33px;
    background: center / contain url($imgUrl+"archives/up.png") no-repeat;
    position: absolute;
    top: 20px;
    right: 50px;
    cursor: pointer;
  }
}
</style>
