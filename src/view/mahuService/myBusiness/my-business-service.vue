<!--@Time  : 2019/09/26 18:43-->
<!--@Author: michael huang-->
<!--@File  : my-business-service.vue-->

<template>
  <div>
    <div style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <div class="base-horizontal-layout-space-between-item-center"
         style="height:13.0666vw;padding: 0 5.3333vw;background-color: white;box-sizing: border-box">
      <p style="font-size: 4.8vw;color: #666;font-weight: bold">巡更通知</p>
      <div class="base-horizontal-layout-center-item-center"
           style="width: 43.4666vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
           @click="chooseAreaPicker">
        <p class="base-text-details-large-black-666">{{chooseArea}}</p>
      </div>
      <div class="base-horizontal-layout-center-item-center title_pto"
           style="width: 22.4vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
           @click="chooseDatePicker">
        <p class="base-text-details-large-black-666">{{isChooseTime ? chooseTimeStr : '选择时间'}}</p>
        <img :src="require('@/assets/notification/icon_bottom.png')">
      </div>
    </div>

    <div class="scroll-wrapper-service-page">
      <cube-scroll v-if="taskLogs.length>0"
                   ref="myBusinessServiceScroll"
                   :data="taskLogs"
                   :options="myBusinessServiceScrollOptions">
        <div style="height: 1vw"></div>
        <div v-for="(item,index) in taskLogs" :key="index"
             class="base-horizontal-layout-space-between"
             style="padding: 4vw 2.6666vw 4vw 4vw;margin-top:1.6vw;background-color: white">
          <div class="base-horizontal-layout-general">
            <img :src="require('../icon-patrol.png')" style="width: 10.6666vw;height: 10.6666vw">
            <div class="base-vertical-layout-space-between" style="margin-left: 2.1333vw">
              <div class="base-horizontal-layout-general-item-center">
                <p class="base-text-title-normal-666" style="font-weight: bold">巡更消息</p>
                <p :class="['base-text-title-normal-666']" class="my-business-service-area-text">{{item.fsAreaName}}</p>
                <div v-if="item.photo" class="base-horizontal-layout-general-item-center"
                     style="margin-left: 1.6666vw" @click="lookPic(item.photo)">
                  <img :src="require('@/assets/icon/icon-cut-pic-colorful.png')"
                       class="base-icon-normal-style"
                       style="margin-right: 1.0666vw">
                  <!--<p class="base-text-details-large-black">查看摄图</p>-->
                </div>
              </div>
              <p class="base-text-details-large-black-666"><span>巡更人员：</span>{{item.fsUserName}}</p>
            </div>
          </div>
          <div class="base-vertical-layout-space-between-item-end">
            <p class="base-text-details-normal-gray">{{getTime(item.createTime)}}</p>
            <p class="base-text-details-large-black-666"><span>巡更次数：</span>{{1}}</p>
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
  import utils from '_libs/utils';
  import guangGaoIndexPage from '_c/blank/guang-gao-index-page';
  import messageEmpty from '_c/blank/message-empty';
  import Cell from "../../../components/cell";

  export default {
    name: "my-business-service",
    components: {Cell, guangGaoIndexPage,messageEmpty},
    data() {
      return {
        myBusinessServiceScrollOptions: {
          stopPropagation: true//阻止事件冒泡
        },
        taskLogs: [],
        areaList: [],
        chooseArea: '',
        chooseAreaNumber: '',
        chooseAreaIndex: '',
        chooseTimeStr: '',
        isChooseTime: false,
      }
    },
    created() {
      this.chooseTimeStr = utils.timetrans(new Date().getTime(), "yymmdd");
    },
    mounted() {
      this.getArea();
      this.getTaskLogs();
    },
    methods: {
      getArea() {
        let self = this;
        self.$post("hArea","/getArea",{
          type: utils.returnTypeBusiness(),
        }).then((res)=>{
          res.data.unshift({areaName:"全部",areaNumber:""});
          res.data.forEach((item)=>{
            item.text = item.areaName;
            item.value = item.areaNumber;
          });
          self.areaList = [...res.data];
          self.chooseArea = self.areaList[0].areaName;
        });
      },

      getTaskLogs(fsAreaNumber,startTime,endTime) {
        let self = this;
        self.$post("dutyRange","/getTaskLogs",{
          input: {
            areaType: utils.returnTypeBusiness(),
            fsAreaNumber: fsAreaNumber,
            startTime: startTime,
            endTime: endTime
          },
          page: 0,
          pageSize: 100,
        }).then((res)=>{
          self.taskLogs = [...res.data.list];
        });
      },
      getTime(time) {
        return utils.timetrans(time,"yymmddhhmm")
      },

      chooseAreaPicker() {//选择区域
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '选择区域',
            data: [this.areaList],
            selectedIndex: [this.chooseAreaIndex],
            onSelect: this.areaSelectHandle,
            onCancel: this.areaCancelHandle
          })
        }
        this.picker.show()
      },
      areaSelectHandle(selectedVal, selectedIndex, selectedText) {
        this.chooseArea = this.areaList[selectedIndex].areaName;
        this.chooseAreaNumber = this.areaList[selectedIndex].areaNumber;
        this.chooseAreaIndex = selectedIndex;
        this.getTaskLogs(this.chooseAreaNumber);
        this.isChooseTime = false;
        this.picker = undefined;
      },
      areaCancelHandle() {
        this.picker = undefined;
      },
      chooseDatePicker() {//选择时间
        let nowDate = new Date();
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '选择回放日期',
            min: new Date(nowDate.getFullYear(), nowDate.getMonth()-3, nowDate.getDate()),//后台提供最小的日期
            max: new Date(),
            value: new Date(this.chooseTimeStr),
            onSelect: this.timeSelectHandle,
            onCancel: this.timeCancelHandle
          })
        }
        this.datePicker.show()
      },
      timeSelectHandle(date, selectedVal, selectedText) {
        this.chooseTimeStr = utils.timetrans(date.getTime(), "yymmdd");
        let chooseTimeStrLast = utils.timetrans(date.getTime()+24*60*60*1000, "yymmdd");
        this.getTaskLogs(this.chooseAreaNumber,this.chooseTimeStr,chooseTimeStrLast);
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
            onChange: (i) => {
              this.initialIndex = i
            },
            onHide: () => {
              console.log("$createImagePreview",'hide')
            }
          }
        ).show()
      },
    }
  }
</script>

<style scoped>
  .my-business-service-area-text {
    max-width: 29.8666vw;
    height: 5.3333vw;
    line-height: 5.33vw;
    color: #E6782B;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 1.6666vw;
  }
  .title_pto img{
    float: right;
    width: 2vw;
    height: 1.2vw;
    margin: 3.2vw 0 3.2vw 1vw;
  }
</style>