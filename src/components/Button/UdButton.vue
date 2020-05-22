<template>
    <div>
      <button class="ud-button">{{text}}</button>
    </div>
</template>

<script>
    export default {
        name: "udbutton",
      props:{
        text:{
          type:String,
          default:'查看详情'
        }
      }
    }
</script>

<style scoped>

</style>
