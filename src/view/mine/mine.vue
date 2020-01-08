<template>
  <div class="wrapper-white">
    <index-head
      title="我的"
      :rightTextRightIcon="require('./head-setting.png')"
      @rightOnClick="toSetting">
    </index-head>

    <div style="overflow: scroll;">
      <!--<div class="base-horizontal-layout-general-item-center mine-user-box-animate"-->
      <div class="base-horizontal-layout-general-item-center"
        style="margin: 7vw 5.3333vw 6.6666vw 5.3333vw"
        @click="toUserManage">
        <img :src="isHeadPortrait ? getImageUrl(mUserHeadPortrait) : require('./icon-avatar.png')"
          class="mine-top-head-portrait"/>
        <div class="base-vertical-layout-space-between" style="margin-left: 3.2vw">
          <p class="base-text-title-large-xx-black">{{getNickName()}}</p>
          <p class="base-text-details-large-black" style="margin-top: 1.1vw">{{getPhoneNumber()}}</p>
        </div>
      </div>

      <!--<div class="set-info mine-set-box-animate">-->
      <div v-if="isShowFamily" class="set-info">
        <div class="item" @click="packagesPaySetting">
          <img :src="require('./icon-packages-pay.png')" />
          <span>我的套餐</span>
        </div>
        <div class="item" @click="sharedDeviceSetting">
          <img :src="require('./icon-shared-device.png')" />
          <span>共享设备</span>
        </div>
        <div class="item" @click="networkConfigurationSetting">
          <img :src="require('./icon-network-configuration.png')" />
          <span>网络配置</span>
        </div>
      </div>

      <!--社区设置-->
      <!--<div class="base-vertical-layout-general mine-community-box-animate"-->
      <div v-if="isShowPlotFamily && isShowPlot"
        class="base-vertical-layout-general"
        :style="mUserHasProprietor ? 'margin: 6.6666vw 5.3333vw 4.3333vw 5.3333vw' : 'margin: 6.6666vw 5.3333vw 2.6666vw 5.3333vw'">
        <p class="base-text-title-normal-666">{{menuList.communityMenuList.title}}</p>
        <div v-if="mUserHasProprietor"
          class="base-horizontal-layout-space-between-item-center"
          style="margin-top: 2.6666vw">
          <div v-for="(item,index) in menuList.communityMenuList.details"
            :key="index"
            class="base-vertical-layout-center-item-center setItem"
            style="width: 21.8666vw;height: 18.6666vw"
            @click="menuOnClick(item.title)">
            <img :src="(!isPark&&item.title==='车辆管理')?item.disableIcon:item.icon"
              style="width: 6vw;height: 5.3333vw;margin-bottom: 2.1333vw"/>
            <!--:style="!isPark?{filter: '#999',filter: 'grayscale(100%)'}:{}"-->
            <p class="base-text-details-normal-black-666" style="font-size: 4vw"
              :class="{'base-text-details-normal-gray':(!isPark&&item.title==='车辆管理')}">{{item.title}}</p>
          </div>
        </div>
        <div v-else>
          <div class="base-horizontal-layout-center-item-center"
            :class="applyCommunityInfo.status===2 ? 'mine-set-community-btn-disable-no-pass' :
             applyCommunityInfo.status===3 ? 'mine-set-community-btn-disable' : 'mine-set-community-btn'"
            style="margin-top: 2.6666vw">
            <div v-if="applyCommunityLen===0 || (applyCommunityLen>0 && applyCommunityInfo.status===1)"
                 class="base-horizontal-layout-center-item-center">
              <img :src="require('./icon-community-join-first.png')"
                class="base-icon-large-style"
                style="margin-right: 2.1333vw"/>
              <p class="base-text-title-normal-white">加入社区</p>
            </div>
            <div v-else-if="applyCommunityLen>0 && (applyCommunityInfo.status===0 || applyCommunityInfo.status===2)"
              class="base-horizontal-layout-center-item-center">
              <p class="base-text-title-normal-white"
              >当前进程：{{applyCommunityInfo.status===0?'未审核':applyCommunityInfo.status===2?'不通过':''}}</p>
              <p class="base-text-details-large-white" style="margin-left: 8vw">修改信息</p>
            </div>
            <div v-else-if="applyCommunityLen>0 && applyCommunityInfo.status===3"
              class="base-horizontal-layout-center-item-center">
              <p class="base-text-details-large-white" style="color: #999999">当前进程：审核中</p>
            </div>
          </div>
          <div style="position: relative;bottom: 21.3333vw;left: 0"
            @click="addCommunity(applyCommunityLen===0?-1:applyCommunityInfo.status)"
            @touchstart="addCommunityTouch"
            @touchend="addCommunityTouchEnd">
            <div class="base-horizontal-layout-center-item-center"
              style="position: absolute;width: 88.3333vw;height: 21.3333vw;border-radius: 1.33vw"
              :style="isOnTouch ? 'background-color: rgba(0,0,0,0.1)' : ''">
            </div>
          </div>
        </div>
      </div>

      <!--<div class="menu mine-other-box-animate">-->
      <div class="menu">
        <div
          :class="['item', item.subTitle ? 'item-large' : '']"
          v-for="(item,index) in menuList.otherMenuList.details"
          :key="index"
          @click="menuOnClick(item.title)">
          <div class="icon">
            <img :src="item.icon"/>
          </div>
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="sub-title" v-if="item.subTitle">{{item.subTitle}}</div>
          </div>
          <div class="right-icon">
            <img :src="require('@/assets/icon/icon_arrow-right-small.png')" />
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import utils from "_libs/utils";
import indexHead from "_c/head/index-head";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "mine",
  components: {
    indexHead
  },
  data() {
    return {
      options: {
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false,
        pullDownRefresh: false,
        pullUpLoad: false
      },

      isHeadPortrait: false,
      typeIsFamily: false,
      typeIsGate: false,
      isPark: false,

      menuList: {
        mainMenuList: {
          title: "",
          details: [
            // {
            //   title: "我的套餐",
            //   icon: require('./.png'),
            //   isChoose: true,
            // },
            {
              title: "我的套餐",
              icon: require("./icon-packages-pay.png"),
              isChoose: true
            },
            {
              title: "共享设置",
              icon: require("./icon-shared-device.png"),
              isChoose: true
            },
            {
              title: "网络配置",
              icon: require("./icon-network-configuration.png"),
              isChoose: true
            }
          ]
        },
        communityMenuList: {
          title: "家庭社区设置",
          details: [
            {
              title: "社区管理",
              icon: require("./icon-community.png")
            },
            {
              title: "出入认证",
              icon: require("./icon-community-auth.png")
            },
            {
              title: "车辆管理",
              icon: require("./icon-car.png"),
              disableIcon: require("./icon-car-gray.png")
            }
          ]
        },
        otherMenuList: {
          title: "",
          details: [
            {
              title: "我的优惠券包",
              icon: require("./icon-mine-cardBag.png")
            },
            // {
            //   title: "社区人员认证",
            //   icon: require('./icon-mine-gate-renlian.png')
            // },
            {
              title: "修改登录密码",
              icon: require("./icon-mine-password.png")
            },
            {
              title: "修改绑定手机",
              icon: require("./icon-mine-phone.png")
            },
            // {
            //   title: "操作权限设置",
            //   icon: require('./icon-mine-authority.png')
            // }
            {
              title: "绑定微信服务",
              subTitle: "账号绑定微信后，可以由微信接收信息",
              icon: require("./icon-mine-weChar.png")
            }
          ]
        }
      },

      isMainOneOnTouch: false,
      isMainTwoOnTouch: false,
      isMainThreeOnTouch: false,
      isOnTouch: false,
      addCommunityOnClickStyle: {},

      sharedDeviceSettingStyle: {},
      networkConfigurationSettingStyle: {},

      applyCommunityLen: 0,
      applyCommunityInfo: {},

      isShowFamily: false,
      isShowPlotFamily: false,
      isShowPlot: false,
    };
  },
  computed: {
    ...mapState({
      'mUserNickName': state => state.user.userNickName,
      'mUserHeadPortrait': state => state.user.userHeadPortrait,
      'mUserPhone': state => state.user.userPhone,
      'mUserHasProprietor': state => state.user.userHasProprietor,
      'mUserPlotList': state => state.user.userPlotList,
      'mFamilyPlotList': state => state.plot.familyPlotList,
      'mAreaTypesList': state => state.user.areaTypesList,

      'mIsPlotBlankDomicile': state => state.plot.isPlotBlankDomicile
    })
  },
  created() {
    console.log("mine", "/mine");
    if(!this.mUserHasProprietor && this.mAreaTypesList && this.mAreaTypesList.indexOf(2)!==-1) {
      this.isShowPlotFamily = false;
    } else {
      this.isShowPlotFamily = true;
    }

    if(!this.mUserHasProprietor && this.mAreaTypesList && this.mAreaTypesList.indexOf(1)!==-1) {
      this.isShowPlot = false;
    } else {
      this.isShowPlot = true;
    }

    if(this.mAreaTypesList.length>0) {
      this.isShowFamily = true;
    } else {
      this.isShowFamily = false;
    }

    let communityMenuList1 = [
      // {
      //   title: "加入社区",
      //   icon: require('./icon-community-join.png')
      // },
      {
        title: "社区管理",
        icon: require("./icon-community.png")
      },
      {
        title: "出入认证",
        icon: require("./icon-community-auth.png")
      },
      {
        title: "车辆管理",
        icon: require("./icon-car.png")
      }
    ];
    let communityMenuList2 = [
      // {
      //   title: "加入社区",
      //   icon: require('./icon-community-join.png')
      // },
      {
        title: "出入认证",
        icon: require("./icon-community-auth.png")
      },
      {
        title: "社区管理",
        icon: require("./icon-community.png")
      }
    ];

    // let isPark = false;
    this.mFamilyPlotList.forEach((item)=> {
      if(item.parkId) {
        this.isPark = true;
      }
    });
    // this.mUserPlotList.forEach((item, index) => {
    //   if (item.parkId) {
    //     isPark = true;
    //   }
    //   if (index === this.mUserPlotList.length - 1) {
    //     if (isPark) {
    //       this.isPark = true;
    //       // this.menuList.communityMenuList.details = [...communityMenuList1];
    //     } else {
    //       this.isPark = false;
    //       // this.menuList.communityMenuList.details = [...communityMenuList2];
    //     }
    //   }
    // });
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
     /* console.log("watch mine", this.$route.path);
      if (localStorage.getItem("communityChangeOne")) {
        this.getApplyCommunity();
        localStorage.removeItem("communityChangeOne");
      }*/
     if(to.path=='/mine'){
       this.init();
     }
    }
  },
  mounted() {
    this.init();
    this.mAreaTypesList.forEach(item => {
      if (item === 0) {
        this.typeIsFamily = true;
      } else if (item === 2) {
        this.typeIsGate = true;
        this.menuList.otherMenuList.details.unshift({
          title: "社区人员认证",
          icon: require("./icon-mine-gate-renlian.png")
        });
      }
    });
  },

  methods: {
    ...mapActions([
      "setIsShowMinePop",
      "setUserHasProprietor",
      "setUserPlotList",
      "setFamilyPlotList",
      "setAreaTypesList"
    ]),
    getImageUrl(url){
      return utils.getImageUrl(url,80,80);
    },
    init(){
      let self = this;
      this.getApplyCommunity();
      this.getHeadPortrait();

      self.$post("common", "/infos", {}).then(res => {
        self.setUserHasProprietor(res.data.infos.hasProprietor);
        res.data.plots.forEach((item)=>{
          if(item.domicile) {
            item.domicile.forEach((domicileItem,index,arr)=>{
              if(domicileItem.effectiveStatus === 1) {
                arr.splice(index,1)
              }
            });
          }
        });
        let plots = [...res.data.plots];
        self.setUserPlotList([...plots]);

        let familyPlotList = [];
        for (let count = 0; count < plots.length; count++) {
          familyPlotList.push({
            value: plots[count].plotID,
            text: plots[count].plotName,
            plotId: plots[count].plotID,
            parkId: plots[count].parkId,
            temporaryCount: plots[count].temporaryCount
          });
        }
        self.setFamilyPlotList([...familyPlotList]);

        let areaTypes = [],areaTypesIndex = 0;
        res.data.infos.areaTypes.forEach((item,index)=>{
          if(item === 0) {
            areaTypes.push(0);
          } else if(item === 1){
            areaTypes.push(1);
          }
          areaTypesIndex = index;
        });
        if(res.data.infos.areaTypes && res.data.infos.areaTypes.length>0) {
          if((areaTypesIndex+1) === res.data.infos.areaTypes.length) {
            if(res.data.infos.propertyManage && res.data.infos.propertyManage===1) {
              areaTypes.push(2);
              self.setAreaTypesList([...areaTypes]);
            }
          }
        } else {
          if(res.data.infos.propertyManage && res.data.infos.propertyManage===1) {
            areaTypes.push(2);
            self.setAreaTypesList([...areaTypes]);
          }
        }
      });
    },
    getNickName() {
      //获取昵称
      let str = ""; //的家
      return (this.mUserNickName ? this.mUserNickName : this.mUserPhone) + str;
    },
    getHeadPortrait() {
      //获取头像
      if (this.mUserHeadPortrait) {
        this.isHeadPortrait = true;
      } else {
        this.isHeadPortrait = false;
      }
    },
    getPhoneNumber() {
      //获取电话号码
      // return this.mUserPhone;
      return utils.hiddenPhoneNum(this.mUserPhone);
    },

    getApplyCommunity() {
      //获取申请社区信息
      let self = this;
      self.$post("community", "/myNewApply", {}).then(res => {
        if(res.data.list) {
          self.applyCommunityLen = [...res.data.list].length;
          if (self.applyCommunityLen > 0) {
            self.applyCommunityInfo = [...res.data.list][0];
          } else {//todo
            self.applyCommunityInfo = {};
          }
        }
      });
    },

    // toUserManage() {//pop
    //   this.setIsShowMinePop(true);
    // },

    toSetting() {
      this.$router.push({
        path: "/mine/setting"
      });
      // this.$router.push({
      //   path: "/mine/help"
      // });
    },
    toUserManage() {
      this.$router.push({
        path: "/mine/userManage"
      });
    },

    menuOnClick(title) {
      console.log(title);
      switch (title) {
        case "加入社区":
          this.$router.push({
            path: "/mine/community-add-manage"
          });
          break;
        case "出入认证":
          this.toPersonnelManage();
          break;
        case "车辆管理":
          if (this.isPark) {
            this.toCarManage();
          } else {
            const toast = this.$createToast({
              type: "warn",
              txt: "车辆管理不可用"
            });
            toast.show();
          }
          break;
        case "社区管理":
          this.toCommunityManage();
          break;
        case "共享设备":
          this.$router.push({
            path: "/mine/share-manage"
          });
          break;
        case "摄像头配网":
          utils.openCameraConfig();
          break;
        case "主机配网":
          utils.openMainframeConfig();
          break;
        case "社区人员认证":
          utils.openFaceProp();
          break;
        case "我的优惠券包":
          this.$router.push({
            path: "/mine/card-bag"
          });
          break;
        case "修改登录密码":
          this.$router.push({
            path: "/mine/changePwd"
          });
          break;
        case "修改绑定手机":
          this.$router.push({
            path: "/mine/changePhone"
          });
          break;
        case "绑定微信服务":
          this.$router.push({
            path: "/mine/weChat-index"
          });
          break;
        default:
          break;
      }
    },
    toPersonnelManage() {
      //出入人员认证
      if (this.mUserHasProprietor) {
        if(this.mUserPlotList.length > 0 && this.mIsPlotBlankDomicile) {
          utils.openFace();
        } else {
          this.$createToast({
            type: "warn",
            txt: "您的社区已被禁用，需要解禁才能使用"
          }).show();
        }
      } else {
        const dialog = this.$createDialog({
          type: "confirm",
          icon: "",
          title: "需要先加入社区，才能使用此功能",
          content: "或者确认已经加入社区后，重新登录吗？",
          confirmBtn: {
            text: "确定",
            active: true,
            disabled: false,
            href: "javascript:;"
          },
          cancelBtn: {
            text: "取消",
            active: false,
            disabled: false,
            href: "javascript:;"
          },
          onConfirm: () => {
            utils.logout();
          },
          onCancel: () => {
            // this.$createToast({
            //   type: 'warn',
            //   time: 1000,
            //   txt: '点击取消按钮'
            // }).show()
          }
        });
        dialog.show();
        // const toast = this.$createToast({
        //   type: "warn",
        //   txt: "需要先加入社区，才能使用此功能"
        // });
        // toast.show();
      }
    },
    toCarManage() {
      //车辆管理
      let self = this;
      if(this.mUserHasProprietor) {
        if (self.mUserPlotList.length > 0 && self.mIsPlotBlankDomicile) {
          self.$router.push({
            path: "/mine/myCar"
          });
          //   self.changeIsPopShowFalse();
        } else {
          this.$createToast({
            type: "warn",
            txt: "您的社区已被禁用，需要解禁才能使用"
          }).show();
        }
      } else {
        const toast = this.$createToast({
          type: "warn",
          txt: "请先加入社区"
        });
        toast.show();
      }
    },
    toCommunityManage() {
      //社区管理
      let self = this;
      if (self.mUserHasProprietor) {
        self.$router.push({path: "/mine/myPlot"});
        //self.changeIsPopShowFalse();
      } else {
        const toast = this.$createToast({
          type: "warn",
          txt: "请先加入社区"
        });
        toast.show();
      }
    },

    addCommunity(type) {
      let self = this;
      switch (type) {
        case -1:
          self.$router.push({ path: "/mine/community-add",
            query: { chooseCityPath: '/mine/community-add/choose-city',
              choosePlotPath: '/mine/community-add/choose-plot' }});
          break;
        case 0:
          self.$router.push({path: "/mine/community-add",
            query: { applyID: self.applyCommunityInfo.applyID,
              chooseCityPath: '/mine/community-add/choose-city',
              choosePlotPath: '/mine/community-add/choose-plot'}});
          break;
        case 1://todo 已审核通过，不过被禁用
          self.$router.push({ path: "/mine/community-add",
            query: { chooseCityPath: '/mine/community-add/choose-city',
              choosePlotPath: '/mine/community-add/choose-plot'}});
          break;
        case 2:
          self.$router.push({path: "/mine/community-add",
            query: { applyID: self.applyCommunityInfo.applyID,
              chooseCityPath: '/mine/community-add/choose-city',
              choosePlotPath: '/mine/community-add/choose-plot' }});
          break;
        case 3:
          this.$createToast({
            type: "warn",
            txt: "物管审核中，请耐心等待..."
          }).show();
          break;
        default:
          this.$createToast({
            type: "warn",
            txt: "后台异常"
          }).show();
          break;
      }
    },
    addCommunityTouch() {
      this.isOnTouch = true;
    },
    addCommunityTouchEnd() {
      this.isOnTouch = false;
    },

    /*** 方块点击移动方法 ***/
    allSetting() {
      // this.sharedDeviceSettingStyle = {width: "42.6666vw",transition: "width ease-in 0.3s"};
      // this.networkConfigurationSettingStyle = {width: "42.6666vw",transition: "width ease-in 0.3s"};
      // setTimeout(()=>{
      //   this.menuList.mainMenuList.details[0].isChoose = true;
      //   this.menuList.mainMenuList.details[1].isChoose = true;
      // },300);
    },
    packagesPaySetting() {
      utils.stopBubbling(event);
      // const toast = this.$createToast({
      //   type: "warn",
      //   txt: "暂未开放"
      // });
      // toast.show();
      this.$router.push({
        path: "/mine/packages-pay"
      });
    },
    // packagesPaySettingTouch() {
    //   this.isMainOneOnTouch = true;
    // },
    // packagesPaySettingTouchEnd() {
    //   this.isMainOneOnTouch = false;
    // },
    sharedDeviceSetting() {
      utils.stopBubbling(event);
      this.$router.push({
        path: "/mine/share-manage"
      });
    },
    // sharedDeviceSettingTouch() {
    //   this.isMainTwoOnTouch = true;
    // },
    // sharedDeviceSettingTouchEnd() {
    //   this.isMainTwoOnTouch = false;
    // },
    networkConfigurationSetting() {
      utils.stopBubbling(event);
      this.$router.push({
        path: "/mine/network-index"
      });
    },
    networkConfigurationSettingTouch() {
      this.isMainThreeOnTouch = true;
    },
    networkConfigurationSettingTouchEnd() {
      this.isMainThreeOnTouch = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.mine-top-head-portrait {
  width: 19.2vw;
  height: 19.2vw;
  box-sizing: border-box;
  border-radius: 50%;
  /* border-style: solid; */
  /* border-color: white; */
  /* border-width: 2px 2px 2px 2px; */
}

.mine-user-box-animate {
  animation: mineUserAnimate 2s ease 1;
  animation-fill-mode: forwards;
  -webkit-animation: mineUserAnimate 1s ease 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes mineUserAnimate {
  0% {
    transform: translateY(-50vw);
    opacity: 0;
  }

  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}

@keyframes mineUserAnimate {
  0% {
    -webkit-transform: translateY(-50vw);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0vw);
    opacity: 1;
  }
}

.mine-set-box-animate {
  animation: mineSetAnimate 2s ease 1;
  animation-fill-mode: forwards;
  -webkit-animation: mineSetAnimate 1s ease 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes mineSetAnimate {
  0% {
    transform: translateX(-50vw);
    opacity: 0;
  }

  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
}

@keyframes mineSetAnimate {
  0% {
    -webkit-transform: translateX(-50vw);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0vw);
    opacity: 1;
  }
}

.mine-set-shared-device-btn {
  width: 28.2666vw;
  height: 21.2222vw;
  background-image: url('../../assets/background/bg-blue-btn.png');
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1.33vw;
}

.mine-set-network-configuration-btn {
  width: 28.2666vw;
  height: 21.2222vw;
  background-image: url('../../assets/background/bg-green-btn.png');
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1.33vw;
}

.mine-set-on-touch-btn {
  position: absolute;
  width: 28.2666vw;
  height: 21.2222vw;
  border-radius: 1.33vw;
}

.mine-set-community-btn {
  width: 88.3333vw;
  height: 21.3333vw;
  background-image: url('./bg-community.png');
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1.33vw;
}

.mine-set-community-btn-disable {
  width: 88.3333vw;
  height: 21.3333vw;
  background-image: url('./bg-community-disable.png');
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1.33vw;
}

.mine-set-community-btn-disable-no-pass {
  width: 88.3333vw;
  height: 21.3333vw;
  background-image: url('../../assets/background/bg-red.png');
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1.33vw;
}

.mine-community-box-animate {
  animation: communityAnimate 2s ease 1;
  animation-fill-mode: forwards;
  -webkit-animation: communityAnimate 1s ease 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes communityAnimate {
  0% {
    transform: translateX(50vw);
    opacity: 0;
  }

  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
}

@keyframes communityAnimate {
  0% {
    -webkit-transform: translateX(50vw);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0vw);
    opacity: 1;
  }
}

.mine-other-box-animate {
  animation: otherAnimate 2s ease 1;
  animation-fill-mode: forwards;
  -webkit-animation: otherAnimate 1s ease 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes otherAnimate {
  0% {
    transform: translateY(50vw);
    opacity: 0;
  }

  100% {
    transform: translateY(0vw);
    opacity: 1;
  }
}

@keyframes otherAnimate {
  0% {
    -webkit-transform: translateY(50vw);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0vw);
    opacity: 1;
  }
}

.wrapper-white {
  overflow: auto;
}

.set-info {
  padding: 0 5.333vw;
  display: flex;
  justify-content: space-between;

  .item {
    width: 28.267vw;
    height: 18.133vw;
    background: linear-gradient(180deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
    opacity: 1;
    border-radius: 1.6vw;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    &:active {
      background: linear-gradient(180deg, darken(rgba(48, 201, 255, 1), 15%) 0%, darken(rgba(51, 136, 255, 1), 15%) 100%);
    }

    img {
      width: 5.333vw;
      height: 5.333vw;
    }

    span {
      margin-top: 1.6vw;
    //   font-size: 3.2vw;
      font-size:4vw;
      color: #fff;
    }
  }
}

.setItem {
  &:active {
    background: #f4f4f4;
  }
}

.menu {
  padding-bottom: 15.5vw;

  .item {
    display: flex;
    height: 16vw
    padding: 0 8vw;
    align-items: center;

    &.item-large {
      height: 18.667vw;
      align-items: flex-start;
      padding-top: 4.8vw;
      box-sizing: border-box;
    }

    &:active {
      background: #f4f4f4;
    }

    .icon {
      flex: 0 0 4.267vw;
      margin-right: 1.067vw;

      img {
        display: block;
        width: 4.267vw;
      }
    }

    .text {
      flex: 1;
      font-size: 4.267vw;
      color: #666;

      .sub-title {
        margin-top: 1.6vw;
        font-size: 3.733vw;
        color: #999;
      }
    }

    .right-icon {
      flex: 0 0 3.2vw;

      img {
        display: block;
        width: 3.2vw;
      }
    }
  }
}
</style>



