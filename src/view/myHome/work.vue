<template>
  <div class="wrapper">
    <return-head title="服务消息"></return-head>

    <div class="base-horizontal-layout-center-item-center"
         style="background-color: white;border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6">
      <div class="my-home-work-title-tab-box" :class="{'base-horizontal-layout-center-item-center' : true}">
        <p class="base-text-title-normal-gray"
           v-bind:class="{'my-home-work-title-tab-box-text':true, 'my-home-work-title-tab-box-text-choose':tabChoose==1}"
           @click="tabChooseOnclick(1)">报警</p>
      </div>
      <div class="my-home-work-title-tab-box-line"></div>
      <div class="my-home-work-title-tab-box" :class="{'base-horizontal-layout-center-item-center' : true}">
        <p class="base-text-title-normal-gray"
           v-bind:class="{'my-home-work-title-tab-box-text':true, 'my-home-work-title-tab-box-text-choose':tabChoose==2}"
           @click="tabChooseOnclick(2)">故障</p>
      </div>
      <!--<div class="my-home-work-title-tab-box-line"></div>-->
      <!--<div class="my-home-work-title-tab-box" :class="{'base-horizontal-layout-center-item-center' : true}">-->
      <!--<p class="base-text-details-normal-gray"-->
      <!--v-bind:class="{'my-home-work-title-tab-box-text':true, 'my-home-work-title-tab-box-text-choose':tabChoose==3}"-->
      <!--@click="tabChooseOnclick(3)">安装</p>-->
      <!--</div>-->
    </div>

    <div v-show="tabChoose===1" class="base-horizontal-layout-general-item-center" style="margin: 1.43vh 4vw">
      <div v-if="alertListAllLen === 0"
           class="base-vertical-layout-center-item-center"
           style="width: 100%;height: 65vw">
        <img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">
        <p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>
      </div>
      <div v-else v-for="(item,index) in alertChooseList" :key="index">
        <button-border :buttonBorderStyle="alertChoose==index ? buttonBorderChooseStyle : buttonBorderNoChooseStyle"
                       :buttonBorderTextClass="alertChoose==index ?
                       {'base-text-details-large-blue':true} : {'base-text-details-large-gray':true}"
                       :text="item"
                       @buttonOnClick="alertChooseOnClick(index)">
        </button-border>
      </div>
    </div>
    <div v-show="tabChoose===2" class="base-horizontal-layout-general-item-center" style="margin: 1.43vh 4vw">
      <div v-if="maintainListAllLen === 0"
           class="base-vertical-layout-center-item-center"
           style="width: 100%;height: 65vw">
        <img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">
        <p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>
      </div>
      <div v-else v-for="(item,index) in maintainChooseList" :key="index">
        <button-border :buttonBorderStyle="maintainChoose==index ? buttonBorderChooseStyle : buttonBorderNoChooseStyle"
                       :buttonBorderTextClass="maintainChoose==index ?
                       {'base-text-details-large-blue':true} : {'base-text-details-large-gray':true}"
                       :text="item"
                       @buttonOnClick="maintainChooseOnClick(index)">
        </button-border>
      </div>
    </div>
    <!--<div v-show="tabChoose===3" class="base-horizontal-layout-general-item-center" style="margin: 1.43vh 4vw">-->
    <!--<div v-if="installationListAllLen === 0"-->
    <!--class="base-vertical-layout-center-item-center"-->
    <!--style="width: 100%;height: 65vw">-->
    <!--<img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">-->
    <!--<p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>-->
    <!--</div>-->
    <!--<div v-else v-for="(item,index) in installationChooseList" :key="index">-->
    <!--<button-border :buttonBorderStyle="installationChoose==index ? buttonBorderChooseStyle : buttonBorderNoChooseStyle"-->
    <!--:buttonBorderTextClass="installationChoose==index ?-->
    <!--{'base-text-details-normal-blue':true} : {'base-text-details-normal-gray':true}"-->
    <!--:text="item"-->
    <!--@buttonOnClick="installationChooseOnClick(index)">-->
    <!--</button-border>-->
    <!--</div>-->
    <!--</div>-->

    <div class="scroll-wrapper" style="top: calc(11.73vw + 17.67vw + 3.67vw + 3.67vw)">
      <div v-if="tabChoose===1 && alertListAllLen !== 0 && alertList.length === 0"
           class="base-vertical-layout-center-item-center"
           style="height: 65vw">
        <img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">
        <p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>
      </div>
      <cube-scroll v-else v-show="tabChoose===1" ref="alertScroll"
                   :style="scrollAlertStyle"
                   :options="scrollAlertOptions"
                   :data="alertList"
                   @pulling-down="onAlertPullingDown"
                   @pulling-up="onAlertPullingUp">
        <div v-show="tabChoose===1" v-for="(item,index) in alertList" :key="index">
          <work-item style="margin-bottom: 2.37vw"
                     :myWordInfo="item"
                     @alertOnClick="alertOnClick"
                     @misAlertOnClick="misAlertOnClick"
                     @showMsgCollectList="showMsgCollectList"
                     @callAlertPersonnelOnClick="callAlertPersonnelOnClick">
          </work-item>
        </div>
      </cube-scroll>
      <div v-if="tabChoose===2 && maintainListAllLen !== 0 && maintainList.length === 0"
           class="base-vertical-layout-center-item-center"
           style="height: 65vw">
        <img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">
        <p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>
      </div>
      <cube-scroll v-else v-show="tabChoose===2" ref="maintainScroll"
                   :style="scrollAlertStyle"
                   :options="scrollMaintainOptions"
                   :data="maintainList"
                   @pulling-down="onMaintainPullingDown"
                   @pulling-up="onMaintainPullingUp">
        <div v-show="tabChoose===2" v-for="(item,index) in maintainList" :key="index">
          <work-item style="margin-bottom: 2.37vw"
                     :myWordInfo="item"
                     @maintainOnClick="maintainOnClick"
                     @misMaintainOnClick="misMaintainOnClick"
                     @showMsgCollectList="showMsgCollectList"
                     @callAlertPersonnelOnClick="callAlertPersonnelOnClick">
          </work-item>
        </div>
      </cube-scroll>
      <!--<div v-if="installationListAllLen !== 0 && installationList.length === 0"-->
      <!--class="base-vertical-layout-center-item-center"-->
      <!--style="height: 65vw">-->
      <!--<img :src="require('./icon_other-msg-empty.png')" style="width: 13.33vw;height: 11.47vw">-->
      <!--<p style="font-size: 3.73vw;color: #8A9099;margin-top: 2.67vw">暂无消息</p>-->
      <!--</div>-->
      <!--<cube-scroll v-else v-show="tabChoose===3"-->
      <!--ref="installationScroll"-->
      <!--:options="scrollInstallationOptions"-->
      <!--@pulling-down="onInstallationPullingDown"-->
      <!--@pulling-up="onInstallationPullingUp">-->
      <!--<div v-show="tabChoose===3" v-for="(item,index) in installationList" :key="index">-->
      <!--<work-item style="margin-bottom: 2.37vw"-->
      <!--:myWordInfo="item">-->
      <!--</work-item>-->
      <!--</div>-->
      <!--</cube-scroll>-->
    </div>

    <base-popup v-if="isPopupShow"
                :refId="refId"
                :popTitle="popTitle"
                :isShowbtn="isShowbtn"
                :isShowCloseIcon="isShowCloseIcon"
                :closeIconStyle="closeIconStyle"
                :isCallShow="isCallShow"
                :phoneNumber="phoneNumber"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup"
                @closePoppup="closePoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--故障申报-->
      <div v-if="popType === 'failureToDeclare'" style="margin-top: 6.4vw">
        <div class="base-horizontal-layout-space-between" style="margin-top: 5.33vw">
          <p style="font-size: 3.47vw;color: #333333;margin-top: 1.6vw">标题</p>
          <div style="width: 54.13vw;height: 7.67vw;margin-top: 1.6vw;margin-left: 3vw">
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
               style="width: 42.33vw;height: 6.93vw;background-color: #EDEEF0;justify-content: flex-end;
                      box-sizing: border-box;padding: 0 1.33vw;border-radius: 1.33vw"
               @click="showDeclareDatePicker">
            <p class="base-text-details-normal-gray-dark" style="font-size: 3.47vw">{{nowTimeStr}}</p>
            <img :src="require('@/assets/icon/icon_date.png')"
                 style="width: 3.73vw;height: 3.73vw;margin-left: 1.87vw">
          </div>
        </div>
      </div>
      <!--消息汇总弹窗-->
      <div v-if="popType === 'showMsgCollectList'" style="height: 85.34vw">
        <cube-scroll>
          <div v-for="(item,index) in mMsgCollectList"
               class="base-horizontal-layout-space-between-item-center"
               style="margin-top: 4vw" :key="index">
            <div class="base-vertical-layout-general" style="width: 42vw;line-height: 5vw;">
              <p class="base-text-details-normal-black-light">{{item.title}}</p>
              <p class="base-text-details-normal-black-light" style="color: #999999;margin-top: 1.33vw">{{item.location}}-{{item.defenceArea}}</p>
            </div>
            <p class="base-text-details-normal-gray-light" style="color: #AAADB3">{{item.time}}</p>
          </div>
        </cube-scroll>
      </div>
      <!--打电话界面-->
      <div v-if="popType === 'callEnter'" class="base-vertical-layout-center-item-center">
        <div class="popup-text" style="width: 53.33vw">
          <p>{{popPlainText}}</p>
          <a id='dial' href="#">{{popPlainText2}}</a>
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
  import returnHead from '_c/head/return-head';
  import buttonBorder from '_c/button/button-border';
  import workItem from '_c/myHome/work-item';
  import basePopup from '_c/popup/base-popup';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "work",
    components: {
      returnHead,
      buttonBorder,
      workItem,
      basePopup
    },
    data() {
      return {
        scrollAlertStyle: {
          // width: '100%',
          // height: 'calc(100vh - 11.7333vw - 10.67vw - 8vw - 2.67vw - 2.67vw)',
        },
        scrollAlertOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          // pullDownRefresh: {
          //   stopTime: 500,
          //   txt: `刷新成功`
          // },
          pullUpLoad: {
            stopTime: 500,
            txt: `加载成功`
          },
        },
        scrollMaintainOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          // pullDownRefresh: {
          //   stopTime: 500,
          //   txt: `刷新成功`
          // },
          pullUpLoad: {
            stopTime: 500,
            txt: `加载成功`
          },
        },
        scrollInstallationOptions: {
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

        // isShow: false,
        aheadBack: 'slide',
        tabChoose: 1,
        page: 1,
        rows: 10,
        areaNumber: '',
        alertChoose: 0,
        alertChooseList: ["全部","未完成","已完成","误报"],
        alertChooseStyle: {},
        alertChooseTextStyle: {},
        alertListAllLen: 0,
        alertList: [],
        maintainChoose: 0,
        maintainChooseList: ["全部","未完成","已完成","忽略"],
        maintainChooseStyle: {},
        maintainChooseTextStyle: {},
        maintainListAllLen: 0,
        maintainList: [],
        installationChoose: 0,
        installationChooseList: ["全部","未完成","已完成"],
        installationChooseStyle: {},
        installationChooseTextStyle: {},
        installationListAllLen: 0,
        installationList: [
          // {
          //   messageType: "install",
          //   title: "套餐B",
          //   flowType: "being",
          //   time: 1551949040000,
          //   location: "丽城花园312",
          //   rank: 0
          // },
          // {
          //   messageType: "install",
          //   title: "套餐B",
          //   flowType: "receive",
          //   time: 1551949040000,
          //   location: "丽城花园312",
          //   rank: 0
          // },
          // {
          //   messageType: "install",
          //   title: "套餐B",
          //   flowType: "complete",
          //   time: 1551949040000,
          //   location: "丽城花园312",
          //   rank: 0
          // },
          // {
          //   messageType: "install",
          //   title: "套餐B",
          //   flowType: "evaluate",
          //   time: 1251949040000,
          //   location: "丽城花园312",
          //   evaluate: 3,//评分
          //   rank: 0
          // }
        ],

        buttonBorderChooseStyle: {
          width: '21.33vw',
          height: '8vw',
          padding: 0,
          boxSizing: 'border-box',
          border: '0.27vw solid #3388FF',
          borderRadius: '5.33vw'
        },
        buttonBorderNoChooseStyle: {
          width: '21.33vw',
          height: '8vw',
          padding: 0,
          border: '0 solid #3388FF',
          borderRadius: '5.33vw'
        },
        buttonBorderChooseTextStyle: {
          fontSize: '3.2vw',
          color: '#3388FF'
        },
        buttonBorderNoChooseTextStyle: {
          fontSize: '3.2vw',
          color: '#979899'
        },

        // 弹窗属性
        isPopupShow: false,
        refId: 'myWorkPopup',
        popTitle: '',
        popType: '',
        plainTextType: '',//callSecure请求出警 misAlert误报 misMaintain忽略
        popPlainText: '',
        popPlainText2: '',
        isShowCloseIcon: false,
        closeIconStyle: {},
        isShowbtn: true,
        // 弹窗参数
        alertMsgNumber: '',//工单单号
        alertMsgName: '',//工单名称
        alertMsgContent: '',//工单描述
        alertMsgOrderTime: 0,//工单预约时间
        mMsgCollectList: [],//消息汇总列表
        nowTime: 0,
        nowTimeStr: '',
        isCallShow: false,
        phoneNumber: '',
      }
    },
    created() {
      utils.hideTab();
      this.alertChooseStyle = this.buttonBorderChooseStyle;
      this.alertChooseTextStyle = this.buttonBorderChooseTextStyle;
      this.installationListAllLen = this.installationList.length;

      this.tabChoose = this.$route.query.tabChoose ? this.$route.query.tabChoose : this.tabChoose;
      this.areaNumber = this.$route.query.areaNumber;
    },
    mounted() {
      let self = this;
      self.getInitializeInfo();
      self.getAlertWorkInfoList(0);
      self.getMaintainWorkInfoList(0);
      localStorage.setItem("workListFamily","yes");
      localStorage.setItem("workListBusiness","yes");
      localStorage.setItem("workListGate","yes");
    },
    computed: {
      ...mapState({
        'mPushInfo': state => state.user.pushInfo,
        'mMyHomeWork': state => state.layout.myHomeWork,
      })
    },
    watch: {
      //监听路由变化
      $route( to , from ) {
        let self = this;
        if (this.$route.path === "/ma-hu-index/work") {
          self.page = 0;
          self.getAlertWorkInfoList(self.mMyHomeWork.alertTab);
          self.getMaintainWorkInfoList(self.mMyHomeWork.maintainTab);
        }
      },

      mPushInfo() {// 收到推送，刷新页面
        let self = this;
        console.log("work.vue-mPushInfo",self.mPushInfo);
        self.getAlertWorkInfoList(self.alertChoose);
        self.getMaintainWorkInfoList(self.maintainChoose);
      }
    },
    methods: {
      ...mapActions(
        ['setMyHomeWork']
      ),

      getInitializeInfo() {//获取初始化列表item长度
        let self = this;
        self.$post("alertMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: 0,page: self.page,rows: self.rows
        }).then((res)=>{
          self.alertListAllLen = [...res.data].length;
        });
        self.$post("maintainMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: 0,page: self.page,rows: self.rows
        }).then((res)=>{
          self.maintainListAllLen = [...res.data].length;
        });
      },
      getAlertWorkInfoList(selectType) {
        let self = this;
        self.setMyHomeWork({alertTab: self.alertChoose, maintainTab: self.maintainChoose});
        self.$post("alertMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: selectType,page: self.page,rows: self.rows
        }).then((res)=>{
          self.alertList = [...res.data];
        });
      },
      getAlertWorkInfoListInitialize() {
        this.page = 1;
        this.getAlertWorkInfoList(this.alertChoose);
      },
      getAlertWorkInfoListLoading() {
        this.page++;
        let self = this;
        self.$post("alertMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: self.alertChoose,page: self.page,rows: self.rows
        }).then((res)=>{
          if (res.data.length>0) {
            res.data.forEach((item) => {
              self.alertList.push(item);
            })
          } else {
            const toast = self.$createToast({
              type: 'correct',
              txt: "没有更多东西了"
            });
            toast.show();
          }
        });
      },
      getMaintainWorkInfoList(selectType) {
        let self = this;
        self.setMyHomeWork({alertTab: self.alertChoose, maintainTab: self.maintainChoose});
        self.$post("maintainMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: selectType,page: self.page,rows: self.rows
        }).then((res)=>{
          self.maintainList = [...res.data];
        });
      },
      getMaintainWorkInfoListInitialize() {
        this.page = 1;
        this.getMaintainWorkInfoList(this.maintainChoose)
      },
      getMaintainWorkInfoListLoading() {//todo 到时候要判断返回是否为空
        this.page++;
        let self = this;
        self.$post("maintainMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: self.maintainChoose,page: self.page,rows: self.rows
        }).then((res)=>{
          if (res.data.length>0) {
            res.data.forEach((item) => {
              self.maintainList.push(item);
            })
          } else {
            const toast = self.$createToast({
              type: 'correct',
              txt: "没有更多东西了"
            });
            toast.show();
          }
        });
      },

      tabChooseOnclick(index) {
        switch(index) {
          case 1:
            this.tabChoose = 1;
            break;
          case 2:
            this.tabChoose = 2;
            break;
          case 3:
            this.tabChoose = 3;
            break;
          default:
            break;
        }
      },
      alertChooseOnClick(index) {
        this.alertChoose = index;
        this.page = 1;
        this.getAlertWorkInfoList(index);
      },
      maintainChooseOnClick(index) {
        this.maintainChoose = index;
        this.page = 1;
        this.getMaintainWorkInfoList(index);
      },
      installationChooseOnClick(index) {
        this.installationChoose = index;
        let installationList = [];
        this.installationList = [...installationList];
      },

      alertOnClick(e) {//报警消息点击出警
        this.alertMsgNumber = e.number;
        this.popType = "plainText";
        this.plainTextType = "callSecure";
        this.popTitle = "请求出警";
        // this.popTitle = e.name+"-请求出警";
        this.popPlainText = "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";
        this.isPopupShow = true;
      },
      misAlertOnClick(e) {//报警消息点击误报
        this.alertMsgNumber = e.number;
        this.popTitle = "误报";
        this.popType = "plainText";
        this.plainTextType = "misAlert";
        this.popPlainText = "是否确定该报警是误报，确定之后该报警将不再处理！";
        this.isPopupShow = true;
      },
      maintainOnClick(e) {//消息中点击申报维修、修改预约时间
        this.alertMsgNumber = e.number;
        this.alertMsgName = e.name;
        this.alertMsgContent = e.content;
        this.alertMsgOrderTime = e.orderTime*1000;
        this.nowTime =  e.orderTime===0?new Date().getTime():new Date(this.alertMsgOrderTime).getTime();
        this.nowTimeStr = utils.timetrans(e.orderTime===0?this.nowTime:e.orderTime, "yymmddhhmm");
        this.popTitle = "故障申报";
        this.popType = "failureToDeclare";
        this.isPopupShow = true;
      },
      misMaintainOnClick(e) {//维保消息点击忽略
        this.alertMsgNumber = e.number;
        this.popTitle = "忽略";
        this.popType = "plainText";
        this.plainTextType = "misMaintain";
        this.popPlainText = "是否忽略该维保，确定之后该维保将不再处理！";
        this.isPopupShow = true;
      },

      /*** 时间选择器 ***/
      showDeclareDatePicker() {//选择预约时间
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
        this.dateTimePicker.show();
      },
      selectHandle(date, selectedVal, selectedText) {//确定
        this.nowTime = date.getTime();
        this.nowTimeStr = utils.timetrans(this.nowTime, "yymmddhhmm");
        this.dateTimePicker = undefined;
      },
      cancelHandle() {//取消
        this.dateTimePicker = undefined;
      },
      /*** 时间选择器 ***/

      showMsgCollectList(e) {
        this.popTitle = "消息汇总";
        this.popType = "showMsgCollectList";
        this.isShowCloseIcon = true;
        this.isShowbtn = false;
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
                defenceArea: (res.data[count].defenceAreaName === null || res.data[count].defenceAreaName === "") ?
                  "全屋" : res.data[count].defenceAreaName,
                time: utils.timetrans(res.data[count].createTime)
              })
            }
          });
        }
        this.closeIconStyle = {marginTop: "9.47vw"};
        this.isPopupShow = true;
      },
      callAlertPersonnelOnClick(e) {
        this.isCallShow = true;
        this.phoneNumber = e.phone;
        this.popTitle = (e.messageType==="报警") ? "联系安保" : (e.messageType==="维保") ? "联系维保" : "";
        this.popType = "callEnter";
        this.popPlainText = "即将拨号";
        this.popPlainText2 = e.phone;
        this.isPopupShow = true;
      },

      leftBtnPoppup() {
        switch (this.popType) {
          case 'plainText':
            break;
          default:
            break;
        }
        setTimeout(() => {
          this.clearPoppupParameter();
        }, 250);
      },
      rightBtnPoppup() {
        let self = this;
        switch (this.popType) {
          case 'plainText':
            switch (this.plainTextType) {
              case 'callSecure'://出警
                self.$post("alertMessage", "/callSecure", {
                  number: self.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "已成功申请出警"
                  });
                  toast.show();
                  self.getAlertWorkInfoListInitialize();
                });
                break;
              case 'misAlert'://误报
                self.$post("alertMessage", "/mistake", {
                  number: self.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "操作已成功"
                  });
                  toast.show();
                  self.getAlertWorkInfoListInitialize()
                });
                break;
              case 'misMaintain'://忽略
                self.$post("maintainMessage", "/ignore", {
                  number: self.alertMsgNumber
                }).then((res) => {
                  const toast = this.$createToast({
                    type: "correct",
                    txt: "维保已忽略成功"
                  });
                  toast.show();self.getMaintainWorkInfoListInitialize();
                });
                break;
              default:
                break;
            }
            break;
          case 'failureToDeclare':
            if(self.alertMsgOrderTime===0) {
              self.$post("maintainMessage", "/callMaintain", {
                number: self.alertMsgNumber,
                content: self.alertMsgContent,
                orderTime: Math.floor(self.nowTime/1000),
              }).then((res) => {
                const toast = this.$createToast({
                  type: "correct",
                  txt: "故障申报已提交"
                });
                toast.show();
                self.getMaintainWorkInfoListInitialize();
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
                self.getMaintainWorkInfoListInitialize();
              });
            }
            break;
          default:
            break;
        }
        setTimeout(() => {
          this.clearPoppupParameter();
        }, 250);
      },
      closePoppup() {
        this.clearPoppupParameter();
      },
      clearPoppupParameter() {//清空弹窗参数
        // 弹窗属性
        this.alertMsgNumber = "";//plainText
        this.alertMsgName = "";//failureToDeclare
        this.alertMsgContent = "";//failureToDeclare
        this.alertMsgOrderTime = 0;//failureToDeclare
        this.mMsgCollectList = [];//showMsgCollectList
        this.nowTime = 0;//failureToDeclare
        this.nowTimeStr = "";//failureToDeclare
        this.isCallShow = false;//callEnter
        this.phoneNumber = "";//callEnter
        // 弹窗参数
        this.popTitle = "";
        this.popType = "";
        this.plainTextType = "";
        this.popPlainText = "";
        this.popPlainText2 = "";
        this.isShowCloseIcon = false;
        this.closeIconStyle = {};
        this.isShowbtn = true;
        this.isPopupShow = false;
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

      // 刷新、加载
      onAlertPullingDown() {
        let self = this;
        setTimeout(() => {
          self.getAlertWorkInfoListInitialize();
          self.$refs.alertScroll.forceUpdate();
        }, 1000);
      },
      onAlertPullingUp() {
        let self = this;
        setTimeout(() => {
          self.getAlertWorkInfoListLoading();
          self.$refs.alertScroll.forceUpdate();
        }, 1000);
      },
      onMaintainPullingDown() {
        let self = this;
        setTimeout(() => {
          self.getMaintainWorkInfoListInitialize();
          self.$refs.alertScroll.forceUpdate();
        }, 1000)
      },
      onMaintainPullingUp() {
        let self = this;
        setTimeout(() => {
          self.getMaintainWorkInfoListLoading();
          self.$refs.alertScroll.forceUpdate();
        }, 1000)
        this.$refs.maintainScroll.forceUpdate();
      },
      onInstallationPullingDown() {
        this.$refs.installationScroll.forceUpdate();
      },
      onInstallationPullingUp() {
        this.$refs.installationScroll.forceUpdate();
      },
    }
  };
</script>

<style lang="stylus" scoped>
>>>.base-text-details-normal-gray-light{
  width: 40vw;
  text-align: right;
}
  .my-home-work-title-tab-box {
    width: 48.07vw;
    /*width: 33.07vw;*/
    height: 10.67vw;
  }
  .my-home-work-title-tab-box-line {
    width: 1px;
    height: 5.33vw;
    background-color: #E3E4E6;
  }
  .my-home-work-title-tab-box-text {
    line-height: calc(8vw + 2.67vw + 2.67vw);
    /*margin-left: 13.6vw;*/
  }
  .my-home-work-title-tab-box-text-choose {
    color: #3388FF;
  }
</style>
