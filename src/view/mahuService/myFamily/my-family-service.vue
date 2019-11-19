<!--@Time  : 2019/09/27 14:09-->
<!--@Author: michael huang-->
<!--@File  : my-family-service.vue-->

<template>
  <div>
    <div style="width: 100%;padding: 2.6666vw;box-sizing: border-box;background-color: white">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <div class="base-horizontal-layout-space-between-item-center"
         style="height:13.0666vw;padding: 0 5.3333vw;background-color: white;box-sizing: border-box">
      <!--<p style="font-size: 4.8vw;color: #666;font-weight: bold">物管通知</p>-->
      <div v-if="plotOptions.length>0">
        <p v-if="plotOptions.length===1" class="base-text-details-large-black-666">{{choosePlotName}}</p>
        <div v-else
             class="base-horizontal-layout-space-between-item-center title_pto"
             style="width: 53.4666vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
             @click="choosePlotPicker">
          <p class="base-text-details-large-black-666" style='margin-left: 2vw'>{{choosePlotName}}</p>
          <img :src="require('@/assets/notification/icon_bottom.png')" style='margin-right: 2vw'>
        </div>
      </div>
      <div class="base-horizontal-layout-right"
           style="width: 20vw;height: 6vw"
           @click="toFeedback">
        <img :src="require('@/assets/icon/icon-menu-blue.png')"
             class="base-icon-large-style">
      </div>
    </div>

    <div class="scroll-wrapper-service-page">
      <cube-scroll v-if="noticeList.length>0"
                   ref="myFamilyServiceScroll"
                   :data="noticeList"
                   :options="myFamilyServiceScrollOptions">
        <div style="height: 1vw"></div>
        <div v-for="(item,index) in noticeList" :key="index"
             class="base-horizontal-layout-general"
             style="height: 18.6666vw;background-color: white;border-radius: 1.066vw;
                    margin:1.6vw 1.3vw 0 1.3vw;padding: 4vw;box-sizing: border-box"
             @click="toFamilyNotificationDetail(item.noticeId)">
          <img :src="item.iconUrl" style="width: 10.6666vw;height: 10.6666vw">
          <div class="base-vertical-layout-space-between" style="margin-left: 2.1333vw">
            <div class="base-horizontal-layout-space-between-item-center" style="width: 76.7333vw">
              <p class="my-family-service-title-text" style="width: 40vw">{{item.titleUtf32}}</p>
              <p class="base-text-details-normal-gray">{{item.postDate}}</p>
            </div>
            <div class="my-family-service-content-text" style="width: 59.7333vw">{{item.contentUtf32 | filterHTMLTag}}</div>
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
  import { mapState } from 'vuex';

  export default {
    name: "my-family-service",
    components: {guangGaoIndexPage,messageEmpty},
    data() {
      return {
        plotOptions: [],
        choosePlotName: '',
        choosePlotId: '',
        choosePlotIndex: 0,
        myFamilyServiceScrollOptions: {
          stopPropagation: true//阻止事件冒泡
        },
        noticeList: [],
      }
    },
    computed: {
      ...mapState({
        'mFamilyPlotList': state => state.plot.familyPlotList,
        'mUserHasProprietor': state => state.user.userHasProprietor
      })
    },    
    filters:{
      filterHTMLTag: (msg)=> {
        if(msg){
          var msg = msg.replace(/<img[^>]*>/gi, '[图片]');
          msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
          msg = msg.replace(/[|]*\n/, '') //去除行尾空格
          msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
        }else{
          msg = '[图片]'
        }
        return msg;
      }
    },
    mounted() {
      let self = this;
      self.plotOptions = self.mFamilyPlotList;
      self.choosePlotName = self.plotOptions[0].text;
      self.getInfo(self.plotOptions[0].plotId);
      localStorage.setItem("plotId",self.plotOptions[0].plotId);
    },
    created() {
    },
    methods: {
      getInfo(plotId) {
        let self = this;
        self.$post("community","/notice/getNotice",{
          plotId: plotId,
          nowTime: 0
        }).then((res)=>{
          self.noticeList = [...res.data.list];
          console.log(self.noticeList)
          self.noticeList.forEach((item) => {
            if(item && item.title){
              item.titleUtf32 = unescape(item.title.replace(/\\u/g,"%u"));//todo 暂时这样直接转成utf32 之后要做子组件
            }
            if(item && item.content){            
              item.contentUtf32 = unescape(item.content.replace(/\\u/g,"%u"));
            }
          })
        });
      },

      choosePlotPicker() {//选择社区
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '选择社区',
            data: [this.plotOptions],
            selectedIndex: [this.choosePlotIndex],
            onSelect: this.plotSelectHandle,
            onCancel: this.plotCancelHandle
          })
        }
        this.picker.show()
      },
      plotSelectHandle(selectedVal, selectedIndex, selectedText) {
        this.choosePlotName = this.plotOptions[selectedIndex].text;
        this.choosePlotId = this.plotOptions[selectedIndex].plotId;
        localStorage.setItem("plotId",this.choosePlotId);
        this.choosePlotIndex = selectedIndex;
        this.getInfo(this.choosePlotId);
        this.picker = undefined;
      },
      plotCancelHandle() {
        this.picker = undefined;
      },

      toFamilyNotificationDetail(noticeNumber) {
        console.log("sdsdasdasdasd",noticeNumber)
        this.$router.push({ path: "/service-index/family-notification-detail", query: {noticeNumber: noticeNumber}});
      },

      toFeedback() {
        if(this.mUserHasProprietor) {
          this.$router.push({path: "/service-index/feedback"});
        } else {
          this.hasProprietorToast();
        }
      },
      hasProprietorToast() {
        const toast = this.$createToast({
          type: "warn",
          txt: "需要先加入社区，才能使用此功能"
        });
        toast.show();
      },
    }
  }
</script>

<style scoped>
  .my-family-service-title-text {
    width: 44vw;
    font-size: 4.2667vw;
    height: 5.6vw;
    line-height: 5.6vw;
    color: #666;
    font-weight: bold;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  }
  .my-family-service-content-text {
    width: 100%;
    color: #999;
    font-size: 3.7333vw;
    height: 4.2667vw;
    line-height: 4.2667vw;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  } 
  .title_pto img{
    float: right;
    width: 2vw;
    height: 1.2vw;
    margin: 3.2vw 0 3.2vw 1vw;
  }
</style>