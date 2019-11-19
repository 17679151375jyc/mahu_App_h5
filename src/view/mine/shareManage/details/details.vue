<template>
  <div class="wrapper">
    <return-head title="共享区域" rightText="保存" @rightBtnOnClick="save"></return-head>

    <div class="scroll-wrapper" style="top: 16.7333vw">
      <cube-scroll
        ref="scroll"
        :style="defaultStyle"
        :options="options"
        :fade="true"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">

        <div class="user">
          <span>共享用户</span>
          <input id="addShared"
                 type="number"
                 style="text-align: right"
                 :autofocus="false"
                 placeholder="请输入对方手机号码"
                 v-model="phoneNum">
          <!--<b>13414173210</b>-->
        </div>
        <div class="info-title border-bottom-1px">共享区域信息</div>
        <div class="info" v-for="(item, index) in 6" :key="index">
          <div class="address border-bottom-1px">
            <i class="iconfont iconzu5"></i>
            <span>圣地亚哥花园3座1001</span>
            <div class="del">
              <b>删除区域</b>
            </div>
          </div>
          <div class="device">
            <div class="option">
              <i class="iconfont iconzu6" style="color: #F4CC24;"></i>20000D9970
            </div>
            <div class="option">
              <i class="iconfont iconzu3" style="color: #29CCCC;"></i>IPC59+3597299
            </div>
          </div>
        </div>
        <div style="height: calc(12.27vw + 5.33vw + 4vw)"></div>
      </cube-scroll>
    </div>

    <float-button text="添加共享区域"
                  @buttonOnClick="addSharedArea">
    </float-button>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <div class="base-vertical-layout-general">
        <choose-text-list :list="popList" @itemOnClick="choosePlotItem"></choose-text-list>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import floatButton from '_c/button/float-button';
  import basePopup from '_c/popup/base-popup';
  import chooseTextList from '_c/list/choose-text';

  export default {
    components: { returnHead, floatButton, basePopup, chooseTextList },
    data() {
      return {
        scrollOptions: {
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

        phoneNum: "",
        userInfo: {},

        // 弹窗属性
        isPopShow: false,
        refId: 'addSharedAreaPopup',
        popTitle: '',
        popList: []
      };
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    methods: {
      add() {},
      save() {},

      addSharedArea() {
        this.isPopShow = true;
        this.popTitle = "请您选择添加的区域";
        let options = [...this.userInfo.domicile];
        options.forEach((item, index, arr) => {
          item.value = item.plotName + " " + item.buildingName + " " + item.doorName;
          item.index = index;
          if(index===0) {
            item.isSeleted = true;
          } else {
            item.isSeleted = false;
          }
          this.popList.push(item);
        });
      },
      choosePlotItem(e) {
        let self = this;
        self.listIndex = e.index;
        self.listItem = e.item;
      },
      leftBtnPoppup() {
        this.isPopShow = false;
      },
      rightBtnPoppup() {
        this.isPopShow = false;
      },

      // 刷新
      onPullingDown() {
        this.$refs.scroll.forceUpdate();
      },
      onPullingUp() {
        this.$refs.scroll.forceUpdate();
      },
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
  overflow scroll;
}

.right-handle {
  width: 23.4667vw;
  height: 11.7333vw;
  overflow: hidden;

  .icon {
    width: 11.7333vw;
    height: 11.7333vw;
    /*margin-left: 11.7333vw;*/
    margin-right: 5.33vw;
    display: flex;
    justify-content: right;
    text-align: right;
    align-items: center;
    font-size: 4.27vw;
    color: #38f;

    i {
      font-size: 6.6667vw;
      color: #3388FF;
    }
  }
}

.user {
  height: 13.3333vw;
  padding: 0 5.3333vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 4.2667vw;
  background: #fff;
  margin: 2.6667vw auto;

  span {
    font-weight: bold;
  }
}

.info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 4.2667vw;
  color: #666;
  font-weight: bold;
  height: 10.4vw;
  padding: 0 5.3333vw;
  box-sizing: border-box;
  background: #fff;
}

.info {
  background: #fff;
  margin-bottom: 1.6vw;
  .address {
    margin: 0 5.3333vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4.2667vw 0;

    i {
      color: #38f;
      font-size: 4.2667vw;
      margin-right: 2.6667vw;
    }

    span {
      flex: 1;
      white-space: wrap;
      font-size: 4.2667vw;
      color: #666;
      line-height: 5.6vw;
    }

    .del {
      width: 17.0667vw;
      height: 5.6vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #38f;
      border: 1px solid #38f;
      border-radius: 2.8vw;
      font-size: 3.2vw;

      &:active {
        background: #38f;
        color: #fff;
      }
    }
  }

  .device {
    overflow: hidden;

    .option {
      margin: 3.2vw 10.6667vw;
      display: flex;
      align-items: center;
      color: #B3B3B3;
      font-size: 3.7333vw;

      i {
        margin-right: 2.6667vw;
      }
    }
  }
}

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCCCCC;
    font-size: 4.27vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #CCCCCC;
    font-size: 4.27vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #CCCCCC;
    font-size: 4.27vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #CCCCCC;
    font-size: 4.27vw;
  }
</style>

