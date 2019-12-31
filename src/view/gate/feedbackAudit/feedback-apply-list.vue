<!--@Time  : 2019/10/10 15:54-->
<!--@Author: michael huang-->
<!--@File  : feedback-apply-list.vue-->

<template>
  <div class="wrapper-white" style="background-color: #F5F5F5">
    <return-head title="业主反馈"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        v-if="feedbackList.length>0"
        ref="feedbackApplyScroll"
        :data="feedbackList"
        :options="myFamilyServiceScrollOptions"
        :fade="true">
        <div style="height: 1vw"></div>
        <div v-for="(item,index) in feedbackList"
          :key="index"
          class="item"
          @click="toAudit(item.feedbackId)">
          <img class="icon-img"
               :src="item.feedbackType===0 ? require('./icon-complaint.png') :
                     item.feedbackType===1 ? require('./icon-guarantee.png') :
                     item.feedbackType===2 ? require('./iocn-suggest.png') : ''"/>
          <div class="right">
            <div class="title-wrapper">
              <span class="title"
              >{{item.feedbackType===0 ? '投诉' : item.feedbackType===1 ? '保修' : item.feedbackType===2 ? '建议' : ''}}</span>
              <span class="plot-name">{{item.plotName}}</span>
              <span class="date">{{item.date.substr(5,5)}}</span>
            </div>
            <div class="intro-wrapper">
              <span class="intro">{{item.content}}</span>
              <div v-if="item.auditStatus===0" class="jiao_css">
                <img :src="require('@/assets/community/jiao.png')" />
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
      <div v-if='defauleShow'>
        <message-empty></message-empty>
      </div>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import returnHead from "_c/head/return-head";
import messageEmpty from "_c/blank/message-empty";
import { mapState } from "vuex";

export default {
  name: "feedback-apply-list",
  components: { returnHead, messageEmpty },
  data() {
    return {
      defauleShow: false,
      feedbackList: [],
      myFamilyServiceScrollOptions: {}
    };
  },
  watch: {
    feedbackList(val){
      this.defauleShow = val.length>0?false:true
    },
    //监听路由变化
    $route(to, from) {
      if (localStorage.getItem("feedbackRead")) {
        this.getFeedbackList();
        localStorage.removeItem("feedbackRead");
      }
    },
    mPushInfo() {
      let self = this;
      self.getFeedbackList();
    }
  },
  computed: {
    ...mapState({
      mUserInfo: state => state.user.userInfo
    })
  },
  created() {},
  mounted() {
    this.getFeedbackList();
  },
  methods: {
    getFeedbackList() {
      let self = this;
      if (self.mUserInfo.infos.propertyManagePlotNumber) {
        self.$post("gateCommunity", "/feedback/list", {
          plotId: self.mUserInfo.infos.propertyManagePlotNumber, //todo 要改成独立出来的全局数据 ="8d4fa1263fc64e28804837429948b931",
          page: 1,
          pageSize: 1000
        }).then(res => {
          self.feedbackList = [...res.data.list];
        });
      }
    },

    toAudit(feedbackID) {
      this.$router.push({
        path: "/service-index/feedback-apply-list/feedback-apply-audit",
        query: { feedbackID: feedbackID }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.scroll-wrapper-addition-title{
  background-color #f5f5f5;
}
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

.div_box {
  position: relative;
  overflow: hidden;
  background-color: red;
}

.jiao_css {
  width: 3.14vw;
  height: 3.14vw;
  position: absolute;
  top: 0;
  right: 0;
}

.jiao_css img {
  width: 100%;
  height: 100%;
}

.item {
  background-color: #fff;
  margin: 0 1.333vw 2.133vw 1.333vw;
  padding: 4vw 2.667vw;
  display: flex;
  position: relative;

  .icon-img {
    flex: 0 0 13.333vw;
    height: 13.333vw;
  }

  .right {
    flex: 1;
    margin-left: 2.133vw;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    overflow: hidden;

    .title-wrapper {
      height: 5.867vw;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #666;
        font-size: 4.533vw;
        font-weight: bold;
      }

      .plot-name {
        font-size: 3.733vw;
        color: #666;
        flex: 1;
        padding-right: 3.2vw;
        text-align: right;
      }

      .date {
        font-size: 3.733vw;
        color: #999;
      }
    }

    .intro-wrapper {
      overflow: hidden;
      display: flex;

      .intro {
        font-size: 4vw;
        color: #999;
        padding-bottom: 1.333vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>