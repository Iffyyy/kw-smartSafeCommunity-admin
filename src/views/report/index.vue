<template>
  <!--	<event-detail v-model="visible" :content="content" :showInfo="showInfo"></event-detail>-->
  <div class="report-basic">
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
            <el-input size="mini" class="padd-bo" v-model="reportInfo.name" placeholder="请输入姓名">
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
        </div>

      </el-form>
      <div class="triangle"></div>
    </div>

    <div class="report report1 shadow">
      <div style="height: 100%">
        <div class="basic-title center infoColor fontsize24">
          <div class="basic-title-san nobg">
            <span>
              基本事件
            </span>
            <span class="infoColor fontsize20 export-report">
            <span>“ <img src="../../assets/report/tick.png" alt=""> ”</span>勾选需要导出的信息
          </span>
          </div>
          <p>
            <el-checkbox class="large" :isIndeterminate="isIndeterminate" v-model="basicAll" @change="checkAllBasic">
              全选
            </el-checkbox>
          </p>
        </div>
        <div class="basic-content">
          <el-checkbox-group v-model="basic" @change="handleCheckedBasic">
            <el-checkbox v-for="item in personList" :label="item.value" :key="item.value" :value="item.name">
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
  import {getFormPersonField} from '@/api/report'
  import {getToken} from '@/utils/auth'
  import BuildingSelect from '@/components/BuildingSelect'

  export default {
    name: "report",
    components: {
      BuildingSelect
    },
    data() {
      return {
        visible: false,
        token: getToken(),
        reportInfo: {},
        basic: [],//checkout选中的值
        isIndeterminate: true,
        basicAll: false,
        personList: []//checkout数组
      }
    },
    created() {
      this.get_FormPersonField()
    },
    methods: {
      //单元楼号信息
      budlingChange(data) {
        this.reportInfo.building = data.building
        this.reportInfo.unit = data.unit
        this.reportInfo.house = data.house
      },
      get_FormPersonField() {
        let token = getToken()
        getFormPersonField(token).then(res => {
          // console.log(res)
          let personList = []
          for (let i in res.data) {
            personList.push({value: i, name: res.data[i]})
          }
          this.personList = personList
        })
      },
      checkAllBasic(value) {
        let dataList = this.personList.map(item => {
          return item.value
        })
        // console.log(dataList)
        // console.log(value)
        this.basic = value ? dataList : [];
        this.isIndeterminate = false;
      },
      handleCheckedBasic(value) {
        let checkedCount = value.length;
        this.basicAll = checkedCount === this.personList.length;
        // console.log(value)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.personList.length;
      },
      //导出用户信息
      exportInfo() {
        if (!this.basic.length) {
          this.$message({
            message: '请选择需要导出的字段',
            type: 'warning'
          })
          return
        }
        let data = this.reportInfo
        data.personField = JSON.stringify(this.basic)
        data.token = getToken()
        // let data_params = params(data)
        // let url = process.env.VUE_APP_BASE_API + '/api/formPersonDownload' + data_params
        let url = this.setUrlQuery({query: data, url: process.env.VUE_APP_BASE_API + '/api/formPersonDownload'})
        // this.downLoadByUrl(url)
        // console.log(url)
        window.open(url)
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

            blob.type = "application/excel";
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
  }
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
      flex: 3;
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
    height: calc(100% - 190px);
    overflow-y: auto;
    padding: 0 0 30px 50px;
  }

  .report {
    position: relative;
    height: 76%;
    /*margin-top: 25px;*/
    padding-top: 27px;
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
    margin-top: 20px;
    overflow: hidden;
    /*padding-left: 36px;*/
  }

  .report-btn {
    width: 378px;
    height: 100px;
    position: absolute;
    /*<!--bottom: -20px;-->*/
    bottom: 0;
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
  .report-basic .el-input__suffix {
    margin-top: 8px !important;
  }

  .report-basic {
    .report1 {
      .el-checkbox {
        width: 226px !important;
        margin-bottom: 42px;
      }

      .el-checkbox__label {
        font-size: 22px!important;
      }

      .el-checkbox__inner {
        width: 23px;
        height: 23px;
        /*border: 2px solid #fff;*/
      }
      .large .el-checkbox__inner{
        width: 26px!important;
        height: 26px!important;
      }
      .el-checkbox__label{
        font-size: 26px;
        display: inline-block;
        position: relative;
        top: 3px;
      }
    }

  }
</style>

