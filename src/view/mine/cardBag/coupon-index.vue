<!--
 * @Descripttion:
 * @version:
 * @Author: Vencent Lum
 * @Date: 2019-12-17 17:13:10
 * @LastEditors  : Vencent Lum
 * @LastEditTime : 2019-12-18 09:03:37
 -->
<!--@Time  : 2019/12/12 15:38-->
<!--@Author: michael huang-->
<!--@File  : coupon-index.vue-->

<template>
  <div class="wrapper" style="overflow: auto">
    <return-head title="优惠券"></return-head>

    <div style="display: flex;overflow: auto"></div>
    <div v-show="couponUsed" class="coupon-used">
      <img :src="require('./icon-coupon-used.png')" style="width: 16vw;height: 16vw"/>
      <div class="tips">优惠券使用成功</div>
    </div>
    <div v-show="!couponUsed" class="base-vertical-layout-center-item-center coupon-index-box">
      <div v-if="isGetCoupon" class="title-info-title" style="padding-top: 5.3333vw">
        <div class="name">{{ comUserCouponInfo.couponName }}</div>
        <div class="time" style="margin: 1.6vw 0 0 0">有效期至 {{ getUseTime(comUserCouponInfo.effectiveTime) }}</div>
      </div>
      <div v-else class="base-vertical-layout-center-item-center title-info-title" style="width: 74vw">
        <div class="title">请将二维码给商家扫描</div>
        <!-- <div
          id="qrCode"
          ref="qrCodeDiv"
          class="qr-code-box"
          style="width: 48vw;height: 48vw;margin: 2.6666vw 0"
        ></div>-->
        <canvas id="qrCodeRef" ref="qrCodeRef" class="qr-code-box"></canvas>
        <div class="time">有效期至 {{ getUseTime(comUserCouponInfo.effectiveTime) }}</div>
        <div class="name">{{ comUserCouponInfo.couponName }}</div>
      </div>
      <div class="info-wrapper">
        <div class="left" @click="toMap">
          <div class="business-name">{{comUserCouponInfo.businessName}}</div>
          <div class="address">{{comUserCouponInfo.cityName ?
            comUserCouponInfo.cityName+comUserCouponInfo.areaName+comUserCouponInfo.streetName+comUserCouponInfo.address : ""}}</div>
        </div>
        <a :href="`tel:${comUserCouponInfo.businessContactPhone}`" class="right border-left-1px">
          <img :src="require('./icon-phone.png')"/>
        </a>
      </div>
      <div class="base-vertical-layout-general info-wrapper" style="margin-bottom: 5.3333vw">
        <p class="base-text-title-normal-black" style="font-weight: bold;margin-top: 2.3333vw">使用说明</p>
        <div class="base-text-details-large-black" style="margin-top: 2.6666vw">{{comUserCouponInfo.description}}</div>
      </div>
    </div>

    <div class="intro" v-show="!couponUsed">此优惠券最终解释权归活动商家所有</div>

    <div v-show="couponUsed">
      <button-main text="完成" @btnOnclick="toReturn"></button-main>
    </div>

    <div v-show="isGetCoupon">
      <button-main text="领取" @btnOnclick="getMyCoupon"></button-main>
    </div>

    <div style="height: 5.3333vw"></div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import QRCode from "qrcodejs2";
import returnHead from "_c/head/return-head";
import buttonMain from "_c/button/button-main";
import { mapState } from "vuex";
import QrCodeWithLogo from "qr-code-with-logo";
const QRCODE_WIDTH = document.body.clientWidth - 178;
const LOGO = require("@/assets/icon/logo.png");
export default {
  name: "coupon-index",
  components: {
    returnHead,
    buttonMain
  },
  data() {
    return {
      comUserCouponInfo: {},
      couponUsed: false,
      isGetCoupon: false,
    };
  },
  computed: {
    ...mapState({
      mPushInfo: state => state.user.pushInfo
    })
  },
  watch: {
    mPushInfo() {
      if(this.mPushInfo.indexOf("优惠券使用消息") !== -1) {
        this.couponUsed = true;
      }
    }
  },
  created() {},
  mounted() {
    let self = this;
    if (this.$route.query.comUserCouponInfo) {
      // this.comUserCouponInfo = JSON.parse(this.$route.query.comUserCouponInfo);

      // console.log("object :", this.comUserCouponInfo.couponId);
      // this.createQrcode(this.comUserCouponInfo);
      self.$post("comUserCoupon", "/getById", {
          id: JSON.parse(this.$route.query.comUserCouponInfo).id
        }
      ).then(res => {
        self.comUserCouponInfo = res.data;
      });
    } else if (this.$route.query.comUserCouponId){
      self.isGetCoupon = true;
      self.$post("coupon", "/getById", {
          id: self.$route.query.comUserCouponId
        }
      ).then(res => {
        self.comUserCouponInfo = res.data;
      });
    }
    this.$nextTick(function() {
      this.createQrcode(this.comUserCouponInfo);
    });
  },
  methods: {
    createQrcode({ id = "二维码无效" }) {
      const canvas = this.$refs.qrCodeRef
        ? this.$refs.qrCodeRef
        : document.getElementById("qrCodeRef");
      QrCodeWithLogo.toCanvas({
        canvas: canvas,
        content: id,
        width: QRCODE_WIDTH,
        logo: {
          src: LOGO,
          radius: 4,
          borderSize: 0.02
        },
        nodeQrCodeOptions: {
          margin: 0
        }
      });
    },
    getUseTime(effectiveTime) {
      return utils.timetrans(effectiveTime, "YYMMDD");
    },
    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.comUserCouponInfo.id,
        // width: 180,
        // height: 180,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    getMyCoupon() {
      let self = this;
      self.$createDialog(
        {
          type: "confirm",
          title: "提示",
          content: '是否领取该优惠券',
          confirmBtn: {
            text: "确定"
          },
          cancelBtn: {
            text: "取消"
          },
          onConfirm: () => {
            self.$post("coupon", "/couponFromQrcode", {
                couponId: self.comUserCouponInfo.id
              }, { returnAll: true }
            ).then(res => {
              if(res.errorCode === 0) {
                self.$createToast({
                  type: "correct",
                  txt: "优惠券领取成功",
                  time: 2000,
                  onTimeout: () => {
                    self.$router.push({ path: "/mine/card-bag", query: {}});
                  }
                }).show();
              } else {
                self.$createToast({
                  type: "warn",
                  txt: res.errorMsg
                }).show();
              }
            });
          },
          onCancel: () => {

          }
        },
      ).show();
    },
    toReturn() {
      this.$router.goBack();
    },
    /**
     * 跳到导航
     */
    toMap() {
      if (
        CYJ.openLocationApps &&
        this.comUserCouponInfo.longitude &&
        this.comUserCouponInfo.latitude
      ) {
        CYJ.openLocationApps(
          this.comUserCouponInfo.longitude,
          this.comUserCouponInfo.latitude
        );
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .title {
    font-weight: bold;
    font-size: 4.2666vw;
    padding: 5.333vw 0;
  }

  .time {
    font-size: 3.7333vw;
    color: #333;
    margin: 2.6666vw auto 4vw auto;
  }

  .name {
    font-size: 8.533vw;
    color: #FD8813;
    font-weight: bold;
  }

  .title-info-title {
    width: 80vw;
    padding: 0 0 0 2.8666vw;
    box-sizing: border-box;
  }

  .info-wrapper {
    min-height: 18.667vw;
    width: 80vw;
    margin: 2.667vw 0;
    padding: 2.933vw 0 0 3.467vw;
    display: flex;
    border-top: 0.267vw dashed #DDDDDD;
    box-sizing: border-box;

    .left {
      flex: 0 0 56.267vw;
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding-right: 1.333vw;
      box-sizing: border-box;

      .business-name {
        color: #333333;
        font-size: 4.267vw;
        font-weight: bold;
        margin-bottom: 1.6vw;
      }

      .address {
        font-size: 3.467vw;
        color: #333;
        line-height: 3.733vw;
        margin-top: 1.6vw;
      }

      &:active {
        background: #f2f2f2;
      }
    }

    .right {
      height: 18.667vw;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      &:before {
        border-color: #ddd;
      }

      img {
        width: 4.8vw;
        height: 4.8vw;
      }

      &:active {
        background: #f2f2f2;
      }
    }
  }

  .intro {
    text-align: center;
    margin: 2.667vw 0;
    font-size: 3.2vw;
  }

  .coupon-index-box {
    margin: 8vw 6.6666vw 0 6.6666vw;
    background-color: white;
    border-radius: 2.6666vw;
  }

  .coupon-index-box-price {
    font-size: 8vw;
    color: #FD8813;
    font-weight: bold;
    margin: 5.6666vw 0;
  }

  .qr-code-box {
    width: 48vw;
    height: 48vw;
  }

  .coupon-index-box-blank {
    margin: 8vw 4vw 16.5333vw 4vw;
    width: 92vw;
    height: 56vw;
    background-color: white;
  }

  .coupon-used {
    margin: 8vw 4vw 16.5333vw 4vw;
    width: 92vw;
    height: 56vw;
    background-color: white;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .tips{
        margin-top:5.333vw;
        color:#666;
        font-size:5.333vw;
    }
  }

  .explain-text {
    font-size: 2.33vw;
    line-height: 6.66vw;
    color: #333;
    margin: 2vw 0;
    margin-top: 4vw;
    text-align: center;
  }
</style>
<style lang="stylus">
  .cube-dialog-content {
    font-size: 4.2666vw;
  }
</style>
