<template>
  <div class="person-incident" :class="{'is-open':open}">
    <div class="incident-list">
      <event-item
        v-for="(item,index) in eventResponse"
        :key="index"
        class="item-style"
        :event="item"
        @view="viewMore"
      ></event-item>
    </div>

    <div class="table-container">
      <img :src="listBg" style="position:absolute;width:100%;height:100%" />
      <div class="table-content">
        <div class="table-title">
          <span>人员事件记录</span>
          <span @click="switchList">展开列表</span>
        </div>
        <el-table :data="eventList" :height="open?'84%':'70%'" size="mini">
          <el-table-column align="center" min-width="120px" prop="happen" label="发生时间"></el-table-column>
          <el-table-column
            align="center"
             min-width="120px"
            :filters="eventTypeList"
            :filter-method="eventTypeFilter"
            prop="eventlist.name"
            label="报警类型"
          ></el-table-column>
          <el-table-column align="center" prop="person_name" label="姓名"></el-table-column>
          <el-table-column
            align="center"
            :filters="apartmentList"
            :filter-method="eventTypeFilter"
            prop="building.code"
            label="位置"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="eventstatus.name"
            :filters="statusList"
            :filter-method="eventTypeFilter"
            label="状态"
          ></el-table-column>
          <el-table-column align="center" min-width="120px" prop="dispose_time" label="完成时间"></el-table-column>
          <el-table-column
            align="center"
            :filters="handlerList"
            :filter-method="eventTypeFilter"
            prop="dispose_name"
            label="处理人"
          ></el-table-column>
          <el-table-column align="center" prop="text" label="操作" width="260">
            <template  slot-scope="scope">
              <el-button plain size="small">报警推送</el-button>
              <el-button plain size="small" @click="viewIt(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-pagination">
          <el-pagination
            v-if="open"
            background
            :current-page="queryInfo.page"
            :page-size='queryInfo.number'
            layout="prev, pager, next"
            :total="listTotal"
            @current-change="currentPage"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- <event-detail :showInfo="showInfo" :content="content" :visible.sync="visible"></event-detail> -->
  </div>
</template>

<script>
import EventItem from "./components/EventItem";
import EventDetail from "@/components/EventDetail";

import imgUrl from "../../assets/common/event-table-bg.png";
import imgUrlLarge from "../../assets/common/table-bg-l.png";

import { loadList, loadEventList } from "@/api/incident/person";

export default {
  components: {
    EventItem,
    EventDetail
  },
  data() {
    return {
      open: false,
      eventResponse: [],
      eventList: [],
      queryInfo: {
        page: 1,
        number: 5
      },
      listTotal: 0,
      eventTypeList: [],
      apartmentList: [],
      handlerList: [],
      statusList: [],

      showInfo: {
        reason: "这是报警原因",
        date: "2020-01-21",
        location: "上海交大飞马旅2号楼上海交大飞马旅2号楼"
      },
      content: {
        title: "事件详情",
        radioList: [
          {
            label: "选项1",
            value: 1
          },
          {
            label: "选项2",
            value: 2
          }
        ]
      },
      visible: false
    };
  },
  created() {
    this.loadListData();
    this.loadEventListData();
  },
  computed: {
    listBg() {
      return this.open ? imgUrlLarge : imgUrl;
    }
  },
  watch:{
    open(newV){
      if(newV){        
        this.queryInfo.page = 1
        this.queryInfo.number=20
      }else{
        this.queryInfo.page = 1
        this.queryInfo.number=5
      }
    }
  },
  methods: {
    switchList() {
      if(this.open){
        delete this.queryInfo.eventList
      }
      this.open = !this.open;
      this.loadEventListData();
    },
    viewIt(id) {
      //  this.$notify({
      //   title: '成功',
      //   message: '这是一条成功的提示消息',
      //   type: 'success',
      //   offset: 100
      // });
     
      // this.visible = true
      this.$store.commit('event/VIEW_DETAIL',id)
    },
    currentPage(val) {
      this.queryInfo.page = val;
      this.loadEventListData()
    },
    loadListData() {
      loadList().then(res => {
        if (res.code === 2000) {
          this.eventResponse = res.data;
          this.eventResponse.forEach(element => {
            this.eventTypeList.push({
              value: element.name,
              text: element.name
            });
          });
        }
      });
    },
    loadEventListData() {
      loadEventList(this.queryInfo).then(res => {
        if (res.code === 2000) {
          this.eventList = res.data.data;
          this.listTotal = res.data.sum;
          this.eventList.forEach(item => {
            const tempList1 = this.apartmentList.map(item => item.value);
            if (tempList1.indexOf(item.building.code) === -1) {
              this.apartmentList.push({
                value: item.building.code,
                text: item.building.code
              });
            }

            const tempList2 = this.handlerList.map(item => item.value);
            if (tempList2.indexOf(item.dispose_name) === -1) {
              this.handlerList.push({
                value: item.dispose_name,
                text: item.dispose_name
              });
            }

            const tempList3 = this.statusList.map(item => item.value);
            if (tempList3.indexOf(item.eventstatus.name) === -1) {
              this.statusList.push({
                value: item.eventstatus.name,
                text: item.eventstatus.name
              });
            }
          });
        }
      });
    },
    eventTypeFilter(value, row, column) {
      const property = column["property"].split(".");
      if (property.length === 2) {
        const temp = row[property[0]];
        return temp[property[1]] === value;
      }
      return row[property] === value;
    },
    viewMore(id){
      this.open=true
      this.queryInfo.eventList=id
      this.loadEventListData()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
$imgUrl: "../../assets/";
.person-incident {
  position: relative;
  width: 100%;
  height: 100%;

  .incident-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    transition: all 1s ease-in;
    overflow: hidden;
    height: 69%;
    opacity: 1;

    $width: 23.6%;
    .item-style {
      width: $width;
      height: 46%;
      /* background: center / contain url($imgUrl+'common/item-bg.png') no-repeat; */
      /* padding: 43px 0; */
      font-size: 28px;
      margin-bottom: 20px;
    }

    &::after {
      content: "";
      display: block;
      width: $width;
    }
  }

  .table-container {
    width: 100%;
    position: relative;
    transition: all 0.4s ease-in;
    height: 33.2%;
    /* background: center / contain url($imgUrl+'common/event-table-bg.png') no-repeat; */

    .table-content {
      position: absolute;
      width: 100%;
      height: 99%;

      .table-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        & > span:nth-child(1) {
          font-size: 26px;
          color: white;
          font-weight: 400;
        }

        & > span:nth-child(2) {
          font-size: 22px;
          color: $navText;
          margin-top: 20px;
          cursor: pointer;

          &::after {
            content: "";
            display: inline-block;
            width: 24px;
            height: 18px;
            background: center / contain url($imgUrl+"common/up.png") no-repeat;
            margin: 0 80px 0 10px;
            vertical-align: text-bottom;
          }
        }
      }

      .bottom-pagination {
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
  }
}

.is-open {
  & > .incident-list {
    height: 0;
    opacity: 0;
  }

  & > .table-container {
    height: 101%;
  }

  .table-title {
    & > span:nth-child(2) {
      &::after {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
