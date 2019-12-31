<!--@Time  : 2019/09/26 15:31-->
<!--@Author: michael huang-->
<!--@File  : vistor-index.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="访客管理" rightText="添加访客" @rightBtnOnClick="addVisitor">
      <!--<div slot="menu" >-->
      <!--<img :src="require('@/assets/visitor/icon-visitor-add-colorful.png')" style="width: 4.2666vw;height: 4.2666vw;margin-right: 1.0666vw">-->
      <!--</div>-->
    </return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll style="margin: 0 2.6666vw"
                :options = "options"
                   ref="scroll"
                   @pulling-up="onPullingUp()">
        <div
          v-for="(item,index) in visitorList"
          :key="index"
          class="visitor-index-item-box"
          :class="{'base-vertical-layout-space-between':true,
             'base-background-img-blue-light':item.valid,
             'base-background-img-gray':!item.valid ||item.status==2 }">
          <!--'base-background-img-blue-light':(item.valid || (!item.valid && item.status===0)),-->
          <!--'base-background-img-gray':(!item.valid && item.status===1)}"-->
          <div :class="['name-info', !item.valid || item.status==2 ? '' : 'valid']">
            <div class="left">
              <span class="name">{{item.vistorName ? item.vistorName : '匿名'}}</span>
              <img class="gender"
                :src="item.vistorSex==='男' ? require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')"/>
              <span class="phone">{{item.vistorPhone}}</span>
            </div>
            <div class="right">
              <!--已过期-->
              <img v-if="!item.valid && item.status!==2" :src="require('./icon-expiration.png')" style="width: 12vw;height: 9.6vw">
              <!--已拒绝-->
              <img v-if="item.status===2" :src="require('./icon-refuse.png')" style="width: 12vw;height: 9.6vw">
            </div>
          </div>

          <div :class="['other-info', !item.valid || item.status==2 ? '' : 'valid']">
            <div class="left">
              <span class="name">{{`${item.plotName}-${item.buildingName}-${item.doorName}`}}</span>
              <span v-if="item.carNumber" class="carNumber">{{item.carNumber}}</span>
              <span class="time">
                {{item.startTime}}<span>{{item.wxOpenId?'来源:微信':''}}</span>
              </span>
            </div>
            <div class="right">
              <div
                v-if="item.status===1"
                class="visitor-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="showPoppup('删除',index,item.vistorID)"
              >
                <span>删除访客</span>
              </div>
              <div
                v-else-if="item.valid && item.status===0"
                class="visitor-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="showPoppup('拒绝',index,item.vistorID)"
              >
                <span>拒绝</span>
              </div>
              <div
                v-else-if="(!item.valid && item.status===0 )|| item.status===2"
                class="visitor-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="showPoppup('删除',index,item.vistorID)"
              >
                <span>删除访客</span>
              </div>
              <div
                v-if="item.valid && item.status===0"
                class="visitor-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="showPoppup('同意',index,item.vistorID)"
              >
                <span>同意</span>
              </div>
              <div
                v-else-if="item.valid && item.status===1"
                class="visitor-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="useShare(item.vistorID)"
              >
                <img :src="require('./icon_qcode.png')" class="base-icon-small-style" />
                <span>分享二维码</span>
              </div>
              <div
                v-else-if="!item.valid || item.status===2"
                class="visitor-btn re-btn"
                @touchstart="addActiveCls"
                @touchend="removeActiveCls"
                @click="editProfile(item)"
              >
                <span>重新激活</span>
              </div>
              <!--   <div v-else-if="!item.valid && item.status===0"
                   class="base-horizontal-layout-center-item-center"
                   style="width: 26.1333vw;height: 8.5333vw;margin-top: 2.6666vw;border-radius: 1.0666vw;
                          background: linear-gradient(to bottom , #30C9FF, #38F)"
                   @click="editProfile(item)">
                <p class="base-text-details-normal-white">重新激活</p>
              </div>-->
            </div>
          </div>
        </div>
        <!-- <p
          class="base-text-title-normal-gray lx_no_more"
          style="margin: 4vw;text-align: center"
          v-if="!options.pullUpLoad"
        >没有更多了~</p> -->

        <button-add-quick
          v-if="visitorList.length===0"
          style="margin-top: 2.9vw"
          :text="visitorList.length===0?'暂无访客，先添加访客吧~':'添加访客'"
          iconType="visitor"
          @btnOnClick="addVisitor"
        ></button-add-quick>
        <div style="height: 2.9vw"></div>
      </cube-scroll>
      <pull-up-load  v-if="options.pullUpLoad"></pull-up-load>
    </div>

    <addVisitorPopup
      v-if="addVisitorPopup"
      @addVisitorClose="addVisitorPopupClose"
      @addVisitorTo="addVisitorTo"
    />

    <base-popup
      v-if="isPopShow"
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

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import buttonAddQuick from "_c/button/button-add-quick";
import addVisitorPopup from "_c/inAndOut/addVisitorPopup";
import basePopup from "_c/popup/base-popup";
import pullUpLoad from "_c/pullUpLoad";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { addClass, removeClass } from "_libs/dom";

export default {
  name: "visitor-index",
  components: { returnHead, buttonAddQuick, addVisitorPopup, basePopup,pullUpLoad },
  data() {
    return {
      visitorList: [],
      addVisitorPopup: false,

      // 弹窗属性
      isPopShow: false,
      refId: "vistorPopup",
      popTitle: "",
      popPlainText: "",
      visitorID: "",
      visitorStatus: 0,
      page:1,
      pageSize: 10,
      options: {
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false,
        pullUpLoad: {
          txt: { more: "没有更多", noMore: "没有更多" },
          visible: true
        }
      }

    };
  },
  computed: {
    ...mapState({
      'mAppPath': state => state.user.appPath,
      'mPushInfo': state => state.user.pushInfo,
      'mUserHasProprietor': state => state.user.userHasProprietor,

      'mUserPlotList': state => state.user.userPlotList,
      'mIsPlotBlankDomicile': state => state.plot.isPlotBlankDomicile
    })
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      let self = this;
      if (to.path === "/ma-hu-index/visitor-index") {
        this.page=1;
        self.getVisitorInfo();//todo 因为上一个页面已经removeItem了
        // if (localStorage.getItem("inAndOutChange")) {
        //   self.getVisitorInfo();
        //   localStorage.removeItem("inAndOutChange");
        // }
      }
    }
  },
  created() {},
  mounted() {
    this.getVisitorInfo();
  },
  methods: {
    ...mapActions(["setIsShowOtherPop"]),
    addActiveCls(e) {
      addClass(e.currentTarget, "active");
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, "active");
    },
    getVisitorInfo() {
      let self = this;
      self.$post("entry", "/vistor", {page:this.page,pageSize: this.pageSize}).then(res => {
        if(this.page==1){
          self.visitorList = res.data.list;
        }else{
          self.visitorList=self.visitorList.concat(res.data.list);
        }

        if(!res.data.list || res.data.list.length<self.pageSize){
          self.options.pullUpLoad=false;
        }
        setTimeout(()=>{
          self.$refs.scroll.forceUpdate();
          self.$refs.scroll.resetPullUpTxt();
          self.$refs.scroll.refresh();
        },100);


      });
    },

    /*** 添加访客 ***/
    addVisitor() {
      if(this.mUserHasProprietor) {
        if(this.mUserPlotList.length>0 && this.mIsPlotBlankDomicile) {
          this.setIsShowOtherPop(true);
          this.addVisitorPopup = true;
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

    // 分享二维码
    useShare(vistorID) {
      let self = this;
      self.$post("entry", "/sharedlink", { visitorID: vistorID }).then(res => {
        utils.shareUrl(
          res.data.link,
          "来访二维码",
          "使用你的来访二维码进行来访确认"
        );
      });
    },
    // 重新激活
    editProfile(visitorInfo) {
      if (window.localStorage) {
        utils.localStorage("visitorInfo", visitorInfo);
        this.$router.push("/ma-hu-index/visitor-index/addVisitorInfo");
      }
    },

    showPoppup(type, index, vistorID) {
      this.setIsShowOtherPop(true);
      this.isPopShow = true;
      this.visitorID = vistorID;
      this.popTitle = type + "访客";
      this.popPlainText = "是否" + type + "该访客？";
    },
    leftBtnPoppup() {
      this.setIsShowOtherPop(false);
      this.isPopShow = false;
    },
    rightBtnPoppup() {
      let self = this;
      if (utils.isStrInclude(this.popTitle, "删除")) {
        self
          .$post("entry", "/delete", {
            visitorID: self.visitorID
          })
          .then(res => {
            this.setIsShowOtherPop(false);
            this.isPopShow = false;
            const toast = this.$createToast({
              type: "correct",
              txt: "删除成功"
              // txt: res.errorCode+":"+e.index+":"+e.vistorID+"删除成功"
            });
            toast.show();
            self.isPopShow = false;
            self.getVisitorInfo();
          });
      } else if (utils.isStrInclude(this.popTitle, "同意")) {
        self.weCharVisitor(1);
      } else if (utils.isStrInclude(this.popTitle, "拒绝")) {
        self.weCharVisitor(2);
      }
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
          this.setIsShowOtherPop(false);
          this.isPopShow = false;
          const toast = this.$createToast({
            type: "correct",
            txt: status === 1 ? "已同意" : status === 2 ? "已取消" : ""
            // txt: res.errorCode+":"+e.index+":"+e.vistorID+"已同意"
          });
          toast.show();
          self.isPopShow = false;
          self.getVisitorInfo();
        });
    },
    onPullingUp(){
      setTimeout(() => {
        this.page++;
        this.getVisitorInfo();
      }, 1000);
    }

  }
};
</script>

<style lang="stylus" scoped>
.visitor-index-item-box {
  height: 37.3333vw;
  margin-top: 2.9vw;
  border-radius: 1.6vw;
  background-size: 100% 100%;
  background-color: #fff;
}

.visitor-btn {
  width: 26.133vw;
  height: 8.533vw;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.067vw;
  font-size: 3.733vw;
  color: #3388FF;

  img {
    flex: 0 0 3.2vw;
    height: 3.2vw;
  }

  span {
    margin-left: 1.067vw;
  }

  &.active {
    background: #f4f4f4;
  }
}

.re-btn {
  color: #fff;
  background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);

  &.active {
    background: linear-gradient(135deg, darken(rgba(48, 201, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
  }
}

.name-info {
  height: 6.667vw;
  display: flex;
  margin: 4vw 5.333vw 4.8vw 5.333vw;
  justify-content: space-between;
  align-items: center;
  color: #666;

  &.valid {
    color: #fff;
  }

  .left {
    display: flex;
    align-items: center;
    flex: 1;

    .name {
      font-size: 4.533vw;
      font-weight: bold;
      margin-right: 1.867vw;
      word-break: break-all;
      white-space: nowrap;
      /* 当文本溢出包含元素时，以省略号表示超出的文本 */
      text-overflow: ellipsis;
    }

    .gender {
      flex: 0 0 4.267vw;
      height: 4.267vw;
    }

    .phone {
      font-size: 4.533vw;
    }

    .wechat {
      font-size: 4vw;
      flex: 0 0 14.667vw;
    }
  }

  .right {
    span {
      font-size: 4vw;
    }
  }
}

.other-info {
  flex: 1;
  padding-bottom: 2.133vw;
  display: flex;
  margin: 0 5.333vw;
  color: #666;

  &.valid {
    color: #fff;
  }

  .left {
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: space-between;
    font-size: 4vw;

    .time {
      font-size: 3.733vw;

      span {
        margin-left: 1.867vw;
        font-size: 3.2vw;
      }
    }
  }

  .right {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
}
</style>