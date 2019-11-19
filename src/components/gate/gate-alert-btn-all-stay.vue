<!--@Time  : 2019/09/28 15:22-->
<!--@Author: michael huang-->
<!--@File  : gate-alert-btn-all-stay.vue-->

<template>
  <div class="gate-item-alert-btn-all-stay"
       :class="['base-vertical-layout-center-item-center']"
       style="background: white"
       :style="alarmStayStyle"
       @click="alarmStayOnClick('', '撤防')"
       @touchstart="alarmStayTouch"
       @touchend="alarmStayTouchEnd">
    <img :src="buttonAlarmStayIcon('撤防')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-blue">留守布防</p>
  </div>
</template>

<script>
  export default {
    name: "gate-alert-btn-all-stay",
    props: {},
    data() {
      return {
        alarmStayStyle: {},
      }
    },
    created() {
    },
    methods: {
      buttonAlarmStayIcon(status) {
        return require("./icon_alarm-stay-able.png")
        // return status==="撤防" ? require("./icon_alarm-stay-able.png") : require("./icon_alarm-stay-enable.png");
      },
      alarmStayOnClick(number, status) {
        if (status==="撤防")
        {
          this.$emit('stayAlarmOnClick', {number: number,status: status});
        } else {
          const toast = this.$createToast({
            type: "warn",
            txt: "需要先撤防，才能留守布防"
          });
          toast.show();
        }
      },
      alarmStayTouch() {
        this.alarmStayStyle = {background: "linear-gradient(to bottom, #FFF, #CCC)"};
      },
      alarmStayTouchEnd() {
        // this.alarmStayStyle = {background: "linear-gradient(to bottom, #CCC, #FFF)"};
        this.alarmStayStyle = {background: "white"};
      },
    }
  }
</script>

<style scoped>
  .gate-item-alert-btn-all-stay {
    width: 29.3333vw;
    height: 14.4vw;
    background: linear-gradient(to bottom, #3388FF, #30C9FF);
    border-radius: 1.0666vw;
  }
</style>