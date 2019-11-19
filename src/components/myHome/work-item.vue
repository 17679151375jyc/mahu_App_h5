<template>
  <div style="width: 100vw;background-color: white" @click="itemWorkOnClick">
    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 89.34vw;height: 13.33vw;padding: 0 5.33vw">
      <div class="base-horizontal-layout-center-item-center">
        <img :src="icon" style="width: 3.73vw;height: 3.73vw;margin-right: 1.6vw">
        <p class="base-text-details-normal-black-light" style="margin-right: 2.6vw">{{timeStr}}</p>
        <little-gray-dot-icon v-if="myWordInfo.messageType !== '安装'"
                              :icon="require('@/components/myHome/message/icon_alarm-msg-msg.png')"
                              :num="msgNumStr"
                              :isForbidden="myWordInfo.isRead"
                              @onDotClick="showMsgCollectList(myWordInfo.messageType,myWordInfo.number,
                                myWordInfo.plotName+myWordInfo.buildingName+myWordInfo.doorName)">
        </little-gray-dot-icon>
        <little-gray-dot-icon v-if="myWordInfo.messageType !== '安装' && myWordInfo.photoCount>0"
                              style="width: 13.87vw;margin-left: 2vw"
                              :icon="require('@/components/myHome/message/icon_screenshot.png')"
                              :num="myWordInfo.photoCount"
                              :isForbidden="false"
                              @onDotClick="handleImgsClick">
        </little-gray-dot-icon>
      </div>
      <p class="base-text-details-normal-red" :style="stateStrStyle">{{stateStr}}</p>
    </div>
    <div class="base-horizontal-layout-space-between-item-center"
         style="width: 89.34vw;height: 13.33vw;padding: 0 5.33vw 1vw 5.33vw">
      <div>
        <div v-if="myWordInfo.messageType === '报警'" class="base-vertical-layout-general" style="justify-content: space-between">
          <p class="my-home-work-item-text" style="margin-bottom: 1.6vw">{{myWordInfo.plotName}}{{myWordInfo.buildingName}}{{myWordInfo.doorName}}-{{(
  myWordInfo.defenceAreaName===null || myWordInfo.defenceAreaName===undefined ||myWordInfo.defenceAreaName==="")?
            '全屋':myWordInfo.defenceAreaName}}</p>
          <!--<p class="my-home-work-item-text" style="margin-bottom: 1.6vw">{{myWordInfo.location}}-{{myWordInfo.defenceArea}}</p>-->
          <p class="my-home-work-item-text">报警级别：<span style="color: red">{{myWordInfo.type}}</span></p>
        </div>
        <div v-else-if="myWordInfo.messageType === '维保'" class="base-vertical-layout-general" style="justify-content: space-between">
          <p class="my-home-work-item-text" style="margin-bottom: 1.6vw">{{myWordInfo.plotName}}{{myWordInfo.buildingName}}{{myWordInfo.doorName}}-{{(
  myWordInfo.defenceAreaName===null || myWordInfo.defenceAreaName===undefined ||myWordInfo.defenceAreaName==="")?
            '主机':myWordInfo.defenceAreaName}}</p>
          <p class="my-home-work-item-text">维保消息：{{myWordInfo.name}}</p>
        </div>
        <div v-else-if="myWordInfo.messageType === 'install'" class="base-vertical-layout-general" style="justify-content: space-between">
          <p class="my-home-work-item-text" style="margin-bottom: 1.6vw">{{myWordInfo.location}}</p>
          <p class="my-home-work-item-text">安装服务：{{myWordInfo.title}}</p>
        </div>
        <div v-else class="base-vertical-layout-general" style="justify-content: space-between">
        </div>
      </div>
      <div v-show="myWordInfo.status!=='误报' && myWordInfo.status!=='已忽略' && myWordInfo.status!=='评价完成'"
           class="base-horizontal-layout-center-item-center"
           style="width: 45.34vw;height: 13.33vw;justify-content: flex-end;">
        <div v-if="beingMsgText===''" class="base-horizontal-layout-center-item-center">
          <button-border v-show="button1Text!==''"
                         :buttonBorderStyle="buttonBorderStyle"
                         :buttonBorderTextStyle="buttonBorderTextStyle"
                         :text="button1Text"
                         @buttonOnClick="alertOnClick(1)">
          </button-border>
          <button-border style="margin-left: 4vw"
                         :buttonBorderStyle="(myWordInfo.status==='未处理') ?
                         buttonBorderBackgroundStyle : buttonBorderBlueStyle"
                         :buttonBorderTextStyle="buttonBorderTextStyle"
                         :text="button2Text"
                         @buttonOnClick="alertOnClick(2)">
          </button-border>
        </div>
        <div v-else>
          <!--<p class="my-home-work-item-msg-text"-->
             <!--style="text-align: right"-->
             <!--&gt;{{myWordInfo.messageType === '报警' ? '等待安保接警' : myWordInfo.messageType === '维保' ? '等待维保接单' : ''}}</p>-->
          <p class="my-home-work-item-msg-text" style="text-align: right" v-html="beingMsgText"></p>
        </div>
      </div>
      <div v-show="myWordInfo.status==='评价完成'">
        <cube-rate v-model="myWordInfo.mark" :disabled="true" style="width: 27.75vw"></cube-rate>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import littleGrayDotIcon from '../redDot/little-gray-dot-icon';
  import buttonBorder from '../button/button-border';

  export default {
    name: "my-home-work-item",
    components: {
      littleGrayDotIcon,
      buttonBorder
    },
    props:
      {
        myWordInfo: {
          type: Object,
          default: () => {}
        },
      },
    data() {
      return {
        icon: '',
        timeStr: '',
        stateStr: '',
        stateStrStyle: {},
        msgNumStr: 0,
        buttonBorderRedStyle: {
          height: '6.67vw',
          padding: '0 3vw',
          boxSizing: 'border-box',
          border: '0.27vw solid #FF3333',
          borderRadius: '5.07vw'
        },
        buttonBorderGreenStyle: {
          height: '6.67vw',
          padding: '0 3vw',
          boxSizing: 'border-box',
          border: '0.27vw solid #24B3B3',
          borderRadius: '5.07vw'
        },
        buttonBorderBlueStyle: {
          height: '6.67vw',
          padding: '0 3vw',
          boxSizing: 'border-box',
          border: '0.27vw solid #3388FF',
          borderRadius: '5.07vw'
        },
        buttonBorderBackgroundStyle: {
          height: '6.67vw',
          padding: '0 3vw',
          backgroundColor: '#EDEEF0',
        },
        buttonBorderTextRedStyle: {
          fontSize: '2.67vw',
          color: '#FF3333'
        },
        buttonBorderTextGreenStyle: {
          fontSize: '2.67vw',
          color: '#24B3B3'
        },
        buttonBorderTextBlueStyle: {
          fontSize: '2.67vw',
          color: '#3388FF'
        },
        buttonBorderStyle: {},
        buttonBorderTextStyle: {},
        button1Text: '',
        button2Text: '',
        beingMsgText: '',
        // toPath: '/my-home/work/work-details',
        toPath: '/ma-hu-index/work/work-details',
        remainingTime: 0,
        remainingTimeInterval: undefined,

        initialIndex: 0,//截图打开张序号
      }
    },
    created() {
      this.buttonBorderStyle = this.buttonBorderBlueStyle;
      this.buttonBorderTextStyle = this.buttonBorderTextBlueStyle;
      this.getMyWordItemInfo();
      this.getRemainingTimeInfo();
    },
    mounted() {

    },
    watch: {
      myWordInfo() {
        this.buttonBorderStyle = this.buttonBorderBlueStyle;
        this.buttonBorderTextStyle = this.buttonBorderTextBlueStyle;
        this.getMyWordItemInfo();
        this.getRemainingTimeInfo();
      },
      remainingTime() {
        let self = this;
        if(self.remainingTime<=0) {
          self.flowTypeStrSome("请求出警",{},self.messageInfo.requestTime,"请求出警","","","即将出警");
          setTimeout(() => {
            self.getMyWordItemInfo();
          }, 10000);
        } else {
          self.flowTypeStrSome("请求出警",{},self.messageInfo.requestTime,"请求出警","","",
            (self.messageInfo.remainingTime>0) ? ("等待安保接警<br>" +
              utils.secondTrans(self.remainingTime) + "后将由系统分配出警") : ("即将出警"));
        }
      }
    },
    methods: {
      getRemainingTimeInfo() {
        let self = this;
        if (self.myWordInfo.messageType==="报警" && self.myWordInfo.status==="请求出警") {
          self.remainingTime = self.myWordInfo.remainingTime;
          this.remainingTimeInterval = setInterval(function() {//1秒钟做一次减法
            if (self.remainingTime<=0) {
              this.remainingTimeInterval.clearInterval();
            } else {
              self.remainingTime--;
            }
          },1000);
          self.flowTypeStrSome("请求出警",{},self.myWordInfo.requestTime,"","",
            (self.myWordInfo.remainingTime>0) ? ("等待安保接警<br>" +
              utils.secondTrans(self.remainingTime) + "后将由系统分配出警") : ("即将出警"));
        }
      },
      getMyWordItemInfo() {
        this.msgNumStr = this.myWordInfo.messageCount > 99 ? "99+" : this.myWordInfo.messageCount;
        if (this.myWordInfo.messageType === "报警") {
          this.messageTypeStrSome(require('@/assets/icon/icon_alert.png'));
          // this.alertMsgStyle = BaseRedBackgroundColor;
          // this.titleIcon = "static/assets/icon/icon_alarm-msg-alert.png";
          switch (this.myWordInfo.status) {
            case "未处理":
              this.flowTypeStrSome("未处理",{},this.myWordInfo.createTime,"立即出警","误报","");
              this.buttonBorderStyle = this.buttonBorderRedStyle;
              this.buttonBorderTextStyle = this.buttonBorderTextRedStyle;
              break;
            case "请求出警":
              // this.flowTypeStrSome("请求出警",{},this.myWordInfo.requestTime,"","",this.myWordInfo.beingTime + "后将由系统分配出警");
              break;
            case "已接警":
              this.flowTypeStrSome("已接警",{},this.myWordInfo.acceptTime,"联系安保","安保位置","");
              break;
            case "正在出警":
              this.flowTypeStrSome("已出警",{},this.myWordInfo.dealTime,"联系安保","安保位置","");
              break;
            case "出警完成":
              this.flowTypeStrSome("出警完成",{color: '#8A9099'},this.myWordInfo.completeTime,"","评价服务","");
              break;
            case "评价完成":
              this.flowTypeStrSome("已评价",{color: '#8A9099'},this.myWordInfo.markTime,"","","");
              break;
            case "误报":
              this.flowTypeStrSome("已误报",{color: '#8A9099'},this.myWordInfo.misstateTime,"","","");
              break;
            default:
              break;
          }
        } else if (this.myWordInfo.messageType === "维保") {
          this.messageTypeStrSome(require('@/assets/icon/icon_fault.png'));
          // this.alertMsgStyle = {backgroundColor: '#24B3B3'};
          // this.titleIcon = "static/assets/icon/icon_alarm-msg-fault.png";
          switch (this.myWordInfo.status) {
            case "未处理":
              this.flowTypeStrSome("未处理",{},this.myWordInfo.createTime,"申报维修","忽略","");
              this.buttonBorderStyle = this.buttonBorderGreenStyle;
              this.buttonBorderTextStyle = this.buttonBorderTextGreenStyle;
              break;
            case "申报中":
              this.flowTypeStrSome("申报维修",{},this.myWordInfo.requestTime,"","","等待维保接单");
              break;
            case "已接单":
              this.flowTypeStrSome("已接单",{},this.myWordInfo.acceptTime,"联系师傅","预约时间","");//修改
              break;
            case "正在处理":
              this.flowTypeStrSome("正在处理",{},this.myWordInfo.dealTime,"联系师傅","预约时间","");//修改
              break;
            case "已完成":
              this.flowTypeStrSome("维保完成",{color: '#8A9099'},this.myWordInfo.completeTime,"","服务评价","");
              break;
            case "评价完成":
              this.flowTypeStrSome("已评价",{color: '#8A9099'},this.myWordInfo.markTime,"","","");
              break;
            case "已忽略":
              this.flowTypeStrSome("已忽略",{color: '#8A9099'},this.myWordInfo.ignoreTime,"","","");
              break;
            default:
              break;
          }
        } else if (this.myWordInfo.messageType === "install") {
          this.messageTypeStrSome(require('@/assets/icon/icon_install.png'),"","");
          switch (this.myWordInfo.flowType) {
            case "untreated":
              break;
            case "being":
              this.flowTypeStrSome("申报安装",{},this.myWordInfo.time,"","","等待系统处理...");
              break;
            case "receive":
              this.flowTypeStrSome("已接单",{},this.myWordInfo.time,"","联系师傅","");
              break;
            case "正在处理":
              this.flowTypeStrSome("正在处理",{},this.myWordInfo.time,"","联系师傅","");
              break;
            case "complete":
              this.flowTypeStrSome("维保完成",{color: '#8A9099'},this.myWordInfo.time,"","服务评价","");
              break;
            case "evaluate":
              this.flowTypeStrSome("已评价",{color: '#8A9099'},this.myWordInfo.time,"","","");
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else {
          return;
        }
      },

      messageTypeStrSome(icon) {
        this.icon = icon;
      },
      flowTypeStrSome(stateStr,stateStrStyle,time,button1Text,button2Text,beingMsgText) {
        this.stateStr = stateStr;
        this.stateStrStyle = stateStrStyle;
        this.timeStr = utils.timetrans(time, "");
        this.button1Text = button1Text;
        this.button2Text = button2Text;
        this.beingMsgText = beingMsgText;
      },

      showMsgCollectList(type,number,location) {
        utils.stopBubbling(event);
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
      handleImgsClick() {
        utils.stopBubbling(event);
        let self = this;
        self.$post("alertMessage","/getAlertPhoto",{alertNumber:self.myWordInfo.number}).then((res)=>{
          let imgs = [];
          res.data.forEach((item) => {
            imgs.push(item.picUrl)
          });
          if(imgs.length === res.data.length){
            this.$createImagePreview({
                imgs: imgs,
                initialIndex: self.initialIndex,
                loop: false,
                onChange: (i) => {
                  self.initialIndex = i
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
      },
      alertOnClick(num) {
        utils.stopBubbling(event);
        const self = this;
        if (num === 1) {
          if (this.myWordInfo.messageType === "报警") {
            switch (this.myWordInfo.status) {
              case "未处理":
                self.$emit('alertOnClick', {number: self.myWordInfo.number,name: self.myWordInfo.name});
                break;
              case "已接警":
                self.$emit('callAlertPersonnelOnClick', {phone: self.myWordInfo.securePhone,messageType: self.myWordInfo.messageType});
                break;
              case "正在出警":
                self.$emit('callAlertPersonnelOnClick', {phone: self.myWordInfo.securePhone,messageType: self.myWordInfo.messageType});
                break;
              default:
                break;
            }
          } else if (this.myWordInfo.messageType === "维保") {
            switch (this.myWordInfo.status) {
              case "未处理":
                self.$emit('maintainOnClick', {number: self.myWordInfo.number, name: self.myWordInfo.name,
                  content: self.myWordInfo.content, orderTime: 0});
                break;
              case "已接单":
                self.$emit('callAlertPersonnelOnClick', {phone: self.myWordInfo.securePhone,messageType: self.myWordInfo.messageType});
                break;
              case "正在处理":
                self.$emit('callAlertPersonnelOnClick', {phone: self.myWordInfo.securePhone,messageType: self.myWordInfo.messageType});
                break;
              case "complete":
                break;
              default:
                break;
            }
          } else {
            return;
          }
        } else if (num === 2) {
          if (this.myWordInfo.messageType === "报警") {
            switch (this.myWordInfo.status) {
              case "未处理":
                self.$emit('misAlertOnClick', {number: self.myWordInfo.number});
                break;
              case "已接警":
                self.itemWorkOnClick();
                break;
              case "正在出警":
                self.itemWorkOnClick();
                break;
              case "出警完成":
                self.itemWorkOnClick();
                break;
              case "评价完成":
                self.itemWorkOnClick();
                break;
              default:
                break;
            }
          } else if (this.myWordInfo.messageType === "维保") {
            switch (this.myWordInfo.status) {
              case "未处理":
                self.$emit('misMaintainOnClick', {number: self.myWordInfo.number});
                break;
              case "已接单":
                self.$emit('maintainOnClick', {number: self.myWordInfo.number, name: self.myWordInfo.name,
                  content: self.myWordInfo.content, orderTime: self.myWordInfo.orderTime});
                break;
              case "正在处理":
                self.$emit('maintainOnClick', {number: self.myWordInfo.number, name: self.myWordInfo.name,
                  content: self.myWordInfo.content, orderTime: self.myWordInfo.orderTime});
                break;
              case "已完成":
                self.itemWorkOnClick();
                break;
              case "评价完成":
                self.itemWorkOnClick();
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

      itemWorkOnClick() {//点击整个item
        utils.localStorage("myWordInfoNum", this.myWordInfo.number);
        if (this.myWordInfo.messageType === "报警") {
          if(this.myWordInfo.status === "未处理" || this.myWordInfo.status === "误报") {
            return;
          } else {
            this.$router.push({ path: this.toPath, query: {messageType:"报警"}});
          }
        } else if (this.myWordInfo.messageType === "维保") {
          if(this.myWordInfo.status === "未处理" || this.myWordInfo.status === "已忽略") {
            return;
          } else {
            this.$router.push({ path: this.toPath, query: {messageType:"维保"}});
          }

          // switch (this.myWordInfo.flowType) {
          //   case "untreated":
          //     break;
          //   case "being":
          //     this.$router.push({ path: this.toPath, query: {flowType: 'being',messageType: 'declare'}});
          //     break;
          //   case "receive":
          //     this.$router.push({ path: this.toPath, query: {flowType: 'receive',messageType: 'declare'}});
          //     break;
          //   case "complete":
          //     this.$router.push({ path: this.toPath, query: {flowType: 'complete',messageType: 'declare'}});
          //     break;
          //   case "evaluate":
          //     this.$router.push({ path: this.toPath, query: {flowType: 'evaluate',messageType: 'declare'}});
          //     break;
          //   case "fault":
          //     break;
          //   default:
          //     break;
          // }
        } else if (this.myWordInfo.messageType === "install") {
          switch (this.myWordInfo.flowType) {
            case "untreated":
              break;
            case "being":
              this.$router.push({ path: this.toPath, query: {flowType: 'being',messageType: 'install'}});
              break;
            case "receive":
              this.$router.push({ path: this.toPath, query: {flowType: 'receive',messageType: 'install'}});
              break;
            case "complete":
              this.$router.push({ path: this.toPath, query: {flowType: 'complete',messageType: 'install'}});
              break;
            case "evaluate":
              this.$router.push({ path: this.toPath, query: {flowType: 'evaluate',messageType: 'install'}});
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else {
          return;
        }
      },
    }
  };
</script>

<style scoped>
  .my-home-work-item-text {
    font-size: 2.67vw;
    color: #45484D;
    line-height: 3.73vw;
  }
  .my-home-work-item-msg-text {
    font-size: 2.67vw;
    color: #737880;
    line-height: 4.8vw;
  }

</style>
