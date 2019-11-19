<!--@Time  : 2019/09/25 15:15-->
<!--@Author: michael huang-->
<!--@File  : in-and-out-index.vue-->

<template>
  <div :class="[isMyHomeInfoListLen>0 ? 'scroll-wrapper-index-page': '']" :style="">
    <cube-scroll ref="myFamilyIndexScroll"
                 :data="visitorIndexList"
                 :options="visitorIndexScrollOptions"
                 :fade="true">
      <div v-if="mUserHasProprietor"
           class="base-horizontal-layout-space-between-item-center"
           style="margin: 2.6666vw 2.6666vw 0 2.6666vw">
        <div class="in-and-out-index-today" :class="['base-vertical-layout-space-between']">
          <div class="base-horizontal-layout-space-between-item-center">
            <p class="base-text-details-large-gray" style="font-weight: bold">出入状况</p>
            <div class="base-horizontal-layout-center-item-center" @click="toRecord">
              <img :src="require('@/assets/icon/icon-menu-in-out-blue.png')" class="base-icon-normal-style" style="margin-right: 1.0666vw">
              <p class="base-text-details-normal-blue">出入记录</p>
            </div>
          </div>
          <div class="base-horizontal-layout-space-between-item-center">
            <div class="base-horizontal-layout-center-item-center">
              <img :src="require('@/assets/icon/icon-person-blue.png')" class="base-icon-normal-style" style="margin-right: 2.6666vw">
              <p v-if="isInAndOutIndexInfoEmpty"
                 class="base-text-title-normal-666" style="font-weight: bold">{{inAndOutIndexInfo.recordName}}</p>
              <p v-else
                 class="base-text-title-normal-666" style="font-weight: bold">---</p>
              <p v-if="isInAndOutIndexInfoEmpty"
                 class="base-text-details-normal-gray-ccc"
                 style="margin-left: 1.0666vw">{{inAndOutIndexInfo.relation}}</p>
            </div>
            <p v-if="isInAndOutIndexInfoEmpty"
               class="base-text-details-normal-black-666">{{getTime(inAndOutIndexInfo.triggeringTime)}}</p>
          </div>
          <div class="base-horizontal-layout-space-between-item-center">
            <p v-if="isInAndOutIndexInfoEmpty"
               class="base-text-details-large-gray"
               style="color: #898989"
            >{{inAndOutIndexInfo.plotName}}{{inAndOutIndexInfo.buildingName}}{{inAndOutIndexInfo.positionName?'-':''}}{{inAndOutIndexInfo.positionName}}</p>
            <p v-else
               class="base-text-details-large-gray"
               style="color: #898989"
            >暂无出入记录</p>
            <p v-if="isInAndOutIndexInfoEmpty"
               style="font-size: 3.7333vw;color: #E6782B"
            >{{(inAndOutIndexInfo.typeDesc==='拜访' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))
              ?'回家': (inAndOutIndexInfo.typeDesc==='离开' && (inAndOutIndexInfo.openType===0 || inAndOutIndexInfo.openType===4))?
              '离家':inAndOutIndexInfo.typeDesc}}</p>
          </div>
        </div>
        <div class="base-vertical-layout-space-between-item-center" style="height: 26.6666vw">
          <div class="in-and-out-index-visitor"
               :class="['base-vertical-layout-center-item-center']"
               :style="visitorStyle"
               @click="toVisitorIndex"
               @touchstart="visitorTouch"
               @touchend="visitorTouchEnd">
            <img :src="require('@/assets/icon/icon-menu.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
            <p class="base-text-details-normal-white">访客管理</p>
          </div>
          <div class="in-and-out-index-temporary-door"
               :class="['base-vertical-layout-center-item-center']"
               :style="temporaryDoorStyle"
               @click="temporaryDoorIndex"
               @touchstart="temporaryDoorTouch"
               @touchend="temporaryDoorTouchEnd">
            <img :src="require('@/assets/door/icon-open-door-white.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
            <p class="base-text-details-normal-white">临时门禁</p>
          </div>
        </div>
      </div>
      <community-empty v-else @toAddCommunityOnClick="toAddCommunity"></community-empty>

      <div style="height: 2.6666vw"></div>
      <img v-if="visitorIndexList.length===0"
           :src="require('@/assets/guanggao/guanggao-1.png')"
           style="width: 94.6666vw;height: 1137.3333vw;margin: 0 2.6666vw">
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
          @wxVisitorOnclick="wxVisitor">
        </visitor-item-index>
      </div>
    </cube-scroll>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'temporaryDoor'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">注：激活后，密码的有效时间默认为6小时</p>
        <div class="base-horizontal-layout-space-between-item-center">
          <div v-for="(item,index) in temporaryDoorNumberList" :key="index"
               style="width: 10.9333vw;height: 18.1333vw;border-radius: 1.0666vw;background-color: #F5F5F5">
            <p style="font-size: 8vw;font-weight: bold;color: #E6782B">{{item}}</p>
          </div>
        </div>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import communityEmpty from '_c/blank/community-empty';
  import visitorItemIndex from '_c/inAndOut/visitor/visitor-item-index';
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "in-and-out-index",
    components: {
      communityEmpty,
      visitorItemIndex,
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

        visitorIndexScrollOptions: {
          stopPropagation: true//阻止事件冒泡
        },

        visitorSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          slidesPerView : "auto",
          centeredSlides: true,

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
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        // 弹窗属性
        isPopShow: false,
        refId: 'myAppPopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        // 弹窗参数
        temporaryDoorNumberList: [],
      }
    },
    computed: {
      ...mapState({
        'mUserHasProprietor': state => state.user.userHasProprietor,
        'mPushInfo': state => state.user.pushInfo
      })
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        let self = this;
        console.log("in-and-out-index:route",to.path);
        if (to.path==="/ma-hu-index") {
          self.getInAndOutIndexInfo();
          self.getVisitorIndexList();
        }
      },
      mPushInfo() {// 收到推送，刷新页面
        let self = this;
        console.log("in-and-out-index:push",self.mPushInfo);
        self.getInAndOutIndexInfo();
        self.getVisitorIndexList();
      }
    },
    created() {
    },
    mounted() {
      let self = this;
      self.getInAndOutIndexInfo();
      self.getVisitorIndexList();
    },
    methods: {
      ...mapActions(
        ['setIsShowOtherPop']
      ),

      getInAndOutIndexInfo() {
        let self = this;
        self.$post("entry","/record",{
          role: 0,
          filter: 0,
          lastID: 0,
          pageSize: 1,
        }).then((res)=>{
          if (res.data.list.length > 0) {
            self.isInAndOutIndexInfoEmpty = true;
            self.inAndOutIndexInfo = [...res.data.list][1];
          }
        });
      },
      getVisitorIndexList() {
        let self = this;
        self.$post("record","/getMyVistorRecord",{}).then((res)=>{
          self.visitorIndexList = [...res.data];
          self.$post("entry","/wxVisitor",{}).then((wxRes)=>{
            wxRes.data.forEach((item)=>{
              self.visitorIndexList.push(item);
            });
          });
        });
      },

      getTime(time) {
        return utils.timetrans(time,"mmddhhmm")
      },

      toAddCommunity() {
        // this.$router.push({path: "/ma-hu-index/community-add"});
      },

      toRecord() {//跳到出入记录
        this.$router.push({path: "/ma-hu-index/inOutRecord", query:{}});
      },
      toVisitorIndex() {//跳到访客主页
        this.$router.push({path: "/ma-hu-index/visitor-index", query:{}});
      },
      visitorTouch() {
        this.visitorStyle = {background: "linear-gradient(to bottom, #30C9FF, #42DBC4)"};
      },
      visitorTouchEnd() {
        this.visitorStyle = {background: "linear-gradient(to bottom, #42DBC4, #30C9FF)"};
      },
      temporaryDoorIndex() {
        this.$router.push({path: "/ma-hu-index/temporary-door-index", query:{}});
      },
      temporaryDoorTouch() {
        this.temporaryDoorStyle = {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"};
      },
      temporaryDoorTouchEnd() {
        this.temporaryDoorStyle = {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"};
      },

      // 开门按钮
      openDoor(e) {
        if(e.openStatus===0) {
          this.$emit('openDoor', {recordNumber: e.recordNumber, recordTime: e.recordTime});
        } else if(e.openStatus===1) {
          const toast = this.$createToast({
            type: "correct",
            txt: "已经开门了"
          });
          toast.show();
        } else if(e.openStatus===2) {
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
        this.$emit('ignoreVisitor', {recordNumber: e.recordNumber, recordTime: e.recordTime});
      },
      wxVisitor(e) {
        this.$emit('wxVisitor', {type: e.type, vistorID: e.vistorID});
      }
    }
  }
</script>

<style scoped>
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
    border: 1px solid rgba(238,238,238,1);
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
</style>