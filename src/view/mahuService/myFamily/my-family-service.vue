<!--@Time  : 2019/09/27 14:09-->
<!--@Author: michael huang-->
<!--@File  : my-family-service.vue-->

<template>
  <div class="family-service">
    <div class="banner">
      <guang-gao-index-page></guang-gao-index-page>
    </div>

    <div class="handler-wrapper">
      <!--<p style="font-size: 4.8vw;color: #666;font-weight: bold">物管通知</p>-->
      <!-- <div v-if="plotOptions.length>0">
        <p
          v-if="plotOptions.length===1"
          class="base-text-details-large-black-666"
        >{{choosePlotName}}</p>
        <div
          v-else
          class="base-horizontal-layout-space-between-item-center title_pto"
          style="width: 53.4666vw;height: 7.4666vw;border-radius: 1.0666vw;background-color: #F5F5F5"
          @click="choosePlotPicker"
        >
          <p class="base-text-details-large-black-666" style="margin-left: 2vw">{{choosePlotName}}</p>
          <img :src="require('@/assets/notification/icon_bottom.png')" style="margin-right: 2vw" />
        </div>
      </div>-->

      <cube-select
        v-if="plotOptions.length > 1"
        class="select-plot"
        v-model="choosePlotId"
        :options="selectPlotOptions"
        @change="plotSelectHandle"
      ></cube-select>
      <div v-else class="cur-plot">{{choosePlotName}}</div>

      <div class="feedback-btn" @click="toFeedback">
        <img :src="require('./icon-feedback.png')" />
        <span>反馈</span>
      </div>
      <!-- <div class="base-horizontal-layout-right" style="width: 20vw;height: 6vw" >
        <img :src="require('@/assets/icon/icon-menu-blue.png')" class="base-icon-large-style" />
      </div>-->
    </div>

    <div class="scroll-wrapper-service-page">
      <cube-scroll
        v-if="noticeList.length>0"
        ref="myFamilyServiceScroll"
        :data="noticeList"
        :options="myFamilyServiceScrollOptions">
        <div style="height: 1vw"></div>
        <div v-for="(item,index) in noticeList" :key="index"
             style="height: 18.6666vw;background-color: white;border-radius: 1.066vw;
                    margin:1.6vw 1.3vw 0 1.3vw;padding: 4vw;box-sizing: border-box"
          @click="toFamilyNotificationDetail(item.noticeId)">
          <div class="base-horizontal-layout-general">
            <img :src="getImageUrl(item.iconUrl)" style="width: 10.6666vw;height: 10.6666vw" />

            <div class="base-vertical-layout-space-between" style="margin-left: 2.1333vw">
              <div class="base-horizontal-layout-space-between-item-center" style="width: 76.7333vw">
                <p class="my-family-service-title-text" style="width: 40vw">{{item.titleUtf32}}</p>
                <p class="base-text-details-normal-gray">{{item.postDate}}</p>
              </div>
              <div class="my-family-service-content-text"
                   style="width: 59.7333vw">{{item.contentUtf32 | filterHTMLTag}}</div>
              <!--<div v-if="item.isUnRead" class="isRead_css">-->
                <!--<img :src="require('@/assets/community/jiao.png')" />-->
              <!--</div>-->
            </div>
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
import utils from "_libs/utils";
import guangGaoIndexPage from "_c/blank/guang-gao-index-page";
import messageEmpty from "_c/blank/message-empty";
import { mapActions } from 'vuex';
import { mapState } from "vuex";

export default {
  name: "my-family-service",
  components: { guangGaoIndexPage, messageEmpty },
  data() {
    return {
      plotOptions: [],
      choosePlotName: "",
      choosePlotId: "",
      choosePlotIndex: 0,
      myFamilyServiceScrollOptions: {
        stopPropagation: true //阻止事件冒泡
      },
      noticeList: []
    };
  },
  computed: {
    ...mapState({
      'mFamilyPlotList': state => state.plot.familyPlotList,
      'mUserHasProprietor': state => state.user.userHasProprietor,

      'mIndexPageTabKey': state => state.layout.indexPageTabKey,
    }),
    selectPlotOptions: function() {
      return this.plotOptions;
    }
  },
  watch: {
    mIndexPageTabKey() {
      let self = this;
      if(self.mIndexPageTabKey==="Family") {
        self.getIsUnRead();
      }
    }
  },
  filters: {
    filterHTMLTag: msg => {
      if (msg) {
        var msg = msg.replace(/<img[^>]*>/gi, "[图片]");
        msg = msg.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
        msg = msg.replace(/&nbsp;/gi, ""); //去掉npsp
      } else {
        msg = "[图片]";
      }
      return msg;
    }
  },
  mounted() {
    let self = this;
    self.plotOptions = self.mFamilyPlotList;
    this.choosePlotId = this.plotOptions[0].plotId;
    self.choosePlotName = self.plotOptions[0].text;
    self.getInfo(self.plotOptions[0].plotId);
    localStorage.setItem("plotId", self.plotOptions[0].plotId);
  },
  created() {},
  methods: {
    ...mapActions(
      [
        'setIsUntreated',//app所有未处理消息红点提示
      ]
    ),
    getImageUrl(url){
      return utils.getImageUrl(url,64,64);
    },
    getInfo(plotId) {
      let self = this;
      self.$post("community", "/notice/getNotice", {
          plotId: plotId,
          nowTime: 0
      }).then(res => {
        self.noticeList = [];
        self.setIsUntreated({key: "notificationIsUntreated", value: false});
        for(let item of res.data.list) {
          item.isUnRead = true;//todo
          if (item && item.title) {
            item.titleUtf32 = unescape(item.title.replace(/\\u/g, "%u")); //todo 暂时这样直接转成utf32 之后要做子组件
          }
          if (item && item.content) {
            item.contentUtf32 = unescape(item.content.replace(/\\u/g, "%u"));
          }
          self.noticeList.push(item);
        }
        if(self.mIndexPageTabKey === "Family" && self.noticeList.length === res.data.list.length) {
          self.getIsUnRead();
        }
      });
    },
    getIsUnRead() {//todo
      // for(let item of this.noticeList) {
      //   if(item.isUnRead) {
      //     this.setIsUntreated({key: "notificationIsUntreated", value: true});
      //     break;
      //   }
      // }
    },

    choosePlotPicker() {
      //选择社区
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "选择社区",
          data: [this.plotOptions],
          selectedIndex: [this.choosePlotIndex],
          onSelect: this.plotSelectHandle,
          onCancel: this.plotCancelHandle
        });
      }
      this.picker.show();
    },
    plotSelectHandle(selectedVal, selectedIndex, selectedText) {
      this.choosePlotName = this.plotOptions[selectedIndex].text;
      this.choosePlotId = this.plotOptions[selectedIndex].plotId;
      localStorage.setItem("plotId", this.choosePlotId);
      this.choosePlotIndex = selectedIndex;
      this.getInfo(this.choosePlotId);
      this.picker = undefined;
    },
    plotCancelHandle() {
      this.picker = undefined;
    },

    toFamilyNotificationDetail(noticeNumber) {
      console.log("sdsdasdasdasd", noticeNumber);
      this.$router.push({
        path: "/service-index/family-notification-detail",
        query: { noticeNumber: noticeNumber }
      });
    },

    toFeedback() {
      if (this.mUserHasProprietor) {
        this.$router.push({ path: "/service-index/feedback" });
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.family-service {
  .banner {
    width: 100%;
    padding: 2.6666vw;
    box-sizing: border-box;
    background-color: #fff;
  }

  .handler-wrapper {
    height: 13.0666vw;
    padding: 0 0 0 5.3333vw;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-plot {
      background: #f5f5f5;
      padding: 1.333vw  7.33333vw 1.333vw  4.66667vw;

      >>>.cube-select-text {
        font-size: 4.267vw;
        color: #444;
      }
    }
    .cur-plot{
        font-size: 4.267vw;
        color: #333;
    }

    .feedback-btn {
      height: 13.0666vw;
      flex: 0 0 17.333vw;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 5.3333vw;

      img {
        flex: 0 0 5.333vw;
        height: 5.333vw;
        width: 5.333vw;
      }

      span {
        margin-left: 1.067vw;
        color: #3388FF;
        font-size: 4.267vw;
      }

      &:active {
        background: #f4f4f4;
      }
    }
  }
}

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

.title_pto img {
  float: right;
  width: 2vw;
  height: 1.2vw;
  margin: 3.2vw 0 3.2vw 1vw;
}

.isRead_css {
  position: relative;
  width: 0;
  height: 0;
  bottom: 14.6vw;
  left: 77.6vw;
}
.isRead_css img {
  width: 3.14vw;
  height: 3.14vw;
}
</style>