<!--@Time  : 2019/11/16 21:51-->
<!--@Author: michael huang-->
<!--@File  : door-list-gate-popup.vue-->

<template>
  <div>
    <base-popup v-if="isPopShow"
                :refId="refId"
                :popPosition="popPosition"
                :popupContainerStyle="popupContainerStyle"
                :isShowbtn="false">
      <div class="base-vertical-layout-general" style="flex: 1">
        <div class="base-horizontal-layout-center-item-center" style="height: 13.3333vw;background-color: white">
          <p class="base-text-title-normal-black">请选择要开的门禁</p>
        </div>
        <div style="position: relative;flex: 1;background-color: #F5F5F5;">
          <div style="height: calc(92.5333vw - 13.3333vw)">
            <cube-scroll>
              <div v-for="(item,index) in myHomeInfoList" :key="index" style="margin: 3.2vw 1.3333vw 0 1.3333vw">
                <p class="base-text-title-normal-black" style="margin-left: 1.3333vw;margin-bottom: 2.1333vw">{{item.areaName}}</p>
                <div class="base-horizontal-layout-general-item-center-flex-wrap">
                  <div v-for="(doorItem,doorIndex) in item.doorDeviceList" :key="doorIndex"
                       style="margin: 0.8vw 0.4vw">
                    <div class="base-vertical-layout-center-item-center"
                         @click="callOpenDoorServer(doorItem.deviceNumber)"
                         style="width: 23.46666vw;height: 18.3666vw;padding: 2.4666vw;box-sizing: border-box;
                         background-color: white;border-radius: 1.0666vw">
                      <p v-if="doorItem.onLine" class="door-list-gate-popup-item-text"
                         :style="doorItem.deviceType===0?'color: #3388FF':'color: #E6782B'">{{doorItem.deviceName}}</p>
                      <p v-if="!doorItem.onLine" class="door-list-gate-popup-item-text">{{doorItem.deviceName}}</p>
                      <p v-if="!doorItem.onLine" class="door-list-gate-popup-item-text-pp">离线中...</p>
                    </div>
                  </div>
                  <!--<div v-for="(doorItem,doorIndex) in 7" :key="doorIndex"-->
                       <!--style="margin: 0.8vw 0.4vw">-->
                    <!--<div class="base-horizontal-layout-center-item-center"-->
                         <!--style="width: 23.46666vw;height: 18.3666vw;background-color: white;border-radius: 1.0666vw">-->
                      <!--<p class="base-text-details-large-blue" style="font-size: 3.4666vw">{{doorItem.doorName}}1111</p>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
                <!--<div class="base-horizontal-layout-general-item-center-flex-wrap">-->
                  <!--<div v-for="(doorItem,doorIndex) in item.doorDeviceList" :key="doorIndex"-->
                       <!--style="margin: 0.8vw 0.4vw">-->
                    <!--<div v-if="doorItem.deviceType===1" class="base-horizontal-layout-center-item-center"-->
                         <!--@click="callOpenDoorServer(doorItem.deviceNumber)"-->
                         <!--style="width: 23.46666vw;height: 18.3666vw;background-color: white;border-radius: 1.0666vw">-->
                      <!--<p class="door-list-gate-popup-item-text" style="color: #E6782B">{{doorItem.deviceName}}</p>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <div style="height: 13.3333vw;"></div>
            </cube-scroll>
          </div>
        </div>
      </div>
      <div class="door-list-gate-pop-btn" style="z-index: 10">
        <div class="base-horizontal-layout-center-item-center" style="width: 100vw;height: 13.3333vw"
             @click="closePoppup">
          <p class="base-text-title-normal-gray">取消</p>
        </div>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import basePopup from '_c/popup/base-popup';
  import { mapActions } from 'vuex';

  export default {
    name: "door-list-gate-popup",
    props: {},
    components: {
      basePopup
    },
    data() {
      return {
        myHomeInfoList: [],

        isPopShow: false,
        refId: 'doorListGatePopup',
        popPosition: 'bottom',
        popupContainerStyle: {width: '100vw',height: '92.5333vw',padding: '0',marginBottom: '0', borderRadius: '0',backgroundColor: '#F5F5F5'},
        popListTitle: "",
      }
    },
    created() {
      this.isPopShow = true;
    },
    mounted() {
      this.getMyHomeInfoList();
    },
    methods: {
      ...mapActions(
        ['setIsShowDoorListGatePop']
      ),

      getMyHomeInfoList () {
        let self = this;
        self.$post("hArea","/getMyAreaLists",{type:utils.returnTypeGate()}).then((res)=>{
          self.myHomeInfoList = [...res.data];
          console.log("my-gate接口","/getMyAreaLists");
        });
      },
      callOpenDoorServer(deviceNumber) {
        let self = this;
        self.$post("baseClient","/callOpenDoorServer",{
          deviceNumber: deviceNumber
        }).then((res)=>{
          self.$createToast({
            type: "correct",
            txt: "开门中，请稍后..."
          }).show();
        });
      },


      closePoppup() {
        let self = this;
        self.isPopShow = false;
        self.setIsShowDoorListGatePop(false);
      },
    }
  }
</script>

<style scoped>
  .door-list-gate-pop-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    min-height: 0;
    height: 13.3333vw;
    overflow: hidden;
    background: white;
  }
  .door-list-gate-popup-item-text {
    font-size: 3.4666vw;
    font-weight: bold;
    word-break: break-all;
    text-align: center;
    line-height: 4vw;
    color: rgba(0,0,0,0.3);
  }
  .door-list-gate-popup-item-text-pp {
    font-size: 3.2vw;
    word-break: break-all;
    text-align: center;
    line-height: 4vw;
    color: rgba(0,0,0,0.5);
    background-color: rgba(0,0,0,0.1);
    padding: 1vw 2vw;
    border-radius: 1.0666vw;
    margin-top: 1vw;
  }
</style>