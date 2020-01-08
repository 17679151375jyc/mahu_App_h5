<!--
 * @Descripttion: 
 * @version: 
 * @Author: Vencent Lum
 * @Date: 2019-12-13 15:05:40
 * @LastEditors: Vencent Lum
 * @LastEditTime: 2020-01-03 10:22:37
 -->
<template>
  <div @click="buttonOnClick">
    <a class="button-border-style"
       :class="buttonBorderClass"
       :style="buttonBorderStyle"
       :href="'tel:'+href">
      <p class="button-border-text"
         :class="buttonBorderTextClass"
         :style="buttonBorderTextStyle">{{text}}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name: "button-border-call",
    props:
      {
        href: {
          type: String,
          default: ""
        },
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
    padding: 0 2vw;
    border: 0.2666666vw solid #FFF;
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
