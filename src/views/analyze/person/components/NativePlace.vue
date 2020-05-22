<template>
  <div class="native-place" :class="{'native-place-big':unfoldListShow}">
    <img class='native-place-bg'
         :src="unfoldListShow?province:nativePlace">
    <p class="unfold" @click="unfold">展开全部
      <span></span>
      <!--
          <span><img src="../../../../assets" alt=""></span>
      -->
    </p>
    <div class="native-place-san">
      <p class="subtitle text-center fontColor fontsize22 paddtop20">籍贯比例</p>
      <div class="native-place-content">
        <div class="native-place-img">
          <echartMap></echartMap>
          <!--          <div id="nativePlaceMap"></div>-->
          <!--          <img src="../components/img/map.png">-->
        </div>
        <div class="province">
          <provinceBar :ProvinceList="ProvinceList" :unfoldListShow="unfoldListShow"></provinceBar>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import resize from '@/components/Charts/mixins/resize'
  import provinceBar from "./provinceBar";
  import echartMap from './echartMap'
  import nativeplace from '../components/img/native_place.png'
  import province from '../components/img/province.png'
  import {getProvinceAnalyze} from '@/api/analyze/person'

  var dataShadow = [], yMax = 500;

  export default {
    name: "NativePlace",
    mixins: [resize],
    components: {echartMap, provinceBar},
    data() {
      return {
        nativePlace: nativeplace,
        province: province,
        ProvinceList: []
      }
    },
    props: {
      unfoldListShow: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // this.initBarChart()
      // this.initMap()
    },
    created() {
      for (var i = 0; i < 10; i++) {
        dataShadow.push(yMax)
      }
      this.get_ProvinceAnalyze()
    },
    methods: {
      unfold() {
        this.$emit('updateUnfold')
      },
      get_ProvinceAnalyze() {
        getProvinceAnalyze().then(res => {
          console.log(res)
          this.ProvinceList = res.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .native-place {
    width: 100%;
    height: 100%;
    position: relative;

    .native-place-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: alll 0.5s;
    }

    .native-place-san {
      height: 100%;
      position: relative;
      z-index: 5;
    }

    .native-place-content {
      height: calc(100% - 56px);
      /*display: flex;*/
      /*align-items: center;*/

      .native-place-img {
        padding-left: 12px;
        width: 100%;
        height: 100%;
        /*transition: all 0.8s;*/
        opacity: 1;
      }

      img {
        width: 100%;
      }

      .province {
        width: 80%;
        height: 12%;
        overflow: hidden;
        transition: all 0.8s;
        position: relative;
        top: -16%;
      }
    }

    .unfold span {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../../../assets/common/up.png") no-repeat;
      background-size: 100%;
      transform: rotate(180deg);
      margin-bottom: -2px;
      margin-right: 3px;
      margin-left: 3px;
      transition: all 0.8s;
    }
  }

  .unfold {
    position: absolute;
    bottom: 34px;
    right: 31px;
    font-size: 14px;
    cursor: pointer;
    z-index: 10;
  }


  .native-place-big {
    width: 100%;
    height: 100%;

    .native-place-img {
      width: 0% !important;
      height: 0 !important;
      overflow: hidden;
      opacity: 0;
      /*transition: all 0.8s;*/
    }

    .province {
      padding-top: 20px;
      width: 100% !important;
      height: 100% !important;
      transition: all 0.8s;
      position: relative;
      top: 0!important;
      /*top: 16%;*/
    }

    .unfold span {
      transform: rotate(0deg);
      transition: all 0.8s;
    }
  }
</style>
<style>

</style>
