<!--@Time  : 2019/11/02 14:13-->
<!--@Author: michael huang-->
<!--@File  : weChat-index.vue-->

<template>
  <div class="wrapper">
    <return-head title="绑定微信"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="weChatScroll"
        class="scroll-wrapper-text-style"
        :options="options">
        <div class="base-horizontal-layout-space-between-item-center weChat-index-title-box">
          <div class="base-horizontal-layout-center-item-center">
            <p class="base-text-title-normal-black">绑定微信号</p>
          </div>
          <div v-if="wxInfo.flag" class="base-horizontal-layout-center-item-center" @click="cancelBinding">
            <img :src="wxInfo.wxHeadImgUrl" style="width: 4.2666vw;height: 4.2666vw;border-radius: 50%;border: 1px solid #999">
            <p class="base-text-title-normal-black" style="margin: 0 1.0666vw">{{wxInfo.wxNickname}}</p>
            <img :src="require('@/assets/icon/icon_arrow-right-2.png')" style="width: 2.6666vw;height: 4.2666vw">
          </div>
          <div v-else class="base-horizontal-layout-center-item-center">
            <p class="base-text-title-normal-gray">未绑定</p>
          </div>
        </div>

        <div style="background-color: white;margin-top: 2.6666vw">
          <p class="weChat-index-content-title base-text-title-normal-black">绑定微信流程</p>
          <div class="weChat-index-content-box">
            <p class="base-text-details-large-black-666 weChat-index-content-text">1.在微信上搜索“马虎智能安全”公众号，并关注</p>
            <img :src="require('./1.png')" class="weChat-index-content-img" style="height: 62.6666vw">
            <img :src="require('./2.png')" class="weChat-index-content-img" style="height: 91.2vw">
            <p class="base-text-details-large-black-666 weChat-index-content-text">2.点击公众号下栏的“绑定微信”</p>
            <img :src="require('./3.png')" class="weChat-index-content-img" style="height: 64.2666vw">
            <p class="base-text-details-large-black-666 weChat-index-content-text">3.填写资料后，提交完成</p>
            <img :src="require('./4.png')" class="weChat-index-content-img" style="height: 75.2vw">
            <img :src="require('./5.png')" class="weChat-index-content-img" style="height: 75.2vw">
          </div>
        </div>
        <!--<div style="height: 2.6666vw"></div>-->
      </cube-scroll>
    </div>

    <div class="weChat-index-button-icon">
      <img :src="require('./invitation-arrow.png')" style="width: 10vw;height: 6vw">
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'callSecure'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "weChat-index",
    components: {returnHead,basePopup},
    data() {
      return {
        wxInfo: {},
        isBinding: false,

        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
        },

        // 弹窗属性
        isPopShow: false,
        refId: 'myWeChatPopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        // 弹窗参数
        popPlainText: '',
      }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.getWxInfo();
    },
    methods: {
      getWxInfo() {
        let self = this;
        self.$post("baseClient", "/getBindUser", {
        }).then((res) => {
          self.wxInfo = res.data;
        });
      },
      cancelBinding() {
        this.popType = "callSecure";
        this.isPopShow = true;
        this.popTitle = "解绑确定";
        this.popPlainText = "您确定该账号与微信号解绑？";
      },

      leftBtnPoppup() {
        this.clearPoppupParameter();
      },
      rightBtnPoppup() {
        let self = this;
        self.$post("baseClient", "/updateBind", {
        }).then((res) => {
          self.isBinding = res.data;
          self.clearPoppupParameter();
          const toast = this.$createToast({
            type: "correct",
            txt: "解绑已成功"
          });
          toast.show();
          self.getWxInfo();
        });
      },
      clearPoppupParameter() {
        this.isPopShow = false;
        this.popTitle = "";
        this.popType = "";
        this.popCancelText = "";
        this.popSureText= "";
        this.popPlainText = "";
      }
    }
  }
</script>

<style scoped>
  .weChat-index-title-box {
    height: 13.3333vw;
    background-color: white;
    padding: 0 5.3333vw 0 8vw;
  }
  .weChat-index-button {
    height: 8.5333vw;
    padding: 0 2.1333vw;
    box-sizing: border-box;
    border-radius: 1.0666vw;
    background-color: #3388FF;
  }
  .weChat-index-content-title {
    padding: 2.6666vw 0;
    text-align: center;
    font-weight: bold;
  }
  .weChat-index-content-box {
    margin: 0 2.6666vw;
    padding: 2.6666vw 2.4vw;
    background-color: #EEEEEE;
  }
  .weChat-index-content-text {
    margin-bottom: 2.6666vw;
  }
  .weChat-index-content-img {
    width: 89.7333vw;
    height: auto;
    margin-bottom: 5.1vw;
  }

  .weChat-index-button-icon {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 46vw;
    animation: btnIconBox 2s infinite;
  }
  @-webkit-keyframes btnIconBox{
    0%{ transform: translate(0,0); }
    100%{ transform: translate(0,-16vw);opacity: 0; }
  }
</style>