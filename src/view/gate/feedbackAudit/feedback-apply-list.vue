<!--@Time  : 2019/10/10 15:54-->
<!--@Author: michael huang-->
<!--@File  : feedback-apply-list.vue-->

<template>
  <div class="wrapper-white" style="background-color: #F5F5F5">
    <return-head title="业主反馈"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll v-if="feedbackList.length>0"
                   ref="feedbackApplyScroll"
                   :data="feedbackList"
                   :options="myFamilyServiceScrollOptions"
                   :fade="true">
        <div style="height: 1vw"></div>
        <div v-for="(item,index) in feedbackList" :key="index"
             class="base-horizontal-layout-general div_box"
             style="height: 18.6666vw;background-color: white;border-radius: 1.066vw;
                    margin:1.6vw 1.3vw 0 1.3vw;padding: 4vw;box-sizing: border-box"
             @click="toAudit(item.feedbackId)">
          <img :src="item.feedbackType===0 ? require('./icon-complaint.png') :
                     item.feedbackType===1 ? require('./icon-guarantee.png') :
                     item.feedbackType===2 ? require('./iocn-suggest.png') : ''"
               style="width: 10.6666vw;height: 10.6666vw">
          <div class="base-vertical-layout-space-between" style="margin-left: 2.1333vw">
            <div class="base-horizontal-layout-space-between-item-center" style="width: 76.7333vw">
              <p class="feedback-apply-title-text"
              >{{item.feedbackType===0 ? '投诉' : item.feedbackType===1 ? '保修' : item.feedbackType===2 ? '建议' : ''}}</p>
              <div class="base-horizontal-layout-right" style="width: 70vw">
                <p class="feedback-apply-plot-text" style="width: 30vw;margin-right: 2vw">{{item.plotName}}</p>
                <p class="base-text-details-normal-gray" style="width: 26vw;">{{item.date}}</p>
              </div>
            </div>
            <div class="base-horizontal-layout-space-between-item-center">
              <p class="feedback-apply-content-text" style="width: 70.7333vw">{{item.content}}</p>
              <div v-if="item.auditStatus===0" class="jiao_css">
                <img :src="require('@/assets/community/jiao.png')">
              </div>
            </div>

          </div>
        </div>
      </cube-scroll>
      <div v-else>
        <message-empty></message-empty>
      </div>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import messageEmpty from '_c/blank/message-empty';
  import { mapState } from 'vuex';

  export default {
    name: "feedback-apply-list",
    components: {returnHead,messageEmpty},
    data() {
      return {
        feedbackList: [],
        myFamilyServiceScrollOptions: {
          
        }
      }
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if(localStorage.getItem("feedbackRead")) {
          this.getFeedbackList();
          localStorage.removeItem("feedbackRead");
        }
      }
    },
    computed: {
      ...mapState({
        'mUserInfo': state => state.user.userInfo,
      })
    },
    created() {
    },
    mounted() {
      this.getFeedbackList();
    },
    methods: {
      getFeedbackList() {
        let self = this;
        if(self.mUserInfo.infos.propertyManagePlotNumber){
          self.$post("gateCommunity", "/feedback/list", {
            plotId: self.mUserInfo.infos.propertyManagePlotNumber,//todo 要改成独立出来的全局数据 ="8d4fa1263fc64e28804837429948b931",
            page: 1,
            pageSize: 100
          }).then((res) => {
            self.feedbackList = [...res.data.list];
          });
        }
      },

      toAudit(feedbackID) {
        this.$router.push({ path: "/service-index/feedback-apply-list/feedback-apply-audit", query: {feedbackID: feedbackID}});
      }
    }
  }
</script>

<style scoped>
  .feedback-apply-title-text {
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
  .feedback-apply-plot-text {
    font-size: 3.2vw;
    color: #666666;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  }
  .feedback-apply-content-text {
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
  .div_box{
    position: relative;
    overflow: hidden;
    background-color: red;
  }
  .jiao_css{
    width: 3.14vw;
    height: 3.14vw;
    position: absolute;
    top: 1vw;
    right: 0.8vw;
  }
  .jiao_css img{
    width: 100%;
    height: 100%;
  }
</style>