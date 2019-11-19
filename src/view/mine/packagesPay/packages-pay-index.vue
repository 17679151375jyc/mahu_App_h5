<!--@Time  : 2019/10/31 10:29-->
<!--@Author: michael huang-->
<!--@File  : packages-pay-index.vue-->

<template>
  <div class="wrapper">
    <return-head title="我的套餐"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="packagesPayScroll"
        class="scroll-wrapper-text-style"
        :options="options"
        :data="packagesPayList">
        <div v-for="(item,index) in packagesPayList" :key="index">
          <packages-pay-item class="packages-pay-box"
                             :packagesPayInfo="item"
                             @payRankOnClick="payRank">
          </packages-pay-item>
        </div>
        <div style="height: 2.6666vw"></div>
      </cube-scroll>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :isShowbtn="isShowbtn"
                :isShowCloseIcon="isShowCloseIcon"
                @closePoppup="closePoppup">
      <!--消息汇总弹窗-->
      <div style="height: 85.34vw">
        <cube-scroll>
          <div v-for="(item,index) in packagesPayRechargeRecord" :key="index"
               class="base-horizontal-layout-space-between-item-center" style="height: 11.4666vw">
            <p class="base-text-details-large-black-666">{{item.monthStr}}</p>
            <p class="base-text-details-large-black-666">{{item.payTimeStr}}</p>
          </div>
        </cube-scroll>
      </div>
    </base-popup>

    <equipment-empty v-if="packagesPayList.length===0" context="您的账号内暂无套餐"></equipment-empty>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import packagesPayItem from '_c/mine/packagesPay/packages-pay-item'
  import equipmentEmpty from '_c/blank/equipment-empty';
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "packages-pay-index",
    components: {
      returnHead,
      packagesPayItem,
      equipmentEmpty,
      basePopup
    },
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

        packagesPayList: [],


        // 弹窗属性
        isPopShow: false,
        refId: 'packagesPayPopup',
        popTitle: '',
        popType: '',
        popPlainText: '',
        isShowbtn: false,
        isShowCloseIcon: false,
        // 弹窗参数
        packagesPayRechargeRecord: [],
      }
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        let self = this;
        if (localStorage.getItem("packagesPay") === "success") {
          self.getPersonalPackage();
        }
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      let self = this;
      self.getPersonalPackage();
    },
    methods: {
      getPersonalPackage() {
        let self = this;
        self.$post("applyPackage", "/getPersonalPackage", {
          alertNumber: self.newAlertNumber
        }).then((res) => {
          self.packagesPayList = [...res.data];
        });
      },
      payRank(e) {
        let self = this;
        self.$post("baseClient", "/comUserPayRecord/getChargeRecord", {
          id: e.packagesPayInfoId,
          page: 0,
          pageSize: 100
        }).then((res) => {
          if(res.data.list.length>0) {
            self.isPopShow = true;
            self.isShowCloseIcon = true;
            self.popTitle = "充值记录";
            let count = 0;
            res.data.list.forEach((item,index)=>{
              item.monthStr = item.month===1?"一个月":item.month===3?"三个月":item.month===12?"一年":"";
              item.payTimeStr = utils.timetrans(item.payTime,"yymmddhhmm");
              count = index;
            });
            if (count === res.data.list.length-1) {
              self.packagesPayRechargeRecord = [...res.data.list];
            }
          } else {
            const toast = this.$createToast({
              type: 'warn',
              txt: "暂无充值记录"
            });
            toast.show();
          }
        });
      },
      closePoppup() {
        this.isPopShow = false;
        this.popTitle = "";
        this.popPlainText = "";
        this.packagesPayRechargeRecord = [];
      }
    }
  }
</script>

<style scoped>
  .packages-pay-box {
    margin: 2.6666vw 2.6666vw 0 2.6666vw;
  }
</style>