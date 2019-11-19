<template>
  <div class="return-head-box" ><!--style="margin-top: 8vw"-->
    <slot v-if="leftBtn" name="leftBtn" class="return-head-btn" style="justify-content: flex-start"></slot>
    <div v-else class="return-head-btn" style="justify-content: flex-start" @click="goPathBack">
      <img :src="require('@/assets/icon/icon_back.png')" class="icon-style" >
    </div>
    <div class="base-horizontal-layout-center-item-center" style="width: 60vw">
      <slot v-if="title === ''" name="title"></slot>
      <p v-else class="title-name">{{title}}</p>
    </div>
    <div class="return-head-btn" @click="rightBtnOnClick">
      <slot v-if="rightText === ''"  name="menu"></slot>
      <p v-else class="return-head-right-text" :style="rightTextStyle">{{rightText}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "return-head",
    props:
      {
        title: {
          type: String,
          default: ""
        },
        leftBtn: {
          type: Boolean,
          default: false
        },
        rightText: {
          type: String,
          default: ""
        },
        rightTextStyle: {
          type: Object,
          default: () => {}
        }
      },
    data() {
      return {
        isEnableClickGoBack: true
      }
    },
    methods: {
      goPathBack() {
        let self = this;
        if(localStorage.getItem("myWordInfoNum")) {
          localStorage.removeItem("myWordInfoNum");//清空消息number记录
        }
        if (self.isEnableClickGoBack) {
          self.isEnableClickGoBack = false;
          setTimeout(() => {
            self.$router.go(-1);
            // self.$router.goBack();
          }, 50);
        }
      },
      rightBtnOnClick() {
        const self = this;
        self.$emit('rightBtnOnClick', {});
      }
    }
  };
</script>

<style scoped>
  .return-head-box {
    width: 100vw;
    height: 11.7333vw;
    background-color: white;
    border-bottom: 1px solid rgba(221,221,221,0.3);
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  }
  .title-name {
    font-size: 5.867vw;
    font-weight: bold;
    color: #333;
  }
  .return-head-btn {
    width: 24vw;
    height:11.7333vw;
    display: flex;
    align-items: center;
  }
  .icon-style {
    width: 11.7333vw;
    height: 11.7333vw;
  }
  .return-head-right-text {
    font-size: 3.73vw;
    font-weight: bold;
    color: #3388FF;
    line-height: 4.27vw;
    margin-right: 5.3333vw;
  }
</style>
