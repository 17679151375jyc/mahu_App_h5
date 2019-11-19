<template>
  <div class="button-border-style"
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
    height: 6.67vw;
    padding: 0 3vw;
    border: 1px solid #FFF;
    border-radius: 5.07vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .button-border-text {
    text-align: center;
  }
</style>
