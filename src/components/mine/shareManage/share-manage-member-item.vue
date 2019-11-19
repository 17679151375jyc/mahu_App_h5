<!--@Time  : 2019/09/10 16:09-->
<!--@Author: michael huang-->
<!--@File  : share-manage-member-item.vue-->

<template>
  <div class="base-horizontal-layout-space-between-item-center">
    <div class="base-horizontal-layout-general-item-center">
      <img :src="require('./icon_share-manage-share-to.png')"
           style="margin-right: 1.6666vw;width: 4.2666vw;height: 4.2666vw">
      <p class="base-text-details-large-black-666">{{getShareUserName(shareUser.shareUserName,shareUser.shareUserPhone)}}</p>
    </div>
    <div class="share-manage-member-item-btn" @click="deleteOnClick(shareUser.shareUserNumber, shareUser.shareUserName)">删除</div>
  </div>
</template>

<script>
  import utils from "_libs/utils";

  export default {
    name: "share-manage-member-item",
    props: {
      shareUser: {
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
      getShareUserName(shareUserName, shareUserPhone) {//获取真实姓名
        return (!shareUserName ? utils.hiddenPhoneNum(shareUserPhone) : shareUserName);
      },

      deleteOnClick (shareUserNumber, shareUserName) {
        let self = this;
        self.$emit('deleteOnClick', {shareUserNumber: shareUserNumber, shareUserName: shareUserName});
      }
    }
  }
</script>

<style scoped>
  .share-manage-member-item-btn {
    width: 15.4666vw;
    height: 6.4vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #3388FF;
    border-radius: 3.2vw;
    color: white;
    font-size: 3.73vw;
  }
</style>