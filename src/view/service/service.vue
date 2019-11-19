<template>
  <div class="wrapper">
    <h3 class="base-horizontal-layout-space-between-item-center">服务
      <div style="width: 13vw" @click="toFeedback">
        <img :src="require('./icon_feedback.png')"
             style="width: 7.2vw;height: 6.666666vw">
      </div>
    </h3>
    <div class="scroll-wrapper-head-and-bottom">
      <cube-scroll ref="serviceScroll"
                   class="scroll-wrapper-text-style"
                   :options="options"
                   :fade="true"
                   @pulling-down="onPullingDown"
                   @pulling-up="onPullingUp">
        <!--<cube-slide ref="slide" :data="items" :autoPlay="false" :loop="false" :showDots="false" style="height: 26vw">-->
          <!--<cube-slide-item v-for="(item, index) of items" :key="index" class="container">-->
            <!--<sHeader :item="item"></sHeader>-->
          <!--</cube-slide-item>-->
        <!--</cube-slide>-->

        <property class="property"
                  :isPropertyRefresh="isPropertyRefresh"
                  :isPropertyLoading="isPropertyLoading"
                  @isPropertyRefresh="setPropertyRefresh"
                  @isPropertyLoading="setPropertyLoading"
                  @isNotLoading="setNotLoading"
                  @plotIdChange="plotIdChange"/>
      </cube-scroll>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import sHeader from "_c/service/header/header";
  import property from "_c/service/property/property";
  import { mapState } from 'vuex';

  export default {
    name: "service",
    components: {sHeader, property},
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
        items: [
          [
            {
              icon: 'iconwentifankui',
              desc: "问题反馈",
              color: '#48EA42',
              goTo: ""
            },
            // {
            //   icon: 'iconzu12',
            //   desc: "物管缴费",
            //   color: '#48EA42',
            //   goTo: ""
            // },
            // {
            //   icon: 'iconshuidianfei',
            //   desc: "水电缴费",
            //   color: '#3388FF',
            //   goTo: ""
            // },
            // {
            //   icon: 'icondianhuafei',
            //   desc: "电话缴费",
            //   color: '#FCB141',
            //   goTo: ""
            // },
            // {
            //   icon: 'iconzu11',
            //   desc: "停车缴费",
            //   color: '#3388FF',
            //   goTo: ""
            // },
            {
              icon: 'iconchongzhi',
              desc: "充值中心",
              color: '#FDD83D',
              goTo: ""
            },
            {
              icon: 'iconwuyeguanli',
              desc: "城市服务",
              color: '#3388FF',
              goTo: ""
            },
            // {
            //   icon: 'iconjiazheng',
            //   desc: "家政服务",
            //   color: '#FCB141',
            //   goTo: ""
            // },
            {
              icon: 'iconyiliao',
              desc: "医疗健康",
              color: '#48EA42',
              goTo: ""
            },
            {
              icon: 'iconkuaidi',
              desc: "我的快递",
              color: '#FDD83D',
              goTo: ""
            }
          ],
          // [
          //   {
          //     icon: 'iconshenghuojiaofei',
          //     desc: "生活缴费",
          //     color: '#48EA42',
          //     goTo: ""
          //   },
          //   {
          //     icon: 'icondianshifei',
          //     desc: "电视缴费",
          //     color: '#3388FF',
          //     goTo: ""
          //   }
          // ]
        ],

        isPropertyRefresh: false,
        isPropertyLoading: false,
        isNotLoading: false,
      };
    },
    created() {
      console.log("service",this.mAppPath);
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if (to.path === "/service") {
          // utils.showTab();
          this.onPullingDown();
        }
      },

      mPushInfo() {// 收到推送，刷新页面
        this.isPropertyRefresh = true;
      }
    },
    computed: {
      ...mapState({
        'mAppPath': state => state.user.appPath,
        'mPushInfo': state => state.user.pushInfo,
        'mUserHasProprietor': state => state.user.userHasProprietor
      })
    },
    methods: {
      setPropertyRefresh(e) {
        this.isPropertyRefresh = e.isPropertyRefresh;
      },
      setPropertyLoading(e) {
        this.isPropertyLoading = e.isPropertyLoading;
      },
      setNotLoading(e) {
        this.isNotLoading = e.isNotLoading;
      },
      plotIdChange(e) {
        utils.localStorage('plotId', e.plotId);
      },

      toFeedback() {
        if(this.mUserHasProprietor) {
          this.$router.push({path: "/service/feedback"});
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
      },

      // 刷新
      onPullingDown() {
        if (!this.options.pullUpLoad) {
          this.options.pullUpLoad = {
            stopTime: 500,
            txt: `加载成功`
          };
        }
        setTimeout(() => {
          this.isPropertyRefresh = true;
          this.$refs.serviceScroll.forceUpdate(true);
        }, 1000);
      },
      onPullingUp() {
        if(this.isNotLoading) {
          this.options.pullUpLoad = false;
        } else {
          setTimeout(() => {
            this.isPropertyLoading = true;
            this.$refs.serviceScroll.forceUpdate(true);
          }, 1000);
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  h3 {
    height: 11.7333vw
    display: flex;
    align-items: center;
    padding: 7vw 0 0 5.3333vw;
    /*background: #3388ff;*/
    background-color: white;
    color: #000;
    font-size: 5.3333vw;
    font-weight: bold;
    /*border-bottom: 5px #EEEEEEE solid;*/
  }

  .scroll-wrapper {
    .item {
      display: flex;
      flex-direction: column;

      .ico {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  >>> .cube-slide-dots {
    margin-bottom: 2.1333vw;
  }

  >>> .cube-slide-dots > span {
    width: 6.4vw;
    height: 0.5333vw;
  }

  >>> .cube-slide-dots > span.active {
    background-color #FB8A60;
  }

  .property {
    margin-top 1.8vw;
    background #fff;
  }
</style>