<template>
  <div class="wrapper">
    <div class="bar">
      <div class="left" @click="goPathBack">
        <i class="iconfont icon_back1"></i>
      </div>
      <div class="middle">
        <cube-tab-bar
          v-model="selectedLabel"
          show-slider
          :use-transition="disabled"
          ref="tabNav"
          :data="tabLabels">
        </cube-tab-bar>
      </div>
      <div class="right"></div>
    </div>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage">
        <!-- 共享 -->
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="list-wrapper">
              <div class="item" v-for="(item, index) in 10" :key="index" @click="toDetails">
                <div class="title border-bottom-1px" style="justify-content: space-between">
                  <div class="base-horizontal-layout-center-item-center">
                    <i class="iconfont iconzu4"></i>
                    <div class="base-vertical-layout-general">
                      <span>18033117997的家</span>
                      <b>(共享给：18033117888)</b>
                    </div>
                  </div>
                  <img :src="require('@/assets/icon/icon_delete.png')"
                       style="width: 4.15vw;height: 4.15vw;margin-bottom: 10vw">
                </div>
                <div class="option border-bottom-1px">
                  <div class="left">
                    <i class="iconfont iconzu5"></i>圣地亚哥花园
                  </div>
                  <div class="right">
                    <div class="quantity">
                      <i class="iconfont iconzu6" style="color: #F4CC24;"></i> 2
                    </div>
                    <div class="quantity">
                      <i class="iconfont iconzu3" style="color: #29CCCC;"></i> 2
                    </div>
                  </div>
                </div>
                <div class="option border-bottom-1px">
                  <div class="left">
                    <i class="iconfont iconzu5"></i>哥伦比亚花园
                  </div>
                  <div class="right">
                    <div class="quantity">
                      <i class="iconfont iconzu6" style="color: #F4CC24;"></i> 2
                    </div>
                    <div class="quantity">
                      <i class="iconfont iconzu3" style="color: #29CCCC;"></i> 2
                    </div>
                  </div>
                </div>
                <div class="option border-bottom-1px">
                  <div class="left">
                    <i class="iconfont iconzu5"></i>德玛西亚王国
                  </div>
                  <div class="right">
                    <div class="quantity">
                      <i class="iconfont iconzu6" style="color: #F4CC24;"></i> 2
                    </div>
                    <div class="quantity">
                      <i class="iconfont iconzu3" style="color: #29CCCC;"></i> 2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <!-- 接受 -->
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="list-wrapper">
              <div class="item" v-for="(item, index) in 10" :key="index" @click="toDetails">

                <div class="title border-bottom-1px" style="justify-content: space-between">
                  <div class="base-horizontal-layout-center-item-center">
                    <i class="iconfont iconzu4"></i>
                    <div class="base-vertical-layout-general">
                      <span>18033117997的家</span>
                      <b>(主用户：18033117888)</b>
                    </div>
                  </div>
                  <img :src="require('@/assets/icon/icon_delete.png')"
                       style="width: 4.15vw;height: 4.15vw;margin-bottom: 10vw">
                </div>
                <div class="option border-bottom-1px">
                  <div class="left">
                    <i class="iconfont iconzu5"></i>圣地亚哥花园
                  </div>
                  <div class="right">
                    <div class="quantity">
                      <i class="iconfont iconzu6" style="color: #F4CC24;"></i> 2
                    </div>
                    <div class="quantity">
                      <i class="iconfont iconzu3" style="color: #29CCCC;"></i> 2
                    </div>
                  </div>
                </div>
                <div class="option border-bottom-1px">
                  <div class="left">
                    <i class="iconfont iconzu5"></i>哥伦比亚花园
                  </div>
                  <div class="right">
                    <div class="quantity">
                      <i class="iconfont iconzu6" style="color: #F4CC24;"></i> 2
                    </div>
                    <div class="quantity">
                      <i class="iconfont iconzu3" style="color: #29CCCC;"></i> 2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>

    <float-button text="添加共享"
                  @buttonOnClick="addShared">
    </float-button>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import floatButton from '_c/button/float-button';

  export default {
    components: { floatButton },
    data() {
      return {
        selectedLabel: "共享",
        disabled: false,
        tabLabels: [
          {
            label: "共享"
          },
          {
            label: "接受"
          }
        ],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        }
      };
    },
    created() {
      utils.hideTab();
    },
    computed: {
      initialIndex() {
        let index = 0;
        index = this.findIndex(
          this.tabLabels,
          item => item.label === this.selectedLabel
        );
        return index;
      }
    },
    methods: {
      goPathBack() {
        this.$router.go(-1);
      },
      toDetails() {
        // this.$router.push({
        //   path: "/mine/shareManage/details"
        // });
      },
      changePage(current) {
        this.selectedLabel = this.tabLabels[current].label;
        console.log(current);
      },
      scroll(pos) {
        const x = Math.abs(pos.x);
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
        const deltaX = (x / slideScrollerWidth) * tabItemWidth; // 13.6002
        this.$refs.tabNav.setSliderTransform(deltaX);
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

      addShared() {
        this.$router.push({
          path: "/mine/shareManage/details"
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .bar {
    background: #fff;
    margin: 0;
    padding: 5vw 0 0 0;
    height: 16.7333vw;
    line-height: 11.7333vw;
    text-align: center;
    display: flex;
    justify-content: space-between;

    .middle {
      flex: 1;
      padding: 0 11.4667vw;
      box-sizing: border-box;
      display: flex;
    }

    .left, .right {
      flex: 0 0 11.7333vw;
      height: 11.7333vw;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-size: 6.6667vw;
        color: #38f;
      }
    }
  }

  .cube-tab-bar {
    width: 100%;
    justify-content: space-between;
  }

  >>>.cube-tab {
    color: #b3b3b3;
    font-size: 4.2667vw;
    flex: 1;

    &.cube-tab_active {
      color: #000;
    }
  }

  >>>.cube-tab-bar-slider {
    background-color: #4D4D4D;
    width: 8.5333vw !important;
    left: 9vw;
  }

  .tab-slide-container {
    position: fixed;
    top: 19.7333vw;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .list-wrapper {
    overflow: scroll;
    padding-bottom: 23.2vw;

    .item {
      margin: 2.6667vw;
      background: #fff;
      border-radius: 1.3333vw;
      padding: 5.3333vw 2.6667vw 2.6667vw 2.6667vw;
      box-sizing: border-box;

      .title {
        height: 12.6667vw;
        display: flex;
        align-items: center;

        i {
          color: #38f;
          font-size: 6.6667vw;
          margin-right: 2.6667vw;
        }

        span {
          color: #666;
          font-size: 3.7333vw;
          margin-right: 2.6667vw;
        }

        b {
          font-size: 3.20vw;
          color: red;
          margin-top: 0.6vw;
        }
      }

      .option {
        height: 11.7333vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;

        .left {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 4.6667vw;
          font-size: 3.4667vw;
          color: #666;

          i {
            font-size: 3.7333vw;
            color: #579DFF;
            margin-right: 2.6667vw;
          }
        }

        .right {
          display: flex;
          flex: 0 0 26.6667vw;

          .quantity {
            margin-right: 2.6667vw;
            color: #666;
            font-size: 3.4667vw;
          }
        }
      }
    }

}
</style>


