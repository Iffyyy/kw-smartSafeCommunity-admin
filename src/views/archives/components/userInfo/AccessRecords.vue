<template>
  <div class="access-records">
    <p class="subtitle text-center infoColor fontsize22 paddtop20 font-wight-bold">出入记录</p>
    <div>
      <span :class="{'is-active':flag===0}" @click="handleTabs(0)">出入记录查询</span>
      <span :class="{'is-active':flag===1}" @click="handleTabs(1)">活动规律统计</span>
      <div :class="{'tab-right':flag===1}"></div>
    </div>
    <el-date-picker
      v-show="flag===0"
      class="date-query"
      v-model="datetime"
      type="daterange"
      range-separator="—"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      @change="getInitialData()"
    ></el-date-picker>
    <div class="access-container" v-show="flag===0">
      <div class="access-list" v-infinite-scroll="nextPage" :infinite-scroll-disabled="disabled">
        <div class="info-list infinite-list-item" v-for="item in accessData" :key="item.id">
          <img :src="item.pic_url" />
          <div>
            <div>
              <span></span>
              <span></span>
            </div>
            <div>
              <div></div>
              <div></div>
              <!-- 信息 -->
              <div>
                <div>
                  <span>姓名：{{name}}</span>
                  <span :class="item.come_type_id===1?'in-style':'out-style'">{{item.come_type}}</span>
                </div>
                <span>出入时间：{{item.entrace_time}}</span>
                <p>门禁位置：{{item.door}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-if="accessData.length===0" class="note">暂无数据</p>
    </div>
    <div class="activity-regularity" v-show="flag===1">
      <div>
        <div class="item-style" v-for="(item,index) in activityLawData" :key="index">
          <div class="dot-style">
            <span></span>
            <span></span>
          </div>
          <img
            :style="item.come_type_id===1?'transform:rotateY(180deg)':''"
            src="../../../../assets/archives/run.png"
          />
          <div>
            <span></span>
            <span></span>
            <!-- 信息 -->
            <div>
              <div>
                <span>时间：{{item.entrace_time}}</span>
                <span :class="item.come_type_id===1?'in-style':'out-style'">{{item.come_type}}</span>
              </div>
              <p>位置：{{item.address}}</p>
            </div>
          </div>
        </div>
      </div>
      <p v-if="activityLawData.length===0" class="note">暂无数据</p>
    </div>
  </div>
</template>

<script>
import { accessInfo, activityLaw } from "@/api/archives";
import { parseTime } from "@/utils/index";
export default {
  name: "AccessRecords",
  props: {
    // userId: {
    //   type: String | Number,
    //   required: true
    // }
  },
  data() {
    return {
      flag: 0,
      accessData: [],
      datetime: [],
      queryInfo: {
        person_id: this.userId,
        page: 1,
        number: 5
      },
      sumPage: 0,
      activityLawData: [],
      disabled: false
    };
  },
  created() {
    if (this.$route.params.date) {
      const date = this.$route.params.date;
      this.datetime = [date, date];
    }
    this.disabled = true;
  },
  computed: {
    userId() {
      return this.$store.state.archives.currentUser.id;
    },
    name() {
      return this.$store.state.archives.currentUser.name;
    }
  },
  watch: {
    userId(newV) {
      if (newV) {
        this.flag = 0;
        this.accessData = [];
        this.queryInfo.page = 1;
        this.disabled = true;
        this.getAccessInfo();
      }
    }
  },
  methods: {
    handleTabs(index) {
      this.flag = index;
      if (index === 1) {
        this.getActivityLaw();
      } else {
        this.getInitialData();
      }
    },
    getInitialData() {
      this.accessData = [];
      this.queryInfo.page = 1;
      this.flag = 0;
      return new Promise((resolve, reject) => {
        this.$store.commit("archives/SET_LAYOUTFLAG", 3);
        this.getAccessInfo();
        resolve(true);
      });
    },
    getAccessInfo() {
      if (this.datetime.length > 0) {
        this.queryInfo.datetime = JSON.stringify(this.datetime);
      }
      this.queryInfo.person_id = this.userId;
      accessInfo(this.queryInfo).then(
        res => {
          if (res.code === 2000) {
            this.accessData = this.accessData.concat(res.data.data);
            this.sumPage = res.data.sumPage;
            if (this.queryInfo.page < this.sumPage) {
              this.disabled = false;
            }
          }
        },
        error => {
          reject();
        }
      );
    },
    nextPage() {
      if (this.queryInfo.page < this.sumPage) {
        this.getAccessInfo();
        this.queryInfo.page += 1;
      } else {
        this.disabled = true;
      }
    },
    getActivityLaw() {
      return new Promise(resolve => {
        activityLaw({
          person_id: this.userId
        }).then(res => {
          if (res.code === 2000) {
            this.activityLawData = res.data;
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.access-records {
  width: 100%;
  height: 100%;
  padding: 0 30px;

  > div:nth-child(2) {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 16px 24px;
    border-bottom: 2px solid rgba(0, 204, 255, 0.5);
    position: relative;
    /* height: 0px; */

    > span {
      width: 50%;
      text-align: center;
      height: 30px;
      cursor: pointer;
    }

    > span.is-active {
      color: #00ccff;
    }

    > div {
      width: 50%;
      height: 2px;
      background: #00ccff;
      position: absolute;
      bottom: -2px;
      right: 50%;
      transition: all 0.5s;
    }

    & > div.tab-right {
      right: 0;
    }
  }

  .date-query {
    width: 100%;
  }

  .access-container {
    position: relative;
    margin-top: 20px;
    height: 75%;
    overflow-y: scroll;
    /* width: 36%; */

    > div.access-list {
      width: 40%;
      position: absolute;
      border-right: 2px solid $navText;

      div.info-list {
        width: 94%;
        height: 120px;
        position: relative;

        > img {
          width: 100%;
          height: 85px;
        }

        > div {
          position: absolute;
          width: 160%;
          height: 101px;
          right: -164%;
          top: 0;
          display: flex;
          /* justify-content: space-between; */

          > div:nth-child(1) {
            width: 20px;
            height: 100%;
            position: relative;
            margin-left: 1px;

            > span {
              display: inline-block;
              position: absolute;
              border-radius: 50%;
              background: $navText;
            }
            > span:nth-child(1) {
              width: 7px;
              height: 7px;
              top: 39px;
            }
            > span:nth-child(2) {
              width: 13px;
              height: 13px;
              opacity: 0.5;
              left: -3px;
              top: 36px;
            }
          }

          > div:nth-child(2) {
            width: 86.5%;
            height: 100%;
            border: 2px solid $navText;
            border-radius: 8px;
            margin-left: 14px;
            background: rgba(4, 229, 255, 0.09);
            position: relative;
            padding: 8px;

            > div:nth-child(1) {
              width: 0;
              height: 0;
              border-top: 8px solid transparent;
              border-right: 20px solid $navText;
              border-bottom: 8px solid transparent;
              position: absolute;
              top: 32px;
              left: -20px;
            }

            > div:nth-child(2) {
              width: 0;
              height: 0;
              border-top: 6px solid transparent;
              border-right: 18px solid #042f48;
              border-bottom: 6px solid transparent;
              position: absolute;
              top: 34px;
              left: -18px;
            }

            > div:nth-child(3) {
              height: 100%;
              font-size: 12px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              > div:nth-child(1) {
                display: flex;
                justify-content: space-between;
                > span:nth-child(1) {
                  font-size: 14px;
                }

                > span:nth-child(2) {
                  width: 40px;
                  height: 16px;
                  background: #ffaa23;
                  border-radius: 6px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }

  .activity-regularity {
    margin-top: 20px;
    height: 81%;
    overflow-y: scroll;
    position: relative;
    padding: 8px;
    > div {
      border-left: 2px solid $navText;
      /* position: relative; */

      .item-style {
        height: 100px;
        padding: 0 0 0 16px;
        display: flex;
        justify-content: space-between;

        > div.dot-style {
          width: 20px;
          position: absolute;
          left: 5px;

          > span {
            display: inline-block;
            position: absolute;
            border-radius: 50%;
            background: $navText;
          }
          > span:nth-child(1) {
            width: 7px;
            height: 7px;
            top: 39px;
          }
          > span:nth-child(2) {
            width: 13px;
            height: 13px;
            opacity: 0.5;
            left: -3px;
            top: 36px;
          }
        }

        > img {
          width: 100px;
          height: 100px;
        }

        > div:nth-child(3) {
          width: 64%;
          height: 68%;
          border: 2px solid $navText;
          border-radius: 8px;
          margin-left: 14px;
          background: rgba(4, 229, 255, 0.09);
          position: relative;
          padding: 8px;
          font-size: 12px;
          margin-top: 10px;

          > span:nth-child(1) {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-right: 20px solid $navText;
            border-bottom: 8px solid transparent;
            position: absolute;
            top: 22px;
            left: -20px;
          }

          > span:nth-child(2) {
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-right: 18px solid #042f48;
            border-bottom: 6px solid transparent;
            position: absolute;
            top: 24px;
            left: -18px;
          }

          > div:nth-child(3) {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            > div:nth-child(1) {
              display: flex;
              justify-content: space-between;

              > span:nth-child(2) {
                width: 40px;
                height: 16px;
                border-radius: 6px;
                text-align: center;
              }

              .in-style {
                background: #ffaa23;
              }

              .out-style {
                background: #26cba9;
              }
            }
          }
        }
      }
    }
  }
}

.note {
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}
</style>
