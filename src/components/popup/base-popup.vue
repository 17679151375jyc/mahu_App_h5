<template>
  <div class="base-popup-wrapper">
    <cube-popup type="my-popup"
                :ref="refId"
                :position="popPosition"
                :visible="popShow"
                @mask-click="maskClick">
      <!--:maskClosable="true"-->
      <transition name="scale" >
        <div class="popup-container" :style="popupContainerStyle" v-show="popShow">
          <h3 v-show="!isShowCloseIcon" class="popup-title">{{popTitle}}</h3>
          <div v-show="isShowCloseIcon" class="base-horizontal-layout-space-between-item-center">
            <div style="width: 9.6vw;height: 9.6vw"></div>
            <h3 class="popup-title">{{popTitle}}</h3>
            <div @click="closePoppup(refId)">
              <img :src="closeIcon" style="width: 9.6vw;height: 9.6vw" >
            </div>

          </div>
          <slot :name="">
          </slot>
          <div v-show="isShowbtn" class="popup-footer">
            <div v-if="isOtherMsgChoose"
                 style="width: 50%;padding: 0"
                 v-bind:class="{'base-horizontal-layout-general-item-center' : isOtherMsgChoose}">
              <div class="other-msg-item-choose-icon"
                   v-bind:class="{'other-msg-item-choose-icon-background': isOtherMsgAllChoose}"
                   style="margin-top: 3vw"
                   @click="allChoose">
              </div>
              <button type="button" class="popup-button"
                      style="width: 40%;margin-left: 2.67vw;color: #737880;text-align: left"
                      @click="allChoose">{{(cancelText==="") ? "取消" : cancelText}}</button>
              <button type="button" class="popup-button"
                      style="width: 26%;color: #737880;text-align: right"
                      @click="leftBtnPoppup(refId)">取消</button>
            </div>
            <div v-else style="width: 50%;padding: 0">
              <button type="button" class="popup-button"
                      style="color: #737880;width: 100%"
                      @click="leftBtnPoppup(refId)">{{(cancelText==="") ? "取消" : cancelText}}</button>
            </div>
            <div style="width: 0.27vw;height: 8vw;margin-top:3vw;background-color: #DADFE6"></div>
            <div v-if="isCallShow" class="popup-button">
              <a style="color: #3388FF" :href="'tel:'+phoneNumber" @click="rightBtnPoppup(refId)">{{(sureText==="") ? "确定" : sureText}}</a>
            </div>
            <button v-else type="button" class="popup-button"
                    style="color: #3388FF"
                    @click="rightBtnPoppup(refId)">{{(sureText==="") ? "确定" : sureText}}</button>
          </div>
          <!--v-bind:class="{ 'popup-button-solid': isSolidSureBtn, 'popup-button-hollow': !isSolidSureBtn }"-->
        </div>
      </transition>
      <!--<p v-show="isShowCloseIcon" class="popup-close" :style="closeIconStyle">-->
        <!--<img :src="closeIcon"-->
             <!--class="popup-close-icon"-->
             <!--@click="closePoppup(refId)"/>-->
      <!--</p>-->
    </cube-popup>
  </div>
</template>

<script>
  export default {
    name: "base-popup",
    props:
      {
        refId: {
          type: String,
          default: ""
        },
        popPosition: {
          type: String,
          default: ""
        },
        popupContainerStyle: {},
        popTitle: {
          type: String,
          default: ""
        },
        cancelText: {
          type: String,
          default: "取消"
        },
        sureText: {
          type: String,
          default: "确定"
        },
        // isSolidSureBtn: {
        //   type: Boolean,
        //   default: false
        // },
        isShowCloseIcon: {
          type: Boolean,
          default: false
        },
        closeIconStyle: {},
        isOtherMsgChoose: {
          type: Boolean,
          default: false
        },
        isOtherMsgAllChoose: {
          type: Boolean,
          default: false
        },
        isShowbtn: {
          type: Boolean,
          default: true
        },
        isCallShow: {//是否打电话
          type: Boolean,
          default: false
        },
        phoneNumber: {
          type: String,
          default: ""
        }
      },
    data() {
      return {
        // closeIcon: require('./icon_close.png'),
        closeIcon: require('./icon-close-right.png'),
        popShow: false,
      }
    },
    created() {
    },
    mounted() {
      this.showPopup(this.refId);
      this.popShow = true;
    },
    methods: {
      showPopup(refId) {
        const component = this.$refs[refId];
        component.show()
      },
      leftBtnPoppup(refId) {
        this.$emit('leftBtnPoppup',refId);
      },
      rightBtnPoppup(refId) {
        this.$emit('rightBtnPoppup',refId);
      },
      closePoppup(refId) {
        this.$emit('closePoppup',refId);
      },

      allChoose() {
        this.$emit('allChoose',{});
      },
      maskClick() {
        this.$emit('maskClick',{});
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .base-popup-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
  }

  .popup-container {
    width: 74vw;
    padding: 3vw 5vw 5vw 5vw;
    margin-bottom: 5vw;
    background: white;
    border-radius: 3vw;
  }
  .popup-title {
    font-size: 4.2667vw;
    color: #333;
    text-align: center;
  }
  .popup-footer {
    margin-top: 5.33vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .popup-button {
    width: 50%;
    border: 0;
    outline: none;
    text-align: center;
    padding: 3vw 0 0 0;
    background: white;
    font-size: 4.2666vw;
  }
  .popup-button-solid {
    color: #FFFFFF;
    background: #3388FF;
    border-radius: 9vw;
  }
  .popup-button-hollow {
    color: #3388FF;
    border-radius: 9vw;
    border: 0.2666666vw solid #3388FF;
  }
  .popup-close {
    width: 100%;
    margin-top: 20vw;/*43.2vw*/
    color: rgba(255,255,255,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .popup-close-icon {
    width: 16vw;
    height: 16vw;
  }

  .other-msg-item-choose-icon {
    width: 4vw;
    height: 4vw;
    border: 0.4vw solid #A1A8B3;
    border-radius: 50%;
  }
  .other-msg-item-choose-icon-background {
    background-color: #3388FF;
  }
</style>
