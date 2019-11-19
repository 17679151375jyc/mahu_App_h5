<!--@Time  : 2019/09/30 9:32-->
<!--@Author: michael huang-->
<!--@File  : my-gate-service.vue-->

<template>
  <div>
    <div style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <!-- <div class="base-horizontal-layout-space-between-item-center"
         style="height: 18.6666vw;background-color: white;padding: 0 8.2666vw">
      <div class="base-vertical-layout-center-item-center"
           v-for="(item,index) in menuList" :key="index"
           @click="toPath(item.value)">
        <img :src="item.icon" class="base-icon-large-style">
        <p class="base-text-details-normal-black-666" style="margin-top: 1.0666vw">{{item.value}}</p>
      </div>
    </div>-->
    <div class="menu-item">
      <div
        class="item"
        @touchstart="addActiveCls"
        @touchend="removeActiveCls"
        v-for="(item,index) in menuList"
        :key="index"
        @click="toPath(item.value)"
      >
        <img :src="item.icon" />
        <span>{{item.value}}</span>
      </div>
    </div>
    <div
      class="base-horizontal-layout-space-between-item-center"
      style="height:13.0666vw;padding: 0 5.3333vw;background-color: white;box-sizing: border-box"
    >
      <p style="font-size: 4.8vw;color: #666;font-weight: bold">巡更通知</p>
      <div
        class="base-horizontal-layout-center-item-center"
        style="width: 22.4vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
        @click="getTaskLogs('')"
      >
        <p class="base-text-details-large-black-666">显示全部</p>
      </div>
      <div
        class="base-horizontal-layout-center-item-center title_pto"
        style="width: 22.4vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
        @click="chooseDatePicker"
      >
        <p class="base-text-details-large-black-666">{{isChooseTime ? chooseTimeStr : '选择时间'}}</p>
        <img :src="require('@/assets/notification/icon_bottom.png')" />
      </div>
    </div>

    <div class="scroll-wrapper-gate-service-page">
      <cube-scroll
        v-if="taskLogs.length>0"
        ref="myGateServiceScroll"
        :data="taskLogs"
        :options="myGateServiceScrollOptions"
        :fade="true"
      >
        <div style="height: 1vw"></div>
        <div
          v-for="(item,index) in taskLogs"
          :key="index"
          class="base-horizontal-layout-space-between"
          style="padding: 4vw 2.6666vw 4vw 4vw;margin-top:1.6vw;background-color: white"
        >
          <div class="base-horizontal-layout-general">
            <img :src="require('../icon-patrol.png')" style="width: 10.6666vw;height: 10.6666vw" />
            <div class="base-vertical-layout-space-between" style="margin-left: 2.1333vw">
              <div class="base-horizontal-layout-general-item-center">
                <p class="base-text-title-normal-666" style="font-weight: bold">巡更消息</p>
                <p
                  :class="['base-text-title-normal-666']"
                  class="my-gate-service-area-text"
                >{{item.fsAreaName}}</p>
                <div
                  v-if="item.photo"
                  class="base-horizontal-layout-general-item-center"
                  style="margin-left: 1.6666vw"
                  @click="lookPic(item.photo)"
                >
                  <img
                    :src="require('@/assets/icon/icon-cut-pic-colorful.png')"
                    class="base-icon-normal-style"
                    style="margin-right: 1.0666vw"
                  />
                </div>
              </div>
              <p class="base-text-details-large-black-666">
                <span>巡更人员：</span>
                {{item.fsUserName}}
              </p>
            </div>
          </div>
          <div class="base-vertical-layout-space-between-item-end">
            <p class="base-text-details-normal-gray">{{getTime(item.createTime)}}</p>
            <p class="base-text-details-large-black-666">
              <span>巡更次数：</span>
              {{1}}
            </p>
          </div>
        </div>
      </cube-scroll>
      <div v-else>
        <message-empty></message-empty>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import guangGaoIndexPage from "_c/blank/guang-gao-index-page";
import messageEmpty from "_c/blank/message-empty";
import { mapState } from "vuex";
import { addClass, removeClass } from "_libs/dom";
export default {
  name: "my-gate-service",
  components: { guangGaoIndexPage, messageEmpty },
  data() {
    return {
      menuList: [],

      myGateServiceScrollOptions: {
        stopPropagation: true //阻止事件冒泡
      },
      taskLogs: [],
      chooseTimeStr: "",
      isChooseTime: false
    };
  },
  computed: {
    ...mapState({
      mAreaTypesList: state => state.user.areaTypesList,
      mUserInfo: state => state.user.userInfo
    })
  },
  created() {
    this.chooseTimeStr = utils.timetrans(new Date().getTime(), "yymmdd");

    let menuList1 = [
      {
        value: "社区审核",
        icon: require("./icon-community.png")
      },
      {
        value: "车辆审核",
        icon: require("./icon-car.png")
      },
      {
        value: "业主反馈",
        icon: require("./icon-feedback.png")
      },
      {
        value: "通知发布",
        icon: require("./icon-notification.png")
      }
    ];
    let menuList2 = [
      {
        value: "社区审核",
        icon: require("./icon-community.png")
      },
      {
        value: "业主反馈",
        icon: require("./icon-feedback.png")
      },
      {
        value: "通知发布",
        icon: require("./icon-notification.png")
      }
    ];
    if (this.mUserInfo.infos.propertyManageParkId) {
      this.menuList = [...menuList1];
    } else {
      this.menuList = [...menuList2];
    }
  },
  mounted() {
    this.getTaskLogs();
  },
  methods: {
    addActiveCls(e) {
      addClass(e.currentTarget, "item_active");
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, "item_active");
    },
    toPath(value) {
      let isTypeGate = false;
      this.mAreaTypesList.forEach(item => {
        if (item === utils.returnTypeGate()) {
          isTypeGate = true;
        }
      });

      if (isTypeGate) {
        switch (value) {
          case "社区审核":
            this.$router.push({
              path: "/service-index/community-apply-list",
              query: {}
            });
            break;
          case "车辆审核":
            this.$router.push({
              path: "/service-index/car-apply-list",
              query: {}
            });
            break;
          case "业主反馈":
            this.$router.push({
              path: "/service-index/feedback-apply-list",
              query: {}
            });
            break;
          case "通知发布":
            this.$router.push({
              path: "/service-index/notification-list",
              query: {}
            });
            break;
          default:
            break;
        }
      } else {
        const toast = this.$createToast({
          type: "warn",
          txt: "您暂没有备城门的权限，请联系业务人员开通吧~"
        });
        toast.show();
      }
    },

    getTaskLogs(fsAreaNumber, startTime, endTime) {
      if (fsAreaNumber === "") {
        this.isChooseTime = false;
      }
      let self = this;
      self
        .$post("dutyRange", "/getTaskLogs", {
          input: {
            areaType: utils.returnTypeGate(),
            fsAreaNumber: fsAreaNumber,
            startTime: startTime,
            endTime: endTime
          },
          page: 0,
          pageSize: 100
        })
        .then(res => {
          self.taskLogs = [...res.data.list];
        });
    },
    getTime(time) {
      return utils.timetrans(time, "yymmddhhmm");
    },

    chooseDatePicker() {
      //选择时间
      let nowDate = new Date();
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "选择回放日期",
          min: new Date(
            nowDate.getFullYear(),
            nowDate.getMonth() - 3,
            nowDate.getDate()
          ), //后台提供最小的日期
          max: new Date(),
          value: new Date(this.chooseTimeStr),
          onSelect: this.timeSelectHandle,
          onCancel: this.timeCancelHandle
        });
      }
      this.datePicker.show();
    },
    timeSelectHandle(date, selectedVal, selectedText) {
      this.chooseTimeStr = utils.timetrans(date.getTime(), "yymmdd");
      let chooseTimeStrLast = utils.timetrans(
        date.getTime() + 24 * 60 * 60 * 1000,
        "yymmdd"
      );
      this.getTaskLogs(
        this.chooseAreaNumber,
        this.chooseTimeStr,
        chooseTimeStrLast
      );
      this.isChooseTime = true;
      this.datePicker = undefined;
    },
    timeCancelHandle() {
      this.datePicker = undefined;
    },

    lookPic(imgsStr) {
      let imgs = [];
      imgs = JSON.parse(imgsStr);
      this.$createImagePreview({
        imgs: imgs,
        initialIndex: this.initialIndex,
        loop: false,
        onChange: i => {
          this.initialIndex = i;
        },
        onHide: () => {
          console.log("$createImagePreview", "hide");
        }
      }).show();
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-gate-service-area-text {
  max-width: 29.8666vw;
  height: 5.3333vw;
  line-height: 5.33vw;
  color: #E6782B;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 1.6666vw;
}

.title_pto img {
  float: right;
  width: 2vw;
  height: 1.2vw;
  margin: 3.2vw 0 3.2vw 1vw;
}

.menu-item {
  height: 18.667vw;
  display: flex;
  background: #fff;
  justify-content: space-around;

  .item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 0 4vw;

    img {
      width: 5.333vw;
      height: 5.333vw;
      margin-bottom: 1.6vw;
    }

    span {
      font-size: 3.2vw;
      color: #666666;
      line-height: 3.733vw;
    }

    &.item_active {
      background: #f4f4f4;
    }
  }
}
</style>