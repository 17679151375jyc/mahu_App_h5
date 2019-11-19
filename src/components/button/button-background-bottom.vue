<template>
  <div class="btn-background-bottom-box" :style="boxStyle" @click="buttonOnClick">
    <p class="btn-background-bottom-box-text" :style="textStyle">{{text}}</p>
    <img v-if="icon!==''" :src="icon" class="base-icon-small-style">
  </div>
</template>

<script>
  export default {
    name: "button-background-bottom",
    props:
      {
        text: {
          type: String,
          default: ''
        },
        icon: {
          type: String,
          default: ''
        },
        boxStyle: {
          type: Object,
          default: ()=>{}
        },
        textStyle: {
          type: Object,
          default: ()=>{}
        }
      },
    methods: {
      buttonOnClick() {
        const self = this;
        self.$emit('buttonOnClick', {});
      }
    }
  };
</script>

<style scoped>
  .btn-background-bottom-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 73.33vw;
    height: 12.27vw;
    margin-bottom: 5.33vw;
    background-color: #3388FF;
    border-radius: 61.3vw;
  }
  .btn-background-bottom-box-text {
    font-size: 3.73vw;
    font-weight: bold;
    color: white;
    line-height: 12.27vw;
  }
</style>
