<template>
  <div id="app">
    <router-view />
    
    <edit-password :visible.sync="visible"></edit-password>
  </div>
</template>

<script>
import EditPassword from './layout/components/Nav/EditPassword'
export default {
  name: 'App',
  components:{
    EditPassword
  },
  data(){
    return{
    }
  },
  computed:{
    visible(){
      return this.$store.state.editPwd
    }
  }
}
</script>
