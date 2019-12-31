<template>
  <div class="wrapper">
    <return-head title="问题反馈"><!--@rightBtnOnClick="toAddFeedback"-->
      <!--<div slot="menu" class="feed-hand">-->
        <!--<div class="icon">-->
          <!--<i class="iconfont icon_edit"></i>-->
        <!--</div>-->
      <!--</div>-->
    </return-head>

    <div style="flex: 1">
      <div v-if="feedbackList.length>0" class="scroll-wrapper-addition-title">
        <cube-scroll
          ref="feedbackScroll"
          class="scroll-wrapper-text-style"
          :options="options"
          :data="feedbackList"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <div v-for="(item,index) in feedbackList" :key="index">
            <feedback-item :feedback="item" :index="index" @deleteFeedback="deleteFeedback" @pathLinkPage='pathLink(index)'></feedback-item>
          </div>
          <p v-if="isNotLoading" class="base-text-title-normal-gray" style="margin-top: 4vw;text-align: center">—————我是有底线的—————</p>
          <!--TODO 支撑高度-->
          <div style="height: 20vw"></div>
        </cube-scroll>
      </div>
      <div v-else class="base-vertical-layout-center-item-center" style="width: 100%">
        <img :src="require('./blank-doll.png')" style="width: 43.2vw;height: 43.47vw;margin-top: 8.53vw">
        <p class="base-text-title-normal-gray">暂无问题反馈</p>
      </div>
    </div>

    <div class="base-button-fixed-bottom-bk-gray">
      <button-main text="添加反馈" @btnOnclick="addFeedback"></button-main>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import returnHead from "_c/head/return-head";
  import FeedbackItem from "_c/service/feedback-item";
  import buttonMain from '_c/button/button-main';
  import basePopup from '_c/popup/base-popup';
  import { mapState } from "vuex";

  export default {
    name: "serviceFeedback",
    components: { FeedbackItem, returnHead, buttonMain, basePopup },
    data() {
      return {
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: {
            stopTime: 500,
            txt: `加载成功`
          },
        },

        feedbackList: [],
        feedbackIndex: -1,
        feedbackId: '',
        page: 1,
        pageSize: 10,
        isNotLoading: false,

        isPopShow: false,
        refId: 'feedBackPopup',
        popTitle: '',
        popPlainText: '',
      };
    },
    created() {
      utils.hideTab();
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if(localStorage.getItem("feedbackChange")) {
          this.getInfo(1);
          localStorage.removeItem("feedbackChange");
        }
      }
    },
    computed: {
      ...mapState({
        'mUserHasProprietor': state => state.user.userHasProprietor,
        'mUserPlotList': state => state.user.userPlotList,
        'mIsPlotBlankDomicile': state => state.plot.isPlotBlankDomicile
      })
    },
    mounted() {
      let self = this;
      self.getInfo(1);
    },
    methods: {
      getInfo(page) {
        let self = this;
        self.isNotLoading = false;
        self.page = 1;
        self.plotId = localStorage.getItem("plotId");
        self.$post("community","/feedback/list",{plotId: self.plotId,page: page,pageSize: self.pageSize}).then((res)=>{
          self.feedbackList = [...res.data.list];
        });
      },
      getInfoLoad(page) {
        let self = this;
        self.plotId = localStorage.getItem("plotId");
        self.$post("community","/feedback/list",{plotId: self.plotId,page: page,pageSize: self.pageSize}).then((res)=>{
          if (res.data.list.length===0) {
            self.isNotLoading = true;
          } else {
            res.data.list.forEach((item) => {
              self.feedbackList.push(item);
            });
          }
        });
      },

      deleteFeedback(e) {
        this.isPopShow = true;
        this.popTitle = '提示';
        this.popPlainText = '是否删除该条反馈？';
        this.feedbackIndex = e.index;
        this.feedbackId = e.feedbackId;
      },
      leftBtnPoppup() {
        this.clearPoppup();
      },
      rightBtnPoppup() {
        // this.getInfo(1);
        let self = this;
        self.$post("community","/feedback/delete",{
          feedbackId: self.feedbackId
        }).then((res)=>{
          self.clearPoppup();
          const toast = this.$createToast({
            type: "correct",
            txt: "删除成功"
          });
          toast.show();
          self.feedbackList.splice(this.feedbackIndex, 1);
        });
      },
      clearPoppup() {
        this.isPopShow = false;
        this.popTitle = "";
        this.popPlainText = "";
      },

      addFeedback() {
        if(this.mUserHasProprietor) {
          if(this.mUserPlotList.length>0 && this.mIsPlotBlankDomicile) {
            this.$router.push({path: '/service-index/feedback/addFeedback'});
          } else {
            this.$createToast({
              type: "warn",
              txt: "您的社区已被禁用，需要解禁才能使用"
            }).show();
          }
        } else {
          this.$createToast({
            type: "warn",
            txt: "需要先加入社区，才能使用此功能"
          }).show();
        }
      },

      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          this.getInfo(1);
          this.$refs.feedbackScroll.forceUpdate();
          // if (Math.random() > 0.5) {
          //   // 如果有新数据
          //   console.log(1);
          //   this.$refs.scroll.forceUpdate();
          // } else {
          //   // 如果没有新数据
          //   this.$refs.scroll.forceUpdate();
          // }
        }, 1000);
      },
      onPullingUp() {
        if (this.isNotLoading) {
          this.$refs.feedbackScroll.forceUpdate();
        } else {
          // 模拟更新数据
          setTimeout(() => {
            this.page = this.page+1;
            this.getInfoLoad(this.page);
            this.$refs.feedbackScroll.forceUpdate();
            // if (Math.random() > 0.5) {
            //   // 如果有新数据
            //   console.log(2);
            //   this.$refs.scroll.forceUpdate();
            // } else {
            //   // 如果没有新数据
            //   this.$refs.scroll.forceUpdate();
            // }
          }, 1000);
        }
      },
      pathLink(num){
        let feedbackID = this.feedbackList[num].feedbackId;
        this.$router.push({ path: "/service-index/feedback/feedback-apply-audit", query: {feedbackID, page: 'feedback'}});
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .feed-hand {
    width: 23.4667vw;
    height: 11.7333vw;
    overflow: hidden;

    .icon {
      width: 11.7333vw;
      height: 11.7333vw;
      margin-left: 11.7333vw;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
          font-size: 6.6667vw;
          color: #3388FF;
      }
    }
  }
</style>
