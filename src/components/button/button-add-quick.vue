<!--@Time  : 2019/10/16 15:13-->
<!--@Author: michael huang-->
<!--@File  : button-add-quick.vue-->

<template>
  <div class="button-add-quick-box"
       :class="{'base-vertical-layout-center-item-center':true,'base-background-img-green':true}"
       :style="buttonAddStyle"
       @click="btnOnClick">
    <p class="base-text-details-large-white">{{text}}</p>
    <img v-if="iconType==='visitor'" :src="require('./icon-add-visitor.png')" class="base-icon-large-style" style="margin-top: 4vw">
    <img v-else-if="iconType==='car'" :src="require('./icon-add-car.png')" class="base-icon-large-style" style="margin-top: 4vw">
    <p class="base-text-details-normal-white" style="margin-top: 1.0666vw">快速添加</p>
  </div>
</template>

<script>
  export default {
    name: "button-add-quick",
    props: {
      text: {
        type: String,
        default: ""
      },
      iconType: {
        type: String,
        default: ""
      },
      buttonAddStyle: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      btnOnClick() {
        const self = this;
        self.$emit('btnOnClick', {});
      }
    }
  }
</script>

<style scoped>
  .button-add-quick-box {
    height: 32vw;
    border-radius: 1.6vw;
    background-size: 100% 100%;
    background-color: #fff;
  }
</style>