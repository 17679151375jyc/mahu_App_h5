<!--@Time  : 2019/09/06 10:55-->
<!--@Author: michael huang-->
<!--@File  : share-manage-item-share.vue-->

<template>
  <div class="share-manage-page-share">
    <div class="share-manage-page-share-title">
      <img :src="require('./icon_share-title.png')"
           style="margin-right: 2.6666vw;width: 8.5333vw;height: 8.5333vw">
      <p class="share-manage-page-share-title-text">{{mineManageInfo.areaName}}</p>
      <div @click="editName('家庭',mineManageInfo.id,mineManageInfo.areaName)">
        <img :src="require('./icon_share-manage-edit_w.png')"
             class="share-manage-item-share-edit-icon">
      </div>
    </div>
    <div v-if="mineManageInfo.machineList" class="share-manage-page-share-content">
      <!-- 主机 -->
      <div v-for="(item,index) in mineManageInfo.machineList" :key="index"
           class="share-manage-page-share-content-item" >
        <div class="base-horizontal-layout-general-item-center">
          <img :src="require('./icon_share-manage-title.png')" class="base-icon-large-style" style="padding-bottom: 2.6666vw">
          <div class="share-manage-page-share-content-item-title">
            <div class="base-horizontal-layout-space-between-item-center">
              <div class="base-horizontal-layout-general-item-center">
                <p class="share-manage-page-share-content-item-title-machine">{{item.name}}</p>
                <div @click="editName('主机',item.id,item.name)">
                  <img :src="require('./icon_share-manage-edit_t.png')"
                       class="share-manage-item-share-edit-icon">
                </div>
              </div>
              <div class="base-horizontal-layout-general-item-center" @click="toShareManageMember(item)">
                <img :src="require('./icon_share-manage-add.png')"
                     style="margin-right: 1.6666vw;width: 4.2666vw;height: 4.2666vw">
                <p class="base-text-details-large-blue">成员管理</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 共享的人 -->
        <div v-if="item.shareUser && item.shareUser.length>0" class="base-horizontal-layout-general" style="margin: 2.6666vw 0 0 0">
          <div class="base-horizontal-layout-general-item-center" style="height: 5vw">
            <p class="base-text-details-large-black-666">共享给：</p>
          </div>
          <div>
            <div class="base-horizontal-layout-general-item-center-flex-wrap">
              <div v-for="(pItem,pIndex) in item.shareUser" :key="pIndex"
                   class="base-horizontal-layout-general-item-center"
                   :style="pIndex===1?'margin-left: 6.4vw':((pIndex>1)&&((pIndex%2)===0))?
                   'margin-top: 1.6666vw':((pIndex>1)&&((pIndex%2)!==0))?
                   'margin-left: 6.4vw;margin-top: 1.6666vw':''">
                <img :src="require('./icon_share-manage-share-to.png')"
                     style="width: 4.3vw;height: 4.3vw">
                <p class="share-manage-page-share-content-item-content">{{getShareUserName(pItem.shareUserName,pItem.shareUserPhone)}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 主机设备 -->
        <div v-if="item.cameraList && item.cameraList.length>0" style="margin-top: 5vw">
          <div class="base-horizontal-layout-general-item-center" style="width: 100%;margin: 2vw 0"
               v-for="(cItem,cIndex) in item.cameraList" :key="cIndex">
            <img :src="require('./icon_share-manage-camera.png')"
                 style="width: 5.3vw;height: 4.9666vw;margin-right: 2.6666vw">
            <p class="share-manage-page-share-content-item-title-machine">{{cItem.name}}</p>
            <div @click="editName('摄像头',cItem.id,cItem.name)">
              <img :src="require('./icon_share-manage-edit_t.png')"
                   class="share-manage-item-share-edit-icon">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";

  export default {
    name: "share-manage-item-share",
    props: {
      mineManageInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    created() {
      console.log(this.mineManageInfo.areaName);
      console.log(this.mineManageInfo.machineList.length);
    },
    methods: {
      getShareUserName(shareUserName, shareUserPhone) {//获取真实姓名
        return (!shareUserName ? utils.hiddenPhoneNum(shareUserPhone) : shareUserName);
      },

      toShareManageMember(mineManageInfo) {
        let self = this;
        self.$router.push({path:"/mine/share-manage/share-manage-member", query:{mineManageInfo: JSON.stringify(mineManageInfo)}});
      },

      editName(type, id, name) {
        let self = this;
        self.$emit('editNameOnclick', {type: type, id: id, name: name});
      }
    }
  }
</script>

<style scoped>
  .share-manage-page-share {
    margin: 2.6666vw;
  }
  .share-manage-page-share-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #38F;
    /*background: linear-gradient(to right, #38F, #4AB7FF);*/
    padding: 2.4vw 2.6666vw;
    border-radius: 1.3333vw 1.3333vw 0 0;
  }
  .share-manage-page-share-title-text {
    font-size: 4.2666vw;
    color: white;
  }
  .share-manage-page-share-content {
    background-color: white;
    border-radius: 0 0 1.3333vw 1.3333vw;
  }
  .share-manage-page-share-content-item {
    padding: 3.2323vw 5.3333vw;
  }
  .share-manage-page-share-content-item-title {
    width: 100%;
    padding-bottom: 2.6666vw;
    margin-left: 2.6666vw;
    border-bottom: 1px solid rgba(204,204,204,0.2);
  }
  .share-manage-page-share-content-item-title-machine {
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
  .share-manage-page-share-content-item-content {
    margin-left: 1.6vw;
    font-size: 3.73vw;
    width: 24.5333vw;
    overflow: hidden;
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
    height: 5.3333vw;
    line-height: 5.3333vw;
    color: #666;
  }

  /*修改图标的样式*/
  .share-manage-item-share-edit-icon {
    width: 4.2666vw;
    height: 4.2666vw;
    margin-left: 2.1333vw
  }
</style>