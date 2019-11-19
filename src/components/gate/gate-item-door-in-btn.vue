<!--@Time  : 2019/10/11 11:18-->
<!--@Author: michael huang-->
<!--@File  : gate-item-door-in-btn.vue-->

<template>
  <div class="gate-item-door-in-btn"
       :class="['base-vertical-layout-center-item-center']"
       :style="doorInStyle"
       @click="doorInOnClick(areaNumber)"
       @touchstart="doorInTouch"
       @touchend="doorInTouchEnd">
    <img :src="require('./icon-open-door-white.png')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-white">入口开门</p>
  </div>
</template>

<script>
  export default {
    name: "gate-item-door-in-btn",
    props: {
      areaNumber: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        doorInStyle: {},
      }
    },
    created() {
    },
    methods: {
      doorInOnClick(areaNumber) {
        this.$emit('doorInOnClick', {areaNumber: areaNumber});
      },
      doorInTouch() {
        this.doorInStyle = {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"};
      },
      doorInTouchEnd() {
        this.doorInStyle = {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"};
      },
    }
  }
</script>

<style scoped>
  .gate-item-door-in-btn {
    width: 46.6666vw;
    height: 13.8666vw;
    background: linear-gradient(to bottom, #30C9FF, #3388FF);
    border-radius: 1.0666vw;
  }
</style>