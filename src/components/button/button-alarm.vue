<template>
  <div>
    <div class="button-alarm-box"
         :style="backgroundColor">
      <div class="button-alarm-box-item">
        <img :src="icon" class="button-alarm-icon">
        <p class="button-alarm-text" :style="textColor">{{text}}</p>
      </div>
    </div>
    <div style="position: relative;bottom: 12.8vw;left: 0"
         @click="buttonOnClick"
         @touchstart="touchStart"
         @touchend="touchEnd">
      <div class="base-horizontal-layout-center-item-center"
           style="position: absolute;width: 16vw;height: 12.8vw;border-radius: 1vw"
           :style="isTouch?'background-color: #F5F5F5':''">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "button-alarm",
    props:
      {
        backgroundColor: {},
        icon: {
          type: String,
          default: ""
        },
        text: {
          type: String,
          default: ""
        },
        textColor: {},
      },
    data() {
      return {
        isTouch: false
      }
    },
    methods: {
      touchStart() {
        this.isTouch = true;
      },
      touchEnd() {
        this.isTouch = false;
      },
      buttonOnClick() {
        const self = this;
        self.$emit('buttonOnClick', {});
      }
    }
  };
</script>

<style scoped>
  .button-alarm-box {
    width: 16vw;
    height: 12.8vw;
    border-radius: 1vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .button-alarm-box-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .button-alarm-icon {
    width: 4.27vw;
    height: 4.8vw
  }
  .button-alarm-text {
    font-size: 3.2vw;
    text-align: center;
    margin-top: 1.2vw;
  }
</style>
