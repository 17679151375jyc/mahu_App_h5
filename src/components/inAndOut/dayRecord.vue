<template>
  <div class="day-record-wrapper">
    <p class="title" v-if="showTitle">
      <span>出入状况</span>
      <span>
        {{selectDate}}
        <!--<p type="button">{{selectDate}}</p>-->
      </span>
      <span
        @click="toRecord"
        @touchstart="touchStart"
        @touchend="touchEnd"
        :style="isTouch?'text-decoration: underline':''"
      >出入记录</span>
    </p>

    <div v-if="(inDaysOf.length > 0) || (inDaysOf.length === 0 && lastID!=='0')">
      <div v-for="(item,index) of inDaysOf" :key="index">
        <div class="date" v-if="showDate && item.itemType===2">
          <p>{{item.todayMonth}}月{{item.monthOfDay}}号 {{item.weekDesc}}</p>
        </div>
        <div
          class="dayRecord-item border-bottom-1px"
          @click="item.url ? lookPic(item.url) : ''"
          v-if="(showDate &&  item.itemType===1) || !showDate"
        >
          <div class="left">
            <div class="info-wrapper">
              <img v-if="item.openType===10"
                :src="(item.relation === '本人' || item.relation === '朋友' || item.relation === '家人') ? require('./icon_car.png') : require('./icon_other_car.png')"
              />
              <img v-else
                :src="(item.relation === '本人' || item.relation === '朋友' || item.relation === '家人') ? require('./icon_user.png') : require('./icon_other_user.png')"
              />
              <span class="name">{{item.recordName}}</span>
              <span class="limit">{{item.relation}}</span>
            </div>
            <div
              class="address" style="margin-bottom: 2vw"
            >门禁类型：{{item.openType===0?'人脸识别':item.openType===1?'刷二维码':item.openType===2?'按门铃':item.openType===3?'临时密码':item.openType===4?'刷卡':item.openType===10?'车牌识别':'其它'}}</div>
            <div
              class="address"
            >{{item.plotName}}{{item.buildingName}}{{item.positionName?'-':''}}{{item.positionName}}</div>
          </div>

          <div class="right" v-if="item.url">
            <div class="avatar">
              <img :src="getImageUrl(item.url)" />
            </div>
            <span style="margin-top: 2vw">点击预览</span>
          </div>
          <div class="middle">
            <div class="time">{{item.datetime}}</div>
            <div class="type">
              {{item.typeDesc==='拜访'?'进入':item.typeDesc==='离开'?'离开':item.typeDesc}}
            </div>
            <!--<div class="type">-->
              <!--{{(item.typeDesc==='拜访' && (item.openType===0 || item.openType===4))-->
              <!--?'进入':(item.typeDesc==='离开' && (item.openType===0 || item.openType===4))?'离开':item.typeDesc}}-->
            <!--</div>-->
          </div>
          <!-- <div class="right" :style="item.openType===2 ? 'justify-content: space-between' : ''">
            <div class="base-vertical-layout-space-between-item-end" style="height: 13vw">
              <div class="base-horizontal-layout-space-between-item-center">
                <div
                  v-if="item.url"
                  class="base-horizontal-layout-center-item-center"
                  @click="lookPic(item.url)"
                >
                  <img :src="require('./icon_screenshot.png')" class="base-icon-normal-style" />
                  <p class="right-right-p1" style="color: #3388EE;margin-right: 1vw;">预览图</p>
                </div>
                <p class="right-right-p1">{{item.datetime}}</p>
              </div>
              <p class="right-right-p2">
                {{(item.typeDesc==='拜访' && (item.openType===0 || item.openType===4))
                ?'回家':(item.typeDesc==='离开' && (item.openType===0 || item.openType===4))?'离家':item.typeDesc}}
              </p>
            </div>
          </div>-->
        </div>
        <!--<p v-if="isNotLoading" class="base-text-title-normal-gray" style="margin-top: 4vw;text-align: center">—————我是有底线的—————</p>-->
      </div>
    </div>
    <div v-else class="no-data">
      <div
        v-if="showTitle"
        class="base-vertical-layout-center-item-center"
        style="padding-top: 21.333333vw"
      >
        <img
          :src="require('@/assets/inAndOut/icon_record@2x.png')"
          style="width: 13.33vw;height:13.33vw"
        />
        <p class="no-data-text">今天大家都没有出门呢~</p>
      </div>
      <div v-else class="base-vertical-layout-center-item-center" style="padding-top: 13.333333vw">
        <img
          :src="require('@/assets/inAndOut/icon_record@2x.png')"
          style="width: 13.33vw;height:13.33vw"
        />
        <p class="no-data-text">暂无出入记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import buttonBorder from "@/components/button/button-border";

export default {
  name: "dayRecord",
  components: { buttonBorder },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    showDate: {
      type: Boolean,
      default: false
    },
    inDaysOf: {
      type: Array,
      default: () => []
    },
    isNotLoading: {
      type: Boolean,
      default: false
    },
    lastID: {
      type: String,
      default: ""
    },

    buttonBorderStyle: {},
    buttonBorderBlueStyle: {
      height: "6.67vw",
      padding: "0 3vw",
      boxSizing: "border-box",
      border: "1px solid #3388FF",
      borderRadius: "5.07vw"
    }
  },
  data() {
    return {
      selectDate: "",
      weekDay: "",

      isTouch: false
    };
  },
  created() {
    this.buttonBorderStyle = this.buttonBorderBlueStyle;

    this.init();
    console.log(this.lastID);
  },
  mounted() {},
  methods: {
    getImageUrl(url){
      return utils.getImageUrl(url[0],64,64);
    },
    touchStart() {
      this.isTouch = true;
    },
    touchEnd() {
      this.isTouch = false;
    },

    toRecord() {
      this.$router.push({
        path: "/inAndOut/inOutRecord"
      });
    },
    init() {
      //初始化星期显示（当天）
      this.weekDay = utils.toWeek(new Date().getTime());
      this.selectDate = `${new Date().getMonth() +
        1}月${new Date().getDate()}号 ${this.weekDay}`;
      // //当天日期 yymmdd=>时间戳
      // let startTime = `${utils.timetrans(
      //   new Date().getTime(),
      //   "yymmdd"
      // )} 00:00`;
      // let endTime = `${utils.timetrans(new Date().getTime(), "yymmdd")} 24:00`;
      // this.data.data.starttime = new Date(startTime).getTime();
      // this.data.data.endtime = new Date(endTime).getTime();
    },

    lookPic(imgs) {
      console.log(imgs);
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
    openDoor(tempVisitorNumber, openStatus, triggeringTime) {
      let self = this;
      if (openStatus === 0) {
        self
          .$post("entry", "/callOpenDoor", {
            tempVisitorNumber: tempVisitorNumber,
            triggeringTime: triggeringTime,
            openStatus: 2
          })
          .then(res => {
            console.log("开门", res);
          });
      } else if (openStatus === 1) {
        const toast = this.$createToast({
          type: "correct",
          txt: "已经开门了"
        });
        toast.show();
      } else if (openStatus === 2) {
        const toast = this.$createToast({
          type: "correct",
          txt: "开门中，请稍后..."
        });
        toast.show();
      } else if (openStatus === 3) {
        const toast = this.$createToast({
          type: "correct",
          txt: "已过期"
        });
        toast.show();
      } else {
        const toast = this.$createToast({
          type: "warn",
          txt: "状态出错，请刷新"
        });
        toast.show();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.day-record-wrapper {
  .title {
    padding: 3.33vw 5.33vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;

    span {
      width: 33.33%;
    }

    span:first-child {
      text-align: left;
      font-size: 5.33vw;
      color: rgba(77, 77, 77, 1);
      font-weight: bold;
    }

    span:last-child {
      text-align: right;
      color: #3388ff;
      /* color: rgba(77, 77, 77, 1); */
      /* text-decoration: underline; */
      /* font-size: 3.73vw; */
      font-size: 4.27vw;
    }

    span:nth-child(2) {
      text-align: center;
      color: rgba(77, 77, 77, 1);

      button {
        background: rgba(250, 250, 250, 1);
        color: rgba(77, 77, 77, 1);
        font-weight: 600;
        /* outline: none; */
        font-size: 3.2vw;
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 1.33vw 2.4vw;
        text-align: center;
        border-radius: 1.33vw;
      }
    }
  }

  .dayRecord-item {
    min-height: 20.667vw;
    padding: 2.933vw 5.333vw 1.867vw 5.333vw;
    background: #fff;
    display: flex;
    box-sizing: border-box;

    &::after {
      border-color: #ddd;
    }

    .left {
      flex: 1;
      display: flex;
      flex-flow: column;
      overflow hidden

      .info-wrapper {
        height: 5.867vw;
        display: flex;
        margin-bottom: 3.733vw;
        align-items: center;

        img {
          flex: 0 0 4.267vw;
          height: 4.267vw;
          width: 4.267vw;
          margin-right: 2.667vw;
        }

        .name {
          font-size: 4.267vw;
          color: #666666;
          font-weight: bold;
        }

        .limit {
          margin-left: 1.067vw;
          color: #999;
          font-size: 3.2vw;
        }
      }

      .address {
        height: 4.2666vw;
        line-height: 4.2666vw;
        font-size: 3.733vw;
        color: #898989;
        margin-left: 6.933vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space nowrap
      }
    }

    .middle {
      flex: 0 0 20vw;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      text-align: right;

      .time {
        font-size: 3.2vw;
        color: #666666;
        margin-top: 0.267vw;
        height: 5.867vw;
        line-height: 5.867vw;
      }

      .type {
        font-size: 3.733vw;
        color: #E6782B;
        margin-top: 2.667vw;
        height: 5.333vw;
        line-height: 5.333vw;
      }
    }

    .right {
      flex: 0 0 14.667vw;
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
      align-items: center;
      margin-left: 1.333vw;

      .avatar {
        flex: 0 0 8.533vw;
        height: 8.533vw;
        width: 8.533vw;
        background: #EEEEEE;
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-height: 100%;
          max-width: 100%;
        }
      }

      span {
        font-size: 3.2vw;
        color: #3388FF;
      }
    }
  }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;

    .no-data-text {
      color: rgba(161, 167, 179, 1);
      font-size: 3.2vw;
      margin-top: 2.67vw;
      font-weight: 500;
    }
  }

  .date {
    padding: 3.2vw 0;
    font-size: 3.73vw;
    background-color: #f7f8fa;
    color: #4d4d4d;
    margin-left: 5vw;
    font-weight: 600;
  }
}
</style>