<template>
  <!--	<event-detail v-model="visible" :content="content" :showInfo="showInfo"></event-detail>-->
  <div class="report-person">
    <div class="report-info shadow bg">
      <el-form :model="reportInfo" class="center_no_align_center">
        <div class="building">
          <BuildingSelect :reportInfo="reportInfo"></BuildingSelect>
        </div>
        <div class="center">
          <el-form-item>
            <el-input size="mini" class="padd-bo" v-model="reportInfo.phone" placeholder="请输入手机号">
              <template slot="prefix">
                <p class="cal"><img style="width:20px" src="../../assets/report/phone.png" alt=""></p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="mini" class="padd-bo room" v-model="reportInfo.name" placeholder="请输入姓名">
              <template slot="prefix">
                <p class="cal"><img src="../../assets/report/person.png" alt=""></p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input size="mini" class="padd-bo" v-model="reportInfo.cal" placeholder="请输入卡号">
              <template slot="prefix">
                <p class="cal"><img src="../../assets/report/cal.png" alt=""></p>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="padd-bo">
            <el-date-picker
              v-model="reportInfo.datetime"
              type="daterange"
              range-separator="—"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>

      </el-form>
      <div class="triangle"></div>
    </div>
    <div class="report report1 shadow">
      <div>
        <div class="basic-title paddingLeft30 infoColor fontsize22">
          <div class="basic-title-san nobg">
            <span>
              基本事件
            </span>
            <span class="infoColor fontsize20 export-report">
            <span>“ <img src="../../assets/report/tick.png" alt=""> ”</span>勾选需要导出的信息
          </span>
          </div>
          <p>
            <el-checkbox class="large" :isIndeterminate="isIndeterminate2" v-model="basicAll2"
                         @change="e => checkAllBasic(e,2)">全选
            </el-checkbox>
          </p>
        </div>
        <div class="basic-content">
          <el-checkbox-group v-model="basicEd2" @change="e => handleCheckedBasic(e,2)">
            <el-checkbox v-for="item in basicList2" :label="item.id" :key="item.id" :value="item.event_type_id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <div class="basic-title paddingLeft30 infoColor fontsize22">
          <p class="basic-title-san nobg">设备事件</p>
          <p>
            <el-checkbox class="large" :isIndeterminate="isIndeterminate3" v-model="basicAll3"
                         @change="e => checkAllBasic(e,3)">全选
            </el-checkbox>
          </p>
        </div>
        <div class="basic-content">
          <el-checkbox-group v-model="basicEd3" @change="e => handleCheckedBasic(e,3)">
            <el-checkbox v-for="item in basicList3" :label="item.id" :key="item.id" :value="item.event_type_id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <div class="basic-title paddingLeft30 infoColor fontsize22">
          <p class="basic-title-san nobg">居民事件</p>
          <p>
            <el-checkbox class="large" :isIndeterminate="isIndeterminate1" v-model="basicAll1"
                         @change="e => checkAllBasic(e,1)">全选
            </el-checkbox>
          </p>
        </div>
        <div class="basic-content">
          <el-checkbox-group v-model="basicEd1" @change="e => handleCheckedBasic(e,1)">
            <el-checkbox v-for="item in basicList1" :label="item.id" :key="item.id" :value="item.event_type_id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="report-btn infoColor fontsize22" @click="exportInfo">
        <img class="export" src="../../assets/report/export.png" alt="">
        导出
      </div>
    </div>
  </div>
</template>

<script>
  // import EventDetail form "@/components/EventDetail";
  import {getFormEventField} from '@/api/report'
  import {getToken} from '@/utils/auth'
  import BuildingSelect from '@/components/BuildingSelect'

  export default {
    name: "person",
    components: {
      BuildingSelect
    },
    data() {
      let _minTime = null
      let _maxTime = null
      return {
        visible: false,
        reportInfo: {
          datetime: []
        },
        basicAll1: false,
        basicAll2: false,
        basicAll3: false,
        basicEd1: [],
        basicEd2: [],
        basicEd3: [],
        basicList1: [],
        basicList2: [],
        basicList3: [],
        isIndeterminate1: false,
        isIndeterminate2: false,
        isIndeterminate3: false,
        typeId1: 0,
        typeId2: 0,
        typeId3: 0,
        pickerOptions: {
          onPick(time) {
            // 如果选择了只选择了一个时间
            if (!time.maxDate) {
              let timeRange = 6 * 24 * 60 * 60 * 1000 // 6天
              _minTime = time.minDate.getTime() - timeRange // 最小时间
              _maxTime = time.minDate.getTime() + timeRange // 最大时间
              // alert(_maxTime > Date.now())
              if (_maxTime > Date.now()) {
                _maxTime = Date.now() // 最大时间
              }//如果选了两个时间，那就清空本次范围判断数据，以备重选

            } else {
              _minTime = _maxTime = null
            }
          },
          disabledDate(time) {
            // onPick后触发
            // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
            if (_minTime && _maxTime) {
              return time.getTime() < _minTime || time.getTime() > _maxTime
            }
            return time.getTime() > Date.now()
          }
        },
      }
    },
    created() {
      this.get_FormEventField()
      // this.get_VillageGetBuilding()
    },
    methods: {
      get_FormEventField() {
        let token = getToken()
        getFormEventField(token).then(res => {
          // //console.log(res)
          let data = res.data
          for (let i in data) {
            switch (data[i].id) {
              case 1:
                this.basicList1 = data[i].event_list
                this.typeId1 = 1
                break;
              case 2:
                this.basicList2 = data[i].event_list
                this.typeId2 = 2
                break;
              case 3:
                this.basicList3 = data[i].event_list
                this.typeId3 = 3
            }
          }
          //console.log(this.basicList1)
          //console.log(this.basicList2)
          //console.log(this.basicList3)
        })
      },
      checkAllBasic(value, index) {
        let basicList = 'basicList' + index
        let basicEd = 'basicEd' + index
        let isIndeterminate = 'isIndeterminate' + index
        let data = this[basicList].map(item => {
          return item.id
        })
        this[basicEd] = value ? data : [];

        this[isIndeterminate] = false;
      },
      handleCheckedBasic(value, index) {
        let basicList = 'basicList' + index
        let basicAll = 'basicAll' + index
        let isIndeterminate = 'isIndeterminate' + index
        let checkedCount = value.length;
        this[basicAll] = checkedCount === this[basicList].length;
        this[isIndeterminate] = checkedCount > 0 && checkedCount < this[basicList].length;
      },
      //导出用户信息
      exportInfo() {
        let basicEd1 = JSON.parse(JSON.stringify(this.basicEd1));
        let basicEd2 = JSON.parse(JSON.stringify(this.basicEd2));
        let basicEd3 = JSON.parse(JSON.stringify(this.basicEd3));
        /*let arrList = [basicEd1, basicEd2, basicEd3]
        for (let i = 0; i < arrList.length; i++) {
          let typeId = 'typeId' + (i + 1)
          if (arrList[i].length > 0) {
            arrList[i].push(this[typeId])
          }
        }*/
        let arr = []
        let eventList;
        eventList = arr.concat(basicEd1, basicEd2, basicEd3)
        if (!eventList.length) {
          this.$message({
            message: '请选择需要导出的字段',
            type: 'warning'
          })
          return
        }
        let data = JSON.parse(JSON.stringify(this.reportInfo))
        if (data.datetime.length) {
          data.datetime = JSON.stringify(data.datetime)
        }
        data.eventList = JSON.stringify(eventList)
        let url = this.setUrlQuery({query: data, url: process.env.VUE_APP_BASE_API + '/api/formEventDownload'})
        // let url = process.env.VUE_APP_BASE_API + '/api/formEventDownload' + data_params;
        // console.log(url)
        window.open(url)
        // this.downLoadByUrl(url)
      },

      downLoadByUrl(url) {
        let xhr = new XMLHttpRequest();
        //GET请求,请求路径url,async(是否异步)
        xhr.open('GET', url, true);
        //设置请求头参数的方式,如果没有可忽略此行代码
        xhr.setRequestHeader("token", getToken());
        //设置响应类型为 blob
        xhr.responseType = 'blob';
        //关键部分
        xhr.onload = function (e) {
          //如果请求执行成功
          if (this.status == 200) {
            let blob = this.response;
            let filename = "我是文件名.xxx";//如123.xls
            let a = document.createElement('a');

            blob.type = "application/octet-stream";
            //创键临时url对象
            let url = URL.createObjectURL(blob);

            a.href = url;
            a.download = filename;
            a.click();
            //释放之前创建的URL对象
            window.URL.revokeObjectURL(url);
          }
        };
        //发送请求
        xhr.send();
      },
      setUrlQuery(options) {
        let {url, query} = options;
        if (!url) return '';
        if (query) {
          let queryArr = [];
          for (const key in query) {
            if (query.hasOwnProperty(key)) {
              queryArr.push(`${key}=${query[key]}`)
            }
          }
          if (url.indexOf('?') !== -1) {
            url = `${url}&${queryArr.join('&')}`
          } else {
            url = `${url}?${queryArr.join('&')}`
          }
        }
        return url;
      }
    }
  };
</script>

<style scoped lang="scss">
  .report-basic {
    height: 100%;
  }

  .report-info {
    position: relative;
    width: 100%;
    height: 15%;
    padding: 40px 0 10px 0;

    .center {
      flex: 3;
    }

    .building {
      flex: 2;
    }

    .padd-bo {
      margin-left: 10px;
    }
  }

  .triangle {
    width: 0;
    height: 0;
    bottom: 0;
    right: 0;
    border-bottom: 30px solid #072141;
    border-left: 30px solid transparent;
    position: absolute;
    /*box-shadow:rgb(11, 234, 235) 0px 0px 10px;*/
  }

  .cal {
    width: 28px;
    margin: 0 10px;
  }

  .export-report {
    /*line-height: 64px;*/
    text-align: right;
    margin-left: 40px;

    span {
      img {
        width: 20px;
      }

      margin-right: 10px;
    }
  }

  .basic {
    min-height: 200px;

  }

  .basic-title {
    height: 69px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 51px;
    padding-left: 36px;
    margin-top: 26px;

    .basic-title-san {
      width: 496px;
      height: 64px;
      background-size: 100%;
      line-height: 44px;
      font-weight: 400;
      font-size: 28px;
      margin-bottom: 42px;
    }

    .large {
      position: relative;
      top: -15px;
      padding-top: 0;
      right: -113px;
    }
  }

  .paddingLeft30 {
    padding-left: 30px;
  }

  .nobg {
    background: transparent !important;
  }

  .basic-content {
    padding: 0 0 30px 50px;
  }

  .report {
    position: relative;
    height: 76%;
    /*margin-top: 25px;*/
    padding-top: 27px;
    margin-top: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    /*padding-left: 36px;*/
  }

  .report-btn {
    width: 382px;
    height: 100px;
    position: absolute;
    bottom: 0px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 59px;
    text-align: center;
    line-height: 64px;
    /*border-right: 50px solid transparent;*/
    background: url("../../assets/report/btn.png") no-repeat;
    background-size: 100%;
    z-index: 10;
    transition: all .1s linear;
    letter-spacing: 3px;

    .export {
      width: 30px;
      margin-right: 7px;
    }
  }

  .report-btn:hover {
    transform: scale(1.05);
  }

</style>
<style lang="scss">
  .report-person {
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
      max-width: 250px;
    }
  }

  .report-basic .el-input__suffix {
    margin-top: 8px !important;
  }

  .report .el-checkbox {
    width: 170px !important;
  }

  .report-person {
    .report1 {
      .el-checkbox {
        width: 226px !important;
        margin-bottom: 42px;
      }

      .el-checkbox__label {
        font-size: 22px !important;
      }

      .el-checkbox__inner {
        width: 23px;
        height: 23px;
        /*border: 2px solid #fff;*/
      }

      .large .el-checkbox__inner {
        width: 26px !important;
        height: 26px !important;
      }

      .el-checkbox__label {
        font-size: 26px;
        display: inline-block;
        position: relative;
        top: 3px;
      }
    }

  }
</style>

