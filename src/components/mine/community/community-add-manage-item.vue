<!--@Time  : 2019/09/24 12:46-->
<!--@Author: michael huang-->
<!--@File  : community-add-manage-item.vue-->

<template>
  <div>
    <div class="community-add-manage-item-box"
         :class="{'base-horizontal-layout-space-between':true,
         'community-add-manage-item-box-blue':applyCommunityInfo.status===0,
         'community-add-manage-item-box-red':applyCommunityInfo.status===2,
         'community-add-manage-item-box-gray':applyCommunityInfo.status===3}"
         @click="applyCommunityOnClick">
      <div class="base-vertical-layout-general">
        <div class="base-vertical-layout-general">
          <div class="base-horizontal-layout-general-item-center" style="margin: 2.6666vw 0 0 4.8vw">
            <img :src="require('@/assets/icon/icon-person.png')" class="base-icon-large-style">
            <p class="base-text-title-normal-white" style="margin-left: 1.0666vw">{{applyCommunityInfo.realName}}<span
              class="base-text-details-large-white" style="margin-left: 1.0666vw">{{applyCommunityInfo.phone}}</span></p>
          </div>
        </div>
        <div class="base-vertical-layout-general" style="margin: 5.3333vw 0 0 11.2vw">
          <p class="base-text-details-large-white">{{getApplyPlotName(applyCommunityInfo.plotName)}}</p>
          <p class="base-text-details-large-white" style="margin-top: 2vw">{{getApplyTime(applyCommunityInfo.applyTime)}}</p>
          <p class="base-text-details-large-white" style="margin-top: 2vw">{{getServerUserName(applyCommunityInfo.serverUserName)}}</p>
        </div>
      </div>
      <div class="base-vertical-layout-space-between-item-end" style="margin-right: 4.5333vw">
        <p class="base-text-details-large-white" style="margin-top: 2.9333vw">{{getApplyStatus(applyCommunityInfo.status)}}</p>
        <!--<div :class="{'base-vertical-layout-center-item-center':applyCommunityInfo.status===0,-->
             <!--'base-vertical-layout-space-between-item-center':applyCommunityInfo.status===2}"-->
             <!--style="height: 18.6666vw;margin-bottom: 2.4vw">-->
          <!--<div v-if="applyCommunityInfo.status===2" class="base-horizontal-layout-center-item-center"-->
               <!--style="width: 21.3333vw;height: 8.5333vw;border: 1px solid #FFF;border-radius: 1.0666vw">-->
            <!--<p class="base-text-details-large-white">删除申请</p>-->
          <!--</div>-->
          <!--<div v-if="applyCommunityInfo.status===0 || applyCommunityInfo.status===2" class="base-horizontal-layout-center-item-center"-->
               <!--style="width: 21.3333vw;height: 8.5333vw;background-color: white;border-radius: 1.0666vw">-->
            <!--<p class="base-text-details-large-blue" :style="applyCommunityInfo.status===2?'color: #FC4B45':''">修改信息</p>-->
          <!--</div>-->
        <!--</div>-->
        <div :class="{'base-vertical-layout-center-item-center':true}"
             style="height: 18.6666vw;margin-bottom: 2.4vw">
          <div v-if="applyCommunityInfo.status===0 || applyCommunityInfo.status===2" class="base-horizontal-layout-center-item-center"
               style="width: 21.3333vw;height: 8.5333vw;background-color: white;border-radius: 1.0666vw">
            <p class="base-text-details-large-blue" :style="applyCommunityInfo.status===2?'color: #FC4B45':''">修改信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';

  export default {
    name: "community-add-manage-item",
    props: {
      applyCommunityInfo: {
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
      getApplyPlotName(name) {
        return "申请社区："+name;
      },
      getApplyTime(time) {
        return "申请时间："+utils.timetrans(time, 'yymmdd');
      },
      getServerUserName(name) {
        return name ? ("审核人："+name) : "";
      },
      getApplyStatus(status) {
        let str = "";
        switch (status) {
          case 0:
            str = "未审核";
            break;
          case 2:
            str = "不通过";
            break;
          case 3:
            str = "审核中";
            break;
          default:
              break;
        }
        return str;
      },

      applyCommunityOnClick() {
        let self = this;
        if (self.applyCommunityInfo.status===3) {
          const toast = this.$createToast({
            type: "warn",
            txt: "物管审核中，请耐心等待..."
          });
          toast.show();
        } else {
          self.$emit('applyCommunityOnClick', {applyID: this.applyCommunityInfo.applyID});
        }

      }
    }
  }
</script>

<style scoped>
  .community-add-manage-item-box {
    width: 94.6666vw;
    height: 32vw;
    border-radius: 1.6vw;
    background-size: 100% 100%;
    background-color: #fff;
  }
  .community-add-manage-item-box-blue {
    background-image: url('../../../assets/background/bg-blue.png');
  }
  .community-add-manage-item-box-red {
    background-image: url('../../../assets/background/bg-red.png');
  }
  .community-add-manage-item-box-gray {
    background-image: url('../../../assets/background/bg-gray.png');
  }
</style>