<template>
  <div class="label-border-style" :style="labelBorderColor">
    <p class="label-border-text" :style="labelBorderTextColor">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "label-border",
    props:
      {
        text: {
          type: String,
          default: ""
        },
        labelBorderColor: {},
        labelBorderTextColor: {}
      },
  };
</script>

<style scoped>
  .label-border-style {
    width: 16vw;
    height: 6.4vw;
    border: 0.2666666vw solid #FF3333;
    border-radius: 3vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .label-border-text {
    font-size: 3.2vw;
    line-height: 3.73vw;
    color: #FF3333;
  }
</style>
