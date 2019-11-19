<!--@Time  : 2019/10/15 13:12-->
<!--@Author: michael huang-->
<!--@File  : guanggao-index.vue-->

<template>
  <div class="wrapper">
    <return-head :title="title">

  </div>
</template>

<script>
  import returnHead from "_c/head/return-head";

  export default {
    name: "guanggao-index",
    components: {
      returnHead
    },
    data() {
      return {
        title: ''
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>