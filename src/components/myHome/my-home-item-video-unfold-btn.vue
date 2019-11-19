<!--@Time  : 2019/09/26 17:49-->
<!--@Author: michael huang-->
<!--@File  : my-home-item-video-unfold-btn.vue-->

<template>
  <div class="home-item-video-unfold-btn"
       :class="['base-vertical-layout-center-item-center']"
       :style="[videoUnfoldTouchStyle,videoUnfoldStyle]"
       @click="videoUnfoldOnClick(machineInfo.cameraList)"
       @touchstart="videoUnfoldTouch"
       @touchend="videoUnfoldTouchEnd">
    <img :src="require('@/assets/icon/icon-play.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
    <p class="base-text-details-large-white">实时监控</p>
  </div>
</template>

<script>
  export default {
    name: "my-home-item-video-unfold-btn",
    props: {
      machineInfo: {
        type: Object,
        default: () => {}
      },
      sum: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      },
      // isVideoShowStart: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        videoUnfoldTouchStyle: {},
        videoUnfoldStyle: {}
      }
    },
    // watch: {
    //   isVideoShowStart() {
    //     if(this.isVideoShowStart) {
    //       this.videoUnfoldStyle = {width: "80vw",transition: "width ease-in 0.3s"};
    //     }
    //   }
    // },
    created() {
    },
    methods: {
      videoUnfoldOnClick(cameraList) {
        if (cameraList.length>0) {
          this.videoUnfoldStyle = {width: "80vw",transition: "width ease-in 0.3s"};

          // this.machineInfo.isVideoShow = true;
          // this.machineInfo.machineShow = false;
          // this.machineInfo.isVideoShowStart = true;
          // setTimeout(()=>{
          //   this.machineInfo.isVideoShow = true;
          //   this.machineInfo.isVideoShowStart = false;
          // },300);

          // this.$emit('videoUnfoldOnClick', {machineShow: false, isVideoShowStart: true, isVideoShow: true, index: this.index});
          // setTimeout(()=>{
          //   this.$emit('videoUnfoldOnClick', {machineShow: false, isVideoShowStart: false, isVideoShow: true, index: this.index});
          // },300);

          this.$emit('videoUnfoldOnClick', {isOpenCamera: true, sum: this.sum});

          setTimeout(()=>{
            this.videoUnfoldStyle = {width: "19.4666vw"};
          },300)
        } else {
          const toast = this.$createToast({
            type: "warn",
            txt: "暂无视频"
          });
          toast.show();
        }
      },
      videoUnfoldTouch() {
        this.videoUnfoldTouchStyle = {background: "linear-gradient(to bottom, #30C9FF, #42DBC4)"};
      },
      videoUnfoldTouchEnd() {
        this.videoUnfoldTouchStyle = {background: "linear-gradient(to bottom, #42DBC4, #30C9FF)"};
      },
    }
  }
</script>

<style scoped>
  .home-item-video-unfold-btn {
    width: 19.4666vw;
    height: 47.7333vw;
    background: linear-gradient(to bottom, #42DBC4, #30C9FF);
    border-radius: 1.0666vw;
  }
</style>