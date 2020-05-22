<template>
  <div class="archives-container">
    <div class="query-input">
      <!-- input -->
      <el-form :model="queryInfo" class="center_no_align_center">
        <div class="building">
          <BuildingSelect :reportInfo="queryInfo"></BuildingSelect>
        </div>
        <div class="center">
          <el-form-item>
            <el-input
              size="mini"
              class="padd-bo selectWidth170"
              v-model="queryInfo.phone"
              placeholder="请输入手机号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img style="width:20px" src="../../assets/report/phone.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth170 room padd-bo"
              v-model="queryInfo.name"
              placeholder="请输入姓名"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../assets/report/person.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="padd-bo selectWidth195"
              v-model="queryInfo.access_card_no"
              placeholder="请输入卡号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../assets/report/cal.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth170 room padd-bo"
              v-model="queryInfo.name"
              placeholder="请输入身份证号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../assets/archives/idcard.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="mini"
              class="selectWidth170 room padd-bo"
              v-model="queryInfo.name"
              placeholder="请输入车牌号"
            >
              <template slot="prefix">
                <p class="cal">
                  <img src="../../assets/archives/car.png" alt />
                </p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="padd-bo">
            <el-button type="primary" icon="el-icon-search"  @click="searchUser">查询</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <div class="archives-main" :class="{'two-parts':flag===2,'three-parts':flag===3}">
      <div class="left-part">
        <div class="result-list">
          <!-- <div class="list-item">
          </div>-->
          <!-- 列表 -->
          <userItem
            :class="{'active-item':currentUser.id===item.id}"
            v-for="item in personListData"
            :key="item.id"
            :userInfo="item"
            @click.native="viewUser(item)"
          ></userItem>
        </div>
        <el-pagination background :page-size="queryInfo.number"  layout="prev, pager, next" :total="total" :current-page="queryInfo.page" @current-change="changePage"></el-pagination>
        <div class="person-info">
          <!-- 旋转 -->
          <img :src="imgS.rotateBg" />
          <!-- <img :src="imgS.building" /> -->
          <div>
            <relation v-if="viewType===3"></relation>
            <person-info v-else></person-info>
          </div>
        </div>
      </div>
      <div class="right-part">
        <img :src="imgS.userInfoBg" />
        <div>
          <!-- 房屋信息 -->
          <!-- <Housing></Housing> -->
          <base-info :type="viewType" :userId="currentUser.id"></base-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userItem from "./components/UserList";
import PersonInfo from "./components/PersonInfo";
import baseInfo from "./components/userInfo/index";
import Relation from "./components/userInfo/Relation";

import userInfoBg from "@/assets/common/userinfo-bg.png";
import rotateBg from "@/assets/common/rotate-bg.png";
import building from "@/assets/common/building.png";
import BuildingSelect from '@/components/BuildingSelect'

import { personList } from "@/api/archives";

export default {
  components: {
    userItem,
    PersonInfo,
    Relation,
    BuildingSelect,
    baseInfo: baseInfo
  },

  data() {
    return {
      queryInfo: {
        phone: "",
        id_card: "",
        name: "",
        access_card_no: "",
        car_number: "",
        number: 9,
        page: 1
      },
      options: [],
      // flag: 1, //0初始页面，1显示列表，2显示人的信息，3显示右边侧栏
      imgS: {
        userInfoBg: userInfoBg,
        rotateBg: rotateBg,
        building: building
      },
      personListData: [],
      total:0,
      number:0,
      show: false //控制侧边栏显示
    };
  },
  created() {
    this.loadUser();
  },
  computed: {
    viewType() {
      return this.$store.state.archives.viewType;
    },
    flag() {
      return this.$store.state.archives.layoutFlag;
    },
    currentUser() {
      return this.$store.state.archives.currentUser;
    }
  },
  // watch: {
  //   show: function(newV) {
  //     if (newV) {
  //       this.flag = 3;
  //     }
  //   }
  // },
  methods: {
    changeFlag(index) {
      this.$store.commit("archives/SET_LAYOUTFLAG", index);
    },
    loadUser() {
      personList(this.queryInfo).then(res => {
        this.personListData = res.data.data;
        this.total = res.data.sum;
        this.number = res.data.number;
      });
    },
    changePage(page){
      this.queryInfo.page = page;
      this.loadUser()
    },
    searchUser(){
      this.loadUser()
      this.queryInfo.page = 1;
      this.changeFlag(1);
    },
    viewUser(item) {
      if (this.flag !== 3) {
        this.changeFlag(2);
      }
      let currentUser={}
      currentUser.id = item.id;
      currentUser.img = item.face_pic_url;
      currentUser.name = item.name;
      this.$store.commit("archives/SET_CURRENTUSER", currentUser);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.archives-container {
  height: 100%;
  .query-input {
    height: 6%;
    .center{
      flex: 8;
    }
    .building{
      flex: 5;
    }
    .padd-bo{
    margin-left: 10px;
    }
  }

  .archives-main {
    margin-top: 1%;
    height: 95%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left-part {
      height: 100%;
      width: 100%;
      text-align: center;
      position: relative;

      .result-list {
        /* height: 34%; */
        height: 93%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        /* align-items: flex-end; */
        text-align: left;
        font-size: 18px;

        .list-item {
          width: 32%;
          height: 32%;
        }

        &::after {
          content: "";
          display: block;
          width: 32%;
        }
      }

      .person-info {
        position: relative;
        margin-top: 1%;
        /* height: 64%; */
        height: 0;
        opacity: 0;
        /* display: none; */
        transition: all 0.5s;

        > img:nth-child(1) {
          width: 100.2%;
          height: 100%;
        }
        > img:nth-child(2) {
          position: absolute;
          top: 0;
          left: 30%;
          width: 34%;
          height: 92%;
        }

        > div {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }

    .right-part {
      height: 100%;
      width: 0;
      opacity: 0;
      position: relative;
      transition: all 0.5s;

      > img:nth-child(1) {
        width: 100%;
        height: 100%;
      }

      > div:nth-child(2) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }
    }
  }

  .two-parts {
    .left-part {
      .person-info {
        opacity: 1;

        /* display: inline-block; */
        width: 100%;
        height: 69%;
        position: absolute;
        bottom: 10px;
        right: 0;
        transition: all 0.5s;
      }
    }
  }

  .three-parts {
    .left-part {
      height: 100%;
      width: 71%;
      text-align: center;
      position: relative;

      .result-list {
        height: 90%;
        transition: width, height, opacity 0.5s;
        font-size: 14px;
      }
      .person-info {
        opacity: 1;

        /* display: inline-block; */
        width: 100%;
        height: 71%;
        position: absolute;
        bottom: 0;
        right: 0;
        transition: all 0.5s;
      }
    }

    .right-part {
      height: 100%;
      width: 28%;
      opacity: 1;
    }
  }
}

.active-item {
  /* box-shadow: rgba(0, 204, 255, 0.45) 0px 0px 6px,
    rgba(0, 204, 255, 0.45) 0px 0px 40px inset; */
  transform: scale(1.02);
}

.selectWidth150 {
  width: 150px;
}

.selectWidth170 {
  width: 170px;
}

.selectWidth195 {
  width: 195px;
}

.selectWidth227 {
  width: 227px;
}
.cal {
  width: 28px;
  margin: 0 10px;
}
</style>
<style lang="scss">
.archives-container .el-button--primary {
  height: 40px;
  border-radius: 10px;
  color: rgba(4, 29, 54, 1);
  letter-spacing: 2px;
}
</style>
<!--input的修改 -->
<style>
.zxhs .el-input__suffix-inner::before {
  content: "幢";
  font-size: 17px;
  margin-left: 10px;
  color: #00ccff;
}

.unit .el-input__suffix-inner::before {
  content: "单元";
  font-size: 17px;
  margin-left: 10px;
  color: #00ccff;
}

.room .el-input__suffix-inner::before {
  content: "室";
  font-size: 17px;
  margin-left: 10px;
  color: #00ccff;
}
</style>
