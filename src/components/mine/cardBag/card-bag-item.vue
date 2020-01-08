<!--@Time  : 2019/12/8 17:08-->
<!--@Author: michael huang-->
<!--@File  : card-bag-item.vue-->

<template>
  <div
    class="base-horizontal-layout-space-between-item-center card-bag-item-box"
    :class="[
      { 'card-bag-item-1': comUserCouponInfo.status === 0 && comUserCouponInfo.isEffective },
      { 'card-bag-item-2': comUserCouponInfo.status === 1 },
      { 'card-bag-item-3': comUserCouponInfo.status === 0 && !comUserCouponInfo.isEffective }
    ]"
    @click="toCouPonIndex(comUserCouponInfo)"
  >
    <div
      class="base-vertical-layout-space-between"
      style="margin-left: 8vw;height: 26vw"
    >
      <div class="base-horizontal-layout-general-item-end" >
        <p class="base-text-details-large-white">
          <span style="font-size: 9.6vw;font-weight: bold">
          {{ comUserCouponInfo.couponType | couponTypePrice('money',comUserCouponInfo) }}
          </span>
          {{ comUserCouponInfo.couponType | couponTypePrice('unit') }}
        </p>
        <div
          class="base-horizontal-layout-center-item-center card-bag-item-label"
          style="border-radius: 1vw;"
        >
          <p
            :class="[
              {
                'base-text-details-large-red-dark':
                  comUserCouponInfo.status === 0 && comUserCouponInfo.isEffective,
                  'base-text-details-large-gray':
                  comUserCouponInfo.status === 1 ||
                  ( comUserCouponInfo.status === 0 && !comUserCouponInfo.isEffective)
              }
            ]"
            style="transform: skewX(45deg)"
          >{{comUserCouponInfo.couponType | systemInit('CouponType')}}
          </p>
        </div>
      </div>
      <div class="base-vertical-layout-general" style="margin-bottom: 3vw">
        <p class="base-text-details-large-white" style="height: 5.33vw;line-height: 5.33vw;">
          {{ comUserCouponInfo.couponName }}
        </p>
        <p class="base-text-details-large-white" style="margin-top: 2vw;width: 54vw;height: 5.33vw;line-height: 5.33vw;">
          {{ comUserCouponInfo.businessName }}
        </p>
      </div>
    </div>
    <div
      v-if="comUserCouponInfo.status === 0 && comUserCouponInfo.isEffective"
      class="base-vertical-layout-center-item-center"
      style="margin-right: 5.7333vw">
      <p style="font-size: 4.8vw;font-weight: bold;color: #D72A25">有效期</p>
      <p class="base-text-details-large-red-dark" style="margin-top: 3.2vw">
        {{ getUseTime(comUserCouponInfo.effectiveTime) }}
      </p>
    </div>
    <img v-else :src="comUserCouponInfo.status === 1
          ? require('./icon-used.png')
          : comUserCouponInfo.status === 0 && !comUserCouponInfo.isEffective
          ? require('./icon-expired.png')
          : '' "
         class="usedImg"
        :class="{'usedImg-status1':comUserCouponInfo.status === 1}"/>
    <span class="used-time" v-if="comUserCouponInfo.status === 1">
      {{useTime}}
    </span>
  </div>
</template>

<script>
import utils from "_libs/utils";

export default {
  name: "card-bag-item",
  props: {
    comUserCouponInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      useTime: 0
    };
  },
  created() {
    this.useTime = utils.timetrans(this.comUserCouponInfo.useTime,"yymmdd");
  },
  mounted() {},
  methods: {
    getUseTime(effectiveTime) {
      return utils.timetrans(effectiveTime, "YYMMDD");
    },
    toCouPonIndex({status,isEffective}) {
      let self = this;
      if (status === 0 && isEffective) {
        let comUserCouponInfoJson = JSON.stringify(self.comUserCouponInfo);
        self.$router.push({
          path: "/mine/card-bag/coupon-index",
          query: { comUserCouponInfo: comUserCouponInfoJson }
        });
      } else if (status === 1) {
        self
          .$createToast({
            type: "correct",
            txt: "优惠券已使用"
          })
          .show();
      } else  {
        self
          .$createToast({
            type: "warn",
            txt: "优惠券已过期"
          })
          .show();
      }
    }
  }
};
</script>

<style scoped>
.card-bag-item-box {
  height: 34.4vw;
}
.card-bag-item-1 {
  background: url("~@/components/mine/cardBag/icon-card-unused.png");
  background-size: cover;
}
.card-bag-item-2 {
  background: url("~@/components/mine/cardBag/icon-card-expired.png");
  background-size: cover;
}
.card-bag-item-3 {
  background: url("~@/components/mine/cardBag/icon-card-expired.png");
  background-size: cover;
}
.card-bag-item-label {
  width: 18.6666vw;
  height: 6.4vw;
  background-color: white;
  transform: skewX(-45deg);
  margin-left: 5vw;
}
.used-time {
  position: absolute;
  font-size: smaller;
  color: #999999;
  right: 9vw;
  margin-top: 8vw
}
.usedImg {
  width: 21.0666vw;
  height: 21.0666vw;
  margin-right: 7.7333vw;
}
.usedImg-status1 {
  margin-bottom: 5vw;
}
</style>
