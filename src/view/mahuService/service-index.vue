<!--@Time  : 2019/09/26 18:35-->
<!--@Author: michael huang-->
<!--@File  : service-index.vue-->

<template>
  <div class="wrapper" ><!--style="margin-top: 8vw"-->
    <div v-if="isBusiness || isFamily || isGate"
         :class="['base-horizontal-layout-general-item-end']"
         class="service-index-tab">
      <p v-for="(item,index) in tabLabels" :key="index"
         style="margin-right: 5.3333vw"
         :style="item.isHighlight?
         'font-size: 5.8666vw;color: #333;font-weight: bold':
         'font-size: 5.2666vw;color: #ccc;'"
         @click="tabOnClick(index,item.label)">{{item.label}}</p>
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
        @change="changePage">
        <!-- 马虎商企 -->
        <cube-slide-item v-if="isBusiness">
          <my-business-service v-if="isBusiness">
          </my-business-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-5.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-2.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-4.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-3.png')"
                     class="guanggao-img">
                <!--<img id="isBusinessImg"-->
                <!--:src="require('@/assets/guanggao/guanggao-business.png')"-->
                <!--class="guanggao-img"-->
                <!--:style="isBusinessHeight">-->
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <!-- 马虎家庭 -->
        <cube-slide-item v-if="isFamily">
          <my-family-service v-if="isFamily">
          </my-family-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-1.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-2.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-3.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-4.png')"
                     class="guanggao-img">
                <!--<img id="isFamilyImg"-->
                <!--:src="require('@/assets/guanggao/guanggao-family.png')"-->
                <!--class="guanggao-img"-->
                <!--:style="isFamilyHeight">-->
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
        <!-- 备城门 -->
        <cube-slide-item v-if="isGate">
          <!--<div class="base-vertical-layout-center-item-center" style="width: 100vw;height: 80vh">-->
            <!--<p style="font-size: 50vw">广告</p>-->
            <!--<p style="font-size: 50vw">招租</p>-->
          <!--</div>-->
          <my-gate-service v-if="isGate">
          </my-gate-service>
          <div v-else class="scroll-wrapper-page-index" style="background-color: white">
            <cube-scroll>
              <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
                <img :src="require('@/assets/guanggao/guanggao-6.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-3.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-2.png')"
                     class="guanggao-img">
                <img :src="require('@/assets/guanggao/guanggao-4.png')"
                     class="guanggao-img">
                <!--<img id="isGateImg"-->
                <!--:src="require('@/assets/guanggao/guanggao-gate.png')"-->
                <!--class="guanggao-img"-->
                <!--:style="isGateHeight">-->
              </div>
            </cube-scroll>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>

    <div v-if="!isBusiness && !isFamily  && !isGate"
         class="scroll-wrapper-page-title"
         style="background-color: white">
      <cube-scroll >
        <div class="base-vertical-layout-center-item-center" style="padding: 2vw 2.6666vw">
          <!--<img v-for="(item,index) in guanggao" :key=index :src="require(item)"-->
          <!--class="guanggao-img">-->
          <img :src="require('@/assets/guanggao/guanggao-1.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-5.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-6.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-2.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-3.png')"
               class="guanggao-img">
          <img :src="require('@/assets/guanggao/guanggao-4.png')"
               class="guanggao-img">
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
  import myBusinessService from '@/view/mahuService/myBusiness/my-business-service';
  import myFamilyService from '@/view/mahuService/myFamily/my-family-service';
  import myGateService from '@/view/mahuService/myGate/my-gate-service';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "service-index",
    components: {myBusinessService,myFamilyService,myGateService},
    data() {
      return {
        selectedLabel: "",
        tabLabels: [
          // {
          //   label: "马虎商企",
          //   isHighlight: false
          // },
          // {
          //   label: "马虎家庭",
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
        isFamilyHeight: {height: '673vw'},
        isBusinessHeight: {height: '645vw'},
        isGateHeight: {height: '1735vw'},

        guanggao: [],
      }
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
      if(this.mUserHasProprietor) {
        this.isFamily = true;
      }
      if(this.mAreaTypesList) {
        if(this.mAreaTypesList.length === 0) {
           // this.isFamily = true;
          countEnd = true;
        } else {
          this.mAreaTypesList.forEach((item,index)=>{
            // if(item === 0) {
            //   this.isFamily = true;
            // } else
              if(item === 1) {
              this.isBusiness = true;
            } else if(item === 2) {
              this.isGate = true;
            }
            if(index === this.mAreaTypesList.length-1) {
              countEnd = true;
            }
          });
        }
      }
      if(countEnd) {
        if(this.isBusiness) {
          this.tabLabels.push(
            {
              label: "马虎商企",
              isHighlight: false
            }
          );
        }
        if(this.isFamily) {
          this.tabLabels.push(
            {
              label: "马虎家庭",
              isHighlight: false
            }
          );
        }
        if(this.isGate) {
          this.tabLabels.push(
            {
              label: "备城门",
              isHighlight: false
            }
          );
        }
      }
      // console.log(this.tabLabels);
      if(this.mIndexPageTabIndex>=this.tabLabels.length){
        this.setIndexPageTabIndex(0);
      }
      if(this.tabLabels.length) {
        this.selectedLabel = this.tabLabels[this.mIndexPageTabIndex].label;
        this.tabLabels[this.mIndexPageTabIndex].isHighlight = true;
      }
      for(let count = 0; count < 7; count++) {
        this.guanggao.push(
          '@/assets/guanggao/guanggao-' + count + '.png'
        )
      }
    },
    methods: {
      ...mapActions(
        ['setIndexPageTabIndex']
      ),

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
        this.tabLabels.forEach((item)=>{
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

      tabOnClick(index,label) {
        console.log(index+label)
        this.tabLabels.forEach((item)=>{
          item.isHighlight = false;
        });
        this.tabLabels[index].isHighlight = true;
        this.selectedLabel = label;
        this.setIndexPageTabIndex(index);
      },
    }
  }
</script>

<style lang="stylus" scoped>
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