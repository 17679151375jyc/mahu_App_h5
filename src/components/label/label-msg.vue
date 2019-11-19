<template>
  <div class="label-msg-box" v-bind:class="{'base-vertical-layout-center-item-center': true}" :style="labelBoxStyle">
    <p class="label-msg-text" :style="labelTextStyle" >{{labelText}}</p>
  </div>
</template>

<script>
  export default {
    name: "label-msg",
    props:
      {
        labelBoxStyle: {},
        labelTextStyle: {},
        labelText: {
          type: String,
          default: ""
        }
      },
  };
</script>

<style scoped>
  .label-msg-box {
    height: 3.73vw;
    padding: 1px 1vw;
    border-radius: 1.87vw;
  }
  .label-msg-text {
    font-size: 2.67vw;
    text-align: center;
  }
</style>
