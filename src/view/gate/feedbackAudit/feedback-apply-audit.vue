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
    <div class="box">
      <p class="base-text-details-large-gray" style="padding: 3.8vw 6.4vw 0 6.4vw;line-height: 5vw">{{feedbackInfo.feedback}}</p>
      <div class="text_box" v-if='feedbackInfo.pics' >
        <div 
          class='img_box_div' 
          v-for="(item, index) in feedbackInfo.pics.split(',')" 
          :key='index' 
          @click="bigImg(index)">
          <img :src="item" class="img_css">
        </div>
      </div>
      
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
  </div>
</template>
 
<script>
  import returnHead from '_c/head/return-head';
  import utils from "_libs/utils";
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
      //查看图片
      bigImg(val){
        this.$createImagePreview({
          imgs: this.feedbackInfo.pics ? this.feedbackInfo.pics.split(','):[],
          initialIndex: val
        }).show()
      },    
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
.wrapper-white{
  display: flex;
  flex-flow: column;
}
.box{
  margin-top: 0vw;
  width: 100%;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 5vw;
}
.text_box{
  overflow-y: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
  border-radius: 1.07vw;
  display: block;
  margin: 0 auto;
  padding-top: 2vw;
}
.img_box_div{
  width: 29vw;
  height: 29vw;
  overflow: hidden;
  float: left;
  border: 0.27vw solid #fff;
}
.text_box .img_css{
  width: 100%;
  height: 100%;
}
 
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
    margin-bottom: 1.333vw;
  }
</style>