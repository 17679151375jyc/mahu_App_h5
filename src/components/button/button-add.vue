<!--@Time  : 2019/09/26 15:38-->
<!--@Author: michael huang-->
<!--@File  : button-add.vue-->

<template>
  <div class="button-add-box"
       :class="{'base-vertical-layout-center-item-center':true,'base-background-img-green':true}"
       :style="buttonAddStyle"
       @click="btnOnClick">
    <img :src="require('@/assets/icon/icon_add-white.png')" class="base-icon-normal-style" style="margin-bottom: 1.0666vw">
    <p class="base-text-details-large-white">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "button-add",
    props: {
      text: {
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
  .button-add-box {
    height: 32vw;
    border-radius: 1.6vw;
    background-size: 100% 100%;
    background-color: #fff;
  }
</style>