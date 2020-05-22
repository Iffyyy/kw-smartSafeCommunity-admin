<template>
  <div class="housing">
    <p class="subtitle text-center infoColor fontsize22 paddtop20 font-wight-bold">房屋信息</p>
    <div style="height: 100%">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item,index) in housingList" :name="'house'+(index+1)" :label="'房屋'+(index+1)" lazy>
          <div class="housing-content">
            <div class="house">
              <img class="house-bg" src="../../../../assets/analyze/housebg.png" alt="房屋图片">
              <div class="house-san">
                <p class="infoColor fontsize16">{{item.house.name}}</p>
                <div class="house-info center">
                  <img class="user-house-img" :src="item.house.picture">
                  <div class="user-house-info">
                    <p>地址：{{item.house.building}}</p>
                    <p>户型：{{item.house.household}}</p>
                    <p>面积：{{item.house.house_area}}㎡</p>
                    <p>户主：{{item.house.person_name}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="house-person-list">
              <div class="user-list-item center bg shadow" v-for="housePerson in item.person" @click="getEssInfo(housePerson.person_id)">
                <div class="user-img">
                  <img :src="housePerson.face_pic_url" alt="用户头像">
                </div>
                <div class="user-info fontsize12">
                  <div class="label fontSize12">
                    <p class="user-house-type">户主</p>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                      <div slot="content">
                        <p class="infoColor label-list" v-for="label in housePerson.person_trait">{{label.name}}</p>
                      </div>
                      <div class="attention-user infoColor">
                        <p>{{housePerson.person_trait[0].name}}</p>
                      </div>
                    </el-tooltip>

                  </div>
                  <p>
                    <span>姓名：{{housePerson.person_name}}</span>
                    <span>性别：{{housePerson.sex==1?'男':'女'}}</span>
                  </p>
                  <p>联系方式：{{housePerson.phone1}}</p>
                  <p>地址：{{housePerson.habitation_address}}</p>
                  <!--                  <p class="label fontsize12 center">-->
                  <!--                  </p>-->
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {houseInfo} from '@/api/archives'

  export default {
    name: "Housing",
    props: {
      userId: {
        type: Number | String,
        default: 0
      },
      showHouseId:{
        type:Number,
        default:0
      }
    },
    watch: {
      showHouseId: {
        // immediate: true,
        handler: function(newV) {
          this.activeName = 'house'+newV
          // alert(this.activeName)
        }
      }
    },
    data() {
      return {
        activeName: 'house1',
        housingList: []
      }
    },
    methods: {
      getInitialData() {
        // alert(this.userId)
        let data = {
          person_id: this.userId
        };
        return new Promise((resolve, reject) => {
          houseInfo(data).then(res => {
            console.log(res)
            this.housingList = res.data
            this.$store.commit("archives/SET_LAYOUTFLAG", 3);
            resolve(true)
          }, err => {
            reject()

          })

        })

      },
      getEssInfo(id){
        console.log(id)
        this.$store.commit('archives/SET_VIEWTYPE',0)
        this.$store.commit('archives/SET_CURRENTUSER',{id:id})
      },
    }
  }
</script>

<style scoped lang="scss">
  .housing {
    width: 100%;
    height: 100%;
    padding: 0 30px;
  }

  .housing-content {
    width: 100%;
    height: 20%;
    /*overflow-y: auto;*/
    /*padding: 0 20px;*/
    margin-top: 20px;

    .house {
      width: 100%;
      height: 200px;
      position: relative;

      .house-bg {
        width: 100%;
        height: 100%;
      }

      .house-san {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

        p {
          padding-left: 6px;
        }

        .house-info {
          height: calc(100% - 39px);
          padding: 0 2% 0 6%;

          .user-house-img {
            width: 60%;
            height: 84%;
          }

          .user-house-info {
            width: 40%;

            p {
              font-size: 12px;
            }
          }

        }
      }
    }
  }

  .house-person-list {
    /*height: calc(100% - 80%);*/
    /*overflow-y: scroll;*/

    .user-list-item {
      margin-top: 10px;
    }
  }
</style>
<style scoped lang="scss">

  .user-list-item {
    width: 100%;
    height: 158px;
    display: flex;
    padding-left: 5%;
    position: relative;
    cursor: pointer;
    transition: all 0.1s linear;

    .user-img {
      width: 34.5%;
      height: 80%;
      /*background-color: pink;*/

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-info {
      width: 60%;
      height: 80%;
      color: #fff;
      padding: 3% 10px 0 10px;
      /*margin-top: 10%;*/
      position: relative;

      p {
        margin-bottom: 6px;
        letter-spacing: 1px;
      }
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user-house-type {
        width: 36px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 4px;
        background-color: #26CBA9;
      }

      .attention-user p:after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url("../../../../assets/common/up.png") no-repeat;
        background-size: 100%;
        /*transform: rotate(180deg);*/
        margin-bottom: -2px;
        margin-left: 2px;
      }
      .attention-user :hover{
        .attention-user p:after{
          transform: rotate(180deg);
        }
      }
    }
  }

  .label-list{
    line-height: 23px;
  }
</style>
<style lang="scss">
  $infoColor:#0cf;
  .housing {
    .el-tabs__item {
      color: #fff;
    }

    .el-tabs__header {
      /*width: 74%;*/
      /*overflow: scroll;*/
      margin: 0 auto;
    }

    .el-tabs__nav {
      /*width: 100%;*/
      /*padding-left: 20px;*/
    }

    .el-tabs__item {
      padding: 0 10px;
    }

    .el-tabs__active-bar {
      background-color: #0cf;
    }

    .el-tabs__nav-wrap::after {
      background-color: rgba(0, 204, 255, .5);
    }
    .el-tooltip__popper.is-dark{
      background:rgba(0,0,0,0.5)!important;
    }
    .el-icon-arrow-left:before , .el-icon-arrow-right:before{
      color: $infoColor;
    }
  }

  .housing{
    .el-tabs{
      height: calc(100% - 50px)!important;
      /*overflow: scroll;*/
    }
    .el-tabs__content{
      width: 100%;
      height:100%!important;
    }
    .el-tab-pane{
      width: 100%;
      height: 90%!important;
      overflow-y: scroll!important;
    }
  }
</style>
