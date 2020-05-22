<template>
  <div class="incident-container">
    <img src="../../../assets/common/item-bg.png" style="position:absolute;width:100%;height:100%">
    <div class="incident-item">
      <div>
        <span>{{event.name}}</span>
        <svg-icon :iconClass="event.icon?event.icon:'bell'"></svg-icon>
      </div>
      <span>{{event.event_info_count}}</span>
      <div :class="event.scale.status?'rise':'down'" v-if="showRate">      
        <span>{{event.scale.percentage}}</span>
        <svg-icon iconClass="rise" :className="event.scale.status?'rise-up':'decline'"></svg-icon>
      </div>
      <span @click="viewMore(event.id)">点击查看更多</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncidentItem',
  props: {
    event:{
      type:Object,
      required:true
    },
    showRate:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
    }
  },
  computed:{
  },
  methods: {
    viewMore(id){
      this.$emit('view',id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
$imgUrl:'../../../assets/';
.incident-container{
  position: relative;
  &:hover{
    transform: scale(1.01);
  }
}

.incident-item{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 12% 0;

  &>div:nth-child(1){
    color: white;
    font-weight: 400;
  }
  &>span:nth-child(2){    
    font-family: "Dinpro";
    color: #04E5FF;
    font-size: 52px;

    &::after{
      content: '件';
      margin: 0 0 0 10px;
      font-size: 14px;
    }
  }

  &>div:nth-child(3){    
    font-family: "Dinpro";
    font-size: 26px;

    &::before{
      content: '昨日对比';
      margin-right: 10px;
      font-size: 16px;
      color: $textWhite;
      vertical-align: baseline;
    }

    .rise-up{
      width: 14px;
      height: 16px;
      vertical-align: baseline;
    }

    .decline{
      width: 14px;
      height: 16px;
      vertical-align: baseline;
      transform: rotate(180deg);
    }
  }
  
  div.rise{
    color: #FC4F55;
  }

  div.down{
    color:#26CBA9;
  }

  &>span:last-child{
    color: $navText;
    font-size: 16px;
    cursor: pointer;

    &:hover{
      color: #04E5FF;
    }
  }

}
</style>
