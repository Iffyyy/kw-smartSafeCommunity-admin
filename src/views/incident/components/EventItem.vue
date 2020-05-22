<template>
  <div class="event-container">
    <img src="../../../assets/common/item-bg.png" style="position:absolute;width:100%;height:100%">
    <div class="event-item">
      <div>
        <span>{{event.name}}</span>
      </div>
      <div>        
        <!-- <svg-icon :iconClass="event.icon?event.icon:'bell'"></svg-icon>         -->
        <img :src="picList[event.id-1]"/>
        <span>{{event.event_info_count}}</span>
      </div>
      <div :class="event.scale.status?'rise':'down'" v-if="showRate">      
        <span>{{event.scale.percentage}}%</span>
        <svg-icon iconClass="rise" :className="event.scale.status?'rise-up':'decline'"></svg-icon>
      </div>
      <span @click="viewMore(event.id)">点击查看更多</span>
    </div>
  </div>
</template>

<script>
import pic1 from '@/assets/event/1.png'
import pic2 from '@/assets/event/2.png'
import pic3 from '@/assets/event/3.png'
import pic4 from '@/assets/event/4.png'
import pic5 from '@/assets/event/5.png'
import pic6 from '@/assets/event/6.png'
import pic7 from '@/assets/event/7.png'
import pic8 from '@/assets/event/8.png'
import pic9 from '@/assets/event/9.png'
import pic10 from '@/assets/event/10.png'
import pic11 from '@/assets/event/11.png'
import pic12 from '@/assets/event/12.png'
import pic13 from '@/assets/event/13.png'
import pic14 from '@/assets/event/14.png'
export default {
  name: 'EventItem',
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
      picList:[pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14]
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
.event-container{
  position: relative;
  &:hover{
    transform: scale(1.01);
  }
}

.event-item{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 9% 0;

  &>div:nth-child(1){
    color: white;
    font-size: 24px;
    font-weight: 400;
  }
  &>div:nth-child(2){
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;

    img{
      width: 64px;
      /* margin-right: ; */
    }

    &>span:nth-child(2){    
    font-family: "Dinpro";
    color: white;
    font-size: 60px;

    &::after{
      content: '件';
      margin: 0 0 0 10px;
      font-size: 14px;
    }
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
