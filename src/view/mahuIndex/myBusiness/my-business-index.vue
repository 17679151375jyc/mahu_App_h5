<!--@Time  : 2019/09/25 17:25-->
<!--@Author: michael huang-->
<!--@File  : my-business-index.vue-->

<template>
  <div>
    <ma-hu-index-nick-name></ma-hu-index-nick-name>

    <!--工单处理模块-->
    <div v-if="myHomeMegList.length>0" class="m-topic-swiper" style="width: 100vw">
      <swiper :options="msgSwiperOption" style="width: 100vw;height: 42.6666vw;background-color: white" ref="alertSwiper">
        <swiper-slide v-for="(item, index) in myHomeMegList" :key="index" style="width: 94%">
          <alert-msg :index="index"
                     :messageInfo="item"
                     @showMsgCollectList="showMsgCollectList"

                     @alertOnClick="alertMsgAlertOnClick"
                     @misAlertOnClick="misAlertMsgAlertOnClick"
                     @maintainOnClick="alertMsgMaintainOnClick"
                     @misMaintainOnClick="misAlertMsgMaintainOnClick"

                     @callAlertPersonnelOnClick="callAlertPersonnelOnClick"

                     @closeMsgOnClick="closeMsgOnClick">
          </alert-msg>
        </swiper-slide>
        <!--<div class="swiper-pagination" style="font-size: 3vw" slot="pagination"></div>-->
      </swiper>
    </div>
    <!--v-if="alertListIngAllLen===0 && maintainListIngAllLen===0"-->
    <div v-else
         style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <div class="base-horizontal-layout-general" style="padding: 4vw 4.8vw 4.7vw 4.8vw;background-color: white">
      <p style="font-size: 4.8vw;color: #666">我的设备</p>
    </div>

    <div class="scroll-wrapper-index-page" style="background: #F5F5F5">
      <cube-scroll v-if="myHomeInfoList.length>0"
                   ref="myBusinessIndexScroll"
                   :data="myHomeInfoList"
                   :options="myBusinessIndexScrollOptions"
                   :fade="true">
        <div style="height:2.6666vw"></div>
        <my-home-item v-for="(item,index) in myHomeInfoList"
                      :key="index"
                      :index="index"
                      :myHomeInfo="item"

                      @serviceMessageOnClick="serviceMessageOnClick"
                      @failureToDeclareOnClick="failureToDeclare"
                      @alarmOnClick="toAlarmBusiness"
                      @stayAlarmOnClick="toStayAlarmBusiness">
        </my-home-item>
      </cube-scroll>
      <div v-else>
        <equipment-empty></equipment-empty>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import alertMsg from '_c/myHome/message/alert-msg';
  import 'swiper/dist/css/swiper.css';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  import maHuIndexNickName from '_c/mahu-index/ma-hu-index-nick-name';
  import myHomeItem from '_c/myHome/my-home-item';
  import guangGaoIndexPage from '_c/blank/guang-gao-index-page';
  import equipmentEmpty from '_c/blank/equipment-empty';
  import { mapState } from 'vuex';

  export default {
    name: "my-business-index",
    components: {
      alertMsg,
      swiper,
      swiperSlide,

      maHuIndexNickName,
      myHomeItem,
      guangGaoIndexPage,
      equipmentEmpty
    },
    props:
      {
        isShow: {
          type: Boolean,
          default: false
        }
      },
    data() {
      return {
        myBusinessIndexScrollOptions: {
          stopPropagation: true//阻止事件冒泡
        },

        alertStyle: {},
        videoUnfoldStyle: {},

        // 工单处理模块
        myHomeMegList: [],
        alertListIngAllLen: 0,
        maintainListIngAllLen: 0,
        msgSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          slidesPerView : "auto",
          centeredSlides: true,

          pagination: {
            el: '.swiper-pagination',

            type: 'fraction',//bullets圆点（默认） //这个不用变成custom值，就可以之定义分页器样式(可爽)
            // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
            // clickable:true,
            // paginationClickable: true,
            // notNextTick:true,

            bulletElement : 'li',
            // modifierClass : 'my-pagination-',
            // bulletClass: 'my-swiper-pagination-bullet',
            // bulletActiveClass: 'my-swiper-pagination-bullet-active'
          },
          // autoplay: { //可选选项，自动滑动
          //   disableOnInteraction: false,
          //   delay: 3000
          // },
          // loop: true,
          // watchSlidesProgress : true,
          speed: 600,
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        myHomeInfoList: [],
      }
    },
    computed: {
      ...mapState({
        'mPushInfo': state => state.user.pushInfo,
        'mAreaTypesList': state => state.user.areaTypesList
      })
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if(localStorage.getItem("workListBusiness")) {
          this.getMyHomeInfoList();
          localStorage.removeItem("workListBusiness");
        }
      },

      mPushInfo() {// 收到推送，刷新页面
        let self = this;
        console.log(self.mPushInfo);
        this.mAreaTypesList.forEach((item)=>{
          if (item===utils.returnTypeBusiness()) {
            self.getHomeMsgList();
            self.getMyHomeInfoList();
          }
        });
      }
    },
    created() {
    },
    mounted() {
      this.mAreaTypesList.forEach((item)=>{
        if (item===utils.returnTypeBusiness()) {
          this.getHomeMsgList();
          this.getMyHomeInfoList();
        }
      });
    },
    methods: {
      getHomeMsgList() {
        let self = this;
        self.$post("alertMessage","/getHomePageList",{
          statusList: [0,2,3,4,5],
          type: utils.returnTypeBusiness()
        }).then((res)=>{
          self.myHomeMegList = [...res.data];
          self.$post("maintainMessage","/getHomePageList",{
            statusList: [0,2,3,4,5],
            type: utils.returnTypeBusiness()
          }).then((res)=>{
            res.data.forEach((item)=>{
              self.myHomeMegList.push(item);
            });
          });
        });
      },
      getMyHomeInfoList () {
        let self = this;
        self.$post("hArea","/getMyAreaLists",{type:utils.returnTypeBusiness()}).then((res)=>{
          self.myHomeInfoList = [...res.data];
          console.log("my-business接口","/getMyAreaLists");
        });
      },

      /*** 消息操作 ***/
      alertMsgAlertOnClick(e) {//消息中点击报警
        const self = this;
        self.$emit('alertMsgAlertOnClick', {alertMsgNumber: e.number, name: e.name});
      },
      misAlertMsgAlertOnClick(e) {//消息中点击误报
        const self = this;
        self.$emit('misAlertMsgAlertOnClick', {alertMsgNumber: e.number});
      },
      callAlertPersonnelOnClick(e) {//消息中点击联系安保、维保
        const self = this;
        self.$emit('callAlertPersonnelOnClick', {phone: e.phone, messageType: e.messageType});
      },
      alertMsgMaintainOnClick(e) {//消息中点击申报维修、修改预约时间
        const self = this;
        self.$emit('alertMsgMaintainOnClick', {alertMsgNumber: e.number, alertMsgName: e.name,
          alertMsgContent: e.content, alertMsgOrderTime: e.orderTime});
      },
      misAlertMsgMaintainOnClick(e) {//消息中点击忽略
        const self = this;
        self.$emit('misAlertMsgMaintainOnClick', {alertMsgNumber: e.number});
      },
      showMsgCollectList(e) {//消息中点击消息汇总
        const self = this;
        self.$emit('showMsgCollectList', {type: e.type,number: e.number,location: e.location});
      },
      closeMsgOnClick(e) {//消息中点击关闭消息
        const self = this;
        self.$emit('closeMsgOnClick', {homeIndex: self.index, alertMsgIndex: e.index, alertMsgNumber: e.number, messageType: e.messageType});
      },

      /*** 主机操作 ***/
      serviceMessageOnClick(e) {
        this.$emit('serviceMessageOnClick', { areaNumber: e.areaNumber });
      },
      failureToDeclare(e) {//点击申报维修
        this.$emit('failureToDeclareOnClick', {machineAccount: e.machineAccount, machineInstallCode: e.machineInstallCode});
      },
      toAlarmBusiness(e) {
        this.$emit('alarmOnClick', {isAlarm: e.isAlarm, machineNumber: e.machineNumber});
      },
      toStayAlarmBusiness(e) {
        this.$emit('stayAlarmOnClick', {isAlarm: e.isAlarm, machineNumber: e.machineNumber});
      },

      getMessageIngInfo() {//获取所有区域正在进行的所有消息
        let self = this;
        self.$post("alertMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: 0,page: self.page,rows: self.rows
        }).then((res)=>{
          self.alertListIngAllLen = [...res.data].length;
        });
        self.$post("maintainMessage","/getLists",{
          areaNumber: self.areaNumber,selectType: 0,page: self.page,rows: self.rows
        }).then((res)=>{
          self.maintainListIngAllLen = [...res.data].length;
        });
      },

      tabOnClick(index,label) {
        this.tabLabels.forEach((item)=>{
          item.isHighlight = false;
        });
        this.tabLabels[index].isHighlight = true;
        this.selectedLabel = label;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cube-tab-bar {
    width: 100%;
    height: 13.3333vw;
    justify-content: space-between;
    background-color: white;
  }

  >>>.cube-tab {
    width: 20vw;
    color: #CCC;
    font-size: 4.2666vw;
    font-weight: bold !important;
    flex: 1;

    &.cube-tab_active {
      color: #666;
      font-weight: bold !important;
    }
  }

  >>>.cube-tab-bar-slider {
    background: linear-gradient(to left, #42DBC4, #30C9FF);
    width: 2vw !important;
    margin: 0 0 1.6vw 16vw;
  }
</style>

<style scoped>

</style>