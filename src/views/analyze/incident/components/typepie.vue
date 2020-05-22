<template>
  <TypePie :radius="['50%', '70%']" :legendPosition='[100,100]' :legendData="['人员事件','公共事件','设备事件']">
    <slot>
      <img class='pla' src="../../../../assets/analyze/piebg.png">
    </slot>
  </TypePie>
</template>

<script>
  import TypePie from "@/components/Charts/TypePie";

  export default {
    name: "typepie",
    components: {TypePie}
  }
</script>

<style scoped>

</style>
