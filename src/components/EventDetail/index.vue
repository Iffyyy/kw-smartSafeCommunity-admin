<template>
  <el-dialog
    :title="showInfo.event_list_name|formatStr"
    :visible.sync="showFlag"
    :append-to-body="true"
    modal-append-to-body
    class="event-container"
    @close="canceIt"
  >
    <div class="event-content">
      <div class="content-left">
        <img :src="showInfo.pic_url" />
        <!-- 查看按钮 -->
        <span @click="viewIt" v-if="showVideo.indexOf(showInfo.event_list_id)!==-1">视频确认</span>
        <span @click="viewIt" v-if="showInfo.event_list_id===14">查看详情</span>
        <div class="person-info" v-if="personInfo.indexOf(showInfo.event_list_id)!==-1">
          <span @click="viewIt">查看详情</span>
          <div>
            <div class="detail-info">
              <span>姓名：{{showInfo.person_name}}</span>
              <span>性别：{{showInfo.person_sex}}</span>
              <span>电话：{{showInfo.person_phone}}</span>
              <span>地址：{{showInfo.person_address}}</span>
              <span>卡号：{{showInfo.person_access_card_no}}</span>
            </div>
            <div class="tabs-list">
              <span
                class="tab-style"
                v-for="(item,index) in showInfo.person_trait"
                :key="index"
              >{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <span>报警原因</span>
        <div>{{showInfo.description}}</div>
        <span>{{showInfo.happen}}</span>
        <span>{{showInfo.place}}</span>
      </div>
    </div>
    <div class="center-content">
      <el-radio-group v-model="showInfo.event_status_id">
        <el-radio v-for="radio in radioList" :key="radio.value" :label="radio.value">{{radio.label}}</el-radio>
      </el-radio-group>
      <!-- <div>添加备注信息</div> -->
      <!-- <el-input type="textarea" ></el-input> -->
      <textarea class="el-textarea" rows="2" v-model="showInfo.remarks" placeholder="请输入备注信息"></textarea>
    </div>
    <div class="button-group">
      <button @click="canceIt">取消</button>
      <button @click="confirm">确定</button>
    </div>
  </el-dialog>
</template>

<script>
import { detail, updateStatus } from "@/api/event";

import { formatStr } from "@/utils/index";
import { parseTime } from "@/utils/index";
export default {
  name: "EventDetail",
  filters: {
    formatStr(str) {
      return formatStr(str, 6);
    }
  },
  props: {
    // visible: {
    //   type: Boolean
    // },
    // title: {
    //   type: Object,
    //   // required: true
    // },
    // id:{
    //   type:String|Number,
    //   // required:true
    // }
    // showInfo: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      radio: 3,
      showFlag: this.visible,
      tabs: ["党员", "志愿者", "重点关注人员"],
      radioList: [
        {
          //4是督办
          label: "待处理",
          value: 1
        },
        {
          label: "自行解决",
          value: 2
        },
        {
          label: "已处理",
          value: 3
        },
        {
          label: "其他",
          value: 5
        },
        {
          label: "误报",
          value: 6
        }
      ],
      title: "事件详情",
      showVideo: [1, 3, 11, 9, 10, 12,15,16,17,18,19,20],
      personInfo: [2, 5, 6, 7, 8],
      messageBtn: [6, 8],
      showInfo: {}
    };
  },
  computed: {
    flag() {
      return this.$store.getters.showDetail;
    },
    id() {
      return this.$store.getters.showId;
    }
  },
  watch: {
    flag(newV) {
      this.showFlag = newV;
      if (newV && this.id) {
        this.getDetail();
      }
    }
  },
  methods: {
    //1陌生人预警，2重点关注人员，3尾随，4租户变更，5异常时段出入，6租赁到期，7疑似迁出，8独居老人
    // 9周界入侵预警,10电瓶车禁入预警,11高空抛物预警,12门未关预警,13主干道占用预警,14热点区域预警,
    //15安防设备,16充电设备,17门禁设备,18云对讲设备,19机房设备,20其他设备
    viewIt() {
      const options = {
        2: () => {
          this.jumpToAccessRecords();
        },
        6: () => {
          this.jumpToBaseInfo();
        },
        7: () => {
          this.jumpToBaseInfo();
        },
        8: () => {
          this.jumpToHouseInfo();
        },
        14: () => {
          this.jumpToInOut();
        }
      };
      options[this.showInfo.event_list_id].call(this);
      this.canceIt();
      // this.$emit("handleEvent");
    },
    jumpToAccessRecords() {
      const date = parseTime(this.showInfo.happen, "{y}-{m}-{d}");
      // this.$router.push("/archives/index?date=" + date);
      this.$router.push({ name: "档案中心", params: { date: date } });
      let currentUser = {};
      currentUser.id = this.showInfo.person_id;
      currentUser.img = this.showInfo.person_id;
      currentUser.name = this.showInfo.person_name;
      this.$store.commit("archives/SET_LAYOUTFLAG", 3);
      this.$store.commit("archives/SET_VIEWTYPE", 2);
      this.$store.commit("archives/SET_CURRENTUSER", currentUser);
    },
    jumpToBaseInfo() {
      let currentUser = {};
      currentUser.id = this.showInfo.person_id;
      currentUser.img = this.showInfo.person_id;
      currentUser.name = this.showInfo.person_name;
      this.$store.commit("archives/SET_LAYOUTFLAG", 3);
      this.$store.commit("archives/SET_VIEWTYPE", 0);
      this.$store.commit("archives/SET_CURRENTUSER", currentUser);
      this.$router.push('/archives/index');
    },
    jumpToHouseInfo() {
      let currentUser = {};
      currentUser.id = this.showInfo.person_id;
      currentUser.img = this.showInfo.person_id;
      currentUser.name = this.showInfo.person_name;
      this.$store.commit("archives/SET_LAYOUTFLAG", 3);
      this.$store.commit("archives/SET_VIEWTYPE", 5);
      this.$store.commit("archives/SET_CURRENTUSER", currentUser);
      this.$router.push('/archives/index');
    },
    jumpToInOut() {
      this.$router.push('/system/accessConfig?id='+this.showInfo.building_id);
    },
    // formatStr() {
    //   formatStr();
    // },
    canceIt() {
      // this.$emit("update:visible", false);
      this.$store.commit("event/SET_SHOWDETAIL", false);
    },
    confirm() {
      // this.$emit("handleConfirm");
      updateStatus({
        id: this.id,
        status: this.showInfo.event_status_id,
        remarks: this.showInfo.remarks
      }).then(res => {
        if (res.code === 2000) {
          this.$message.success("修改成功");
          this.canceIt();
        }
      });
    },
    getDetail() {
      detail({
        id: this.id
      }).then(res => {
        if (res.code === 2000) {
          this.showInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "../../assets/";
.event-container {
  position: fixed;
  top: 0;
  z-index: 3000 !important;
  .event-content {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    color: $textWhite;

    .content-left {
      position: relative;
      font-size: 18px;

      & > img {
        width: 580px;
        height: 350px;
        border-radius: 6px;
      }

      > span:nth-child(2) {
        position: absolute;
        bottom: 26px;
        /* background: center / contain url($imgUrl+'common/video-bg.png') no-repeat !important; */
        left: 28px;
        width: 144px;
        height: 50px;
        line-height: 50px;
        border-radius: 14px;
        cursor: pointer;
        display: inline-block;
        box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset;
        background-color: rgba(4, 29, 54, 0.8);
        text-align: center;

        &:hover {
          box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset,
            0px 0px 6px rgba(0, 204, 255, 0.4);
        }

        &::before {
          content: "";
          background: center / contain url($imgUrl+"common/play.png") no-repeat !important;
          width: 26px;
          height: 34px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
          /* position: absolute; */
        }
      }

      > div.person-info {
        position: absolute;
        bottom: 0;
        /* background: center / contain url($imgUrl+'common/video-bg.png') no-repeat !important; */
        left: 0;
        width: 580px;
        height: 134px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        > span:nth-child(1) {
          margin-left: 28px;
          width: 144px;
          height: 50px;
          line-height: 50px;
          border-radius: 14px;
          cursor: pointer;
          display: inline-block;
          box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset;
          background-color: rgba(4, 29, 54, 0.8);
          text-align: center;

          &:hover {
            box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset,
              0px 0px 6px rgba(0, 204, 255, 0.4);
          }

          &::before {
            content: "";
            background: center / contain url($imgUrl+"common/info.png")
              no-repeat !important;
            width: 22px;
            height: 22px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            /* position: absolute; */
          }
        }

        > div:nth-child(2) {
          width: 100%;
          height: 74px;
          background-color: rgba(4, 29, 54, 0.8);
          padding: 2px 10px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;

          > div:nth-child(1) {
            width: 76%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            /* justify-content: space-between; */

            > span {
              margin-right: 38px;
            }
          }

          > div:nth-child(2) {
            width: 24%;
            height: 100%;
            padding: 8px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;

            > span.tab-style {
              margin-right: 10px;
              border: 1px solid rgba(255, 170, 35, 1);
              border-radius: 14px;
              color: rgba(255, 170, 35, 1);
              height: 24px;
              line-height: 24px;
              padding: 0 10px;
              font-size: 14px;
            }

            /* > span.tab-style:nth-last-of-type(3) {
              margin-right: 0px;
            } */
          }
        }
      }
    }

    .content-right {
      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
      /* align-items: center; */
      position: relative;
      height: 350px;
      width: 260px;

      span:nth-child(1) {
        margin-top: 10px;
        margin-left: 100px;

        &::before {
          content: "";
          background: center / contain url($imgUrl+"common/bell.png") no-repeat !important;
          width: 34px;
          height: 34px;
          display: inline-block;
          position: absolute;
          left: 50px;
          top: 6px;
        }
      }

      div:nth-child(2) {
        margin-top: 14px;
        padding: 18px 28px;
        width: 260px;
        height: 180px;
        box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset;
        border-radius: 6px;
        font-size: 18px;
        color: $textWhite;
        overflow-y: scroll;
      }

      span:nth-child(3) {
        margin-top: 14px;
        font-size: 18px;

        &::before {
          content: "";
          background: center / contain url($imgUrl+"common/time.png") no-repeat !important;
          width: 18px;
          height: 18px;
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;
        }
      }

      span:nth-child(4) {
        margin-top: 14px;
        font-size: 18px;

        &::before {
          content: "";
          background: center / contain url($imgUrl+"common/location.png")
            no-repeat !important;
          width: 18px;
          height: 20px;
          display: inline-block;
          margin-right: 10px;
          vertical-align: baseline;
          /* top: 16px; */
        }
      }
    }
  }

  .center-content {
    display: flex;
    justify-content: space-between;
    color: $textWhite;
    margin-top: 20px;

    .el-radio-group {
      width: 400px;
      z-index: 99;

      .el-radio {
        width: 120px;
        height: 30px;
      }
    }

    .el-textarea {
      width: 753px;
      height: 60px;
      border: none;
      border-radius: 6px;
      box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset !important;
      background: none !important;
      padding: 10px 20px;
      line-height: 20px;
      color: $textWhite;
      font-size: 16px;
      resize: none;

      &:focus {
        outline: 1px solid rgba(0, 204, 255, 0.2) !important;
      }

      .el-textarea__inner {
        box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset !important;
        background: none !important;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-around;
    padding: 0 300px;
    position: absolute;
    bottom: 22px;
    left: 0;
    width: 100%;

    button {
      width: 136px;
      height: 46px;
      border-radius: 18px;
      color: $textWhite;
      font-size: 16px;
      cursor: pointer;
      letter-spacing: 4px;
    }

    button:nth-child(1) {
      background: none;
      border-color: $navText;
      color: $navText;
    }

    button:nth-child(2) {
      background: $navText;
      border-color: $navText;
    }
  }
}
</style>
