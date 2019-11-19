<!--@Time  : 2019/09/27 14:14-->
<!--@Author: michael huang-->
<!--@File  : ma-hu-index-nick-name.vue-->

<template>
  <!--<div class="base-horizontal-layout-space-between-item-center"-->
       <!--style="padding: 5.3333vw 5.3333vw 2.1333vw 5.3333vw;background-color: white">-->
    <!--<div class="user-nick-name-box" :class="['base-horizontal-layout-center-item-center']" >-->
      <!--<p style="width:auto;font-size: 4.8vw;font-weight: bold">{{getNickName()}}</p>-->
    <!--</div>-->
    <!--<p class="base-text-details-large-blue" @click="toNearbyOnClick">我的附近</p>-->
  <!--</div>-->
  <div class="item">
    <div class="left">{{getNickName()}}</div>
    <!--<div-->
      <!--class="right"-->
      <!--@click="toNearbyOnClick"-->
      <!--@touchstart="addActiveCls"-->
      <!--@touchend="removeActiveCls"-->
    <!--&gt;我的附近</div>-->
  </div>
</template>
<!--background-color: #FAF8BE;-->

<script>
import utils from "_libs/utils";
import { mapState } from "vuex";
import { addClass, removeClass } from "_libs/dom";
const ACTIVE_CLS = "right_active";
export default {
  name: "ma-hu-index-nick-name",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      mUserPhone: state => state.user.userPhone,
      mUserNickName: state => state.user.userNickName
    })
  },
  created() {},
  methods: {
    addActiveCls(e) {
      addClass(e.currentTarget, ACTIVE_CLS);
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, ACTIVE_CLS);
    },
    toNearbyOnClick() {
      this.$router.push({ path: "/ma-hu-index/map-index", query: {} });
    },

    getNickName() {
      //获取昵称
      let str = ""; //的家
      return (this.mUserNickName ? this.mUserNickName : this.mUserPhone) + str;
    }
  }
};
</script>

<style lang="stylus" scoped>
// .user-nick-name-box-1 {
// position relative;
// &:after{
// content:'';
// z-index 0;
// position: absolute;
// left:0;
// right: 0;
// bottom: 0;
// height: 2vw;
// background: #FAF8BE;
// }
// }
// .user-nick-name-box{
// height: 6.6666vw;
// background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(250, 248, 190, 1));
// }
.item {
  display: flex;
  justify-content: space-between;
  height: 10.667vw;
  padding: 0 5.333vw;
  align-items: center;
  background: #fff;
  padding-top: 1.333vw;

  .left {
    position: relative;
    color: #333;
    font-size: 4.8vw;
    font-weight: bold;
    z-index: 1;

    &::after {
      content: '';
      display: block;
      position: absolute;
      height: 2.133vw;
      bottom: -0.533vw;
      left: -1.333vw;
      right: -1.333vw;
      border-radius: 2.667vw;
      background: #FAF8BE;
      z-index: -1;
    }
  }

  .right {
    position: relative;
    color: #3388FF;
    font-size: 3.733vw;
    z-index: 1;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -3.133vw;
      left: -3.133vw;
      right: -3.133vw;
      bottom: -3.133vw;
      z-index: -1;
    }
  }

  .right_active {
    &::after {
      background: #f4f4f4;
      content: '';
      display: block;
      position: absolute;
      top: -3.133vw;
      left: -3.133vw;
      right: -3.133vw;
      bottom: -3.133vw;
      z-index: -1;
    }
  }
}
</style>
