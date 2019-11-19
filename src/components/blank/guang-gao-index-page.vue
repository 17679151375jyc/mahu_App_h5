<!--@Time  : 2019/09/26 10:52-->
<!--@Author: michael huang-->
<!--@File  : guang-gao-index-page.vue-->

<template>
  <div class="my-guang-gao-box" :class="['base-vertical-layout-space-between']">
    <div class="base-horizontal-layout-space-between-item-center">
      <p style="font-size: 4.5333vw;color: white">马虎智能安全</p>
      <!--<p class="my-guang-gao-box-btn" :class="['base-text-details-normal-white']">了解更多</p>-->
    </div>
    <p style="font-size: 8vw;color: white;margin: 3vw">科技·守护你所爱</p>
  </div>
</template>

<script>
  export default {
    name: "guang-gao-index-page",
    props: {},
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>
  .my-guang-gao-box {
    height: 37.3333vw;
    padding: 5.3333vw;
    box-sizing: border-box;
    background-image: url('../../assets/background/bg-blue.png');
    background-size: 100% 100%;
    background-color: #fff;
    border-radius: 1.33vw;
  }
  .my-guang-gao-box-btn {
    padding: 1.6vw 3.2vw;
    border: 1px solid rgba(255,255,255,1);
    border-radius: 1.0666vw;
  }
</style>