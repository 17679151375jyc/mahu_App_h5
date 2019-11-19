<template>
  <div class="wrapper">
    <return-head title="消息详情"></return-head>

    <div class="scroll-wrapper" style="top: 16.7333vw">
      <cube-scroll
        ref="scroll"
        :style="defaultStyle"
        :options="scrollOptions"
        :fade="true"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <property-details-item v-for="(item,index) in propertyDetailsArr"
                               :key="index"
                               :index="index"
                               :item="item"
                               @deleteItem="deletePropertyItem">
        </property-details-item>
        <div style="height: 5.33vw"></div>
      </cube-scroll>
    </div>

    <!--<div class="property-details-call-img">-->
      <!--<img :src="require('./call.png')" style="width: 19.2vw;height: 19.2vw" @click="callProperty">-->
    <!--</div>-->


    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw" v-html="popPlainText"></p>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import propertyDetailsItem from '_c/service/property/property-details-item';
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "propertyDetails",
    components: {
      returnHead,
      propertyDetailsItem,
      basePopup
    },
    data() {
      return {
        defaultStyle: {
          fontSize: "3.2vw",
          color: "rgba(51, 136, 255, 1)"
        },
        // scrollOptions: {
        //   observeDOM: true,
        //   click: true,
        //   probeType: 1,
        //   scrollbar: false,
        //   pullDownRefresh: {
        //     stopTime: 500,
        //     txt: `刷新成功`
        //   },
        //   pullUpLoad: {
        //     stopTime: 500,
        //     txt: `加载成功`
        //   },
        // },
        scrollOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
        },

        propertyDetailsArr: [],
        plotId: '',
        // noticeTypeId: '',
        noticeId: '',
        lastNoticeId: '0',
        pageSize: 10,

        isPopShow: false,
        refId: 'propertyDetailsPopup',
        popTitle: '',
        popPlainText: '',
        propertyItemId: '',
        propertyItemIndex: 0
      }
    },
    created() {
      this.plotId = JSON.parse(localStorage.getItem('property')).plotId;
      // this.noticeTypeId = JSON.parse(localStorage.getItem('property')).noticeTypeId;
      this.noticeId = JSON.parse(localStorage.getItem('property')).noticeId;
      localStorage.removeItem('property');
    },
    mounted() {
      let self = this;
      utils.hideTab();
      self.init(false);
    },
    methods: {
      // init(isLoading) {
      //   let self = this;
      //   self.$post("community","/notice/list",{
      //     plotId: self.plotId,
      //     noticeTypeId: self.noticeTypeId,
      //     lastNoticeId: self.lastNoticeId,
      //     pageSize: self.pageSize
      //   }).then((res)=>{
      //     if (res.data.list.length === 0) {
      //       return;
      //     } else {
      //       if (isLoading) {
      //         self.propertyDetailsArr.push.apply(self.propertyDetailsArr,res.data.list);
      //       } else {
      //         self.propertyDetailsArr = [...res.data.list];
      //       }
      //     }
      //   });
      // },
      init(isLoading) {
        let self = this;
        self.$post("community","/notice/search",{
          plotId: self.plotId,
          noticeNumber: self.noticeId,
          lastNoticeId: self.lastNoticeId,
          pageSize: self.pageSize
        }).then((res)=>{
          if (res.data.list.length === 0) {
            return;
          } else {
            if (isLoading) {
              self.propertyDetailsArr.push.apply(self.propertyDetailsArr,res.data.list);
            } else {
              self.propertyDetailsArr = [...res.data.list];
            }
          }
        });
      },

      deletePropertyItem(e) {
        this.isPopShow = true;
        this.popTitle = "删除消息";
        this.popPlainText = "您确定要删除该消息吗？";
        this.propertyItemId = e.propertyItemId;
        this.propertyItemIndex = e.index;
      },
      callProperty() {
        this.isPopShow = true;
        this.popTitle = "客服热线";
        //todo 调用接口获取电话号码和打电话
        this.popPlainText = "即将拨号<br/>0750-3512345";
      },
      leftBtnPoppup() {
        this.isPopShow = false;
      },
      rightBtnPoppup() {
        //todo 调用删除接口
        this.propertyDetailsArr.splice(this.propertyItemIndex,1);
        this.isPopShow = false;
      },

      // 刷新
      onPullingDown() {
        setTimeout(() => {
          this.lastNoticeId = "0";
          this.init(false);
          this.$refs.scroll.forceUpdate(true);
        }, 1000);
      },
      onPullingUp() {
        setTimeout(() => {
          this.lastNoticeId = this.propertyDetailsArr[this.propertyDetailsArr.length-1].noticeId;
          this.init(true);
          this.$refs.scroll.forceUpdate(true);
        }, 1000);
      },
    }
  }
</script>

<style scoped>
  .property-details-call-img {
    position: fixed;
    top: 91.4667vw;
    right: 4.27vw;
    z-index: 11;
  }
</style>