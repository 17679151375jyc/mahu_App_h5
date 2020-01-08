<!--添加访客信息-->
<template>
  <div class="addVisitorInfo-wrapper">
    <return-head :title="topTitle"></return-head>

    <div class="form-wrapper">
      <cube-form
        :model="addVisitorDataModel"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler"
      >
        <!--<cube-form-item :field="addVisitorFields[0]"></cube-form-item>-->
        <div class="form-wrapper">
          <cube-form-group>
            <cube-form-item v-if="isEditVisitor">
              <div class="input-item">
                <div class="label-wrapper">
                  <span>访客姓名</span>
                </div>
                <div class="input-wrapper">
                  <span v-if="isEditVisitor" class="text">{{
                    addVisitorDataModel.vistorName || "匿名"
                  }}</span>
                </div>
              </div>
            </cube-form-item>
            <cube-form-item
              v-else
              :field="addVisitorFields[0]"
              :class="[{ 'cube-form-label-noxingxing': !isVistorNameIn }]"
            >
            <div class="right-side">
              <cube-input v-model="addVisitorDataModel.vistorName"
                          placeholder="填写来客姓名"
                          :maxlength="4"
                          class="name-input"></cube-input>
              <div
                class="base-text-title-normal-blue note-book-btn"
                @click="readContactss"
              >
               | 通讯录
              </div>
              </div>
            </cube-form-item>

            <cube-form-item v-if="isEditVisitor">
              <div class="input-item">
                <div class="label-wrapper">
                  <span>访客手机</span>
                </div>
                <div class="input-wrapper">
                  <span class="text">{{
                    addVisitorDataModel.vistorPhone
                  }}</span>
                </div>
              </div>
            </cube-form-item>
            <cube-form-item
              v-else
              :field="addVisitorFields[3]"
              :class="[{ 'cube-form-label-noxingxing': !isVistorPhoneIn }]"
            ></cube-form-item>

            <div style="height: 2.6666vw;background-color: #F5F5F5"></div>

            <cube-form-item
              v-if="comnunitiesObj && comnunitiesObj.idcardStatus === 1"
              :field="addVisitorFields[1]"
            ></cube-form-item>
            <cube-form-item
              v-if="isEditVisitor && addVisitorDataModel.identityCard"
            >
              <div class="input-item">
                <div class="label-wrapper">
                  <span>身份证号</span>
                </div>
                <div class="input-wrapper">
                  <span class="text">{{
                    addVisitorDataModel.identityCard
                  }}</span>
                </div>
              </div>
            </cube-form-item>

            <cube-form-item>
              <div class="input-item" style="padding: 0 0 0 3.5vw">
                <div class="label-wrapper">
                  <span>访客性别</span>
                </div>
                <div class="input-wrapper">
                  <span v-if="isEditVisitor" class="text">{{
                    addVisitorDataModel.vistorSex
                  }}</span>
                  <div v-else class="gender-wrapper">
                    <div
                      :class="[
                        'gender-item',
                        addVisitorDataModel.vistorSex === 1 ? 'active' : ''
                      ]"
                      @click="addVisitorDataModel.vistorSex = 1"
                    >
                      男
                    </div>
                    <div
                      :class="[
                        'gender-item',
                        addVisitorDataModel.vistorSex === 0 ? 'active' : ''
                      ]"
                      @click="addVisitorDataModel.vistorSex = 0"
                    >
                      女
                    </div>
                  </div>
                </div>
              </div>
            </cube-form-item>
          </cube-form-group>

          <cube-form-group class="addVisitorInfo-context">
            <div
              class="input-item"
              style="padding: 0 0 0 7.5vw;border-bottom: 1px solid #ebebeb90"
            >
              <div class="label-wrapper">
                <span>来访小区</span>
              </div>
              <div class="input-wrapper">
                <!--<div v-if="isEditVisitor" class="text-box" style="width: 70vw">-->
                <!--<span class="text"-->
                <!--&gt;{{`${visitorInfo.plotName} ${visitorInfo.buildingName} ${visitorInfo.doorName}`}}</span>-->
                <!--</div>-->

                <div class="text-box" style="width: 62vw">
                  <span v-if="isEditVisitor" class="text">{{
                    `${safetyInvoke(
                      visitorInfo,
                      "plotName",
                      "string"
                    )} ${safetyInvoke(
                      visitorInfo,
                      "buildingName",
                      "string"
                    )} ${safetyInvoke(visitorInfo, "doorName", "string")}`
                  }}</span>
                  <span v-else class="text">{{
                    `${safetyInvoke(
                      comnunitiesObj,
                      "plotName",
                      "string"
                    )} ${safetyInvoke(
                      comnunitiesObj,
                      "buildingName",
                      "string"
                    )} ${safetyInvoke(comnunitiesObj, "doorName", "string")}`
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="input-item visitor-time"
              style="padding: 0 0 0 7.5vw;border-bottom: 1px solid #ebebeb90;"
            >
              <div class="label-wrapper">
                <span>来访时长</span>
              </div>
              <div class="input-wrapper lager">
                <span class="text">
                  默认1天
                  <br />过期可在访客管理重新激活
                </span>
              </div>
            </div>
          </cube-form-group>

          <cube-form-group
            v-if="
              (comnunitiesObj.parkId && comnunitiesObj.temporaryCount > 0) ||
                (visitorInfo.parkId && visitorInfo.temporaryCount > 0)
            "
          >
            <cube-form-item :field="addVisitorFields[4]" class="car-number-box">
              <!--<div class="input-item border-bottom-1px">-->
              <!--<div class="label-wrapper">-->
              <!--<span>车牌号码</span>-->
              <!--</div>-->
              <div class="input-item">
                <div class="input-wrapper">
                  <car-number
                    class="car-number-container"
                    style="height: 40px"
                    v-model="addVisitorDataModel.carNumber"
                  ></car-number>
                </div>
              </div>
              <!--</div>-->
            </cube-form-item>
          </cube-form-group>
        </div>

        <cube-form-group class="footer-btn">
          <div>
            <cube-button type="submit" class="sub-btn" @click="submit">{{
              isEditVisitor ? "激活" : "保存"
            }}</cube-button>
          </div>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import carNumber from "_c/carNumber/carNumber";
import DayRecord from "./dayRecord";

var isBack = false;

export default {
  name: "addVisitorInfo",
  components: {
    DayRecord,
    carNumber,
    returnHead
  },
  data() {
    return {
      topTitle: "添加访客",

      isVistorNameIn: false,
      isVistorPhoneIn: false,
      addVisitorDataModel: {
        vistorName: "",
        vistorSex: 1,
        vistorPhone: "",
        identityCard: "",
        carNumber: ""
      },
      validity: "",
      valid: "",
      addVisitorFields: [],
      options: {
        scrollToInvalidField: true
      },

      comnunitiesObj: {},
      isEditVisitor: false,
      visitorInfo: {},
      isSummit: false
      //  isBack: false
      // cos: null // cos上传对象
    };
  },

  created() {
    this.checkLocalStorage();

    this.addVisitorFields.push({
      type: "input",
      modelKey: "vistorName",
      label: "访客姓名",
      props: {
        placeholder: "请填写访客姓名"
      },
      rules: {
        required: this.isVistorNameIn,
        custom: val => {
          if (val) {
            if (this.isVistorNameIn) {
              return val.length <= 6;
            } else {
              return val.length <= 6 || !val;
            }
          }
        }
      },
      trigger: "change"
    });
    this.addVisitorFields.push({
      type: "input",
      modelKey: "identityCard",
      label: "身份证号",
      props: {
        placeholder: "请填写访客身份证"
      },
      rules: {
        required: true,
        custom: val => {
          if (val) {
            val = val.replace(/[ ]/g, "");
            return utils.numberVerification("identityCard", val);
          }
        }
      },
      messages: {
        custom: "请填写正确的身份证号码"
      },
      trigger: "change"
    });
    this.addVisitorFields.push({
      type: "radio-group",
      label: "访客性别",
      modelKey: "vistorSex",
      props: {
        options: ["男", "女"],
        action: "男"
      },
      rules: {
        required: false,
        custom: val => {
          return true;
        }
      }
    });
    this.addVisitorFields.push({
      type: "input",
      modelKey: "vistorPhone",
      label: "访客手机",
      props: {
        placeholder: "请填写访客手机号"
      },
      rules: {
        required: this.isVistorPhoneIn,
        custom: val => {
          if (val) {
            val = val.replace(/[ ]|[-]/g, "");
            if (this.isVistorPhoneIn) {
              return utils.numberVerification("telephone", val);
            } else {
              return utils.numberVerification("telephone", val) || !val;
            }
          }
        }
      },
      messages: {
        custom: "请填写正确的手机号"
      },
      trigger: "change"
    });
    this.addVisitorFields.push({
      type: "radio-group",
      label: "车牌号码",
      modelKey: "carNumber",
      props: {
        options: ["男", "女"],
        action: "男"
      },
      rules: {
        required: false,
        custom: val => {
          return (
            utils.numberVerification(
              "carNumber",
              this.addVisitorDataModel.carNumber
            ) || !this.addVisitorDataModel.carNumber
          );
        }
      }
    });
  },
  mounted() {
    /** 加载通讯录 **/
    setTimeout(() => {
      window.checkContactsResult = this.checkContactsResult;//调用原生通讯录回调，是否有权限
      window.readContacts = this.readContactsCallback; //调用原生通讯录回调
    }, 700);
  },
  computed: {},
  watch: {
    "addVisitorDataModel.identityCard": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (
            this.addVisitorDataModel.identityCard &&
            this.addVisitorDataModel.identityCard.length > 18
          ) {
            this.$nextTick(() => {
              this.addVisitorDataModel.identityCard = newValue.replace(
                /[ ]/g,
                ""
              );
              this.addVisitorDataModel.identityCard = this.addVisitorDataModel.identityCard.substring(
                0,
                18
              );
            });
          }
        }
      }
    },
    "addVisitorDataModel.vistorPhone": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (
            this.addVisitorDataModel.vistorPhone &&
            this.addVisitorDataModel.vistorPhone.length > 11
          ) {
            this.$nextTick(() => {
              this.addVisitorDataModel.vistorPhone = newValue.replace(
                /[ ]|[-]/g,
                ""
              );
              this.addVisitorDataModel.vistorPhone = this.addVisitorDataModel.vistorPhone.substring(
                0,
                11
              );
            });
          }
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (from.path == "/ma-hu-index/visitor-index") {
      isBack = true;
    } else {
      isBack = false;
    }
    next();
  },
  methods: {
    validName() {},
    checkLocalStorage() {
      let arg = JSON.parse(localStorage.getItem("comnunuties"));
      this.comnunitiesObj = arg ? arg : {};
      this.isVistorNameIn = this.comnunitiesObj.realNameStatus
        ? this.comnunitiesObj.realNameStatus
        : false;
      this.isVistorPhoneIn = this.comnunitiesObj.phoneStatus
        ? this.comnunitiesObj.phoneStatus
        : false;
      localStorage.removeItem("comnunuties");
      if (localStorage.getItem("visitorInfo")) {
        this.isEditVisitor = true;
        this.topTitle = "编辑访客资料";

        this.visitorInfo = JSON.parse(localStorage.getItem("visitorInfo"));
        this.addVisitorDataModel = this.visitorInfo ? this.visitorInfo : {};

        // this.comeDate = utils.timetrans(
        //   Number.parseInt(this.visitorInfo.startTimestamp),
        //   "yymmddhhmm"
        // );
        // this.leaveDate = utils.timetrans(
        //   Number.parseInt(this.visitorInfo.endTimestamp),
        //   "yymmddhhmm"
        // );
        // let comeDateDateTime = new Date(this.comeDate);
        // let leaveDateDateTime = new Date(this.comeDate);
        // this.data.objprop.comeDate = this.visitorInfo.startTimestamp;
        // this.data.objprop.leaveDate = this.visitorInfo.endTimestamp;
        localStorage.removeItem("visitorInfo");
      }
    },

    // selectDate(event, ...args) {
    //   //console.log(args)
    //   let title = "",
    //     now = new Date(),
    //     minDate = new Date(),
    //     show = new Date();
    //
    //   if (event === "comeDate") {
    //     this.leaveOrCome = true;
    //     title = "选择来访时间";
    //     this.leaveDate = "";
    //     /**
    //      * comeDate不为空
    //      * 比较comeDate和现在时间的大小，
    //      * 小于现在时间的话，最小时间为now，显示时间为now
    //      * 大于现在时间的话，最小时间为now，显示时间为comeDate
    //      */
    //     minDate = now;
    //     if (this.comeDate !== "") {
    //       let comeDateGetTime = new Date(this.comeDate).getTime();
    //       show =
    //         comeDateGetTime > now.getTime() ? new Date(this.comeDate) : now;
    //     } else {
    //       show = now;
    //     }
    //
    //     // 显示日期控件
    //     this.dateTimePicker = this.$createDatePicker({
    //       title: title,
    //       min: minDate,
    //       max: new Date(
    //         now.getFullYear() + 1,
    //         now.getMonth(),
    //         now.getDate(),
    //         now.getHours(),
    //         now.getMinutes()
    //       ),
    //       value: show,
    //       format: {
    //         year: "YYYY",
    //         month: "MM",
    //         day: "DD"
    //       },
    //       columnCount: 5,
    //       onSelect: this.selectHandle,
    //       onCancel: this.cancelHandle
    //     });
    //     this.dateTimePicker.show();
    //   } else {
    //     let leaveDate = new Date(this.comeDate);
    //     if (this.comeDate === "") {
    //       const toast = this.$createToast({
    //         type: "warn",
    //         txt: "请先选择来访时间"
    //       });
    //       toast.show();
    //       return;
    //     } else {
    //       this.leaveOrCome = false;
    //       title = "选择离开时间";
    //       /**
    //        * leaveDate不为空
    //        * 比较leaveDate和现在时间的大小，
    //        * 小于现在时间的话，最小时间为comeDate+6小时，显示时间为comeDate+3小时
    //        * 大于现在时间的话，最小时间为comeDate+6小时，显示时间为leaveDate
    //        */
    //       minDate = new Date(
    //         now.getFullYear(),
    //         now.getMonth(),
    //         now.getDate(),
    //         now.getHours() + 6,
    //         now.getMinutes()
    //       );
    //       let leaveDateGetTime = new Date(this.leaveDate).getTime();
    //       if (
    //         this.leaveDate !== "" &&
    //         leaveDateGetTime > now.getTime() + 6 * 60 * 60 * 1000
    //       ) {
    //         show = new Date(this.leaveDate);
    //       } else {
    //         show = new Date(
    //           leaveDate.getFullYear(),
    //           leaveDate.getMonth(),
    //           leaveDate.getDate(),
    //           leaveDate.getHours() + 3,
    //           leaveDate.getMinutes()
    //         );
    //       }
    //
    //       // 显示日期控件
    //       this.dateTimePicker = null;
    //       this.dateTimePicker = this.$createDatePicker({
    //         title: title,
    //         min: minDate,
    //         max: new Date(
    //           now.getFullYear() + 1,
    //           now.getMonth(),
    //           now.getDate(),
    //           now.getHours(),
    //           now.getMinutes()
    //         ),
    //         value: show,
    //         format: {
    //           year: "YYYY",
    //           month: "MM",
    //           day: "DD"
    //         },
    //         columnCount: 5,
    //         onSelect: this.selectHandle,
    //         onCancel: this.cancelHandle
    //       });
    //       this.dateTimePicker.show();
    //     }
    //   }

    // // 显示日期控件
    // if (!this.dateTimePicker || this.dateTimePicker === null) {
    //   this.dateTimePicker = this.$createDatePicker({
    //     title: title,
    //     min: minDate,
    //     max: new Date(now.getFullYear()+1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
    //     value: show,
    //     format: {
    //       year: 'YYYY',
    //       month: 'MM',
    //       day: 'DD'
    //     },
    //     columnCount: 5,
    //     onSelect: this.selectHandle,
    //     onCancel: this.cancelHandle
    //   });
    //   this.dateTimePicker.show();
    // }
    // },
    // selectHandle(selectedTime, selectedVal, formatedTime) {
    //   //todo 日期输入的规范性
    //   // console.log(selectedVal)
    //   //    console.log(new Date(`${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]} ${selectedVal[3]}:${selectedVal[4]}`))
    //   selectedVal[1] =
    //     selectedVal[1] > 9 ? selectedVal[1] : `0${selectedVal[1]}`;
    //   selectedVal[2] =
    //     selectedVal[2] > 9 ? selectedVal[2] : `0${selectedVal[2]}`;
    //   selectedVal[3] =
    //     selectedVal[3] > 9 ? selectedVal[3] : `0${selectedVal[3]}`;
    //   selectedVal[4] =
    //     selectedVal[4] > 9 ? selectedVal[4] : `0${selectedVal[4]}`;
    //   // console.log(selectedVal)
    //   this.leaveOrCome
    //     ? (this.comeDate = `${selectedVal
    //         .slice(0, -2)
    //         .join("-")} ${selectedVal.slice(3, 5).join(":")}`)
    //     : (this.leaveDate = `${selectedVal
    //         .slice(0, -2)
    //         .join("-")} ${selectedVal.slice(3, 5).join(":")}`);
    //   this.leaveOrCome
    //     ? (this.comeTimestamp = selectedTime)
    //     : (this.leaveTimestamp = selectedTime);
    //
    //   if (utils.isEmptyAddStrAddObj(this.comeTimestamp)) {
    //     this.data.objprop.leaveDate = this.leaveTimestamp.getTime();
    //   } else {
    //     this.data.objprop.comeDate = this.comeTimestamp.getTime();
    //     this.data.objprop.leaveDate = this.leaveTimestamp.getTime();
    //   }
    //   this.dateTimePicker = null;
    // },
    // cancelHandle(e) {
    //   this.dateTimePicker = null;
    // },

    // fileChange(e) {
    //   let self = this;
    //   let file = document.getElementsByName("file")[0].files[0];
    //   // let mFile = e.target.files[0];
    //   // let mFileArray = [];
    //   utils.toFileBase64(file).then(base64 => {
    //     self.uploadFile = base64;
    //     self.mFile = e.target.files;
    //   });
    // },

    /** 联系人 **/
    readContactss() {
      if(utils.isIos()) {
        utils.openContacts();
      } else {
        utils.checkContacts();
      }
    },
    checkContactsResult(res) {
      if(res === 1) {
        utils.openContacts();
      }
    },
    readContactsCallback(res) {
      if (utils.isIos()) {
        let JSONDataJson = JSON.parse(res);
        this.addVisitorDataModel.vistorName = JSONDataJson.userName;
        this.addVisitorDataModel.vistorPhone = JSONDataJson.userPhone;
      } else {
        this.addVisitorDataModel.vistorName = res.userName;
        this.addVisitorDataModel.vistorPhone = res.userPhone;
      }
    },

    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    submitHandler(e) {
      e.preventDefault();
      this.isSummit = true;
    },

    goToVisitorIndex() {
      if (isBack) {
        this.$router.back();
      } else {
        this.$router.replace({ path: "/ma-hu-index/visitor-index" });
      }
    },
    submit() {
      let self = this,
        nowDate = new Date();
      setTimeout(() => {
        if (this.isSummit) {
          let visitorData = {},
            url = "",
            message = "";

          if (this.isEditVisitor) {
            visitorData = {
              visitorID: self.addVisitorDataModel.vistorID,
              carNumber: self.addVisitorDataModel.carNumber
            };
            url = "/modify";
            message = "激活";
          } else {
            visitorData = {
              vistorName: self.addVisitorDataModel.vistorName,
              identityCard: self.addVisitorDataModel.identityCard,
              vistorSex: self.addVisitorDataModel.vistorSex,
              vistorPhone: self.addVisitorDataModel.vistorPhone,
              carNumber: self.addVisitorDataModel.carNumber,
              domicileID: self.comnunitiesObj.domicileID
            };
            url = "/add";
            message = "增加";
          }
          visitorData.startTime = nowDate.getTime();
          visitorData.endTime = nowDate.getTime() + 24 * 60 * 60 * 1000;

          self.$post("entry", url, visitorData).then(res => {
            self.isSummit = false;
            //   localStorage.setItem("inAndOutChange", "add");
            self.$createDialog(
                {
                  type: "confirm",
                  title: "提示",
                  confirmBtn: {
                    text: "分享到微信"
                  },
                  cancelBtn: {
                    text: "取消"
                  },
                  onConfirm: () => {
                    self.useVInfoShare(visitorData.visitorID?visitorData.visitorID:res.data, message + "成功！");
                  },
                  onCancel: () => {
                    self.goToVisitorIndex();
                  }
                },
                h => {
                  return [
                    h(
                      "div",
                      {
                        class: {
                          "pwd-content": true
                        },
                        slot: "content"
                      },
                      [
                        h(
                          "div",
                          {
                            class: {
                              "in-and-out-index-title": true
                            }
                          },
                          [h("span", message + "访客成功！")]
                        ),
                        h(
                          "div",
                          {
                            class: {
                              "in-and-out-index-details": true
                            },
                            style: {
                              "text-align": "center"
                            }
                          },
                          [h("span", "您要马上分享二维码给微信来访客人吗？")]
                        )
                      ]
                    )
                  ];
                }
              )
              .show();
          });
        } else {
          self
            .$createToast({
              type: "warn",
              txt: "请正确填写必填项"
            })
            .show();
        }
      }, 300);
    },

    // 分享二维码
    useVInfoShare(vistorID, toastStr) {
      let self = this;
      self.$post("entry", "/sharedlink", { visitorID: vistorID }).then(res => {
        utils
          .shareUrl(
            res.data.link,
            "来访二维码",
            "使用你的来访二维码进行来访确认"
          )
        //   .catch(err => {
        //   this.$createToast({
        //     type: "warn",
        //     txt: err
        //   }).show();
        // });
          setTimeout(() => {
              self.goToVisitorIndex();
            }, 250);
      });
    }
  },

};
</script>

<style lang="stylus" scoped>

.addVisitorInfo-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: #fff;
  z-index: 10;
  display: flex;
  flex-flow: column;

  .form-wrapper {
    flex: 1;
    overflow: auto;

    >>>.cube-form-item_invalid {
      input {
        padding-right: 1.333vw !important;
      }

      .cube-validator-msg {
        flex: 0 0 6.667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 13.333vw;

        &::before {
          padding-left: 0;
        }
      }
    }
  }

  .footer-btn {
    flex: 0 0 22.4vw;
    height: 22.4vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .sub-btn {
      width: 84vw;
      height: 11.733vw;
      background: linear-gradient(135deg, rgba(48, 202, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
      border-radius: 1.067vw;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.267vw;
      color: #fff;
      padding: 0;

      &:active {
        background: linear-gradient(135deg, darken(rgba(48, 202, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
      }
    }
  }

  .tips {
    margin: 0 5.33vw;
    padding: 2vw 0;
    border-radius: 1.33vw;
    background: rgba(237, 238, 240, 1);
    font-size: 2.67vw;
    text-align: center;
    color: #333333;
  }

  .input-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 4vw;
    height: 14.667vw;
    background: #fff;

    &:after {
      border-color: #eee;
    }

    &.visitor-time {
      .label-wrapper {
        flex: 0 0 21.333vw;
        font-size: 4.6666vw;
      }

      .input-wrapper {
        .text {
          font-size: 3.467vw;
        }
      }

      .lager {
        .text {
          font-size: 4.533vw;
          text-align: right;
          line-height: 5.333vw;
        }
      }
    }

    .label-wrapper {
      height: 14.667vw;
      display: flex;
      align-items: center;
      flex: 0 0 26.667vw;
      font-size: 4.6666vw;
      color: #333;

      i {
        flex: 0 0 3.5vw;
        margin-left: -4vw;
        color: #FF0000;
        font-style: normal;
      }
    }

    .input-wrapper {
      height: 14.667vw;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      font-size: 4.6666vw;

      .car-number-container {
        margin-right: 8vw;
        margin-left: 2vw;

        .cube-input {
          &::after {
            display: block;
          }

          input {
            padding: 0 2.667vw;
          }
        }
      }

      .text-box {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 62vw;
      }

      .text {
        flex: 1;
        font-size: 4.533vw;
        padding-right: 8vw;
        text-align: end;
        overflow: hidden;
        /* 文本不会换行 */
        white-space: nowrap;
        /* 当文本溢出包含元素时，以省略号表示超出的文本 */
        text-overflow: ellipsis;
      }

      .cube-input {
        flex: 1 !important;

        &:after {
          display: none;
        }

        input {
          padding-right: 8vw;
          font-size: 4.267vw;
          text-align: right;

          &::placeholder {
            color: #aaa;
            font-size: 4.267vw;
          }
        }
      }

      .gender-wrapper {
        display: flex;
        justify-content: flex-end;
        padding-right: 8vw;

        .gender-item {
          height: 10.667vw;
          width: 16vw;
          display: flex;
          border-radius: 1vw;
          background: #ddd;
          margin-right: 1.6vw;
          justify-content: center;
          align-items: center;
          color: #111;
          font-size: 4.267vw;

          &.active {
            background: linear-gradient(135deg, rgba(72, 204, 253, 1) 0%, rgba(51, 136, 255, 1) 100%);
            color: #fff;
          }
        }
      }
    }

    p {
      font-weight: bold;
      width: 30%;
      font-size: 3.47vw;

      i {
        color: red;
      }
    }

    .area {
      /* width: 35%; */
      width: 37.33vw;
      color: rgba(51, 51, 51, 1);
      font-weight: 400;
      font-size: 3.47vw;
      padding: 0 5%;
      /* height: 0.76rem; */
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: left;
      /* line-height: 0.4rem; */
      border-radius: 1.33vw;
      background: rgba(237, 238, 240, 1);
    }

    .select {
      font-weight: bold;
      width: 37.33vw;
      box-sizing: border-box;
      border: none;
      outline: none;
      background: rgba(237, 238, 240, 1);
      padding: 1.5vw 2.67vw;
      border-radius: 1.33vw;
    }

    // input {
    // width: 50%;
    // border: none;
    // text-align: right;
    // font-size: 3.47vw;
    // color: #4D4D4D;

    // &::placeholder {
    // font-weight: normal;
    // text-align: right;
    // font-size: 3.47vw;
    // }
    // }
    .sex-line {
      width: calc(16vw + 16vw + 2.67vw);
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .sex_btn_none {
        background: rgba(255, 255, 255, 1);
        color: rgba(179, 179, 179, 1);
        font-weight: 300;
        padding: 2vw 0;
        font-size: 3.47vw;
        width: 16vw;
        border: none;
        outline: none;
        border-radius: 5.33vw;
      }

      .sex_btn_active {
        font-weight: 600;
        /* font-size: 3.47vw; */
        color: rgba(51, 136, 255, 1);
        background: rgba(237, 238, 240, 1);
      }
    }

    .person-number {
      width: 20%;
      /* height: 0.73rem; */
      /* padding: 0 0.2rem; */
      border: 0;
      outline: none;
      text-align: center;
      background: rgba(237, 238, 240, 1);
      color: rgba(128, 128, 128, 1);
    }

    .input-line {
      width: 28.53vw;
      margin-right: 9vw;
      display: flex;
      flex-direction: row;
      align-items: center;

      input {
        padding: 1.2vw 5.07vw;
      }

      span {
        width: 8vw;
        height: 6.4vw;
        position: absolute;
      }

      span:last-child {
        margin-left: 26vw;
      }

      &::before {
        content: '';
        background: url('../../assets/inAndOut/icon_reduce_blue.png') no-repeat;
        background-position: center;
        display: inline-block;
        width: 8vw;
        height: 6.4vw;
        background-size: cover;
      }

      &::after {
        content: '';
        background: url('../../assets/inAndOut/icon_add_blue.png') no-repeat;
        display: inline-block;
        background-position: center;
        width: 8vw;
        height: 6.4vw;
        background-size: cover;
      }
    }

    /* .upload-file {
              background: url('../../assets/inAndOut/add.png') no-repeat;
              width: 13.33vw;
              height: 13.33vw;
              background-position: center;
              border: 1px solid #f0f0f0;
              overflow: hidden;
              background-color: rgba(237, 238, 240, 1);
              border-radius: 1.33vw;
            }

            .hasUploadFile {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: flex-start;
            } */
  }

  .summit-btn {
    border-radius: 1.33vw;
    padding: 3.73vw 0;
    background: rgba(51, 136, 255, 1);
    display: inline-block;
    left: 7%;
    right: 7%;
    width: 86%;
    height: 12.27vw;
    position: relative;
    margin: 5.33vw 0;
    font-size: 3.73vw;
  }

  >>>.cube-form-label {
    font-size: 4.6666vw;
  }

  >>>.cube-form_standard {
    position: absolute;
    top: 11.6666vw;
    left: 0;
    right: 0;
    bottom: 0;
    flex-flow: column;
    display: flex;
    flex: 1;
  }

  >>>.cube-form_standard .cube-form-item {
    min-height: 14.6666vw;
    padding: 0 0 0 4vw;

    .input-wrapper {
      height: 14.667vw;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      font-size: 4.6666vw;

      .car-number-container {
        margin-right: 8vw;
        margin-left: 2vw;

        .cube-input {
          &::after {
            display: block;
          }

          input {
            padding: 0 2.667vw;
          }
        }
      }
    }
  }

  .car-number-box {
    border-bottom: 1px solid #ebebeb90;
  }

  .car-number-box >>>.cube-form-label {
    padding: 0 0 0 3.4vw;
  }

  .addVisitorInfo-context >>>.cube-form-group-content {
    border-top: 1px solid #ebebeb90;
  }

  >>>.cube-form_standard .cube-input input {
    font-size: 4.533vw;
    padding: 4vw 8vw 4vw 0;
    text-align: right !important;

    &::before {
    }

    &::after {
    }

    &::placeholder {
    }
  }

  >>>.cube-form-group .cube-form-group-content {
    .footer-btn {
      flex: 0 0 22.4vw;
      height: 22.4vw;
      display: flex;
      justify-content: center;
      align-items: center;

      .sub-btn {
        width: 84vw;
        height: 11.733vw;
        background: linear-gradient(135deg, rgba(48, 202, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
        border-radius: 1.067vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.267vw;
        color: #fff;
        font-weight: bold;

        &:active {
          background: linear-gradient(135deg, darken(rgba(48, 202, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
        }
      }
    }
  }

  >>>.cube-form-label {
    span {
      color: #333;
    }
  }

  .cube-form-label-noxingxing >>>.cube-form-label {
    padding: 3.5vw;
  }

  /* todo 还未用到 */
  .unRequired .cube-form-label:before {
    content: '*';
    display: block;
    margin-top: 1px;
    margin-right: 0.3em;
    color: #fff;
  }
}
</style>

<style lang="stylus" scoped>
 .in-and-out-index-details {
   margin: 2vw 0 2vw 15.6666vw;
   font-size: 4.3333vw;
   width: 53.33vw;
   text-align: center;
 }

.note-book-btn
 width 30vw
 text-align right
 padding-right 8vw

.right-side
 display flex
 flex-flow row nowrap
 justify-content space-between
 align-items center
.name-input
 font-size smaller
 padding-top .5vw
 text-align center
</style>
