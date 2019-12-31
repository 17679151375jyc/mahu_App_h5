<!--@Time  : 2019/09/24 8:40-->
<!--@Author: michael huang-->
<!--@File  : button-main.vue-->

<template>
  <div
    class="base-horizontal-layout-center-item-center button-main-button-blue-box"
    :style="btnChangeStyle"
    @click="btnOnclick"
    @touchstart="addActiveCls"
    @touchend="removeActiveCls"
  >
    <span>{{text}}</span>
    <p class="button-main-button-blue-text"></p>
  </div>
</template>

<script>
import { addClass, removeClass } from "_libs/dom";
export default {
  name: "button-main",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      btnChangeStyle: {}
    };
  },
  created() {},
  methods: {
    addActiveCls(e) {
      addClass(e.currentTarget, "active");
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, "active");
    },
    btnOnclick() {
      let self = this;
      self.$emit("btnOnclick", {});
    },
    btnTouch() {
      let self = this;
      self.btnChangeStyle = {
        background: "linear-gradient(to right, #30CAFF, #38F)"
      };
      // self.$emit('btnTouch', {btnChangeStyle: self.btnChangeStyle});
    },
    btnTouchEnd() {
      let self = this;
      self.btnChangeStyle = {
        background: "linear-gradient(to right, #38F, #30CAFF)"
      };
      // self.$emit('btnTouchEnd', {btnChangeStyle: self.btnChangeStyle});
    }
  }
};
</script>

<style lang="stylus" scoped>
.button-main-button-blue-box {
  width: 84vw;
  height: 11.7333vw;
  margin: 0 auto;
  border-radius: 1.0666vw;
  background: linear-gradient(135deg, rgba(72, 204, 253, 1) 0%, rgba(51, 136, 255, 1) 100%);

  &.active {
    background: linear-gradient(135deg, darken(rgba(72, 204, 253, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
  }

  span {
    color: #fff;
    font-size: 4.2666vw;
  }
}
</style>