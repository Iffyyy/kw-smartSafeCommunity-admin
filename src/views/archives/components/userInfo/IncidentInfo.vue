<template>
  <div class="incident-info">
    <p class="subtitle text-center infoColor fontsize22 paddtop20 font-wight-bold">事件信息</p>
    <div>
      <el-select
        class="padd-bo selectWidth150"
        size="mini"
        v-model="queryInfo.event_list_id"
        @change="getEventInfo()"
      >
        <el-option v-for="item in eventTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <el-date-picker
      class="date-query"
      v-model="datetime"
      type="daterange"
      range-separator="—"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      @change="getEventInfo()"
    ></el-date-picker>
    <div class="access-container">
      <div class="access-list"  v-infinite-scroll="nextPage" :infinite-scroll-disabled="disabled">
        <div v-for="item in eventListData" :key="item.id">
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
                  <span>类型：{{item.event_list.name}}</span>
                  <span :style="'color:'+fiterColor(item.event_status.id)">{{item.event_status.name}}</span>
                </div>
                <span>时间：{{item.happen}}</span>
                <div>
                  操作：
                  <span :class="{'is-supervise':item.supervise===1}" @click="superviseIt(item)">{{item.supervise===1?'催办中':'催办'}}</span>
                  <span>关注</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventInfo, eventList } from "@/api/archives";
import { supervise } from "@/api/event";
export default {
  name: "IncidentInfo",
  props: {
    // userId: {
    //   type: String | Number,
    //   required: true
    // }
  },
  data() {
    return {
      value: 1,
      datetime: [],
      incidentType: [
        {
          label: "门未关",
          value: 1
        }
      ],
      eventTypeList: [],
      queryInfo: {
        person_id: this.userId,
        event_list_id: 1,
        page: 1,
        number: 10
      },
      eventListData: [],
      disabled:false
    };
  },
  computed: {
    userId() {
      return this.$store.state.archives.currentUser.id;
    }
  },
    watch: {
    userId(newV) {
      if (newV) {
        this.flag = 0;
        this.eventListData = [];
        this.queryInfo.page = 1;
        this.disabled = true;
        this.getEventInfo();
      }
    }
  },
  methods: {
    fiterColor(id){
      switch(id){
        case 1:
          return '#26CBA9';
        case 6:
          return '#FC4F55';
        default:
          return '#FFAA23';

      }
    },
    superviseIt(data){
      if(data.supervise)return
      supervise({
        id:data.id
      }).then(res=>{
        if(res.code===2000){
          this.$message.success('催办成功')
          this.getInitialData()
        }
      })
    },
    getInitialData() {
      this.eventListData = [];
      this.queryInfo.page = 1;
      return new Promise((resolve, reject) => {
        (async () => {
          await this.getEventList();
          await this.getEventInfo().then(res => {
            this.$store.commit("archives/SET_LAYOUTFLAG", 3);
            resolve(res);
          });
        })();
      });
    },
    getEventList() {
      return new Promise((resolve, reject) => {
        eventList().then(res => {
          if (res.code === 2000) {
            this.eventTypeList = res.data;
            resolve(true);
          }
        });
      });
    },
    nextPage(){
      if (this.queryInfo.page < this.sumPage) {
        this.getAccessInfo();
        this.queryInfo.page += 1;
      } else {
        this.disabled = true;
      }
    },
    getEventInfo() {
      if (this.datetime.length > 0) {
        this.queryInfo.datetime = JSON.stringify(this.datetime);
      }
      return new Promise((resolve, reject) => {
        this.queryInfo.person_id = this.userId;
        eventInfo(this.queryInfo).then(
          res => {
            if (res.code === 2000) {
              this.eventListData = this.eventListData.concat(res.data)
            }
          },
          error => {
            reject();
          }
        );
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.incident-info {
  width: 100%;
  height: 100%;
  padding: 0 30px;

  .date-query {
    width: 100%;
  }

  .access-container {
    position: relative;
    margin-top: 20px;
    height: 73%;
    overflow-y: scroll;
    /* width: 36%; */

    > div.access-list {
      width: 40%;
      position: absolute;
      border-right: 2px solid $navText;

      > div {
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

                > span:nth-child(2) {
                  height: 16px;
                  color: #ffaa23;
                  text-align: center;
                  font-weight: 400;
                }
              }

              > div:nth-child(3) {
                > span {
                  margin-left: 10px;
                  /* width: ; */
                  border: 1px solid #04e5ff;
                  border-radius: 5px;
                  padding: 4px;
                  color: #04e5ff;
                  font-size: 11px;
                  letter-spacing: 1px;
                  cursor: pointer;
                }
                .is-supervise{
                  background: $navText;
                  color:#041D36;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
