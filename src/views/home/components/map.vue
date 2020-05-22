<template>
  <div class="box">
    <div id="map"></div>
    <div class="pal-map" ref="pal_map" :style="{'width': +width+'px'}">
      <img class="waring" v-show="flag" src="../../../assets/home/waring-bg.png" alt="">
      <div class="operation center_no_align_center" :style="{
      'height':showorhide?'225px':'55px',
      'border':showorhide?'2px solid rgba(0,204,255,1)':'2px solid rgba(0,204,255,0)',
      'background':showorhide?'rgba(5,41,72,0.5)':'transparent',
    }"
      >
        <div :style="{'opacity':showorhide?'1':'0'}" class="icons_list_height center column">
          <p>
            <svg-icon icon-class="magnifying" @click="setMapZoom(1)"></svg-icon>
          </p>
          <p>
            <svg-icon icon-class="shrink" @click="setMapZoom(-1)"></svg-icon>
          </p>
          <p>
            <svg-icon icon-class="hand" @click="setDragEnable()"></svg-icon>
          </p>
          <p>
            <svg-icon icon-class="big" @click="setCenter()"></svg-icon>
          </p>
        </div>

        <div class="arrow" @click="rotate" :style="{'transform':showorhide?'rotate(0deg)':'rotate(180deg)'}">
          <svg-icon icon-class="arrow"></svg-icon>
        </div>
      </div>
      <div class="map-incident-type bg shadow fontsize16">
        <p @click="get_dayEventList(item.id)" v-for="(item,index) in eventList">
          <img :src="item.img" alt="">
          {{item.name}}
        </p>
        <!--  <p @click="get_dayEventList(2)">
            <img src="../../../assets/home/mapicon2.png" alt="">
            公共事件
          </p>
          <p @click="get_dayEventList(3)">
            <img src="../../../assets/home/mapicon3.png" alt="">
            设备事件
          </p>-->
      </div>
    </div>
  </div>
</template>

<script>
  import mapicon1 from '@/assets/home/mapicon1.png'
  import mapicon2 from '@/assets/home/mapicon2.png'
  import mapicon3 from '@/assets/home/mapicon3.png'
  import {dayEventList} from '@/api/home'

  let infoWindow = null
  let mapZoom = 1

  var marker, xu, setl, layer;
  export default {
    name: "gaodemap",
    props: {
      width: {
        type: Number,
        default: 1200
      },
      newList: {
        type: Array,
        default: []
      },
      flag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        mapicon1: mapicon1,
        mapicon2: mapicon2,
        mapicon3: mapicon3,
        lnglatList: [],
        rotation: -65,
        viewMode: '3D',
        pitch: 65,
        ro: null,
        walking: {},
        lnglat: [[121.379885, 31.120238], [121.38005, 31.119819]],
        showorhide: true,
        MaxMin: false,
        index: 0,
      };
    },
    created() {
    },
    updated() {

    },
    computed: {
      eventList() {
        let data = this.$store.getters.eventList;
        for (let i = 0; i < data.length; i++) {
          let mapicon = 'mapicon' + (i + 1);
          data[i].img = this[mapicon]
        }
        console.log(data)
        // alert(this.$store.getters.eventList.length)
        if (data.length === 0) {
          return new Promise((resolve, reject) => {
            resolve(data)
          })
        }
        // console.log(this.$store.getters.eventList)
        return data
      }

    },
    mounted() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.rotation = 0
        this.pitch = 0
        this.viewMode = '2D'
      }
      this.initMapData();
      this.setWidth();
    },
    watch: {
      newList: {
        handler(odlValue, newValue1) {
          // alert(this.flag)
          if(this.flag == true){
            this.bigMap()
            setTimeout(() => {
              this.bigMap()
              this.$emit('changeFlag',false)
              // this.flag = false
            }, 4500)
          }
          let newValue = this.newList.map(item => {
            return [item.lon, item.lat]
          })
          this.createMaker(newValue, this.newList)

        },
        deep: true
      },
      /*
            newList: {
              handler(odlValue, newValue1) {
                this.flag = true
                setTimeout(() => {
                  this.flag = false
                }, 4500)
                let newValue = this.newList.map(item => {
                  return [item.lon, item.lat]
                })
                this.createMaker(newValue, this.newList)
                // this.createMaker()

              },
              deep: true
            },
      */
      width: {
        handler() {
          this.setWidth()
        },
        deep: true
      }
    },

    methods: {
      get_dayEventList(type) {
        dayEventList({type: type}).then(res => {
          this.$emit('changeFlag',false)
          console.log('^^^^^^^^^^^^^^')
          console.log(res)
          this.map.clearMap();
          this.$emit('newListChange', res.data)
        })
      },
      setWidth() {
        // if(this.$refs.pal_map.style){
        this.$refs.pal_map.style.width = this.width + 'px'
        // }
      },
      initMapData() {
        this.map = new AMap.Map('map', {
          resizeEnable: true,//是否监控地图容器尺寸变化，默认值为false
          rotateEnable: true,//地图是否可旋转，3D视图默认为true，2D视图默认false
          pitchEnable: true,
          mapAnimateControl: true,
          dragEnable: false,//地图是否可通过鼠标拖拽平移，默认为true
          zoomEnable: true, //地图是否可缩放，默认值为true
          zoom: 15,
          pitch: this.pitch,
          autoRotation: true,
          showLabel: true,
          features: ['bg', 'road', 'building', 'point'],//地图要素
          rotation: this.rotation,
          viewMode: '3D',//开启3D视图,默认为关闭
          buildingAnimation: true,//楼块出现是否带动画
          expandZoomRange: true,
          mapStyle: 'amap://styles/69a4a0969efe56169e9a41ec41d114b1',
          zooms: [15, 19],
          center: [121.38, 31.12]
        });
        let bounds = this.map.getBounds();
        let map = this.map;
        // map.setLimitBounds(bounds);
        // this.setRotation()
        /*
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
        */
        // 创建 AMap.LabelsLayer 图层
        layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 111,
          // 关闭标注避让，默认为开启，v1.4.15 新增属性
          animation: false,
          // 关闭标注淡入动画，默认为开启，v1.4.15 新增属性
          collision: false
        });
        this.mapAnimation()
        /*     map.on('click', (e) => {
               // alert('触发')
               console.log([e.lnglat.getLng(), e.lnglat.getLat()])
               // this.lnglat.push([e.lnglat.getLng(), e.lnglat.getLat()])
             });*/
        //console.log(map)
      },
      //地图动画
      mapAnimation() {
        let mapInim = setInterval(() => {
          mapZoom += 0.5
          if (mapZoom >= 18) {
            // this.setRotation()
            clearInterval(mapInim)
          }
          this.map.setZoom(mapZoom)
        }, 50)
      },
      //事件信息报警map
      latlngList() {

        this.newList.forEach(item => {

        })
      },
      setRotation() {
        this.ro = setTimeout(() => {
          // this.map.showLabel = false
          this.rotation += 0.06
          this.map.setRotation(this.rotation)
          this.setRotation()
        }, 50)
      },
      createMaker(newValue, data) {
        // let newValue = this.newList.map(item => {
        //   return [item.lon, item.lat]
        // })
        console.log('%%%%%%%%%%%%%%%%%%%%')
        console.log(newValue)
        let self = this;
        // console.log(self.newList)
        for (let i = 0, marker; i < newValue.length; i++) {
          // if (self.newList[i].event_type_id) {
          //
          //   self.newList[i].event_type_id = i + 1
          // }

          marker = new AMap.Marker({
            position: newValue[i],
            clickable: true,
            // icon: startIcon,
            offset: new AMap.Pixel(-20, -130),
            anchor: 'top-left'
          });
          // '      <span class="icon-map" style="background:url('+ mapicon +')">\n' +
          // '      <span class="icon-map' style="'background:url('+ mapiconself.newList[i].event_type_id + '.png">\n' +
          let img = this['mapicon' + data[i].event_type_id];

          let cirConent = '    <div class="loca-map">\n' +
            '       <span class="icon-map" style="background:url(' + img + ')">\n' +
            '      </span>\n' +
            '      <span>\n' +
            '      </span>\n' +
            '      <span>\n' +
            '      </span>\n' +
            '    </div>'
          console.log(cirConent)
          marker.setContent(cirConent)
          marker.setExtData(i)
          marker.on('mouseover', self.markerMouserover);
          marker.on('click', self.closeInfo);
          // console.log(marker)
          self.map.add(marker)
        }
        self.map.setCenter(newValue[0])
        // this.bigMap();
        setTimeout(() => {
          // this.map.clearMap()
          // this.bigMap();
        }, 8000)
      },
      markerMouserover(e) {
        let index = e.target.getExtData()
        let data = this.newList[index]
        let title = '<p class="map-title fontsize12px">' + data.event_list.name + '</p>'
        let content = '' +
          '<div class="map-window-info">\n' +
          '        <div class="img">\n' +
          '          <img\n' +
          '            src=' + data.pic_url +
          '            alt="">\n' +
          '        </div>\n' +
          '        <div class="map-window-msg">\n' +
          '          <div class="map-window-time">\n' +
          '            <img class="time-img" src="../../../assets/common/time.png" alt="">\n' +
          '            <p class="loca-info">' + data.happen + '</p>\n' +
          '          </div>\n' +
          '          <div class="loca">\n' +
          '            <div class="loca-img">\n' +
          '              <img src="../../../assets/common/location.png" alt="">\n' +
          '            </div>\n' +
          '            <p class="loca-info">这里是位置信息 内容过长分行</p>\n' +
          '          </div>\n' +
          '        </div>';

        infoWindow = new AMap.InfoWindow({
          isCustom: true,
          offset: new AMap.Pixel(184, 0),
          content: createInfoWindow(title, content)
        });
        infoWindow.open(this.map, e.target.getPosition());
      },
      closeInfo(e) {
        let index = e.target.getExtData()
        let id = this.newList[index].id
        this.$store.commit('event/VIEW_DETAIL', id)
        // infoWindow.close();
        this.map.setCenter(17, [e.lnglat.lat, e.lnglat.lng])
      },
      setCenter() {
        this.map.setCenter([121.38, 31.12])
      },
      rotate() {
        this.showorhide = !this.showorhide;
      },
      bigMap() {
        this.MaxMin = !this.MaxMin;
        this.$emit('click')
        this.setDragEnable('1')
      },
      stopRo() {
        this.map.clearLimitBounds();
        clearTimeout(this.ro)
        // this.map.showLabel = true
      },
      //构建自定义信息窗体
      setMapZoom(value) {
        // console.log(value)
        if (value > 0) {
          mapZoom++
        } else {
          mapZoom--
        }
        if (mapZoom >= 20) {
          mapZoom = 20
        }
        if (mapZoom <= 3) {
          mapZoom = 3
        }
        // console.log(mapZoom)
        this.map.setZoom(mapZoom)
        this.setDragEnable('1')
      },
      setDragEnable() {
        // alert(arguments.length)
        if (arguments.length > 0) {
          this.map.setStatus({
            dragEnable: false,
          })
          return

        }
        this.map.setStatus({
          dragEnable: true,
        })
      },
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
      width: 32px;
      height: 32px;
      background: rgba(0, 204, 255, 1);
      border-radius: 50%;
      opacity: 1;
      color: #fff;
      position: absolute;
      bottom: 11px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(0deg);

      .svg-icon {
        width: 22px;
        height: 22px;
      }
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

    .waring {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 12;
      animation: show .8s linear 16 alternate;
    }
  }

  .map-incident-type {
    position: absolute;
    bottom: 26px;
    left: 20px;
    width: 180px;
    height: 146px;
    background: url("../../../assets/home/map-bg.png") no-repeat;
    border-radius: 15px;
    z-index: 12;
    padding: 12px 30px 10px 0;

    p {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 20px;
        margin-right: 15px;
        box-sizing: border-box;
      }
    }

    p:hover {
      color: rgba(#fff, 0.5);
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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

  .loca-map .icon-map {
    position: relative;
    top: 38px;
    height: 34px;
    width: 25px;
    z-index: 13;
  }

  .in-type1 {
    background: url("../../../assets/home/mapicon1.png") no-repeat 100%;
  }

  .in-type2 {
    background: url("../../../assets/home/mapicon2.png") no-repeat 100%;
  }

  .in-type3 {
    background: url("../../../assets/home/mapicon3.png") no-repeat 100%;
  }

  .loca-map span:nth-child(2) {
    position: relative;
    z-index: 4;
    top: -20px;
    width: 18px;
    height: 6px;
    background: url("../../../assets/home/cir2.png") no-repeat 100%;
    animation: scale .9s alternate infinite;
    animation-delay: .8s;
  }

  .loca-map span:last-child {
    position: relative;
    top: -88px !important;
    z-index: 3;
    width: 42px;
    height: 13px;
    background: url("../../../assets/home/cir1.png") no-repeat;
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
    background: url("../../../assets/home/mapWindowbg.png");

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
    font-size: 12px;

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
    font-size: 12px;
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
