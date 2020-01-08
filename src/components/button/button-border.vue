<template>
  <div class="base-vertical-layout-center-item-center button-border-style"
       v-bind:class="buttonBorderClass"
       :style="buttonBorderStyle"
       @click="buttonOnClick">
    <p class="button-border-text"
       v-bind:class="buttonBorderTextClass"
       :style="buttonBorderTextStyle">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "button-border",
    props:
      {
        text: {
          type: String,
          default: ""
        },
        buttonBorderClass: {},
        buttonBorderStyle: {},
        buttonBorderTextClass: {},
        buttonBorderTextStyle: {}
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
  .button-border-style {
    /*width: 18.67vw;*/
    height: 8.6666vw;
    padding: 0 1vw;
    border: 1px solid #FFF;
    border-radius: 1.07vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 8vw;
  }
  .button-border-text {
    text-align: center;
  }
</style>
