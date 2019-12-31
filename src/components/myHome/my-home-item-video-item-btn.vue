<!--@Time  : 2019/09/28 9:03-->
<!--@Author: michael huang-->
<!--@File  : my-home-item-video-item-btn.vue-->

<template>
  <div class="home-item-video-item-btn"
       :class="['base-vertical-layout-space-between-item-center']"
       :style="videoItemStyle"
       @touchstart="videoItemTouch"
       @touchend="videoItemTouchEnd">
    <div class="home-item-video-item-btn-name" :class="['base-vertical-layout-center-item-center']">
      <p class="base-text-details-large-white but_text_line_height">{{videoInfo.name}}</p>
    </div>
    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 35.7333vw;padding: 0 4.2666vw;box-sizing: border-box">
      <div class="home-item-video-item-btn-play"
           :class="['base-vertical-layout-center-item-center']"
           @click="play"
           @touchstart="playTouch"
           @touchend="playTouchEnd(videoInfo.yingShiToken, videoInfo.deviceNumber)">
        <img :src="require('@/assets/icon/icon-play.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
        <p class="base-text-details-large-white but_text_line_height">直播</p>
      </div>
      <div class="home-item-video-item-btn-play"
           :class="['base-vertical-layout-center-item-center']"
           @click="playBack"
           @touchstart="playBackTouch"
           @touchend="playBackTouchEnd(videoInfo.yingShiToken, videoInfo.deviceNumber)">
        <img :src="require('@/assets/icon/icon-play-back.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
        <p class="base-text-details-large-white but_text_line_height">回放</p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';

  export default {
    name: "my-home-item-video-item-btn",
    props: {
      yingShiAccessToken: {
        type: String,
        default: ""
      },
      videoInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        videoItemStyle: {}
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
      videoItemTouch() {
        this.videoItemStyle = {background: "linear-gradient(to bottom, #30C9FF, #42DBC4)"};
      },
      videoItemTouchEnd() {
        this.videoItemStyle = {background: "linear-gradient(to bottom, #42DBC4, #30C9FF)"};
      },
      play() {
      },
      playTouch() {
      },
      playTouchEnd(accessToken,deviceNumber) {
        console.log("视频直播Token",accessToken);
        console.log("视频直播deviceNumber",deviceNumber);
        utils.openLiveVideo(accessToken,deviceNumber);
      },
      playBack() {
      },
      playBackTouch() {
      },
      playBackTouchEnd(accessToken,deviceNumber) {
        utils.openBackVideo(accessToken,deviceNumber);
      },

    }
  }
</script>

<style scoped>
  .home-item-video-item-btn {
    width: 35.7333vw;
    height: 47.7333vw;
    background: linear-gradient(to bottom, #42DBC4, #30C9FF);
    border-radius: 1.0666vw;
    padding: 5.0666vw 0 8.8vw 0;
    box-sizing: border-box;
  }
  .home-item-video-item-btn-name {
    width: 30.1333vw;
    height: 8vw;
    background: rgba(255,255,255,0.3);
    border-radius: 4vw;
  }
  .home-item-video-item-btn-play {
    width: 11.7333vw;
    height: 11.7333vw;
    background: rgba(255,255,255,0.3);
    border-radius: 1.0666vw;
  }
</style>