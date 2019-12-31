<!--@Time  : 2019/10/14 15:50-->
<!--@Author: michael huang-->
<!--@File  : temporary-door-btn-valid.vue-->

<template>
  <div
    class="temporary-door-btn-valid"
    :class="['base-horizontal-layout-center-item-center']"
    :style="validStyle"
    @click="validOnClick"
    @touchstart="addActiveCls"
    @touchend="removeActiveCls"
  >
    <span>查看密码</span>
  </div>
</template>

<script>
import { addClass, removeClass } from "_libs/dom";
export default {
  name: "temporary-door-btn-valid",
  props: {
    domicileNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      validStyle: {}
    };
  },
  created() {},
  methods: {
    validOnClick() {
      this.$emit("validOnClick", { domicileNumber: this.domicileNumber });
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
.temporary-door-btn-valid {
  width: 22vw;
  height:  9.333vw;
  border-radius: 0.533vw;
  background: linear-gradient(135deg, #5DDEB0, #13AA95);

  &.active {
    background: linear-gradient(135deg, darken(#5DDEB0, 20%) 0%, darken(#13AA95, 20%) 100%);
  }

  span {
    color: #fff;
    font-size: 4vw
  }
}
</style>