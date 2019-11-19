<!--@Time  : 2019/09/28 14:41-->
<!--@Author: michael huang-->
<!--@File  : my-gate-index.vue-->

<template>
  <div>
    <ma-hu-index-nick-name></ma-hu-index-nick-name>

    <!--工单处理模块-->
    <div v-if="myHomeMegList.length>0" class="m-topic-swiper" style="width: 100vw">
      <swiper :options="msgSwiperOption" style="width: 100vw;height: 42.6666vw;background-color: white" ref="alertSwiper">
        <swiper-slide v-for="(item, index) in myHomeMegList" :key="index" style="width: 94%">
          <alert-msg :index="index"
                     :messageInfo="item"
                     @showMsgCollectList="showMsgCollectList"

                     @alertOnClick="alertMsgAlertOnClick"
                     @misAlertOnClick="misAlertMsgAlertOnClick"
                     @maintainOnClick="alertMsgMaintainOnClick"
                     @misMaintainOnClick="misAlertMsgMaintainOnClick"

                     @callAlertPersonnelOnClick="callAlertPersonnelOnClick"

                     @closeMsgOnClick="closeMsgOnClick">
          </alert-msg>
        </swiper-slide>
        <!--<div class="swiper-pagination" style="font-size: 3vw" slot="pagination"></div>-->
      </swiper>
    </div>
    <!--v-if="alertListIngAllLen===0 && maintainListIngAllLen===0"-->
    <div v-else
         style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <div class="scroll-wrapper-gate-index-page">
      <cube-scroll v-if="myHomeInfoList.length>0"
                   ref="myGateIndexScroll"
                   :data="myHomeInfoList"
                   :options="myGateIndexScrollOptions"
                   :fade="true">
        <!--<div class="base-horizontal-layout-space-between-item-center" style="padding: 3.7333vw 2vw">-->
          <!--&lt;!&ndash;<gate-alert-btn-sos @sosOnClick="sos"></gate-alert-btn-sos>&ndash;&gt;-->
          <!--<gate-item-open-door-btn @openDoorOnClick="showAllDoor"></gate-item-open-door-btn>-->
          <!--<gate-alert-btn-all @alarmAllOnClick="alarmAllOnClick"></gate-alert-btn-all>-->
        <!--</div>-->

        <div class="base-horizontal-layout-space-between-item-center gate-index-details">
          <div class="base-horizontal-layout-center-item-center">
            <img :src="require('./icon-gate.png')"
                 class="base-icon-large-style"
                 style="margin-right: 1.6vw">
            <p class="base-text-title-large-666" style="font-weight: bold">{{mPropertyManagePlotName}}</p>
          </div>
          <div class="base-horizontal-layout-center-item-center gate-index-details-btn" @click="showAllDoorPop">
            <img :src="require('./icon-door.png')" style="width: 3.7333vw;height: 4.1666vw;margin-right: 1.6vw">
            <p class="base-text-details-large-white" style="font-weight: bold">开门</p>
          </div>
        </div>

        <img v-if="isShowVideo" :src="require('./icon-gate-video.png')" class="gate-index-video-box" @click="openVideo">

        <gate-item v-for="(item,index) in myHomeInfoList"
                      :key="index"
                      :myHomeInfo="item"

                      @serviceMessageOnClick="serviceMessageOnClick"
                      @callSOSOnClick="callSOSOnClick"
                      @failureToDeclareOnClick="failureToDeclare"
                      @alarmOnClick="toAlarmBusiness"
                      @stayAlarmOnClick="toStayAlarmBusiness"

                      @openDoorInOnClick="openDoorInOnClick"
                      @openDoorOutOnClick="openDoorOutOnClick">
        </gate-item>
      </cube-scroll>
      <div v-else>
        <equipment-empty></equipment-empty>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import alertMsg from '_c/myHome/message/alert-msg';
  import 'swiper/dist/css/swiper.css';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  import maHuIndexNickName from '_c/mahu-index/ma-hu-index-nick-name';
  import guangGaoIndexPage from '_c/blank/guang-gao-index-page';
  import equipmentEmpty from '_c/blank/equipment-empty';
  import gateItemOpenDoorBtn from '_c/gate/gate-item-open-door-btn';
  import gateAlertBtnAll from '_c/gate/gate-alert-btn-all';
  import gateAlertBtnSos from '_c/gate/gate-alert-btn-sos';
  import gateItem from '_c/gate/gate-item';
  import { mapState } from 'vuex';

  export default {
    name: "my-gate-index",
    components: {
      alertMsg,
      swiper,
      swiperSlide,

      maHuIndexNickName,
      guangGaoIndexPage,
      equipmentEmpty,
      gateItemOpenDoorBtn,
      gateAlertBtnAll,
      gateAlertBtnSos,
      gateItem,
    },
    data() {
      return {
        myGateIndexScrollOptions: {
          stopPropagation: true//阻止事件冒泡
        },

        // 工单处理模块
        myHomeMegList: [],
        alertListIngAllLen: 0,
        maintainListIngAllLen: 0,
        msgSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          slidesPerView : "auto",
          centeredSlides: true,

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
          // autoplay: { //可选选项，自动滑动
          //   disableOnInteraction: false,
          //   delay: 3000
          // },
          // loop: true,
          // watchSlidesProgress : true,
          speed: 600,
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        myHomeInfoList: [],
        allDoorList: [],
        chooseDoorIndex: 0,
        isShowVideo: false,

        // 弹窗属性
        isPopShow: false,
        refId: 'myGatePopup',
        popTitle: '',
        // 弹窗参数
        popPlainText: '',
        areaNumber: '',
      }
    },
    computed: {
      ...mapState({
        'mPushInfo': state => state.user.pushInfo,
        'mAreaTypesList': state => state.user.areaTypesList,
        'mPropertyManagePlotNumber': state => state.plot.propertyManagePlotNumber,
        'mPropertyManagePlotName': state => state.plot.propertyManagePlotName
      })
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if(localStorage.getItem("workListGate")) {
          this.getMyHomeInfoList();
          localStorage.removeItem("workListGate");
        }
      },

      mPushInfo() {// 收到推送，刷新页面
        let self = this;
        console.log(self.mPushInfo);
        this.mAreaTypesList.forEach((item)=>{
          if (item===utils.returnTypeGate()) {
            self.getHomeMsgList();
            self.getMyHomeInfoList();
          }
        });
      }
    },
    created() {
    },
    mounted() {
      this.mAreaTypesList.forEach((item)=>{
        if (item===utils.returnTypeGate()) {
          this.getHomeMsgList();
          this.getMyHomeInfoList();
          this.getPlotCamera();
        }
      });
    },
    methods: {
      getHomeMsgList() {
        let self = this;
        self.$post("alertMessage","/getHomePageList",{
          statusList: [0,2,3,4,5],
          type: utils.returnTypeGate()
        }).then((res)=>{
          self.myHomeMegList = [...res.data];
          self.$post("maintainMessage","/getHomePageList",{
            statusList: [0,2,3,4,5],
            type: utils.returnTypeGate()
          }).then((res)=>{
            res.data.forEach((item)=>{
              self.myHomeMegList.push(item);
            });
          });
        });
      },
      getMyHomeInfoList () {
        let self = this;
        self.$post("hArea","/getMyAreaLists",{type:utils.returnTypeGate()}).then((res)=>{
          self.myHomeInfoList = [...res.data];
          console.log("my-gate接口","/getMyAreaLists");
        });
      },

      getPlotCamera() {
        let self = this;
        self.$post("camera", "/getPlotCamera", {
        }).then((res) => {
          if (res.data.length>0) {
            self.isShowVideo = true;
          }
        });
      },

      /*** 消息操作 ***/
      alertMsgAlertOnClick(e) {//消息中点击报警
        const self = this;
        self.$emit('alertMsgAlertOnClick', {alertMsgNumber: e.number, name: e.name});
      },
      misAlertMsgAlertOnClick(e) {//消息中点击误报
        const self = this;
        self.$emit('misAlertMsgAlertOnClick', {alertMsgNumber: e.number});
      },
      callAlertPersonnelOnClick(e) {//消息中点击联系安保、维保
        const self = this;
        self.$emit('callAlertPersonnelOnClick', {phone: e.phone, messageType: e.messageType});
      },
      alertMsgMaintainOnClick(e) {//消息中点击申报维修、修改预约时间
        const self = this;
        self.$emit('alertMsgMaintainOnClick', {alertMsgNumber: e.number, alertMsgName: e.name,
          alertMsgContent: e.content, alertMsgOrderTime: e.orderTime});
      },
      misAlertMsgMaintainOnClick(e) {//消息中点击忽略
        const self = this;
        self.$emit('misAlertMsgMaintainOnClick', {alertMsgNumber: e.number});
      },
      showMsgCollectList(e) {//消息中点击消息汇总
        const self = this;
        self.$emit('showMsgCollectList', {type: e.type,number: e.number,location: e.location});
      },
      closeMsgOnClick(e) {//消息中点击关闭消息
        const self = this;
        self.$emit('closeMsgOnClick', {homeIndex: self.index, alertMsgIndex: e.index, alertMsgNumber: e.number, messageType: e.messageType});
      },

      /*** 主机操作 ***/
      serviceMessageOnClick(e) {
        this.$emit('serviceMessageOnClick', { areaNumber: e.areaNumber });
      },
      callSOSOnClick(e) {//点击SOS
        this.$emit('callSOSOnClick', { machineAccount: e.machineAccount, machineInstallCode: e.machineInstallCode });
      },
      failureToDeclare(e) {//点击申报维修
        this.$emit('failureToDeclareOnClick', {machineAccount: e.machineAccount, machineInstallCode: e.machineInstallCode});
      },
      toAlarmBusiness(e) {
        this.$emit('alarmOnClick', {isAlarm: e.isAlarm, machineNumber: e.machineNumber});
      },
      toStayAlarmBusiness(e) {
        this.$emit('stayAlarmOnClick', {isAlarm: e.isAlarm, machineNumber: e.machineNumber});
      },

      showAllDoorPop() {
        let self = this;
        self.$emit('showAllDoorPop', {isDoorListGatePopShow: true});
      },
      showAllDoor(e) {//选择门口机
        let self = this;
        self.isDoorListGatePopShow = true;
        self.$post("baseClient","/getAllDevices",{
          deviceType: 0
        }).then((res)=>{
          res.data.forEach((item)=>{
            item.text = item.positionDesc+"（"+(item.onLine===0?"不在线":"在线")+"）";
            item.value = item.positionDesc+"（"+(item.onLine===0?"不在线":"在线")+"）";
          });
          self.allDoorList = [...res.data];

          if (!self.picker) {
            self.picker = self.$createPicker({
              title: '选择门口机',
              data: [self.allDoorList],
              selectedIndex: [self.chooseDoorIndex],
              onSelect: self.doorSelectHandle,
              onCancel: self.doorCancelHandle
            })
          }
          self.picker.show()
        });
      },
      doorSelectHandle(selectedVal, selectedIndex, selectedText) {
        let chooseDoorId = this.allDoorList[selectedIndex].deviceNumber;
        this.chooseDoorIndex = selectedIndex;
        this.$post("baseClient","/callOpenDoorServer",{
          deviceId: chooseDoorId
        }).then((res)=>{
          // const toast = self.$createToast({
          //   type: "correct",
          //   txt: "开门成功！"
          // });
          // toast.show();
        });
        this.picker = undefined;
      },
      doorCancelHandle() {
        this.picker = undefined;
      },
      alarmAllOnClick(e) {
        this.$emit('alarmAllOnClick', {});
      },
      openDoorInOnClick(e) {
        this.$emit('openDoorInOnClick', {areaNumber: e.areaNumber});
      },
      openDoorOutOnClick(e) {
        this.$emit('openDoorOutOnClick', {areaNumber: e.areaNumber});
      },

      openVideo() {
        let self = this;
        self.$post("camera","/getPlotCamera",{
        }).then((res)=>{
          if (res.data.length===0) {
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
    }
  }
</script>

<style scoped>
  .gate-index-details {
    height: 16vw;
    padding: 2.6666vw 5.3333vw;
    margin-bottom: 1.6vw;
    box-sizing: border-box;
    background-color: white;
  }
  .gate-index-details-btn {
    width: 26.6666vw;
    height: 10.6666vw;
    background: linear-gradient(to right , #30C9FF, #3388FF);
    border-radius: 1.0666vw;
  }
  .gate-index-video-box {
    width: 95.2vw;
    height: 26.6666vw;
    background-color: white;
    border-radius: 1.0666vw;
    margin: 1.3333vw 2.4vw 1.6vw 2.4vw;
  }
</style>