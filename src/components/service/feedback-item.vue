<template>
  <div >
    <!--class="record-wrapper"-->
    <div style="display: flex;justify-content: center">
      <div class="feedback-item">
        <div class="feedback-item-hand">
          <div class="classify">
            <div class="icon">
              <!--<i class="iconfont icontousu1"></i>-->
              <!--<i class="iconfont iconbaozhang"></i>-->
              <img :src="feedback.feedbackType===0?require('./icon_complaint.png'):feedback.feedbackType===1?require('./icon_disabilities.png'):
                   require('./icon_suggest.png')"
                   style="width: 7.5vw;height: 7.5vw">
            </div>
            <div class="title">{{feedback.feedbackType===0?'投诉':feedback.feedbackType===1?'保障与维修':feedback.feedbackType===2?'建议':''}}</div>
            <div class="state" :style="feedback.auditStatus===1?'background-color: #8AE548':''">
              <div>{{feedback.auditStatus===0?'未查阅':feedback.auditStatus===1?('已查阅 '+feedback.auditName):''}}</div>
            </div>
          </div>
          <div class="close">
            <i class="iconfont icon_close" @click="deleteFeedback"></i>
          </div>
        </div>
        <div class="intro">
          <div class="text">{{feedback.content | filterHTMLTag}}</div>
        </div>
        <div class="time">提交时间：{{feedback.date}}</div>
        <div class="div_min" @click="pathLinkPage"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "feedback-item",
    props: {
      feedback: {
        type: Object,
        default: () => {}
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {};
    },
    created() {},
    filters:{
      filterHTMLTag: (msg)=> {
        if(msg){
          var msg = msg.replace(/<img[^>]*>/gi, '[图片]');
          msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
          msg = msg.replace(/[|]*\n/, '') //去除行尾空格
          msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
        }else{
          msg = '[图片]...'
        }
        return msg;
      }
    },
    methods: {
      deleteFeedback() {
        let self = this;
        self.$emit('deleteFeedback',{index: self.index,feedbackId: self.feedback.feedbackId});
      },
      pathLinkPage(){
        let self = this;
        self.$emit('pathLinkPage');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .feedback-item {
    margin: 2.6667vw;
    width: 94.6667vw;
    background: #fff;
    box-shadow: 0px 0.8vw 1.6vw rgba(0, 0, 0, 0.03);
    border-radius: 2.6667vw;
    padding: 4.2667vw;
    box-sizing border-box;
    position relative;
    .intro {
      background: #f5f5f5;
      // width: 86.1333vw;
      border-radius: 1.6vw;
      padding: 2.1333vw 2.9333vw;
      font-size: 3.7333vw;
      line-height: 4.2667vw;
      color: #999;
      margin: 1.3333vw 0;
    }

    .time {
      font-size: 3.2vw;
      color: #666;
      margin-top: 2vw;
      text-align: right;
      line-height: 4.2667vw;
      font-weight: bold;
    }
  }

  .feedback-item-hand {
    position: relative;
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    .classify {
      display: flex;
      align-items: center;

      .icon {
        width: 7.4667vw;
        height: 7.4667vw;
        background: #F4CC24;
        border-radius: 1.0667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1.6vw;

        i {
          color: #fff;
          font-size: 3.7333vw;
        }
      }

      .title {
        font-size: 4.2667vw;
        color: #666;
        margin-right: 3.2vw;
        font-weight: bold;
      }

      .state {
        height: 4.8vw;
        border-radius: 2.4vw;
        background: #FB8A60;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 1.0667vw;
        color: #fff;

        div {
          font-size: 2.9333vw;
        }
      }
    }

    .close {
      position: absolute;
      top: -4.2667vw;
      right: -4.2667vw;
      width: 9.6vw;
      height: 9.6vw;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .iconfont {
        font-size: 8vw;
        color: #999999;
      }
    }
  }
  .div_min{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 10vw;
    opacity: 0;
  }
</style>
