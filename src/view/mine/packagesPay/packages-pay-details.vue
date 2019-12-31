<!--@Time  : 2019/11/07 14:02-->
<!--@Author: michael huang-->
<!--@File  : packages-pay-details.vue-->

<template>
  <div class="wrapper">
    <return-head title="充值服务"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="packagesDetailsScroll"
        class="scroll-wrapper-text-style"
        :options="options">

        <div v-if="packagesPayDetailsInfo.applyPackage" class="packages-pay-details-box">
          <div class="base-horizontal-layout-general-item-center packages-pay-details-title">
            <img :src="packagesPayDetailsInfo.areaType===0 ? require('@/assets/equipment/icon-home.png') :
             packagesPayDetailsInfo.areaType===1 ? require('@/assets/equipment/icon-business.png') :
             packagesPayDetailsInfo.areaType===2 ? require('@/assets/equipment/icon-gate.png') : ''"
                 class="base-icon-large-style" style="width:6.07vw;margin-right: 1.0666vw">
            <p class="base-text-details-large-black" style="font-weight: bold">{{packagesPayDetailsInfo.areaName}}</p>
          </div>
          <div class="packages-pay-details-details">
            <div class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item" style="padding: 3.2vw 0">
              <p class="base-text-details-large-black-666">服务时长</p>
              <div class="base-horizontal-layout-space-between-item-center"
                   style="width:21.3333vw;height: 6.9333vw;padding:0 2.0666vw;background-color: #EDEEF0;border-radius: 1.3333vw"
                   @click="choosePackagesPayPicker">
                <p class="base-text-details-large-gray">{{packagesTimeStr}}</p>
                <img :src="require('@/assets/notification/icon_bottom.png')">
              </div>
            </div>
            <div class="base-horizontal-layout-space-between-item-center packages-pay-details-title-item">
              <p class="base-text-details-large-black" style="font-weight: bold">{{packagesPayDetailsInfo.applyPackage.name}}</p>
              <div class="base-horizontal-layout-center-item-center">
                <p class="base-text-details-large-black-666" style="margin-right: 5.3333vw">¥ {{packagesPayDetailsInfo.applyPackage.monthPrice}}/月</p>
                <p class="base-text-details-large-red-dark">¥ {{applyPackagePrice}}</p>
              </div>
            </div>
            <div v-for="(item,index) in packagesPayDetailsInfo.applyPackage.applyDevices" :key="index"
                 class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item">
              <p class="base-text-details-large-black">{{item.name}} x{{item.num}}</p>
              <!--<p class="base-text-details-large-red-dark">¥ {{item.price}}</p>-->
            </div>
            <!--增配设备服务费-->
            <div v-if="isDuplicated" class="base-horizontal-layout-space-between-item-center packages-pay-details-title-item">
              <p class="base-text-details-large-black" style="font-weight: bold">增配设备服务费</p>
            </div>
            <div v-for="(item,index) in packagesPayDetailsInfo.applyDevices" :key="index">
              <div v-if="item.deviceType===0" class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item">
                <p class="base-text-details-large-black-666">{{item.name}} x{{item.num}}</p>
                <div class="base-horizontal-layout-center-item-center">
                  <p class="base-text-details-large-black-666" style="margin-right: 5.3333vw">¥ {{item.servicePrice}}/月</p>
                  <p class="base-text-details-large-red-dark">¥ {{item.sumServicePrice}}</p>
                </div>
              </div>
            </div>
            <div v-for="(item,index) in packagesPayDetailsInfo.otherApplyDevices" :key="index">
              <div v-for="(otherApplyDevicesItem,otherApplyDevicesIndex) in item.list" :key="otherApplyDevicesIndex">
                <div v-if="otherApplyDevicesItem.deviceType===0" class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item">
                  <p class="base-text-details-large-black-666">{{otherApplyDevicesItem.name}} x{{otherApplyDevicesItem.num}}</p>
                  <div class="base-horizontal-layout-center-item-center">
                    <p class="base-text-details-large-black-666" style="margin-right: 5.3333vw">¥ {{otherApplyDevicesItem.servicePrice}}/月</p>
                    <p class="base-text-details-large-red-dark">¥ {{otherApplyDevicesItem.sumServicePrice}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!--增购设备服务费-->
            <div v-if="isBuyMore" class="base-horizontal-layout-space-between-item-center packages-pay-details-title-item">
              <p class="base-text-details-large-black" style="font-weight: bold">增购设备服务费</p>
            </div>
            <div v-for="(item,index) in packagesPayDetailsInfo.applyDevices" :key="index">
              <div v-if="item.deviceType===1" class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item">
                <p class="base-text-details-large-black-666">{{item.name}} x{{item.num}}</p>
                <div class="base-horizontal-layout-center-item-center">
                  <p class="base-text-details-large-black-666" style="margin-right: 5.3333vw">¥ {{item.servicePrice}}/月</p>
                  <p class="base-text-details-large-red-dark">¥ {{item.sumServicePrice}}</p>
                </div>
              </div>
            </div>
            <div v-for="(item,index) in packagesPayDetailsInfo.otherApplyDevices" :key="index">
              <div v-for="(otherApplyDevicesItem,otherApplyDevicesIndex) in item.list" :key="otherApplyDevicesIndex">
                <div v-if="otherApplyDevicesItem.deviceType===1" class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item">
                  <p class="base-text-details-large-black-666">{{otherApplyDevicesItem.name}} x{{otherApplyDevicesItem.num}}</p>
                  <div class="base-horizontal-layout-center-item-center">
                    <p class="base-text-details-large-black-666" style="margin-right: 5.3333vw">¥ {{otherApplyDevicesItem.servicePrice}}/月</p>
                    <p class="base-text-details-large-red-dark">¥ {{otherApplyDevicesItem.sumServicePrice}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="base-horizontal-layout-space-between-item-center packages-pay-details-details-item" style="padding: 9.8666vw 0 3.2vw 0">
              <p class="base-text-details-large-black-666">合计金额</p>
              <p class="base-text-title-large-red-bold">¥ {{sumPrice}}</p>
            </div>
          </div>
        </div>

        <choose-pay @handoverPaymentOnClick="handoverPayment"></choose-pay>

        <div style="height: 20.6666vw"></div>
      </cube-scroll>
    </div>

    <div class="base-button-fixed-bottom-bk-gray">
      <button-main text="确认支付" @btnOnclick="toPay(packagesPayInfoId)"></button-main>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import returnHead from '_c/head/return-head';
  import choosePay from '_c/pay/choose-pay';
  import buttonMain from '_c/button/button-main';

  export default {
    name: "packages-pay-details",
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

        packagesPayInfoId: '',
        packagesPayDetailsInfo: {},
        packagesTimeList: [
          {
            value: "一个月",
            text: "一个月",
            month: 1
          },
          {
            value: "三个月",
            text: "三个月",
            month: 3
          },{
            value: "一年",
            text: "一年",
            month: 12
          }
        ],
        packagesTimeStr: '',
        choosePackagesTime: 0,
        applyPackagePrice: 0,
        sumPrice: 0,
        paymentType: '',

        isDuplicated: false,
        isBuyMore: false,
        isPaySuccess: false,
      }
    },
    watch: {},
    computed: {},
    created() {
      this.packagesPayInfoId = this.$route.query.packagesPayInfoId;
      window.onWxPay = this.onWxPay;
      window.onZfPay = this.onZfPay;
    },
    mounted() {
      this.getPackagesPayDetails(this.packagesPayInfoId);
    },
    methods: {
      getPackagesPayDetails(packagesPayInfoId) {
        let self = this;
        self.$post("applyPackage", "/getOrderInstall", {
          id: packagesPayInfoId
        }).then((res) => {
          self.packagesPayDetailsInfo = res.data;
          self.packagesTimeStr = self.packagesTimeList[0].value;
          self.applyPackagePrice = self.packagesPayDetailsInfo.applyPackage.monthPrice;
          self.sumPrice = self.packagesPayDetailsInfo.applyPackage.monthPrice;
          self.packagesTimeList[0].price = self.packagesPayDetailsInfo.applyPackage.monthPrice;
          self.packagesTimeList[1].price = self.packagesPayDetailsInfo.applyPackage.quarterPrice;
          self.packagesTimeList[2].price = self.packagesPayDetailsInfo.applyPackage.yearPrice;
          if(self.packagesPayDetailsInfo.applyDevices.length>0) {
            self.packagesPayDetailsInfo.applyDevices.forEach((item)=>{
              if(item.deviceType === 0) {
                self.isDuplicated = true;
              } else if (item.deviceType === 1) {
                self.isBuyMore = true;
              }
              item.sumServicePrice = item.servicePrice * self.packagesTimeList[self.choosePackagesTime].month;
              self.sumPrice = self.sumPrice + item.servicePrice * self.packagesTimeList[self.choosePackagesTime].month;
            });
          }
          if(self.packagesPayDetailsInfo.otherApplyDevices.length>0) {
            self.packagesPayDetailsInfo.otherApplyDevices.forEach((item)=>{
              item.list.forEach((item)=>{
                if(item.deviceType === 0) {
                  self.isDuplicated = true;
                } else if (item.deviceType === 1) {
                  self.isBuyMore = true;
                }
                item.sumServicePrice = item.servicePrice * self.packagesTimeList[self.choosePackagesTime].month;
                self.sumPrice = self.sumPrice + item.servicePrice * self.packagesTimeList[self.choosePackagesTime].month;
              })
            });
          }
        });
      },
      choosePackagesPayPicker() {//选择时间
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
        this.choosePackagesTime = selectedIndex;
        this.applyPackagePrice = this.packagesTimeList[selectedIndex].price;
        this.sumPrice = this.applyPackagePrice;
        this.packagesPayDetailsInfo.applyDevices.forEach((item)=>{
          item.sumServicePrice = item.servicePrice * this.packagesTimeList[this.choosePackagesTime].month;
          this.sumPrice = this.sumPrice + item.servicePrice * this.packagesTimeList[this.choosePackagesTime].month;
        });
        this.packagesPayDetailsInfo.otherApplyDevices.forEach((item)=>{
          item.list.forEach((item)=>{
            item.sumServicePrice = item.servicePrice * this.packagesTimeList[this.choosePackagesTime].month;
            this.sumPrice = this.sumPrice + item.servicePrice * this.packagesTimeList[this.choosePackagesTime].month;
          })
        });
        this.picker = undefined;
      },
      packagesPayCancelHandle() {
        this.picker = undefined;
      },
      handoverPayment(e) {
        this.paymentType = e.paymentType;
      },
      toPay(packagesPayInfoId) {
        let self = this;
        self.$post("applyPackage", "/renewOrder", {
          id: packagesPayInfoId,
          price: self.sumPrice.toFixed(2),
          month: self.packagesTimeList[self.choosePackagesTime].month
        }).then((res) => {
          console.log(res);
          self.$post("base", "/family/pay/goToPay", {
            payType: self.paymentType==="支付宝" ? "aliPay" : self.paymentType==="微信支付" ? "wxPay" : "",
            transactionType: "APP",//SWEEPPAY  NATIVE
            orderId: res.data,
            orderType: 1 //1代表续费的 10代表备城门个人
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
      onPay(res) {
        if (res) {
          this.isPaySuccess = (res===0 ? true : false);
          if(res===1) {
            this.$createToast({
              type: 'correct',
              txt: "用户取消"
            }).show();
          } else if(res===0) {
            this.$createToast({
              type: 'correct',
              txt: "支付成功"
            }).show();
            localStorage.setItem("packagesPay","success");
            setTimeout(() => {
              this.$router.goBack();
            }, 700);
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


      onWxPay(res) {
        console.log("onWxPay121212",res);
        if (res || res==0) {
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
            setTimeout(() => {
              this.$router.goBack();
            }, 700);
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
            setTimeout(() => {
              this.$router.goBack();
            }, 700);
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
    }
  }
</script>

<style scoped>
  .packages-pay-details-box {
    background-color: white;
    border-top: 1px solid #eeeeee;
  }
  .packages-pay-details-title {
    padding: 5.3333vw 5.3333vw 5.6vw 5.3333vw;
  }
  .packages-pay-details-details {
    padding: 0 8vw;
  }
  .packages-pay-details-title-item {
    border-top: 1px solid #eeeeee;
    padding: 4.5333vw 0;
  }
  .packages-pay-details-details-item {
    border-top: 1px solid #eeeeee;
    padding: 4vw 0;
  }
</style>