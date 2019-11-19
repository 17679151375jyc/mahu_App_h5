<!--@Time  : 2019/09/27 16:51-->
<!--@Author: michael huang-->
<!--@File  : community-empty.vue-->

<template>
  <div class="base-equipment-empty-box"
       :class="['base-horizontal-layout-center-item-center']"
       style="margin: 4vw"
       @click="toAddCommunityOnClick">
    <p class="base-text-details-large-white"
       style="width: 44.8vw;white-space:normal;text-align: center;line-height: 5vw">暂未加入社区，请移步到“我的”页面加入社区吧~</p>
  </div>
</template>

<script>
  export default {
    name: "community-empty",
    props: {},
    data() {
      return {}
    },
    created() {
    },
    methods: {
      toAddCommunityOnClick() {
        this.$emit('toAddCommunityOnClick', {});
      }
    }
  }
</script>

<style scoped>

</style>