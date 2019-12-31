<!--@Time  : 2019/10/31 11:00-->
<!--@Author: michael huang-->
<!--@File  : packages-pay-item.vue-->

<template>
  <div class="base-vertical-layout-general packages-pay-item-box">
    <div class="base-vertical-layout-general">
      <div class="base-horizontal-layout-general-item-center" style="margin: 2.6666vw 2.6666vw 0 2.6666vw">
        <img :src="packagesPayInfo.areaType===0 ? require('@/assets/equipment/icon-home.png') :
        packagesPayInfo.areaType===1 ? require('@/assets/equipment/icon-business.png') :
        packagesPayInfo.areaType===2 ? require('@/assets/equipment/icon-gate.png') : ''"
             class="base-icon-large-style"
             style="width:6.07vw;margin-right: 1.0666vw">
        <p class="base-text-title-normal-black" style="font-weight: bold">{{packagesPayInfo.areaName}}</p>
      </div>
      <div class="base-horizontal-layout-general-item-center" style="margin: 3.2vw 2.6666vw 0 9.8666vw">
        <p v-if="getSituation(packagesPayInfo.effectiveTime)"
           class="base-text-details-large-black-666">套餐情况：<span style="color: #3388FF">正常有效</span></p>
        <p v-else class="base-text-details-large-black-666">套餐情况：<span style="color: #D72A25">已过期</span></p>
        <p class="base-text-details-large-black-666" style="margin-left: 5.3333vw"
        >到期时间：<span style="color: #3388FF">{{getEffectiveTime(packagesPayInfo.effectiveTime)}}</span></p>
      </div>
      <!--<div class="base-horizontal-layout-general-item-center" style="margin: 2vw 2.6666vw  0 9.8666vw">-->
        <!--<p class="base-text-details-large-black-666">账户余额：<span style="color: #3388FF">¥ {{getDeposit(packagesPayInfo.deposit)}}</span></p>-->
      <!--</div>-->
    </div>
    <div class="base-horizontal-layout-space-between-item-center" style="margin-top: 3vw">
      <div class="base-vertical-layout-center-item-center packages-pay-button packages-pay-button-1"
           :style="payRankButtonStyle"
           @click="payRank"
           @touchstart="payRankTouch"
           @touchend="payRankTouchEnd">
        <img :src="require('./icon-payRank.png')" style="width: 4.3vw;height: 4.3vw;margin-bottom: 1vw">
        <p class="base-text-title-normal-blue">充值记录</p>
      </div>
      <div class="base-vertical-layout-center-item-center packages-pay-button packages-pay-button-2"
           :style="payImmediatelyButtonStyle"
           @click="payImmediately"
           @touchstart="payImmediatelyTouch"
           @touchend="payImmediatelyTouchEnd">
        <img :src="require('./iocn-payImmediately.png')" style="width: 5.3333vw;height: 3.6666vw;margin-bottom: 1vw">
        <p class="base-text-title-normal-white">延长服务期</p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";

  export default {
    name: "packages-pay-item",
    props: {
      packagesPayInfo: {
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        payRankButtonStyle: {},
        payImmediatelyButtonStyle: {}
      }
    },
    created() {
    },
    methods: {
      payRank() {
        this.$emit('payRankOnClick', {packagesPayInfoId: this.packagesPayInfo.id});
      },
      payRankTouch() {
        this.payRankButtonStyle = {background: "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.3))"};
      },
      payRankTouchEnd() {
        this.payRankButtonStyle = {background: "white"};
      },
      payImmediately() {
        this.$router.push({ path: "/mine/packages-pay/packages-pay-details", query: {packagesPayInfoId: this.packagesPayInfo.id}});
      },
      payImmediatelyTouch() {
        this.payImmediatelyButtonStyle = {background: "linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(48, 201, 255, 1))"};
      },
      payImmediatelyTouchEnd() {
        this.payImmediatelyButtonStyle = {background: "linear-gradient(to bottom, rgba(48, 201, 255, 1), rgba(51, 136, 255, 1))"};
      },

      getSituation(effectiveTime) {
        let nowDate = new Date();
        return (effectiveTime*1000 - nowDate.getTime()) > 0 ? true : false;
      },
      getDeposit(deposit) {
        return parseFloat(deposit).toFixed(2);
      },
      getEffectiveTime(effectiveTime) {
        // return utils.timetrans(effectiveTime, "yymmddhhmm");
        return utils.timetrans(effectiveTime, "yymmdd");
      }
    }
  }
</script>

<style scoped>
  .packages-pay-item-box {
    border-radius: 1.0666vw;
    background-color: white;
  }
  .packages-pay-button {
    width: 46.6666vw;
    height: 13.3333vw;
    border-radius: 1.0666vw;
  }
  .packages-pay-button-1 {
    border: 1px solid rgba(238,238,238,1);
  }
  .packages-pay-button-2 {
    background: linear-gradient(to bottom, rgba(48, 201, 255, 1), rgba(51, 136, 255, 1));
  }
</style>