<template>
  <div class="province-list" :class="{'province-list-big':unfoldListShow}">
    <div  class="province-item" v-for="item in ProvinceList">
      <p class="fontsize14 fontColor prov">{{item.name}}</p>
      <p class="progress-p">
        <el-tooltip class="item" effect="dark" :content="item.name+'：'+item.person_count" placement="top">
<!--          <el-button>上左</el-button>-->
          <el-progress :show-text="false" :stroke-width="14" :percentage="item.person_count">
          </el-progress>
        </el-tooltip>

      </p>
    </div>
<!--
    <div v-show="unfoldListShow" class="province-item" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13]">
      <p class="fontsize14 fontColor prov">贵州省</p>
      <p class="progress-p">
        <el-progress :text-inside="true" :stroke-width="14" :percentage="30">144</el-progress>
      </p>
    </div>
-->
  </div>
</template>

<script>
  export default {
    name: "provinceBar",
    props: {
      unfoldListShow: {
        type: Boolean,
        default: false
      },
      ProvinceList:{
        type:Array,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .province-list {
    width: 100%;
    height: 219px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    transition: all 0.3s;
    .province-item {
      width: 50%;
      margin-bottom: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;
      overflow: hidden;
      text-overflow: ellipsis; //超出部分以省略号显示
      white-space: nowrap;
      transition: all 0.3s;
      .prov {
        width: 25%;
      }

      .progress-p {
        width: 60%;
      }
    }
  }
  .province-list-big{
    width: 100%;
    height: 90%!important;
    display: flex;
    transition: all 0.3s;
    /*align-items: center;*/
    /*justify-content: center;*/
    flex-wrap: wrap;
    .province-item {
      width: 50%;
      margin-bottom: 0px;
      height: 20px;
      transition: all 0.1s;
      .prov {
        width: 25%;
      }
      .progress-p {
        width: 60%;
      }
    }
  }
</style>
<style>
  .province-list .el-progress-bar__outer {
    background-color: rgba(0, 204, 255, .1);
  }

  .province-list .el-progress-bar__inner {
    background-color: rgba(0, 204, 255, 1);
  }

  .province-list .el-progress-bar__innerText {
    position: relative;
    top: -5px;
  }
  .province-list.el-tooltip__popper.is-dark{
    background: rgba(0,0,0,0.8)!important;
  }
</style>
