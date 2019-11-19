<!--@Time  : 2019/09/24 8:40-->
<!--@Author: michael huang-->
<!--@File  : button-main.vue-->

<template>
  <div class="base-horizontal-layout-center-item-center button-main-button-blue-box"
       :style="btnChangeStyle"
       @click="btnOnclick"
       @touchstart="btnTouch"
       @touchend="btnTouchEnd">
    <p class="button-main-button-blue-text">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "button-main",
    props: {
      text: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        btnChangeStyle: {}
      }
    },
    created() {
    },
    methods: {
      btnOnclick() {
        let self = this;
        self.$emit('btnOnclick', {});
      },
      btnTouch() {
        let self = this;
        self.btnChangeStyle = {background: "linear-gradient(to right, #30CAFF, #38F)"};
        // self.$emit('btnTouch', {btnChangeStyle: self.btnChangeStyle});
      },
      btnTouchEnd() {
        let self = this;
        self.btnChangeStyle = {background: "linear-gradient(to right, #38F, #30CAFF)"};
        // self.$emit('btnTouchEnd', {btnChangeStyle: self.btnChangeStyle});
      }
    }
  }
</script>

<style scoped>
  .button-main-button-blue-box {
    width: 84vw;
    height: 11.7333vw;
    margin: 0 auto;
    border-radius: 1.0666vw;
    background: linear-gradient(to right, #38F, #30CAFF);
  }
  .button-main-button-blue-text {
    color: #fff;
    font-size: 3.7333vw;
  }
</style>