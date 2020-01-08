<!--@Time  : 2019/10/01 13:11-->
<!--@Author: michael huang-->
<!--@File  : visitor-item-index.vue-->

<template>
  <div
    class="visitor-item-index-box"
    :class="{'base-vertical-layout-space-between':true,
             'base-background-img-blue-light':true}">
    <div
      class="base-horizontal-layout-space-between-item-center"
      style="margin: 4vw 5.3333vw 0 5.3333vw">
      <div class="base-horizontal-layout-center-item-center">
        <p v-if="visitorIndexInfo.openid" class="visitor-item-index-title"
        >{{visitorIndexInfo.visitorName ? visitorIndexInfo.visitorName  : '匿名'}}</p>
        <p v-else class="visitor-item-index-title">{{visitorIndexInfo.roleName}}</p>
        <img v-if="visitorIndexInfo.visitorSex"
             class="visitor-item-index-vistorSex-img"
             :src="visitorIndexInfo.visitorSex===1 ?
             require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')"/>
        <p v-if="visitorIndexInfo.visitorPhone" class="visitor-item-index-title" style="font-weight: normal">{{visitorIndexInfo.visitorPhone}}</p>
        <img
          v-if="!visitorIndexInfo.recordType===1"
          class="visitor-item-index-vistorSex-img"
          :src="visitorIndexInfo.vistorSex==='男' ?
             require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')"/>
        <p
          v-if="!visitorIndexInfo.recordType===1"
          class="base-text-details-large-black-666"
          style="color: white"
        >{{visitorIndexInfo.vistorPhone}}</p>
      </div>
      <!--<p v-if="!item.valid && item.status===1" class="base-text-details-normal-black-666">已过期</p>-->
      <!--<p v-if="!item.valid && item.status===0" class="base-text-details-normal-black-666">微信访客已过期</p>-->
      <div
        v-if="!visitorIndexInfo.openid"
        :class="['base-vertical-layout-center-item-center']"
        class="visitor-item-index-btn-border"
        @click="btnOnClick(0,visitorIndexInfo.tempVisitorNumber,visitorIndexInfo.triggeringTime)">
        <p class="base-text-details-normal-white">忽略</p>
      </div>
    </div>
    <div class="base-horizontal-layout-space-between" style="padding: 4.2333vw 5.3333vw 5.3333vw 5.3333vw">
      <!--<div class="base-vertical-layout-space-between"-->
      <!--:class="{'base-text-details-large-black-666':!item.valid,-->
      <!--'base-text-details-large-white':item.valid}" style="height: 18vw">-->
      <!--<p>{{item.plotName}} 同行{{item.vistorNumbers}}人</p>-->
      <!--&lt;!&ndash;<p>车牌号：</p>&ndash;&gt;-->
      <!--<p>{{item.startTime}}</p>-->
    <!--</div>-->

      <div
        v-if="visitorIndexInfo.openid"
        class="base-vertical-layout-space-between"
        :class="{'base-text-details-large-white':true}"
        style="height: 21vw">
        <div class="base-horizontal-layout-center visitor-item-index-plot-wx"
        >{{`${visitorIndexInfo.plotName}-${visitorIndexInfo.buildingName}-${visitorIndexInfo.doorName}`}}</div>
        <p>{{visitorIndexInfo.carNumber}}</p>
        <p class="base-horizontal-layout-general-item-center"
        >{{getTime(visitorIndexInfo.startTime)}} <span style="font-size: 3.2vw;margin-left: 1.8666vw;">来源：微信</span></p>
      </div>
      <div
        v-else
        class="base-vertical-layout-space-between"
        :class="{'base-text-details-large-white':true}"
        style="height: 21vw">
        <div class="visitor-item-index-plot-doorbell"
        >{{visitorIndexInfo.plotName}}{{visitorIndexInfo.buildingName}}</div>
        <p class="base-text-details-normal-white" style="color: rgba(255,255,255,0.7);line-height: 3.8vw">
          温馨提醒：开门前可先查看门禁
          <br/>摄图，辨识访客是否认识。
        </p>
        <p>{{getTime(visitorIndexInfo.triggeringTime)}}</p>
      </div>
      <div v-if="visitorIndexInfo.openid" class="base-vertical-layout-space-between">
        <div
          class="visitor-item-index-btn-color"
          :class="['base-horizontal-layout-center-item-center']"
          @click="wxVisitorOnclick('拒绝',visitorIndexInfo.visitorNumber)">
          <p class="base-text-details-large-blue">拒绝</p>
        </div>
        <div
          class="visitor-item-index-btn-color"
          :class="['base-horizontal-layout-center-item-center']"
          style="margin-top: 2.6666vw"
          @click="wxVisitorOnclick('同意',visitorIndexInfo.visitorNumber)">
          <p class="base-text-details-large-blue">同意</p>
        </div>
      </div>
      <div v-else class="base-vertical-layout-space-between">
        <div
          class="visitor-item-index-btn-color"
          :class="['base-horizontal-layout-center-item-center']"
          @click="btnOnClick(1,visitorIndexInfo.tempVisitorNumber,visitorIndexInfo.triggeringTime)"
        >
          <img
            :src="require('@/assets/icon/icon-cut-pic-colorful.png')"
            class="base-icon-normal-style"
            style="margin-right: 1.0666vw"
          />
          <p class="base-text-details-large-blue">查看摄图</p>
        </div>
        <div
          class="visitor-item-index-btn-color"
          :class="['base-horizontal-layout-center-item-center']"
          style="margin-top: 2.6666vw"
          @click="btnOnClick(2,visitorIndexInfo.tempVisitorNumber,visitorIndexInfo.triggeringTime)">
          <p class="base-text-details-large-blue but_text_line_height">
            {{visitorIndexInfo.openStatus===0?'开门':
            visitorIndexInfo.openStatus===1?'已开门':
            visitorIndexInfo.openStatus===2?'开门中':''}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";

export default {
  name: "visitor-item-index",
  props: {
    visitorIndexInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getTime(time) {
      return utils.timetrans(time, "yymmddhhmm");
    },

    btnOnClick(index, recordNumber, recordTime) {
      switch (index) {
        case 0:
          this.$emit("ignoreOnClick", {
            openStatus: this.visitorIndexInfo.openStatus,
            recordNumber: recordNumber,
            recordTime: recordTime
          });
          break;
        case 1:
          this.lookPic();
          break;
        case 2:
          this.$emit("openDoorOnClick", {
            openStatus: this.visitorIndexInfo.openStatus,
            recordNumber: recordNumber,
            recordTime: recordTime
          });
          break;
        default:
          break;
      }
    },
    lookPic() {
      let imgs = [];
      imgs = this.visitorIndexInfo.urlList;
      this.$createImagePreview(
        {
          imgs: imgs,
          initialIndex: this.initialIndex,
          loop: false,
          onChange: i => {
            this.initialIndex = i;
          },
          onHide: () => {
            console.log("$createImagePreview", "hide");
          }
        }
        // , (h) => {
        //   return h('div', {
        //     class: {
        //       'image-preview-custom-header': true
        //     },
        //     slot: 'header'
        //   }, this.initialIndex + 1)
        // }
      ).show();
    },

    wxVisitorOnclick(type, vistorID) {
      console.log("111", vistorID);
      this.$emit("wxVisitorOnclick", { type: type, vistorID: vistorID });
    }
  }
};
</script>

<style scoped>
  .visitor-item-index-box {
    height: 37.3333vw;
    margin: 0 4vw 2.9vw 4vw;
    border-radius: 1.6vw;
    background-size: 100% 100%;
    background-color: #fff;
  }
  .visitor-item-index-title {
    font-size: 4.8vw;
    font-weight: bold;
    color: white;
  }
  .visitor-item-index-vistorSex-img {
    width: 5.31vw;
    height: 5.41vw;
    margin-left: 1.8666vw;
  }
  .visitor-item-index-btn-border {
    width: 17.0666vw;
    height: 5.3333vw;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 1.0666vw;
  }
  .visitor-item-index-btn-color {
    width: 26.1333vw;
    height: 8.5333vw;
    border-radius: 1.0666vw;
    /*background: linear-gradient(to bottom, #30c9ff, #38f);*/
    background-color: white;
  }
  .visitor-item-index-btn-gray {
  }

  .visitor-item-index-plot-wx {
    width: 50vw;
    height: 10vw;
    line-height: 5vw;
    font-size: 4.2666vw;
    word-break: break-all;
    white-space: pre-wrap;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .visitor-item-index-plot-doorbell {
    width: 50vw;
    height: 5vw;
    line-height: 5vw;
    font-size: 4.2666vw;
    word-break: break-all;
    white-space: pre-wrap;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }
</style>