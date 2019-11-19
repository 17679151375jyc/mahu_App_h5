<!--@Time  : 2019/10/14 15:50-->
<!--@Author: michael huang-->
<!--@File  : temporary-door-btn-activation.vue-->

<template>
  <div class="temporary-door-btn-activation"
       :class="['base-horizontal-layout-center-item-center']"
       :style="activation"
       @click="activationOnClick"
       @touchstart="activationOnClickTouch"
       @touchend="activationOnClickTouchEnd">
    <p class="base-text-details-normal-white">激活密码</p>
  </div>
</template>

<script>
  export default {
    name: "temporary-door-btn-activation",
    props: {
      domicileNumber: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        activation: {}
      }
    },
    created() {
    },
    methods: {
      activationOnClick() {
        this.$emit('activationOnClick', {domicileNumber: this.domicileNumber});
      },
      activationOnClickTouch() {
        this.activation = {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"};
      },
      activationOnClickTouchEnd() {
        this.activation = {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"};
      },
    }
  }
</script>

<style scoped>
  .temporary-door-btn-activation{
    width: 16vw;
    height: 8.5333vw;
    background: linear-gradient(to bottom, #30C9FF, #3388FF);
    border-radius: 1.0666vw;
  }
</style>