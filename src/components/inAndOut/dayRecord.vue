<template>
  <div class="day-record-wrapper">
    <p class="title" v-if="showTitle">
      <span>出入日况</span>
      <span>{{selectDate}}
        <!--<p type="button">{{selectDate}}</p>-->
      </span>
      <span @click="toRecord"
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
        <div class="list" v-if="(showDate && item.itemType===1) || !showDate">
          <div class="left">
            <p>
              <span class="name">{{item.recordName}}</span>
              <span class="limit">{{item.relation}}</span>
            </p>
            <div class="base-horizontal-layout-center-item-center"
                 style="height: 6.67vw;width: fit-content;background-color: #EDEEF0;border-radius: 3.73vw;padding: 0 2.67vw;margin-top: 2.67vw">
              <img style="width: 3.20vw;height: 3.20vw;margin-right: 1.33vw" :src="require('@/assets/icon/icon_position.png')">
              <span style="color: #666666;font-size: 3.2vw"
              >{{item.plotName}}{{item.buildingName}}{{item.positionName?'-':''}}{{item.positionName}}</span>
            </div>
          </div>
          <div class="right-right" :style="item.openType===2 ? 'justify-content: space-between' : ''">
            <!--<div v-if="item.openType===2" class="base-horizontal-layout-space-between-item-center">-->
              <!--<div class="base-horizontal-layout-center-item-center" -->
                   <!--@click="lookPic(item.url)">-->
                <!--<img :src="require('./icon_screenshot.png')" style="width: 4.27vw;height: 4.27vw;margin-right: 1.077777vw">-->
                <!--<p class="base-text-details-normal-black-666">预览</p>-->
              <!--</div>-->
              <!--<div class="base-horizontal-layout-center-item-center" -->
                   <!--@click="openDoor(item.tempVisitorNumber,item.openStatus,item.triggeringTime)">-->
                <!--<img :src="require('./icon_open-door.png')" style="width: 4.27vw;height: 4.27vw;margin-right: 1.077777vw">-->
                <!--<p class="base-text-details-normal-black-666"-->
                <!--&gt;{{item.openStatus===0?'开门':item.openStatus===1?'已开门':item.openStatus===2?'开门中':item.openStatus===3?'已过期':''}}</p>-->
              <!--</div>-->
            <!--</div>-->
            <div class="base-vertical-layout-space-between-item-end" style="height: 13vw">
              <div class="base-horizontal-layout-space-between-item-center">
                <div v-if="item.url" class="base-horizontal-layout-center-item-center" @click="lookPic(item.url)">
                  <img :src="require('./icon_screenshot.png')" class="base-icon-normal-style">
                  <p class="right-right-p1" style="color: #3388EE;margin-right: 1vw;">预览图</p>
                </div>
                <p class="right-right-p1">{{item.datetime}}</p>
                <!--<p class="right-right-p2"-->
                <!--&gt;{{(item.typeDesc==='拜访' && (item.openType===0 || item.openType===4))-->
                  <!--?'回家':(item.typeDesc==='离开' && (item.openType===0 || item.openType===4))?'离家':item.typeDesc}}</p>-->
              </div>
              <p class="right-right-p2"
              >{{(item.typeDesc==='拜访' && (item.openType===0 || item.openType===4))
                ?'回家':(item.typeDesc==='离开' && (item.openType===0 || item.openType===4))?'离家':item.typeDesc}}</p>
            </div>
          </div>
        </div>
        <!--<p v-if="isNotLoading" class="base-text-title-normal-gray" style="margin-top: 4vw;text-align: center">—————我是有底线的—————</p>-->
      </div>
    </div>
    <div v-else class="no-data">
      <div v-if="showTitle" class="base-vertical-layout-center-item-center" style="padding-top: 21.333333vw">
        <img :src="require('@/assets/inAndOut/icon_record@2x.png')" style="width: 13.33vw;height:13.33vw">
        <p class="no-data-text">今天大家都没有出门呢~</p>
      </div>
      <div v-else class="base-vertical-layout-center-item-center" style="padding-top: 13.333333vw">
        <img :src="require('@/assets/inAndOut/icon_record@2x.png')" style="width: 13.33vw;height:13.33vw">
        <p class="no-data-text">暂无出入记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import buttonBorder from '@/components/button/button-border';

export default {
  name: "dayRecord",
  components: {buttonBorder},
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
      height: '6.67vw',
      padding: '0 3vw',
      boxSizing: 'border-box',
      border: '1px solid #3388FF',
      borderRadius: '5.07vw'
    },
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
  mounted() {
  },
  methods: {
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
      this.selectDate = `${new Date().getMonth()+1}月${new Date().getDate()}号 ${this.weekDay}`;
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
      this.$createImagePreview({
          imgs: imgs,
          initialIndex: this.initialIndex,
          loop: false,
          onChange: (i) => {
            this.initialIndex = i
          },
          onHide: () => {
            console.log("$createImagePreview",'hide')
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
      ).show()
    },
    openDoor(tempVisitorNumber, openStatus, triggeringTime) {
      let self = this;
      if (openStatus===0) {
        self.$post("entry","/callOpenDoor",{
          tempVisitorNumber: tempVisitorNumber,
          triggeringTime: triggeringTime,
          openStatus: 2,
        }).then((res)=>{
          console.log("开门",res);
        });
      } else if (openStatus===1){
        const toast = this.$createToast({
          type: "correct",
          txt: "已经开门了"
        });
        toast.show();
      } else if (openStatus===2){
        const toast = this.$createToast({
          type: "correct",
          txt: "开门中，请稍后..."
        });
        toast.show();
      } else if (openStatus===3){
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


<style lang="scss">
$color: #fff;
.day-record-wrapper {
  // border-bottom-width: 0.1rem;
  // border-bottom-color: gray;
  // border-bottom-type: solid;

  .title {
    padding: 3.33vw 5.33vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: $color;
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
      color: #3388FF;
      /*color: rgba(77, 77, 77, 1);*/
      /*text-decoration: underline;*/
      /*font-size: 3.73vw;*/
      font-size: 4.27vw;
    }
    span:nth-child(2) {
      text-align: center;
      color: rgba(77, 77, 77, 1);
      button {
        background: rgba(250, 250, 250, 1);
        color: rgba(77, 77, 77, 1);
        font-weight: 600;
        /*outline: none;*/
        font-size: 3.2vw;
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 1.33vw 2.4vw;
        text-align: center;
        border-radius: 1.33vw;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5.33vw 5.33vw;
    border-bottom: 1px solid #f0f0f0;
    margin-top: 1px;
    background: $color;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 70%;
      p:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      p:last-child {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 67%;
        margin-top: 0.3rem;
        padding: 0.1rem 0 0.05rem 0;
        line-height: 0.3rem;
        border-radius: 0.23rem;

        /*span {*/
          /*color: rgba(102, 102, 102, 1);*/
          /*padding: 0.2rem 0.12rem;*/
          /*font-size: 0.37rem;*/
          /*background: rgba(237, 238, 240, 1);*/
        /*}*/
      }
      .name {
        color: rgba(0, 0, 0, 1);
        font-size: 3.73vw;
        font-weight: bold;
      }
      .limit {
        border: 1px solid rgba(51, 136, 255, 1);
        padding: 0.5vw 1.33vw;
        border-radius: 2.13vw;
        color: rgba(51, 136, 255, 1);
        font-size: 2.67vw;
        margin-left: 2.67vw;
      }
    }
    .right {
      width: 33%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      p:first-child {
        color: rgba(102, 102, 102, 1);
        font-size: 3.73vw;
        font-weight: 300;
      }
      p:last-child {
        color: rgba(51, 136, 255, 1);
        font-size: 3.73vw;
        font-weight: 300;
      }
    }
  }
  .list:nth-child(n + 3) {
    margin-top: 0;
  }

  .right-right {
    width: 42%;
    height: 15vw;
    display: flex;
    flex-direction: column;
    /*justify-content: flex-end;*/
    align-items: flex-end;
  }
  .right-right-b1{
    height: 4.67vw;
    padding: 1px 2vw;
    box-sizing: border-box;
    border: 1px solid #3388FF;
    border-radius: 5.07vw;
    color: #3388FF;
  }
  .right-right-p1 {
    color: rgba(102, 102, 102, 1);
    font-size: 3.7333vw;
    font-weight: 300;
  }
  .right-right-p2 {
    color: #E6782B;
    font-size: 3.7333vw;
    font-weight: 300;
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