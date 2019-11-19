
<template>
  <div class="component-topbar-wrapper">
    <div class="container">
      <span @click="goPathBack" class="left">
        <i class="iconfont icon_back1"></i>
      </span>
      <span class="middle">{{title}}</span>
      <div class="right">
        <slot name="menu"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tobBar",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isEnableClickGoBack: true
    };
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
    // rightButtonClick(e) {
    //   this.$emit("rightButtonClick", e);
    // },
  }
};
</script>


<style lang="stylus" scoped>
.component-topbar-wrapper {
  background: rgba(255, 255, 255, 1);
  margin: 0;
  padding: 7vw 0 0 0;
  height: 11.7333vw;
  line-height: 11.7333vw;
  text-align: center;

  .container {
    display: flex;
    align-items: center;
    text-align: center;

    .left {
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      align-items: center;
      flex: 0 0 11.7333vw;
      height: 11.7333vw;
      margin-right: 11.7333vw;

      i {
        color: #3388FF;
        font-size: 6.6667vw;
      }
    }

    .middle {
      flex: 1;
      color: #333;
      font-size: 5.3333vw;
      font-weight: bold;
      text-align: center;
      text-overflow: ellipsis;
    }

    .right {
      flex: 0 0 23.4667vw;
      height: 11.7333vw;
      overflow: hidden;
    }
  }
}
</style>
