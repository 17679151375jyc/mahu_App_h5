<!--@Time  : 2019/09/28 15:37-->
<!--@Author: michael huang-->
<!--@File  : gate-alert-btn-sos.vue-->

<template>
  <div class="gate-alert-btn-sos"
       :class="['base-vertical-layout-center-item-center']"
       style="background: white"
       :style="sosStyle"
       @click="sosOnClick"
       @touchstart="sosTouch"
       @touchend="sosTouchEnd">
    <img :src="require('./icon-sos.png')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-blue" style="color: #FD484D">SOS</p>
  </div>
</template>

<script>
  export default {
    name: "gate-alert-btn-sos",
    props: {
      machineInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        sosStyle: {},
      }
    },
    created() {
    },
    methods: {
      sosOnClick() {
        this.$emit('sosOnClick', {account: this.machineInfo.account, installCode: this.machineInfo.installCode});
      },
      sosTouch() {
        this.sosStyle = {background: "linear-gradient(to bottom, #FFF, #CCC)"};
      },
      sosTouchEnd() {
        // this.alarmStayStyle = {background: "linear-gradient(to bottom, #CCC, #FFF)"};
        this.sosStyle = {background: "white"};
      },
    }
  }
</script>

<style scoped>
  .gate-alert-btn-sos {
    width: 22.1333vw;
    height: 14.4vw;
    background: linear-gradient(to bottom, #3388FF, #30C9FF);
    border-radius: 1.0666vw;
  }
</style>