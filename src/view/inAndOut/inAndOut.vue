<template>
  <div class="wrapper">
    <top :styleName="topStyle" />
    <cube-scroll
      ref="scroll"
      :style="defaultStyle"
      :options="options"
      :fade="true"
      :scroll-events="['scroll']"
      @scroll="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"><!--:data="visitorList"-->

      <div v-show="visitorList.length>0" class="m-topic-swiper" style="width: 100vw">
        <swiper ref="visitorSwiper"
                :options="visitorSwiperOption"
                class="inAndOut-wrapper"
                style="width: 100vw;height: 50vw">
          <swiper-slide v-for="(item, index) in visitorList" :key="index"
                        class="container"
                        style="width: 90%">
            <carousel :visitorInfo="item"
                      :index="index"
                      @deleteVisitor="showPoppup"
                      @agreeVisitor="showPoppup">
            </carousel>
          </swiper-slide>
        </swiper>
      </div>
      <!--<div v-if="visitorList.length>0">-->
        <!--<cube-slide ref="slide"-->
                    <!--@change="changePage"-->
                    <!--:autoPlay="false"-->
                    <!--:loop="false"-->
                    <!--:showDots="false"-->
                    <!--:data="visitorList"-->
                    <!--class="inAndOut-wrapper">-->
          <!--<cube-slide-item v-for="(item, index) of visitorList" :key="index"-->
                           <!--@click.native="clickHandler(item, index)"-->
                           <!--class="container">-->
            <!--<carousel :visitorInfo="item"-->
                      <!--:index="index"-->
                      <!--@deleteVisitor="deleteVisitor"-->
                      <!--@agreeVisitor="agreeVisitor">-->
            <!--</carousel>-->
          <!--</cube-slide-item>-->
        <!--</cube-slide>-->
      <!--</div>-->
      <div v-show="visitorList.length===0"
           class="base-vertical-layout-center-item-center"
           style="padding-top: 2.67em"
           :class="{'inAndOut-blank-box':true}">
        <div class="base-vertical-layout-center-item-center"
             style="width: 84vw;height: 44.27vw;background-color: white;border-radius: 2.67vw">
          <img :src="require('./icon_visitor.png')" style="width: 13.333333vw;height: 13.333333vw">
          <p style="margin-top: 2.67vw;font-size: 3.2vw;color: #A1A7B3">还没人来拜访您呢</p>
        </div>
      </div>

      <div class="add-caller">
        <button type="button" class="add-btn"
                @click="addVisitor"
                @touchstart="touchStart"
                @touchend="touchEnd"
                :style="isTouch?'background-color: rgba(51,136,255,0.1)':''"
        >添加访客<span class="fa fa-plus"></span></button>
      </div>
      <p class="line"></p>
      <dayRecord :inDaysOf="inDaysOf"/>

      <!--<div slot="pulldown">-->
        <!--<img :src="require('./hahaha.gif')">-->
      <!--</div>-->
    </cube-scroll>

    <addVisitorPopup v-if="addVisitorPopup" @addVisitorClose="addVisitorPopupClose" @addVisitorTo="addVisitorTo" />

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import carousel from "_c/inAndOut/carousel";
  import top from "_c/inAndOut/topBar";
  import dayRecord from "_c/inAndOut/dayRecord";
  import basePopup from '_c/popup/base-popup';
  import addVisitorPopup from "_c/inAndOut/addVisitorPopup";
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "app",
    components: { carousel, top, dayRecord, basePopup, addVisitorPopup,  swiper, swiperSlide },
    data() {
      return {
        isTouch: false,

        defaultStyle: {
          height: "calc(100vh - 18.73vw - 16vw)",
          fontSize: "4vw",
          // fontWeight: "600",
          color: "rgba(51, 136, 255, 1)"
        },
        topStyle: { },
        value: "",

        visitorSwiperOption: { //可写swiper一些原生配置
          observer: true,
          observeParents: true,

          slidesPerView : "auto",
          centeredSlides: true,

          pagination: {
            el: '.swiper-pagination',

            type: 'bullets',//这个不用变成custom值，就可以之定义分页器样式(可爽)
            // bulletElement : 'span',//设置分页器小圆点标签，默认为span标签
            // clickable:true,
            // paginationClickable: true,
            // notNextTick:true,

            bulletElement : 'li',
            // modifierClass : 'my-pagination-',
            // bulletClass: 'my-swiper-pagination-bullet',
            // bulletActiveClass: 'my-swiper-pagination-bullet-active'
          },
          watchOverflow: true,//因为仅有1个slide，swiper无效
        },

        visitorList: [],
        inDaysOf: [],

        refresh: [],
        // popupShow: false,
        aheadBack: 'slide',
        addVisitorPopup: false,
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`,
          },
          pullUpLoad: false
        },
        items: [],

        // 弹窗属性
        isPopShow: false,
        refId: 'vistorPopup',
        popTitle: '',
        popPlainText: '',
        visitorID: '',
        visitorStatus: 0,
      };
    },
    watch: {
      //监听路由变化
      $route( to , from ){
        let self = this;
        if (this.$route.path === "/inAndOut") {
          // utils.showTab();
          if(localStorage.getItem("inAndOutChange")) {
            self.$post("entry","/vistor",{}).then((res)=>{
              self.visitorList = [...res.data.list];
            });
            localStorage.removeItem("inAndOutChange");
          }
        }
      },

      mPushInfo() {// 收到推送，刷新页面
        let self = this;
        self.getInfo();
      }
    },
    // beforeCreate(){
    //   utils.showTab();
    // },
    created() {
      //监听视窗变动，重新计算高度,60是头部固定高度
      // this.aheadBack == "slide"? this.aheadBack = null:this.aheadBack=null;
      //utils.showTab()
      //全局监听goBack,添加前进/后退动画
      // let self = this;
      // window.eventBus.$on('goBack
      //
      // ',(x)=>{
      //   self.aheadBack = 'fade';
      //   setTimeout((x)=>{
      //     this.aheadBack = 'slide'
      //   },500)
      // });

      console.log("inAndOut",this.mAppPath);

      // alert("userID: "+CYJ.userID()
      //   +" userSign: "+CYJ.userSign()
      //   +" secret: "+CYJ.secret())
    },
    mounted() {
      let self = this;
      self.getInfo();
    },
    computed: {
      ...mapState({
        'mAppPath': state => state.user.appPath,
        'mPushInfo': state => state.user.pushInfo,
        'mUserHasProprietor': state => state.user.userHasProprietor
      })
    },
    methods: {
      ...mapActions(
        ['setIsShowOtherPop']
      ),

      getInfo() {
        let self = this;
        self.$post("entry","/vistor",{}).then((res)=>{
          self.visitorList = [...res.data.list];
        });
        self.$post("entry","/today",{}).then((res)=>{
          self.inDaysOf = [...res.data.list];//todo 尝试增加数组
        });
        // if(localStorage.getItem("inAndOutChange")) {
        //   self.$post("entry","/vistor",{}).then((res)=>{
        //     self.visitorList = [...res.data.list];
        //   });
        //   localStorage.removeItem("inAndOutChange");
        // }
      },

      btnClick(e) {
        console.log(e);
      },
      changePage(current) {
        console.log("当前轮播图序号为:" + current);
      },

      clickHandler(item, index) {
        console.log(item, index);
      },

      touchStart() {
        this.isTouch = true;
      },
      touchEnd() {
        this.isTouch = false;
      },

      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          let self = this;
          self.$post("entry","/vistor",{}).then((res)=>{
            self.visitorList = [...res.data.list];
          });
          self.$post("entry","/today",{}).then((res)=>{
            self.inDaysOf = [...res.data.list];
          });
          this.$refs.scroll.forceUpdate(true);
          // if (Math.random() > 0.5) {
          //   // 如果有新数据
          //   console.log(1);
          //   this.$refs.scroll.forceUpdate();
          // } else {
          //   // 如果没有新数据
          //   this.$refs.scroll.forceUpdate();
          // }
        }, 1000);
      },
      onPullingUp() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            console.log(2);
            this.$refs.scroll.forceUpdate(true);
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate(true);
          }
        }, 1000);
      },


      addVisitor(e){
        if (this.mUserHasProprietor) {
          this.setIsShowOtherPop(true);
          // utils.maskTabShow().then((e)=>{
            this.addVisitorPopup = true;
          // })
        } else {
          const toast = this.$createToast({
            type: "warn",
            txt: "需要先加入社区，才能使用此功能"
          });
          toast.show();
        }
      },
      addVisitorPopupClose(ee) {
        this.setIsShowOtherPop(false);
         // utils.maskTabHide().then((e)=>{
              this.addVisitorPopup = false;
              // CYJ.showTab();
           if(ee.show && ee.show !== "") {
             const toast = this.$createToast({
               type: 'correct',
               txt: ee.show
             });
             toast.show();
           }
         // })
      },
      addVisitorTo(e) {
        this.setIsShowOtherPop(false);
        // utils.maskTabHide().then((e)=>{
          this.addVisitorPopup = false;
        // })
      },
      scroll(e){
        const objStyle = {
          height: "18.73vw",
          padding: 0,
          justifyContent: 'center',
          // fontSize: '0.45rem'
          }
          // this.topStyle = e.y < -60? objStyle : {}
          const topHeight = Number.parseInt(objStyle.height.replace('px',''));
          this.defaultStyle.height = 'calc(100vh - 18.73vw - 16vw)';
         // this.clientHeight(`${document.documentElement.clientHeight - topHeight}px`, topHeight);
          //console.log( topHeight)
      },

      deleteVisitor(e) {//删除访客
        let self = this;
        self.$post("entry","/delete",{
          visitorID: self.visitorID
        }).then((res)=>{
          this.setIsShowOtherPop(false);
          this.isPopShow = false;
          const toast = this.$createToast({
            type: "correct",
            txt: "删除成功"
            // txt: res.errorCode+":"+e.index+":"+e.vistorID+"删除成功"
          });
          toast.show();
          self.$post("entry","/vistor",{}).then((mRes)=>{
            self.visitorList = [...mRes.data.list];
          });
        });
      },
      agreeVisitor(e) {//同意访客
        let self = this;
        self.$post("entry","/agree",{
          visitorID: self.visitorID,
          status: self.visitorStatus
        }).then((res)=>{
          this.setIsShowOtherPop(false);
          this.isPopShow = false;
          const toast = this.$createToast({
            type: "correct",
            txt: self.visitorStatus===1 ? "已同意" : self.visitorStatus===2 ? "已取消" : ""
            // txt: res.errorCode+":"+e.index+":"+e.vistorID+"已同意"
          });
          toast.show();
          self.$post("entry","/vistor",{}).then((mRes)=>{
            self.visitorList = [...mRes.data.list];
          });
        });
      },
      showPoppup(e) {
        this.setIsShowOtherPop(true);
        this.isPopShow = true;
        if (e.type==="deleteVisitor") {
          this.visitorID = e.vistorID;
          this.popTitle = "删除访客";
          this.popPlainText = "是否删除该访客？";
        } else if (e.type==="agreeVisitor") {
          this.visitorID = e.vistorID;
          this.visitorStatus = e.isAgree;
          this.popTitle = (e.isAgree===1 ? "同意" : e.isAgree===2 ? "拒绝" : "NULL")+"访客";
          this.popPlainText =  "是否" + (e.isAgree===1 ? "同意" : e.isAgree===2 ? "拒绝" : "NULL") + "该访客的申请？";
        } else {
          return;
        }
      },
      leftBtnPoppup() {
        this.setIsShowOtherPop(false);
        this.isPopShow = false;
      },
      rightBtnPoppup() {
        if (this.popTitle === "删除访客") {
          this.deleteVisitor();
        } else if (this.popTitle === "同意访客" || this.popTitle === "拒绝访客") {
          this.agreeVisitor();
        } else {
          return;
        }
      }

      // popupCancelClick(e){
      //    utils.maskTabHide().then((e)=>{
      //      this.popupShow = false;
      //    })
      //
      // },
      // popupFinishClick(e){
      //   utils.hideTab().then(()=>{
      //     this.popupShow = false;
      //   })
      // }
    },
  };
</script>

<style lang="stylus">
  $invalidQrcodeColor = rgba(51, 136, 255, 1);

  .inAndOut-blank-box {
    background: linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(51, 136, 255, 1));
    background-repeat: no-repeat;
    background-size: 100% 68%;
  }

  .inAndOut-wrapper {
    background: linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(51, 136, 255, 1));
    background-repeat: no-repeat;
    background-size: 100% 68%;
    .container {
      background: linear-gradient(to bottom, rgba(51, 136, 255, 1), rgba(51, 136, 255, 1));
      background-repeat: no-repeat;
      background-size: 100% 68%;
    }
  }

  #app {
    box-sizing: content-box;
    font-family: main,NSimSun,KaiTi_GB2312,Helvetica, Arial, sans-serif;
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: rgba(245, 245, 245, 1);
    color: #2c3e50;

    .add-caller {
      text-align: center;
      padding: 5.07vw 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .add-btn {
        width: 42.67vw
        padding: 2.13vw 0;
        border-radius: 5.33vw;
        border: 1px solid rgba(51, 136, 255, 1);
        outline: none;
        background: rgba(245, 245, 245, 1);
        font-weight: 500;
        color: rgba(51, 136, 255, 1);
        font-size: 3.73vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
    .line {
      height: 3.73vw;
      background: rgba(237, 238, 240, 1);
    }
  }
</style>

