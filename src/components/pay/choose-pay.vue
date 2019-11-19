<!--@Time  : 2019/11/11 15:28-->
<!--@Author: michael huang-->
<!--@File  : choose-pay.vue-->

<template>
  <div class="pattern-of-payment">
    <div class="base-horizontal-layout-space-between-item-center pattern-of-payment-item"
         @click="handoverPayment('支付宝')">
      <div class="base-horizontal-layout-center-item-center">
        <img :src="require('./aliPay.png')" class="base-icon-large-style" style="margin-right: 2.6666vw">
        <div class="">
          <p class="base-text-details-large-black-666">支付宝</p>
          <p class="base-text-details-normal-black-666" style="margin-top: 1.0666vw">数亿用户都在用，安全可托付</p>
        </div>
      </div>
      <img :src="paymentType==='支付宝'? require('./icon_selectd.png') : require('./icon_unselect.png')" class="base-icon-large-style">
    </div>
    <div class="base-horizontal-layout-space-between-item-center pattern-of-payment-item"
         @click="handoverPayment('微信支付')">
      <div class="base-horizontal-layout-center-item-center">
        <img :src="require('./wxPay.png')" class="base-icon-large-style" style="margin-right: 2.6666vw">
        <div class="">
          <p class="base-text-details-large-black-666">微信支付</p>
          <p class="base-text-details-normal-black-666" style="margin-top: 1.0666vw">微信安全支付</p>
        </div>
      </div>
      <img :src="paymentType==='微信支付'? require('./icon_selectd.png') : require('./icon_unselect.png')" class="base-icon-large-style">
    </div>
    <div style="height: 1.6vw"></div>
  </div>
</template>

<script>
  export default {
    name: "choose-pay",
    props: {},
    data() {
      return {
        paymentType: '支付宝',
      }
    },
    created() {
      this.$emit('handoverPaymentOnClick', {paymentType: this.paymentType});
    },
    methods: {
      handoverPayment(paymentType) {
        this.paymentType = paymentType;
        this.$emit('handoverPaymentOnClick', {paymentType: this.paymentType});
      },
    }
  }
</script>

<style scoped>
  .pattern-of-payment {
    margin-top: 3vw;
    background-color: white;
    padding: 0 8vw;
    box-sizing: border-box;
  }
  .pattern-of-payment-item {
    padding: 2.6666vw 0 3.4666vw 0;
    border-bottom: 1px solid #eeeeee;
  }
</style>