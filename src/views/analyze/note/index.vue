<template>
  <div class="note-container">
    <div>
      <div>
        <img :src="imgS.noteOne" />
        <div>
          <div>
            <span>安全等级</span>
            <span :style="`color:${getColor(this.percentage)}`">优</span>
          </div>
          <div>
            <self-progress
              type="dashboard"
              :stroke-width="14"
              stroke-linecap="round"
              :percentage="percentage"
              label="安全评分"
              :width="134"
            ></self-progress>
          </div>
        </div>
      </div>
      <div>
        <img :src="imgS.noteOne" />
        <div>
          <div>
            <span>文明等级</span>
            <span :style="`color:${getColor(60)}`">差</span>
          </div>
          <div>
            <self-progress
              type="dashboard"
              :stroke-width="14"
              stroke-linecap="round"
              :percentage="60"
              label="文明评分"
              :width="134"
            ></self-progress>
          </div>
        </div>
      </div>
      <div>
        <img :src="imgS.noteOne" />
        <div>
          <div>
            <span>环境等级</span>
            <span :style="`color:${getColor(90)}`">良</span>
          </div>
          <div>
            <self-progress
              type="dashboard"
              :stroke-width="14"
              stroke-linecap="round"
              :percentage="90"
              label="环境评分"
              :width="134"
            ></self-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-one">
      <div>
        <img :src="imgS.indexBg" />
        <div>
          <div>巡更路线推荐</div>
          <div>
            <!-- 地图 -->
            <web-map></web-map>
          </div>
          <div>
            巡更路线及巡更点方案 为了维护广场的治安秩序，
            杜绝任何治安、消防事件的发生，在广场消防通道均安装有商管员定时定点巡逻，在室外、室内步行街、地下室、都需装备电子巡更系统。具体安排如下： 巡逻规定 1.目的 规范商管巡逻作业流程，保障购物广场安全，并提供检查依据 2.适用范围 全体商管员、车管员 3.区域划分 3.1内场：每层设3个巡视
          </div>
        </div>
      </div>
      <div>
        <img :src="imgS.rigthBg" />
        <div>
          <span>决策建议</span>
          <div>巡更路线及巡更点方案 为了维护广场的治安秩序，杜绝任何治安、消防事件的发生，在广场消防通道均安装有商管员定时定点巡逻，在室外、室内步行街、地下室、都需装备电子巡更系统。具体安排如下： 巡逻规定 1.目的 规范商管巡逻作业流程，保障购物广场安全，并提供检查依据 2.适用范围 全体商管员、车管员 3.区域划分 3.1内场：每层设3个巡视</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noteOne from "@/assets/analyze/note-one.png";
import rigthBg from "@/assets/analyze/right-bg.png";
import indexBg from "@/views/analyze/person/components/img/native_place.png";

import RateBar from "@/components/RateBar";
import webMap from "./components/Map";
import SelfProgress from "@/components/SelfProgress";

export default {
  components: {
    RateBar,
    webMap,
    SelfProgress
  },
  data() {
    return {
      imgS: {
        noteOne: noteOne,
        indexBg: indexBg,
        rigthBg: rigthBg
      },
      fontSize: 28,
      colorList: [
        ["rgba(38,203,169,1)", "rgba(38,203,169,0.3)"],
        ["rgba(255,170,35,1)", "rgba(255,170,35,0.3)"]
      ],
      percentage: 80
    };
  },
  computed: {},
  methods: {
    getColor(data) {
      let ret;
      switch (data / 10) {
        case 10:
        case 9:
          ret = "rgba(38, 203, 169, 1)";
          break;
        case 8:
        case 7:
          ret = "rgba(255, 170, 35, 1)";
          break;
        default:
          ret = "rgba(252, 79, 85, 1)";
          break;
      }
      return ret;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$imgUrl: "@/assets/";
.note-container {
  height: 100%;

  > div {
    display: flex;
    justify-content: space-between;

    color: $navText;
    font-size: 24px;
    font-weight: 400;
  }

  > div:nth-child(1) {
    height: 24%;

    > div {
      height: 100%;
      width: 32.4%;
      position: relative;

      > img {
        height: 100%;
        width: 100%;
      }

      > div {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        display: flex;
        padding: 30px 40px;

        & > div {
          height: 100%;
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          > span:nth-child(2) {
            color: #26cba9;
            font-size: 34px;
            font-weight: 400;
            margin-left: 20px;
          }
        }

        > div:nth-child(1) {
          padding: 10px;
          width: 50%;
        }
        > div:nth-child(2) {
          width: 134px;
          > span {
            font-size: 20px;
            color: $textWhite;
          }
        }
      }
    }
  }

  > div:nth-child(2) {
    height: 74%;
    margin-top: 2%;

    > div {
      height: 100%;
      position: relative;

      > img {
        height: 100%;
        width: 100%;
      }

      > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
      }
    }

    > div:nth-child(1) {
      width: 64%;
      > div {
        padding: 30px 20px;

        > div:nth-child(1) {
          text-align: center;
        }
        > div:nth-child(2) {
          height: 76%;
          margin-top: 4%;
        }

        > div:nth-child(3) {
          margin-top: 1%;
          height: 13.4%;
          font-size: 11px;
          color: $textWhite;
          padding: 12px 20px;
          box-shadow: 0px 0px 20px rgba(0, 204, 255, 0.5) inset;
          border-radius: 9px;
        }
      }
    }

    > div:nth-child(2) {
      width: 34%;

      > div {
        > span {
          margin-left: 14px;
        }

        > div {
          padding: 20px 30px;
          font-size: 13px;
          color: $textWhite;
          line-height: 28px;
        }
      }
    }
  }
}
</style>
