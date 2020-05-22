<template>
  <div class="box">
    <div id="map"></div>
  </div>
  <!--
  <div class="mapWindow">
    <img class="mapImg" src="../../../../assets/home/mapWindowbg.png" alt="">
    <div class="map-window-san">
      <p class="map-title fontsize12px">事件名称</p>
      <div class="map-window-info">
        <div class="img">
          <img
            src="https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180906/3f1283a071f74468b56d384887fafae5.jpeg"
            alt="">
        </div>
        <div class="map-window-msg">
          <div class="map-window-time">
            <img class="time-img" src="../../../../assets/common/time.png" alt="">
            <p class="loca-info">2020/10/24 &nbsp; 15:03:00</p>
          </div>
          <div class="loca">
            <div class="loca-img">
              <img src="../../../../assets/common/location.png" alt="">
            </div>
            <p class="loca-info">这里是位置信息 内容过长分行</p>
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
  import mapicon1 from '@/assets/home/mapicon1.png'
  import mapicon2 from '@/assets/home/mapicon2.png'
  import mapicon3 from '@/assets/home/mapicon3.png'

  var marker, xu, setl, layer;
  export default {
    name: "Map",
    props: {
      width: {
        type: Number,
        default: 1200
      }
    },
    data() {
      return {
        mapicon1: mapicon1,
        lnglatList: [],
        rotation: -15,
        ro: null,
        walking: {},
        lnglat: [],
        showorhide: true,

      };
    },
    mounted() {
      this.initMapData();
    },
    watch: {
    },
    methods: {
      initMapData() {
        this.map = new AMap.Map('map', {
          resizeEnable: true,
          rotateEnable: true,
          pitchEnable: true,
          mapAnimateControl: true,
          zoom: 19,
          pitch: 65,
          autoRotation: true,
          // showLabel:false,
          rotation: -65,
          viewMode: '3D',//开启3D视图,默认为关闭
          buildingAnimation: true,//楼块出现是否带动画
          expandZoomRange: true,
          mapStyle: 'amap://styles/3181053d80d3ade7420bb387da0c8711',
          zooms: [3, 20],
          center: [121.38, 31.12]
        });
        let bounds = this.map.getBounds();
        let map = this.map;
        // map.setLimitBounds(bounds);
        map.plugin(["AMap.Walking"], () => {
          this.walking = new AMap.Walking({
            map: map,
            panel: "panel",
            hideMarkers: false,
            autoRotation: true,
            isOutline: true,
            outlineColor: '#ffeeee',
            autoFitView: true
          })
        })
        // 创建 AMap.LabelsLayer 图层
        layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 111,
          // 关闭标注避让，默认为开启，v1.4.15 新增属性
          animation: false,
          // 关闭标注淡入动画，默认为开启，v1.4.15 新增属性
          collision: false
        });
        map.on('click', (e) => {
          // alert('触发')
          console.log([e.lnglat.getLng(), e.lnglat.getLat()])
          this.lnglat.push([e.lnglat.getLng(), e.lnglat.getLat()])
        });


        //console.log(map)
      },
      createMaker(newValue) {
        let self = this;


        for (var i = 0, marker; i < newValue.length; i++) {

          marker = new AMap.Marker({
            position: newValue[i],
            clickable: true,
            // icon: startIcon,
            offset: new AMap.Pixel(-20, -130),
            anchor: 'top-left'
          });
          marker.setContent(cirConent)
          // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
          // marker.content = this.createInfoWindow()
          // console.log(this.createInfoWindow())
          marker.on('mouseover', self.markerMouserover);
          marker.on('click', self.closeInfo);
        }
        self.map.add(marker)

      },
      markerMouserover(e) {
        // infoWindow.setContent(e.target.content);
        infoWindow.open(this.map, e.target.getPosition());
      },
      closeInfo() {
        infoWindow.close();
      },
      rotate() {
        this.showorhide = !this.showorhide;
      },
      bigMap() {
        this.$emit('click')
      },
      setRotation() {
        this.ro = setTimeout(() => {
          // this.map.showLabel = false
          this.rotation += 0.08
          this.map.setRotation(this.rotation)
          this.setRotation()
        }, 50)
      },
      stopRo() {
        this.map.clearLimitBounds();
        clearTimeout(this.ro)
        // this.map.showLabel = true
      },
      //构建自定义信息窗体
    }
  }

  function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "mapWindow";

    info.style.width = '368px'
    info.style.height = '150px'

    let top = document.createElement("div");
    var titleD = document.createElement("div");
    titleD.innerHTML = title;
    titleD.className = "map-title fontsize12px";
    console.log(top)
    top.appendChild(titleD);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "map-window-san";
    middle.innerHTML = content;
    info.appendChild(middle);
    return info;
  }

</script>

<style scoped lang="scss">
  .box {
    height: 100%;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0px 0px 20px rgba(200, 200, 200, .2) inset, 0px 0px 10px rgba(200, 200, 200, .1);

  }

  #map {
    width: 100%;
    height: 100%;
    /*border-radius: 15px;*/
    position: relative;
    z-index: 7;
  }

  .operation {
    width: 58px;
    height: 202px;
    position: absolute;
    bottom: 36px;
    right: 33px;
    padding-top: 10px;
    background-color: rgba(5, 41, 72, 0.5);
    border: 2px solid rgba(0, 204, 255, 1);
    opacity: 1;
    border-radius: 29px;
    transition: all .5s linear;
    overflow: hidden;
    z-index: 13;

    .arrow {
      width: 38px;
      height: 38px;
      background: rgba(0, 204, 255, 1);
      border-radius: 50%;
      opacity: 1;
      color: #fff;
      position: absolute;
      bottom: 11px;
      right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(0deg);
    }

    div {
      transition: all .5s linear;
    }

    p {
      transition: all .1s linear;
    }
  }

  .retract {
    border: none;
    background-color: transparent;
  }

  .operation .icons_list_height p:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  .operation .arrow:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  .column {
    flex-direction: column;
  }

  .icons_list_height {
    height: calc(100% - 56px);
  }

  .pal-map {
    width: 100px;
    height: 618px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .map-incident-type {
    position: absolute;
    bottom: 26px;
    left: 20px;
    width: 251px;
    height: 146px;
    background: url("../../../../assets/home/map-bg.png")no-repeat;

    border-radius: 15px;
    z-index: 12;
    padding: 12px 30px 10px 0;
    p {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 22px;
        margin-right: 15px;
        box-sizing: border-box;
      }
    }
  }
</style>
<style lang="scss">
  .loca-map {
    width: 44px;
    height: 42px;
    text-align: center;
    /*background: pink;*/
    span {
      display: block;
      text-align: center;
      margin: 0 auto;
    }
  }

  .loca-map span:first-child {
    position: relative;
    top: 38px;
    height: 34px;
    width: 25px;
    z-index: 5;
    background: url("../../../../assets/home/mapicon1.png") no-repeat 100%;
  }

  .loca-map span:nth-child(2) {
    position: relative;
    z-index: 4;
    width: 18px;
    height: 6px;
    background: url("../../../../assets/home/cir2.png") no-repeat 100%;
    animation: scale .9s alternate infinite;
    animation-delay: .8s;
  }

  .loca-map span:last-child {
    position: relative;
    top: -44px;
    z-index: 3;
    width: 42px;
    height: 13px;
    background: url("../../../../assets/home/cir1.png") no-repeat;
    background-size: 100%;
    animation: scale 1s alternate infinite;
    animation-delay: .6s;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  @-webkit-keyframes scale {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  .mapImg {
    width: 347px;
    height: 150px;
  }

  .mapWindow {
    width: 347px !important;
    height: 150px !important;
    position: relative;
    padding-left: 26px;
    padding-top: 5px;
    /*background-image: url("");*/
    background: url("../../../../assets/home/mapWindowbg.png");

  }

  .map-title {
    font-size: 12px;
    color: #fff;
  }

  .map-window-san {
    /*width: 347px;*/
    /*height: 150px;*/
    /*padding-left: 26px;*/
    padding-top: 2px;
    color: #fff;

  }

  .map-window-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding-top: 17px;

    .img {
      width: 138px;
      height: 78px;

      img {
        width: 138px;
        height: 100%;
      }
    }
  }

  .map-window-time {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .time-img {
      width: 12px;
      height: 12px;
    }
  }

  .map-window-msg {
    width: 55%;
    padding-right: 14px;
  }

  .icon-style {
    width: 12px;
    height: 12px;
  }

  .loca {
    display: flex;
    /*align-items: center;*/
    justify-content: space-around;
    margin-top: 10px;
  }

  .loca-img {
    width: 10px;
    height: 14px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .loca-info {
    width: 135px;
  }
</style>
