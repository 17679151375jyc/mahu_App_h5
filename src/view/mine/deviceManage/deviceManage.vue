<template>
  <div class="wrapper">
    <topBar :title="'我的设备'" class="top-bar"></topBar>
    <div class="hand">
      <div class="address">
        <i class="home-icon iconfont iconicon_home"></i>
        <span class="text">圣地亚哥花园18座1801</span>
        <i class="right-icon iconfont icon_right" @click="toEditArea"></i>
      </div>
      <div class="items">
        <div class="item">
          <i class="iconfont iconzu1"></i>
          <span>主机数量</span>
          <div class="quantity">1</div>
        </div>
        <div class="item">
          <i class="iconfont iconfangqu"></i>
          <span>防区数量</span>
          <div class="quantity">1</div>
        </div>
        <div class="item">
          <i class="iconfont iconshexiangtou"></i>
          <span>视频数量</span>
          <div class="quantity">99+</div>
        </div>
      </div>
    </div>
    <cube-scroll
      ref="scroll"
      :options="options"
      :fade="true"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="device-items">
        <div class="title border-bottom-1px">防盗主机信息</div>
        <div class="item main-item">
          <i class="left-icon iconfont iconzu" style="color: #38f;"></i>
          <div class="name">
            <b>我家的防盗主机(JM00D997)</b>
            <span>过期时间:2019年2月1日24时00分</span>
          </div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
        <div class="item border-bottom-1px">
          <i class="left-icon iconfont iconmenci" style="color: #8AE548;"></i>
          <div class="name">门磁</div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
        <div class="item border-bottom-1px">
          <i class="left-icon iconfont iconhongwaixian" style="color: #29CCCC;"></i>
          <div class="name">红外线</div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
        <div class="item border-bottom-1px">
          <i class="left-icon iconfont iconjingbao" style="color: #FF3333;"></i>
          <div class="name">SOS</div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
      </div>
      <div class="device-items">
        <div class="title border-bottom-1px">摄像抢主机信息</div>
        <div class="item main-item">
          <i class="left-icon iconfont iconjiankongzhuji" style="color: #3388FF;"></i>
          <div class="name">
            <b>4593597299(593597299)</b>
            <span>过期时间:2019年2月1日24时00分</span>
          </div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
        <div class="item border-bottom-1px">
          <i class="left-icon iconfont iconshexiangtou" style="color: #29CCCC;"></i>
          <div class="name">IPC593597299</div>
          <i class="right-icon iconfont iconicon_edit_t"></i>
        </div>
      </div>
    </cube-scroll>
    <mineDevPopup v-if="devicePopup" @mineDevPopup="mineDevPopupClose"/>

    <transition name="slide-fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import topBar from "_c/topBar";
  import mineDevPopup from "_c/mine/mineDevPopup";

  export default {
    name: "mineMydevice",
    components: { topBar, mineDevPopup },
    data() {
      return {
        defaultStyle: {
          height: "888px",
          fontSize: "0.35rem",
          color: "rgba(51, 136, 255, 1)"
        },
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: false
        },
        devicePopup: false
      };
    },
    created() {
      this.clientHeight(`${document.documentElement.clientHeight - 210}px`);
      utils.hideTab();
    },
    methods: {
      toEditArea() {
        this.$router.push({
          path: '/mine/deviceManage/editArea'
        })
      },

      changecom(e) {
        this.setIsShowOtherPop(true);
        // utils.maskTabShow().then(e => {
          this.devicePopup = true;
        // });
      },
      tominarea() {
        this.$router.push({
          path: "./mineModifierarea"
        });
      },
      mineDevPopupClose(e) {
        utils.hideTab().then(e => {
          this.devicePopup = false;
        });
      },
      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            console.log(1);
            this.$refs.scroll.forceUpdate();
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate();
          }
        }, 1000);
      },
      onPullingUp() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            console.log(2);
            this.$refs.scroll.forceUpdate();
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate();
          }
        }, 1000);
      },
      clientHeight(h = `${document.body.clientHeight - 210}px`) {
        this.defaultStyle.height = h;
      }
    }
  };
</script>

<style lang="stylus" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;

  .top-bar {
    background: #38f;

    >>>.container {
      .left {
        i {
          color: #fff;
        }
      }

      .middle {
        color: #fff;
      }
    }
  }

  .hand {
    background: #38f;

    .address {
      height: 10.6667vw;
      display: flex;
      box-sizing: border-box;
      padding-left: 5.3333vw;
      align-items: center;
      color: #fff;

      .home-icon {
        font-size: 6.6667vw;
      }

      .text {
        font-size: 4.2667vw;
        flex: 1;
        padding-left: 1.6vw;
        font-weight: bold;
        box-sizing: border-box;
      }

      .right-icon {
        flex: 0 0 10.6667vw;
        height: 10.6667vw;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6.6667vw;
      }
    }

    .items {
      display: flex;
      height: 29.8667vw;

      .item {
        flex: 1;
        height: 29.8667vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;

        i {
          font-size: 10.6667vw;
        }

        span {
          font-size: 3.2vw;
          padding: 3.2vw 0 5.6vw 0;
        }

        .quantity {
          position: absolute;
          top: 10px;
          right: 20px;
          display: inline-block;
          background: #FAB650;
          height: 20px;
          width: 20px;
          color: #fff;
          border-radius: 10px;
          font-size: 10px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .device-items {
    padding: 0 5.6vw;
    box-sizing: border-box;
    border-bottom: 2.6667vw solid #EDEEF0;
    &:nth-child(1){
      border-top: 2.6667vw solid #EDEEF0;
    }
    .title {
      height: 11.2vw;
      display: flex;
      align-items: center;
      color: #666;
      font-size: 4.2667vw;
    }
    .main-item{
        height: 17.6vw !important;
        align-items: flex-start !important;
        padding-top: 2.6667vw;
        box-sizing: border-box;
        .left-icon{
            font-size:4.8vw !important;
        }
        .name{
            display: flex;
            flex-direction column;
            b{
                font-weight normal;
                font-size:4.2667vw;
            }
            span{
                margin-top:1.0667vw;
                font-size: 3.2vw;
                color: #ccc;
            }
        }
        .right-icon{
            align-items flex-start !important;
        }
    }
    .item {
      height: 13.3333vw;
      display: flex;
      padding-left: 1.0667vw;
      align-items: center;

      .left-icon {
        font-size: 3.7333vw
      }

      .name {
        margin-left: 1.6vw;
        flex: 1;
        font-size: 3.4667vw;
        color: #666;
      }

      .right-icon {
        flex: 0 0 13.3333vw;
        height: 13.3333vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #6691CC;
      }
    }
  }
}
</style>
