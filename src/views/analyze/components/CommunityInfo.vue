<template>
  <div class="community-main">
    <!--    <img :src="imgS.totalBg" />-->
      <div class="total-list">
        <el-col :span="7" class="infoColor">
          <img :src="imgS.totalBg1"/>
          <div class="total-item">
            <span>
          {{commumityInfoData.area}}㎡</span>
            <span>社区总面积</span>
          </div>
          <div class="base-line"></div>
          <div class="total-item">
            <span>{{commumityInfoData.family_count}}</span>
            <span>社区总户数</span>
          </div>
        </el-col>
        <el-col :span="8">
          <img :src="imgS.totalBg2"/>
          <div class="total-item">
            <span>{{commumityInfoData.person_count}}</span>
            <span>本地人口总数</span>
          </div>
          <div class="base-line"></div>
          <div class="total-item">
            <span>{{commumityInfoData.outer_count}}</span>
            <span>外来人口总数</span>
          </div>
        </el-col>
        <el-col :span="8">
          <img :src="imgS.totalBg2"/>
          <div class="total-item">
            <span>{{commumityInfoData.car_count}}</span>
            <span>机动车总数</span>
          </div>
          <div class="base-line"></div>
          <div class="total-item">
            <span>{{commumityInfoData.trolleybus_count}}</span>
            <span>非机动车总数</span>
          </div>
        </el-col>
      </div>
  </div>
</template>

<script>
  import totalBg from "@/assets/common/device-total.png";
  import totalBg1 from "@/assets/analyze/total-item1.png";
  import totalBg2 from "@/assets/analyze/total-item2.png";
  import {commumityInfo} from '@/api/analyze/events'

  export default {
    name: "CommumityInfo",
    data() {
      return {
        imgS: {
          totalBg: totalBg,
          totalBg1: totalBg1,
          totalBg2: totalBg2,
        },
        commumityInfoData: {},
      };
    },
    created() {
      this.getCommumityInfo()
    },
    methods: {
      getCommumityInfo() {
        commumityInfo().then(res => {
          this.commumityInfoData = res.data
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .community-main {
    position: relative;
    display: flex;
    justify-content: space-around;
    height: 17.4%;
    /*margin-bottom: 10px;*/
    margin-top: 0.5%;

    & > img {
      width: 100%;
      height: 100%;
    }

        .base-line {
          position: absolute;
          $width: 90%;
          width: 2px;
          height: 55%;
          background: radial-gradient(
              circle,
              rgba(4, 229, 255, 1) 0%,
              rgba(4, 229, 255, 0) 100%
          );
          opacity: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }

    .total-list {
      position: absolute;
      width: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      height: 100%;
      font-size: 18px;

      .total-item {
        width: 50%;
        display: flex;
        height: 100%;
        float: left;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 5;
      }

      .total-item > :first-child {
        font-size: 32px;
      }
      .total-item > :last-child {
        font-weight: 500;
      }
    }
  }
</style>
<style lang="scss">
  .community-main {
    .el-col {
      height: 100%;
      position: relative;

      img {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
