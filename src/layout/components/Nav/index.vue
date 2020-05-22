<template>
  <div class="navbar">
    <img src="../../../assets/nav/nav-bg.png" />
    <div class="nav-main-content">
      <div class="left-part">
        <logo class="logo-part" :collapse="isCollapse" />
        <div class="community-info">
          <svg-icon iconClass="community"></svg-icon>
          <span>交大飞马旅科创园</span>
        </div>
      </div>
      <div class="nav-title">智慧社区综合管理平台</div>
      <div class="right-part">
        <el-popover
          popper-class="supervise-info"
          placement="bottom-end"
          trigger="hover"
          width="500"
          :close-delay="100"
        >
          <el-table
            :data="superviseInfo"
            height="200px"
            style="width: 100%"
            @row-click="viewDetail"
          >
            <el-table-column prop="event_name" label="内容"></el-table-column>
            <el-table-column prop="location" align="center" label="位置"></el-table-column>
            <el-table-column prop="supervise_time" align="center" min-width="90" label="时间"></el-table-column>
          </el-table>
          <div class="center-title" slot="reference">
            <img :class="{'active':superviseNum>0}" :src="bgImg" />
            <span class="text-style">督办事件</span>
            <span class="circle-num">{{superviseNum>99?'99+':superviseNum}}</span>
          </div>
        </el-popover>
        <div class="nav-right">
          <el-popover placement="bottom" width="140" trigger="click" popper-class="change-pwd">
            <div class="change-password">
              <div @click="showInfo">修改密码</div>
              <div @click="logout">退出</div>
            </div>

            <div class="user-info" slot="reference">
              <svg-icon iconClass="user"></svg-icon>
              <span>{{name}}</span>
            </div>
          </el-popover>
        </div>
      </div>
      <!-- 
      
      -->
    </div>
    <event-detail></event-detail>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import EventDetail from "@/components/EventDetail";
import Border from "./Border";
import { getEventSuperviseNum } from "@/api/event";
import borderB from "../../../assets/nav/border.png";
import borderA from "../../../assets/nav/border-a.png";

import EditPassword from "./EditPassword";
import Logo from "../Sidebar/Logo";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Border,
    EditPassword,
    EventDetail,
    Logo
  },
  data() {
    return {
      superviseNum: 0,
      showId: "",
      colorList: [
        "rgba(255,200,0,0.2)",
        "rgba(255,200,0,0.4)",
        "rgba(255,200,0,0.8)",
        "rgba(255,200,0,1)",
        "rgba(255,200,0,0.7)",
        "rgba(255,200,0,0.3)"
      ],
      timer: null,
      gridData: [],
      // visible:false,
      superviseInfo: []
    };
  },
  created() {
    this.loadEventSuperviseNum();
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "sidebar",
      "name",
      "showDetail"
      // 'superviseNum'
    ]),
    bgImg() {
      return this.superviseNum > 0 ? borderA : borderB;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$store.commit("SET_ROUTERS", []);
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    loadEventSuperviseNum() {
      getEventSuperviseNum().then(res => {
        if (res.code === 2000) {
          this.superviseNum = res.data.superviseCount;
          this.superviseInfo = res.data.superviseInfo;
        }
      });
    },
    showInfo() {
      this.$store.commit("SET_EDITPWD", true);
    },
    viewDetail(row) {
      this.$store.commit("event/VIEW_DETAIL", row.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
$imgUrl: "../../../assets/";

.navbar {
  height: $navHeight;
  overflow: hidden;
  position: relative;
  background: $navBg;
  padding-bottom:10px ;
  /* box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  color: $navText;
  font-size: 18px;

  img {
    width: 100%;
    height: 100%;
  }

  div.nav-main-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-part {
      width: 35%;
      height: 80px;
      display: flex;
      /* align-items: center; */
      justify-content: center;

      .logo-part {
        width: 220px;
        margin-left: 8%;
      }

      .community-info {
        width: 40%;
        height: 60px;
        margin-left: 8%;
        /* margin-right: 120px; */
        font-size: 22px;
        font-weight: 500;
        display: flex;
        align-items: center;

        .svg-icon {
          width: 30.46px;
          height: 37px;
          margin-right: 10px;
          vertical-align: middle;
        }

        > span {
          color: #fff;
          font-weight: 500;
        }
      }
    }

    .nav-title {
      min-width: 460px;
      width: 30%;
      color: $navTitle;
      font-size: 38px;
      letter-spacing: 4px;
      font-weight: 500;
      text-align: center;
    }

    .right-part {
      width: 34%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      /* align-items: center; */

      .center-title {
        color: $navText;
        width: 164px;
        height: 48px;
        line-height: 48px;
        position: relative;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
        cursor: pointer;
        margin-left: 70%;
        margin-top: 10px;

        img {
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
        }

        .svg-icon {
          width: 30.46px;
          height: 37px;
          margin-right: 6.62px;
          margin-left: 8px;
        }

        .lamp-active {
          margin-left: 8px;
          width: 46px;
          height: 44px;

          animation: lamp 1.5s infinite alternate;
          /* color: rgba($color: #f5f85a, $alpha: 1.0); */
        }

        @keyframes lamp {
          0% {
            color: rgba($color: #e6e34a, $alpha: 0.2);
          }
          100% {
            color: rgba($color: #e6e34a, $alpha: 1);
            transform: scale(1.1);
          }
        }

        .active {
          width: 176px;
          height: 70px;
          top: -10px;
          animation: border 0.8s infinite alternate;
          /* color: rgba($color: #f5f85a, $alpha: 1.0); */
        }

        @keyframes border {
          0% {
            opacity: 0.6;
          }
          100% {
            /* transform: scale(1.04); */
          }
        }

        .circle-num {
          width: 36px;
          height: 36px;
          background: rgba(255, 44, 44, 1);
          border-radius: 50%;
          color: #ffffff;
          font-size: 19px;
          font-weight: 600;
          display: inline-block;
          line-height: 36px;
          text-align: center;
          position: absolute;
          top: -10px;
          right: -10px;
        }
      }

      .nav-right {
        /* position: absolute;
        right: 20px; */
        width: 200px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 10%;

        div.user-info {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 22px;
          font-weight: 500;
          .svg-icon {
            width: 33px;
            height: 37px;
            margin-right: 10px;
          }

          > span:nth-child(2):after {
            content: "";
            display: inline-block;
            width: 16px;
            height: 14px;
            background: center / contain url($imgUrl+"common/arrow.png")
              no-repeat;
            margin-left: 10px;
          }
        }

        /* .exit {
      width: 25px;
      height: 25px;
      margin-left: 26px;

      &:hover {
        transform: scale(1.1);
      }
    } */
      }
    }
  }

  /* .logo-style {
    margin-left: 15px;
    width: 116px;
    height: 50px;
  } */

  .nav-left {
    display: flex;
    align-items: center;
    /* margin-left: 280px; */
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}

.list-item {
  height: 34px;
  line-height: 34px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: $textWhite;
  cursor: pointer;
  font-size: 14px;

  > span:nth-child(1) {
    &::before {
      display: inline-block;
      width: 20px;
      height: 20px;
      content: "";
      background: center / contain url($imgUrl+"common/warn.png") no-repeat;
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  &:hover {
    background-color: rgba(4, 49, 76, 1);
  }
}

.change-password {
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;

  div {
    height: 34px;
    line-height: 34px;
    padding-left: 20px;
    &:hover {
      background-color: rgba(4, 49, 76, 1);
    }
  }
}
</style>
<style lang="scss">
$imgUrl: "../../../assets/";
.supervise-info {
  max-height: 200px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: #041d36;
  overflow: hidden;
  position: relative;
  .el-table {
    border-radius: 10px;
    .el-table__header-wrapper {
      background: #04314c;
      height: 44px;

      &::after {
        background: none;
      }

      .el-table__header tr th {
        padding: 0;
        height: 44px !important;
        line-height: 44px !important;
      }
    }

    tr,
    .el-table__row {
      padding: 0 20px;
    }
    tr td {
      padding: 7px 0;
      cursor: pointer;
    }

    th {
      > div {
        text-align: center;
      }
      > .cell {
        font-size: 18px !important;
        font-weight: 500;
        line-height: 24px;
      }
    }
    td > .cell {
      font-size: 16px;
      color: #fff;
      font-weight: 400;
    }

    tbody tr td:nth-child(1) > div {
      &::before {
        display: inline-block;
        width: 20px;
        height: 20px;
        content: "";
        background: center / contain url($imgUrl+"common/warn.png") no-repeat;
        /* position: absolute; */
        margin-right: 10px;
        margin-left: 10px;
        vertical-align: text-bottom;
      }
    }

    .el-table__body-wrapper {
      border-radius: 0 0 10px 10px;
    }
  }
}

.change-pwd {
  height: 90px;
  padding: 10px 0;
}
</style>