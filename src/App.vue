<template>
  <div>

    <div  id="app">
      <!--<transition :name="aheadBack">-->
        <router-view></router-view>
      <!--</transition>-->

      <div v-show="isIndexPage" >
        <div class="bottom-tab border-top-1px">
          <div v-for="(item,index) in tabBarImgArr" :key="index" class="tab-item" @click="switchTo(item.toPath)">
            <img :src="item.toPath === $route.path ? item.selected : item.normal" :alt="item.value">
            <span :class="{on: item.toPath === $route.path}">{{item.value}}</span>
          </div>
        </div>
        <div v-if="mIsShowOtherPop" style="position: fixed;bottom: 0;left: 0;z-index: 12">
          <div style="width: 100vw;height: 14.933vw;background-color: rgba(37, 38, 45, 0.4)"></div>
        </div>
      </div>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                :isShowCloseIcon="isShowCloseIcon"
                :closeIconStyle="closeIconStyle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup"
                @closePoppup="closePoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'callSecure'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--故障警报弹窗-->
      <div v-if="popType==='alarmProcessingExigency' || popType==='alarmProcessing'" class="base-vertical-layout-center-item-center">
        <img :src="require('@/assets/icon/icon_alert.png')" style="width: 8vw;height: 8vw">
        <div class="popup-text" style="width: 53.33vw">
          <p>{{popPlainText}}</p>
          <p>{{popPlainText2}}</p>
        </div>
      </div>
    </base-popup>

    <mine-popup v-if="mIsShowMinePop" @mineClose="minePopClose"></mine-popup>
    <door-list-gate-popup v-if="mIsShowDoorListGatePop"></door-list-gate-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import appData from '@/app_data';
  import md5 from '@/md5'
  import basePopup from '_c/popup/base-popup';
  import minePopup from  '_c/popup/mine-popup';
  import doorListGatePopup from  '_c/popup/door-list-gate-popup';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';
  import Input from "cube-ui/src/components/input/input";

  export default {
    name: "index",
    components: {
      Input,
      basePopup,
      minePopup,
      doorListGatePopup
    },
    data() {
      return {
        aheadBack: "slide",
        account: '',
        password: '',
        userInfo: {},
        isIndexPage: true,
        calculateDoubleClick: 0,

        // 弹窗属性
        isPopShow: false,
        refId: 'myAppPopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        isShowCloseIcon: false,
        closeIconStyle: {},
        // 弹窗参数
        popPlainText: '',
        popPlainText2: '',
        newAlertNumber: '',
        areaNumber: '',

        tabBarImgArr:[ //图片切换
          // {
          //   value: '我的家',
          //   toPath: '/my-home',
          //   normal: require('@/assets/tab/icon_home_gray.png'),
          //   selected: require('@/assets/tab/icon_home_color.png')
          // },
          {
            value: '马虎',
            toPath: '/ma-hu-index',
            normal: require('@/assets/tab/icon_home_gray.png'),
            selected: require('@/assets/tab/icon_home_color.png')
          },
          {
            value: '服务',
            toPath: '/service-index',
            normal: require('@/assets/tab/icon_service_gray.png'),
            selected: require('@/assets/tab/icon_service_color.png')
          },
          // {
          //   value: '出入',
          //   toPath: '/inAndOut',
          //   normal: require('@/assets/tab/icon_inout_gray.png'),
          //   selected: require('@/assets/tab/icon_inout_color.png')
          // },
          // {
          //   value: '服务旧',
          //   toPath: '/service',
          //   normal: require('@/assets/tab/icon_service_gray.png'),
          //   selected: require('@/assets/tab/icon_service_color.png')
          // },
          {
            value: '我的',
            toPath: '/mine',
            normal: require('@/assets/tab/icon_mine_gray.png'),
            selected: require('@/assets/tab/icon_mine_color.png')
          }
        ]
      };
    },
    beforeCreate() {

    },
    created() {
      let self = this;

      /*** 清除标签 ***/
      self.setIsShowOtherPop(false);
      self.setIsShowMinePop(false);
      self.setIsShowDoorListGatePop(false);

      let mDate = new Date().getTime();
      if(window.CYJ.userID) {
        self.setUserID(CYJ.userID());
        // self.setUserSign(CYJ.userSign(mDate));
      }

      window.myRouter = self.myRouter;//提供给原生使用--页面跳转
      window.toGoBack = self.toGoBack;//提供给原生使用--返回键
      window.getPush = self.getPush;//提供给原生使用--推送
      window.clickPush = self.clickPush;//提供给原生使用--推送有类型的

      // //监听视窗变动，重新计算高度,60是头部固定高度
      // // this.aheadBack == "slide"? this.aheadBack = null:this.aheadBack=null;
      // //utils.showTab()
      // //全局监听goBack,添加前进/后退动画
      // window.eventBus.$on("goBack", x => {
      //   self.aheadBack = "fade";
      //   console.log(x);
      //   setTimeout(x => {
      //     self.aheadBack = "slide";
      //     console.log(x);
      //   }, 500);
      // });wu

      console.log("screenWidth",window.screen.width);
      console.log("screenHeight",window.screen.height);
      // document.documentElement.clientHeight,//默认屏幕高度
      console.log("App");

      // window.eventBus.$on('registerOnBackPressCallback',function(){
      //   console.log("111");}
      // )
    },
    computed: {
      ...mapState({
        'mUserID': state => state.user.userID,
        'mUserSign': state => state.user.userSign,
        'mAppPath': state => state.user.appPath,
        'mUserInfo': state => state.user.userInfo,
        'mIsShowMinePop': state => state.user.isShowMinePop,
        'mIsShowOtherPop': state => state.user.isShowOtherPop,

        'mUserNickName': state => state.user.userNickName,

        'mIsShowDoorListGatePop': state => state.layout.isShowDoorListGatePop
      })
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        this.setAppPath(to.path);
        if (to.path==="/my-home" || to.path==="/inAndOut" || to.path==="/service" || to.path==="/mine" ||
          to.path==="/ma-hu-index" || to.path==="/service-index") {
          console.log("to.path",to.path)
          this.isIndexPage = true;
        } else {
          this.isIndexPage = false;
        }
        console.log("App.Vue",this.mAppPath);
      },

      mUserInfo() {
        let self = this;
        if(self.mUserInfo===null || self.mUserInfo===undefined)
        {
          const toast = this.$createToast({
            type: 'warn',
            txt: "初始化 没有userInfo"
          });
          toast.show();
        } else {
          if(self.mUserInfo.infos===null || self.mUserInfo.infos===undefined)
          {
            const toast = this.$createToast({
              type: 'warn',
              txt: "初始化 没有userInfo.infos"
            });
            toast.show();
          } else {
            utils.localStorage('userInfo', self.mUserInfo).then((r) => {
              console.log("userInfo获取成功",r);

            });
          }
        }
        // self.$router.push('/my-home');//跳到主页
      }

    //   $route(to, from) {
    //     utils.registerOnBackPressCallback(function () {
    //       setTimeout(() => {
    //         self.$router.go(-1);
    //       }, 50);
    //     })
    //   }
    },
    mounted() {
      let self = this;
      self.getCommonInfos();
    },

    methods: {
      ...mapActions(
        ['setUserInfo',//用户所有信息
          'setUserID', 'setUserToken',//用户ID、用户token
          'setUserNickName', 'setUserRealName', 'setUserHeadPortrait', 'setUserPhone', 'setUserIdCard',//用户基础信息
          'setUserHasProprietor', 'setUserPlotList',//是否加入社区、社区列表
          'setFamilyPlotList',//家庭社区列表
          'setAreaTypesList',//角色列表
          'setPushInfo', 'setAppPath',//推送、页面信息
          'setIsShowMinePop',//设置显示个人信息弹窗
          'setIsShowOtherPop',
          'setMyHomeWork',//设置跳转到work页面的哪个tab
          'setPropertyManagePlotNumber','setPropertyManagePlotName',//备城门社区信息
          'setIsShowDoorListGatePop',//备城门门口机
        ]
      ),

      myRouter(url) {
        this.$router.push(url);
      },
      toGoBack() {
        let self = this;
        if(this.isIndexPage) {
          this.calculateDoubleClick++;
          console.log(this.calculateDoubleClick);
          if(this.calculateDoubleClick===2) {
            utils.finishTop();
          } else {
            const toast = self.$createToast({
              type: 'correct',
              txt: "再按一次返回桌面"
            });
            toast.show();
          }
        } else {
          this.$router.goBack();
        }
      },

      /*** 获取登录信息 ***/
      getCommonInfos() {
        let self = this;

        if (!utils.isIos) {
          // 注销ios推送
          self.$post("iosViop","",{
          }).then((res)=>{
          });
        }

        if(window.CYJ.token) {
          self.setUserToken(CYJ.token());
          // self.setUserSign(CYJ.userSign(mDate));
          self.$router.push('/ma-hu-index');//跳到主页
        }else {
          if(!self.$store.state || !self.$store.state.user || !self.$store.state.user.userToken){
            self.myRouter('login');
          }else{
            self.$router.push('/ma-hu-index');//跳到主页
          }
        }

        self.$post("common","/infos", {
        }).then((res)=> {
          let plotIDList = [];
          res.data.plots.forEach((item,index,arr) => {
            plotIDList.push(item.plotID);
            if(res.data.plots.length === index+1) {
              let plotIDListStr = "";
              if(plotIDList.length>0) {
                plotIDList.forEach((item,index) => {
                  if (index===0) {
                    plotIDListStr = plotIDListStr + item;
                  } else {
                    plotIDListStr = plotIDListStr + "," + item;
                  }
                  if(plotIDList.length === index+1) {
                    plotIDListStr = plotIDListStr + "," + res.data.infos.pushPropertyManagePlot;
                    console.log(plotIDListStr);
                    utils.setPushAlias(res.data.infos.userPhone, plotIDListStr);//注册推送
                  }
                });
              } else {
                if(res.data.infos.pushPropertyManagePlot) {
                  utils.setPushAlias(res.data.infos.userPhone, res.data.infos.pushPropertyManagePlot);//注册推送
                } else {
                  utils.setPushAlias(res.data.infos.userPhone, "");//注册推送
                }
              }
            }
          });

          self.setUserInfo(res.data);
          self.setUserNickName(res.data.infos.nickName);
          self.setUserRealName(res.data.infos.realName);
          self.setUserHeadPortrait(res.data.infos.headPortrait);
          self.setUserPhone(res.data.infos.userPhone);
          self.setUserIdCard(res.data.infos.idcard);
          // self.setUserHasProprietor(false);
          self.setUserHasProprietor(res.data.infos.hasProprietor);
          let plots = [...res.data.plots];
          self.setUserPlotList(plots);
          let familyPlotList = [];
          for (let count = 0; count < plots.length; count++) {
            familyPlotList.push({
              value: plots[count].plotID,text: plots[count].plotName,plotId: plots[count].plotID
            })
          }
          self.setFamilyPlotList(familyPlotList);
          let areaTypes = [];
          res.data.infos.areaTypes.forEach((item)=>{
            if(item === 0) {
              areaTypes.push(0);
            }
            else if(item === 1){
              areaTypes.push(1);
            }
          });
          if(res.data.infos.propertyManage===1) {
            areaTypes.push(2);
          }
          self.setAreaTypesList(areaTypes);

          self.setPropertyManagePlotNumber(res.data.infos.propertyManagePlotNumber);
          self.setPropertyManagePlotName(res.data.infos.propertyManagePlotName);

          utils.localStorage('userInfo', res.data).then((r) => {
            // console.log("userInfo获取成功",r);
            //
            // self.$router.push('/my-home');//跳到主页
          });

          // if(utils.isIos()) {
          //   setTimeout(() => {
          //     if(self.mUserInfo===null || self.mUserInfo===undefined)
          //     {
          //       const toast = this.$createToast({
          //         type: 'warn',
          //         txt: "初始化 没有userInfo"
          //       });
          //       toast.show();
          //     } else {
          //       if(self.mUserInfo.infos===null || self.mUserInfo.infos===undefined)
          //       {
          //         const toast = this.$createToast({
          //           type: 'warn',
          //           txt: "初始化 没有userInfo.infos"
          //         });
          //         toast.show();
          //       } else {
          //         utils.localStorage('userInfo', res.data).then((r) => {
          //           console.log("userInfo获取成功",r);
          //           self.$router.push('/my-home');//跳到主页
          //         });
          //       }
          //     }
          //   }, 300);
          // } else {
          //
          // }
        });
      },

      getPush(res) {//接收推送消息
        console.log(res);
        console.log(Object.prototype.toString.call(res));
        let self = this;
        let mPushRes = Object.prototype.toString.call(res) === '[Object Object]' ? res : JSON.parse(res);
        let subject = mPushRes.PUSH_SUBJECT;
        switch (subject) {
          case "POLICY_MESSAGE":
            console.log("PUSH_SUBJECT","报警消息");
            self.setPushInfo("报警消息： "+new Date());
            self.getNewAlert();
            break;
          case "MAINTAIN_MESSAGE":
            console.log("PUSH_SUBJECT","维保消息");
            self.setPushInfo("维保消息： "+new Date());
            break;
          case "MACHINE_STATE":
            console.log("PUSH_SUBJECT","主机状态");
            self.setPushInfo("主机状态： "+new Date());
            if(mPushRes.areaName || mPushRes.machineName) {
              const toast = self.$createToast({
                type: "correct",
                // txt: mPushRes.areaName+" "+mPushRes.machineName+" "+mPushRes.status+" 已成功"
                txt: mPushRes.machineName+" "+mPushRes.status+" 已成功"
              });
              toast.show();
            }
            break;
          case "NOTICE_MESSAGE":
            console.log("PUSH_SUBJECT","物业消息");
            self.setPushInfo("物业消息： "+new Date());
            break;
          case "VISITOR_MESSAGE":
            console.log("PUSH_SUBJECT","访客消息");
            self.setPushInfo("访客消息： "+new Date());
            if(mPushRes.notify && (mPushRes.notify==="开门通知" || mPushRes.notify==="访客出入记录")) {
              const toast = self.$createToast({
                type: "correct",
                txt: mPushRes.message
              });
              toast.show();
            }
            break;
          case "FEEDBACK_MESSAGE":
            console.log("PUSH_SUBJECT","用户反馈消息");
            self.setPushInfo("用户反馈消息： "+new Date());
            break;
          case "FEEDBACK_MESSAGE_SERVICE":
            console.log("PUSH_SUBJECT","物管反馈消息");
            self.setPushInfo("物管反馈消息： "+new Date());
            break;
          case "JOIN_COMMUNITY":
            console.log("PUSH_SUBJECT","加入社区");
            self.getCommonInfos();//刷新用户信息
            self.setPushInfo("加入社区： "+new Date());
            break;
          case "DOMICILE_MESSAGE":
            console.log("PUSH_SUBJECT","住宅消息");
            self.getCommonInfos();//刷新用户信息
            self.setPushInfo("住宅消息： "+new Date());
            break;
          case "CALL_OPEN_DOOR_SERVER":
            console.log("PUSH_SUBJECT","备城门开门");
            self.setPushInfo("备城门开门： "+new Date());
            if(mPushRes.message) {
              const toast = self.$createToast({
                type: "correct",
                txt: mPushRes.message
              });
              toast.show();
            }
            break;
          default:
            break;
        }
      },
      clickPush(res) {//接收点击后推送消息
        console.log(res);
        let self = this;
        let mPushRes = Object.prototype.toString.call(res) === '[Object Object]' ? res : JSON.parse(res);
        let subject = mPushRes.PUSH_SUBJECT;
        console.log(subject);
        switch (subject) {
          case "POLICY_MESSAGE":
            console.log("PUSH_SUBJECT","报警消息");
            utils.localStorage("myWordInfoNum", mPushRes.PUSH_KEY);
            if(utils.isEmptyAddStrAddObj(mPushRes.alertMessageStatus) || utils.isEmptyAddStrAddObj(mPushRes.machineAreaNumber)) {
              self.$router.push({ path: "/ma-hu-index/work/work-details", query: {messageType:"报警"}});
            } else {
              if(mPushRes.alertMessageStatus === "0") {
                if (self.mAppPath==="/ma-hu-index/work") {
                  self.setPushInfo("报警消息： "+ new Date());
                } else {
                  self.setMyHomeWork({alertTab: 1, maintainTab: 0});
                  self.$router.push({ path: "/ma-hu-index/work",
                    query: { areaNumber: mPushRes.machineAreaNumber, tabChoose: 1}});
                }
              } else {
                self.$router.push({ path: "/ma-hu-index/work/work-details", query: {messageType:"报警"}});
              }
            }
            break;
          case "MAINTAIN_MESSAGE":
            console.log("PUSH_SUBJECT","维保消息");
            utils.localStorage("myWordInfoNum", mPushRes.PUSH_KEY);
            if(utils.isEmptyAddStrAddObj(mPushRes.maintainMessageStatus) || utils.isEmptyAddStrAddObj(mPushRes.maintainAreaNumber)) {
              self.$router.push({ path: "/ma-hu-index/work/work-details", query: {messageType:"维保"}});
            } else {
              if(mPushRes.maintainMessageStatus === "0") {
                if (self.mAppPath==="/ma-hu-index/work") {
                  self.setPushInfo("维保消息： "+ new Date());
                } else {
                  self.setMyHomeWork({alertTab: 0, maintainTab: 1});
                  self.$router.push({ path: "/ma-hu-index/work",
                    query: { areaNumber: mPushRes.maintainAreaNumber, tabChoose: 2}});
                }
              } else {
                self.$router.push({ path: "/ma-hu-index/work/work-details", query: {messageType:"维保"}});
              }
            }
            break;
          case "MACHINE_STATE":
            console.log("PUSH_SUBJECT","主机状态");//todo 判断布撤防
            // const toast = self.$createToast({
            //   type: "correct",
            //   // txt: mPushRes.areaName+" "+mPushRes.machineName+" "+mPushRes.status+" 已成功"
            //   txt: mPushRes.machineName+" "+mPushRes.status+" 已成功"
            // });
            toast.show();
            if(this.mAppPath==="/ma-hu-index") {
              self.setPushInfo("主机状态： "+ new Date());
            } else {
              // utils.changePage("my-home");
            }
            break;
          case "NOTICE_MESSAGE":
            console.log("PUSH_SUBJECT","物业消息");
            if(this.mAppPath==="/ma-hu-service") {
              self.setPushInfo("物业消息： "+ new Date());
            } else {
              // utils.changePage("service");
            }
            break;
          case "VISITOR_MESSAGE":
            console.log("PUSH_SUBJECT","访客消息");
            if(this.mAppPath==="/ma-hu-index") {
              self.setPushInfo("访客消息： "+ new Date());
            } else {
              utils.changePage("ma-hu-index");
            }
            break;
          case "FEEDBACK_MESSAGE":
            console.log("PUSH_SUBJECT","用户反馈消息");
            if(this.mAppPath==="/service-index/feedback") {
              self.setPushInfo("用户反馈消息： "+ new Date());
            } else {
              utils.localStorage('plotId', mPushRes.mPushPlotId);
              self.$router.push({ path: "/service-index/feedback"});
            }
            break;
          case "FEEDBACK_MESSAGE_SERVICE":
            console.log("PUSH_SUBJECT","物管反馈消息");
            if(this.mAppPath==="/service-index/feedback-apply-list") {
              self.setPushInfo("物管反馈消息： "+ new Date());
            } else {
              utils.localStorage('plotId', mPushRes.mPushPlotId);
              self.$router.push({ path: "/service-index/feedback-apply-list"});
            }
            break;
          case "JOIN_COMMUNITY":
            console.log("PUSH_SUBJECT","加入社区");
            if(this.mAppPath==="/mine/community-add-manage") {
              self.setPushInfo("加入社区： "+ new Date());
            } else {
              self.$router.push({ path: "/mine/community-add-manage"});
            }
            break;
          case "DOMICILE_MESSAGE":
            console.log("DOMICILE_MESSAGE","住宅消息");
            break;
          case "CALL_OPEN_DOOR_SERVER":
            console.log("PUSH_SUBJECT","备城门开门");
            break;
          default:
            break;
        }
      },

      switchTo(path){
        this.$router.replace(path);
        // this.$router.push(path);
      },
      minePopClose(e) {
        this.setIsShowMinePop(e.isPopShow);
      },

      getNewAlert() {
        let self = this;
        self.$post("alertMessage","/getNewAlert",{
        }).then((res)=>{
          console.log("接口/getNewAlert",res);
          if (res.data.length>0) {
            res.data.forEach((item) => {
              self.popTitle = "";
              self.popType = item.alertType==="紧急"?"alarmProcessingExigency":"alarmProcessing";
              self.popPlainText = item.alertPlace+" 发生报警，";
              self.popPlainText2 = "请及时处理";
              self.popCancelText = "进入报警消息";
              self.popSureText = item.alertType==="紧急"?"确定":"立即出警";
              self.newAlertNumber = item.alertNumber;
              self.areaNumber = item.areaNumber;
              self.isShowCloseIcon = false;//
              console.log("接口chenggong","/getNewAlert");
              this.setIsShowOtherPop(true);
              // utils.maskTabShow().then((e)=>{
                this.isPopShow = true;
              // });
            });
          }
        });
      },
      //弹出对话框的点击方法
      leftBtnPoppup(e) {
        let self = this;
        switch (this.popType) {
          case 'alarmProcessingExigency'://发生紧急报警
            self.$post("alertMessage", "/confirmAlert", {
              alertNumber: self.newAlertNumber
            }).then((res) => {
              self.setMyHomeWork({alertTab: 1, maintainTab: 0});
              self.$router.push({ path: "/my-home/work", query: {areaNumber: self.areaNumber, tabChoose: 1}});
            });
            break;
          case 'alarmProcessing'://发生报警
            self.$post("alertMessage", "/confirmAlert", {
              alertNumber: self.newAlertNumber
            }).then((res) => {
              self.setMyHomeWork({alertTab: 1, maintainTab: 0});
              self.$router.push({ path: "/my-home/work", query: {areaNumber: self.areaNumber, tabChoose: 1}});
            });
            break;
          case 'callSecure'://请求出警
            self.$post("alertMessage", "/confirmAlert", {
              alertNumber: self.newAlertNumber
            }).then((res) => {
              self.setMyHomeWork({alertTab: 1, maintainTab: 0});
              self.$router.push({ path: "/my-home/work", query: {areaNumber: self.areaNumber, tabChoose: 1}});
            });
            break;
          default:
            break;
        }
        self.setIsShowOtherPop(false);
        // utils.maskTabHide().then((e)=>{
          self.isPopShow = false;
          self.clearPoppupParameter();
        // });
      },
      rightBtnPoppup(e) {
        let self = this;
        switch (this.popType) {
          case 'alarmProcessingExigency'://发生紧急报警
            self.$post("alertMessage", "/confirmAlert", {
              alertNumber: self.newAlertNumber
            }).then((res) => {
              self.setIsShowOtherPop(false);
              // utils.maskTabHide().then((e)=>{
                self.isPopShow = false;
                self.clearPoppupParameter();
              // });
            });
            break;
          case 'alarmProcessing'://发生报警
            self.popType = "callSecure";
            self.popTitle = "请求出警";
            self.popPlainText = "出警后请保持手机畅通，安保会随时与您联系协助警情处理！";
            self.popCancelText = "查看报警消息";
            self.popSureText = "确定";
            self.isShowCloseIcon = false;
            // utils.maskTabShow().then((e)=>{
            //   self.isPopShow = true;
            //   self.clearPoppupParameter();
            // });
            break;
          case 'callSecure'://请求出警
            self.isShowCloseIcon = false;
            self.$post("alertMessage", "/callSecure", {
              number: self.newAlertNumber
            }).then((res) => {
              self.setPushInfo("出警消息： "+new Date());
              const toast = this.$createToast({
                type: "correct",
                txt: "已成功申请出警"
              });
              toast.show();
            });
            self.setIsShowOtherPop(false);
            // utils.maskTabHide().then((e)=>{
              self.isPopShow = false;
              self.clearPoppupParameter();
            // });
            break;
          default:
            break;
        }
      },
      closePoppup(e) {
        this.setIsShowOtherPop(false);
        // utils.maskTabHide().then((e) => {
          this.isPopShow = false;
        // });
        this.clearPoppupParameter();
      },
      clearPoppupParameter() {
        this.popTitle = "";
        this.popType = "";
        this.popCancelText = "";
        this.popSureText= "";
        this.isShowCloseIcon = false;
        this.closeIconStyle = "";
        this.popPlainText = "";
        this.popPlainText2 = "";
        this.areaNumber = "";
      }
    }
  };
</script>

<style lang="stylus">
  #app {
    /*width: 100vw;*/
    /*height: 100vh;*/
    box-sizing: content-box;
    font-family: main, NSimSun, KaiTi_GB2312, Helvetica, Arial, sans-serif;
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: rgba(245, 245, 245, 1);
    color: #2c3e50;
  }
  .cube-swipe-btn {
    width: 21.33vw!important;
    border-radius: 1.07vw!important;
    background-color: transparent!important;
    background: url('~@/assets/notification/bgco.png')!important;
    background-size: cover!important;
    left: calc(100% + 2.5vw)!important;
    text-align: center!important;
  }
  /*.bottom-tab {
    width: 100%;
    height: 13.077777vw;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 11;
  }*/
  .bottom-tab
    width 100vw
    height 14.933vw
    background-color #fff
    position fixed
    left 0
    bottom 0
    display flex
    z-index 11;
    box-sizing:border-box;
    &.border-top-1px::before{
        border-color: #eee;
    }

    .tab-item
      display flex
      flex 1
      flex-direction column
      align-items center
      justify-content center
      font-size: 3.2vw;
      color #666
      span{
          font-weight:bold;
      }
      img
        width: 6.933vw;
        height: 6.933vw
        margin-bottom: 1.067vw;
      .on
        color #3388FF
      &:active{
          background: #f4f4f4;}

</style>



