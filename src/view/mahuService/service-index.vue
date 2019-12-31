<!--@Time  : 2019/09/26 18:35-->
<!--@Author: michael huang-->
<!--@File  : service-index.vue-->

<template>
  <div class="wrapper index-wrapper">
    <!--style="margin-top: 8vw"-->

    <cube-tab-bar  class="index-top-menu " v-model="selectedLabel"  v-if="isBusiness || isFamily || isGate"  @click="tabOnClick">
      <cube-tab v-for="(item,index) in tabLabels" :key="index" :label="item.label"></cube-tab>
    </cube-tab-bar>
    <cube-tab-panels class="index-tab-panels" v-model="selectedLabel" v-if="isBusiness || isFamily || isGate">
      <!-- 商企 -->
      <cube-tab-panel v-if="isBusiness" :label="'马虎商企'">
        <my-business-service></my-business-service>
      </cube-tab-panel>
      <!-- 马虎 -->
      <cube-tab-panel v-if="isFamily" :label="'马虎'">
        <my-family-service ></my-family-service>
      </cube-tab-panel>

      <!-- 备城门 -->
      <cube-tab-panel v-if="isGate" :label="'备城门'">
          <my-gate-service></my-gate-service>

      </cube-tab-panel>
    </cube-tab-panels>

    <!-- <div v-if="isBusiness || isFamily || isGate" :class="['base-horizontal-layout-general-item-end']" class="service-index-tab">
      <p
        v-for="(item,index) in tabLabels"
        :key="index"
        style="margin-right: 5.3333vw"
        :style="item.isHighlight?
         'font-size: 5.8666vw;color: #333;font-weight: bold':
         'font-size: 5.2666vw;color: #ccc;'"
        @click="tabOnClick(index,item.label)"
      >{{item.label}}</p>
    </div>

    <div class="scroll-wrapper-head-and-bottom" style="top: 11.733333vw">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="slideScroll"
        @change="changePage"
      >
        <cube-slide-item v-if="isBusiness">
          <my-business-service v-if="isBusiness"></my-business-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-5.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <cube-slide-item v-if="isFamily">
          <my-family-service v-if="isFamily"></my-family-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-1.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <cube-slide-item v-if="isGate">
          <my-gate-service v-if="isGate"></my-gate-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-6.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
                <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div> -->

    <div
      v-if="!isBusiness && !isFamily  && !isGate"
      class="scroll-wrapper-page-title"
      style="background-color: white"
    >
      <cube-scroll>
        <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
          <img :src="require('@/assets/guanggao/guanggao-1.png')" class="guanggao-img" />
          <img :src="require('@/assets/guanggao/guanggao-5.png')" class="guanggao-img" />
          <img :src="require('@/assets/guanggao/guanggao-6.png')" class="guanggao-img" />
          <img :src="require('@/assets/guanggao/guanggao-2.png')" class="guanggao-img" />
          <img :src="require('@/assets/guanggao/guanggao-3.png')" class="guanggao-img" />
          <img :src="require('@/assets/guanggao/guanggao-4.png')" class="guanggao-img" />
        </div>
        <div style="height: 10vw"></div>
      </cube-scroll>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myBusinessService from "@/view/mahuService/myBusiness/my-business-service";
import myFamilyService from "@/view/mahuService/myFamily/my-family-service";
import myGateService from "@/view/mahuService/myGate/my-gate-service";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "service-index",
  components: { myBusinessService, myFamilyService, myGateService },
  data() {
    return {
      selectedLabel: "",
      tabLabels: [
        // {
        //   label: "马虎商企",
        //   isHighlight: false
        // },
        // {
        //   label: "马虎",
        //   isHighlight: false
        // },
        // {
        //   label: "备城门",
        //   isHighlight: false
        // }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        // listenScroll: true,
        // probeType: 3,
        // /* lock y-direction when scrolling horizontally and  vertically at the same time */
        // directionLockThreshold: 0
      },

      isFamily: false,
      isBusiness: false,
      isGate: false,
      isFamilyHeight: { height: "673vw" },
      isBusinessHeight: { height: "645vw" },
      isGateHeight: { height: "1735vw" },

      guanggao: []
    };
  },
  computed: {
    ...mapState({
      'mIndexPageTabIndex': state => state.layout.indexPageTabIndex,
      'mUserHasProprietor': state => state.user.userHasProprietor,
      'mAreaTypesList': state => state.user.areaTypesList
    }),

    initialIndex() {
      let index = 0;
      index = this.findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      return index;
    }
  },
  beforeCreate() {
    // let img1 = new Image();
    // img1.src = require('@/assets/guanggao/guanggao-business.png');
    // img1.onload = function () {
    //   this.isBusinessHeight = {height: img1.height/img1.width*100 + "vw"};
    //   console.log("isBusinessHeight",this.isBusinessHeight);
    // };
    // let img2 = new Image();
    // img2.src = require('@/assets/guanggao/guanggao-family.png');
    // img2.onload = function () {
    //   this.isFamilyHeight = {height: img2.height/img2.width*100 + "vw"};
    //   console.log("isFamilyHeight",this.isFamilyHeight);
    // };
    // let img3 = new Image();
    // img3.src = require('@/assets/guanggao/guanggao-gate.png');
    // img3.onload = function () {
    //   this.isGateHeight = {height: img3.height/img3.width*100 + "vw"};
    //   console.log("isGateHeight",this.isGateHeight);
    // };
  },
  created() {
    let countEnd = false;
    if (this.mUserHasProprietor) {
      this.isFamily = true;
    }
    if (this.mAreaTypesList) {
      if (this.mAreaTypesList.length === 0) {
        // this.isFamily = true;
        countEnd = true;
      } else {
        this.mAreaTypesList.forEach((item, index) => {
          // if(item === 0) {
          //   this.isFamily = true;
          // } else
          if (item === 1) {
            this.isBusiness = true;
          } else if (item === 2) {
            this.isGate = true;
          }
          if (index === this.mAreaTypesList.length - 1) {
            countEnd = true;
          }
        });
      }
    }
    if (countEnd) {
      if (this.isBusiness) {
        this.tabLabels.push({
          key: "Business",
          label: "马虎商企",
          isHighlight: false
        });
      }
      if (this.isFamily) {
        this.tabLabels.push({
          key: "Family",
          label: "马虎",
          isHighlight: false
        });
      }
      if (this.isGate) {
        this.tabLabels.push({
          key: "Gate",
          label: "备城门",
          isHighlight: false
        });
      }
    }
    // console.log(this.tabLabels);
    if (this.mIndexPageTabIndex >= this.tabLabels.length) {
      this.setIndexPageTabIndex(0);
    }
    if (this.tabLabels.length) {
      this.selectedLabel = this.tabLabels[this.mIndexPageTabIndex].label;
      this.tabLabels[this.mIndexPageTabIndex].isHighlight = true;
      this.setIndexPageTabKey(this.tabLabels[this.mIndexPageTabIndex].key);
    }
    for (let count = 0; count < 7; count++) {
      this.guanggao.push("@/assets/guanggao/guanggao-" + count + ".png");
    }
  },
  methods: {
    ...mapActions(["setIndexPageTabIndex","setIndexPageTabKey"]),

    slideScroll(pos) {
      // const x = Math.abs(pos.x);
      // const tabItemWidth = this.$refs.maHuIndexTabNav.$el.clientWidth;
      // const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      // const deltaX = (x / slideScrollerWidth) * tabItemWidth; // 13.6002
      // this.$refs.maHuIndexTabNav.setSliderTransform(deltaX);
    },
    changePage(index) {
      // this.selectedLabel = this.tabLabels[index].label;
      console.log(index);
      this.tabLabels.forEach(item => {
        item.isHighlight = false;
      });
      this.tabLabels[index].isHighlight = true;
      this.setIndexPageTabIndex(index);
    },
    findIndex(ary, fn) {
      if (ary.findIndex) {
        return ary.findIndex(fn);
      }
      /* istanbul ignore next */
      let index = -1;
      /* istanbul ignore next */
      ary.some(function(item, i, ary) {
        const ret = fn.call(this, item, i, ary);
        if (ret) {
          index = i;
          return ret;
        }
      });
      /* istanbul ignore next */
      return index;
    },

    tabOnClick(label) {
      console.log(label);
      let index = this.findIndex(
        this.tabLabels,
        item => item.label === label
      );
      this.tabLabels.forEach(item => {
        item.isHighlight = false;
      });
      this.tabLabels[index].isHighlight = true;
      this.selectedLabel = label;
      this.setIndexPageTabIndex(index);
      this.setIndexPageTabKey(this.tabLabels[index].key);
    }
  }
};
</script>

<style lang="stylus" scoped>
.index-wrapper {
  bottom: 14.933vw !important;
  display: flex;
  flex-flow: column;
  background: #f5f5f5;

  .index-top-menu {
    height: 11.733vw;
    background: #fff;
    align-items: flex-end;
    padding: 0 5.333vw 0 2.667vw;
    box-sizing: border-box;
    justify-content: flex-start;
    font-weight: bold;

    >>>.cube-tab_active {
      flex: 0 0 26.667vw !important;
      color: #333 !important;
      font-size: 5.867vw !important;
    }

    >>>.cube-tab {
      font-size: 4.267vw;
      font-weight: bold;
      flex: 0 0 24vw;
      color: #999;

      div {
        font-weight: bold;
      }
    }
  }

  .index-tab-panels {
    flex: 1;
    background: #fff;

    >>>.cube-tab-panels-group {
      height: 100%;

      .cube-tab-panel {
        background: #f5f5f5;
        position: relative;
      }
    }
  }
}

.service-index-tab {
  height: 11.7333vw;
  padding: 3.7333vw 5.3333vw 0 5.3333vw;
  box-sizing: border-box;
  background-color: $color-white;
}

.guanggao-img {
  width: 94.6666vw;
  height: 37.3333vw;
  margin-top: 3vw;
}
</style>