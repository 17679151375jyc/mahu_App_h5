<template>
  <div class="button-icon-background"
       :style="mBackgroundStyle"
       @click="btnOnClick"
       @touchstart="touchStart"
       @touchend="touchEnd">
    <img :src="icon"
         style="margin-right: 1.6vw"
         :class="iconSize==='small'?'base-icon-small-style':iconSize==='normal'?'base-icon-normal-style':''">
    <p class="button-icon-text" :style="textStyle">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "",
    props:
      {
        backgroundStyle: {
          type: Object,
          default: () => {}
        },
        touchBackgroundStyle: {
          type: Object,
          default: () => {}
        },
        icon: {
          type: String,
          default: ""
        },
        iconSize: {
          type: String,
          default: "small"
        },
        text: {
          type: String,
          default: ""
        },
        textStyle: {
          type: Object,
          default: () => {}
        }
      },
    data() {
      return {
        isTouch: false,
        mBackgroundStyle: {}
      }
    },
    methods: {
      touchStart() {
        this.isTouch = true;
        this.mBackgroundStyle = {};
        this.mBackgroundStyle = this.touchBackgroundStyle;
        console.log(this.mBackgroundStyle);
      },
      touchEnd() {
        this.isTouch = false;
        this.mBackgroundStyle = {};
        this.mBackgroundStyle = this.backgroundStyle;
        console.log(this.mBackgroundStyle);
      },
      btnOnClick() {
        const self = this;
        self.$emit('btnOnClick', {});
      }
    }
  };
</script>

<style scoped>
  .button-icon-background {
    width: fit-content;
    padding: 1.33vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #F2F4F5;
    border-radius: 1.33vw;
  }
  .button-icon-text {
    font-size: 2.67vw;
    text-align: center;
    color: #4D4D4D;
  }
</style>
