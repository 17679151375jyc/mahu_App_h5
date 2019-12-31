<!--@Time  : 2019/12/8 16:08-->
<!--@Author: michael huang-->
<!--@File  : card-bag.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="我的优惠券"></return-head>

    <div v-if="selectedLabel" class="scroll-wrapper-addition-title" style="overflow:auto">
      <cube-tab-bar
        style="height: 13.3333vw"
        v-model="selectedLabel"
        show-slider
        :use-transition="tabDisabled"
        ref="cardBagTabNav"
        @change="changeHandler"
        :data="tabLabels"
      >
        <cube-tab
          v-for="(item, index) in tabLabels"
          :icon="item.icon"
          :label="item.label"
          :value="item.key"
        ></cube-tab>
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel" class="home-tab">
        <cube-tab-panel
          :label="tabItem.label"
          :value="tabItem.key"
          style="overflow: auto"
          v-for="(tabItem, tabIndex) in tabLabels"
        >
          <cube-scroll
            v-if="cardDataMap[tabItem.key].cardList && cardDataMap[tabItem.key].cardList.length>0"
            :ref="tabItem.key"
            class="scroll-wrapper-page-title-tab"
            style="padding: 0vw 1.6vw 0 1.3333vw;font-size: 3.7333vw;color: #3388FF;"
            :options="cardDataMap[tabItem.key].options"
            @pulling-down="onPullingDown(tabItem.key)"
            @pulling-up="onPullingUp(tabItem.key)"
          >
            <card-bag-item
              v-for="(item, index) in cardDataMap[tabItem.key].cardList"
              :comUserCouponInfo="item"
              :key="index"
            ></card-bag-item>
            <p
              class="base-text-title-normal-gray lx_no_more"
              style="margin: 4vw;text-align: center"
              v-if="!cardDataMap[tabItem.key].options.pullUpLoad"
            >没有更多了~</p>
          </cube-scroll>
          <div v-else class="base-vertical-layout-center-item-center" style="margin-top: 22.6666vw">
            <img :src="require('./icon-card-blank.png')" class="card-bag-blank-icon" />
            <p class="base-text-title-normal-gray" style="margin-top: 2.6666vw">暂无优惠券</p>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import returnHead from "_c/head/return-head";
import cardBagItem from "_c/mine/cardBag/card-bag-item";
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "card-bag",
  components: {
    returnHead,
    cardBagItem
  },
  data() {
    let data = {
      // tab参数
      selectedLabel: "",
      tabDisabled: true,
      tabLabels: [
        {
          key: "unused",
          label: "未使用",
          sum: 0
        },
        {
          key: "used",
          label: "已使用",
          sum: 0
        },
        {
          key: "expired",
          label: "已过期",
          sum: 0
        }
      ]
    };

    let cardData = {
      postData: {
        status: 0,
        isEffective: null,
        page: 1,
        pageSize: 10 //todo
      },
      cardList: [],
      options: {
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false,
        pullDownRefresh: {
          threshold: 60,
          txt: "更新成功"
        },
        pullUpLoad: {
          txt: { more: "加载更多", noMore: "没有更多" },
          visible: true
        }
      }
    };

    let cardDataMap = {
      unused: JSON.parse(JSON.stringify(cardData)),
      used: JSON.parse(JSON.stringify(cardData)),
      expired: JSON.parse(JSON.stringify(cardData))
    };
    cardDataMap.expired.postData.status = 0;
    cardDataMap.expired.postData.isEffective = 0;

    cardDataMap.used.postData.status = 1;
    cardDataMap.used.postData.isEffective = null;

    cardDataMap.unused.postData.status = 0;
    cardDataMap.unused.postData.isEffective = 1;

    data.cardDataMap = cardDataMap;

    return data;
  },
  computed: {
    ...mapState({
      mPushInfo: state => state.user.pushInfo
    })
  },
  watch: {
    mPushInfo() {
      this.init();
    }
  },
  created() {},
  mounted() {
    this.init();
    this.selectedLabel = "unused";
  },
  methods: {
    init() {
      for (const key in this.cardDataMap) {
        let cardData = this.cardDataMap[key];
        cardData.postData.page = 1;

        this.getUserCouponList(key);
      }
    },
    getUserCouponList(key) {
      let self = this;
      let cardData = self.cardDataMap[key];
      self.$post("comUserCoupon", "/getUserCouponList",
        cardData.postData
      ).then(res => {
          for (let item of self.tabLabels) {
            if (item.key == key) {
              item.label =
                item.label.indexOf("(") == -1
                  ? item.label
                  : item.label.substring(0, item.label.indexOf("("));
              item.label = item.label + "(" + res.data.total + ")";
            }
          }
          if (cardData.postData.page == 1) {
            cardData.cardList = [];
          }

          if (res.data.list) {
            if (res.data.list.length < cardData.postData.pageSize) {
              cardData.options.pullUpLoad = false;
            } else {
              cardData.options.pullUpLoad = {
                more: "加载更多",
                noMore: "没有更多"
              };
            }
            cardData.cardList = cardData.cardList.concat(res.data.list);
          } else {
            cardData.options.pullUpLoad = false;
          }

          //  console.log(self.$refs[key].length)
          if (self.$refs[key] && self.$refs[key].length > 0) {
            setTimeout(() => {
              self.$refs[key]["0"].forceUpdate();
              self.$refs[key]["0"].resetPullUpTxt();
              self.$refs[key]["0"].refresh();
              if ((cardData.postData.page === 1)) {
                self.$refs[key]["0"].scrollTo(0, 0);
              }
            }, 100);
          }
        });
    },
    onPullingDown(key) {
      setTimeout(() => {
        let cardData = this.cardDataMap[key];
        cardData.postData.page = 1;
        this.getUserCouponList(key);
      }, 1000);
    },
    onPullingUp(key) {
      setTimeout(() => {
        let cardData = this.cardDataMap[key];
        cardData.postData.page++;
        this.getUserCouponList(key);
      }, 1000);
    },
    changeHandler(key) {}
  }
};
</script>

<style lang="stylus" scoped>
.cube-tab-bar {
  width: 100%;
  height: 13.3333vw;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}

>>>.cube-tab {
  width: 20vw;
  color: #666666;
  font-size: 4.2667vw;
  font-weight: bold !important;
  flex: 1;

  &.cube-tab_active div {
    color: #333333;
    font-weight: bold;
  }
}

>>>.cube-tab-bar-slider {
  background-color: #38F;
  width: 20.1333vw !important;
  left: 6.6%;
}

.card-bag-blank-icon {
  width: 26.6666vw;
  height: 26.6666vw;
}
</style>
