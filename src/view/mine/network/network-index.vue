<!--@Time  : 2019/09/27 17:19-->
<!--@Author: michael huang-->
<!--@File  : network-index.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="网络配置"></return-head>
    <div v-for="(item,index) in menuList" :key="index"
         class="network-index-box"
         :class="{'base-horizontal-layout-center-item-center': true,
         'base-background-img-blue':item.title==='主机配网',
         'base-background-img-green':item.title==='摄像头配网'}"
         style="margin-top: 7.3333vw;margin-left: 4vw"
         @click="toNetwork(item.title)">
      <img :src="item.icon" class="base-icon-large-style" style="margin-right: 2.6666vw">
      <p class="base-text-title-normal-white">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';

  export default {
    name: "network-index",
    components: {returnHead},
    data() {
      return {
        menuList: [
          {
            icon: require('./icon-network-configuration.png'),
            title: '主机配网'
          },
          {
            icon: require('./icon-network-camera.png'),
            title: '摄像头配网'
          },
        ]
      }
    },
    created() {
    },
    methods: {
      toNetwork(title) {
        switch (title) {
          case "主机配网":
            utils.openMainframeConfig();
            break;
          case "摄像头配网":
            utils.openCameraConfig();
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .network-index-box {
    width: 92vw;
    height: 37.3333vw;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-color: #fff;
    border-radius: 1.33vw;
  }
</style>