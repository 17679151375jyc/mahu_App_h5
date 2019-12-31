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
        <div style="position: relative;flex: 1;background-color: #F5F5F5">
          <div style="height: calc(75vh - 13.3333vw)">
            <cube-scroll>
              <div v-for="(item,index) in myHomeInfoList" :key="index" class="door-device-list" >
                <p class="base-text-title-normal-black" style="margin-left: 1.3333vw;margin-bottom: 2.1333vw">{{item.areaName}}</p>
                <div class="base-horizontal-layout-general-item-center-flex-wrap">
                  <!--style="margin: 0.8vw 0.4vw"-->
                  <div v-for="(doorItem,doorIndex) in item.doorDeviceList" :key="doorIndex">
                    <div class="base-vertical-layout-center-item-center door-device-show"
                         @click="callOpenDoorServer(doorItem.deviceNumber,doorItem)">
                      <p v-if="doorItem.onLine" class="door-list-gate-popup-item-text"
                         :style="doorItem.deviceType===0?'color: #3388FF':'color: #E6782B'"
                        >{{doorItem.deviceName}}（{{getDeviceRoleType(doorItem.deviceRoleType)}}）</p>
                      <p v-if="doorItem.readonly" class="door-list-gate-popup-item-text">开门中...</p>
                      <p v-if="!doorItem.onLine" class="door-list-gate-popup-item-text"
                        >{{doorItem.deviceName}}（{{getDeviceRoleType(doorItem.deviceRoleType)}}）</p>
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
              <div style="height: 13.3333vw">
                <div style="height: 6vw"></div>
              </div>
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
  import { mapState } from "vuex";

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
        popupContainerStyle: {width: '100vw',height: '75vh',padding: '0',marginBottom: '0', borderRadius: '0',backgroundColor: '#F5F5F5'},
        popListTitle: "",
      }
    },
    created() {
      this.isPopShow = true;
    },
    mounted() {
      this.getMyHomeInfoList();
    },
    computed: {
      ...mapState({
        mPushInfo: state => state.user.pushInfo
      })
    },
    watch: {
      mPushInfo(val) {
        if(val && val.PUSH_SUBJECT=='CALL_OPEN_DOOR_SERVER'){
          let key = val.PUSH_KEY;
          this.setDeviceReadonly(key,false);
        }

      }
    },
    methods: {
      ...mapActions(
        ['setIsShowDoorListGatePop']
      ),

      setDeviceReadonly(deviceNumber,readonly){
        for(let i in this.myHomeInfoList){
          let info = this.myHomeInfoList[i];
          for(let j in info.doorDeviceList){
            let device = info.doorDeviceList[j];
            if(device.deviceNumber==deviceNumber){
              this.$set(this.myHomeInfoList[i].doorDeviceList[j],'readonly',readonly);
              break;
            }
          }

        }
      },
      getMyHomeInfoList () {
        let self = this;
        self.$post("hArea","/getMyAreaLists",{type:utils.returnTypeGate()}).then((res)=>{
          self.myHomeInfoList = [...res.data];
          console.log("my-gate接口","/getMyAreaLists");
        });
      },
      callOpenDoorServer(deviceNumber,item) {
        if(item.onLine && !item.readonly){
          let self = this;
          this.setDeviceReadonly(deviceNumber,true);
          self.$post("baseClient","/callOpenDoorServer",{
            deviceNumber: deviceNumber
          }).then((res)=>{
            self.$createToast({
              type: "correct",
              txt: "开门中，请稍后..."
            }).show();
          });
        }
      },

      getDeviceRoleType(type) {
        return (type===0) ? '入口' : '出口';
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
  .door-device-list {
    margin: 3.2vw 1.3333vw 0 1.3333vw
  }
  .door-device-list .door-device-show {
    width: 46.666vw;
    height: 18.3666vw;
    margin:1vw;
    box-sizing: border-box;
    background-color: white;
    border-radius: 1.0666vw
  }
</style>