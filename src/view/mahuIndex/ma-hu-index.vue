<!--@Time  : 2019/09/18 14:35-->
<!--@Author: michael huang-->
<!--@File  : ma-hu-index.vue-->

<template>
  <div class="wrapper index-wrapper">
    <!--style="margin-top: 8vw"-->
    <!-- <div
      v-if="isBusiness || isFamily || isGate"
      class="base-horizontal-layout-general-item-end"
      style="height: 11.7333vw;padding: 3.7333vw 5.3333vw 0 5.3333vw;box-sizing: border-box;background-color: white"
    >
      <p
        v-for="(item,index) in tabLabels"
        :key="index"
        style="margin-right: 5.3333vw"
        :style="item.isHighlight?
         'font-size: 5.8666vw;color: #333;font-weight: bold':
         'font-size: 5.2666vw;color: #ccc;'"
        @click="tabOnClick(index,item.label)"
      >{{item.label}}</p>
    </div> -->

    <div class="base-horizontal-layout-general">
      <cube-tab-bar
        class="index-top-menu"
        v-model="selectedLabel"
        v-if="isBusiness || isFamily || isGate"
        @click="tabOnClick">
        <cube-tab
          v-for="(item, index) in tabLabels"
          :key="index"
          :label="item.label">
        </cube-tab>
      </cube-tab-bar>
      <div class="base-horizontal-layout-center-item-center"
           style="flex: 1;background-color: white"
           @click="openScan">
        <img :src="require('@/assets/icon/icon-scan.png')" class="base-icon-large-style">
      </div>
    </div>

    <cube-tab-panels
      class="index-tab-panels"
      v-model="selectedLabel"
      v-if="isBusiness || isFamily || isGate">
      <!-- 商企 -->
      <cube-tab-panel v-if="isBusiness" :label="'马虎商企'">
        <my-business-index
          v-if="isBusiness"
          @showMsgCollectList="showMsgCollectList"
          @alertMsgAlertOnClick="alertMsgAlertOnClick"
          @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
          @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
          @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
          @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
          @closeMsgOnClick="closeMsgOnClick"
          @serviceMessageOnClick="toMyHomeWork"
          @failureToDeclareOnClick="failureToDeclare"
          @alarmOnClick="toAlarm"
          @stayAlarmOnClick="toStayAlarm"
        ></my-business-index>
      </cube-tab-panel>

      <!-- 马虎 -->
      <cube-tab-panel v-if="isFamily" :label="'马虎'">
        <my-family-index
          @showMsgCollectList="showMsgCollectList"
          @alertMsgAlertOnClick="alertMsgAlertOnClick"
          @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
          @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
          @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
          @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
          @closeMsgOnClick="closeMsgOnClick"
          @serviceMessageOnClick="toMyHomeWork"
          @failureToDeclareOnClick="failureToDeclare"
          @alarmOnClick="toAlarm"
          @stayAlarmOnClick="toStayAlarm"
          @openDoor="openDoor"
          @ignoreVisitor="ignoreVisitor"
          @wxVisitor="wxVisitor"
        ></my-family-index>
      </cube-tab-panel>

      <!-- 备城门 -->
      <cube-tab-panel v-if="isGate" :label="'备城门'">
        <my-gate-index
          @showMsgCollectList="showMsgCollectList"
          @alertMsgAlertOnClick="alertMsgAlertOnClick"
          @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
          @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
          @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
          @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
          @closeMsgOnClick="closeMsgOnClick"
          @serviceMessageOnClick="toMyHomeWork"
          @callSOSOnClick="toCallSOS"
          @failureToDeclareOnClick="failureToDeclare"
          @alarmOnClick="toAlarm"
          @stayAlarmOnClick="toStayAlarm"
          @alarmAllOnClick="alarmAll"
          @openDoorInOnClick="openDoorIn"
          @openDoorOutOnClick="openDoorOut"
          @showAllDoorPop="showAllDoorPop"
        ></my-gate-index>
      </cube-tab-panel>
    </cube-tab-panels>

    <!-- <div class="scroll-wrapper-head-and-bottom" style="top: 11.733333vw">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="slideScroll"
        @change="changePage"
      >
        <cube-slide-item v-if="isBusiness" style="position:relative;">
          <my-business-index
            v-if="isBusiness"
            @showMsgCollectList="showMsgCollectList"
            @alertMsgAlertOnClick="alertMsgAlertOnClick"
            @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
            @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
            @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
            @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
            @closeMsgOnClick="closeMsgOnClick"
            @serviceMessageOnClick="toMyHomeWork"
            @failureToDeclareOnClick="failureToDeclare"
            @alarmOnClick="toAlarm"
            @stayAlarmOnClick="toStayAlarm"
          ></my-business-index>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-5.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <cube-slide-item v-if="isFamily" style="position:relative;">
          <my-family-index
            v-if="isFamily"
            @showMsgCollectList="showMsgCollectList"
            @alertMsgAlertOnClick="alertMsgAlertOnClick"
            @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
            @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
            @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
            @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
            @closeMsgOnClick="closeMsgOnClick"
            @serviceMessageOnClick="toMyHomeWork"
            @failureToDeclareOnClick="failureToDeclare"
            @alarmOnClick="toAlarm"
            @stayAlarmOnClick="toStayAlarm"
            @openDoor="openDoor"
            @ignoreVisitor="ignoreVisitor"
            @wxVisitor="wxVisitor"
          ></my-family-index>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-1.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <cube-slide-item v-if="isGate" style="position:relative;">
          <my-gate-index
            v-if="isGate"
            @showMsgCollectList="showMsgCollectList"
            @alertMsgAlertOnClick="alertMsgAlertOnClick"
            @misAlertMsgAlertOnClick="misAlertMsgAlertOnClick"
            @alertMsgMaintainOnClick="alertMsgMaintainOnClick"
            @misAlertMsgMaintainOnClick="misAlertMsgMaintainOnClick"
            @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
            @closeMsgOnClick="closeMsgOnClick"
            @serviceMessageOnClick="toMyHomeWork"
            @callSOSOnClick="toCallSOS"
            @failureToDeclareOnClick="failureToDeclare"
            @alarmOnClick="toAlarm"
            @stayAlarmOnClick="toStayAlarm"
            @alarmAllOnClick="alarmAll"
            @openDoorInOnClick="openDoorIn"
            @openDoorOutOnClick="openDoorOut"
            @showAllDoorPop="showAllDoorPop"
          ></my-gate-index>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-6.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div> -->

    <!-- <div v-if="!isBusiness && !isFamily  && !isGate"
         class="scroll-wrapper-page-title"
         style="background-color: white">
      <cube-scroll >
        <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
          <img :src="require('@/assets/guanggao/guanggao-1.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-5.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-6.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-2.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-3.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-4.png')"
               class="guanggao-img">
        </div>
        <div style="height: 10vw"></div>
      </cube-scroll>
    </div>-->

    <base-popup
      v-if="isPopShow"
      :refId="refId"
      :popTitle="popTitle"
      :cancelText="popCancelText"
      :sureText="popSureText"
      :isShowCloseIcon="isShowCloseIcon"
      :closeIconStyle="closeIconStyle"
      :isShowbtn="isShowbtn"
      :isCallShow="isCallShow"
      :phoneNumber="phoneNumber"
      @leftBtnPoppup="leftBtnPoppup"
      @rightBtnPoppup="rightBtnPoppup"
      @closePoppup="closePoppup"
    >
      <!--:isOtherMsgAllChoose="isOtherMsgAllChoose"-->
      <!--:isOtherMsgChoose="isOtherMsgChoose"-->
      <!--@allChoose="otherMsgAllChoose"-->
      <!--没有回车的纯文字-->
      <div
        v-if="popType === 'plainText'"
        class="base-vertical-layout-center-item-center"
      >
        <p class="popup-text" style="width: 56.3333vw">{{ popPlainText }}</p>
      </div>
      <!--有回车的纯文字-->
      <div
        v-if="popType === 'plainTextEnter'"
        class="base-vertical-layout-center-item-center"
      >
        <div class="popup-text" style="width: 56.3333vw">
          <p>{{ popPlainText }}</p>
          <p>{{ popPlainText2 }}</p>
        </div>
      </div>
      <!--打电话界面-->
      <div
        v-if="popType === 'callEnter'"
        class="base-vertical-layout-center-item-center"
      >
        <div class="popup-text" style="width: 56.3333vw">
          <p>{{ popPlainText }}</p>
          <a id="dial" href="#">{{ popPlainText2 }}</a>
        </div>
      </div>
      <!--消息通知-->
      <!--<div v-if="popType === 'showMessage'" style="margin-top: 6.4vw">-->
      <!--<div v-if="otherMessageList.length==0"-->
      <!--class="base-vertical-layout-center-item-center"-->
      <!--style="height: 65vw">-->
      <!--<img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">-->
      <!--<p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>-->
      <!--</div>-->
      <!--<div v-else style="height: 65vw">-->
      <!--<cube-scroll v-if="isOtherMsgChoose" ref="otherMsgList">-->
      <!--<other-msg-item-choose v-for="(item,index) in otherMessageList"-->
      <!--:key="index"-->
      <!--:index="index"-->
      <!--:otherMessage="item"-->
      <!--@otherMsgChooseOnclick="otherMsgChoose">-->
      <!--</other-msg-item-choose>-->
      <!--</cube-scroll>-->
      <!--<cube-scroll v-else ref="otherMsgList">-->
      <!--<other-msg-item v-for="(item,index) in otherMessageList"-->
      <!--:key="index"-->
      <!--:otherMessage="item">-->
      <!--</other-msg-item>-->
      <!--</cube-scroll>-->
      <!--</div>-->
      <!--</div>-->
      <!--故障申报-->
      <div v-if="popType === 'failureToDeclare'" style="margin-top: 6.4vw">
        <div
          class="base-horizontal-layout-space-between"
          style="margin-top: 5.33vw"
        >
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">
            标&emsp;&emsp;题
          </p>
          <div
            v-if="alertMsgNumber === ''"
            style="width: 54.13vw;height: 7.67vw;background-color: #EDEEF0;margin-left: 3vw;border-radius: 1.33vw"
          >
            <input
              id="inputName"
              style="padding: 1vw 2.67vw;width: 50vw;height: 5vw;background: transparent;
                               border:solid 0 #00000000;resize:none;outline:none;
                               font-size: 3.2vw;color: #808080"
              placeholder="不多于8个字"
              maxlength="8"
              v-model="alertMsgName"
            />
            <!--@blur="lostInputFocus" @focus="getInputFocus"-->
          </div>
          <div
            v-else
            style="width: 54.13vw;height: 7.67vw;margin-top: 1.6vw;margin-left: 3vw"
          >
            <p style="font-size: 3.2vw;color: #808080;margin: 0 2vw">
              {{ alertMsgName }}
            </p>
          </div>
        </div>
        <div
          class="base-horizontal-layout-space-between"
          style="margin-top: 5.33vw"
        >
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">
            问题描述
          </p>
          <div
            v-if="alertMsgOrderTime === 0"
            style="width: 54.13vw;height: 18.67vw;background-color: #EDEEF0;margin-left: 3vw;border-radius: 1.33vw"
          >
            <textarea
              id="textareaName"
              style="padding: 1vw 2vw;width: 50vw;height: 16vw;background: transparent;
                               border: none;resize: none;outline:none;
                               font-size: 3.2vw;color: #808080"
              placeholder="请简略的描述下您遇到的问题~"
              maxlength="39"
              v-model="alertMsgContent"
            />
            <!--@blur="lostInputFocus" @focus="getInputFocus"-->
          </div>
          <div
            v-else
            style="width: 54.13vw;height: 18.67vw;;margin-top: 1vw;margin-left: 3vw;border-radius: 1.33vw"
          >
            <div style="margin: 1vw 2vw">
              <p
                style="width: 50vw;height: 16vw;font-size: 3.2vw;color: #808080"
              >
                {{ alertMsgContent }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="base-horizontal-layout-space-between"
          style="margin-top: 5.33vw"
        >
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">
            预约时间
          </p>
          <div
            class="base-horizontal-layout-general-item-center"
            style="width: 54.13vw;height: 6.93vw;background-color: #EDEEF0;justify-content: flex-end;
                      box-sizing: border-box;padding: 0 1.33vw;border-radius: 1.33vw"
            @click="showDeclareDatePicker"
          >
            <p
              class="base-text-details-normal-gray-dark"
              style="font-size: 3.47vw"
            >
              {{ nowTimeStr }}
            </p>
            <img
              :src="require('@/assets/icon/icon_date.png')"
              style="width: 3.73vw;height: 3.73vw;margin-left: 1.87vw"
            />
          </div>
        </div>
      </div>
      <!--请求报警-->
      <div v-if="popType === 'alertRequest'" style>
        <!--margin-top: 6.4vw-->
        <div
          class="base-vertical-layout-center-item-center"
          style="width: 100%"
        >
          <p class="popup-text" style="width: 56.3333vw">{{ popPlainText }}</p>
        </div>
      </div>
      <!--故障警报弹窗-->
      <div
        v-if="popType === 'alarmProcessing'"
        class="base-vertical-layout-center-item-center"
      >
        <img
          :src="require('@/assets/icon/icon_alert.png')"
          style="width: 8vw;height: 8vw"
        />
        <div class="popup-text" style="width: 56.3333vw">
          <p>{{ popPlainText }}</p>
          <p>{{ popPlainText2 }}</p>
        </div>
      </div>
      <!--消息汇总弹窗-->
      <div v-if="popType === 'showMsgCollectList'" style="height: 85.34vw">
        <cube-scroll>
          <div
            v-for="(item, index) in mMsgCollectList"
            :key="index"
            class="base-horizontal-layout-space-between-item-center"
            style="margin-top: 4vw"
          >
            <div class="base-vertical-layout-general" style="width: 40vw">
              <p class="base-text-details-normal-black-light">
                {{ item.title }}
              </p>
              <p
                class="base-text-details-normal-black-light"
                style="color: #999999;margin-top: 1.33vw"
              >
                {{ item.location }}-{{ item.defenceArea }}
              </p>
            </div>
            <p
              class="base-text-details-normal-gray-light"
              style="color: #AAADB3"
            >
              {{ item.time }}
            </p>
          </div>
        </cube-scroll>
      </div>
      <!--过期提醒-->
      <div
        v-if="popType === 'pastDue'"
        class="base-vertical-layout-center-item-center"
      >
        <div class="popup-text" style="width: 56.3333vw">
          <p>
            亲爱的用户，您的
            <span style="color: #3388FF">{{ plotName }}</span> 服务
          </p>
          <p>
            套餐时间还剩余
            <span style="color: #3388FF">{{ countDownStr }}</span>
          </p>
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
import myFamilyIndex from "@/view/mahuIndex/myFamily/my-family-index";
import myBusinessIndex from "@/view/mahuIndex/myBusiness/my-business-index";
import myGateIndex from "@/view/mahuIndex/myGate/my-gate-index";
import basePopup from "_c/popup/base-popup";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "ma-hu-index",
  components: {
    myFamilyIndex,
    myBusinessIndex,
    myGateIndex,
    basePopup
  },
  data() {
    return {
      selectedLabel: "",
      tabLabels: [
        // {
        //   label: "马虎商企",
        //   isHighlight: false
        // },
        // {
        //   label: "马虎",
        //   isHighlight: false
        // },
        // {
        //   label: "备城门",
        //   isHighlight: false
        // }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        preventDefault: false
        // listenScroll: true,
        // probeType: 3,
        // /* lock y-direction when scrolling horizontally and  vertically at the same time */
        // directionLockThreshold: 0
      },

      isFamily: false,
      isBusiness: false,
      isGate: false,
      isFamilyHeight: { height: "673vw" },
      isBusinessHeight: { height: "645vw" },
      isGateHeight: { height: "1735vw" },

      nowTime: 0,
      nowTimeStr: "",
      // 弹窗属性
      isPopShow: false,
      refId: "myHomePopup",
      popTitle: "",
      popType: "",
      popPlainText: "",
      popPlainText2: "",
      popCancelText: "",
      popSureText: "",
      // isSolidSureBtn: false,
      isShowCloseIcon: false,
      closeIconStyle: {},
      isShowbtn: true,
      // 弹窗参数
      mMsgCollectList: [], //消息汇总
      plainTextType: "", //toIsToAlarm操作防盗主机 callSecure请求出警 misAlert误报 misMaintain忽略
      toIsAlarm: "", //布防 or 留守布防 or 撤防
      areaNumber: "", //区域号码
      machineNumber: [], //主机号
      machineAccount: "", //主机序列号
      machineInstallCode: "", //主机Code
      alertMsgNumber: "", //工单单号
      alertMsgType: "", //工单类型
      alertMsgName: "", //工单名称
      alertMsgContent: "", //工单描述
      alertMsgOrderTime: 0, //工单预约时间
      plotName: "", //社区名称
      countDownStr: "", //倒计时Str
      //call弹窗
      isCallShow: false,
      phoneNumber: "",
      //出入弹窗
      inRecordNumber: "",
      inRecordTime: "",
      inOpenStatus: "",
      inVisitorID: "",

      guanggao: [],

      styleaaa1: {},
      styleaaa2: {},
      styleaaa3: {},
      styleaaa4: {},
      styleaaa5: {},
      styleaaa6: {}
    };
  },
  computed: {
    ...mapState({
      mIndexPageTabIndex: state => state.layout.indexPageTabIndex,
      mUserHasProprietor: state => state.user.userHasProprietor,
      mAreaTypesList: state => state.user.areaTypesList
    }),

    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      return index;
    }
  },
  watch: {},
  beforeCreate() {
    // let img1 = new Image();
    // img1.src = require('@/assets/guanggao/guanggao-business.png');
    // img1.onload = function () {
    //   this.isBusinessHeight = {height: img1.height/img1.width*100 + "vw"};
    //   console.log("isBusinessHeight",this.isBusinessHeight);
    // };
    // let img2 = new Image();
    // img2.src = require('@/assets/guanggao/guanggao-family.png');
    // img2.onload = function () {
    //   this.isFamilyHeight = {height: img2.height/img2.width*100 + "vw"};
    //   console.log("isFamilyHeight",this.isFamilyHeight);
    // };
    // let img3 = new Image();
    // img3.src = require('@/assets/guanggao/guanggao-gate.png');
    // img3.onload = function () {
    //   this.isGateHeight = {height: img3.height/img3.width*100 + "vw"};
    //   console.log("isGateHeight",this.isGateHeight);
    // };
  },
  created() {
    let countEnd = false;
    if (this.mUserHasProprietor) {
      this.isFamily = true;
    }
    console.log("ma-hu-index>>>>>>>>>>>>>>>>>>>>>>", this.mAreaTypesList);
    if (this.mAreaTypesList) {
      if (this.mAreaTypesList.length === 0) {
        this.isFamily = true;
        countEnd = true;
      } else {
        this.mAreaTypesList.forEach((item, index) => {
          if (item === 0) {
            this.isFamily = true;
          } else if (item === 1) {
            this.isBusiness = true;
          } else if (item === 2) {
            this.isGate = true;
          }
          if (index === this.mAreaTypesList.length - 1) {
            countEnd = true;
          }
        });
      }
    }

    if (countEnd) {
      if (this.isBusiness) {
        this.tabLabels.push({
          key: "Business",
          label: "马虎商企",
          isHighlight: false
        });
      }
      if (this.isFamily) {
        this.tabLabels.push({
          key: "Family",
          label: "马虎",
          isHighlight: false
        });
      }
      if (this.isGate) {
        this.tabLabels.push({
          key: "Gate",
          label: "备城门",
          isHighlight: false
        });
      }
    }

    if (this.mIndexPageTabIndex >= this.tabLabels.length) {
      this.setIndexPageTabIndex(0);
    }
    if (this.tabLabels.length) {
      this.selectedLabel = this.tabLabels[this.mIndexPageTabIndex].label;
      this.tabLabels[this.mIndexPageTabIndex].isHighlight = true;
      this.setIndexPageTabKey(this.tabLabels[this.mIndexPageTabIndex].key);
    }

    for (let count = 0; count < 7; count++) {
      this.guanggao.push("@/assets/guanggao/guanggao-" + count + ".png");
    }

    window.getQrcodeResult = this.getQrcodeResult;//二维码扫描回调
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setIndexPageTabIndex",
      "setIndexPageTabKey",
      "setIsShowOtherPop",
      "setMyHomeWork",
      "setPushInfo",
      "setIsShowDoorListGatePop"
    ]),

    slideScroll(pos) {
      // const x = Math.abs(pos.x);
      // const tabItemWidth = this.$refs.maHuIndexTabNav.$el.clientWidth;
      // const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      // const deltaX = (x / slideScrollerWidth) * tabItemWidth; // 13.6002
      // this.$refs.maHuIndexTabNav.setSliderTransform(deltaX);
    },
    changePage(index) {
      // this.selectedLabel = this.tabLabels[index].label;
      console.log(index);
      this.tabLabels.forEach(item => {
        item.isHighlight = false;
      });
      this.tabLabels[index].isHighlight = true;
      this.setIndexPageTabIndex(index);
    },
    findIndex(ary, fn) {
      if (ary.findIndex) {
        return ary.findIndex(fn);
      }
      /* istanbul ignore next */
      let index = -1;
      /* istanbul ignore next */
      ary.some(function(item, i, ary) {
        const ret = fn.call(this, item, i, ary);
        if (ret) {
          index = i;
          return ret;
        }
      });
      /* istanbul ignore next */
      return index;
    },

    tabOnClick(label) {
      let index = this.findIndex(this.tabLabels, item => item.label === label);
      this.tabLabels.forEach(item => {
        item.isHighlight = false;
      });
      this.tabLabels[index].isHighlight = true;
      this.selectedLabel = label;
      this.setIndexPageTabIndex(index);
      this.setIndexPageTabKey(this.tabLabels[index].key);
    },

    openScan() {
      utils.openScan();
    },
    getQrcodeResult(res) {
      let self = this;
      if(res.indexOf("https://mahu.cyjaf.cn/othersHtml/scan.html") === -1) {
        this.$createToast({
          type: "warn",
          txt: "二维码无效"
        }).show();
      } else {
        let resObj = utils.urlParse(res);
        if(resObj && resObj.type === "coupon" && resObj.id) {
          self.$router.push({ path: "/coupon-index", query: {comUserCouponId: resObj.id}});
        } else {
          this.$createToast({
            type: "warn",
            txt: "二维码无效"
          }).show();
        }
      }
    },

    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
      if (label === "杨杏存二奶房") {
      }
    },

    aaa() {
      this.styleaaa1 = { width: "79vw", transition: "width ease-in 0.3s" };
      this.styleaaa2 = { width: "20vw", transition: "width ease-in 0.3s" };
    },
    bbb() {
      this.styleaaa1 = { width: "20vw", transition: "width ease-in 0.3s" };
      this.styleaaa2 = { width: "79vw", transition: "width ease-in 0.3s" };
    },
    ccc() {
      this.styleaaa3 = { width: "79vw", transition: "width ease-in 0.3s" };
      this.styleaaa4 = { width: "20vw", transition: "width ease-in 0.3s" };
    },
    ddd() {
      this.styleaaa3 = { width: "20vw", transition: "width ease-in 0.3s" };
      this.styleaaa4 = { width: "79vw", transition: "width ease-in 0.3s" };
    },

    alertMsgAlertOnClick(e) {
      //消息中点击报警
      this.alertMsgNumber = e.alertMsgNumber;
      this.popType = "plainText";
      this.plainTextType = "callSecure";
      this.popTitle = "请求出警";
      // this.popTitle = e.name+"-请求出警";
      // this.popTitle = this.userInfo.infos.nickName+"-请求出警";
      this.popPlainText =
        "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";
      this.setIsShowOtherPop(true);
      // utils.maskTabShow().then((e)=>{
      this.isPopShow = true;
      // });
    },
    misAlertMsgAlertOnClick(e) {
      //消息中点击误报
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
    callAlertPersonnelOnClick(e) {
      //消息中点击联系安保、联系维保
      this.isCallShow = true;
      this.phoneNumber = e.phone;
      this.popTitle =
        e.messageType === "报警"
          ? "联系安保"
          : e.messageType === "维保"
          ? "联系维保"
          : "";
      this.popType = "callEnter";
      this.popPlainText = "即将拨号";
      this.popPlainText2 = e.phone;
      this.setIsShowOtherPop(true);
      // utils.maskTabShow().then((e)=>{
      this.isPopShow = true;
      // });
    },
    alertMsgMaintainOnClick(e) {
      //消息中点击申报维修
      let nowDate = new Date();
      // let alertMsgOrderTime = e.alertMsgOrderTime ? e.alertMsgOrderTime*1000 : nowDate.getTime();
      this.alertMsgNumber = e.alertMsgNumber;
      this.alertMsgName = e.alertMsgName;
      this.alertMsgContent = e.alertMsgContent;
      // this.alertMsgOrderTime = alertMsgOrderTime;
      // this.nowTime =  alertMsgOrderTime===0 ? nowDate.getTime() : new Date(alertMsgOrderTime).getTime();
      // this.nowTimeStr = utils.timetrans(alertMsgOrderTime===0?this.nowTime:alertMsgOrderTime, "yymmddhhmm");
      this.alertMsgOrderTime =
        e.alertMsgOrderTime || e.alertMsgOrderTime === 0
          ? e.alertMsgOrderTime * 1000
          : nowDate.getTime();
      this.nowTime =
        e.alertMsgOrderTime === 0
          ? nowDate.getTime()
          : new Date(this.alertMsgOrderTime).getTime();
      this.nowTimeStr = utils.timetrans(
        e.alertMsgOrderTime === 0 ? this.nowTime : e.alertMsgOrderTime,
        "yymmddhhmm"
      );
      this.popTitle = "申报维修"; //this.userInfo.infos.nickName+"-申报维修"
      this.alertMsgName = "申报维修";
      this.popType = "failureToDeclare";
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
      console.log(this.alertMsgOrderTime);
    },
    misAlertMsgMaintainOnClick(e) {
      //消息中点击忽略
      this.alertMsgNumber = e.alertMsgNumber;
      this.popType = "plainText";
      this.plainTextType = "misMaintain";
      this.popTitle = "忽略";
      this.popPlainText = "是否忽略该维保，确定之后该维保将不再处理！";
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    showMsgCollectList(e) {
      //消息中点击消息汇总
      this.popTitle = "消息汇总";
      this.popType = "showMsgCollectList";
      this.isShowbtn = false;
      this.mMsgCollectList = [];
      let self = this;
      if (e.type === "") {
        return;
      } else {
        self
          .$post(
            "aMMessageAmass",
            e.type === "报警"
              ? "/getAlertAmassList"
              : e.type === "维保"
              ? "/getMaintainAmassList"
              : "",
            e.type === "报警"
              ? { alertNumber: e.number }
              : e.type === "维保"
              ? { maintainNumber: e.number }
              : {}
          )
          .then(res => {
            for (let count = 0; count < res.data.length; count++) {
              this.mMsgCollectList.push({
                title: res.data[count].name,
                location: e.location,
                defenceArea:
                  res.data[count].defenceAreaName === null ||
                  res.data[count].defenceAreaName === undefined ||
                  res.data[count].defenceAreaName === ""
                    ? "全屋"
                    : res.data[count].defenceAreaName,
                time: utils.timetrans(res.data[count].createTime)
              });
            }
          });
      }
      this.isShowCloseIcon = true;
      this.closeIconStyle = { marginTop: "9.47vw" };
      this.setIsShowOtherPop(true);
      // utils.maskTabShow().then((e)=>{
      this.isPopShow = true;
      // });
    },
    closeMsgOnClick(e) {
      //消息中点击关闭消息
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

    toMyHomeWork(e) {
      this.$router.push({
        path: "/ma-hu-index/work",
        query: { areaNumber: e.areaNumber }
      });
    },
    toCallSOS(e) {
      //点击SOS
      this.popPlainText =
        "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";
      this.popType = "alertRequest";
      this.popTitle = "请求出警";
      this.alertMsgName = "手动请求出警";
      this.machineAccount = e.machineAccount;
      this.machineInstallCode = e.machineInstallCode;
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    failureToDeclare(e) {
      //点击申报维修
      this.nowTime = new Date().getTime();
      this.nowTimeStr = utils.timetrans(this.nowTime, "yymmddhhmm");
      this.popTitle = "申报维修"; //this.userInfo.infos.nickName+"-申报维修"
      this.alertMsgName = "申报维修";
      this.popType = "failureToDeclare";
      this.machineAccount = e.machineAccount;
      this.machineInstallCode = e.machineInstallCode;
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    toAlarm(e) {
      this.popType = "plainText";
      this.plainTextType = "toIsToAlarm";
      if (e.isAlarm === "撤防") {
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
      this.isPopShow = true;
    },
    toStayAlarm(e) {
      this.popType = "plainText";
      this.plainTextType = "toIsToAlarm";
      if (e.isAlarm === "撤防") {
        this.toIsAlarm = "留守布防";
        this.machineNumber.push(e.machineNumber);
        this.popTitle = "留守布防";
        this.popPlainText = "您确定要留守布防么？";
      }
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },

    /*** 出入访客操作 ***/
    openDoor(e) {
      this.popType = "plainText";
      this.plainTextType = "openDoor";
      this.popTitle = "是否开门";
      this.popPlainText = "是否开门给该访客？";
      this.recordNumber = e.recordNumber;
      this.recordTime = e.recordTime;
      this.openStatus = e.openStatus;
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    ignoreVisitor(e) {
      this.popType = "plainText";
      this.plainTextType = "ignoreVisitor";
      this.popTitle = "是否忽略";
      this.popPlainText = "是否忽略该访客？";
      this.recordNumber = e.recordNumber;
      this.recordTime = e.recordTime;
      this.openStatus = e.openStatus;
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    wxVisitor(e) {
      this.popType = "plainText";
      this.plainTextType = "wxVisitor";
      this.popTitle = "是否" + e.type;
      this.popPlainText = "是否" + e.type + "该访客的来访请求？";
      this.visitorID = e.vistorID;
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },

    alarmAll(e) {
      this.popType = "plainText";
      this.plainTextType = "toAlarmAll";
      this.popTitle = "一键布防";
      this.popPlainText = "是否一键布防？";
      this.poppupShow();
    },
    openDoorIn(e) {
      this.areaNumber = e.areaNumber;
      this.popType = "plainText";
      this.plainTextType = "openDoorIn";
      this.popTitle = "开入口门";
      this.popPlainText = "是否开入口门？";
      this.poppupShow();
    },
    openDoorOut(e) {
      this.areaNumber = e.areaNumber;
      this.popType = "plainText";
      this.plainTextType = "openDoorOut";
      this.popTitle = "开出口门";
      this.popPlainText = "是否开出口门？";
      this.poppupShow();
    },

    //弹出对话框的点击方法
    leftBtnPoppup(e) {
      let self = this;
      switch (this.popType) {
        case "plainText":
          break;
        case "plainTextEnter": //联系安保维保、关闭消息
          if (this.homeIndex === -1) {
            this.setIsShowOtherPop(false);
            // utils.maskTabHide().then((e)=>{
            this.isPopShow = false;
            // });
          } else {
            if (this.alertMsgIndex === -1) {
              //todo 可能是删除某个家
            } else {
              //关闭消息
              if (
                self.alertMsgType === "报警" ||
                self.alertMsgType === "维保"
              ) {
                self
                  .$post(
                    self.alertMsgType === "报警"
                      ? "alertMessage"
                      : "maintainMessage",
                    "/close",
                    {
                      number: self.alertMsgNumber
                    }
                  )
                  .then(res => {
                    const toast = this.$createToast({
                      type: "correct",
                      txt: "消息已关闭"
                    });
                    toast.show();
                    // self.getMyHomeInfoList();
                    self.setPushInfo("报警消息： " + new Date());
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
        // case 'showMessage':
        //   for (let count = 0; count<this.otherMessageList.length; count++) {
        //     this.otherMessageList[count].isChoose = false;
        //   }
        //   this.isOtherMsgAllChoose = false;
        //   this.isOtherMsgChoose = this.isOtherMsgChoose ? false : true;
        //   break;
        case "failureToDeclare":
          this.setIsShowOtherPop(false);
          // utils.maskTabHide().then((e)=>{
          this.isPopShow = false;
          // });
          break;
        case "alertRequest":
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
        case "plainText":
          switch (this.plainTextType) {
            case "toIsToAlarm": //布撤防
              self.machineNumber.forEach(item => {
                self
                  .$post("machine", "/updateStatus", {
                    machineNumber: item,
                    status: self.toIsAlarm
                  })
                  .then(res => {
                    // const toast = this.$createToast({
                    //   type: "correct",
                    //   txt: "已"+self.toIsAlarm+"成功"
                    // });
                    // toast.show();
                    // self.getMyHomeInfoList();
                  });
              });
              break;
            case "callSecure": //出警
              self
                .$post("alertMessage", "/callSecure", {
                  number: self.alertMsgNumber
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "已成功申请出警"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
                });
              break;
            case "misAlert": //误报
              self
                .$post("alertMessage", "/mistake", {
                  number: this.alertMsgNumber
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "操作已成功"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
                });
              break;
            case "misMaintain": //忽略
              self
                .$post("maintainMessage", "/ignore", {
                  number: this.alertMsgNumber
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "维保已忽略成功"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
                });
              break;
            case "openDoor": //出入开门
              self.mOpenDoor();
              break;
            case "ignoreVisitor": //出入忽略访客
              self.mOpenDoor();
              break;
            case "wxVisitor": //出入微信访客
              if (utils.isStrInclude(this.popTitle, "同意")) {
                self.weCharVisitor(1);
              } else if (utils.isStrInclude(this.popTitle, "拒绝")) {
                self.weCharVisitor(2);
              }
              break;
            case "toAlarmAll": //备城门一键布防
              self
                .$post("hArea", "/quickDefence", {
                  type: utils.returnTypeGate(),
                  status: 1
                })
                .then(res => {
                  console.log("一键布防", res);
                });
              break;
            case "openDoorIn": //备城门开入口门
              self
                .$post("baseClient", "/callOpenDoor", {
                  areaNumber: self.areaNumber,
                  deviceRoleType: 0
                })
                .then(res => {
                  self
                    .$createToast({
                      type: "correct",
                      txt: "开门中，请稍后..."
                    })
                    .show();
                });
              break;
            case "openDoorOut": //备城门开出口门
              self
                .$post("baseClient", "/callOpenDoor", {
                  areaNumber: self.areaNumber,
                  deviceRoleType: 1
                })
                .then(res => {
                  self
                    .$createToast({
                      type: "correct",
                      txt: "开门中，请稍后..."
                    })
                    .show();
                });
              break;
            default:
              break;
          }
          break;
        case "plainTextEnter": //前往评价
          if (this.homeIndex === -1) {
            this.setIsShowOtherPop(false);
            // utils.maskTabHide().then((e)=>{
            this.isPopShow = false;
            // });
          } else {
            if (this.alertMsgIndex === -1) {
              //todo 可能是删除某个家
            } else {
              //前往评价
              utils.localStorage("myWordInfoNum", this.alertMsgNumber);
              this.clearPoppupParameter();
              this.$router.push({
                path: "/ma-hu-index/work/work-details",
                query: { messageType: this.alertMsgType }
              });
              this.setIsShowOtherPop(false);
              // utils.maskTabHide().then((e)=>{
              this.isPopShow = false;
              // });
            }
          }
          break;
        // case 'showMessage':
        //   if (this.isOtherMsgChoose) {
        //     for (let count = this.otherMessageList.length - 1; count >= 0; count--) {
        //       if (this.otherMessageList[count].isChoose) {
        //         this.otherMessageList.splice(count, 1);
        //       }
        //     }
        //     this.isShowbtn = (this.otherMessageList.length==0) ? false : true;
        //   }
        //   break;
        case "alarmProcessing":
          this.isPopShow = false;
          break;
        case "failureToDeclare":
          this.isPopShow = false; //todo 处理一下
          if (this.alertMsgNumber === "") {
            if (this.alertMsgName === "") {
              const toast = this.$createToast({
                type: "warn",
                txt: "请填写标题"
              });
              toast.show();
              return;
            } else {
              self
                .$post("maintainMessage", "/request", {
                  machineAccount: self.machineAccount,
                  machineInstallCode: self.machineInstallCode,
                  name: this.alertMsgName,
                  content: this.alertMsgContent,
                  orderTime: Math.floor(this.nowTime / 1000)
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "故障申报已提交"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
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
            if (self.alertMsgOrderTime === 0) {
              self
                .$post("maintainMessage", "/callMaintain", {
                  number: this.alertMsgNumber,
                  content: this.alertMsgContent,
                  orderTime: Math.floor(this.nowTime / 1000)
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "故障申报已提交"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
                });
            } else {
              self
                .$post("maintainMessage", "/order", {
                  number: this.alertMsgNumber,
                  orderTime: Math.floor(this.nowTime / 1000)
                })
                .then(res => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "时间已修改"
                  });
                  toast.show();
                  // self.getMyHomeInfoList();
                  self.setPushInfo("报警消息： " + new Date());
                });
            }
          }
          break;
        case "alertRequest":
          this.isPopShow = false; //todo 处理一下
          if (self.alertMsgName === "") {
            self.alertMsgName = "紧急报警";
          }
          self
            .$post("alertMessage", "/request", {
              machineAccount: self.machineAccount,
              machineInstallCode: self.machineInstallCode,
              name: self.alertMsgName
            })
            .then(res => {
              const toast = this.$createToast({
                type: "correct",
                txt: "请求出警已提交"
              });
              toast.show();
              // self.getMyHomeInfoList();
              self.setPushInfo("报警消息： " + new Date());
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
      this.isOtherMsgAllChoose = false;
      this.isPopShow = false;
      switch (this.popType) {
        case "showMessage": //操作完通知消息之后，更新接口数据
          this.homeList = [
            {
              otherMessageList: this.otherMessageList2 //todo
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
    poppupShow() {
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
    },
    clearPoppupParameter() {
      //清空弹窗参数
      this.popCancelText = "";
      this.popSureText = "";
      this.isShowCloseIcon = false;
      this.isShowbtn = true;

      this.plainTextType = "";
      this.toIsAlarm = "";
      this.areaNumber = "";
      this.machineNumber = [];
      this.machineAccount = "";
      this.machineInstallCode = "";
      this.mMsgCollectList = [];
      this.alertMsgNumber = "";
      this.alertMsgName = "";
      this.alertMsgContent = "";
      this.alertMsgOrderTime = 0;
      this.isCallShow = false;
      this.phoneNumber = "";
      this.plotName = "";
      this.countDownStr = "";

      this.inRecordNumber = "";
      this.inRecordTime = "";
      this.inOpenStatus = "";
      this.inVisitorID = "";
    },
    mOpenDoor() {
      //访客开门
      let self = this;
      self
        .$post("entry", "/callOpenDoor", {
          tempVisitorNumber: self.recordNumber,
          triggeringTime: self.recordTime,
          openStatus: self.openStatus
        })
        .then(res => {
          console.log(self.openStatus + "门", res);
          self.setIsShowOtherPop(false);
          self.isPopShow = false;
          self.setPushInfo("访客消息： " + new Date()); //做一个假推送
        });
    },
    weCharVisitor(status) {
      //微信访客
      let self = this;
      self
        .$post("entry", "/agree", {
          visitorID: self.visitorID,
          status: status
        })
        .then(res => {
          self.setIsShowOtherPop(false);
          self.isPopShow = false;
          const toast = this.$createToast({
            type: "correct",
            txt: status === 1 ? "已同意" : status === 2 ? "已拒绝" : ""
            // txt: res.errorCode+":"+e.index+":"+e.vistorID+"已同意"
          });
          toast.show();
          self.visitorID = "";
          self.setPushInfo("访客消息： " + new Date()); //做一个假推送
        });
    },

    /*** 时间选择器 ***/
    showDeclareDatePicker() {
      //选择预约时间
      let self = this;
      let now =
        this.alertMsgOrderTime < new Date().getTime()
          ? new Date()
          : new Date(this.alertMsgOrderTime);
      let valueTime =
        this.alertMsgOrderTime < new Date().getTime()
          ? new Date()
          : new Date(this.nowTime);
      if (!this.dateTimePicker) {
        this.dateTimePicker = this.$createDatePicker({
          title: "选择预约时间",
          min: new Date(),
          max: new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          ),
          value: valueTime,
          columnCount: 5,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.dateTimePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      //确定
      console.log(date.getTime());
      this.nowTime = date.getTime();
      this.nowTimeStr = utils.timetrans(this.nowTime, "yymmddhhmm");
      this.dateTimePicker = undefined;
    },
    cancelHandle() {
      //取消
      this.dateTimePicker = undefined;
    },
    /*** 时间选择器 ***/

    /*** 备城门门口机 ***/
    showAllDoorPop(e) {
      this.setIsShowDoorListGatePop(true);
    }
    /*** 备城门门口机 ***/
  }
};
</script>

<style lang="stylus" scoped>
.index-wrapper{
    bottom: 14.933vw !important;
    display: flex;
    flex-flow: column;
    background: #f5f5f5;
    .index-top-menu{
        width: 88vw;
        height: 11.733vw;
        background: #fff;
        align-items: flex-end;
        padding: 0 5.333vw 0 2.667vw;
        box-sizing:border-box;
        justify-content: flex-start;
      font-weight: bold;
        >>>.cube-tab_active{
            flex: 0 0 26.667vw !important;
            color: #333 !important;
            font-size: 5.867vw !important;
        }
        >>>.cube-tab{
            font-size: 4.267vw;
            font-weight: bold;
            flex: 0 0 24vw;
            color: #999;
            div{
                font-weight: bold;
            }
        }
    }
    .index-tab-panels{
        flex: 1;
        background: #fff;
        >>>.cube-tab-panels-group{
            height: 100%;
            .cube-tab-panel{
                background:#f5f5f5;
                position: relative;
            }
        }
    }
}
.cube-tab-bar {
  width: 100%;
  justify-content: space-between;
}

>>>.cube-tab {
  /* width: 20vw; */
  color: #b3b3b3;
  font-size: 4.2667vw;
  flex: 1;

  &.cube-tab_active {
    color: #000;
    font-size: 5.2667vw;
  }
}

// >>>.cube-tab-bar-slider {
//   background-color: #38F;
//   width: 16.5333vw !important;
//   left: 0;
// }
</style>

<style scoped>
.ma-hu-index-title-middle {
  /*flex: 1;*/
  /*padding: 0 11.4667vw;*/
  box-sizing: border-box;
  display: flex;
}

.box1 {
  width: 70vw;
  margin-right: 9vw;
  /*max-height: 70vw;*/
  /*min-height: 50vw;*/
  overflow: hidden;
  border: 1px solid red;
  align-items: right;
}
.box2 {
  width: 20vw;
  /*max-height: 70vw;*/
  /*min-height: 50vw;*/
  overflow: hidden;
  border: 1px solid red;
}
.box3 {
  width: 100%;
  height: 100vw;
  max-height: 70vw;
  min-height: 50vw;
}
.box4 {
  width: 100%;
  margin-top: 9vw;
  height: 100vw;
  max-height: 20vw;
  min-height: 10vw;
}

.guanggao-img {
  width: 94.6666vw;
  height: 37.3333vw;
  margin-top: 3vw;
}
</style>
