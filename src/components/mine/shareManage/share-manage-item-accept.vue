<!--@Time  : 2019/09/06 10:58-->
<!--@Author: michael huang-->
<!--@File  : share-manage-item-accept.vue-->

<template>
  <div class="share-manage-page-accept">
    <div class="share-manage-page-accept-title">
      <img :src="require('./icon_share-title.png')"
           style="margin-right: 2.6666vw;width: 8.5333vw;height: 8.5333vw">
      <p class="share-manage-page-accept-title-text">{{acceptInfo.areaName}}</p>
    </div>
    <div class="share-manage-page-accept-content">
      <!-- 主机 -->
      <div class="share-manage-page-accept-content-item"
           v-for="(item,index) in acceptInfo.machineList" :key="index">
        <div class="share-manage-page-accept-content-item-title">
          <div class="base-horizontal-layout-space-between-item-center">
            <p class="share-manage-page-accept-content-item-title-master"
                >主用户：{{getMasterUserName(item.shareUser[0].shareUserName,item.shareUser[0].shareUserPhone)}}</p>
            <div class="base-horizontal-layout-center-item-center">
              <img :src="require('./icon_share-manage-title.png')"
                   class="base-icon-large-style" style="margin-right: 2.3333vw">
              <p class="share-manage-page-accept-content-item-title-machine">{{item.name}}</p>
            </div>
          </div>
        </div>
        <!-- 加入时间 -->
        <div class="base-horizontal-layout-space-between-item-center"
             style="width: 100%;padding-top: 2.6666vw">
          <p class="base-text-details-normal-black-666">加入时间：{{getShareTime(item.shareTime)}}</p>
          <p class="base-text-details-large-blue"
             style="font-size: 3.4666vw"
             @click="exitShareAccept(item.id,item.shareUser[0].shareUserNumber)">退出共享设备</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";

  export default {
    name: "share-manage-item-accept",
    props: {
      acceptInfo: {
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
      getMasterUserName(masterUserName, masterUserPhone) {//获取真实姓名
        return (!masterUserName ? utils.hiddenPhoneNum(masterUserPhone) : masterUserName);
      },
      getShareTime(shareTime) {//获取分享时间
        return utils.timetrans(shareTime, "yymmdd");
      },
      exitShareAccept(machineId, shareUserNumber) {
        let self = this;
        self.$emit('exitShareAcceptOnclick', {machineId:machineId, shareUserNumber:shareUserNumber});
      }
    }
  }
</script>

<style scoped>
  .share-manage-page-accept {
    margin: 2.6666vw;
  }
  .share-manage-page-accept-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #4AB7FF;
    padding: 2.4vw 2.6666vw;
    border-radius: 1.3333vw 1.3333vw 0 0;
  }
  .share-manage-page-accept-title-text {
    font-size: 4.2666vw;
    color: white;
  }
  .share-manage-page-accept-content {
    background-color: white;
    border-radius: 0 0 1.3333vw 1.3333vw;
  }
  .share-manage-page-accept-content-item {
    padding: 3.2323vw 5.3333vw;
  }
  .share-manage-page-accept-content-item-title {
    width: 100%;
    padding-bottom: 2.6666vw;
    border-bottom: 1px solid rgba(204,204,204,0.2);
  }
  .share-manage-page-accept-content-item-title-master {
    font-size: 3.73vw;
    color: #333333;
    max-width: 46vw;
    overflow: hidden;
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
    height: 4.3333vw;
    line-height: 4.3333vw;
  }
  .share-manage-page-accept-content-item-title-machine {
    font-size: 3.2vw;
    color: #333333;
    width: 26vw;
    overflow: hidden;
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
    height: 4.3333vw;
    line-height: 4.3333vw;
  }
</style>