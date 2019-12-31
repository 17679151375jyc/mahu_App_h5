<!--@Time  : 2019/09/25 15:15-->
<!--@Author: michael huang-->
<!--@File  : in-and-out-index.vue-->

<template>
  <!--<div :class="[isMyHomeInfoListLen>0 ? 'scroll-wrapper-index-page': 'only-item']">-->
  <div :class="['only-item']">
    <!-- <cube-scroll
      ref="myFamilyIndexScroll"
      :data="visitorIndexList"
      :options="visitorIndexScrollOptions"
      :fade="true"
    >-->
    <div v-if="isMUserHasProprietor === 1" class="in-out-wrapper">
      <!-- 新界面-start -->
      <div class="in-out-card">
        <div class="msg" @click="toRecord" @touchstart="addActiveCls" @touchend="removeActiveCls">
          <div class="title">出入记录</div>
          <div class="content-wrapper">
            <div class="left">
              <div class="info">
                <img
                  v-if="inAndOutIndexInfo.openType===10"
                  :src="(inAndOutIndexInfo.relation === '本人' || inAndOutIndexInfo.relation === '朋友' || inAndOutIndexInfo.relation === '家人')
                     ? require('./icon_car.png') : require('./icon_other_car.png')"
                  class="user-icon"
                />
                <img
                  v-else
                  :src="(inAndOutIndexInfo.relation === '本人' || inAndOutIndexInfo.relation === '朋友' || inAndOutIndexInfo.relation === '家人')
                     ? require('./icon_user.png') : require('./icon_other_user.png')"
                  class="user-icon"
                />
                <div v-if="isInAndOutIndexInfoEmpty" class="name">{{inAndOutIndexInfo.recordName}}</div>
                <div v-else class="name">---</div>
                <div v-if="isInAndOutIndexInfoEmpty" class="role">{{inAndOutIndexInfo.relation}}</div>
                <div
                  v-if="isInAndOutIndexInfoEmpty"
                  class="time"
                >{{getTime(inAndOutIndexInfo.triggeringTime)}}</div>
              </div>
              <div class="address">
                <span
                  v-if="isInAndOutIndexInfoEmpty"
                  class="place"
                >{{inAndOutIndexInfo.plotName}}{{inAndOutIndexInfo.buildingName}}{{inAndOutIndexInfo.positionName?'-':''}}{{inAndOutIndexInfo.positionName}}</span>
                <p v-else class="place">暂无出入记录</p>
                <span
                  v-if="isInAndOutIndexInfoEmpty"
                  class="state"
                >{{inAndOutIndexInfo.typeDesc==='拜访'?'进入':inAndOutIndexInfo.typeDesc==='离开'?'离开':inAndOutIndexInfo.typeDesc}}</span>
                <!--<span v-if="isInAndOutIndexInfoEmpty" class="state">-->
                <!--{{(inAndOutIndexInfo.typeDesc==='拜访' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))-->
                <!--?'回家': (inAndOutIndexInfo.typeDesc==='离开' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))?-->
                <!--'离家':inAndOutIndexInfo.typeDesc}}-->
                <!--</span>-->
              </div>
            </div>
            <div class="right">
              <img :src="require('./icon-right.png')" class="icon-right" />
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div
            class="item"
            @click="addVisitor"
            @touchstart="addActiveCls"
            @touchend="removeActiveCls"
          >
            <img :src="require('./icon-add.png')" class="icon" />
            <span>添加访客</span>
          </div>
          <div
            class="item"
            @click="toVisitorIndex"
            @touchstart="addActiveCls"
            @touchend="removeActiveCls"
          >
            <img :src="require('./icon-manage.png')" class="icon" />
            <span>访客管理</span>
          </div>
          <div
            class="item item-door"
            @click="temporaryDoorIndex"
            @touchstart="addActiveCls"
            @touchend="removeActiveCls"
          >
            <img :src="require('./icon-door.png')" class="icon" />
            <span>临时门禁</span>
          </div>
        </div>
      </div>
      <!-- 新界面-end -->

      <!--<div class="in-and-out-index-today" :class="['base-vertical-layout-space-between']">-->
      <!--<div class="base-horizontal-layout-space-between-item-center">-->
      <!--<p class="base-text-details-large-gray" style="font-weight: bold">出入状况</p>-->
      <!--<div class="base-horizontal-layout-center-item-center" @click="toRecord">-->
      <!--<img-->
      <!--:src="require('@/assets/icon/icon-menu-in-out-blue.png')"-->
      <!--class="base-icon-normal-style"-->
      <!--style="margin-right: 1.0666vw"-->
      <!--/>-->
      <!--<p class="base-text-details-normal-blue">出入记录</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="base-horizontal-layout-space-between-item-center">-->
      <!--<div class="base-horizontal-layout-center-item-center">-->
      <!--<img-->
      <!--:src="require('@/assets/icon/icon-person-blue.png')"-->
      <!--class="base-icon-normal-style"-->
      <!--style="margin-right: 2.6666vw"-->
      <!--/>-->
      <!--<p-->
      <!--v-if="isInAndOutIndexInfoEmpty"-->
      <!--class="base-text-title-normal-666"-->
      <!--style="font-weight: bold"-->
      <!--&gt;{{inAndOutIndexInfo.recordName}}</p>-->
      <!--<p v-else class="base-text-title-normal-666" style="font-weight: bold">-&#45;&#45;</p>-->
      <!--<p-->
      <!--v-if="isInAndOutIndexInfoEmpty"-->
      <!--class="base-text-details-normal-gray-ccc"-->
      <!--style="margin-left: 1.0666vw"-->
      <!--&gt;{{inAndOutIndexInfo.relation}}</p>-->
      <!--</div>-->
      <!--<p-->
      <!--v-if="isInAndOutIndexInfoEmpty"-->
      <!--class="base-text-details-normal-black-666"-->
      <!--&gt;{{getTime(inAndOutIndexInfo.triggeringTime)}}</p>-->
      <!--</div>-->
      <!--<div class="base-horizontal-layout-space-between-item-center">-->
      <!--<p-->
      <!--v-if="isInAndOutIndexInfoEmpty"-->
      <!--class="base-text-details-large-gray"-->
      <!--style="color: #898989"-->
      <!--&gt;{{inAndOutIndexInfo.plotName}}{{inAndOutIndexInfo.buildingName}}{{inAndOutIndexInfo.positionName?'-':''}}{{inAndOutIndexInfo.positionName}}</p>-->
      <!--<p v-else class="base-text-details-large-gray" style="color: #898989">暂无出入记录</p>-->
      <!--<p v-if="isInAndOutIndexInfoEmpty" style="font-size: 3.7333vw;color: #E6782B">-->
      <!--{{(inAndOutIndexInfo.typeDesc==='拜访' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))-->
      <!--?'回家': (inAndOutIndexInfo.typeDesc==='离开' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))?-->
      <!--'离家':inAndOutIndexInfo.typeDesc}}-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="base-vertical-layout-space-between-item-center" style="height: 26.6666vw">-->
      <!--<div-->
      <!--class="in-and-out-index-visitor"-->
      <!--:class="['base-vertical-layout-center-item-center']"-->
      <!--:style="visitorStyle"-->
      <!--@click="toVisitorIndex"-->
      <!--@touchstart="visitorTouch"-->
      <!--@touchend="visitorTouchEnd"-->
      <!--&gt;-->
      <!--<img-->
      <!--:src="require('@/assets/icon/icon-menu.png')"-->
      <!--class="base-icon-normal-style"-->
      <!--style="margin-bottom: 1.0666vw"-->
      <!--/>-->
      <!--<p class="base-text-details-normal-white">访客管理</p>-->
      <!--</div>-->
      <!--<div-->
      <!--class="in-and-out-index-temporary-door"-->
      <!--:class="['base-vertical-layout-center-item-center']"-->
      <!--:style="temporaryDoorStyle"-->
      <!--@click="temporaryDoorIndex"-->
      <!--@touchstart="temporaryDoorTouch"-->
      <!--@touchend="temporaryDoorTouchEnd"-->
      <!--&gt;-->
      <!--<img-->
      <!--:src="require('@/assets/door/icon-open-door-white.png')"-->
      <!--class="base-icon-normal-style"-->
      <!--style="margin-bottom: 1.0666vw"-->
      <!--/>-->
      <!--<p class="base-text-details-normal-white">临时门禁</p>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!-- <community-empty v-else @toAddCommunityOnClick="toAddCommunity"></community-empty> -->

    <div v-else-if="isMUserHasProprietor === 0" class="community-empty-wrapper">
      <div class="title">暂无社区可用，请先加入社区</div>
      <div class="intro">
        <div class="left">加入社区方法:</div>
        <div class="right">
          <span>1.自行申请加入社区</span>
          <span>2.联系业主邀请加入</span>
        </div>
      </div>
      <div
        class="add-community-btn"
        :class="[{'add-community-btn-red': applyCommunityInfo.status===2},{'add-community-btn-gray': applyCommunityInfo.status===3}]"
        @click="toAddCommunity(applyCommunityLen===0?-1:applyCommunityInfo.status)"
        @touchstart="addActiveCls"
        @touchend="removeActiveCls"
      >
        <span
          v-if="applyCommunityLen===0 || (applyCommunityLen>0 && applyCommunityInfo.status===1)"
        >加入社区</span>
        <span
          v-else-if="applyCommunityLen>0 && (applyCommunityInfo.status===0 || applyCommunityInfo.status===2)"
        >
          <span>当前进程：{{applyCommunityInfo.status===0?'未审核':applyCommunityInfo.status===2?'不通过':''}}</span>
          <span style="margin-left: 8vw">修改信息</span>
        </span>
        <span
          v-else-if="applyCommunityLen>0 && applyCommunityInfo.status===3"
          style="color: #999999"
        >当前进程：审核中</span>
      </div>
    </div>

    <div v-if="visitorIndexList.length===0 || !mUserHasProprietor"></div>
    <!--<img-->
    <!--v-if="visitorIndexList.length===0"-->
    <!--:src="require('@/assets/guanggao/guanggao-1.png')"-->
    <!--style="width: 94.6666vw;height: 37.3333vw;margin: 0 2.6666vw"-->
    <!--/>-->

    <!--<div v-if="visitorIndexList.length===0">-->
    <!--<img :src="require('@/assets/guanggao/guanggao-1.png')"-->
    <!--style="width: 94.6666vw;height: 37.3333vw;margin: 0 2.6666vw">-->
    <!--</div>-->
    <!--:src="require('./inAndOut-guanggao.png')"-->
    <div v-else v-for="(item,index) in visitorIndexList" :key="index">
      <visitor-item-index
        :visitorIndexInfo="item"
        @openDoorOnClick="openDoor"
        @ignoreOnClick="ignoreVisitor"
        @wxVisitorOnclick="wxVisitor"
      ></visitor-item-index>
    </div>
    <!-- </cube-scroll> -->

    <!-- <addVisitorPopup
      v-if="addVisitorPopup"
      @addVisitorClose="addVisitorPopupClose"
      @addVisitorTo="addVisitorTo"
    >
    </addVisitorPopup>-->

    <base-popup
      v-if="isPopShow"
      :refId="refId"
      :popTitle="popTitle"
      :cancelText="popCancelText"
      :sureText="popSureText"
      @leftBtnPoppup="leftBtnPoppup"
      @rightBtnPoppup="rightBtnPoppup"
    >
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--没有回车的纯文字-->
      <div v-if="popType === 'temporaryDoor'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 70.33vw">注：激活后，密码的有效时间默认为6小时</p>
        <div
          class="base-horizontal-layout-space-between-item-center"
          style="width: 70.33vw;margin-top: 8vw"
        >
          <div
            v-for="(item,index) in temporaryDoorNumberList"
            :key="index"
            class="base-horizontal-layout-center-item-center"
            style="width: 10.9333vw;height: 18.1333vw;border-radius: 1.0666vw;background-color: #F5F5F5"
          >
            <p style="font-size: 8vw;font-weight: bold;color: #E6782B">{{item}}</p>
          </div>
        </div>
      </div>
    </base-popup>
  </div>
</template>

<script>
import utils from "_libs/utils";
import communityEmpty from "_c/blank/community-empty";
import visitorItemIndex from "_c/inAndOut/visitor/visitor-item-index";
import addVisitorPopup from "_c/inAndOut/addVisitorPopup";
import basePopup from "_c/popup/base-popup";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { addClass, removeClass } from "_libs/dom";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import Vue from "vue";
import { createAPI } from "cube-ui";
createAPI(Vue, addVisitorPopup, ["click"], true);
createAPI(Vue, basePopup, ["click"], true);

export default {
  name: "in-and-out-index",
  components: {
    communityEmpty,
    visitorItemIndex,
    addVisitorPopup,
    basePopup,
    swiper,
    swiperSlide
  },
  props: {
    isMyHomeInfoListLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visitorStyle: {},
      temporaryDoorStyle: {},
      isInAndOutIndexInfoEmpty: false,
      inAndOutIndexInfo: {},
      visitorIndexList: [],

      addVisitorPopup: false,

      applyCommunityLen: 0,
      applyCommunityInfo: {},

      isMUserHasProprietor: -1,

      visitorIndexScrollOptions: {
        stopPropagation: true //阻止事件冒泡
      },

      visitorSwiperOption: {
        //可写swiper一些原生配置
        observer: true,
        observeParents: true,

        slidesPerView: "auto",
        centeredSlides: true,

        pagination: {
          el: ".swiper-pagination",

          type: "bullets", //这个不用变成custom值，就可以之定义分页器样式(可爽)
          // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
          // clickable:true,
          // paginationClickable: true,
          // notNextTick:true,

          bulletElement: "li"
          // modifierClass : 'my-pagination-',
          // bulletClass: 'my-swiper-pagination-bullet',
          // bulletActiveClass: 'my-swiper-pagination-bullet-active'
        },
        watchOverflow: true //因为仅有1个slide，swiper无效
      },

      // 弹窗属性
      isPopShow: false,
      refId: "myAppPopup",
      popTitle: "",
      popType: "",
      popPlainText: "",
      popCancelText: "",
      popSureText: "",
      // 弹窗参数
      domicileNumber: "",
      temporaryDoorNumberList: []
    };
  },
  computed: {
    ...mapState({
      mUserHasProprietor: state => state.user.userHasProprietor,
      mPushInfo: state => state.user.pushInfo,
      mUserPlotList: state => state.user.userPlotList,

      mShowVisitorPopList: state => state.layout.showVisitorPopList,
      mIsPlotBlankDomicile: state => state.plot.isPlotBlankDomicile
    })
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      let self = this;
      console.log("in-and-out-index:route", to.path);
      if (to.path === "/ma-hu-index") {
        self.getInAndOutIndexInfo();
        self.getInOutVisitorIndexList();

        if (localStorage.getItem("inAndOutChange")) {
          localStorage.removeItem("inAndOutChange");
          setTimeout(() => {
            self.toVisitorIndex();
          }, 1300);
        }
      }

      /* if (localStorage.getItem("communityChangeOne")) {
        localStorage.removeItem("communityChangeOne");
        self.getApplyCommunity();
      }*/
    },

    mPushInfo() {
      // 收到推送，刷新页面
      let self = this;
      console.log("in-and-out-index:push", self.mPushInfo);
      self.getInAndOutIndexInfo();
      self.getInOutVisitorIndexList();
      self.getApplyCommunity();
    },

    mUserHasProprietor() {
      this.isMUserHasProprietor = this.mUserHasProprietor ? 1 : 0;
    }
  },

  created() {
    this.isMUserHasProprietor = this.mUserHasProprietor ? 1 : 0;
  },
  mounted() {
    let self = this;
    self.getInAndOutIndexInfo();
    self.getInOutVisitorIndexList();
    self.getApplyCommunity();
  },
  methods: {
    ...mapActions([
      "setIsShowOtherPop",
      "setShowVisitorPopList",
      "setPushInfo"
    ]),

    getApplyCommunity() {
      //获取申请社区信息
      let self = this;
      self.$post("community", "/myNewApply", {}).then(res => {
        if (res.data.list) {
          self.applyCommunityLen = [...res.data.list].length;
          if (self.applyCommunityLen > 0) {
            self.applyCommunityInfo = [...res.data.list][0];
          } else {
            //todo
            self.applyCommunityInfo = {};
          }
        }
      });
    },

    addActiveCls(e) {
      addClass(e.currentTarget, "active");
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, "active");
    },
    getInAndOutIndexInfo() {
      let self = this;
      self
        .$post("entry", "/record", {
          role: 0,
          filter: 0,
          lastID: 0,
          pageSize: 1
        })
        .then(res => {
          if (res.data.list.length > 0) {
            self.isInAndOutIndexInfoEmpty = true;
            self.inAndOutIndexInfo = [...res.data.list][1];
          }
        });
    },
    getInOutVisitorIndexList() {
      //获取首页出入请求
      let self = this;
      self.$post("record", "/getMyVistorRecord", {}).then(res => {
        if (res.data instanceof Array && res.data.length > 0) {
          self.visitorIndexList = [...res.data];
        } else {
          self.visitorIndexList = [];
        }
        self.$post("entry", "/wxVisitor", {}).then(wxRes => {
          if (wxRes.data instanceof Array && wxRes.data.length > 0) {
            wxRes.data.forEach(item => {
              self.visitorIndexList.push(item);
            });
          }
        });
      });
    },

    getTime(time) {
      return utils.timetrans(time, "mmddhhmm");
    },

    toAddCommunity(type) {
      let self = this;
      switch (type) {
        case -1:
          self.$router.push({
            path: "/ma-hu-index/community-add",
            query: {
              chooseCityPath: "/ma-hu-index/community-add/choose-city",
              choosePlotPath: "/ma-hu-index/community-add/choose-plot"
            }
          });
          break;
        case 0:
          self.$router.push({
            path: "/ma-hu-index/community-add",
            query: {
              applyID: self.applyCommunityInfo.applyID,
              chooseCityPath: "/ma-hu-index/community-add/choose-city",
              choosePlotPath: "/ma-hu-index/community-add/choose-plot"
            }
          });
          break;
        case 1: //todo 已审核通过，不过被禁用
          self.$router.push({
            path: "/ma-hu-index/community-add",
            query: {
              chooseCityPath: "/ma-hu-index/community-add/choose-city",
              choosePlotPath: "/ma-hu-index/community-add/choose-plot"
            }
          });
          break;
        case 2:
          self.$router.push({
            path: "/ma-hu-index/community-add",
            query: {
              applyID: self.applyCommunityInfo.applyID,
              chooseCityPath: "/ma-hu-index/community-add/choose-city",
              choosePlotPath: "/ma-hu-index/community-add/choose-plot"
            }
          });
          break;
        case 3:
          const toast = this.$createToast({
            type: "warn",
            txt: "物管审核中，请耐心等待..."
          });
          toast.show();
          break;
        default:
          this.$createToast({
            type: "warn",
            txt: "后台异常"
          }).show();
          break;
      }
    },

    toRecord() {
      //跳到出入记录
      let self = this;
      self.$router.push({ path: "/ma-hu-index/inOutRecord", query: {} });
    },
    toVisitorIndex() {
      //跳到访客主页
      let self = this;
      self.$router.push({ path: "/ma-hu-index/visitor-index", query: {} });
    },
    visitorTouch() {
      this.visitorStyle = {
        background: "linear-gradient(to bottom, #30C9FF, #42DBC4)"
      };
    },
    visitorTouchEnd() {
      this.visitorStyle = {
        background: "linear-gradient(to bottom, #42DBC4, #30C9FF)"
      };
    },
    temporaryDoorIndex() {
      //临时门禁
      let self = this;
      if (self.mUserHasProprietor) {
        console.log(self.mIsPlotBlankDomicile);
        if (self.mUserPlotList.length > 0 && self.mIsPlotBlankDomicile) {
          if (self.mUserPlotList.length < 2) {
            if (
              self.mUserPlotList[0].domicile &&
              self.mUserPlotList[0].domicile.length < 2
            ) {
              self.$post("domicile", "/getDomicileMessage", {}).then(res => {
                console.log([...res.data][0]);
                if (res.data.length > 0) {
                  let temporaryDoorInfo = [...res.data][0];
                  if (
                    !temporaryDoorInfo.tempCode ||
                    temporaryDoorInfo.codeEffective === 0
                  ) {
                    self.activationOnClick(temporaryDoorInfo.domicileNumber);
                  } else if (
                    temporaryDoorInfo.tempCode ||
                    temporaryDoorInfo.codeEffective === 1
                  ) {
                    self.validOnClick(temporaryDoorInfo.domicileNumber);
                  } else {
                    self
                      .$createToast({
                        type: "warn",
                        txt: "后台出错"
                      })
                      .show();
                  }
                } else {
                  self
                    .$createToast({
                      type: "warn",
                      txt: "后台出错"
                    })
                    .show();
                }
                // self.temporaryDoorList = [...res.data];
              });
            } else if (
              !self.mUserPlotList[0].domicile &&
              self.mUserPlotList[0].domicile.length > 1
            ) {
              self.$router.push({
                path: "/ma-hu-index/temporary-door-index",
                query: {}
              });
            } else {
              self.$router.push({
                path: "/ma-hu-index/temporary-door-index",
                query: {}
              });
            }
          } else {
            self.$router.push({
              path: "/ma-hu-index/temporary-door-index",
              query: {}
            });
          }
        } else {
          this.$createToast({
            type: "warn",
            txt: "您的社区已被禁用，需要解禁才能使用"
          }).show();
        }
      } else {
        this.$createToast({
          type: "warn",
          txt: "需要先加入社区，才能使用此功能"
        }).show();
      }
    },
    temporaryDoorTouch() {
      this.temporaryDoorStyle = {
        background: "linear-gradient(to bottom, #3388FF, #30C9FF)"
      };
    },
    temporaryDoorTouchEnd() {
      this.temporaryDoorStyle = {
        background: "linear-gradient(to bottom, #30C9FF, #3388FF)"
      };
    },

    // 开门按钮
    openDoor(e) {
      if (e.openStatus === 0) {
        this.$emit("openDoor", {
          recordNumber: e.recordNumber,
          recordTime: e.recordTime
        });
      } else if (e.openStatus === 1) {
        const toast = this.$createToast({
          type: "correct",
          txt: "已经开门了"
        });
        toast.show();
      } else if (e.openStatus === 2) {
        const toast = this.$createToast({
          type: "correct",
          txt: "开门中，请稍后..."
        });
        toast.show();
      } else {
        const toast = this.$createToast({
          type: "correct",
          txt: "状态出错，请刷新"
        });
        toast.show();
      }
    },
    ignoreVisitor(e) {
      this.$emit("ignoreVisitor", {
        recordNumber: e.recordNumber,
        recordTime: e.recordTime
      });
    },
    wxVisitor(e) {
      this.$emit("wxVisitor", { type: e.type, vistorID: e.vistorID });
    },

    /*** 添加访客 ***/
    addVisitor() {
      if (this.mUserHasProprietor) {
        if (this.mUserPlotList.length > 0 && this.mIsPlotBlankDomicile) {
          this.$createAddVisitorPopup();
        } else {
          this.$createToast({
            type: "warn",
            txt: "您的社区已被禁用，需要解禁才能使用"
          }).show();
        }
      } else {
        this.$createToast({
          type: "warn",
          txt: "需要先加入社区，才能使用此功能"
        }).show();
      }
    },
    addVisitorPopupClose(ee) {
      this.setIsShowOtherPop(false);
      // utils.maskTabHide().then((e)=>{
      this.addVisitorPopup = false;
      // CYJ.showTab();
      if (ee.show && ee.show !== "") {
        const toast = this.$createToast({
          type: "correct",
          txt: ee.show
        });
        toast.show();
      }
      // })
    },
    addVisitorTo(e) {
      this.setIsShowOtherPop(false);
      // utils.maskTabHide().then((e)=>{
      this.addVisitorPopup = false;
      // })
    },

    /*** 临时门禁 ***/
    activationOnClick(domicileNumber) {
      this.domicileNumber = domicileNumber;
      //   this.popType = "plainText";
      //   this.popTitle = "激活临时密码";
      //   this.popPlainText =
      //     "临时密码只作为临时使用，请谨慎激活，请勿泄漏给陌生人，是否激活密码？";
      // this.isPopShow = true;
      // this.$createBasePopup();
      this.$createDialog(
        {
          type: "confirm",
          title: "激活临时密码",
          onConfirm: () => {
            this.$post("domicile", "/getRandomPassword", {
              domicileNumber: this.domicileNumber
            }).then(res => {
              this.$createToast({
                type: "correct",
                txt: "临时密码激活成功！"
              }).show();
              this.getValid(this.domicileNumber);
              this.$post("domicile", "/getDomicileMessage", {}).then(res => {
                this.temporaryDoorList = [...res.data];
              });
            });
          }
        },
        h => {
          return [
            h(
              "div",
              {
                class: {
                  "pwd-tips": true
                },
                slot: "content"
              },
              "临时密码只作为临时使用，请谨慎激活，请勿泄漏给陌生人，是否激活密码？"
            )
          ];
        }
      ).show();
    },
    validOnClick(domicileNumber) {
      this.getValid(domicileNumber);
    },
    getValid(domicileNumber) {
      let self = this;
      self
        .$post("domicile", "/showTempPassword", {
          domicileNumber: domicileNumber
        })
        .then(res => {
          let temporaryDoorNumber = res.data.tempCode + "";
          self.temporaryDoorNumberList = temporaryDoorNumber.split("");
          //   self.domicileNumber = domicileNumber;
          //   self.popType = "temporaryDoor";
          //   self.popTitle = "临时密码";
          //   self.isPopShow = true;
          this.$createDialog(
            {
              type: "confirm",
              title: "临时密码",
              cancelBtn: {
                text: "立即失效"
              },
              onCancel: () => {
                this.$post("domicile", "/deletePassword", {
                  domicileNumber
                }).then(res => {
                    
                  this.$createToast({
                    type: "correct",
                    txt: "临时密码取消成功！"
                  }).show();
                });
              }
            },
            h => {
              let numbers = [];
              for (let i = 0; i < self.temporaryDoorNumberList.length; i++) {
                numbers.push(
                  h(
                    "div",
                    {
                      class: {
                        item: true
                      }
                    },
                    self.temporaryDoorNumberList[i]
                  )
                );
              }
              return [
                h(
                  "div",
                  {
                    class: {
                      "pwd-content": true
                    },
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      {
                        class: {
                          "pwd-title": true
                        }
                      },
                      "注：激活后，有效时长默认为6小时"
                    ),
                    h(
                      "div",
                      {
                        class: {
                          "pwd-list": true
                        }
                      },
                      numbers
                    )
                  ]
                )
              ];
            }
          ).show();
          // self.$createBasePopup();
        });
    },
    leftBtnPoppup() {
      this.clearPoppupParameter();
    },
    rightBtnPoppup() {
      let self = this;
      switch (this.popType) {
        case "plainText":
          self
            .$post("domicile", "/getRandomPassword", {
              domicileNumber: self.domicileNumber
            })
            .then(res => {
              self
                .$createToast({
                  type: "correct",
                  txt: "临时密码激活成功！"
                })
                .show();
              self.getValid(self.domicileNumber);
              self.$post("domicile", "/getDomicileMessage", {}).then(res => {
                self.temporaryDoorList = [...res.data];
              });
            });
          break;
        case "temporaryDoor":
          this.clearPoppupParameter();
          break;
        default:
          break;
      }
    },
    clearPoppupParameter() {
      this.popTitle = "";
      this.popType = "";
      this.popPlainText = "";
      this.domicileNumber = "";
      this.temporaryDoorNumberList = [];
      this.isPopShow = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.in-and-out-index-box {
  position: fixed;
  bottom: 0;
  top: 0;
}

.in-and-out-index-today {
  width: 76vw;
  height: 26.6666vw;
  background-color: white;
  border-radius: 1.0666vw;
  padding: 2.4vw 2.6666vw 3.2vw 2.6666vw;
  border: 1px solid rgba(238, 238, 238, 1);
  box-sizing: border-box;
}

.in-and-out-index-visitor {
  width: 16vw;
  height: 12.5333vw;
  background: linear-gradient(to bottom, #42DBC4, #30C9FF);
  border-radius: 1.0666vw;
}

.in-and-out-index-temporary-door {
  width: 16vw;
  height: 12.5333vw;
  background: linear-gradient(to bottom, #30C9FF, #3388FF);
  border-radius: 1.0666vw;
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

.community-empty-wrapper {
  margin: 2.667vw 2.667vw;
  background: #fff;
  border-radius: 1.333vw;
  padding: 5.333vw;
  box-sizing: border-box;

  .title {
    display: flex;
    height: 5.867vw;
    font-size: 4.267vw;
    color: #5C6066;
    font-weight: bold;
    margin-bottom: 5.333vw;
    justify-content: center;
  }

  .intro {
    width: 84vw;
    background: rgba(0, 0, 0, 0.05);
    font-size: 4.267vw;
    color: #2E3033;
    display: flex;
    padding: 5.333vw 7.2vw 2.667vw 7.2vw;
    box-sizing: border-box;

    .left {
      flex: 0 0 29.867vw;
    }

    .right {
      flex: 1;
      display: flex;
      flex-flow: column;

      span {
        margin-bottom: 2.667vw;
      }
    }
  }

  .add-community-btn {
    margin-top: 2.667vw;
    width: 84vw;
    height: 13.333vw;
    background: linear-gradient(96deg, rgba(51, 136, 255, 1) 0%, rgba(48, 202, 255, 1) 100%);
    opacity: 1;
    border-radius: 1.333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.267vw;
    color: #fff;

    &.active {
      background: linear-gradient(96deg, darken(rgba(51, 136, 255, 1), 20%) 0%, darken(rgba(48, 202, 255, 1), 20%) 100%);
    }
  }

  .add-community-btn-red {
    margin-top: 2.667vw;
    width: 84vw;
    height: 13.333vw;
    background: linear-gradient(96deg, rgba(247, 92, 114, 1) 0%, rgba(254, 129, 162, 1) 100%);
    opacity: 1;
    border-radius: 1.333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.267vw;
    color: #fff;

    &.active {
      background: linear-gradient(96deg, darken(rgba(247, 92, 114, 1), 20%) 0%, darken(rgba(254, 129, 162, 1), 20%) 100%);
    }
  }

  .add-community-btn-gray {
    margin-top: 2.667vw;
    width: 84vw;
    height: 13.333vw;
    background: #DDDDDD;
    opacity: 1;
    border-radius: 1.333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.267vw;
    color: #fff;
  }
}

.only-item {
  flex: 1;
  overflow-y: auto;
  height: 100%;
}

.in-out-wrapper {
  background: #fff;
  margin: 2.667vw 0;
  overflow: hidden;

  .in-out-card {
    margin: 2.667vw;
    border-radius: 1.067vw;

    .msg {
      padding: 2.667vw 2.667vw 1.333vw 2.667vw;
      margin-bottom: 2.667vw;
      display: flex;
      flex-flow: column;

      &.active {
        background: #f4f4f4;
      }

      .title {
        font-size: 4.267vw;
        color: #666666;
        font-weight: bold;
        margin-bottom: 5.333vw;
      }

      .content-wrapper {
        display: flex;
        overflow: hidden;

        .left {
          flex: 1;
          overflow: hidden;

          .info {
            height: 5.867vw;
            display: flex;
            align-items: center;

            .user-icon {
              flex: 0 0 4.267vw;
              height: 4.267vw;
              margin-right: 2.667vw;
            }

            .name {
              font-size: 4.267vw;
              color: #666666;
              font-weight: bold;
              margin-right: 1.067vw;
              line-height: 5.867vw;
              height: 5.867vw;
            }

            .role {
              color: #999999;
              font-size: 3.467vw;
              flex: 1;
            }

            .time {
              color: #666;
              font-size: 4vw;
            }
          }

          .address {
            height: 6.667vw;
            line-height: 6.667vw;
            margin-top: 4vw;
            color: #898989;
            font-size: 4.267vw;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .place {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: keep-all;
              white-space: nowrap;
              word-wrap: normal;
              display: inline-block;
            }

            .state {
              color: #E6782B;
              font-size: 3.733vw;
              flex: 0 0 13.333vw;
              text-align: right;
            }
          }
        }

        .right {
          flex: 0 0 8vw;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .icon-right {
            width: 5.333vw;
            height: 5.333vw;
          }
        }
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;

      .item {
        flex: 0 0 32.5%;
        height: 16vw;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #3388FF;
        border-radius: 1.067vw;
        color: #3388FF;

        &.active {
          background: #f4f4f4;
        }

        span {
          font-size: 3.733vw;
          font-weight: bold;
        }

        .icon {
          margin-bottom: 1.867vw;
          flex: 0 0 4.267vw;
          height: 4.267vw;
        }

        &.item-door {
          border: none;
          color: #fff;
          background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);

          &.active {
            background: linear-gradient(135deg, darken(rgba(48, 201, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
          }
        }
      }
    }
  }
}
</style>
<style lang="stylus" >
.pwd-content {
  .pwd-title {
    text-align: center;
    color: #4D4D4D;
    font-size: 3.733vw;
  }

  .pwd-list {
    display: flex;
    justify-content: space-around;
    margin: 4vw 2.667vw 0 2.667vw;

    .item {
      flex: 0 0 10.933vw;
      height: 18.133vw;
      background: #F5F5F5;
      border-radius: 0.533vw;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 8vw;
      color: #E6782B;
    }
  }
}

.pwd-tips {
  margin: 0 8vw;
  text-align: center;
}
</style>