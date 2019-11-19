<!--@Time  : 2019/09/25 13:40-->
<!--@Author: michael huang-->
<!--@File  : my-home-item-alert-btn-stay.vue-->

<template>
  <div class="home-item-alert-btn"
       :class="['base-vertical-layout-center-item-center']"
       style="background: white"
       :style="alarmStayStyle"
       @click="alarmStayOnClick(machineInfo.number,machineInfo.status)"
       @touchstart="alarmStayTouch"
       @touchend="alarmStayTouchEnd">
    <img :src="buttonAlarmStayIcon(machineInfo.status)" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-blue">留守布防</p>
  </div>
</template>

<script>
  export default {
    name: "my-home-item-alert-btn-stay",
    props: {
      machineInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        alarmStayStyle: {},
      }
    },
    created() {
    },
    methods: {
      buttonAlarmStayIcon(status) {
        return status==="撤防" ? require("./icon_alarm-stay-able.png") : require("./icon_alarm-stay-enable.png");
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
  .home-item-alert-btn {
    width: 35.7333vw;
    height: 17.3333vw;
    background: linear-gradient(to bottom, #3388FF, #30C9FF);
    border-radius: 1.0666vw;
  }
</style>