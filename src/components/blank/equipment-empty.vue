<!--@Time  : 2019/09/26 10:49-->
<!--@Author: michael huang-->
<!--@File  : equipment-empty.vue-->

<template>
  <div class="base-equipment-empty-box"
       :class="['base-horizontal-layout-center-item-center']"
       style="margin: 4vw">
    <p class="base-text-details-large-white"
       style="width: 44.8vw;white-space:normal;text-align: center;line-height: 5vw">{{context?context:'暂无设备，先联系服务人员安装设备吧~'}}</p>
  </div>
</template>

<script>
  export default {
    name: "equipment-empty",
    props: {
      context: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>