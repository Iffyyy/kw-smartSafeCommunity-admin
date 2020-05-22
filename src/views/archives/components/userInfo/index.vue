<template>
  <div class="box">
    <div v-show="type == 0">
      <EssentialInfo ref="essentialChild" :userId="userId" v-on:updateTypeShowHousing="updateTypeShowHousing"></EssentialInfo>
    </div>
    <div v-show="type == 1">
      <IncidentInfo ref="incidentChild" :userId="userId"></IncidentInfo>
    </div>
    <div v-show="type == 2">
      <AccessRecords ref="accessChild" :userId="userId"></AccessRecords>
    </div>
    <!--<div v-show="type == 3">
    <Relation ref="relationChild" :userId="userId"></Relation>
    </div>-->
    <div v-show="type == 4">
      <car ref="carChild" :userId="userId"></car>
    </div>
    <div v-show="type == 5">
      <Housing ref="housingChild" :showHouseId="showHouseId"  :userId="userId"></Housing>
    </div>
  </div>
</template>

<script>
import AccessRecords from "./AccessRecords";
import Car from "./car";
import EssentialInfo from "./EssentialInfo";
import Housing from "./Housing";
import IncidentInfo from "./IncidentInfo";

export default {
  name: "index",
  props: {},
  data() {
    return {
      show: false,
      showHouseId:0
    };
  },
  components: {
    AccessRecords,
    Car,
    EssentialInfo,
    Housing,
    IncidentInfo
  },
  mounted() {
    this.initial();
  },
  computed: {
    type() {
      return this.$store.state.archives.viewType;
    },
    userId() {
      return this.$store.state.archives.currentUser.id;
    }
  },
  watch: {
    type: {
      // immediate: true,
      handler: function(newV) {
        this.initial();
      }
    },
    userId(newV) {
      if (newV) {
        this.initial();
      }
    }
  },
  methods: {
    initial() {
      console.log(this.type)
      if (this.type === 3 ||this.type === 9) return;
      const options = [
        "essentialChild",
        "incidentChild",
        "accessChild",
        "relationChild",
        "carChild",
        "housingChild"
      ];
      this.$refs[options[this.type]].getInitialData();
    },
    updateTypeShowHousing(houseId){
      this.showHouseId = houseId
      this.$store.commit("archives/SET_VIEWTYPE", 5);
    },
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>
