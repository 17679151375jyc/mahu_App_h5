<template>
  <div class="return-head-box" ><!--style="margin-top: 8vw"-->
    <slot v-if="leftBtn" name="leftBtn" class="return-head-btn" style="justify-content: flex-start"></slot>
    <div v-else class="return-head-btn" style="justify-content: flex-start" @click="goPathBack">
      <img :src="require('@/assets/icon/icon_back.png')" class="icon-style" >
    </div>
    <div class="base-horizontal-layout-center-item-center" style="width: 52vw">
      <slot v-if="title === ''" name="title"></slot>
      <p v-else class="title-name">{{title}}</p>
    </div>
    <div class="return-head-btn right" @click="rightBtnOnClick">
      <slot v-if="rightText === ''"  name="menu"></slot>
      <div v-else class="return-head-right">
        <p class="return-head-right-text" :style="rightTextStyle">{{rightText}}</p>
      </div>
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
        console.log("click goPathBack："+window.history.length);
        if(localStorage.getItem("myWordInfoNum")) {
          localStorage.removeItem("myWordInfoNum");//清空消息number记录
        }
        if (this.isEnableClickGoBack) {
          this.isEnableClickGoBack = false;

        //  console.log(">>>>>>>>>>>>>>>>>>>>>>>",this.$router);
       //   setTimeout(() => {
            this.$router.go(-1);
            let path = window.location.href;
            setTimeout(()=>{
              if(path==window.location.href){
                console.log('===============================================')
                this.$router.push('/ma-hu-index')
              }
              this.isEnableClickGoBack = true;

            },100);


            //this.$router.goBack();
       //   }, 50);
        }
      },
      rightBtnOnClick() {
        const self = this;
        self.$emit('rightBtnOnClick', {});
      }
    }
  };
</script>

<style lang="stylus" scoped>
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
    height: 11.7333vw;
    display: flex;
    align-items: center;
    &.right{
      justify-content flex-end;
    }
  }
  .icon-style {
    width: 11.7333vw;
    height: 11.7333vw;
  }
  .return-head-right {
    background: linear-gradient(133deg,rgba(48,201,255,1) 0%,rgba(51,136,255,1) 100%);
    border-radius: 1vw;
    margin-right: 3.3333vw;
    padding: 2vw 2vw;
  }
  .return-head-right-text {
    font-size: 4vw;
    font-weight: bold;
    /*color: #3388FF;*/
    color: white
    line-height: 4.27vw;
  }
</style>
