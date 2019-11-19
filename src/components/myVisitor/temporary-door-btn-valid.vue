<!--@Time  : 2019/10/14 15:50-->
<!--@Author: michael huang-->
<!--@File  : temporary-door-btn-valid.vue-->

<template>
  <div class="temporary-door-btn-valid"
       :class="['base-horizontal-layout-center-item-center']"
       :style="validStyle"
       @click="validOnClick"
       @touchstart="validOnClickTouch"
       @touchend="validOnClickTouchEnd">
    <p class="base-text-details-normal-white">查看密码</p>
  </div>
</template>

<script>
  export default {
    name: "temporary-door-btn-valid",
    props: {
      domicileNumber: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        validStyle: {}
      }
    },
    created() {
    },
    methods: {
      validOnClick() {
        this.$emit('validOnClick', {domicileNumber: this.domicileNumber});
      },
      validOnClickTouch() {
        this.validStyle = {background: "linear-gradient(to bottom, #13AA95, #5DDEB0)"};
      },
      validOnClickTouchEnd() {
        this.validStyle = {background: "linear-gradient(to bottom, #5DDEB0, #13AA95)"};
      },
    }
  }
</script>

<style scoped>
  .temporary-door-btn-valid{
    width: 16vw;
    height: 8.5333vw;
    background: linear-gradient(to bottom, #5DDEB0, #13AA95);
    border-radius: 1.0666vw;
  }
</style>