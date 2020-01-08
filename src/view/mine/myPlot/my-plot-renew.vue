<!--@Time  : 2019/11/11 12:52-->
<!--@Author: michael huang-->
<!--@File  : my-plot-renew.vue-->

<template>
  <div class="wrapper">
    <return-head title="社区续费服务"></return-head>

    <div v-if="isPaySuccess" class="base-vertical-layout-center-item-center" style="margin-top: 13.3333vw">
      <img :src="require('@/assets/icon/icon-paySuccess.png')" style="width: 16vw;height: 16vw">
      <p class="base-text-title-normal-666" style="font-weight: bold;margin-top: 2.6666vw">支付成功</p>
      <p class="plot-renew-success-price">¥ {{sumPrice}}</p>
    </div>
    <div v-else class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="plotRenewScroll"
        class="scroll-wrapper-text-style"
        :options="options">

        <div class="base-horizontal-layout-general-item-center plot-renew-title-box">
          <img :src="require('./icon-home.png')" class="base-icon-large-style" style="margin-right: 1.0666vw">
          <p class="base-text-details-large-black" style="font-weight: bold">{{query.plotName}}智能出入套餐服务费</p>
        </div>

        <div style="padding: 0 8vw;background-color: white">
          <div class="base-horizontal-layout-space-between-item-center plot-renew-details-item" @click="choosePackagesPayPicker">
            <p class="base-text-details-large-black-666">服务套餐</p>
            <div class="base-horizontal-layout-space-between-item-center"
                 style="width:28.3333vw;height: 10.9333vw;padding:0 2.0666vw;background-color: #EDEEF0;border-radius: 1.3333vw">
              <p class="base-text-details-large-gray plot-renew-details-item-text">{{packagesName}}</p>
              <img :src="require('@/assets/notification/icon_bottom.png')">
            </div>
          </div>

          <div class="base-horizontal-layout-space-between-item-center plot-renew-details-item" @click="choosePackagesPayPicker">
            <p class="base-text-details-large-black-666">服务时长</p>
            <p class="base-text-details-large-gray plot-renew-details-item-text"><span style="color: #3388FF;font-weight: bold">{{packagesMonth}}</span>个月</p>
          </div>

          <div class="base-horizontal-layout-space-between-item-center plot-renew-details-item" style="margin-top: 2.4vw">
            <p class="base-text-details-large-black-666">套餐内容</p>
            <p class="base-text-details-large-black-666">智能出入门禁服务</p>
          </div>
          <div class="base-horizontal-layout-end-item-center plot-renew-details-item">
            <p class="base-text-details-large-black-666">智能楼宇对讲服务</p>
          </div>
          <div class="base-horizontal-layout-end-item-center plot-renew-details-item">
            <p class="base-text-details-large-black-666">智能门杆出入服务</p>
          </div>

          <div class="base-horizontal-layout-space-between-item-center plot-renew-details-item" style="margin-top: 8.2666vw">
            <p class="base-text-details-large-black-666">合计金额</p>
            <p class="base-text-details-large-red-dark">¥ {{sumPrice}}</p>
          </div>
        </div>

        <choose-pay @handoverPaymentOnClick="handoverPayment"></choose-pay>
        <div style="height: 20.6666vw"></div>
      </cube-scroll>
    </div>

    <div v-if="isPaySuccess" class="base-button-fixed-bottom">
      <button-main text="完成" @btnOnclick="toSuccess"></button-main>
    </div>
    <div v-else class="base-button-fixed-bottom">
      <button-main text="确认支付" @btnOnclick="toPay"></button-main>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import returnHead from '_c/head/return-head';
  import choosePay from '_c/pay/choose-pay';
  import buttonMain from '_c/button/button-main';

  export default {
    name: "my-plot-renew",
    components: {returnHead, choosePay, buttonMain},
    data() {
      return {
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
        },

        query: {},
        paymentType: '',

        packagesTimeList: [],
        packagesTimeStr: '',
        packagesName: '',
        packagesMonth: 0,
        choosePackagesTime: 0,
        applyPackagePrice: 0,
        sumPrice: 0,
        isPaySuccess: false
      }
    },
    created() {
      this.query = this.$route.query;
      window.onWxPay = this.onWxPay;
      window.onZfPay = this.onZfPay;
    },
    mounted() {
      let self = this;
      self.$post("plotPackage", "/getList", {
      }).then((res) => {
        let plotPackageList = [...res.data];
        self.sumPrice = plotPackageList[0].discount ? plotPackageList[0].discount.toFixed(2) : plotPackageList[0].price.toFixed(2);
        plotPackageList.forEach((item)=>{
          item.text = item.name.replace("套餐","");
          item.value = item.name.replace("套餐","");
        });
        self.packagesTimeStr = plotPackageList[0].value;
        self.packagesName = plotPackageList[0].name;
        self.packagesMonth = plotPackageList[0].month;
        self.packagesTimeList = plotPackageList;
      });
    },
    methods: {
      choosePackagesPayPicker() {
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '选择时长',
            data: [this.packagesTimeList],
            selectedIndex: [this.choosePackagesTime],
            onSelect: this.packagesPaySelectHandle,
            onCancel: this.packagesPayCancelHandle
          })
        }
        this.picker.show()
      },
      packagesPaySelectHandle(selectedVal, selectedIndex, selectedText) {
        this.packagesTimeStr = this.packagesTimeList[selectedIndex].value;
        this.packagesName = this.packagesTimeList[selectedIndex].name;
        this.packagesMonth = this.packagesTimeList[selectedIndex].month;
        this.choosePackagesTime = selectedIndex;
        this.applyPackagePrice =
          this.packagesTimeList[selectedIndex].discount ?
            this.packagesTimeList[selectedIndex].discount :
            this.packagesTimeList[selectedIndex].price;
        this.sumPrice = this.applyPackagePrice.toFixed(2);
        this.picker = undefined;
      },
      packagesPayCancelHandle() {
        this.picker = undefined;
      },

      handoverPayment(e) {
        this.paymentType = e.paymentType;
      },
      toPay() {
        let self = this;
        self.$post("domicile","/getChargeDoor",{
          domicileNumber: self.query.domicileNumber,
          price: self.sumPrice,
          month: self.packagesTimeList[self.choosePackagesTime].month,
          plotPackageId: self.packagesTimeList[self.choosePackagesTime].id
        }).then((res)=>{
          console.log(res);
          self.$post("base", "/family/pay/goToPay", {
            payType: self.paymentType==="支付宝" ? "aliPay" : self.paymentType==="微信支付" ? "wxPay" : "",
            transactionType: "APP",//SWEEPPAY  NATIVE
            orderId: res.data,
            orderType: 10 //1代表续费的 10代表备城门个人
          }).then((res) => {
            console.log(res);
            switch (self.paymentType) {
              case "支付宝":
                utils.zfPay(res.data);
                break;
              case "微信支付":
                utils.wxPay(res.data);
                break;
              default:
                break;
            }
          });
        });
      },

      onWxPay(res) {
        console.log("onWxPay121212",res);
        if (res || res==0) {
          console.log("onWxPay",res);
          this.isPaySuccess = (res=="0" ? true : false);
          if(res=="-2") {
            this.$createToast({
              type: 'correct',
              txt: "用户取消"
            }).show();
          } else if(res=="0") {
            this.$createToast({
              type: 'correct',
              txt: "支付成功"
            }).show();
            localStorage.setItem("plotRenewPay","success");
          } else {
            this.$createToast({
              type: 'correct',
              txt: "支付失败"
            }).show();
          }
        } else {
          this.$createToast({
            type: 'warn',
            txt: "支付出错"
          }).show();
        }
      },

      onZfPay(res) {
        console.log("onZfPay",res);
        if (res) {
          this.isPaySuccess = (res=="9000" ? true : false);
          if(res=="6001") {
            this.$createToast({
              type: 'correct',
              txt: "用户取消"
            }).show();
          } else if(res=="9000") {
            this.$createToast({
              type: 'correct',
              txt: "支付成功"
            }).show();
            localStorage.setItem("plotRenewPay","success");
          } else {
            this.$createToast({
              type: 'correct',
              txt: "支付失败"
            }).show();
          }
        } else {
          this.$createToast({
            type: 'warn',
            txt: "支付出错"
          }).show();
        }
      },

      toSuccess() {
        this.$router.goBack();
      }
    }
  }
</script>

<style scoped>
  .plot-renew-title-box {
    height: 16vw;
    background-color: white;
    padding: 0 5.3333vw;
  }
  .plot-renew-details-item {
    border-top: 1px solid #eeeeee;
    padding: 4vw 0;
  }
  .plot-renew-details-item-text {
    height: 5vw;
    line-height: 5vw;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  }

  .plot-renew-success-price {
    font-size: 8vw;
    color: #333333;
    font-weight: bold;
    margin-top: 5.3333vw;
  }
</style>