<template>
  <div class="relation-main">
    <div>
      <div
        class="boll"
        v-for="(item,index) in titleList"
        :key="item"
        @click.capture="handleClick(index)"
      >
        <img src="../../../../assets/common/boll.png" />
        <div>{{item}}</div>
      </div>
    </div>
    <div class="relation-container" id="inOut"></div>
    <div>
      <div
        class="boll"
        v-for="(item,index) in titleList1"
        :key="item"
        @click.capture="handleClick(index+3)"
      >
        <img src="../../../../assets/common/boll.png" />
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import resize from "@/components/Charts/mixins/resize";
import { netWorks } from "@/api/archives";
import user from "@/assets/common/user.png";
import boll from "@/assets/common/boll.png";
import line from "@/assets/common/line.png";

var lineImg = document.createElement("img");
lineImg.src = line;

export default {
  mixins: [resize],
  name: "Relation",
  props: {},
  data() {
    return {
      chart: null,
      titleList: ["基本信息", "事件信息", "出入信息"],
      titleList1: ["关系网络", "车辆信息", "房屋信息"],
      familyList: [],
      links: []
    };
  },
  mounted() {
    this.getNetWorks();
  },
  /*  methods: {
    handleClick(index) {
      if(index===3){
        this.$store.commit("archives/SET_LAYOUTFLAG", 2);
      }
      this.$store.commit('archives/SET_VIEWTYPE',index)
    },
    mounted() {
      this.getNetWorks();
    },
  }*/
  methods: {
    handleClick(index) {
      if (index === 3) {
        this.$store.commit("archives/SET_LAYOUTFLAG", 2);
      }
      this.$store.commit("archives/SET_VIEWTYPE", index);
    },
    initCharts() {
      this.chart = echarts.init(document.getElementById("inOut"));

      let option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 1000, //枝干线的长短
              edgeLength: 300
            },
            focusNodeAdjacency: true,
            roam: true,
            // label: {
            //   show: true
            // },
            draggable: true,
            symbol: "image://" + boll,
            symbolSize: "100",

            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 26
            },
            label: {
              show: true,
              position: "bottom",
              formatter: "{b}",
              fontSize: 16,
              color: "rgba(255,255,255,0.9)"
            },
            data: this.familyList,
            // links: [],
            links: this.links,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.4,
              color: "#00CCFF"
            }
          }
        ]
      };
      this.chart.setOption(option);
    },
    getNetWorks() {
      let data = {
        person_id: this.$store.state.archives.currentUser.id
      };
      let img = require("@/assets/common/user.png");
      netWorks(data).then(res => {
        // console.log('*************************')
        let data = res.data.family_info.map(item => {
          return {
            name: item.person_name,
            symbolSize: 80,
            symbol: img,
            link: "https://echarts.baidu.com/examples/#chart-type-bar"
          };
        });
        let personHouse = res.data.householder;
        data.unshift({
          name: personHouse.person_name,
          symbolSize: 130,
          symbol: img
        });
        this.familyList = data;
        this.links = data.map((item, index, arr) => {
          return { source: arr[0].name, target: item.name };
        });
        // console.log(data)
        this.pubdata(data);
      });
    },
    getImgData(imgSrc) {
      let fun = function(resolve) {
        const canvas = document.createElement("canvas");
        const contex = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "";

        img.onload = function() {
          //设置图形宽高比例
          let center = {
            x: img.width / 2,
            y: img.height / 2
          };
          var diameter = img.width; //半径
          canvas.width = diameter;
          canvas.height = diameter;
          contex.clearRect(0, 0, diameter, diameter);
          contex.save();
          contex.beginPath();
          let radius = img.width / 2;
          contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
          contex.clip(); //裁剪上面的圆形
          contex.drawImage(
            img,
            center.x - radius,
            center.y - radius,
            diameter,
            diameter,
            0,
            0,
            diameter,
            diameter
          ); // 在刚刚裁剪的园上画图
          contex.restore(); // 还原状态
          resolve(canvas.toDataURL("image/png", 1));
        };
        img.src = imgSrc;
      };

      let promise = new Promise(fun);

      return promise;
    },
    getImgData1(imgSrc) {
      let self = this;
      let fun = function(resolve) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = boll;
        img.onload = function() {
          //设置图形宽高比例
          let center = {
            x: img.width / 2,
            y: img.height / 2
          };
          // context.drawImage(img, 0, 0, center.x, center.y, 0, 0); // 在刚刚裁剪的园上画图
          const img2 = new Image();
          img2.crossOrigin = "Anonymous";
          img2.src = self.getImgData(imgSrc);
          img2.onload = function() {
            context.drawImage(img2, 175, 175, 225, 225);
            resolve(canvas.toDataURL("image/png", 1));
          };
        };
      };

      let promise = new Promise(fun);

      return promise;
    },
    pubdata(json) {
      var androidMap = json;

      var picList = []; //获取出全部图片
      for (var i = 0; i < androidMap.length; i++) {
        //把图片路径转成canvas
        let p = this.getImgData(androidMap[i].symbol);
        console.log(p);
        picList.push(p);
      }
      let self = this;
      Promise.all(picList).then(function(images) {
        //取出base64 图片 然后赋值到jsondata中
        for (var i = 0; i < images.length; i++) {
          var img = "image://" + images[i];
          // console.log(img);
          androidMap[i].symbol = img;
        }

        self.initCharts();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

$imgUrl: "../../../../assets/";

.relation-main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  overflow: hidden;
  font-size: 16px;

  .relation-container {
    /* position: absolute; */
    width: 64%;
    height: 100%;
  }

  > div:nth-child(2n-1) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0px;

    height: 100%;
    width: 18%;
    color: $navText;

    > div.boll {
      /* position: absolute; */
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      /* background: center / contain url($imgUrl+ "common/boll.png") no-repeat; */

      &:hover {
        > img {
          animation: rotateboll 6s infinite linear;
        }
      }

      > img {
        width: 150px;
        height: 150px;
      }

      > div {
        position: absolute;
        top: 10;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(4, 229, 255, 0) 0%,
          rgba(4, 229, 255, 0) 33%,
          rgba(4, 229, 255, 0.4) 60%,
          rgba(4, 229, 255, 0.6) 76%,
          rgba(4, 229, 255, 1) 100%
        );
        font-size: 26px;
        font-weight: 500;
        line-height: 36px;
        color: rgba(255, 255, 255, 1);
        padding: 24px;
        letter-spacing: 4px;
      }

      /* > img {
        width: 100%;
        height: 100%;
        position: absolute;
      } */
    }

    > div.active-one {
      background: center / contain url($imgUrl+"common/boll-a.png") no-repeat;
      color: $textWhite;
    }
  }
}
</style>
