<!--@Time  : 2019/09/28 16:43-->
<!--@Author: michael huang-->
<!--@File  : gate-item-open-door-btn.vue-->

<template>
  <div class="gate-item-open-door-btn"
       :class="['base-vertical-layout-center-item-center']"
       :style="openDoorStyle"
       @click="openDoorOnClick"
       @touchstart="openDoorTouch"
       @touchend="openDoorTouchEnd">
    <img :src="require('./icon-open-door-white.png')" style="width: 3.7333vw;height: 4.2666vw;margin-bottom: 2vw">
    <p class="base-text-details-large-white but_text_line_height">开门</p>
  </div>
</template>

<script>
  export default {
    name: "gate-item-open-door-btn",
    props: {},
    data() {
      return {
        openDoorStyle: {},
      }
    },
    created() {
    },
    methods: {
      openDoorOnClick(number) {
        this.$emit('openDoorOnClick', {number: number});
      },
      openDoorTouch() {
        this.openDoorStyle = {background: "linear-gradient(to bottom, #3388FF, #30C9FF)"};
      },
      openDoorTouchEnd() {
        this.openDoorStyle = {background: "linear-gradient(to bottom, #30C9FF, #3388FF)"};
      },
    }
  }
</script>

<style scoped>
  .gate-item-open-door-btn {
    width: 46.6666vw;
    height: 13.8666vw;
    background: linear-gradient(to bottom, #30C9FF, #3388FF);
    border-radius: 1.0666vw;
  }
</style>