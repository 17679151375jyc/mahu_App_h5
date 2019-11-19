<!--@Time  : 2019/09/28 13:50-->
<!--@Author: michael huang-->
<!--@File  : my-home-item-video-close-btn.vue-->

<template>
  <div class="base-horizontal-layout-center-item-center"
       style="width: 14.9333vw;height: 47.7333vw;border-radius: 1.0666vw;margin-right: 2.1333vw;background-color: white"
       :style="[videoCloseStyle]"
       @click="videoCloseOnClick">
    <img :src="require('@/assets/icon/icon_arrow-right-2.png')"
         style="width: 2.6666vw;height: 4.2666vw">
  </div>
</template>

<script>
  export default {
    name: "my-home-item-video-close-btn",
    props: {
      index: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        videoCloseStyle: {}
      }
    },
    created() {
    },
    methods: {
      videoCloseOnClick() {
        this.videoCloseStyle = {width: "80vw",transition: "width ease-in 0.3s"};
        // this.$emit('videoCloseOnClick', {isOpenCamera: false});
        this.$emit('videoCloseOnClick', {isOpenCamera: false, index: this.index});
        setTimeout(()=>{
          this.videoCloseStyle = {width: "14.9333vw"};
        },300)


      }
    }
  }
</script>

<style scoped>

</style>