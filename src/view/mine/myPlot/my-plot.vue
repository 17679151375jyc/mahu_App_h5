<!--@Time  : 2019/08/27 16:08-->
<!--@Author: michael huang-->
<!--@File  : myPlot.vue-->

<template>
  <div class="wrapper">
    <return-head title="社区管理" rightText="加入记录" @rightBtnOnClick="addPlotOnClick"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="myPlotScroll"
        :style="defaultStyle"
        :options="options"
        :fade="true"
        :data="myPlotList"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div class="my-plot-box">
          <div v-for="(item,index) in myPlotList" :key="index"
               style="margin-bottom: 3.7333vw">
            <my-plot-item :plotInfo="item"
                          @quitPlotOnClick="quitPlot"
                          @invitePeopleOnClick="invitePeople"
                          @personalMessageOnClick="getPersonalMessage">
            </my-plot-item>
          </div>
        </div>
        <div style="height: 20.6666vw"></div>
      </cube-scroll>
    </div>

    <div class="base-button-fixed-bottom-bk-gray">
      <button-main text="加入社区" @btnOnclick="addApplyCommunity"></button-main>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 56.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import myPlotItem from '_c/mine/myPlot/my-plot-item';
  import buttonMain from '_c/button/button-main';
  import basePopup from '_c/popup/base-popup';
  import { mapState } from 'vuex';

  export default {
    name: "my-plot",
    components: {
      returnHead,
      myPlotItem,
      buttonMain,
      basePopup
    },
    data() {
      return {
        defaultStyle: {
          fontSize: "4vw",
          color: "rgba(51, 136, 255, 1)"
        },
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false
          // pullDownRefresh: {
          //   stopTime: 500,
          //   txt: `刷新成功`
          // },
          // pullUpLoad: {
          //   stopTime: 500,
          //   txt: `加载成功`
          // },
        },

        myPlotList: [],
        isChangeRoute: '',

        // 弹窗属性
        isPopShow: false,
        refId: 'myPlotPopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        isShowCloseIcon: false,
        closeIconStyle: {},
        // 弹窗参数
        popPlainText: '',
        popPlainText2: '',
        domicileNumber: ''
      }
    },
    computed: {
      ...mapState({
        'mUserPlotList': state => state.user.userPlotList,
        'mPushInfo': state => state.user.mPushInfo
      })
    },
    watch: {
      //监听路由变化
      $route(to, from) {//todo 再做一点判断
        let self = this;
        if(to.path=='/mine/myPlot'){
          self.getPersonalMessage();
        }
        /* if(localStorage.getItem("plotInvitePeople") === "add") {
           self.getPersonalMessage();
         } else if (localStorage.getItem("plotRenewPay") === "success") {
           self.getPersonalMessage();
         }
         else if (localStorage.getItem("communityChange") === "add") {
           self.isChangeRoute = "community-add-manage";
           localStorage.removeItem("communityChange");
         }*/
      },

      isChangeRoute() {
        let self = this;
        if(self.isChangeRoute === "community-add-manage") {
          setTimeout(() => {
            self.isChangeRoute = "";
            self.addPlotOnClick();
          }, 200);
        }
      }
    },
    created() {
    },
    mounted() {
      let self = this;
      self.getPersonalMessage();
    },
    methods: {
      getPersonalMessage(e) {
        let self = this;
        self.$post("community", "/personalMessage", {
          alertNumber: self.newAlertNumber
        }).then((res) => {
          self.myPlotList = [...res.data];
          console.log(res.data)
        });
      },

      // toMyPlotDetails(index) {
      //   let self =this;
      //   self.$router.push({path: "/mine/myPlot/myPlot-details", query: {index: index}});
      // },

      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          // this.getInfo(1);
          this.$refs.myPlotScroll.forceUpdate();
        }, 1000);
      },
      onPullingUp() {
        // if (this.isNotLoading) {
        //   this.$refs.myPlotScroll.forceUpdate();
        // } else {
          // 模拟更新数据
          setTimeout(() => {
            // this.page = this.page+1;
            // this.getInfoLoad(this.page);
            // this.$refs.myPlotScroll.forceUpdate();
            if (Math.random() > 0.5) {
              // 如果有新数据
              console.log(2);
              this.$refs.scroll.forceUpdate();
            } else {
              // 如果没有新数据
              this.$refs.scroll.forceUpdate();
            }
          }, 1000);
        // }
      },

      quitPlot(e) {
        this.popType = "plainText";
        this.isPopShow = true;
        this.popTitle = "确定要退出该社区？";
        this.popPlainText = "退出之后不可恢复，请您谨慎选择";
        this.domicileNumber = e.domicileNumber;
      },
      leftBtnPoppup() {
        this.clearPoppupParameter();
      },
      rightBtnPoppup() {
        let self = this;
        self.$post("backModifyStatus","",{
          domicileNumber: self.domicileNumber,
          status: 3
        }).then((res)=>{
          self.clearPoppupParameter();
          const toast = self.$createToast({
            type: 'correct',
            txt: "退出社区成功"
          });
          toast.show();
        });
      },
      clearPoppupParameter() {
        this.isPopShow = false;
        this.popTitle = "";
        this.popType = "";
        this.popPlainText = "";
        this.domicileID = "";
      },

      addPlotOnClick() {//加入记录
        let self = this;
        self.$router.push({path: "/mine/myPlot/community-add-manage"});
      },

      invitePeople(e) {//邀请家人
        let self = this;
        self.$router.push({path: "/mine/myPlot/my-plot-invite-people",query: {domicileNumber: e.domicileNumber}});
      },

      addApplyCommunity() {//加入社区
        let self = this;
        self.$router.push({path: "/mine/myPlot/community-add",
          query: {chooseCityPath: '/mine/myPlot/community-add/choose-city',
            choosePlotPath: '/mine/myPlot/community-add/choose-plot'}});
      },
    }
  }
</script>

<style scoped>
  .my-plot-box {
    margin-bottom: 3.7333vw;
  }
</style>