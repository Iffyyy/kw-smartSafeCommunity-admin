<template>
  <div class="user-list-item center bg shadow">
    <div class="user-img">
      <img :src="userInfo.face_pic_url" alt="用户头像">
    </div>
    <div class="user-info">
      <div>
        <p>
          <span>姓名：{{userInfo.name}}</span>
          <span>性别：{{userInfo.sex == 1 ?'男':'女'}}</span>
        </p>
        <p>联系方式：{{userInfo.phone1}}</p>
        <p>地址：{{userInfo.habitation_address}}</p>
      </div>
      <el-tooltip class="item" effect="dark" placement="bottom">
        <div slot="content">
          <p class="infoColor label-list" v-for="label in userInfo.person_trait">{{label.name}}</p>
        </div>
        <p class="label fontsize16 infoColor center">
          {{userInfo.person_trait[0].name}}
          <img class="up" src="../../../assets/common/up.png">
        </p>
      </el-tooltip>

    </div>
  </div>
</template>

<script>
  export default {
    name: "UserList",
    props: {
      userInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">

  .user-list-item {
    width: 32%;
    height: 31%;
    margin-bottom: 10px;
    display: flex;
    padding-left: 2%;
    position: relative;
    cursor: pointer;
    transition: all 0.1s linear;

    .user-img {
      width: 31.5%;
      height: 80%;
      min-width: 130px;
      background-color: pink;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-info {
      width: 60%;
      height: 80%;
      color: #fff;
      padding: 0 10px;
      /*margin-top: 10%;*/
      position: relative;



      div {
        margin-top: 20%;
      }

      p {
        margin-bottom: 12px;

        > span:nth-child(2) {
          margin-left: 20px;
        }
      }

      .label {
        width: 24%;
        min-width: 120px;
        display: flex;
        position: absolute;
        top: 0;
        right: 6%;

        .up {
          width: 17px;
          margin-left: 2%;
          display: inline-block;
          transform: rotate(180deg);
        }
      }
    }
  }
  .label-list {
    line-height: 23px;
  }
  .user-list-item:hover {
    /*box-shadow: rgba(0, 204, 255, .45) 0px 0px 60px inset;*/
    /*transform: scale(1.001);*/
    /* box-shadow: rgba(0, 204, 255, .45) 0px 0px 10px, rgba(0, 204, 255, .45) 0px 0px 40px inset; */
    transform: scale(1.01);
  }
</style>
