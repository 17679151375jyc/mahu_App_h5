<template>
  <div class="wrapper">
    <index-head :homeName="getNickName()"
                @editName="editName">
      <!--:rightText="'刷新'"-->
      <!--@rightOnClick="update"-->
      <!--rightText="我要报装"-->
      <!--:rightTextRightIcon="require('@/assets/icon/icon_add-blue.png')"-->
      <!--@rightOnClick="toInstallation">-->
    </index-head>
    <div v-if="myHomeInfoList.length>0" class="device-number">
      <p style="margin-right: 10.67vw"
         v-bind:class="{'device-number-color': isShowMyHome}"
         @click="showMyHome(true)">我的设备 </p>
      <!--{{ deviceSum}}-->
      <div class="base-horizontal-layout-general-item-center" @click="showMyHome(false)">
        <p v-bind:class="{'device-number-color': !isShowMyHome}">我的附近</p>
        <img :src="iconNearbySrc" class="base-icon-small-style" style="margin: 0 1.33vw">
      </div>
    </div>

    <div v-else class="base-vertical-layout-center-item-center" style="margin-top: 18.67vw">
      <img :src="require('@/assets/icon/icon_equipment.png')" style="width: 10.67vw;height: 5.6vw;margin-bottom: 2.67vw"/>
      <p style="font-size: 3.73vw;color: #8A9099;text-align: center;line-height: 7.47vw"
      >暂无配置区域<br>请联系安装人员配置防盗主机跟摄像头</p>
    </div>

    <div v-if="myHomeInfoList.length>0 && isShowMyHome"
         class="scroll-wrapper"
         style="top: 28.7333vw;bottom: 13.077777vw;overflow-y: scroll" >
      <!--overflow-y: scroll;overflow: auto;-webkit-overflow-scrolling: touch;-->
      <!--<cube-scroll-->
        <!--ref="homeScroll"-->
        <!--:options="scrollOptions"-->
        <!--:fade="true"-->
        <!--@pulling-down="onPullingDown"-->
        <!--@pulling-up="onPullingUp">-->
        <my-home-item v-for="(item,index) in myHomeInfoList"
                      :key="index"
                      :index="index"
                      :myHomeInfo="item"
                      @notificationMessageOnClick="showMessage"
                      @serviceMessageOnClick="toMyHomeWork"
                      @failureToDeclareOnClick="failureToDeclare"
                      @alertRequestOnClick="alertRequest"
                      @alarmOnClick="toAlarm"
                      @stayAlarmOnClick="toStayAlarm"

                      @showMsgCollectList="showMsgCollectList"
                      @alertMsgAlertOnClick="alertMsgAlertOnClick"
                      @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
                      @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
                      @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"

                      @callAlertPersonnelOnClick="callAlertPersonnelOnClick"

                      @closeMsgOnClick="closeMsgOnClick">
        </my-home-item>
        <!--@notificationMessageOnClick="showMessage"-->
        <!--@serviceMessageOnClick="toMyHomeWork"-->

        <!--<img src="static/assets/hahaha.gif">-->
      <!--</cube-scroll>-->
    </div>

    <!--我的附近-->
    <div v-if="!isShowMyHome"
         style="height: calc(100vh - 18.73vw - 10vw - 10vw)">
      <!--为了隐藏高德符号-->
      <a-map v-if="!isShowMyHome"
             :width="mapWidth"
             :height="mapHeight"
             :locationData="mapData">
      </a-map>
    </div>

    <!--:isSolidSureBtn="isSolidSureBtn"-->
    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                :isShowCloseIcon="isShowCloseIcon"
                :closeIconStyle="closeIconStyle"
                :isOtherMsgChoose="isOtherMsgChoose"
                :isOtherMsgAllChoose="isOtherMsgAllChoose"
                :isShowbtn="isShowbtn"
                :isCallShow="isCallShow"
                :phoneNumber="phoneNumber"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup"
                @closePoppup="closePoppup">
      <!--设置家庭名称-->
      <div v-if="popType === 'editName'">
        <input class="popup-input" v-model="changeHomeName" placeholder="请输入家庭名称" style="border:none;resize:none;outline:none"/>
      </div>
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--有回车的纯文字-->
      <div v-if="popType === 'plainTextEnter'" class="base-vertical-layout-center-item-center">
        <div class="popup-text" style="width: 53.33vw">
          <p>{{popPlainText}}</p>
          <p>{{popPlainText2}}</p>
        </div>
      </div>
      <!--打电话界面-->
      <div v-if="popType === 'callEnter'" class="base-vertical-layout-center-item-center">
        <div class="popup-text" style="width: 53.33vw">
          <p>{{popPlainText}}</p>
          <a id='dial' href="#">{{popPlainText2}}</a>
        </div>
      </div>
      <!--消息通知-->
      <div v-if="popType === 'showMessage'" style="margin-top: 6.4vw">
        <div v-if="otherMessageList.length==0"
             class="base-vertical-layout-center-item-center"
             style="height: 65vw">
          <img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">
          <p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>
        </div>
        <div v-else style="height: 65vw">
          <cube-scroll v-if="isOtherMsgChoose" ref="otherMsgList">
            <other-msg-item-choose v-for="(item,index) in otherMessageList"
                                   :key="index"
                                   :index="index"
                                   :otherMessage="item"
                                   @otherMsgChooseOnclick="otherMsgChoose">
            </other-msg-item-choose>
          </cube-scroll>
          <cube-scroll v-else ref="otherMsgList">
            <other-msg-item v-for="(item,index) in otherMessageList"
                            :key="index"
                            :otherMessage="item">
            </other-msg-item>
          </cube-scroll>
        </div>
      </div>
      <!--故障申报-->
      <div v-if="popType === 'failureToDeclare'" style="margin-top: 6.4vw">
        <!--<div class="base-horizontal-layout-general">-->
          <!--<p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">故障硬件</p>-->
          <!--<div style="width: 54.13vw;margin-left: 4vw">-->
            <!--<p v-for="(item,index) in mFailureToDeclareList" :key="index"-->
               <!--class="failure-to-declare-hardware-text"-->
               <!--v-bind:class="{'failure-to-declare-hardware-text-no-one-line-margin' : (index!=0)}">-->
                <!--<span v-for="(itemItem,indexIndex) in item" :key="indexIndex"-->
                      <!--v-bind:class="{'failure-to-declare-hardware-text-margin' : (indexIndex!=0),-->
                      <!--'failure-to-declare-hardware-text-choose' : (itemItem.choose===1)-->
                      <!--}" @click="chooseDeclareType(index, indexIndex)">{{itemItem.text}}</span>-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
        <div class="base-horizontal-layout-space-between" style="margin-top: 5.33vw">
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">标&emsp;&emsp;题</p>
          <div v-if="alertMsgNumber===''"
               style="width: 54.13vw;height: 7.67vw;background-color: #EDEEF0;margin-left: 3vw;border-radius: 1.33vw">
            <input id="inputName"
                   style="padding: 1vw 2.67vw;width: 50vw;height: 5vw;background: transparent;
                               border:solid 0 #00000000;resize:none;outline:none;
                               font-size: 3.2vw;color: #808080"
                   placeholder="不多于8个字"
                   maxlength="8"
                   v-model="alertMsgName"
                   @blur="lostInputFocus" @focus="getInputFocus"/>
          </div>
          <div v-else style="width: 54.13vw;height: 7.67vw;margin-top: 1.6vw;margin-left: 3vw">
            <p style="font-size: 3.2vw;color: #808080;margin: 0 2vw">{{alertMsgName}}</p>
          </div>
        </div>
        <div class="base-horizontal-layout-space-between" style="margin-top: 5.33vw">
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">问题描述</p>
          <div v-if="alertMsgOrderTime===0" style="width: 54.13vw;height: 18.67vw;background-color: #EDEEF0;margin-left: 3vw;border-radius: 1.33vw">
            <textarea id="textareaName"
                      style="padding: 1vw 2vw;width: 50vw;height: 16vw;background: transparent;
                               border: none;resize: none;outline:none;
                               font-size: 3.2vw;color: #808080"
                      placeholder="请简略的描述下您遇到的问题~"
                      maxlength="39"
                      v-model="alertMsgContent"
                      @blur="lostInputFocus" @focus="getInputFocus"/>
          </div>
          <div v-else style="width: 54.13vw;height: 18.67vw;;margin-top: 1vw;margin-left: 3vw;border-radius: 1.33vw">
            <div style="margin: 1vw 2vw">
              <p style="width: 50vw;height: 16vw;font-size: 3.2vw;color: #808080">{{alertMsgContent}}</p>
            </div>
          </div>
        </div>
        <div class="base-horizontal-layout-space-between" style="margin-top: 5.33vw">
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">预约时间</p>
          <div class="base-horizontal-layout-general-item-center"
               style="width: 54.13vw;height: 6.93vw;background-color: #EDEEF0;justify-content: flex-end;
                      box-sizing: border-box;padding: 0 1.33vw;border-radius: 1.33vw"
               @click="showDeclareDatePicker">
            <p class="base-text-details-normal-gray-dark" style="font-size: 3.47vw">{{nowTimeStr}}</p>
            <img :src="require('@/assets/icon/icon_date.png')"
                 style="width: 3.73vw;height: 3.73vw;margin-left: 1.87vw">
          </div>
        </div>
      </div>
      <!--请求报警-->
      <div v-if="popType === 'alertRequest'" style=""><!--margin-top: 6.4vw-->

        <div class="base-vertical-layout-center-item-center" style="width: 100%">
          <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
        </div>


        <!--<div class="base-horizontal-layout-space-between" style="margin-top: 5.33vw">-->
          <!--<p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">标题</p>-->
          <!--<div style="width: 54.13vw;height: 7.67vw;background-color: #EDEEF0;margin-left: 3vw;border-radius: 1.33vw">-->
            <!--<div style="margin: 1vw 2.67vw">-->
              <!--<input style="width: 50vw;height: 5vw;background-color: #00000000;-->
                               <!--border:solid 0 #00000000;resize:none;outline:none;-->
                               <!--font-size: 3.2vw;color: #808080"-->
                     <!--placeholder="不多于六个字"-->
                     <!--maxlength="6"-->
                     <!--v-model="alertMsgName"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--故障警报弹窗-->
      <div v-if="popType === 'alarmProcessing'" class="base-vertical-layout-center-item-center">
        <img :src="require('@/assets/icon/icon_alert.png')" style="width: 8vw;height: 8vw">
        <div class="popup-text" style="width: 53.33vw">
          <p>{{popPlainText}}</p>
          <p>{{popPlainText2}}</p>
        </div>
      </div>
      <!--消息汇总弹窗-->
      <div v-if="popType === 'showMsgCollectList'" style="height: 85.34vw">
        <cube-scroll>
          <div v-for="(item,index) in mMsgCollectList" :key="index"
               class="base-horizontal-layout-space-between-item-center" style="margin-top: 4vw">
            <div class="base-vertical-layout-general">
              <p class="base-text-details-normal-black-light">{{item.title}}</p>
              <p class="base-text-details-normal-black-light" style="color: #999999;margin-top: 1.33vw">{{item.location}}-{{item.defenceArea}}</p>
            </div>
            <p class="base-text-details-normal-gray-light" style="color: #AAADB3">{{item.time}}</p>
          </div>
        </cube-scroll>
      </div>
      <!--过期提醒-->
      <div v-if="popType === 'pastDue'" class="base-vertical-layout-center-item-center">
        <div class="popup-text" style="width: 53.33vw">
          <p>亲爱的用户，您的 <span style="color: #3388FF">{{plotName}}</span> 服务</p>
          <p>套餐时间还剩余<span style="color: #3388FF">{{countDownStr}}</span></p>
        </div>
      </div>
    </base-popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import indexHead from '_c/myHome/head/index-head';
  import basePopup from '_c/popup/base-popup';
  import myHomeItem from '_c/myHome/my-home-item';
  import otherMsgItem from '_c/myHome/message/other-msg-item'
  import otherMsgItemChoose from '_c/myHome/message/other-msg-item-choose'
  import Input from "cube-ui/src/components/input/input";
  import aMap from "_c/myHome/map";
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import carousel from "_c/inAndOut/carousel";

  export default {
    name: "my-home",
    components: {
      Input,
      indexHead,
      basePopup,
      myHomeItem,
      otherMsgItem,
      otherMsgItemChoose,
      aMap,

      carousel,
      swiper,
      swiperSlide
    },
    data() {
      return {
        userInfo: {},

        scrollOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: false
        },

        iconNearbySrc: require('./icon_nearby-gray.png'),
        isShowMyHome: true,
        homeName: '',
        deviceSum: 0,
        homeList: [],
        changeHomeName: '',
        maxLength: 16*2,//todo 限制字符输入长度
        isOtherMsgChoose: false,
        isOtherMsgAllChoose: false,
        nowTime: 0,
        nowTimeStr: '',

        // 弹窗属性
        isPopShow: false,
        refId: 'myHomePopup',
        popTitle: '',
        popType: '',
        popPlainText: '',
        popPlainText2: '',
        popCancelText: '',
        popSureText: '',
        // isSolidSureBtn: false,
        isShowCloseIcon: false,
        closeIconStyle: {},
        isShowbtn: true,
        // 弹窗参数
        plainTextType: '',//toIsToAlarm操作防盗主机 callSecure请求出警 misAlert误报 misMaintain忽略
        toIsAlarm: '',//布防 or 留守布防 or 撤防
        machineNumber: [],//主机号
        machineAccount: [],//主机序列号
        alertMsgNumber: '',//工单单号
        alertMsgType: '',//工单类型
        alertMsgName: '',//工单名称
        alertMsgContent: '',//工单描述
        alertMsgOrderTime: 0,//工单预约时间
        plotName: '',//社区名称
        countDownStr: '',//倒计时Str
        //call弹窗
        isCallShow: false,
        phoneNumber: '',

        // 记录操作中的子组件序号
        homeIndex: -1,
        alertMsgIndex: -1,

        myHomeInfoList: [],

        failureToDeclareList: [
          {choose: 1, text: "防盗主机"},
          {choose: 0, text: "门磁"},
          {choose: 0, text: "SOS紧急"},
          {choose: 0, text: "红外"},
          {choose: 0, text: "摄像头"},
          {choose: 0, text: "其它"}
          // {choose: 0, text: "其它其它它"},
          // {choose: 0, text: "其它其它其它"},
          // {choose: 1, text: "防盗主机"},
          // {choose: 0, text: "门磁"},
          // {choose: 0, text: "SOS紧急"},
          // {choose: 0, text: "摄像头"},
          // {choose: 0, text: "红外"}
        ],
        mFailureToDeclareList: [],
        otherMessageList: [],
        // isShowbtn: true,
        otherMessageList1: [
          {
            msgText: "的房价高ID噢房价高东方家股东覅鸡哥IDof鸡哥的覅鸡哥都发京东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1546275661000,
            isChoose: false,
          },
          {
            msgText: "的房价高ID噢房价高东方家股东覅鸡哥IDof鸡哥的覅鸡哥都发京东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1548954061000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1549764610000,
            isChoose: false,
          },
          {
            msgText: "时代峻峰的房价干豆腐价格低房管局",
            time: 1550628610000,
            isChoose: false,
          },
          {
            msgText: "sssssssssssssssssssssssssssssssss",
            time: 1551366671000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          }
        ],
        otherMessageList2: [
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          },
          {
            msgText: "的房价高东方is冬季是的覅几时答复is东方忌手动阀",
            time: 1551453071000,
            isChoose: false,
          }
        ],

        labelBorderColor1: {borderColor: '#5C7599'},
        labelBorderColor2: {borderColor: '#198080'},
        labelBorderTextColor1: {color: '#5C7599'},
        labelBorderTextColor2: {color: '#198080'},
        mMsgCollectList: [],//消息汇总列表

        // 地图模块
        mapWidth: "100%",
        mapHeight: "100%",
        mapData: {
          /**   staff: {
         *      staffIcon: './static/assets/icon/map-scu.png',   //图标，现在没用上
         *      staffLocation: [ [113.07454,22.5821],[113.07854, 22.5271],]  //安保人员的经纬坐标
         *      },
           *   WITHINNUMBER: 3000,   //给定的范围，单位m}
           **/
        },
      }
    },
    beforeCreate() {
      //地图 尝试移除旧的本地数据,即使不存在也不会报错
      localStorage.removeItem("locationData");
    },
    created() {
      console.log("my-home",this.mAppPath);
      let self = this;

      // let stringLen = 0, failureToDeclareArrayCount = [];
      // for (let count = 0; count < self.failureToDeclareList.length; count++) {
      //   stringLen = stringLen + utils.getStringLen(self.failureToDeclareList[count].text);
      //   if (stringLen > 20) {
      //     self.mFailureToDeclareList.push(failureToDeclareArrayCount);
      //     failureToDeclareArrayCount = [];
      //     failureToDeclareArrayCount.push(self.failureToDeclareList[count]);
      //     stringLen = utils.getStringLen(self.failureToDeclareList[count].text);
      //   } else {
      //     failureToDeclareArrayCount.push(self.failureToDeclareList[count]);
      //   }
      // }
      // self.mFailureToDeclareList.push(failureToDeclareArrayCount);

      // this.homeList = [
      //   {
      //     otherMessageList: this.otherMessageList1//todo
      //   }
      // ];

      setTimeout(()=>{
        self.getNearbyInfo();
      },200)
    },
    mounted() {
      let self = this;
      // self.deviceSum = 4;

      setTimeout(() => {
        self.userInfo = self.mUserInfo;
        self.getMyHomeInfoList();
      },200)
    },
    computed: {
      ...mapState({
        'mUserInfo': state => state.user.userInfo,
        'mAppPath': state => state.user.appPath,
        'mUserPhone': state => state.user.userPhone,
        'mUserNickName': state => state.user.userNickName,
        'mPushInfo': state => state.user.pushInfo
      })
    },
    watch: {
      //监听路由变化
      $route( to , from ) {
        let self = this;
        if (to.path === "/my-home") {
          // utils.showTab().then((e)=>{
            self.getMyHomeInfoList();
          // });
        }
      },

      isOtherMsgChoose() {
        this.popCancelText = this.isOtherMsgChoose ? "全选" : "批量删除";
        this.popSureText = this.isOtherMsgChoose ? "删除" : "全部已读";
      },

      // mPushInfo() {// 收到推送，刷新页面
      //   let self = this;
      //   console.log(self.mPushInfo);
      //   self.getMyHomeInfoList();
      // }
    },
    methods: {
      ...mapActions(
        ['setIsShowOtherPop', 'setMyHomeWork']
      ),
      // getNickName() {
      //   let self = this;
      //   // let str ="的家" + ("b" + "a" + + "a" + "a").toLowerCase();//彩蛋
      //   let str ="的家";
      //   self.homeName = ((self.userInfo.infos.nickName===null || self.userInfo.infos.nickName==="") ?
      //     utils.hiddenPhoneNum(self.userInfo.infos.userPhone) : self.userInfo.infos.nickName) + str;
      // },
      getNickName() {//获取家的名称
        // let str ="的家" + ("b" + "a" + + "a" + "a").toLowerCase();//彩蛋
        let str ="的家";
        return ((this.mUserNickName === null || this.mUserNickName === undefined ||  this.mUserNickName === "") ?
          utils.hiddenPhoneNum(this.mUserPhone) : this.mUserNickName) + str;
      },
      getMyHomeInfoList () {
        let self = this;
        // setTimeout(() => {//todo 操作的才要加延时
          self.$post("hArea","/getMyAreaLists",{}).then((res)=>{
            self.myHomeInfoList = [...res.data];
            console.log("my-home接口","/getMyAreaLists");
            if (process.env.NODE_ENV==='development') {//todo 完成的话去掉
              // self.showPastDue("里程花园","9天23小时");//todo 判断是否有过期的
            }
          });
        // }, 3000);
      },

      getNearbyInfo() {
        let self = this;
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
          });
          geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
              console.log("我的定位",result.position);
              self.$post("hCommon","/getNearby",{lng:result.position.lng, lat:result.position.lat}).then((res)=>{//todo
                let staffLocation = [];
                res.data.forEach((item) => {
                  staffLocation.push([item.longitude, item.latitude]);
                });
                if (staffLocation.length === res.data.length) {
                  //地图 模拟取得数据后的异步操作，当locationData为空时将不加载地图
                  setTimeout(() => {
                    self.mapData = {
                      staff: {
                        staffIcon: "static/assets/icon/map-scu.png", //图标，现在没用上
                        staffLocation: staffLocation //安保人员的经纬坐标
                      },
                      WITHINNUMBER: 3000 //给定的范围，单位m}
                    };
                  }, 200);
                }
              });
            } else {
              const toast = this.$createToast({
                type: "warn",
                txt: "定位失败"
              });
              toast.show();
              console.log(result)
            }
          });
        });



        // //地图 模拟取得数据后的异步操作，当locationData为空时将不加载地图
        // setTimeout(() => {
        //   self.mapData = {
        //     staff: {
        //       staffIcon: "static/assets/icon/map-scu.png", //图标，现在没用上
        //       staffLocation: [[113.06954, 22.5801],[113.06954, 22.5721], [113.07864, 22.5801],[113.07854, 22.5271]] //安保人员的经纬坐标
        //     },
        //     WITHINNUMBER: 3000 //给定的范围，单位m}
        //   };
        // }, 200);
      },

      showMyHome(isShowMyHome) {
        this.isShowMyHome = isShowMyHome;
        this.iconNearbySrc = this.isShowMyHome ? require("./icon_nearby-gray.png") : require("./icon_nearby-choose.png");

        // if(this.isShowMyHome) {
        //   return;
        // } else {
        //   this.getNearbyInfo();
        // }
      },

      editName(e) {
        this.popTitle = "设置家庭名称";
        this.popType = "editName";
        this.popSureText = "保存";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.changeHomeName = this.homeName;
          this.isPopShow = true;
        // });
      },
      update() {
        this.getMyHomeInfoList();
      },
      toInstallation(e) {//转到我要报装页面
        this.$router.push({ path: "/my-home/installation", query: {}});
      },
      showMessage(e) {
        this.otherMessageList = [];//打开通知消息对话框时，获取接口通知消息数据
        for (let count = 0; count < this.homeList[0].otherMessageList.length; count++) {
          //todo 需要传homeList参数，和增加isChoose字段供本地使用
          this.otherMessageList.push(this.homeList[0].otherMessageList[count]);
        }
        this.isShowbtn = (this.otherMessageList.length==0) ? false : true;

        this.popTitle = "通知消息-" + this.homeName;
        this.popType = "showMessage";
        this.popCancelText = "批量删除";
        this.popSureText = "全部已读";
        this.isShowCloseIcon = true;
        this.closeIconStyle = {marginTop: '9.47vw'};
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      otherMsgChoose(e) {
        let isOtherMsgAllChoose = true;
        this.otherMessageList[e.index].isChoose = this.otherMessageList[e.index].isChoose ? false : true;
        for (let count = 0; count<this.otherMessageList.length; count++) {
          if (!this.otherMessageList[count].isChoose) {
            isOtherMsgAllChoose = false;
          }
        }
        this.isOtherMsgAllChoose = isOtherMsgAllChoose;
      },
      otherMsgAllChoose(e) {
        for (let count = 0; count<this.otherMessageList.length; count++) {
          this.otherMessageList[count].isChoose = this.isOtherMsgAllChoose ? false : true;
        }
        this.isOtherMsgAllChoose = this.isOtherMsgAllChoose ? false : true;
      },
      toMyHomeWork(e) {
        this.$router.push({ path: "/my-home/work", query: { areaNumber: e.areaNumber }});
      },
      failureToDeclare(e) {//点击申报维修
        this.nowTime =  new Date().getTime();
        this.nowTimeStr = utils.timetrans(this.nowTime, "yymmddhhmm");
        this.popTitle = "申报维修";//this.userInfo.infos.nickName+"-申报维修"
        this.alertMsgName = "申报维修";
        this.popType = "failureToDeclare";
        this.machineAccount.push(e.machineAccount);
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then(()=>{
          this.isPopShow = true;
        // });
      },
      // chooseDeclareType(index, indexIndex) {//选择故障硬件
      //   for (let count = 0;count < this.mFailureToDeclareList.length;count++) {
      //     if (count === index) {
      //       for (let countCount = 0;countCount < this.mFailureToDeclareList[index].length;countCount++) {
      //         if (countCount === indexIndex) {
      //           this.mFailureToDeclareList[count][countCount].choose = 1;
      //         } else {
      //           this.mFailureToDeclareList[count][countCount].choose = 0;
      //         }
      //       }
      //     } else {
      //       for (let countCount = 0;countCount < this.mFailureToDeclareList[index].length;countCount++) {
      //         this.mFailureToDeclareList[count][countCount].choose = 0;
      //       }
      //     }
      //   }
      // },

      /*** 时间选择器 ***/
      showDeclareDatePicker() {//选择预约时间
        let self = this;
        let now = (this.alertMsgOrderTime<(new Date().getTime()))?new Date():new Date(this.alertMsgOrderTime);
        let valueTime = (this.alertMsgOrderTime<(new Date().getTime())) ? new Date() : new Date(this.nowTime);
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: '选择预约时间',
            min: new Date(),
            max: new Date(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes()),
            value: valueTime,
            columnCount: 5,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        self.dateTimePicker.show();
      },
      selectHandle(date, selectedVal, selectedText) {//确定
        let self = this;
        this.nowTime = date.getTime();
        this.nowTimeStr = utils.timetrans(this.nowTime, "yymmddhhmm");
        self.dateTimePicker = undefined;
      },
      cancelHandle() {//取消
        let self = this;
        self.dateTimePicker = undefined;
      },
      /*** 时间选择器 ***/

      getAlertInfo(locationName) {
        this.popTitle = "";
        this.popType = "alarmProcessing";
        this.popPlainText = locationName+" 发生报警，";
        this.popPlainText2 = "请及时处理";
        this.popCancelText = "进入报警消息";
        this.popSureText = "留下查看视频";
        this.isShowCloseIcon = true;
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      alertRequest(e) {

        this.popPlainText = "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";//todo

        this.popType = "alertRequest";
        this.popTitle = "请求出警";
        // this.popTitle = this.userInfo.infos.nickName===""? this.userInfo.infos.userPhone : this.userInfo.infos.nickName +"-请求出警";
        this.alertMsgName = "手动请求出警";
        this.machineAccount.push(e.machineAccount);
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      toAlarm(e) {
        this.popType = "plainText";
        this.plainTextType = "toIsToAlarm";
        if (e.isAlarm==="撤防") {
          this.toIsAlarm = "布防";
          this.machineNumber.push(e.machineNumber);
          this.popTitle = "布防";
          this.popPlainText = "您确定要布防么？";
        } else {
          this.toIsAlarm = "撤防";
          this.machineNumber.push(e.machineNumber);
          this.popTitle = "撤防";
          this.popPlainText = "您确定要撤防么？";
        }
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      toStayAlarm(e) {
        this.popType = "plainText";
        this.plainTextType = "toIsToAlarm";
        if (e.isAlarm==="撤防") {
          this.toIsAlarm = "留守布防";
          this.machineNumber.push(e.machineNumber);
          this.popTitle = "留守布防";
          this.popPlainText = "您确定要留守布防么？";
        }
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      alertMsgAlertOnClick(e) {//消息中点击报警
        this.alertMsgNumber = e.alertMsgNumber;
        this.popType = "plainText";
        this.plainTextType = "callSecure";
        this.popTitle = "请求出警";
        // this.popTitle = e.name+"-请求出警";
        // this.popTitle = this.userInfo.infos.nickName+"-请求出警";
        this.popPlainText = "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      misAlertMsgAlertOnClick(e) {//消息中点击误报
        this.alertMsgNumber = e.alertMsgNumber;
        this.popType = "plainText";
        this.plainTextType = "misAlert";
        this.popTitle = "误报";
        this.popPlainText = "是否确定该报警是误报，确定之后该报警将不再处理！";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      callAlertPersonnelOnClick(e) {//消息中点击联系安保、联系维保
        this.isCallShow = true;
        this.phoneNumber = e.phone;
        this.popTitle = (e.messageType==="报警") ? "联系安保" : (e.messageType==="维保") ? "联系维保" : "";
        this.popType = "callEnter";
        this.popPlainText = "即将拨号";
        this.popPlainText2 = e.phone;
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      alertMsgMaintainOnClick(e) {//消息中点击申报维修
        this.alertMsgNumber = e.alertMsgNumber;
        this.alertMsgName = e.alertMsgName;
        this.alertMsgContent = e.alertMsgContent;
        this.alertMsgOrderTime = e.alertMsgOrderTime*1000;
        this.nowTime =  e.alertMsgOrderTime===0?new Date().getTime():new Date(this.alertMsgOrderTime).getTime();
        this.nowTimeStr = utils.timetrans(e.alertMsgOrderTime===0?this.nowTime:e.alertMsgOrderTime, "yymmddhhmm");
        this.popTitle = "申报维修";//this.userInfo.infos.nickName+"-申报维修"
        this.alertMsgName = "申报维修";
        this.popType = "failureToDeclare";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      misAlertMsgMaintainOnClick(e) {//消息中点击忽略
        this.alertMsgNumber = e.alertMsgNumber;
        this.popType = "plainText";
        this.plainTextType = "misMaintain";
        this.popTitle = "忽略";
        this.popPlainText = "是否忽略该维保，确定之后该维保将不再处理！";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      showMsgCollectList(e) {//消息中点击消息汇总
        this.popTitle = "消息汇总";
        this.popType = "showMsgCollectList";
        this.isShowbtn = false;
        this.mMsgCollectList = [];
        let self = this;
        if(e.type==="") {
          return;
        } else {
          self.$post("aMMessageAmass",e.type==="报警" ? "/getAlertAmassList" : e.type==="维保" ? "/getMaintainAmassList": "",
            e.type==="报警" ? {alertNumber: e.number} : e.type==="维保" ? {maintainNumber: e.number} : {}).then((res)=>{
            for (let count = 0;count < res.data.length; count++) {
              this.mMsgCollectList.push({
                title: res.data[count].name,
                location: e.location,
                defenceArea: (res.data[count].defenceAreaName === null || res.data[count].defenceAreaName === undefined
                || res.data[count].defenceAreaName === "") ?
                  "全屋" : res.data[count].defenceAreaName,
                time: utils.timetrans(res.data[count].createTime)
              })
            }
          });
        }
        this.isShowCloseIcon = true;
        this.closeIconStyle = {marginTop: "9.47vw"};
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      closeMsgOnClick(e) {//消息中点击关闭消息
        this.alertMsgNumber = e.alertMsgNumber;
        this.alertMsgType = e.messageType;
        this.popTitle = "确认关闭";
        this.popType = "plainTextEnter";
        this.popPlainText = "您的评价对服务人员至关重要，";
        this.popPlainText2 = "给服务人员一个好评吧！";
        this.popCancelText = "继续关闭";
        this.popSureText = "前往评价";
        this.homeIndex = e.homeIndex;
        this.alertMsgIndex = e.alertMsgIndex;
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },
      showPastDue(plotName, countDown) {//弹出过期提示
        this.popTitle = "温馨提醒";
        this.popType = "pastDue";
        this.plotName = plotName;
        this.countDownStr = countDown;
        this.popCancelText = "忽略";
        this.popSureText = "前往查看";
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then((e)=>{
          this.isPopShow = true;
        // });
      },

      //弹出对话框的点击方法
      leftBtnPoppup(e) {
        let self = this;
        switch (this.popType) {
          case 'editName'://设置家庭名称
            if(this.popType === 'editName') {
              this.setIsShowOtherPop(false);
              // utils.maskTabHide().then((e)=>{
                this.isPopShow = false;
              // });
            }
            break;
          case 'plainText':

            break;
          case 'plainTextEnter'://联系安保维保、关闭消息
            if(this.homeIndex === -1) {
              this.setIsShowOtherPop(false);
              // utils.maskTabHide().then((e)=>{
                this.isPopShow = false;
              // });
            } else {
              if(this.alertMsgIndex === -1) {
                //todo 可能是删除某个家
              } else {//关闭消息
                if(self.alertMsgType==="报警" || self.alertMsgType==="维保") {
                  self.$post(self.alertMsgType==="报警"?"alertMessage":"maintainMessage", "/close", {
                    number: self.alertMsgNumber
                  }).then((res) => {
                    const toast = this.$createToast({
                      type: "correct",
                      txt: "消息已关闭"
                    });
                    toast.show();
                    self.getMyHomeInfoList();
                  });
                } else {
                  this.setIsShowOtherPop(false);
                  // utils.maskTabHide().then((e)=>{
                    this.isPopShow = false;
                  // });
                }
              }
            }
            break;
          case 'showMessage':
            for (let count = 0; count<this.otherMessageList.length; count++) {
              this.otherMessageList[count].isChoose = false;
            }
            this.isOtherMsgAllChoose = false;
            this.isOtherMsgChoose = this.isOtherMsgChoose ? false : true;
            break;
          case 'failureToDeclare':
            this.setIsShowOtherPop(false);
            // utils.maskTabHide().then((e)=>{
              this.isPopShow = false;
            // });
            break;
          case 'alertRequest':
            this.setIsShowOtherPop(false);
            // utils.maskTabHide().then((e)=>{
              this.isPopShow = false;
            // });
            break;
          default:
            break;
        }
        if (!this.isPopShow) {
          this.popCancelText = "";
          this.popSureText = "";
          this.isShowCloseIcon = false;
          this.homeIndex = -1;
          this.alertMsgIndex = -1;
        }
        this.clearPoppupParameter();
        this.setIsShowOtherPop(false);
        // utils.maskTabHide().then((e)=>{
          this.isPopShow = false;
        // });
      },
      rightBtnPoppup(e) {
        let self = this;
        switch (this.popType) {
          case 'editName':
            if (this.changeHomeName === "")
            {
              const toast = this.$createToast({
                type: "warn",
                txt: "家庭名称不能为空"
              });
              toast.show();
            } else {
              if (this.changeHomeName.length > 16) {
                const toast = this.$createToast({
                  type: "warn",
                  txt: "家庭名称不能多于十六个字"
                });
                toast.show();
              } else {
                this.homeName = this.changeHomeName;
              }
            }
            break;
          case 'plainText':
            switch (this.plainTextType) {
              case 'toIsToAlarm'://布撤防
                self.machineNumber.forEach((item) => {
                  self.$post("machine", "/updateStatus", {
                    machineNumber: item,
                    status: self.toIsAlarm
                  }).then((res) => {
                    // const toast = this.$createToast({
                    //   type: "correct",
                    //   txt: "已"+self.toIsAlarm+"成功"
                    // });
                    // toast.show();
                    // self.getMyHomeInfoList();
                  });
                });
                break;
              case 'callSecure'://出警
                self.$post("alertMessage", "/callSecure", {
                  number: self.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "已成功申请出警"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
                break;
              case 'misAlert'://误报
                self.$post("alertMessage", "/mistake", {
                  number: this.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "操作已成功"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
                break;
              case 'misMaintain'://忽略
                self.$post("maintainMessage", "/ignore", {
                  number: this.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "维保已忽略成功"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
                break;
              default:
                break;
            }
            break;
          case 'plainTextEnter'://前往评价
            if(this.homeIndex === -1) {
              this.setIsShowOtherPop(false);
              // utils.maskTabHide().then((e)=>{
                this.isPopShow = false;
              // });
            } else {
              if(this.alertMsgIndex === -1) {
                //todo 可能是删除某个家
              } else {//前往评价
                utils.localStorage("myWordInfoNum", this.alertMsgNumber);
                this.clearPoppupParameter();
                this.$router.push({ path: "/ma-hu-index/work-details", query: {messageType: this.alertMsgType}});
                this.setIsShowOtherPop(false);
                // utils.maskTabHide().then((e)=>{
                  this.isPopShow = false;
                // });
              }
            }
            break;
          case 'showMessage':
            if (this.isOtherMsgChoose) {
              for (let count = this.otherMessageList.length - 1; count >= 0; count--) {
                if (this.otherMessageList[count].isChoose) {
                  this.otherMessageList.splice(count, 1);
                }
              }
              this.isShowbtn = (this.otherMessageList.length==0) ? false : true;
            }
            break;
          case 'alarmProcessing':
            this.isPopShow = false;
            break;
          case 'failureToDeclare':
            this.isPopShow = false;//todo 处理一下
            if (this.alertMsgNumber === "") {
              if (this.alertMsgName === "") {
                const toast = this.$createToast({
                  type: "warn",
                  txt: "请填写标题"
                });
                toast.show();
                return;
              } else {
                self.$post("maintainMessage", "/request", {
                  machineAccount: this.machineAccount[0],
                  name: this.alertMsgName,
                  content: this.alertMsgContent,
                  orderTime: Math.floor(this.nowTime/1000),
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "故障申报已提交"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
                // this.machineAccount.forEach((item) => {
                //   self.$post("maintainMessage", "/request", {
                //     machineAccount: item,
                //     name: this.alertMsgName,
                //     content: this.alertMsgContent,
                //     orderTime: Math.floor(this.nowTime/1000),
                //   }).then((res) => {
                //     const toast = this.$createToast({
                //       type: "correct",
                //       txt: "故障申报已提交"
                //     });
                //     toast.show();
                //     self.getMyHomeInfoList();
                //   });
                // });
              }
            } else {
              if(self.alertMsgOrderTime===0) {
                self.$post("maintainMessage", "/callMaintain", {
                  number: this.alertMsgNumber,
                  content: this.alertMsgContent,
                  orderTime: Math.floor(this.nowTime/1000),
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "故障申报已提交"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
              } else {
                self.$post("maintainMessage", "/order", {
                  number: this.alertMsgNumber,
                  orderTime: Math.floor(this.nowTime/1000),
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "时间已修改"
                  });
                  toast.show();
                  self.getMyHomeInfoList();
                });
              }
            }
            break;
          case 'alertRequest':
            this.isPopShow = false;//todo 处理一下
            if (self.alertMsgName === "") {
              // const toast = this.$createToast({
              //   type: "warn",
              //   txt: "请填写标题"
              // });
              // toast.show();
              // return;

              self.alertMsgName = "紧急报警";
            }
            // else {
            //
            // }
            self.machineAccount.forEach((item) => {
              self.$post("alertMessage", "/request", {
                machineAccount: item,
                name: self.alertMsgName
              }).then((res) => {
                const toast = this.$createToast({
                  type: "correct",
                  txt: "请求出警已提交"
                });
                toast.show();
                self.getMyHomeInfoList();
              });
            });

            break;
          default:
            break;
        }

        this.clearPoppupParameter();
        // utils.maskTabHide().then((e) => {
        this.setIsShowOtherPop(false);
          this.isPopShow = false;
        // });
      },
      closePoppup(e) {
        this.setIsShowOtherPop(false);
        // utils.maskTabHide().then((e)=>{
          this.isOtherMsgChoose = false;
          this.isOtherMsgAllChoose = false
          this.isPopShow = false;
          switch (this.popType) {
            case 'showMessage'://操作完通知消息之后，更新接口数据
              this.homeList = [
                {
                  otherMessageList: this.otherMessageList2//todo
                }
              ];
              break;
            default:
              break;
          }
          if (!this.isPopShow) {
            this.homeIndex = -1;
            this.alertMsgIndex = -1;
          }
        // });
        this.clearPoppupParameter();
      },
      clearPoppupParameter() {//清空弹窗参数
        this.popCancelText = "";
        this.popSureText = "";
        this.isShowCloseIcon = false;
        this.isShowbtn =  true;

        this.plainTextType = "";
        this.toIsAlarm = "";
        this.machineNumber = [];
        this.machineAccount = [];
        this.alertMsgNumber = "";
        this.alertMsgName = "";
        this.alertMsgContent = "";
        this.alertMsgOrderTime = 0;
        this.isCallShow = false;
        this.phoneNumber = "";
        this.plotName = "";
        this.countDownStr = "";
      },

      // 输入框获得焦点、失去焦点
      getInputFocus() {
        utils.hideTab().then((e)=>{
        });
      },
      lostInputFocus() {
        // utils.showTab().then((e)=>{
        // });
      },

      // 刷新
      onPullingDown() {
        let self = this;
        setTimeout(() => {
          self.getMyHomeInfoList();
          self.$refs.homeScroll.forceUpdate();
        }, 10);
      },
      onPullingUp() {
        let self = this;
        self.$refs.homeScroll.forceUpdate();
      },
    }
  };
</script>

<style scoped>
  .device-number {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10vw;
    margin: 0 5vw;
    font-size: 3.2vw;
    color: #808080;
  }
  .device-number-color {
    color: #3388FF;
  }

  .failure-to-declare-hardware-text {
    font-size: 3.2vw;
    color: #B3B3B3;
    margin-top: 1.6vw;
  }
  .failure-to-declare-hardware-text-no-one-line-margin {
    margin-top: 3.2vw;
  }
  .failure-to-declare-hardware-text-margin {
    margin-left: 5.33vw;
  }
  .failure-to-declare-hardware-text-choose {
    color: #3388FF;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }


  .inAndOut-wrapper {
    background: linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(51, 136, 255, 1));
    background-repeat: no-repeat;
    background-size: 100% 68%;
  }
  .container {
    background: linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(51, 136, 255, 1));
    background-repeat: no-repeat;
    background-size: 100% 68%;
  }
</style>
