<template>
  <div class="home-item-wrapper">
       <!--v-bind:class="{'home-item-wrapper-padding':(alertMessageList.length===0 && !isShowVideo),-->
                      <!--'home-item-wrapper-padding-video':(defenceAreaList.length>0 && !isShowVideo)}">-->
    <div class="home-item-title-box" :class="['base-horizontal-layout-space-between-item-center']">
      <div class="base-horizontal-layout-center-item-center">
        <img v-if="myHomeInfo.type===0" :src="require('./icon-home.png')"
             style="width: 6.0666vw;height: 4.9555vw;margin-right: 1.066vw">
        <img v-else-if="myHomeInfo.type===1" :src="require('./icon-business.png')"
             style="width: 6.0666vw;height: 4.9555vw;margin-right: 1.066vw">
        <p class="base-text-title-normal-666" style="font-weight: bold">{{myHomeInfo.areaName}}</p>
      </div>
      <div class="base-horizontal-layout-center-item-center">
        <div v-if="myHomeInfo.serviceMessageCount>0"
             style="width: 2vw;height: 2vw;background-color: red;border-radius: 50%;margin-right: 2vw"></div>
        <p class="base-text-details-large-black-666"
           @click="serviceMessageOnClick"
        >服务消息：<span style="color: #E6782B">{{myHomeInfo.noDealMessageCount}}</span></p>
      </div>
    </div>
    <div v-for="(item,index) in myHomeInfo.machineList" :key="index"
         class="home-item-machine-box">
      <div class="base-horizontal-layout-space-between">
        <!--<div v-show="!isVideoShow" class="base-horizontal-layout-center">-->
        <div class="base-vertical-layout-space-between">
          <div v-show="machineShow" class="base-vertical-layout-space-between"
               style="width:73.0666vw;height:28.8vw;background-color: white;
                          box-sizing: border-box;padding: 2.6666vw;border-radius: 1.0666vw">
            <div class="base-horizontal-layout-space-between">
              <div class="base-horizontal-layout-center-item-center">
                <img :src="item.onLine?require('./icon-home-machine.png'):require('./icon-home-machine-past-due.png')"
                     style="width: 13.9555vw;height: 9.2vw;margin-right: 2.9333vw">
                <div class="base-vertical-layout-space-between" style="height: 9.2vw">
                  <p class="base-text-details-large-black-666">{{item.name}}</p>
                  <p class="base-text-details-normal-black-666">状态：<span style="color: #E6782B"
                  >{{item.onLine?alarmStateText(item.status):'离线'}}</span></p>
                </div>
              </div>
              <img :src="require('./icon-home-set.png')" class="base-icon-large-style" @click="toDeviceManage">
            </div>
            <p v-if="item.shareUser"
               class="base-text-details-large-black-666">分享于：<span style="color: #E6782B"
            >{{(!item.shareUser[0].shareUserName||item.shareUser[0].shareUserName==='') ?
              item.shareUser[0].shareUserPhone : item.shareUser[0].shareUserName}}</span></p>
            <div class="base-horizontal-layout-space-between">
              <p class="base-text-details-large-black-666"
              >服务到期：<span style="color: #3388FF">{{getEffectiveTime(myHomeInfo.effectiveTime)}}</span></p>
              <p class="base-text-details-large-blue" @click="failureToDeclareOnClick(item.account,item.installCode)">申报维修</p>
            </div>
          </div>
          <div v-show="machineShow" class="base-horizontal-layout-space-between-item-center">
            <my-home-item-alert-btn-stay :machineInfo="item" @stayAlarmOnClick="alarmStayOnClick"></my-home-item-alert-btn-stay>
            <my-home-item-alert-btn :machineInfo="item" @alarmOnClick="alarmOnClick"></my-home-item-alert-btn>
          </div>
        </div>
        <!--<div v-show="isVideoShowStart"-->
             <!--class="base-vertical-layout-center-item-center"-->
             <!--:style="isVideoShowStartStyle">-->
          <!--<img :src="require('./icon-home-machine.png')"-->
               <!--style="width: 13.9555vw;height: 9.2vw;margin-bottom: 2.9333vw">-->
          <!--<div class="base-vertical-layout-space-between" style="height: 9.2vw">-->
            <!--<p class="base-text-details-large-black-666">{{item.name}}</p>-->
            <!--<p class="base-text-details-normal-black-666">状态：<span style="color: #E6782B">{{alarmStateText(item.status)}}</span></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
        <my-home-item-video-unfold-btn
          v-show="!isVideoShow"
          style="margin-left: 2.93333vw"
          :machineInfo="item"
          :index="index"
          :sum="item.cameraList.length"
          @videoUnfoldOnClick="videoUnfoldOnClick">
          <!--:isVideoShowStart=isVideoShowStart-->
        </my-home-item-video-unfold-btn>

        <div v-show="isVideoShow" class="base-horizontal-layout-center">
          <my-home-item-video-close-btn
            :index="index"
            @videoCloseOnClick="videoCloseOnClick">
          </my-home-item-video-close-btn>
          <div class="m-topic-swiper" style="width: 80.5333vw;height: 47.7333vw">
            <swiper :options="myCameraListSwiperOption" style="width: 80.5333vw;height: 47.7333vw" ref="videoSwiper">
              <swiper-slide v-for="(videoItem,videoIndex) in item.cameraList" :key="videoIndex"
                            style="width: 48%"><!--style="width: calc(35.7333vw+ 2.1333vw)"-->
                <my-home-item-video-item-btn
                  :yingShiAccessToken="myHomeInfo.yingShiAccessToken"
                  :videoInfo="videoItem">
                </my-home-item-video-item-btn>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <!--<div v-if="videoList.length===0" style="margin: 5vw 0 5vw 0"></div>-->
    <!--&lt;!&ndash;视频模块 视频模块 视频模块 视频模块 视频模块 视频模块&ndash;&gt;-->
    <!--<div v-show="defenceAreaList.length>0 && videoList.length>0" style="margin: 3vw 0 5vw 0">-->
      <!--&lt;!&ndash;选择器组件&ndash;&gt;-->
      <!--<div class="base-horizontal-layout-space-between-item-center"-->
           <!--style="width: 90vw;height: 6.93vw;margin: 0 5vw 0 5vw">-->
        <!--<img :src="require('./icon_camera.png')" style="width: 9.6vw;height: 6.4vw">-->
        <!--<cube-select v-if="isShowVideo"-->
                     <!--style="width: 53.33vw;height:6.93vw;background-color: #EDEEF0;-->
                         <!--text-align: center;font-size: 3.47vw;font-weight: 900;padding: 1.07vw 2vw 1.07vw 0"-->
                     <!--title="请选择视频区域"-->
                     <!--v-model="videoValue"-->
                     <!--:options="videoOptions"-->
                     <!--@change="videoChange"-->
                     <!--@picker-show="videoChangeShow"-->
                     <!--@picker-hide="videoChangeHide">-->
        <!--</cube-select>-->
        <!--<p v-else class="base-text-details-large-black-black" style="font-weight: bold;width: 61.33vw">视频监控</p>-->
        <!--<div class="base-horizontal-layout-general-item-center" @click="showVideo">-->
          <!--<img :src="isShowVideoIcon" style="width: 2.13vw;height: 1.33vw;margin-right: 1.33vw">-->
          <!--<p style="font-size: 3.2vw;color: #45484D">{{isShowVideo ? '收起' : '展开'}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;视频组件&ndash;&gt;-->
      <!--<div v-show="isShowVideo" style="width: 100vw;margin-top: 3.47vw">-->
        <!--<div :style="videoSwiperOptionBoxStyle">-->
          <!--<div style="margin-left: 5vw">-->
            <!--<img :src="require('./icon_video-bg.png')" style="width: 90vw;height: 48vw">-->

            <!--<div v-if="!isVideoPlay && !isVideoLoading"-->
                 <!--style="position: relative;bottom: 48vw;left: 0">-->
              <!--<div class="base-horizontal-layout-center-item-center"-->
                   <!--style="width: 90vw;height: 48vw">-->
                <!--&lt;!&ndash;background-image: url(./icon_video-bg.png)&ndash;&gt;-->
                <!--&lt;!&ndash;background-color: #4caf50"&ndash;&gt;-->
                <!--<div class="base-vertical-layout-center-item-center"-->
                     <!--style="background-color:rgba(0,0,0,1);border-radius:1.3333vw;width: 16vw;height: 13.71vw"-->
                     <!--@click="videoPlay">-->
                  <!--<img :src="require('./icon_monitor.png')" style="width: 6vw;height: 6vw">-->
                  <!--<p style="margin-top: 1vw;font-size: 3.33333vw;color: white;text-align:center">直播</p>-->
                <!--</div>-->

                <!--<div class="base-vertical-layout-center-item-center"-->
                     <!--style="margin-left: 5vw;background-color:rgba(0,0,0,1);border-radius:1.3333vw;width: 16vw;height: 13.71vw"-->
                     <!--@click="showPlayback">-->
                  <!--<img :src="require('./icon_play-back.png')" style="width: 6vw;height: 6vw">-->
                  <!--<p style="margin-top: 1vw;font-size: 3.33333vw;color: white;text-align:center">回放</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import utils from '_libs/utils';
  // import littleRedDot from '../redDot/little-red-dot';
  // import buttonIcon from '../button/button-icon';
  // import buttonAlarm from '../button/button-alarm';
  // import alertMsg from './message/alert-msg';

  import myHomeItemAlertBtnStay from './my-home-item-alert-btn-stay';
  import myHomeItemAlertBtn from './my-home-item-alert-btn';
  import myHomeItemVideoUnfoldBtn from './my-home-item-video-unfold-btn';
  import myHomeItemVideoItemBtn from './my-home-item-video-item-btn';
  import myHomeItemVideoCloseBtn from './my-home-item-video-close-btn';

  import 'swiper/dist/css/swiper.css';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  var mPlayer = undefined;
  export default {
    name: "my-home-item",
    components: {
      // littleRedDot,
      // buttonIcon,
      // buttonAlarm,
      // alertMsg,

      myHomeItemAlertBtn,
      myHomeItemAlertBtnStay,
      myHomeItemVideoUnfoldBtn,
      myHomeItemVideoItemBtn,
      myHomeItemVideoCloseBtn,

      swiper,
      swiperSlide
    },
    props:
      {
        index: {
          type: Number,
          default: 0
        },
        myHomeInfo: {
          type: Object,
          default: () => {}
        },
      },
    data() {
      const that = this;
      return {
        isAlarm: false,
        isAlert: false,
        failureToDeclareTextStyle: {fontSize: '3.2vw'},
        failureToDeclareTouchBackgroundStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
        backgroundGrayColor: {backgroundColor: '#F2F4F5'},

        alarmStyle: {},
        alarmStayStyle: {},
        videoUnfoldStyle: {},

        machineInfo: [],
        otherMessageList: [],
        alertMessageList: [],
        alertSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          pagination: {
            el: '.swiper-pagination',

            type: 'fraction',//bullets圆点（默认） //这个不用变成custom值，就可以之定义分页器样式(可爽)
            // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
            // clickable:true,
            // paginationClickable: true,
            // notNextTick:true,

            bulletElement : 'li',
            // modifierClass : 'my-pagination-',
            // bulletClass: 'my-swiper-pagination-bullet',
            // bulletActiveClass: 'my-swiper-pagination-bullet-active'
          },
          autoplay: { //可选选项，自动滑动
            disableOnInteraction: false,
            delay: 3000
          },
          // loop: true,
          // watchSlidesProgress : true,
          speed: 600,
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        myCameraListSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          slidesPerView : "auto",
          // centeredSlides: true,

          pagination: {
            el: '.camera-swiper-pagination',

            type: 'bullets',//这个不用变成custom值，就可以之定义分页器样式(可爽)
            // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
            // clickable:true,
            // paginationClickable: true,
            // notNextTick:true,

            bulletElement : 'li',
            // modifierClass : 'my-pagination-',
            // bulletClass: 'my-swiper-pagination-bullet',
            // bulletActiveClass: 'my-swiper-pagination-bullet-active'
          },
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        myCameraListScrollOptions: {},

        machineShow: true,
        // 视频模块初始化
        isVideoShowStart: false,
        isVideoShowStartStyle: {width: '73.06666vw',height: '47.7333vw',backgroundColor: 'white',borderRadius: '1.0666vw'},
        isVideoShow: false,
        defenceAreaList: [],
        // mPlayer: undefined,
        iframeUrl: '',
        isVideoPlay: false,
        isVideoLoading: false,
        isVideoSound: false,
        isVideoFullScreen: false,
        cameraDeviceNumber: '',
        videoList: [],
        videoOptions: [],
        videoValue: '',
        videoUrl1: '',
        videoUrl2: '',
        videoIndex: 0,
        videoSwiperOptionBoxStyle: {height: '55vw'},
        videoSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          pagination: {
            el: '.swiper-pagination',

            type: 'bullets',//这个不用变成custom值，就可以之定义分页器样式(可爽)
            // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
            // clickable:true,
            // paginationClickable: true,
            // notNextTick:true,

            bulletElement : 'li',
            // modifierClass : 'my-pagination-',
            // bulletClass: 'my-swiper-pagination-bullet',
            // bulletActiveClass: 'my-swiper-pagination-bullet-active'
          },
          // autoplay: { //可选选项，自动滑动
          //   disableOnInteraction: false,
          //   delay: 3000
          // },
          speed: 600,
          runCallbacksOnInit : true,//初始化时不触发slideChange
          on:{
            slideChangeTransitionStart() {
              that.changeVideoSelect(this.activeIndex);
            },
          },
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },
        nowTime: 0,
        nowTimeStr: '',
        isShowVideo: false,
        isShowVideoIcon: require('@/assets/icon/icon_arrow-down.png'),
        isPlayback: false,
      }
    },
    watch: {
      myHomeInfo() {
        this.getMyHomeInfo();
      }
    },
    created() {
      this.nowTime =  new Date().getTime();
      this.nowTimeStr = utils.timetrans(this.nowTime, "yymmdd");
      this.getMyHomeInfo();
    },
    methods: {
      getEffectiveTime(effectiveTime) {
        return utils.timetrans(effectiveTime, "yymmdd");
      },

      getMyHomeInfo() {
        this.defenceAreaList = [];
        let videoList = [];
        this.videoList = [];
        this.videoOptions = [];
        this.alertMessageList = [];
        this.myHomeInfo.machineList.forEach((item) => {
          item.isVideoShow = false;
          item.machineShow = true;
          item.isVideoShowStart = false;
          item.defenceAreaList.forEach((item2) => {
            this.defenceAreaList.push(item2);
            // if (item2.cameraList) {
            //   item2.cameraList.forEach((itemCamera) => {
            //     videoList.push(itemCamera);
            //     // this.videoOptions.push(itemCamera.name);
            //   });
            // }
          });
          if (item.alertMessageList) {
            item.alertMessageList.forEach((itemAlert) => {
              this.alertMessageList.push(itemAlert);
            });
            if (this.alertMessageList.length === item.alertMessageList.length) {
              if (item.maintainMessageList) {
                item.maintainMessageList.forEach((itemMaintain) => {
                  this.alertMessageList.push(itemMaintain);
                });
              }
            }
          }
        });

        // video数组去重
        let videoObj = {};
        for(let count =0; count<videoList.length; count++){
          if(!videoObj[videoList[count].cameraNumber]){
            this.videoList.push(videoList[count]);
            this.videoOptions.push(videoList[count].name);
            videoObj[videoList[count].cameraNumber] = true;
          }
        }
        if(this.videoOptions.length>0){
          this.getVideoInfo();
        }

        //todo 例子
        let arr = [{
          key: '01',
          value: '乐乐'
        }, {
          key: '02',
          value: '博博'
        }, {
          key: '03',
          value: '淘淘'
        },{
          key: '04',
          value: '哈哈'
        },{
          key: '01',
          value: '乐乐'
        }];
        let result = [];
        let obj = {};
        for(let i =0; i<arr.length; i++){
          if(!obj[arr[i].key]){
            result.push(arr[i]);
            obj[arr[i].key] = true;
          }
        }
        console.log("数组去重例子",result);
      },
      getVideoInfo() {
        this.videoValue = this.videoOptions[0];
        this.cameraDeviceNumber = this.videoList[0].deviceNumber;
        console.log("摄像头数组",this.videoList);
      },

      notificationMessageOnClick() {//点击通知消息
        const self = this;
        self.$emit('notificationMessageOnClick', {});
      },
      serviceMessageOnClick() {//点击服务消息
        this.$emit('serviceMessageOnClick', { areaNumber: this.myHomeInfo.areaNumber });
      },
      toDeviceManage() {//点击设备管理
        this.$router.push({ path: "/ma-hu-index/device-index",
          query: { areaNumber: this.myHomeInfo.areaNumber, areaName:  this.myHomeInfo.areaName}});
      },
      failureToDeclareOnClick(account,installCode) {//点击申报维修
        this.$emit('failureToDeclareOnClick', {machineAccount: account, machineInstallCode: installCode});
      },

      getIsAlarm() {//判断现在状态，有一部主机是撤防状态就等于撤防状态，没有撤防就判断有无留守布防，有留守就显示留守
        let isAlarm = true;
        if (this.myHomeInfo.machineList.length > 0) {
          this.myHomeInfo.machineList.forEach((item) => {
            if (item.status === "撤防") {
              isAlarm = false;
            }
          });
        }
        return isAlarm;
      },
      getAlarmStatus(status) {//判断现在状态，有一部主机是撤防状态就等于撤防状态，没有撤防就判断有无留守布防，有留守就显示留守
        let isAlarmStr = "布防";
        if (this.getIsAlarm()) {
          if (this.myHomeInfo.machineList.length > 0) {
            this.myHomeInfo.machineList.forEach((item) => {
              if (item.status === "留守布防") {
                isAlarmStr = "留守布防";
              }
            });
          }
        } else {
          isAlarmStr = "撤防";
        }
        return isAlarmStr;
      },
      alarmStateText(status) {
        return "主机"+status+"中...";
      },
      buttonAlarmPoliceIcon() {
        return this.isAlert ? require("./icon_alarm-police-enable.png") : require("./icon_alarm-police-able.png");
      },
      buttonAlarmPoliceTextColor() {
        return this.isAlert ? {color: '#B8C0CC'} : {color: '#FF3333'};
      },
      buttonAlarmStayIcon(status) {
        return status==="撤防" ? require("./icon_alarm-stay-able.png") : require("./icon_alarm-stay-enable.png");
      },
      buttonAlarmStayTextColor() {
        return this.getAlarmStatus()==="撤防" ? {color: '#3388FF'} : {color: '#B8C0CC'};
      },
      buttonAlarmAlarmIcon(status) {
        return status==="撤防" ? require("./icon_alarm-alarm-able.png") : require("./icon_alarm-disalarm-able.png");
      },
      buttonAlarmAlarmText(status) {
        return status==="撤防" ? "布防": "撤防";
      },
      buttonAlarmAlarmTextColor() {
        return this.getAlarmStatus()==="撤防" ? {color: "white"} : {color: '#3388FF'};
      },
      buttonAlarmAlarmBackgroundColor() {
        return this.getAlarmStatus()==="撤防" ? {backgroundColor: '#3388FF'} : {backgroundColor: '#F2F4F5'};
      },

      alertRequestOnClick() {
        const self = this;
        self.$emit('alertRequestOnClick', {machineAccount: self.myHomeInfo.machineList[0].account});//todo
        // self.myHomeInfo.machineList.forEach((item) => {
        //   self.$emit('alertRequestOnClick', {machineAccount: item.account});
        // });
      },
      alarmStayOnClick(e) {
        const self = this;
        self.$emit('stayAlarmOnClick', {isAlarm: e.status, machineNumber: e.number});
      },
      alarmOnClick(e) {
        const self = this;
        self.$emit('alarmOnClick', {isAlarm: e.status, machineNumber: e.number});
      },
      videoUnfoldOnClick(e) {
        // this.isVideoShowStart = true;
        this.machineShow = false;
        this.isVideoShowStart = true;
        // this.isVideoShowStartStyle = {width: '73.06666vw',height: '47.7333vw',backgroundColor: 'white',borderRadius: '1.0666vw'};
        // this.isVideoShowStartStyle =
        //   {width: '14.9333vw',height: '47.7333vw',backgroundColor: 'white',borderRadius: '1.0666vw',transition: "width ease-in 0.3s"};
        setTimeout(()=>{
          this.isVideoShow = e.isOpenCamera;
          this.isVideoShowStart = false;
          // this.isVideoShowStartStyle = {width: '73.06666vw',height: '47.7333vw',backgroundColor: 'white',borderRadius: '1.0666vw'};
        },300);


        // console.log(11111111111111,e.isVideoShow);
        // console.log(22222222222222,e.machineShow);
        // console.log(33333333333333,e.isVideoShowStart);
        // console.log(44444444444444,e.index);
        //
        // console.log(555,this.myHomeInfo.machineList[e.index].isVideoShow);
        // console.log(666,this.myHomeInfo.machineList[e.index].machineShow);
        // console.log(777,this.myHomeInfo.machineList[e.index].isVideoShowStart);
        //
        // //todo 还未完善
        // this.$set(this.myHomeInfo.machineList[e.index], 'name',"4654654");
        // this.$set(this.myHomeInfo.machineList[e.index], 'isVideoShow', e.isVideoShow);
        // this.$set(this.myHomeInfo.machineList[e.index], 'machineShow', e.machineShow);
        // this.$set(this.myHomeInfo.machineList[e.index], 'isVideoShowStart', e.isVideoShowStart);
        //
        // console.log(555,this.myHomeInfo.machineList[e.index].isVideoShow);
        // console.log(666,this.myHomeInfo.machineList[e.index].machineShow);
        // console.log(777,this.myHomeInfo.machineList[e.index].isVideoShowStart);
      },
      videoCloseOnClick(e) {
        setTimeout(()=>{
          this.isVideoShow = e.isOpenCamera;
          this.machineShow = true;
          //todo 还未完善
          // console.log(e.index,e.isOpenCamera);
          // this.$set(this.myHomeInfo.machineList[e.index], 'isVideoShow', e.isOpenCamera);
          // this.$set(this.myHomeInfo.machineList[e.index], 'machineShow', true);
          //
          // console.log(101010,this.myHomeInfo.machineList[e.index].isVideoShow);
          // console.log(121212,this.myHomeInfo.machineList[e.index].machineShow);
        },300);
      },

      videoChangeShow() {//显示选择视频
        utils.hideTab().then((e)=>{
        });
      },
      videoChangeHide() {//隐藏选择视频
        // utils.showTab().then((e)=>{
        // });
      },
      videoChange(value, index, text) {//选择视频
        // this.videoStop();
        // this.$refs.videoSwiper.swiper.slideToLoop(index, 600, false);
        this.videoIndex = index;

        this.cameraDeviceNumber = this.videoList[index].deviceNumber;

        let self = this;
        self.videoUrl1 = "";
        self.videoUrl2 = "";
        // self.$post("camera", "/getCameraLive", {
        //   cameraNumber: self.videoList[self.videoIndex].cameraNumber
        // }).then((res) => {
        //   self.videoUrl1 = res.data[0].rtmp;
        //   self.videoUrl2 = res.data[0].hls;
        //
        //   // const toast = self.$createToast({
        //   //   type: "correct",
        //   //   txt: "直播已"+res.data[0].desc
        //   // });
        //   // toast.show();
        // });
      },
      changeVideoSelect(index) {//更改视频选择器title
        this.videoValue = this.videoOptions[index];
      },
      showVideo() {//视频的展开和收起
        let self = this;
        this.isShowVideo = this.isShowVideo ? false : true;
        this.isShowVideoIcon = this.isShowVideo ? require("@/assets/icon/icon_arrow-up.png") : require("@/assets/icon/icon_arrow-down.png");

        if (this.isShowVideo) {
          // let url = "ezopen://open.ys7.com/"+this.videoList[0].deviceNumber+"/1.live";
          let accessToken = this.myHomeInfo.yingShiAccessToken;
          // console.log(url,accessToken);
          console.log("yingShiAccessToken",accessToken);

          // this.iframeUrl = process.env.VUE_APP_ApiUrl + "/demo-monitor.html";
          // this.iframeUrl = "http://172.31.1.203" + "/demo-monitor.html";


          // setTimeout(() => {
          //   // 开始初始化监控地址
          //   self.mPlayer = new EZUIKit.EZUIPlayer({
          //     id: 'myPlayer',
          //     url: "ezopen://open.ys7.com/C92768335/1.live",
          //     // url: url,
          //     autoplay: true,
          //     accessToken: "at.4rgi0fd15mhccwy15iiqiltl45zxrifl-5towx1yosh-0ewedhf-srkiejo2l",
          //     // accessToken: accessToken,
          //     decoderPath: '',
          //     width: 300,
          //     height: 160,
          //     handleError: this.videoHandleError,
          //     handleSuccess: this.videoHandleSuccess
          //   });
          //   // 播放
          //   // self.mPlayer.play();
          //   // 结束
          //   // self.mPlayer.stop();
          // }, 500);

          // let self = this;
          // self.videoUrl1 = "";
          // self.videoUrl2 = "";
          // self.$post("camera", "/getCameraLive", {
          //   cameraNumber: self.videoList[0].cameraNumber
          // }).then((res) => {
          //   self.videoUrl1 = res.data[0].rtmp;
          //   self.videoUrl2 = res.data[0].hls;
          //   console.log(self.videoList[0].cameraNumber)
          //   // const toast = this.$createToast({
          //   //   type: "correct",
          //   //   txt: "直播已"+res.data[0].desc
          //   // });
          //   // toast.show();
          // });
        }
      },
      videoHandleError(e) {
        console.log('videoHandleError',e);
        const toast = this.$createToast({
          type: 'warn',
          txt: "萤石："+e.msg
        });
        toast.show();
        this.isVideoPlay = false;
        this.isVideoSound = false;
      },
      videoHandleSuccess(e) {
        let self = this;
        console.log('videoHandleSuccess',e);
        this.isVideoPlay = true;
        this.isVideoLoading = false;
        this.isVideoSound = true;
      },
      videoPlay() {// 开始
        let self = this;
        // if(self.mPlayer === undefined || self.mPlayer === null) {
        //   return;
        // } else {
        this.isShowVideoIcon = this.isShowVideo ? require("@/assets/icon/icon_arrow-up.png") : require("@/assets/icon/icon_arrow-down.png");
        if (this.isShowVideo) {
          // let url = "ezopen://open.ys7.com/"+this.cameraDeviceNumber+"/1.live";
          let accessToken = this.myHomeInfo.yingShiAccessToken;
          // console.log(url,accessToken);
          utils.openLiveVideo(accessToken,this.cameraDeviceNumber);
          console.log("cameraDeviceNumber："+this.cameraDeviceNumber, this.myHomeInfo.yingShiAccessToken);

          // mPlayer = new EZUIKit.EZUIPlayer({
          //   id: 'myPlayer',
          //   // url: "ezopen://open.ys7.com/C92768335/1.live",
          //   url: url,
          //   autoplay: true,
          //   // accessToken: "at.4rgi0fd15mhccwy15iiqiltl45zxrifl-5towx1yosh-0ewedhf-srkiejo2l",
          //   accessToken: accessToken,
          //   decoderPath: '.',
          //   // decoderPath: (process.env.VUE_APP_MOutputDir==='iosFamilyUser') ? 'localhost' : '',
          //   width: window.screen.width/1.11,//324
          //   height: window.screen.width/1.1/1.875,//173
          //   handleError: this.videoHandleError,
          //   handleSuccess: this.videoHandleSuccess
          // });
          // this.isVideoLoading = true;
        }
      },
      videoStop() {
        mPlayer.stop();
        this.isVideoPlay = false;
      },
      videoCloseSound() {
        if(this.isVideoSound) {
          mPlayer.closeSound();
          this.isVideoSound = false;
        } else {
          mPlayer.openSound();
          this.isVideoSound = true;
        }
      },
      videoFullScreen() {
        let self = this;
        // self.mPlayer = new EZUIKit.EZUIPlayer({
        //   id: 'myPlayer',
        //   url: "ezopen://open.ys7.com/C92768335/1.live",
        //   // url: url,
        //   autoplay: true,
        //   accessToken: "at.4rgi0fd15mhccwy15iiqiltl45zxrifl-5towx1yosh-0ewedhf-srkiejo2l",
        //   // accessToken: accessToken,
        //   decoderPath: '',
        //   // decoderPath: (process.env.VUE_APP_MOutputDir==='iosFamilyUser') ? 'localhost' : '',
        //   handleError: this.videoHandleError,
        //   handleSuccess: this.videoHandleSuccess
        // });

        // mPlayer.fullScreenSingle(0);

        this.isVideoFullScreen = true;

        // let url = "ezopen://open.ys7.com/"+this.videoList[0].deviceNumber+"/1.live";
        let accessToken = this.myHomeInfo.yingShiAccessToken;
        // console.log(url,accessToken);
        console.log(accessToken);

        mPlayer = new EZUIKit.EZUIPlayer({
          id: 'myPlayer1',
          // url: "ezopen://open.ys7.com/C92768335/1.live",
          url: url,
          autoplay: true,
          // accessToken: "at.4rgi0fd15mhccwy15iiqiltl45zxrifl-5towx1yosh-0ewedhf-srkiejo2l",
          accessToken: accessToken,
          decoderPath: '.',
          // decoderPath: (process.env.VUE_APP_MOutputDir==='iosFamilyUser') ? 'localhost' : '',
          width: window.screen.width/1.11,//324
          height: window.screen.width/1.1/1.875,//173
          handleError: this.videoHandleError,
          handleSuccess: this.videoHandleSuccess
        });
        this.isVideoLoading = true;
      },
      showPlayback() {//视频实时和回放的切换
        utils.openBackVideo(this.myHomeInfo.yingShiAccessToken,this.cameraDeviceNumber);
        console.log(this.myHomeInfo.yingShiAccessToken,this.cameraDeviceNumber);
        // this.isPlayback = this.isPlayback ? false : true;
        // this.videoSwiperOptionBoxStyle = this.isPlayback ? {height: '63vw'} : {height: '55vw'}
      },
      changePlayBackTime(time) {//更改回放时间
        this.nowTime = this.nowTime + time;//todo 应该是通过接口获取上一个和下一个视频的日期
        this.nowTimeStr = utils.timetrans(this.nowTime, "yymmdd");
      },
      showVideoDatePicker() {//选择回放时间
        utils.hideTab().then((e)=>{
          if (!this.datePicker) {
            this.datePicker = this.$createDatePicker({
              title: '选择回放日期',
              min: new Date(2018, 7, 14),//todo 获取有视频回放的日期
              max: new Date(2030, 12, 12),
              value: new Date(this.nowTime),
              onSelect: this.selectHandle,
              onCancel: this.cancelHandle
            })
          }
          this.datePicker.show()
        });

      },
      selectHandle(date, selectedVal, selectedText) {//确定
        // utils.showTab().then((e)=>{
          this.nowTime = date.getTime();
          this.nowTimeStr = utils.timetrans(this.nowTime, "yymmdd");
          this.datePicker = undefined;
        // });
      },
      cancelHandle() {//取消
        // utils.showTab().then((e)=>{
          this.datePicker = undefined;
        // });
      },

      InitTabScroll(sum) {//视频滑动
        let width = 0, eachWidth = 0;
        // for (let i = 0; i < this.galleryDetail.photographs.length; i++) {
        // for (let i = 0; i < 18; i++) {
        // let len = this.hotBookList.length;
        let len = sum;
        for (let i = 0; i < 4; i++) {
          //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
          console.log("1111111111",width)
          console.log("222222222222",eachWidth)
          width += this.$refs.cameraListItem[0].getBoundingClientRect().width;
          eachWidth = this.$refs.cameraListItem[0].getBoundingClientRect().width;
        }
        // width = width + Math.round(eachWidth/3.6);
        // console.log("3333333",this.$refs.cameraListBox[0])
        // this.$refs.cameraListBox.style.width = width + 'px';

        this.$nextTick(()=>{
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.cameraListDiv, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh()
          }
        });
      },
    }
  };
</script>

<style scoped>
  .home-item-wrapper {
    width: 100vw;
    margin-bottom: 5vw;
    /*background-color: white;*/
    align-items: center;
  }
  .home-item-wrapper-padding {
    padding-bottom: 5vw;
  }
  .home-item-wrapper-padding-video {
    padding-bottom: 0.01vw;
  }
  .home-item-title-icon {
    width: 4.27vw;
    height: 4.27vw;
  }
  .home-item-title-box {
    height: 13.3333vw;
    background-color: white;
    border-radius: 1.0666vw;
    margin: 0 2.4vw 0 2.4vw;
    padding: 0 5.3333vw;
  }
  .home-item-machine-box {
    padding: 2.1333vw 2.4vw 0 2.4vw;
  }
  .home-item-title-text {
    color: black;
    font-weight: bold;
    font-size: 4vw;
  }
  .home-item-title-gray-text {
    color: #797C80;
    font-size: 3.2vw;
  }

  .home-item-title-video-btn {
    width: 13.33vw;
    height: 6.4vw;
    margin-top: 1.07vw;
    background-color: black;
    border-radius: 1.33vw;
  }
  .home-item-title-video-playback-box {
    width: 90vw;
    height: 8vw;
    background-color: #363E4D;
    border-radius: 0 0 1.33vw 1.33vw;
  }


</style>

<style lang="stylus" scoped>
  .camera-list-horizontal-scroll-list-wrap
    .cube-scroll-content
      display: inline-block;
      .list-wrapper
        line-height: 47.7333vw;
        white-space: nowrap;
        .list-item
          display: inline-block;

</style>