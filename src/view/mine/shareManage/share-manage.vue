<!--@Time  : 2019/09/05 16:50-->
<!--@Author: michael huang-->
<!--@File  : share-manage.vue-->

<template>
  <div class="wrapper">
    <return-head>
      <div slot="title" class="share-manage-title-middle">
        <cube-tab-bar
          v-model="selectedLabel"
          show-slider
          :use-transition="tabDisabled"
          ref="shareManageTabNav"
          :data="tabLabels">
        </cube-tab-bar>
      </div>
    </return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="slideScroll"
        @change="changePage">
        <!-- 共享 -->
        <cube-slide-item>
          <cube-scroll
            ref="shareManageitemShareScroll"
            class="scroll-wrapper-text-style"
            :options="options"
            :fade="true"
            :data="mineManageInfoList">
            <share-manage-item-share
              v-for="(item,index) in mineManageInfoList" :key="index"
              :mineManageInfo="item"
              @editNameOnclick="changeName">
            </share-manage-item-share>
          </cube-scroll>
        </cube-slide-item>
        <!-- 接受 -->
        <cube-slide-item>
          <cube-scroll
            ref="shareManageitemAcceptScroll"
            class="scroll-wrapper-text-style"
            :options="options"
            :fade="true"
            :data="shareToManageInfoList">
            <share-manage-item-accept
              v-for="(item,index) in shareToManageInfoList" :key="index"
              :acceptInfo="item"
              @exitShareAcceptOnclick="exitShareAccept">
            </share-manage-item-accept>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!-- 修改名称 -->
      <div v-if="popType === 'editName'">
        <input class="popup-input"
               v-model="shareManageName"
               placeholder="请输入需要修改的名称"
               maxlength="8"
               style="border:none;resize:none;outline:none"/>
      </div>
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
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
  import shareManageItemShare from '_c/mine/shareManage/share-manage-item-share';
  import shareManageItemAccept from '_c/mine/shareManage/share-manage-item-accept';
  import basePopup from '_c/popup/base-popup';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "share-manage",
    components: { returnHead, shareManageItemShare, shareManageItemAccept, basePopup },
    data() {
      return {
        // tab参数
        selectedLabel: "共享",
        tabDisabled: false,
        tabLabels: [
          {
            label: "共享"
          },
          {
            label: "接受"
          }
        ],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },

        // 滚动参数
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
        },

        mineManageInfoList: [],
        shareToManageInfoList: [],

        // 弹窗属性
        isPopShow: false,
        refId: 'shareManagePopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        popPlainText: '',
        // 弹窗参数
        shareManageName: '',
        shareUserNumber: '',
        machineId: '',
        myId: ''
      }
    },
    computed: {
      initialIndex() {
        let index = 0;
        index = this.findIndex(
          this.tabLabels,
          item => item.label === this.selectedLabel
        );
        return index;
      },

      ...mapState({
        'mIsDeleteShareMachine': state => state.layout.isDeleteShareMachine,
      })
    },
    watch: {
      //监听路由变化
      $route( to , from ) {
        let self = this;
        if (this.$route.path === "/mine/share-manage") {
          if (this.mIsDeleteShareMachine) {
            self.$post("machine", "/getShareMachine", {
              selfShare: true
            }).then((res) => {
              self.mineManageInfoList = [...res.data];
              self.setIsDeleteShareMachine(false);
            });
          }
        }
      }
    },
    created() {
    },
    mounted() {
      this.getMineShareMachine(true);
      this.getMineShareMachine(false);
    },
    methods: {
      ...mapActions(
        ['setIsDeleteShareMachine']
      ),

      slideScroll(pos) {
        const x = Math.abs(pos.x);
        const tabItemWidth = this.$refs.shareManageTabNav.$el.clientWidth;
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
        const deltaX = (x / slideScrollerWidth) * tabItemWidth; // 13.6002
        this.$refs.shareManageTabNav.setSliderTransform(deltaX);
      },
      changePage(current) {
        this.selectedLabel = this.tabLabels[current].label;
        console.log(current);
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

      getMineShareMachine(selfShare) {
        let self = this;
        self.$post("machine", "/getShareMachine", {
          selfShare: selfShare
        }).then((res) => {
          selfShare ? self.mineManageInfoList = [...res.data] : self.shareToManageInfoList = [...res.data];
        });
      },

      changeName(e) {//修改名称
        this.popType = "editName";
        this.myId = e.id;
        this.shareManageName = e.name;
        this.popTitle = "设置"+e.type+"名称";
        this.isPopShow = true;
      },
      exitShareAccept(e) {//退出共享
        this.shareUserNumber = e.shareUserNumber;
        this.machineId = e.machineId;
        this.popType = "plainText";
        this.popTitle = "退出设备共享";
        this.popPlainText = "您确定要退出该设备的共享？";
        this.isPopShow = true;
      },
      leftBtnPoppup() {
        this.clearPoppupParameter();
      },
      rightBtnPoppup() {
        let self = this;
        switch (this.popType) {
          case "editName":
            if(this.popTitle.indexOf("家庭")>-1) {
              self.$post("hArea", "/setName", {
                id: self.myId,
                name: self.shareManageName
              }).then((res) => {
                const toast = this.$createToast({
                  type: "correct",
                  txt: "家庭名称已设置成功"
                });
                toast.show();
                self.getMineShareMachine(true);
              });
            }
            if(this.popTitle.indexOf("主机")>-1) {
              self.$post("machine", "/setName", {
                id: self.myId,
                name: self.shareManageName
              }).then((res) => {
                const toast = this.$createToast({
                  type: "correct",
                  txt: "主机名称已设置成功"
                });
                toast.show();
                self.getMineShareMachine(true);
              });
            }
            if(this.popTitle.indexOf("摄像头")>-1) {
              self.$post("camera", "/setName", {
                id: self.myId,
                name: self.shareManageName
              }).then((res) => {
                const toast = this.$createToast({
                  type: "correct",
                  txt: "摄像头名称已设置成功"
                });
                toast.show();
                self.getMineShareMachine(true);
              });
            }
            break;
          case "plainText":
            self.$post("machine", "/deleteShareMachine", {
              machineId: self.machineId
            }).then((res) => {
              const toast = this.$createToast({
                type: "correct",
                txt: "您已成功退出"
              });
              toast.show();
              self.getMineShareMachine(false);
            });
            break;
          default:
            break
        }
        this.clearPoppupParameter();
      },
      clearPoppupParameter() {//清空弹窗参数
        this.isPopShow = false;
        this.popTitle = "";
        this.popType = "";
        this.popCancelText = "";
        this.popSureText = "";
        this.popPlainText = "";

        this.shareManageName = "";
        this.shareUserNumber = "";
        this.machineId = "";
        this.myId = "";
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cube-tab-bar {
    width: 100%;
    justify-content: space-between;
  }

  >>>.cube-tab {
    width: 20vw;
    color: #b3b3b3;
    font-size: 4.2667vw;
    font-weight: bold !important;
    flex: 1;

    &.cube-tab_active {
      color: #38F;
    }
  }

  >>>.cube-tab-bar-slider {
    background-color: #38F;
    width: 8.5333vw !important;
    left: 5.5vw;
  }
</style>

<style scoped>
  .share-manage-title-middle {
    /*flex: 1;*/
    padding: 0 11.4667vw;
    box-sizing: border-box;
    display: flex;
  }
</style>