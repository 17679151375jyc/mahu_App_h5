<!--@Time  : 2019/09/28 15:15-->
<!--@Author: michael huang-->
<!--@File  : gate-alert-btn-all.vue-->

<template>
  <div class="gate-alert-btn-all"
       :class="['base-vertical-layout-center-item-center']"
       :style="alarmStyle"
       @click="alarmAllOnClick"
       @touchstart="alarmAllTouch"
       @touchend="alarmAllTouchEnd">
    <img :src="buttonAlarmAlarmIcon()" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <!--<p class="base-text-details-large-white">{{buttonAlarmAlarmText('撤防')}}</p>-->
    <p class="base-text-details-large-blue">{{buttonAlarmAlarmText()}}</p>
  </div>
</template>

<script>
  export default {
    name: "gate-alert-btn-all",
    props: {},
    data() {
      return {
        alarmStyle: {},
      }
    },
    created() {
    },
    methods: {
      buttonAlarmAlarmIcon() {
        return require("./icon_alarm-alarm-all-able.png")
      },
      // buttonAlarmAlarmText(status) {
      //   return status==="撤防" ? "一键布防": "一键撤防";
      // },
      buttonAlarmAlarmText() {
        return "一键布防";
      },
      alarmAllOnClick() {
        this.$emit('alarmAllOnClick', {name: this.buttonAlarmAlarmText()});
      },
      alarmAllTouch() {
        this.alarmStyle = {background: "linear-gradient(to bottom, #FFF, #CCC)"};
      },
      alarmAllTouchEnd() {
        this.alarmStyle = {background: "white"};
      }
    }
  }
</script>

<style scoped>
  .gate-alert-btn-all {
    width: 46.6666vw;
    height: 14.4vw;
    background: white;
    border-radius: 1.0666vw;
  }
</style>