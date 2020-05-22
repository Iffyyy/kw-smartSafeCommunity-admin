<template>
  <div class="user-basic-info">
    <p class="subtitle text-center infoColor fontsize22 paddtop20 font-wight-bold">基本信息</p>
    <img class="user-img" src="../../../../assets/common/user.png" alt />
    <div class="user-info fontsize16">
      <p>
        <span>姓名：{{personInfo.name}}</span>
        <span>性别：{{personInfo.sex}}</span>
      </p>
      <p>
        <span>职业：司机</span>
        <span>学历：{{personInfo.education}}</span>
      </p>
      <p>联系方式：{{personInfo.phone1}}</p>
      <p>身份证号：{{personInfo.paper_number}}</p>
      <p>户籍所在地：{{personInfo.native_address}}</p>
      <p>
        是否重点关注对象：
        <span v-if="personInfo.focus==1" class="success">是</span>
        <span v-else class="error">否</span>
      </p>
    </div>
    <div class="user-house">
      <p class="infoColor fontsize18">房屋信息</p>
      <div class="fontsize14 center" v-for="(item,index) in houseList">
        <span class="loca">{{item.building_name + item.unit_name + item.house_name}}</span>
        <span class="user-house-type user-house-type3">{{item.dwelling_name || '户主'}}</span>
        <span class="house-btn">
          <el-button size="mini" @click="CheckTheHouse(index+1)">查看</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { baseInfo } from "@/api/archives";

export default {
  name: "EssentialInfo",
  props: {
    userId: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      personInfo: {},
      houseList: []
    };
  },
  methods: {
    getInitialData() {
      // alert(this.userId)
      let data = {
        person_id: this.userId
      };
      return new Promise((resolve, reject) => {
        baseInfo(data).then(
          res => {
            console.log(res);
            this.personInfo = res.data.personInfo;
            this.houseList = res.data.house;
            this.$store.commit("archives/SET_LAYOUTFLAG", 3);
            resolve(true);
          },
          error => {
            reject();
          }
        );
      });
    },
    CheckTheHouse(id) {
      console.log(id);
      this.$emit("updateTypeShowHousing", id);
    }
  }
};
</script>

<style scoped lang="scss">
.user-basic-info {
  width: 450px;
  height: 853px;
  padding: 0 24px;
  letter-spacing: 1px;

  /* .subtitle {
      line-height: 60px;
      padding-top: 10px;
    } */

  .user-img {
    width: 100%;
    height: 229px;
    margin-bottom: 5%;
  }

  .user-info {
    padding-left: 14px;

    p {
      margin-bottom: 12px;

      span {
        display: inline-block;
        width: 34%;
      }
    }

    .is-emphasis1 {
      color: #fc4f55;
    }
  }

  .user-house {
    padding-left: 14px;
    margin-top: 40px;
    padding-right: 20px;
    font-weight: 400;

    .center {
      justify-content: space-between;
      margin-top: 14px;
    }

    .loca {
      width: 48%;
      font-size: 14px;
    }

    .house-btn {
      width: 40px;
    }
  }
}
</style>
