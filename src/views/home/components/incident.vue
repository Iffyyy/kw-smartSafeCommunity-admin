<template>
  <div class="incident">
    <p class="subtitle text-center">最新事件</p>
    <div class="incident-list">
      <div class="incident-list-scroll" ref="roll" @mouseenter="cleatTimer"
           @mouseleave="start">
        <!--   @mouseenter="cleatTimer"
            @mouseleave="start" -->

        <div class="list" v-for="item in newList">
          <div class="incident-img">
            <img class="img" :src="item.pic_url" alt="">
            <div class="msg">
              <div class="mark">
                <div class="warning">
                  <img src="../../../assets/home/warning.png" alt="警告">
                </div>
                <div class="warning-msg">
                  <div>
                    <p class="warning-type fontsize12">{{item.event_list.name}}</p>
                    <p class="warning-time fontsize10">{{item.happen}}</p>
                  </div>
                  <div class="warning-status fontsize14 error" v-if="item.event_status.name == '未处理'">{{item.event_status.name}}</div>
                  <div class="warning-status fontsize14 success" v-else="item.event_status.name == '已处理'">{{item.event_status.name}}</div>
                </div>
              </div>
              <div class="location fontsize14 fontInfoColor">
                <p>
                  <span class="el-icon-location fontsize16 fontInfoColor"></span>这里是位置信息1
                </p>
                <div>
                  <el-button plain size="mini" @click="$store.commit('event/VIEW_DETAIL', item.id)">查看详情</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="pla" src="../../../assets/home/incidentbg.png" alt="/t">
  </div>
</template>

<script>
  let timer;
  var speed = 40;
  var delay = 40;
  var height = 268;
  var time;
  var area;
  export default {
    name: "incident",
    props: {
      newList: {
        type: Array,
        defalut: []
      }
    },
    data() {
      return {
        src: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180906/3f1283a071f74468b56d384887fafae5.jpeg',
        num: false,
        height: 268,
        status: true,
      }
    },

    created: function () {
      // this.scroll(10000)
      this.cleatTimer()
    },
    mounted() {

      // area.innerHTML += area.innerHTML;
      // window.addEventListener('scroll', this.scroll)
      area = this.$refs.roll
      area.innerHTML += area.innerHTML;
      // console.log(area.scrollTop)
      setTimeout(this.start, delay);
    },
    methods: {
      /*     scroll(time) {
             let _this = this
             // alert(2)

               // this.$refs.notran.style.transitionPlayState = "running";
               // this.$refs.notran.style.transitionPlayState  = "running";
             timer = setInterval(function () {
               if (_this.num !== 4) {
                 _this.num++
               } else {
                 _this.num = 0
                 clearInterval(timer)
                 _this.scroll(50)
                 // setTimeout(()=>{
                 //   _this.num +=1
                 // },0)
               }
             }, time)
           },
           cleatTimer() {
             // alert(1)
             this.$refs.notran.style.transitionPlayState = "paused";
             this.$refs.notran.style.transitionPlayState  = "paused";
             // this.$refs.notran.classList.add('rollScreen_list_unanim')
             clearInterval(timer)
           },*/

      scroll() {
        if (area.scrollTop % height == 0) {
          clearInterval(timer);
          setTimeout(this.start, delay);
        } else {
          area.scrollTop++;
          if (area.scrollTop >= area.scrollHeight / 2) {
            area.scrollTop = 0;
          }
        }
      },
      cleatTimer() {
        this.num = false
        clearInterval(timer)
      },
      start() {
        if (this.num) {
          return
        }
        this.cleatTimer()
        timer = setInterval(this.scroll, speed);
        area.scrollTop++;
      }
    },
    beforeDestroy() {
      this.cleatTimer()
    },
  }
</script>

<style scoped lang="scss">
  .incident {
    height: 618px;
    overflow: hidden;
    padding: 0 30px 0 18px;
    box-sizing: border-box;
    position: relative;
    z-index: 7;
    .text-center{
      margin-top: 10px;
    }
  }

  .incident-list {
    height: calc(100% - 60px);
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-bottom: 5px;
    position: relative;
    z-index: 2;
  }

  .title {
    color: #fff;
    font-weight: 400;
    line-height: 16px;
    font-family: PingFang SC;
  }

  .list {
    margin-top: 18px;
    height: 221px;
    overflow: hidden;
    /*margin-bottom: 26px;*/
    box-sizing: border-box;
    position: relative;

    .incident-img {
      width: 97%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;

      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 97%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        border: 2px solid rgba(5, 41, 72, 1);
      }
    }

    .msg {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
    }


    .location {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px 14px 12px;

      p {
        span {
          padding-right: 8px;
        }
      }
    }

  }

  .incident-list-scroll {
    /*padding-bottom: 5px;*/
    width: calc(100% - (-17px));
    height: 100%;
    /*transition: 10s linear;*/
    /*overflow-y: hidden;*/
    overflow-X: hidden;
  }

  .rollScreen_list_unanim {
    transition: none
  }

  .mark {
    width: 100%;
    height: 68px;
    background: -moz-linear-gradient(top, rgba(29, 29, 29, 1) 10%, rgba(0, 0, 0, 0) 100%);
    background: linear-gradient(top, rgba(29, 29, 29, 1) 10%, rgba(0, 0, 0, 0) 100%);
    background: -webkit-linear-gradient(top, rgba(29, 29, 29, 1) 10%, rgba(0, 0, 0, 0) 100%);
    background: -ms-linear-gradient(top, rgba(29, 29, 29, 1) 10%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .warning {
    width: 32px;
    height: 29px;
    margin-right: 10px;
    margin-left: 10px;

    img {
      height: 100%;
    }
  }

  .warning-msg {
    width: calc(100% - 32px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 18px;

    .warning-type {
      color: #fff;
    }

    .warning-time {
      color: #888;
    }

  }

</style>
