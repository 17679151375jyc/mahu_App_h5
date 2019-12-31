<!--@Time  : 2019/10/07 17:28-->
<!--@Author: michael huang-->
<!--@File  : gate-open-door-all-btn.vue-->

<template>
  <div class="gate-open-door-btn-all"
       :class="['base-vertical-layout-center-item-center']"
       :style="doorStyle"
       @click="doorOnClick"
       @touchstart="doorTouch"
       @touchend="doorTouchEnd">
    <img :src="buttonAlarmAlarmIcon('撤防')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-white but_text_line_height">开门</p>
  </div>
</template>

<script>
  export default {
    name: "gate-open-door-all-btn",
    props: {},
    data() {
      return {
        doorStyle: {},
      }
    },
    created() {
    },
    methods: {
      buttonAlarmAlarmIcon(status) {
        return require("./icon_alarm-alarm-able.png")
        // return status==="撤防" ? require("./icon_alarm-alarm-able.png") : require("./icon_alarm-disalarm-able.png");
      },
      doorOnClick(number, status) {
        this.$emit('doorOnClick', {});
        // this.$emit('alarmOnClick', {number: number,status: status});
      },
      doorTouch() {
        this.alarmStyle = {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"};
      },
      doorTouchEnd() {
        this.alarmStyle = {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"};
      }
    }
  }
</script>

<style scoped>
  .gate-open-door-btn-all {
    width: 29.3333vw;
    height: 14.4vw;
    background: linear-gradient(to bottom, #3388FF, #30C9FF);
    border-radius: 1.0666vw;
  }
</style>