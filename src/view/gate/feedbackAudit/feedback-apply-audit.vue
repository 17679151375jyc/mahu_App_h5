<!--@Time  : 2019/10/10 15:54-->
<!--@Author: michael huang-->
<!--@File  : feedback-apply-audit.vue-->

<template>
  <div class="wrapper-white">
    <return-head :title="pageId !== 'feedback' ? '业主反馈' : '问题反馈'"></return-head>

    <div class="base-horizontal-layout-space-between-item-center" style="padding: 3vw 6.4vw 0 6.4vw">
      <p class="base-text-title-large-666" style="font-weight: bold"
      >{{feedbackInfo.feedbackType===0 ? '投诉' : feedbackInfo.feedbackType===1 ? '保障与维修' : feedbackInfo.feedbackType===2 ? '建议' : ''}}</p>
      <p class="base-text-details-large-black-666" style="font-weight: bold"
      >{{feedbackInfo.plotName}}{{feedbackInfo.buildingName}}{{feedbackInfo.doorName}}</p>
    </div>
    <div class="title_css">反馈内容:</div>
    <p class="base-text-details-large-gray" style="padding: 4.8vw 6.4vw 0 6.4vw;line-height: 5vw">{{feedbackInfo.feedback}}</p>
    <div v-if='feedbackInfo.auditAdvice&&feedbackInfo.auditStatus!==0' class="title_css">处理意见:</div>
    <p v-if='feedbackInfo.auditAdvice&&feedbackInfo.auditStatus!==0' class="base-text-details-large-gray" style="padding: 4.8vw 6.4vw 0 6.4vw;line-height: 5vw">{{feedbackInfo.auditAdvice}}</p>
    <div class="base-horizontal-layout-right-item-center" style="padding: 4.8vw 6.4vw 0 6.4vw">
      <div v-if="feedbackInfo.auditStatus===0 && pageId !== 'feedback'"
           :class="['base-horizontal-layout-center-item-center']"
           class="feedback-apply-audit-btn"
           @click="toRead">
        <p class="base-text-details-large-white">已阅</p>
      </div>
    </div>

  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';

  export default {
    name: "feedback-apply-audit",
    components: {returnHead},
    data() {
      return {
        feedbackID: '',
        feedbackInfo: {},
        pageId: ''
      }
    },
    watch: {},
    computed: {},
    created() {
      this.feedbackID = this.$route.query.feedbackID;
      this.pageId = this.$route.query.page;
    },
    mounted() {
      let self = this;
      self.$post("gateCommunity", "/feedback/getFeedbackByNum", {
        feedbackNumber: self.feedbackID
      }).then((res) => {
        self.feedbackInfo = res.data;
      });
    },
    methods: {
      toRead() {
        let self = this;
        self.$post("gateCommunity", "/feedback/read", {
          feedbackId: self.feedbackID
        }).then((res) => {
          localStorage.setItem("feedbackRead","yes");
          const toast = self.$createToast({
            type: "correct",
            txt: "该反馈已阅"
          });
          toast.show();
          setTimeout(() => {
            self.$router.goBack();
          }, 700);
        });
      }
    }
  }
</script>

<style scoped>
  .feedback-apply-audit-btn {
    width: 36.53vw;
    height: 12.8vw;
    background: linear-gradient(to bottom , #30C9FF, #38F);
  }
  .title_css{
    color: #38F;
    margin-top: 5vw;
    font-size: 3.74vw;
    width: 90%;
    font-weight: bold;
    margin-left: 6.4vw;
  }
</style>