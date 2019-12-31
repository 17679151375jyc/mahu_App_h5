<template>
  <div class="wrapper">
    <return-head title="消息详情"></return-head>

    <div v-if="myWordDetail.status==='请求出警' || myWordDetail.status==='申报中'">
      <div v-if="myWordDetail.messageType==='报警'">
        <p class="base-text-details-large-black-light"
           style="line-height: 18.67vw;padding: 0 5vw;background-color: white;
                border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6"
        >暂无安保人员接警，请耐心等待。<span style="color: #3388FF">{{remainingTimeStr}}</span></p>
      </div>
      <div v-else-if="myWordDetail.messageType==='维保'">
        <p class="base-text-details-large-black-light"
           style="line-height: 18.67vw;padding: 0 5vw;background-color: white;
                border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6"
        >暂无维保师傅接单，请耐心等待。<span style="color: #3388FF">{{remainingTimeStr}}</span></p>
      </div>
      <div v-else-if="myWordDetail.messageType==='安裝'">
        <p class="base-text-details-large-black-light"
           style="line-height: 18.67vw;padding: 0 5vw;background-color: white;
                border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6"
        >系统正在处理中，请耐心等待...</p>
      </div>
      <div v-else></div>
      <!--<div style="background-color: white">-->
        <!--<p class="base-text-details-large-black-light"-->
           <!--style="color: #45484D;line-height: 12vw;font-weight: bold;padding: 0 5vw;-->
           <!--border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6">服务详情</p>-->
        <!--<div style="padding: 2vw 5vw 5vw 5vw">-->
          <!--<p class="base-text-details-normal-black-light"-->
             <!--style="line-height: 7vw"><span style="color: #808080">报警地点&nbsp;&nbsp;&nbsp;</span>{{myWordDetail.plotName}}-->
            <!--{{myWordDetail.buildingName}} {{myWordDetail.doorName}}</p>-->
          <!--<p class="base-text-details-normal-black-light"-->
             <!--style="line-height: 7vw"><span style="color: #808080">报警人员&nbsp;&nbsp;&nbsp;</span>-->
            <!--<span style="color: #3388FF;text-decoration: underline">{{myWordDetail.userName}}</span></p>-->
          <!--<p class="base-text-details-normal-black-light"-->
             <!--style="line-height: 7vw"><span style="color: #808080">报警时间&nbsp;&nbsp;&nbsp;</span>{{timeChange(myWordDetail.requestTime)}}</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div v-if="myWordDetail.status==='已接警' || myWordDetail.status==='正在出警' || myWordDetail.status==='已接单' || myWordDetail.status==='正在处理'">
      <div class="base-horizontal-layout-space-between-item-center"
           style="padding: 6vw 5vw;background-color: white;
                  border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6">

        <div class="base-horizontal-layout-center-item-center">
          <div v-if="!myWordDetail.secureHeadPortrait || myWordDetail.secureHeadPortrait===null"
               style="width: 10.6777vw;height: 10.6777vw;border-radius: 50%;background-color: #CCCCCC"></div>
          <img v-else :src="myWordDetail.secureHeadPortrait"
               style="width: 10.6777vw;height: 10.6777vw;border-radius: 50%;border: 1px solid #CCCCCC">
          <div class="base-vertical-layout-space-between" style="height: 8.67vw;margin-left: 2.67vw">
            <p class="base-text-details-large-black-light"
            >{{myWordDetail.secureName}} 已接受您的{{myWordDetail.messageType==='报警' ? '出警请求' : myWordDetail.messageType==='维保' ? '维修申报': '安装申报'}}</p>
            <p class="base-text-details-normal-gray-light">{{myWordDetail.status==='正在出警' ?
              timeChange(myWordDetail.dealTime) : timeChange(myWordDetail.acceptTime)}}</p>
          </div>
        </div>
        <div class="base-horizontal-layout-center-item-center"
             style="width: 21.33vw;height: 6.93vw;background-color: #F2F2F2">
          <img :src="require('@/assets/icon/icon_call.png')" class="base-icon-small-style" style="margin-right: 1.33vw">
          <a id='dial' :href="'tel:'+myWordDetail.securePhone"
             class="base-text-details-normal-gray-dark"
             style="color: #808080"
            >联系{{myWordDetail.messageType==='报警' ? '安保' : myWordDetail.messageType==='维保' ? '维保' : '师傅'}}</a>
          <!--<p class="base-text-details-normal-gray-dark"-->
             <!--style="color: #808080"-->
             <!--&gt;联系{{myWordDetail.messageType==='报警' ? '安保' : myWordDetail.messageType==='维保' ? '维保' : '师傅'}}</p>-->
        </div>
      </div>
      <div v-if="myWordDetail.messageType === '报警'"><!--已接警流程-->
        <div style="height: calc(100vh - 11.7333vw - 18.67vw - 12vw - 26.93vw - 5.33vw)"><!-- - 4vw-->
          <a-map :width="mapWidth"
                 :height="mapHeight"
                 :locationData="mapData">
          </a-map>
        </div>
        <div style="background-color: white">
          <p class="base-text-details-large-black-light"
             style="color: #45484D;line-height: 12vw;font-weight: bold;padding: 0 5vw;
           border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6">服务详情</p>
          <div style="padding: 2vw 5vw 5vw 5vw">
            <p class="base-text-details-normal-black-light"
               style="line-height: 7vw"><span style="color: #808080">报警地点&nbsp;&nbsp;&nbsp;</span>{{myWordDetail.plotName}}
              {{myWordDetail.buildingName}} {{myWordDetail.doorName}}</p>
            <p class="base-text-details-normal-black-light"
               style="line-height: 7vw"><span style="color: #808080">报警人员&nbsp;&nbsp;&nbsp;</span>
              <span style="color: #3388FF;text-decoration: underline">{{myWordDetail.userName}}</span></p>
            <p class="base-text-details-normal-black-light"
               style="line-height: 7vw"><span style="color: #808080">报警时间&nbsp;&nbsp;&nbsp;</span>{{timeChange(myWordDetail.requestTime)}}</p>
          </div>
        </div>
      </div>
      <!--以下判断是为了防止流程扩展-->
      <!--<div v-if="myQuery.messageType==='alert'"></div>-->
      <!--<div v-else-if="myQuery.messageType==='declare'"></div>-->
      <!--<div v-else-if="myQuery.messageType==='install'"></div>-->
      <!--<div v-else></div>-->
    </div>
    <div v-else></div>

    <div v-if="myWordDetail.status==='出警完成' || myWordDetail.status==='已完成' || myWordDetail.status==='评价完成'">
      <div class="base-horizontal-layout-space-between-item-center"
           style="padding: 3.47vw 5vw;background-color: white;
                  border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6">
        <p class="base-text-details-large-black-light"
           style="margin-left: 6vw"
           >{{myWordDetail.messageType==='报警' ? '出警' : myWordDetail.messageType==='维保' ? '维保' : '安装'}}服务完成，欢迎您再次使用</p>
        <div class="base-vertical-layout-center-item-center"
             style="padding: 0 1.6vw 0 6.67vw;
             border-style: solid;border-width: 0 0 0 0.27vw;border-color: #E3E4E6">
          <div v-if="!myWordDetail.secureHeadPortrait || myWordDetail.secureHeadPortrait===null"
               style="width: 8vw;height: 8vw;border-radius: 50%;background-color: #CCCCCC"></div>
          <img v-else :src="myWordDetail.secureHeadPortrait"
               style="width: 8vw;height: 8vw;border-radius: 50%;border: 1px solid #CCCCCC">
          <p class="base-text-details-small-black-light" style="line-height: 6.4vw">{{myWordDetail.secureName}}</p>
        </div>
      </div>
    </div>
    <div v-else></div>

    <div v-if="myWordDetail.status==='请求出警' || myWordDetail.status==='申报中'"
         style="margin-top: 4vw;background-color: white">
      <p class="base-text-details-large-black-light"
         style="color: #45484D;line-height: 12vw;font-weight: bold;padding: 0 5vw;
           border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6">服务详情</p>
      <div v-if="myWordDetail.messageType === '报警'"
           style="padding: 2vw 5vw 5vw 5vw">
        <p class="base-text-details-normal-black-light"
           style="line-height: 7vw"><span style="color: #808080">报警地点&nbsp;&nbsp;&nbsp;</span>{{myWordDetail.plotName}}
          {{myWordDetail.buildingName}} {{myWordDetail.doorName}}</p>
        <p class="base-text-details-normal-black-light"
           style="line-height: 7vw"><span style="color: #808080">报警人员&nbsp;&nbsp;&nbsp;</span>
          <span style="color: #3388FF;text-decoration: underline">{{myWordDetail.userName}}</span></p>
        <p class="base-text-details-normal-black-light"
           style="line-height: 7vw"><span style="color: #808080">报警时间&nbsp;&nbsp;&nbsp;</span>{{timeChange(myWordDetail.requestTime)}}</p>
      </div>
      <div v-if="myWordDetail.messageType === '维保'"
           style="padding: 2vw 5vw 5vw 5vw">
        <div > <!--style="border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6"-->
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw"><span style="color: #808080">服务地点&nbsp;&nbsp;&nbsp;</span>{{myWordDetail.plotName}}
            {{myWordDetail.buildingName}} {{myWordDetail.doorName}}</p>
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw"><span style="color: #808080">申报人员&nbsp;&nbsp;&nbsp;</span>
            <span style="color: #3388FF;text-decoration: underline">{{myWordDetail.userName}}</span></p>
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw;margin-bottom: 2vw"><span style="color: #808080">申报时间&nbsp;&nbsp;&nbsp;</span>{{timeChange(myWordDetail.requestTime)}}</p>
        </div>
        <!--<p class="base-text-details-normal-black-light"-->
           <!--style="line-height: 7vw;margin-top: 2vw"><span style="color: #808080">故障硬件&nbsp;&nbsp;&nbsp;</span>aaa</p>-->
      </div>
      <div v-if="myWordDetail.messageType === '安裝'"
           style="padding: 2vw 5vw">
        <div style="border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6">
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw"><span style="color: #808080">服务地点&nbsp;&nbsp;&nbsp;</span>aaa</p>
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw"><span style="color: #808080">申报人员&nbsp;&nbsp;&nbsp;</span>
            <span style="color: #3388FF;text-decoration: underline">李卤味</span></p>
          <p class="base-text-details-normal-black-light"
             style="line-height: 7vw;margin-bottom: 2vw"><span style="color: #808080">申报时间&nbsp;&nbsp;&nbsp;</span>aaa</p>
        </div>
        <p class="base-text-details-normal-black-light"
           style="line-height: 7vw;margin-top: 2vw"><span style="color: #808080">申报套餐&nbsp;&nbsp;&nbsp;</span>套餐B</p>
        <div class="base-horizontal-layout-general">
          <p class="base-text-details-normal-black-light" style="width: 15.8vw;color: #808080;line-height: 7vw">套餐内容</p>
          <p class="base-text-details-normal-black-light"
             style="width: 100%;color: #808080;line-height: 7vw;margin-left: 2.17vw;text-align: justify">套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B</p>
        </div>
      </div>
    </div>

    <div v-if="isShowFlowChart"
         class="scroll-wrapper" style="top: calc(11.7333vw + 18.67vw + 8vw)">
      <cube-scroll ref="flowList" :fade="true" :options="scrollOptions">
        <div v-if="myWordDetail.status==='出警完成' || myWordDetail.status==='已完成'"
             style="margin-bottom: 4vw;background-color: white">
          <p class="base-text-details-large-black-light"
             style="color: #45484D;line-height: 12vw;font-weight: bold;padding: 0 5vw;
           border-style: solid;border-width: 0 0 0.27vw 0;border-color: #E3E4E6">服务评分</p>
          <div style="padding: 3vw 5vw">
            <div class="base-horizontal-layout-general">
              <p class="base-text-details-normal-black-light" style="width: 17vw;line-height: 5vw;color: #808080;">服务评分</p>
              <div class="base-vertical-layout-general" style="margin-left: 3.73vw">
                <div class="base-horizontal-layout-general">
                  <cube-rate v-model="securityPersonnelScore" style="width: 27.75vw"></cube-rate>
                  <p style="font-size: 2.67vw;color: #FF8080;line-height: 5vw;margin-left: 5.33vw;min-width:36vw">{{securityPersonnelScoreText}}</p>
                </div>
                <p class="base-text-details-small-gray-light" style="line-height: 8.88vw">您的评价会让服务做得更好</p>
              </div>
            </div>
            <div class="base-horizontal-layout-general">
              <p class="base-text-details-normal-black-light" style="width: 17vw;line-height: 5vw;color: #808080">其它意见</p>
              <div class="base-vertical-layout-general" style="margin-left: 2.6666vw">
                <textarea style="width: 72vw;height: 24vw;background-color: #EDEEF0;
                                  box-sizing: border-box; padding: 0 2vw;
                                  border:none;resize:none;outline:none;
                                  border-radius: 1.3333vw;
                                  font-size: 3.2vw;color: #808080"
                          placeholder="您的其它意见可以在这儿对我们反馈"
                          maxlength="90"
                          v-model="securityText"/>
                <div class="base-horizontal-layout-space-between-item-center"
                     style="width: 70vw;margin-top: 1.33vw;justify-content: flex-end">
                  <button-background text="清空"
                                     :buttonBackgroundStyle="buttonBackgroundStyle"
                                     :buttonBackgroundTextStyle="buttonBackgroundTextStyle"
                                     style="margin-right: 2.67vw"
                                     @buttonOnClick="clearInput">
                  </button-background>
                  <button-background text="提交"
                                     @buttonOnClick="appraise">
                  </button-background>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isShowFlowChart"
             style="background-color: white;padding: 5vw 4vw 5vw 5vw">
          <div v-for="(item,index) in flowList" :key="index">
            <flow-item :item="item" :locationIndex="index===0 ? 1 : index===(flowList.length-1) ? 2 : 0"></flow-item>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from "_c/head/return-head";
  import flowItem from "_c/myHome/flow-item";
  import buttonBackground from "_c/button/button-background";
  import aMap from "_c/myHome/map";

  export default {
    name: "work-details",
    components: {
      returnHead,
      flowItem,
      buttonBackground,
      aMap
      //todo 这个页面也要做滚动
    },
    data() {
      return {
        myQuery: {},
        isShowFlowChart: false,
        flowList:[],

        scrollOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh:false,
          pullUpLoad: false
        },

        // 地图模块
        mapWidth: "100%",
        mapHeight: "100%",
        mapData: {
          /**   staff: {
         *      staffIcon: './static/assets/icon/map-scu.png',   //图标，现在没用上
         *      staffLocation: [ [113.07454,22.5821],[113.07854, 22.5271],]  //安保人员的经纬坐标
         *      },
           *   WITHINNUMBER: 3000,   //给定的范围，单位m}
           **/
        },

        securityPersonnelScore: 5,//安保维保人员评分
        // securityPersonnelScoreText: '服务态度很好，爽翻了',
        securityPersonnelScoreText: '非常满意，无可挑剔',
        securityText: '',

        myWordInfoNum: '',
        myWordDetail: {},
        remainingTime: 0,
        remainingTimeStr: '',
        remainingTimeInterval: undefined,

        buttonBackgroundStyle: {
          backgroundColor: '#F2F2F2'
        },
        buttonBackgroundTextStyle: {
          color: '#808080'
        }
      }
    },
    beforeCreate() {
      //地图 尝试移除旧的本地数据,即使不存在也不会报错
      localStorage.removeItem("locationData");
    },
    created() {
      this.myQuery = this.$route.query;
    },
    mounted() {
      let self = this;
      self.getMyWordInfo();
    },
    watch: {
      securityPersonnelScore() {
        let self = this;
        switch (self.securityPersonnelScore) {
          case 1:
            // self.securityPersonnelScoreText = "非常不满意，各方面都很差";
            self.securityPersonnelScoreText = "非常不满意";
            return;
          case 2:
            self.securityPersonnelScoreText = "不满意，比较差";
            return;
          case 3:
            self.securityPersonnelScoreText = "一般，还需改善";
            return;
          case 4:
            self.securityPersonnelScoreText = "比较满意，仍可改善";
            return;
          case 5:
            self.securityPersonnelScoreText = "非常满意，无可挑剔";
            return;
          default:
            return;
        }
      },
      remainingTime() {
        let self = this;
        if (self.remainingTime<=0) {
          self.remainingTimeStr = self.myWordDetail.messageType==='报警'?"即将出警":"即将维保";
          setTimeout(() => {
            self.getMyWordInfo();
          }, 10000);
        }
      }
    },
    methods: {
      getRemainingTimeInfo() {
        let self = this;
        self.remainingTime = self.myWordDetail.remainingTime;
        this.remainingTimeInterval = setInterval(function() {//1秒钟做一次减法
          if (self.remainingTime<=0) {
            self.remainingTimeInterval.clearInterval();
            // self.getMyWordInfo();
          } else {
            self.remainingTime--;
            self.remainingTimeStr = utils.secondTrans(self.remainingTime);
          }
        },1000);
      },
      getMyWordInfo() {
        let self = this;
        self.myWordInfoNum = "";
        self.myWordInfoNum = localStorage.getItem("myWordInfoNum");
        if (this.myQuery.messageType==="报警") {
          self.$post("alertMessage","/getAlertMessage",{number:self.myWordInfoNum}).then((res)=>{
            self.myWordDetail = res.data;
            self.getFlowList();
            self.getMap();
            if(self.myWordDetail.status==='请求出警' || self.myWordDetail.status==='申报中') {
              self.getRemainingTimeInfo();
            }
          });
        } else if (this.myQuery.messageType==="维保") {
          self.$post("maintainMessage","/getMaintainMessage",{number:self.myWordInfoNum}).then((res)=>{
            self.myWordDetail = res.data;
            self.getFlowList();
            self.getMap();
            if(self.myWordDetail.status==='请求出警' || self.myWordDetail.status==='申报中') {
              self.getRemainingTimeInfo();
            }
          });
        } else {
          return;
        }
      },

      getMap() {
        let self = this;
        console.log(self.myWordDetail);
        if(self.myWordDetail.status==='已接警' || self.myWordDetail.status==='正在出警') {
          //地图 模拟取得数据后的异步操作，当locationData为空时将不加载地图
          setTimeout(() => {
            self.mapData = {
              staff: {
                staffType: "alert",
                staffIcon: "static/assets/icon/map-scu.png", //图标，现在没用上
                staffLocation: [[self.myWordDetail.longitude, self.myWordDetail.latitude],
                  [self.myWordDetail.secureLNG, self.myWordDetail.secureLAT]] //第一个是我家，第二个是安保人员的经纬坐标
                // staffLocation: [[parseFloat(self.myWordDetail.longitude), parseFloat(self.myWordDetail.latitude)],
                //   [parseFloat(self.myWordDetail.secureLNG), parseFloat(self.myWordDetail.secureLAT)]] //第一个是我家，第二个是安保人员的经纬坐标
                // staffLocation: [[113.07454, 22.5821],[113.07854, 22.5271]] //第一个是我家，第二个是安保人员的经纬坐标
                // staffLocation: [{home:[113.07454, 22.5821]}, {alert:[113.07854, 22.5271]}] //安保人员的经纬坐标
              },
              // WITHINNUMBER: 3000 //给定的范围，单位m}
              WITHINNUMBER: 1 //给定的范围，单位m}
            };
          }, 200);
        }
      },

      getFlowList() {
        let self = this;
        self.flowList = [];
        if (self.myWordDetail.messageType === '报警') {
          let flowList = [
            {
              flowType: 'being',
              messageType: 'alert',
              role: '',
              name: self.myWordDetail.userName,
              info: {
                matter: self.myWordDetail.name,
                location: self.myWordDetail.plotName +" " + self.myWordDetail.buildingName + " " + self.myWordDetail.doorName
              },
              time: self.myWordDetail.requestTime
            },
            {
              flowType: 'receive',
              messageType: 'alert',
              role: '安保人员',
              name: self.myWordDetail.secureName,
              info: {},
              time: self.myWordDetail.acceptTime
            },
            {
              flowType: 'deal',
              messageType: 'alert',
              role: '安保人员',
              name: self.myWordDetail.secureName,
              info: {},
              time: self.myWordDetail.dealTime
            },
            {
              flowType: 'complete',
              messageType: 'alert',
              role: '安保人员',
              name: self.myWordDetail.secureName,
              info: {
                matter: self.myWordDetail.name,
                feedbackType: self.myWordDetail.remarkType,
                feedback: self.myWordDetail.remarks
              },
              time: self.myWordDetail.completeTime
            },
            {
              flowType: 'evaluate',
              messageType: 'alert',
              role: '',
              name: self.myWordDetail.userName,
              info: {
                evaluate: self.myWordDetail.mark,
                evaluateDetails: self.myWordDetail.feedback
              },
              time: self.myWordDetail.markTime
            }
          ];
          switch (self.myWordDetail.status) {
            case "出警完成":
              self.isShowFlowChart = true;
              for (let count = 0;count < 4; count++) {
                if(utils.isEmptyAddStrAddObj(self.myWordDetail.dealTime) && count===2)
                {
                  continue;
                } else {
                  self.flowList.unshift(flowList[count]);
                }
              }
              break;
            case "评价完成":
              self.isShowFlowChart = true;
              for (let count = 0;count < flowList.length; count++) {
                if(utils.isEmptyAddStrAddObj(self.myWordDetail.dealTime) && count===2)
                {
                  continue;
                } else {
                  self.flowList.unshift(flowList[count]);
                }
              }
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else if (self.myWordDetail.messageType === '维保') {
          let flowList = [
            {
              flowType: 'being',
              messageType: 'declare',
              role: '',
              name: self.myWordDetail.userName,
              info: {
                matter: self.myWordDetail.name,
                location: self.myWordDetail.plotName +" " + self.myWordDetail.buildingName + " " + self.myWordDetail.doorName,
                content: self.myWordDetail.content
              },
              time: self.myWordDetail.requestTime
            },
            {
              flowType: 'receive',
              messageType: 'declare',
              role: '维保人员',
              name: self.myWordDetail.secureName,
              info: {},
              time: self.myWordDetail.acceptTime
            },
            {
              flowType: 'deal',
              messageType: 'declare',
              role: '维保人员',
              name: self.myWordDetail.secureName,
              info: {},
              time: self.myWordDetail.dealTime
            },
            {
              flowType: 'complete',
              messageType: 'declare',
              role: '维保人员',
              name: self.myWordDetail.secureName,
              info: {
                matter: self.myWordDetail.name,
                feedbackType: self.myWordDetail.remarkType,
                feedback: self.myWordDetail.remarks
              },
              time: self.myWordDetail.completeTime
            },
            {
              flowType: 'evaluate',
              messageType: 'declare',
              role: '',
              name: self.myWordDetail.userName,
              info: {
                evaluate: self.myWordDetail.mark,
                evaluateDetails: self.myWordDetail.feedback
              },
              time: self.myWordDetail.markTime
            }
          ];
          switch (self.myWordDetail.status) {
            case "已接单":
              self.isShowFlowChart = true;
              for (let count = 0;count < 2; count++) {
                self.flowList.unshift(flowList[count]);
              }
              break;
            case "正在处理":
              self.isShowFlowChart = true;
              for (let count = 0;count < 3; count++) {
                if(utils.isEmptyAddStrAddObj(self.myWordDetail.dealTime) && count===2)
                {
                  continue;
                } else {
                  self.flowList.unshift(flowList[count]);
                }
              }
              break;
            case "已完成":
              self.isShowFlowChart = true;
              for (let count = 0;count < 4; count++) {
                if(utils.isEmptyAddStrAddObj(self.myWordDetail.dealTime) && count===2)
                {
                  continue;
                } else {
                  self.flowList.unshift(flowList[count]);
                }
              }
              break;
            case "评价完成":
              self.isShowFlowChart = true;
              for (let count = 0;count < flowList.length; count++) {
                if(utils.isEmptyAddStrAddObj(self.myWordDetail.dealTime) && count===2)
                {
                  continue;
                } else {
                  self.flowList.unshift(flowList[count]);
                }
              }
              break;
            default:
              break;
          }
        } else if (self.myWordDetail.messageType === '安装') {
          let flowList = [
            {
              flowType: 'being',
              messageType: 'install',
              role: '',
              name: '李卤味',
              info: {
                combo: '套餐B',
                // comboDetails: '套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B套餐B',
                location: '丽城花园312',
              },
              time: 1551949040000
            },
            {
              flowType: 'receive',
              messageType: 'install',
              role: '安装人员',
              name: '叶永豪',
              info: {},
              time: 1551949040000
            },
            {
              flowType: 'complete',
              messageType: 'install',
              role: '安装人员',
              name: '叶永豪',
              info: {
                combo: '套餐B'
              },
              time: 1551949040000
            },
            {
              flowType: 'evaluate',
              messageType: 'install',
              role: '',
              name: '李卤味',
              info: {
                evaluate: 1,
              },
              time: 1551949040000
            }
          ];
          switch (self.myQuery.flowType) {
            case "untreated":
              break;
            case "being":
              break;
            case "receive":
              self.isShowFlowChart = true;
              for (let count = 0;count < 2; count++) {
                self.flowList.unshift(flowList[count]);
              }
              break;
            case "deal":
              self.isShowFlowChart = true;
              for (let count = 0;count < 3; count++) {
                self.flowList.unshift(flowList[count]);
              }
              break;
            case "complete":
              self.isShowFlowChart = true;
              for (let count = 0;count < 4; count++) {
                self.flowList.unshift(flowList[count]);
              }
              break;
            case "evaluate":
              self.isShowFlowChart = true;
              for (let count = 0;count < flowList.length; count++) {
                self.flowList.unshift(flowList[count]);
              }
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

      clearInput() {
        this.securityText = "";
      },
      appraise() {
        let self = this;
        if (this.myQuery.messageType==="报警") {
          self.$post("alertMessage","/appraise",{
            number: self.myWordInfoNum,
            mark: self.securityPersonnelScore,
            feedback: self.securityText
          }).then((res)=>{
            const toast = self.$createToast({
              type: 'correct',
              txt: "评价提交成功！"
            });
            toast.show();
            setTimeout(() => {
              self.getMyWordInfo();
            }, 500);
          });
        } else if (this.myQuery.messageType==="维保") {
          self.$post("maintainMessage","/appraise",{
            number: self.myWordInfoNum,
            mark: self.securityPersonnelScore,
            feedback: self.securityText
          }).then((res)=>{
            const toast = self.$createToast({
              type: 'correct',
              txt: "评价提交成功！"
            });
            toast.show();
            setTimeout(() => {
              self.getMyWordInfo();
            }, 500);
          });
        } else {
          return;
        }
      },

      timeChange(time) {
        return utils.timetrans(time);
      }
    }
  };
</script>

<style scoped>
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #B3B3B3;
    font-size: 2.67vw;
  }
</style>
