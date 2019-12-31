<!--@Time  : 2019/10/14 15:50-->
<!--@Author: michael huang-->
<!--@File  : temporary-door-btn-activation.vue-->

<template>
  <div
    class="temporary-door-btn-activation"
    :class="['base-horizontal-layout-center-item-center']"
    :style="activation"
    @click="activationOnClick"
    @touchstart="addActiveCls"
    @touchend="removeActiveCls"
  >
    <span>激活密码</span>
  </div>
</template>

<script>
import { addClass, removeClass } from "_libs/dom";
export default {
  name: "temporary-door-btn-activation",
  props: {
    domicileNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activation: {}
    };
  },
  created() {},
  methods: {
    activationOnClick() {
      this.$emit("activationOnClick", { domicileNumber: this.domicileNumber });
    },
    addActiveCls(e) {
      addClass(e.currentTarget, "active");
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, "active");
    }
  }
};
</script>

<style lang="stylus" scoped>
.temporary-door-btn-activation {
  width: 22vw;
  height: 9.333vw;
  border-radius: 0.533vw;
  background: linear-gradient(135deg, rgba(72, 204, 253, 1) 0%, rgba(51, 136, 255, 1) 100%);

  &.active {
    background: linear-gradient(135deg, darken(rgba(72, 204, 253, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
  }

  span {
    color: #fff;
    font-size: 4vw
  }
}
</style>