<!--@Time  : 2019/09/20 19:51-->
<!--@Author: michael huang-->
<!--@File  : my-family-index.vue-->

<template>
  <div class="family-wrapper">
    <ma-hu-index-nick-name></ma-hu-index-nick-name>

    <!--工单处理模块-->
    <div v-if="myHomeMegList.length>0" class="m-topic-swiper" style="width: 100vw">
      <swiper
        :options="msgSwiperOption"
        style="width: 100vw;height: 42.6666vw;background-color: white"
        ref="alertSwiper"
      >
        <swiper-slide v-for="(item, index) in myHomeMegList" :key="index" style="width: 94%">
          <alert-msg
            :index="index"
            :messageInfo="item"
            @showMsgCollectList="showMsgCollectList"
            @alertOnClick="alertMsgAlertOnClick"
            @misAlertOnClick="misAlertMsgAlertOnClick"
            @maintainOnClick="alertMsgMaintainOnClick"
            @misMaintainOnClick="misAlertMsgMaintainOnClick"
            @callAlertPersonnelOnClick="callAlertPersonnelOnClick"
            @closeMsgOnClick="closeMsgOnClick"
          ></alert-msg>
        </swiper-slide>
        <!--<div class="swiper-pagination" style="font-size: 3vw" slot="pagination"></div>-->
      </swiper>
    </div>
    <!--v-if="alertListIngAllLen===0 && maintainListIngAllLen===0"-->
    <div
      v-else
      style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white"
    >
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <!--<div class="base-horizontal-layout-general-item-end"-->
    <!--style="height: 11.7333vw;padding: 3.7333vw 5.3333vw 0 5.3333vw;box-sizing: border-box;background-color: white">-->
    <!--<p v-for="(item,index) in tabLabels" :key="index"-->
    <!--style="margin-right: 5.3333vw"-->
    <!--:style="item.isHighlight?-->
    <!--'font-size: 5.8666vw;color: #333;font-weight: bold':-->
    <!--'font-size: 5.2666vw;color: #ccc;'"-->
    <!--@click="tabOnClick(index,item.label)">{{item.label}}</p>-->
    <!--</div>-->
    <div v-if="isMyHomeInfoListLen>0"
         style="flex:1;display: flex;flex-flow: column;overflow: hidden">
      <cube-tab-bar
        class="border-bottom-1px"
        v-model="selectedLabel"
        show-slider
        :use-transition="tabDisabled"
        ref="myFamilyIndexTabNav"
        :data="tabLabels"
        style="flex: 0 0 13.3333vw"
        @click="tabOnClick">
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel" class="home-tab">
        <cube-tab-panel label="出入管理" style="overflow: auto">
          <cube-scroll class="scroll-wrapper-service-page">
            <in-and-out-index
              @openDoor="openDoor"
              @ignoreVisitor="ignoreVisitor"
              @wxVisitor="wxVisitor"
            ></in-and-out-index>
          </cube-scroll>
        </cube-tab-panel>
        <cube-tab-panel label="我的设备" style="overflow: auto">
          <cube-scroll class="scroll-wrapper-service-page">
            <my-home-item
              v-for="(item,index) in myHomeInfoList"
              :key="index"
              :index="index"
              :myHomeInfo="item"
              @serviceMessageOnClick="serviceMessageOnClick"
              @failureToDeclareOnClick="failureToDeclare"
              @alarmOnClick="toAlarmBusiness"
              @stayAlarmOnClick="toStayAlarmBusiness">
            </my-home-item>
          </cube-scroll>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>

    <!-- <div v-if="myHomeInfoList.length>0" class="container-wrapper">
      <div>
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
          <cube-slide-item>
            <in-and-out-index
              @openDoor="openDoor"
              @ignoreVisitor="ignoreVisitor"
              @wxVisitor="wxVisitor"
            ></in-and-out-index>
          </cube-slide-item>

          <cube-slide-item>
            <div class="scroll-wrapper-index-page">
              <cube-scroll
                v-if="myHomeInfoList.length>0"
                ref="myFamilyIndexScroll"
                :data="myHomeInfoList"
                :options="myFamilyIndexScrollOptions"
                :fade="true"
              >
                <div style="height:2.6666vw"></div>
                <my-home-item
                  v-for="(item,index) in myHomeInfoList"
                  :key="index"
                  :index="index"
                  :myHomeInfo="item"
                  @serviceMessageOnClick="serviceMessageOnClick"
                  @failureToDeclareOnClick="failureToDeclare"
                  @alarmOnClick="toAlarmBusiness"
                  @stayAlarmOnClick="toStayAlarmBusiness"
                ></my-home-item>
              </cube-scroll>
              <div v-else>
                <equipment-empty></equipment-empty>
              </div>
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>-->
    <in-and-out-index
      v-else-if="isMyHomeInfoListLen===0"
      :isMyHomeInfoListLen="myHomeInfoList.length"
      @openDoor="openDoor"
      @ignoreVisitor="ignoreVisitor"
      @wxVisitor="wxVisitor"
    ></in-and-out-index>

    <base-popup
      v-if="isPopShow"
      style="z-index: 999"
      :refId="refId"
      :popTitle="popTitle"
      @leftBtnPoppup="leftBtnPoppup"
      @rightBtnPoppup="rightBtnPoppup"
    >
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>
  </div>
</template>

<script>
import utils from "_libs/utils";
import alertMsg from "_c/myHome/message/alert-msg";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import maHuIndexNickName from "_c/mahu-index/ma-hu-index-nick-name";
import inAndOutIndex from "./in-and-out-index";
import myHomeItem from "_c/myHome/my-home-item";
import guangGaoIndexPage from "_c/blank/guang-gao-index-page";
import equipmentEmpty from "_c/blank/equipment-empty";
import basePopup from "_c/popup/base-popup";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import Scroll from "cube-ui/src/components/scroll/scroll";

export default {
  name: "my-family-index",
  components: {
    Scroll,
    alertMsg,
    swiper,
    swiperSlide,

    maHuIndexNickName,
    inAndOutIndex,
    myHomeItem,
    guangGaoIndexPage,
    equipmentEmpty,
    basePopup
  },
  data() {
    return {
      selectedLabel: "",
      tabDisabled: true,
      tabLabels: [
        {
          label: "出入管理",
          isHighlight: false
        },
        {
          label: "我的设备",
          isHighlight: false
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0,
        stopPropagation: true //阻止事件冒泡 todo 可以判断到边缘就放开事件冒泡
      },
      myFamilyIndexScrollOptions: {
        stopPropagation: true //阻止事件冒泡
      },

      alertStyle: {},
      videoUnfoldStyle: {},

      // 工单处理模块
      myHomeMegList: [],
      alertListIngAllLen: 0,
      maintainListIngAllLen: 0,
      msgSwiperOption: {
        //可写swiper一些原生配置
        observer: true,
        observeParents: true,

        slidesPerView: "auto",
        centeredSlides: true,

        preventClicksPropagation: true, //滑动时，阻止click事件

        pagination: {
          el: ".swiper-pagination",

          type: "fraction", //bullets圆点（默认） //这个不用变成custom值，就可以之定义分页器样式(可爽)
          // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
          // clickable:true,
          // paginationClickable: true,
          // notNextTick:true,

          bulletElement: "li"
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
        watchOverflow: true //因为仅有1个slide，swiper无效
      },

      myHomeInfoList: [],
      isMyHomeInfoListLen: -1,

      // 弹窗属性
      isPopShow: false,
      refId: "vistorPopup",
      popTitle: "",
      popPlainText: "",
      visitorID: "",
      visitorStatus: 0,
      recordNumber: "",
      recordTime: 0,
      openStatus: -1
    };
  },
  computed: {
    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      this.setIndexFamilyPageTabIndex(index);
      return index;
    },

    ...mapState({
      mPushInfo: state => state.user.pushInfo,
      mAreaTypesList: state => state.user.areaTypesList,
      mIndexFamilyPageTabIndex: state => state.layout.indexFamilyPageTabIndex
    })
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      if (localStorage.getItem("workListFamily")) {
        this.getMyHomeInfoList();
        localStorage.removeItem("workListFamily");
      }
    },

    mPushInfo() {
      // 收到推送，刷新页面
      let self = this;
      console.log(self.mPushInfo);
      this.mAreaTypesList.forEach(item => {
        if (item === utils.returnTypeFamily()) {
          self.getHomeMsgList();
          self.getMyHomeInfoList();
        }
      });
    }
  },
  created() {
    this.selectedLabel = this.tabLabels[this.mIndexFamilyPageTabIndex].label;
    this.tabLabels[this.mIndexFamilyPageTabIndex].isHighlight = true;
  },
  mounted() {
    this.isMyHomeInfoListLen = 0;//为了显示in-and-out-index
    if (this.mAreaTypesList && this.mAreaTypesList.length>0) {
      this.mAreaTypesList.forEach(item => {
        if (item === utils.returnTypeFamily()) {
          this.getHomeMsgList();
          this.getMyHomeInfoList();
        }
      });
    }
  },
  methods: {
    ...mapActions([
      "setIsShowOtherPop",
      "setPushInfo",
      "setIndexFamilyPageTabIndex"
    ]),

    slideScroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.myFamilyIndexTabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth; // 13.6002
      this.$refs.myFamilyIndexTabNav.setSliderTransform(deltaX);
    },
    changePage(index) {
      console.log(index);
      // this.tabLabels.forEach((item)=>{
      //   item.isHighlight = false;
      // });
      // this.tabLabels[index].isHighlight = true;
      this.selectedLabel = this.tabLabels[index].label;
      this.setIndexFamilyPageTabIndex(index);
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
      let index = this.findIndex(
        this.tabLabels,
        item => item.label === label
      );
      this.tabLabels.forEach(item => {
        item.isHighlight = false;
      });
      this.tabLabels[index].isHighlight = true;
      this.selectedLabel = label;
      this.setIndexFamilyPageTabIndex(index);
    },
    // tabOnClick(index, label) {
    //   this.tabLabels.forEach(item => {
    //     item.isHighlight = false;
    //   });
    //   this.tabLabels[index].isHighlight = true;
    //   this.selectedLabel = label;
    //   this.setIndexFamilyPageTabIndex(index);
    // },

    getHomeMsgList() {
      let self = this;
      self.$post("alertMessage", "/getHomePageList", {
        statusList: [0, 2, 3, 4, 5],
        type: utils.returnTypeFamily()
      }).then(res => {
        self.myHomeMegList = [...res.data];
        self.$post("maintainMessage", "/getHomePageList", {
          statusList: [0, 2, 3, 4, 5],
          type: utils.returnTypeFamily()
        })
          .then(res => {
            res.data.forEach(item => {
              self.myHomeMegList.push(item);
            });
          });
      });
    },
    getMyHomeInfoList() {
      let self = this;
      // setTimeout(() => {//todo 操作的才要加延时
      self.$post("hArea", "/getMyAreaLists", {
          type: utils.returnTypeFamily()
        }).then(res => {
          self.myHomeInfoList = [...res.data];
          self.isMyHomeInfoListLen = self.myHomeInfoList.length;
          console.log("my-family接口", "/getMyAreaLists");
        });
      // }, 3000);
    },

    /*** 消息操作 ***/
    alertMsgAlertOnClick(e) {
      //消息中点击报警
      const self = this;
      self.$emit("alertMsgAlertOnClick", {
        alertMsgNumber: e.number,
        name: e.name
      });
    },
    misAlertMsgAlertOnClick(e) {
      //消息中点击误报
      const self = this;
      self.$emit("misAlertMsgAlertOnClick", { alertMsgNumber: e.number });
    },
    callAlertPersonnelOnClick(e) {
      //消息中点击联系安保、维保
      const self = this;
      self.$emit("callAlertPersonnelOnClick", {
        phone: e.phone,
        messageType: e.messageType
      });
    },
    alertMsgMaintainOnClick(e) {
      //消息中点击申报维修、修改预约时间
      const self = this;
      self.$emit("alertMsgMaintainOnClick", {
        alertMsgNumber: e.number,
        alertMsgName: e.name,
        alertMsgContent: e.content,
        alertMsgOrderTime: e.orderTime
      });
    },
    misAlertMsgMaintainOnClick(e) {
      //消息中点击忽略
      const self = this;
      self.$emit("misAlertMsgMaintainOnClick", { alertMsgNumber: e.number });
    },
    showMsgCollectList(e) {
      //消息中点击消息汇总
      const self = this;
      self.$emit("showMsgCollectList", {
        type: e.type,
        number: e.number,
        location: e.location
      });
    },
    closeMsgOnClick(e) {
      //消息中点击关闭消息
      const self = this;
      self.$emit("closeMsgOnClick", {
        homeIndex: self.index,
        alertMsgIndex: e.index,
        alertMsgNumber: e.number,
        messageType: e.messageType
      });
    },

    /*** 主机操作 ***/
    serviceMessageOnClick(e) {
      this.$emit("serviceMessageOnClick", { areaNumber: e.areaNumber });
    },
    failureToDeclare(e) {
      //点击申报维修
      this.$emit("failureToDeclareOnClick", {
        machineAccount: e.machineAccount,
        machineInstallCode: e.machineInstallCode
      });
    },
    toAlarmBusiness(e) {
      this.$emit("alarmOnClick", {
        isAlarm: e.isAlarm,
        machineNumber: e.machineNumber
      });
    },
    toStayAlarmBusiness(e) {
      this.$emit("stayAlarmOnClick", {
        isAlarm: e.isAlarm,
        machineNumber: e.machineNumber
      });
    },

    /*** 出入访客操作 ***/
    openDoor(e) {
      // this.setIsShowOtherPop(true);
      // this.isPopShow = true;
      // this.popTitle = "是否开门";
      // this.popPlainText = "是否开门给该访客？";
      // this.recordNumber = e.recordNumber;
      // this.recordTime = e.recordTime;
      // this.openStatus = 2;

      this.$emit("openDoor", {
        recordNumber: e.recordNumber,
        recordTime: e.recordTime,
        openStatus: 2
      });
    },
    ignoreVisitor(e) {
      // this.setIsShowOtherPop(true);
      // this.isPopShow = true;
      // this.popTitle = "是否忽略";
      // this.popPlainText = "是否忽略该访客？";
      // this.recordNumber = e.recordNumber;
      // this.recordTime = e.recordTime;
      // this.openStatus = 3;

      this.$emit("ignoreVisitor", {
        recordNumber: e.recordNumber,
        recordTime: e.recordTime,
        openStatus: 3
      });
    },
    wxVisitor(e) {
      // this.setIsShowOtherPop(true);
      // this.isPopShow = true;
      // this.popTitle = "是否" + e.type;
      // this.popPlainText = "是否" + e.type + "该访客的来访请求？";
      // this.visitorID = e.vistorID;

      this.$emit("wxVisitor", { type: e.type, vistorID: e.vistorID });
    },
    leftBtnPoppup() {
      this.setIsShowOtherPop(false);
      this.isPopShow = false;
    },
    rightBtnPoppup() {
      // let self = this;
      // if(self.visitorID==="") {
      //   self.$post("entry","/callOpenDoor",{
      //     tempVisitorNumber: self.recordNumber,
      //     triggeringTime: self.recordTime,
      //     openStatus: self.openStatus,
      //   }).then((res)=>{
      //     console.log(self.openStatus+"门",res);
      //     self.setIsShowOtherPop(false);
      //     self.isPopShow = false;
      //   });
      // } else {
      //   if(utils.isStrInclude(this.popTitle,"同意")) {
      //     self.weCharVisitor(1);
      //   } else if(utils.isStrInclude(this.popTitle,"拒绝")) {
      //     self.weCharVisitor(2);
      //   }
      // }
    }
    // weCharVisitor(status) {//微信访客
    //   let self = this;
    //   self.$post("entry","/agree",{
    //     visitorID: self.visitorID,
    //     status: status
    //   }).then((res)=>{
    //     self.setIsShowOtherPop(false);
    //     self.isPopShow = false;
    //     const toast = this.$createToast({
    //       type: "correct",
    //       txt: status===1 ? "已同意" : status===2 ? "已取消" : ""
    //       // txt: res.errorCode+":"+e.index+":"+e.vistorID+"已同意"
    //     });
    //     toast.show();
    //     self.visitorID = "";
    //     self.setPushInfo("访客消息： "+new Date());//做一个假推送
    //   });
    // },
  }
};
</script>

<style lang="stylus" scoped>
.home-tab {
  >>>.cube-tab-panels-group{
    height: 100%;
  }

  >>>.cube-tab-panels-group .cube-tab-panel{
    height: 100%;
  }
}

.family-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-flow: column;

  &>.item {
    flex: 0 0 10.667vw;
  }

  .container-wrapper {
    flex: 1;
  }
}

.cube-tab-bar {
  width: 100%;
  height: 13.3333vw;
  justify-content: space-between;
  background-color: white;
}

>>>.cube-tab {
  width: 20vw;
  color: #CCC;
  font-size: 4.2666vw;
  font-weight: bold !important;
  flex: 1;

  &.cube-tab_active {
    color: #666;
    font-weight: bold !important;
  }
}

>>>.cube-tab-bar-slider {
  width: 8vw !important;
  height: 0.533vw;
  bottom: 1.6vw;
  background: linear-gradient(270deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
  left: 25%;
  margin-left: -4vw;
}
</style>