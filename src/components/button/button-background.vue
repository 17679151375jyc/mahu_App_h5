<template>
  <div class="button-background-style"
       :style="buttonBackgroundStyle"
       @click="buttonOnClick">
    <p class="button-background-text"
       :style="buttonBackgroundTextStyle">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "button-background",
    props:
      {
        text: {
          type: String,
          default: ""
        },
        buttonBackgroundStyle: {
          type: Object,
          default: () => {}
        },
        buttonBackgroundTextStyle: {
          type: Object,
          default: () => {}
        }
      },
    methods: {
      buttonOnClick() {
        const self = this;
        self.$emit('buttonOnClick', {});
      }
    }
  }
</script>

<style scoped>
  .button-background-style {
    background-color: #3388FF;
    padding: 1.33vw 6.13vw;
    border-radius: 1.33vw;
  }
  .button-background-text {
    font-size: 3.2vw;
    color: white;
  }
</style>