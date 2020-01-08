<template>
  <div class="alert-msg-box"
       :class="{'base-background-img-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
       'base-background-img-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
       'base-background-img-green':messageInfo.messageType==='维保',
       'base-vertical-layout-space-between-item-center':true}">
       <!--@click="toWorkDetails(messageInfo.messageType)"-->
       <!--@touchstart="toWorkDetailsTouch"-->
       <!--@touchend="toWorkDetailsTouchEnd(messageInfo.messageType)">-->

    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 100%"
         @click="toWorkDetails(messageInfo.messageType)"
         @touchstart="toWorkDetailsTouch"
         @touchend="toWorkDetailsTouchEnd">
      <div class="base-horizontal-layout-center-item-center">
        <div class="base-horizontal-layout-general-item-center">
          <img :src="titleIcon" class="base-icon-large-style" style="margin-right: 1.33vw">
          <p class="base-text-title-normal-white base-text-overflow"
             style="max-width:32vw;margin: 0.2vw 1vw 0 0;line-height: 4.5vw">{{messageInfo.name}}</p>
          <label-msg :labelBoxStyle="stateBoxStyle"
                     :labelTextStyle="stateTextStyle"
                     :labelText="stateStr">
          </label-msg>
        </div>
      </div>
      <div class="base-horizontal-layout-center-item-center">
        <p class="base-text-details-normal-white">{{timeStr}}</p>
      </div>
    </div>

    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 100%"
         @click="toWorkDetails(messageInfo.messageType)"
         @touchstart="toWorkDetailsTouch"
         @touchend="toWorkDetailsTouchEnd">
      <p class="base-text-title-normal-white"
      >{{messageInfo.plotName}}{{messageInfo.buildingName}}{{messageInfo.doorName}}</br>{{(messageInfo.defenceAreaName===null
        || messageInfo.defenceAreaName===undefined || messageInfo.defenceAreaName==="")?
        (messageInfo.messageType==='维保'?'主机':'全屋'):messageInfo.defenceAreaName}}</p>
      <p v-show="messageInfo.messageType === '报警'"
         class="base-text-details-normal-white">{{rankTypeStr}}级别：{{messageInfo.type}}</p><!--<span style="text-decoration: underline"></span>-->
    </div>

    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 100%;height: 10vw">
      <div class="base-horizontal-layout-center-item-center">
        <div class="base-horizontal-layout-center-item-center"
             @click="showMsgCollectList"
             @touchstart="showMsgCollectListTouch"
             @touchend="showMsgCollectListTouchEnd(messageInfo.messageType,messageInfo.number,
               messageInfo.plotName+messageInfo.buildingName+messageInfo.doorName)">
          <img :src="require('@/components/myHome/message/icon_alarm-msg-msg.png')"
               class="base-icon-normal-style"
               style="margin-right: 0.8vw">
          <p class="base-text-details-large-white">{{msgNumStr}}</p>
        </div>
        <!--<p v-if="messageInfo.photoCount>0" class="base-text-details-large-white" style="margin: 0 1.2vw">|</p>-->
        <!--<div v-if="messageInfo.photoCount>0"-->
             <!--class="base-horizontal-layout-center-item-center"-->
             <!--@click="handleImgsClick"-->
             <!--@touchstart="showMsgCollectListTouch"-->
             <!--@touchend="handleImgsTouchEnd">-->
          <!--<img :src="require('@/components/myHome/message/icon_screenshot.png')"-->
               <!--class="base-icon-normal-style"-->
               <!--style="margin-right: 0.8vw">-->
          <!--<p class="base-text-details-large-white">截图</p>-->
        <!--</div>-->
      </div>
      <div>
        <div v-if="beingMsgText===''"
             class="base-horizontal-layout-center-item-center">
          <!--<button-border v-show="messageInfo.messageType==='报警' &&-->
            <!--(messageInfo.status==='未处理' || messageInfo.status==='请求出警' ||-->
            <!--messageInfo.status==='已接警' || messageInfo.status==='正在出警')"-->
            <!--:buttonBorderTextClass="{'base-text-details-normal-white':true} "-->
            <!--text="查看警情"-->
            <!--@buttonOnClick="toAlertVideo(messageInfo.id,messageInfo.yingShiAccessToken)">-->
          <!--</button-border>-->
          <!--<button-border style="margin-left: 2vw"-->
            <!--v-show="button1Text!==''"-->
            <!--:buttonBorderTextClass="{'base-text-details-normal-white':true} "-->
            <!--:text="button1Text"-->
            <!--@buttonOnClick="alertOnClick(1)">-->
          <!--</button-border>-->
          <!--<button-border style="margin-left: 2vw"-->
            <!--:buttonBorderTextClass="{'base-text-details-normal-white':true} "-->
            <!--:text="button2Text"-->
            <!--@buttonOnClick="alertOnClick(2)">-->
          <!--</button-border>-->
          <div v-show="messageInfo.messageType==='报警' &&
                         (messageInfo.status==='未处理' || messageInfo.status==='请求出警' ||
                         messageInfo.status==='已接警' || messageInfo.status==='正在出警')"
               class="base-horizontal-layout-center-item-center"
               style="width: 21.3333vw;height: 8.5333vw;margin-left: 1.6vw;background-color: white;border-radius: 1.0666vw"
               @click="toAlertVideo"
               @touchstart="toAlertVideoTouch"
               @touchend="toAlertVideoTouchEnd">
            <p :class="{'alert-msg-btn-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
                          'alert-msg-btn-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
                          'alert-msg-btn-green':messageInfo.messageType==='维保'}">查看警情</p>
          </div>
          <div v-show="button1Text!==''"
               class="base-horizontal-layout-center-item-center"
               style="width: 21.3333vw;height: 8.5333vw;margin-left: 1.6vw;background-color: white;border-radius: 1.0666vw"
               @click="alertOnClick"
               @touchstart="alertOnClickTouch"
               @touchend="alertOnClickTouchEnd(1)">
            <a v-if="messageInfo.status==='已接警' || messageInfo.status==='正在出警' || messageInfo.status==='已接单'"
               :href="`tel:${messageInfo.securePhone}`"
               :class="{'alert-msg-btn-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
                          'alert-msg-btn-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
                          'alert-msg-btn-green':messageInfo.messageType==='维保'}"
            >联系{{messageInfo.messageType==='报警'?'安保':messageInfo.messageType==='维保'?'维保':''}}</a>
            <p v-else :class="{'alert-msg-btn-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
                          'alert-msg-btn-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
                          'alert-msg-btn-green':messageInfo.messageType==='维保'}">{{button1Text}}</p>
          </div>
          <div v-if="button2Text==='修改预约时间'" class="base-horizontal-layout-center-item-center"
               style="width: 26.3333vw;height: 8.5333vw;margin-left: 1.6vw;background-color: white;border-radius: 1.0666vw"
               @click="alertOnClick"
               @touchstart="alertOnClickTouch"
               @touchend="alertOnClickTouchEnd(2)">
            <p :class="{'alert-msg-btn-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
                          'alert-msg-btn-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
                          'alert-msg-btn-green':messageInfo.messageType==='维保'}">{{button2Text}}</p>
          </div>
          <div v-else class="base-horizontal-layout-center-item-center"
               style="width: 21.3333vw;height: 8.5333vw;margin-left: 1.6vw;background-color: white;border-radius: 1.0666vw"
               @click="alertOnClick"
               @touchstart="alertOnClickTouch"
               @touchend="alertOnClickTouchEnd(2)">
            <p :class="{'alert-msg-btn-red':(messageInfo.messageType==='报警' && messageInfo.type==='紧急'),
                          'alert-msg-btn-yellow':(messageInfo.messageType==='报警' && messageInfo.type==='一般'),
                          'alert-msg-btn-green':messageInfo.messageType==='维保'}">{{button2Text}}</p>
          </div>
        </div>
        <p v-else class="base-text-details-large-white but_text_line_height" style="text-align: right"
           v-html="beingMsgText"
           @click="toWorkDetails(messageInfo.messageType)">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  // import buttonBorder from '@/components/button/button-border';
  // import buttonBorderCall from '@/components/button/button-border-call';
  import labelMsg from '@/components/label/label-msg';

  export default {
    name: "alert-msg",
    components: {
      // buttonBorder,
      // buttonBorderCall,
      labelMsg
    },
    props:
      {
        index: {
          type: Number,
          default: 0
        },
        messageInfo: {
          type: Object,
          default: () => {}
        },
        buttonText: {
          type: String,
          default: ""
        }
      },
    data() {
      return {
        titleIcon: '',
        stateBoxStyle: {},
        stateStr: '',
        stateTextStyle: {},
        msgNumStr: '',
        timeStr: '',
        rankTypeStr: '',
        button1Text: '',
        button2Text: '',
        beingMsgText: '',
        isMsgCollectListPopupShow: false,
        msgCollectList: [],//消息汇总列表
        remainingTime: 0,
        remainingTimeInterval: undefined,

        isCall: false,
        initialIndex: 0,//截图打开张序号

        // 查看警情
        messageCameraList: [],
        messageCameraName: '',
        messageCameraAccessToken: '',
        messageCameraDeviceNumber: '',
        messageCameraIndex: 0,
        messageCameraStartTime: 0,
        messageCameraEndTime: 0
      }
    },
    created() {
      this.stateBoxStyle = {backgroundColor: '#FFF'};
      this.getMessageInfo();
      this.getRemainingTimeInfo();
    },
    watch: {
      messageInfo() {
        this.getMessageInfo();
        clearInterval(this.remainingTimeInterval);
        this.getRemainingTimeInfo();
      },
      remainingTime() {
        let self = this;
        if(self.remainingTime<=0) {
          self.flowTypeStrSome("请求出警",{},self.messageInfo.requestTime,"请求出警","","","即将出警");
          // setTimeout(() => {
            self.getMessageInfo();
          // }, 10000);
        } else {
          self.statusStrSome(self.messageInfo.requestTime,"请求出警","","",
            (self.messageInfo.remainingTime>0) ? ("等待安保接警<br>" +
              utils.secondTrans(self.remainingTime) + "后将由系统分配出警") : ("即将出警"));
        }
      }
    },
    methods: {
      getRemainingTimeInfo() {
        let self = this;
        if (self.messageInfo.messageType==="报警" && self.messageInfo.status==="请求出警") {
          self.remainingTime = self.messageInfo.remainingTime;
          this.remainingTimeInterval = setInterval(function() {//1秒钟做一次减法
            if (self.remainingTime<=0) {
              this.remainingTimeInterval.clearInterval();
            } else {
              self.remainingTime--;
            }
          },1000);
          self.statusStrSome(self.messageInfo.requestTime,"请求出警","","",
            (self.messageInfo.remainingTime>0) ? ("等待安保接警" +
            utils.secondTrans(self.remainingTime) + "后将由系统分配出警") : ("即将出警"));
        }
      },
      getMessageInfo() {
        this.msgNumStr = this.messageInfo.messageCount ;
        if (this.messageInfo.messageType === "报警") {
          this.messageTypeStrSome(require('./icon_alarm-msg-alert.png'),"报警",
            this.messageInfo.type==='一般'?{fontSize: '3.2vw',color: '#E6782B'}:
              this.messageInfo.type==='紧急'?{fontSize: '3.2vw',color: '#FC4B45'}:{});
          switch (this.messageInfo.status) {
            case "未处理":
              this.statusStrSome(this.messageInfo.createTime,"未处理","立即出警","误报","");
              break;
            case "请求出警":
              // this.remainingTime = this.messageInfo.remainingTime;
              // this.statusStrSome(this.messageInfo.requestTime,"请求出警","","","等待安保接警，" +
              //   this.countDown(this.remainingTime,1) + "后将由系统分配出警");
              break;
            case "已接警":
              this.statusStrSome(this.messageInfo.acceptTime,"已接警","联系安保","安保位置","");
              this.isCall = true;
              break;
            case "正在出警":
              this.statusStrSome(this.messageInfo.dealTime,"已出警","联系安保","安保位置","");
              this.isCall = true;
              break;
            case "出警完成":
              this.statusStrSome(this.messageInfo.completeTime,"完成","评价","关闭","");
              break;
            default:
              break;
          }
        } else if (this.messageInfo.messageType === "维保") {
          this.messageTypeStrSome(require('./icon_alarm-msg-fault.png'),"维保",{fontSize: '3.2vw',color: '#3388FF'});//#24B3B3
          switch (this.messageInfo.status) {
            case "未处理":
              this.statusStrSome(this.messageInfo.createTime,"未处理","申报维修","忽略","");
              break;
            case "申报中":
              this.statusStrSome(this.messageInfo.requestTime,"请求维保","","","等待维保接单");//todo ，" + this.messageInfo.beingTime + "后将由系统分配
              break;
            case "已接单":
              this.statusStrSome(this.messageInfo.acceptTime,"已接单","联系维保","修改预约时间","");//修改
              this.isCall = true;
              break;
            case "正在处理":
              this.statusStrSome(this.messageInfo.dealTime,"正在处理","","联系维保","");//修改
              this.isCall = true;
              break;
            case "已完成":
              this.statusStrSome(this.messageInfo.completeTime,"完成","评价","关闭","");
              break;
            default:
              break;
          }
        } else {
          return;
        }
      },

      messageTypeStrSome(titleIcon,rankTypeStr,stateTextStyle) {
        this.titleIcon = titleIcon;
        this.rankTypeStr = rankTypeStr;
        this.stateTextStyle = stateTextStyle;
      },
      statusStrSome(time,stateStr,button1Text,button2Text,beingMsgText) {
        this.timeStr = utils.timetrans(time, "");
        this.stateStr = stateStr;
        this.button1Text = button1Text;
        this.button2Text = button2Text;
        this.beingMsgText = beingMsgText;
      },

      alertOnClick() {
        console.log("alertOnClick");
      },
      alertOnClickTouch() {
        console.log("alertOnClickTouch");
      },
      alertOnClickTouchEnd(num) {
        utils.stopBubbling(event);
        console.log("alertOnClickTouchEnd");
        let self = this;
        if (num === 1) {
          if (self.messageInfo.messageType === "报警") {
            switch (self.messageInfo.status) {
              case "未处理":
                self.$emit('alertOnClick', {number: self.messageInfo.number, name: self.messageInfo.name});
                break;
              case "已接警":
                // self.$emit('callAlertPersonnelOnClick', {phone: self.messageInfo.securePhone,messageType: self.messageInfo.messageType});
                break;
              case "正在出警":
                // self.$emit('callAlertPersonnelOnClick', {phone: self.messageInfo.securePhone,messageType: self.messageInfo.messageType});
                break;
              case "出警完成":
                self.toWorkDetails("报警");
                break;
              default:
                break;
            }
          } else if (self.messageInfo.messageType === "维保") {
            switch (self.messageInfo.status) {
              case "未处理":
                self.$emit('maintainOnClick', {number: self.messageInfo.number, name: self.messageInfo.name,
                  content: self.messageInfo.content, orderTime: 0});
                break;
              case "已接单":
                // self.$emit('callAlertPersonnelOnClick', {phone: self.messageInfo.securePhone,messageType: self.messageInfo.messageType});
                break;
              case "正在处理":

                break;
              case "已完成":
                this.toWorkDetails("维保");
                break;
              default:
                break;
            }
          } else {
            return;
          }
        } else if (num === 2) {
          if (self.messageInfo.messageType === "报警") {
            switch (self.messageInfo.status) {
              case "未处理":
                self.$emit('misAlertOnClick', {number: this.messageInfo.number});
                break;
              case "已接警":
                this.toWorkDetails("报警");
                break;
              case "正在出警":
                this.toWorkDetails("报警");
                break;
              case "出警完成":
                self.$emit('closeMsgOnClick', {index : this.index, number: this.messageInfo.number, messageType: "报警"});
                break;
              default:
                break;
            }
          } else if (self.messageInfo.messageType === "维保") {
            switch (self.messageInfo.status) {
              case "未处理":
                self.$emit('misMaintainOnClick', {number: this.messageInfo.number});
                break;
              case "已接单":
                self.$emit('maintainOnClick', {number: self.messageInfo.number, name: self.messageInfo.name,
                  content: self.messageInfo.content, orderTime: self.messageInfo.orderTime});
                break;
              case "正在处理":
                self.$emit('callAlertPersonnelOnClick', {phone: self.messageInfo.securePhone,messageType: self.messageInfo.messageType});
                break;
              case "已完成":
                self.$emit('closeMsgOnClick', {index : this.index, number: this.messageInfo.number, messageType: "维保"});
                break;
              default:
                break;
            }
          } else {
            return;
          }
        } else {
          return;
        }
      },

      toWorkDetails(messageType) {
        console.log("toWorkDetailsOnClick");
        if(this.messageInfo.status==="未处理") {
          return;
        } else {
          utils.localStorage("myWordInfoNum", this.messageInfo.number);
          this.$router.push({ path: "/ma-hu-index/work-details", query: {messageType: messageType}});
        }
      },
      toWorkDetailsTouch() {
        console.log("toWorkDetailsTouch");
      },
      toWorkDetailsTouchEnd() {
        console.log("toWorkDetailsTouchEnd");
        // if(this.messageInfo.status==="未处理") {
        //   return;
        // } else {
        //   utils.localStorage("myWordInfoNum", this.messageInfo.number);
        //   this.$router.push({ path: "/ma-hu-index/work-details", query: {messageType: messageType}});
        // }
      },

      showMsgCollectList() {
        console.log("showMsgCollectListOnClick");
      },
      showMsgCollectListTouch() {
        console.log("showMsgCollectListTouch");
      },
      showMsgCollectListTouchEnd(type,number,location) {
        utils.stopBubbling(event);
        console.log("showMsgCollectListTouchEnd");
        const self = this;
        if (self.msgNumStr === 0) {
          const toast = self.$createToast({
            type: 'correct',
            txt: "暂没有消息汇总"
          });
          toast.show();
        } else {
          self.$emit('showMsgCollectList', {type: type,number: number,location: location});
        }
      },

      toAlertVideo() {
        console.log("toAlertVideo");
      },
      toAlertVideoTouch() {
        console.log("toAlertVideoTouch");
      },
      toAlertVideoTouchEnd() {
        utils.stopBubbling(event);
        console.log("toAlertVideoTouchEnd");
        let self = this;
        self.messageCameraStartTime = self.messageInfo.createTime-30;
        self.messageCameraEndTime = self.messageInfo.createTime+30;
        if(self.messageInfo.defenceAreaNumber) {
          self.$post("camera","/getMessageCamera",{
            defenceAreaNumber: self.messageInfo.defenceAreaNumber
          }).then((res)=>{
            if(res.data.length>1) {
              res.data.forEach((item)=>{
                item.text = item.name;
                item.value = item.deviceNumber;
              });
              self.messageCameraList = [...res.data];
              if(self.messageCameraList.length===res.data.length) {
                self.chooseMessageCameraPicker();
              }
            } else if(res.data.length===1) {
              let alertVideoInfo = res.data[0];
              utils.openAlertVideo(alertVideoInfo.yingShiToken, alertVideoInfo.deviceNumber,
                self.messageCameraStartTime, self.messageCameraEndTime);
            } else {
              const toast = this.$createToast({
                type: 'warn',
                txt: "暂无视频"
              });
              toast.show();
            }
          });
        } else {
          self.$post("camera","/getMessageCamera",{
            areaNumber: self.messageInfo.areaNumber
          }).then((res)=>{
            if(res.data.length>1) {
              res.data.forEach((item)=>{
                item.text = item.name;
                item.value = item.deviceNumber;
              });
              self.messageCameraList = [...res.data];
              if(self.messageCameraList.length===res.data.length) {
                self.chooseMessageCameraPicker();
              }
            } else if(res.data.length===1){
              let alertVideoInfo = res.data[0];
              utils.openAlertVideo(alertVideoInfo.yingShiToken, alertVideoInfo.deviceNumber,
                self.messageCameraStartTime, self.messageCameraEndTime);
            } else {
              const toast = this.$createToast({
                type: 'warn',
                txt: "暂无视频"
              });
              toast.show();
            }
          });
        }
      },
      chooseMessageCameraPicker() {//选择区域
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '选择区域',
            data: [this.messageCameraList],
            selectedIndex: [this.messageCameraIndex],
            onSelect: this.messageCameraSelectHandle,
            onCancel: this.messageCameraCancelHandle
          })
        }
        this.picker.show()
      },
      messageCameraSelectHandle(selectedVal, selectedIndex, selectedText) {
        this.messageCameraName = this.messageCameraList[selectedIndex].name;
        this.messageCameraAccessToken = this.messageCameraList[selectedIndex].yingShiToken;
        this.messageCameraDeviceNumber = this.messageCameraList[selectedIndex].deviceNumber;
        this.messageCameraIndex = selectedIndex;
        console.log("数组",this.messageCameraList);
        console.log("yingShiToken数组",this.messageCameraAccessToken);
        console.log("messageCameraDeviceNumber数组",this.messageCameraDeviceNumber);
        console.log("messageCameraStartTime数组",this.messageCameraStartTime);
        console.log("messageCameraEndTime数组",this.messageCameraEndTime);
        utils.openAlertVideo(this.messageCameraAccessToken, this.messageCameraDeviceNumber,
          this.messageCameraStartTime, this.messageCameraEndTime);
        this.picker = undefined;
      },
      messageCameraCancelHandle() {
        this.picker = undefined;
      },

      handleImgsClick() {
        console.log("handleImgsClick");
      },
      handleImgsTouch() {
        console.log("handleImgsTouch");
      },
      handleImgsTouchEnd() {
        utils.stopBubbling(event);
        console.log("handleImgsTouchEnd");
        let self = this;
        self.$post("alertMessage","/getAlertPhoto",{alertNumber:this.messageInfo.number}).then((res)=>{
          let imgs = [];
          res.data.forEach((item) => {
            imgs.push(item.picUrl)
          });
          if(imgs.length === res.data.length){
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
          }
        });
      }
    }
  };
</script>

<style scoped>
  .alert-msg-box {
    width: 92vw;
    height: 37.3333vw;
    padding: 4vw 2.67vw 3.7333vw 2.67vw;
    margin: 2.6666vw 1.6666vw 2.6666vw 1vw;
    border-radius: 1.6vw;
    box-sizing: border-box;
  }
  .alert-msg-text {

  }
</style>
