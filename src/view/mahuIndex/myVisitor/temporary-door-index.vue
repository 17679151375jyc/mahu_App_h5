<!--@Time  : 2019/10/14 15:30-->
<!--@Author: michael huang-->
<!--@File  : temporary-door-index.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="临时门禁"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll ref="temporaryDoorScroll" class="scroll-wrapper-text-style">
        <div v-for="(item,index) in temporaryDoorList" :key="index" class="item">
          <div class="left">
            <img :src="require('./icon-plot.png')" />
            <div class="name">
              <span class="plot">{{item.plotName}}</span>
              <span class="building">{{item.buildingName}}{{item.doorName}}</span>
            </div>
          </div>
          <temporary-door-btn-activation
            :domicileNumber="item.domicileNumber"
            v-if="!item.tempCode || item.codeEffective===0"
            @activationOnClick="activationOnClick"
          ></temporary-door-btn-activation>
          <temporary-door-btn-valid
            :domicileNumber="item.domicileNumber"
            v-else-if="item.tempCode && item.codeEffective===1"
            @validOnClick="validOnClick"
          ></temporary-door-btn-valid>
        </div>
      </cube-scroll>
    </div>

    <base-popup
      v-if="isPopShow"
      :refId="refId"
      :popTitle="popTitle"
      :cancelText="popCancelText"
      :sureText="popSureText"
      @leftBtnPoppup="leftBtnPoppup"
      @rightBtnPoppup="rightBtnPoppup"
    >
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--没有回车的纯文字-->
      <div v-if="popType === 'temporaryDoor'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 70.33vw">注：激活后，密码的有效时间默认为6小时</p>
        <div
          class="base-horizontal-layout-space-between-item-center"
          style="width: 70.33vw;margin-top: 8vw"
        >
          <div
            v-for="(item,index) in temporaryDoorNumberList"
            :key="index"
            class="base-horizontal-layout-center-item-center"
            style="width: 10.9333vw;height: 18.1333vw;border-radius: 1.0666vw;background-color: #F5F5F5"
          >
            <p style="font-size: 8vw;font-weight: bold;color: #E6782B">{{item}}</p>
          </div>
        </div>
      </div>
    </base-popup>
  </div>
</template>

<script>
import temporaryDoorBtnValid from "_c/myVisitor/temporary-door-btn-valid";
import temporaryDoorBtnActivation from "_c/myVisitor/temporary-door-btn-activation";
import returnHead from "_c/head/return-head";
import basePopup from "_c/popup/base-popup";

export default {
  name: "temporary-door-index",
  components: {
    returnHead,
    temporaryDoorBtnValid,
    temporaryDoorBtnActivation,
    basePopup
  },
  data() {
    return {
      temporaryDoorList: [],

      // 弹窗属性
      isPopShow: false,
      refId: "temporaryDoorPopup",
      popTitle: "",
      popType: "",
      popPlainText: "",
      popCancelText: "",
      popSureText: "",
      // 弹窗参数
      domicileNumber: "",
      temporaryDoorNumberList: []
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    let self = this;
    self.$post("domicile", "/getDomicileMessage", {}).then(res => {
      self.temporaryDoorList = [...res.data];
    });
  },
  methods: {
    activationOnClick(e) {
      this.domicileNumber = e.domicileNumber;
      this.popType = "plainText";
      this.popTitle = "激活临时密码";
      self.popCancelText = "取消";
      this.popPlainText =
        "临时密码只作为临时使用，请谨慎激活，请勿泄漏给陌生人，是否激活密码？";
      this.isPopShow = true;
    },
    validOnClick(e) {
      this.getValid(e.domicileNumber);
    },
    getValid(domicileNumber) {
      let self = this;
      self.$post("domicile", "/showTempPassword", {
        domicileNumber: domicileNumber
      }).then(res => {
        let temporaryDoorNumber = res.data.tempCode + "";
        self.temporaryDoorNumberList = temporaryDoorNumber.split("");
        self.domicileNumber = domicileNumber;
        self.popType = "temporaryDoor";
        self.popTitle = "临时密码";
        self.popCancelText = "立即失效";
        self.isPopShow = true;
      });
    },
    leftBtnPoppup() {
      let self = this;
      switch (this.popType) {
        case "plainText":
          this.clearPoppupParameter();
          break;
        case "temporaryDoor":
          let self = this;
          self.$post("domicile", "/deletePassword", {
            domicileNumber: self.domicileNumber
          }).then(res => {
            self.$createToast({
              type: "correct",
              txt: "临时密码取消成功！"
            }).show();
            self.$post("domicile", "/getDomicileMessage", {}).then(res => {
              self.temporaryDoorList = [...res.data];
            });
            self.clearPoppupParameter();
          });
          break;
        default:
          break;
      }
    },
    rightBtnPoppup() {
      let self = this;
      switch (this.popType) {
        case "plainText":
          self.$post("domicile", "/getRandomPassword", {
              domicileNumber: self.domicileNumber
            }).then(res => {
              self.$createToast({
                type: "correct",
                txt: "临时密码激活成功！"
              }).show();
              self.getValid(self.domicileNumber);
              self.$post("domicile", "/getDomicileMessage", {}).then(res => {
                self.temporaryDoorList = [...res.data];
              });
            });
          break;
        case "temporaryDoor":
          this.clearPoppupParameter();
          break;
        default:
          break;
      }
    },
    clearPoppupParameter() {
      this.popTitle = "";
      this.popType = "";
      this.popPlainText = "";
      this.domicileNumber = "";
      this.temporaryDoorNumberList = [];
      this.isPopShow = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.item {
  display: flex;
  justify-content: space-between;
  margin: 0 8vw;
  padding: 2.667vw 0;
  border-bottom: 1px solid #f5f5f5;

  .left {
    display: flex;

    img {
      flex: 0 0 5.3333vw;
      width: 5.3333vw;
      height: 5.3333vw;
      margin-right: 2.1333vw;
    }

    .name {
      display: flex;
      flex-flow: column;
      margin-top: 0.267vw;
      .plot{
          font-size: 4.267vw;
          color: #666;
          font-weight: bold;
          line-height:5.333vw;

      }
      .building{
          font-size: 4.267vw;
          margin-top: 1.333vw;
          color: #777;
          line-height:5.333vw;
      }
    }
  }
}
</style>