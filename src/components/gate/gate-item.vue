<!--@Time  : 2019/09/28 15:31-->
<!--@Author: michael huang-->
<!--@File  : gate-item.vue-->

<template>
  <div class="gate-item-wrapper">
    <div class="base-horizontal-layout-space-between-item-center gate-item-title-box">
      <div class="base-horizontal-layout-center-item-center">
        <img :src="require('./icon-gate-sentry.png')"
             class="base-icon-large-style"
             style="margin-right: 2.1333vw">
        <div class="base-horizontal-layout-center-item-center gate-item-title-box-title">
          <p class="base-text-details-large-black-666" style="font-weight: bold">{{myHomeInfo.areaName}}</p>
        </div>
      </div>
      <p class="base-text-details-large-blue" @click="toDeviceManage">设备列表</p>
      <!--<p class="base-text-details-large-black-666"-->
         <!--@click="serviceMessageOnClick"-->
      <!--&gt;服务消息：<span style="color: #E6782B">{{myHomeInfo.serviceMessageCount}}</span></p>-->
    </div>

    <!--<img :src="require('./icon-gate-video.png')" class="gate-item-video-box" @click="openVideo">-->

    <div v-if="myHomeInfo.doorDeviceList && myHomeInfo.doorDeviceList.length>0"
         class="base-horizontal-layout-space-between-item-center" style="padding: 0 5.3333vw 5.3333vw 5.3333vw">
      <div class="gate-item-door-box-big base-vertical-layout-space-between">
        <div class="base-horizontal-layout-general-item-center">
          <img :src="require('./icon-sentry.png')" class="base-icon-large-style" style="margin-right: 1.0666vw">
          <p class="base-text-details-large-black-666">门禁机</p>
        </div>
        <div class="base-horizontal-layout-space-between-item-center">
          <p class="base-text-details-large-black-666">在线:<span style="color: #3388FF">{{gateSentryStatus}}</span></p>
          <p class="base-text-details-large-black-666">离线:<span style="color: #E6782B">{{gateSentryUnStatus}}</span></p>
        </div>
      </div>
      <div class="gate-item-door-box base-vertical-layout-center-item-center" @click="openDoorInOnClick">
        <img :src="require('./icon-open-door-color.png')" class="base-icon-large-style" style="margin-bottom: 2vw">
        <p class="base-text-details-large-blue" style="font-weight: bold">入口开门</p>
      </div>
      <div class="gate-item-door-box base-vertical-layout-center-item-center" @click="openDoorOutOnClick">
        <img :src="require('./icon-open-door-color.png')" class="base-icon-large-style" style="margin-bottom: 2vw">
        <p class="base-text-details-large-blue" style="font-weight: bold">出口开门</p>
      </div>
    </div>

    <!--<div v-for="(item,index) in myHomeInfo.machineList" :key="index"-->
         <!--class="gate-item-machine-box"-->
         <!--:class="['base-horizontal-layout-space-between-item-center']">-->
      <!--<div class="base-vertical-layout-space-between"-->
           <!--style="width: 71.7333vw;height: 28.8vw;background-color: white;-->
                  <!--box-sizing: border-box;padding: 2.6666vw;border-radius: 1.0666vw">-->
        <!--<div class="base-horizontal-layout-space-between">-->
          <!--<div class="base-horizontal-layout-center-item-center">-->
            <!--<img :src="item.onLine?require('./icon-home-machine.png'):require('./icon-home-machine-past-due.png')"-->
                 <!--style="width: 13.9555vw;height: 9.2vw;margin-right: 2.9333vw">-->
            <!--<div class="base-vertical-layout-space-between" style="height: 9.2vw">-->
              <!--<p class="base-text-details-large-black-666">{{item.name}}</p>-->
              <!--<p class="base-text-details-normal-black-666">状态：<span style="color: #E6782B"-->
              <!--&gt;{{item.onLine?alarmStateText(item.status):'离线'}}</span></p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<img :src="require('./icon-home-set.png')" class="base-icon-large-style" @click="toDeviceManage">-->
        <!--</div>-->
        <!--<div class="base-horizontal-layout-space-between">-->
          <!--<p class="base-text-details-large-black-666"-->
          <!--&gt;服务到期：<span style="color: #3388FF">{{getEffectiveTime(myHomeInfo.effectiveTime)}}</span></p>-->
          <!--<p class="base-text-details-large-blue" @click="failureToDeclareOnClick(item.account,item.installCode)">申报维修</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="base-vertical-layout-space-between-item-center" style="height: 28.8vw">-->
        <!--<gate-alert-btn-sos :machineInfo="item" @sosOnClick="callSOS"></gate-alert-btn-sos>-->
        <!--<gate-item-alert-btn :machineInfo="item" @alarmOnClick="alarmOnClick"></gate-item-alert-btn>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div v-if="myHomeInfo.hasDoorDevice>0"-->
         <!--class="gate-item-machine-box"-->
         <!--:class="['base-horizontal-layout-space-between-item-center']">-->
      <!--<gate-item-door-in-btn :areaNumber="myHomeInfo.areaNumber" @doorInOnClick="openDoorInOnClick"></gate-item-door-in-btn>-->
      <!--<gate-item-door-out-btn :areaNumber="myHomeInfo.areaNumber" @doorOutOnClick="openDoorOutOnClick"></gate-item-door-out-btn>-->
    <!--</div>-->
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import gateItemAlertBtn from './gate-item-alert-btn';
  import gateAlertBtnSos from '_c/gate/gate-alert-btn-sos';
  import gateItemDoorInBtn from '_c/gate/gate-item-door-in-btn';
  import gateItemDoorOutBtn from '_c/gate/gate-item-door-out-btn';

  export default {
    name: "gate-item",
    components: {
      gateItemAlertBtn,
      gateAlertBtnSos,
      gateItemDoorInBtn,
      gateItemDoorOutBtn
    },
    props: {
      myHomeInfo: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        gateSentryStatus: 0,
        gateSentryUnStatus: 0
      }
    },
    watch: {
      myHomeInfo() {
        this.getEffectiveTime();
        this.alarmStateText();
      }
    },
    created() {
      this.myHomeInfo.doorDeviceList.forEach((item)=>{
        if(item.onLine) {
          this.gateSentryStatus = this.gateSentryStatus + 1;
        } else {
          this.gateSentryUnStatus = this.gateSentryUnStatus + 1;
        }
      })
    },
    methods: {
      getEffectiveTime(effectiveTime) {
        return utils.timetrans(effectiveTime, "yymmdd");
      },
      alarmStateText(status) {
        return "主机" + status + "中...";
      },

      serviceMessageOnClick() {//点击服务消息
        this.$emit('serviceMessageOnClick', {areaNumber: this.myHomeInfo.areaNumber});
      },
      openVideo() {
        let self = this;
        self.$post("camera", "/getAreaCamera", {areaNumber: self.myHomeInfo.areaNumber}).then((res) => {
          if (res.data.length === 0) {
            const toast = this.$createToast({
              type: 'warn',
              txt: "暂无视频"
            });
            toast.show();
          } else {
            utils.openLiveVideoList(JSON.stringify(res));
          }
        });
      },

      callSOS(e) {//点击SOS
        this.$emit('callSOSOnClick', {machineAccount: e.account, machineInstallCode: e.installCode});
      },
      failureToDeclareOnClick(account,installCode) {//点击申报维修
        this.$emit('failureToDeclareOnClick', {machineAccount: account, machineInstallCode: installCode});
      },
      toDeviceManage() {//点击设备管理
        this.$router.push({ path: "/ma-hu-index/device-index",
          query: { areaNumber: this.myHomeInfo.areaNumber, areaName:  this.myHomeInfo.areaName }});
      },

      alarmStayOnClick(e) {
        this.$emit('stayAlarmOnClick', {isAlarm: e.status, machineNumber: e.number});
      },
      alarmOnClick(e) {
        this.$emit('alarmOnClick', {isAlarm: e.status, machineNumber: e.number});
      },

      openDoorInOnClick(e) {
        // this.$emit('openDoorInOnClick', {areaNumber: e.areaNumber});
        this.$emit('openDoorInOnClick', {areaNumber: this.myHomeInfo.areaNumber});
      },
      openDoorOutOnClick(e) {
        // this.$emit('openDoorOutOnClick', {areaNumber: e.areaNumber});
        this.$emit('openDoorOutOnClick', {areaNumber: this.myHomeInfo.areaNumber});
      }
    }
  }
</script>

<style scoped>
  .gate-item-wrapper {
    width: 100vw;
    margin-bottom: 1.6vw;
    background-color: white;
  }
  .gate-item-title-box {
    /*height: 13.3333vw;*/
    /*background-color: white;*/
    /*border-radius: 1.0666vw;*/
    /*margin: 0 2.4vw 0 2.4vw;*/
    padding: 2.4vw 5.3333vw 2.9333vw 5.3333vw;
  }
  .gate-item-title-box-title {
    padding: 1.3333vw 2.6666vw;
    background-color: #eeeeee;
    border-radius: 1.0666vw;
  }
  .gate-item-door-box-big {
    width: 37.0666vw;
    height: 18.6666vw;
    border: 1px solid rgba(238,238,238,1);
    border-radius: 1.0666vw;
    padding: 2.6666vw 3.4666vw;
    box-sizing: border-box;
  }
  .gate-item-door-box {
    width: 24vw;
    height: 18.6666vw;
    border: 1px solid rgba(238,238,238,1);
    border-radius: 1.0666vw;
  }
  .gate-item-video-box {
    width: 95.2vw;
    height: 26.6666vw;
    background-color: white;
    border-radius: 1.0666vw;
    margin: 1.3333vw 2.4vw 0 2.4vw;
  }
  .gate-item-machine-box {
    padding: 2.1333vw 2.4vw 0 2.4vw;
  }
</style>