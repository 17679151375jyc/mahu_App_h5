<!--@Time  : 2019/09/25 13:27-->
<!--@Author: michael huang-->
<!--@File  : my-home-item-alert-btn.vue-->

<template>
  <div :class="['base-vertical-layout-center-item-center']"
       class="home-item-alert-btn"
       :style="alarmStyle"
       @click="alarmOnClick(machineInfo.number, machineInfo.status)"
       @touchstart="alarmTouch(machineInfo.status)"
       @touchend="alarmTouchEnd(machineInfo.status)">
    <img :src="buttonAlarmAlarmIcon(machineInfo.status)" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p :class="{'base-text-details-large-white' : machineInfo.status==='撤防',
            'base-text-details-large-blue' : (machineInfo.status==='布防' || machineInfo.status==='留守布防')}">{{buttonAlarmAlarmText(machineInfo.status)}}</p>
  </div>
</template>

<script>
  export default {
    name: "my-home-item-alert-btn",
    props: {
      machineInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        alarmStyle: {},
      }
    },
    watch: {
      machineInfo() {
        this.getBtnStyle(this.machineInfo.status);
      }
    },
    created() {
      this.getBtnStyle(this.machineInfo.status);
    },
    methods: {
      buttonAlarmAlarmIcon(status) {
        return status==="撤防" ? require("./icon_alarm-alarm-able.png") : require("./icon_alarm-disalarm-able.png");
      },
      buttonAlarmAlarmText(status) {
        return status==="撤防" ? "布防": "撤防";
      },
      alarmOnClick(number, status) {
        this.$emit('alarmOnClick', {number: number,status: status});
      },
      alarmTouch(status) {
        this.alarmStyle = (status==="撤防") ? {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"} :
          {background: "linear-gradient(to bottom, #FFF, #DDD)"};
      },
      alarmTouchEnd(status) {
        this.alarmStyle = (status==="撤防") ? {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"} :
          {background: "linear-gradient(to bottom, #DDD, #FFF)"};
      },

      getBtnStyle(status) {
        this.alarmStyle = (status==="撤防") ? {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"} :
          {background: "linear-gradient(to bottom, #DDD, #FFF)"};
      }
    }
  }
</script>

<style scoped>
  .home-item-alert-btn {
    width: 35.7333vw;
    height: 17.3333vw;
    border-radius: 1.0666vw;
  }
</style>