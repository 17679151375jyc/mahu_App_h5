<!--@Time  : 2019/10/11 11:18-->
<!--@Author: michael huang-->
<!--@File  : gate-item-door-out-btn.vue-->

<template>
  <div class="gate-item-door-out-btn"
       :class="['base-vertical-layout-center-item-center']"
       :style="doorOutStyle"
       @click="doorOutOnClick(areaNumber)"
       @touchstart="doorOutTouch"
       @touchend="doorOutTouchEnd">
    <img :src="require('./icon-open-door-color.png')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-blue">出口开门</p>
  </div>
</template>

<script>
  export default {
    name: "gate-item-door-out-btn",
    props: {
      areaNumber: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        doorOutStyle: {},
      }
    },
    created() {
    },
    methods: {
      doorOutOnClick(areaNumber) {
        this.$emit('doorOutOnClick', {areaNumber: areaNumber});
      },
      doorOutTouch() {
        this.doorOutStyle = {background: "linear-gradient(to bottom, #FFF, #CCC)"};
      },
      doorOutTouchEnd() {
        this.doorOutStyle = {background: "white"};
      },
    }
  }
</script>

<style scoped>
  .gate-item-door-out-btn {
    width: 46.6666vw;
    height: 13.8666vw;
    background: white;
    border-radius: 1.0666vw;
  }
</style>