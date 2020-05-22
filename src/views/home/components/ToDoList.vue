<template>
  <div class="to-do-list">
    <img class="pla" src="../../../assets/home/todobg.png" alt="/t">
    <div class="to-do-list-san">
      <p class="subtitle">{{title}} <span class="num">（{{total}}）</span></p>
      <div class="icon" v-if="title=='往日待办事件'">
        <p class="time-info">{{time}}</p>
        <el-date-picker v-show="showHide" @blur="showHide=false" value-format="yyyy-MM-dd" v-model="value1"
                        ref="seleDate" type="date"
                        class="transparency"></el-date-picker>
        <svg-icon icon-class="date" @click="clickDate"></svg-icon>
      </div>
      <div class="table">
        <el-table :data="list" height="100%" size="mini"  v-loading="loading" element-loading-background="rgba(0,0,0,0.45)">
          <el-table-column align="center" prop="place" label="位置" width="80px"></el-table-column>
          <el-table-column align="center" min-width="140px" prop="happen" label="时间">
            <template slot-scope="scope">
              <p class="description">{{scope.row.happen}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="description" label="内容">
            <template slot-scope="scope">
              <p class="description">{{scope.row.description}}</p>
            </template>

          </el-table-column>
          <el-table-column align="center" prop="person_name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="address" label="状态">
            <template slot-scope="scope">{{scope.row.event_status.name}}</template>
          </el-table-column>
          <el-table-column align="center" prop="text" label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" @click="$store.commit('event/VIEW_DETAIL',scope.row.id)">查看</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          small
          background
          @current-change="updatePage"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="detail">
      <event-detail :showInfo="showInfo" :content="content" :visible.sync="visible"></event-detail>
    </div>

  </div>
</template>

<script>
  import EventDetail from "@/components/EventDetail";

  export default {
    name: "ToDoList",
    components: {
      EventDetail
    },
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      total: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '待办事件'
      },
    },
    watch: {
      value1(newData, old) {
        this.time = newData.replace(/-/g, '/')
        this.time = this.time.slice(5)
        this.$emit('timeUpdate', newData)
        // console.log(this.time)
      }
    },
    data() {
      return {
        value1: '',
        showHide: false,
        showInfo: {
          reason: '这是报警原因',
          date: '2020-01-21',
          location: '上海交大飞马旅2号楼'
        },
        content: {
          title: '事件详情',
          radioList: [{
            label: '选项1',
            value: 1
          }, {
            label: '选项2',
            value: 2
          }]
        },
        visible: false,
        loading:false,
        time: this.getToday()
      }

    }
    ,
    methods: {
      getToday() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let _date = date.getDate() - 1
        if (month <= 9) {
          month = 0 + month.toString()
        }
        if (_date <= 9) {
          _date = 0 + _date.toString()
        }
        return month + '/' + _date;
      },
      loadingStatus(){
        this.loading = ! this.loading;
      },
      clickDate() {
        this.showHide = true;
        console.log(this.$refs.seleDate)
        this.$nextTick(() => {
          this.$refs.seleDate.focus()
        })
      },
      viewInfo() {
        this.visible = true
        console.log(this.visible)
      },
      updatePage(page) {
        if (this.title == '今日待办事件') {
          this.$emit('updatePageToDay', page)
        } else {
          this.$emit('updatePageBygoneDay', page)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/base.scss";

  .to-do-list {
    width: 100%;
    height: 299px;
    position: relative;
    z-index: 1000;
   /* .pla{
      transform: rotateY(180deg);
    }*/
  }

  .to-do-list-san {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .icon {
    position: absolute;
    right: 34px;
    width: 86px;
    /*width: 120px;*/
    top: 12px;
    cursor: pointer;
    transition: all .1s linear;
    color: #04E5FF;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time-info {
      color: #fff;
      font-family: "Dinpro";
    }
  }

  .icon:hover {
    color: #fff;
  }

  .pagination {
    padding: 8px 20px;
    text-align: center;
    position: relative;
  }

  .table {
    padding: 0 15px;
    overflow: hidden;
    height: 68%;
  }

  .num {
    color: #FF2C2C;
    font-weight: 800;
  }

  .nobg {
    background-color: transparent !important;
  }

  .transparency {
    position: absolute;
    top: 0;
    opacity: 0;
    overflow: hidden;
  }

  .detail {
    position: relative;
    z-index: 9999 !important;
  }

  .description {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<style lang="scss">
  .to-do-list {
    .el-picker-panel__body {
      width: 466px;
      height: 276px;
      overflow: hidden;
    }

    .el-date-picker {
      width: 466px;
      height: 276px;
      overflow: hidden;
    }

    .el-picker-panel {
      border: none;
      color: #fff;
      background: url('../../../assets/home/datebg.png') no-repeat;
    }

    .el-picker-panel__icon-btn {
      color: #fff;
    }

    .el-date-picker__header {
      width: 60%;
      margin-left: 48px;
      margin-bottom: 0;
    }

    .el-date-picker .el-picker-panel__content {
      width: 86%;
      height: 76%;
      margin-left: 30px;
      margin-top: 5px;
      overflow: hidden;
    }

    .el-date-table tbody > :first-child > ::after {
      content: "";
      display: block;
      width: 482px;
      height: 2px;
      background: radial-gradient(circle, rgba(4, 229, 255, 1) 0%, rgba(4, 229, 255, 0) 100%);
      opacity: 1;
    }

    .el-date-table td, .el-date-table td div {
      height: 20px;
    }

    .el-date-table {
      height: calc(100% - 60px);
      padding-bottom: 15px;
    }

    .el-date-table th {
      color: #fff;
      border-bottom: none;
    }

    .el-date-picker__header-label {
      color: #fff;
    }

    .el-date-table td.next-month, .el-date-table td.prev-month {
      color: rgba(255, 255, 255, .4);
    }

    .el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left {
      opacity: 0;
    }

    .el-table th > .cell {
      font-size: 18px !important;
      font-weight: 400 !important;
    }

    .el-table .cell {
      font-size: 16px !important;
      font-weight: 400 !important;
    }
  }

  .to-do-list {
    .el-pagination .btn-prev, .el-pagination .number, .el-pagination .btn-next{
      width: 24px;
      height: 23px;
    }
    .el-pagination .btn-prev .el-icon, .el-pagination .number .el-icon, .el-pagination .btn-next .el-icon{
      font-size: 14px;
    }
  }
  .to-do-list{
    .el-table__body-wrapper::-webkit-scrollbar{
      /*width: 0;宽度为0隐藏*/
      width: 2px;
    }
    .el-table{
      position: absolute;  max-width: none;
      overflow-x: hidden;
      /*position: relative; overflow: auto;*/
    }
    .table {
      width: 100%;
      padding: 0 5px;
      position: relative;
      //overflow-x: hidden;
    }
  }
</style>
