<!--添加访客信息-->
<template>
  <div class="addVisitorInfo-wrapper">
    <return-head :title="topTitle"></return-head>

    <div class="form-wrapper">
      <div class="input-item border-bottom-1px">
        <div class="label-wrapper">
          <i v-if="!isEditVisitor">*</i>
          <span>访客姓名</span>
        </div>
        <div class="input-wrapper">
          <span v-if="isEditVisitor" class="text">{{visitorInfo.vistorName}}</span>
          <cube-input v-else v-model="name" placeholder="请填写访客真实姓名" :maxlength="6"></cube-input>
        </div>

        <!-- <p>
          <i v-if="!isEditVisitor">*</i>访客姓名
        </p>
        <p v-if="isEditVisitor" class="pp">{{visitorInfo.vistorName}}</p>
        <input
          v-else
          type="text"
          :autofocus="false"
          placeholder="请输入访客客人真实姓名"
          maxlength="6"
          v-model="name"
        />-->
      </div>
      <div
        v-if="comnunitiesObj.isIdentity>0 || visitorInfo.identityCard"
        class="input-item border-bottom-1px"
      >
        <div class="label-wrapper">
          <i v-if="!isEditVisitor">*</i>
          <span>身份证号</span>
        </div>
        <div class="input-wrapper">
          <span v-if="isEditVisitor" class="text">{{visitorInfo.identityCard}}</span>
          <cube-input v-else v-model="data.objprop.identityCard" placeholder="请填写访客身份证"></cube-input>
        </div>
        <!-- <p>
          <i v-if="!isEditVisitor">*</i>身份证号
        </p>-->

        <!-- <p v-if="isEditVisitor" class="pp">{{visitorInfo.identityCard}}</p>
        <input
          v-else
          type="text"
          :autofocus="false"
          placeholder="请输入来访客人身份证"
          :style="focusInput"
          v-model="data.objprop.identityCard"
          style="height: 13.3333vw;border:none;resize:none;outline:none"
        />-->
      </div>
      <div class="input-item border-bottom-1px">
        <div class="label-wrapper">
          <i v-if="!isEditVisitor">*</i>
          <span>访客性别</span>
        </div>
        <div class="input-wrapper">
          <span v-if="isEditVisitor" class="text">{{visitorInfo.vistorSex}}</span>
          <div v-else class="gender-wrapper">
            <div
              :class="['gender-item', data.objprop.sex===1 ? 'active': '']"
              @click="data.objprop.sex=1"
            >男</div>
            <div
              :class="['gender-item', data.objprop.sex===0 ? 'active': '']"
              @click="data.objprop.sex=0"
            >女</div>
          </div>
        </div>
      </div>
      <div class="input-item border-bottom-1px">
        <div class="label-wrapper">
          <i v-if="!isEditVisitor">*</i>
          <span>访客手机</span>
        </div>
        <!-- <p>
          <i v-if="!isEditVisitor">*</i>访客手机
        </p>-->
        <!--<p>访客手机</p>-->
        <div class="input-wrapper">
          <span v-if="isEditVisitor" class="text">{{visitorInfo.vistorPhone}}</span>
          <cube-input v-else v-model="data.objprop.phoneNumber" placeholder="请填写访客手机号"></cube-input>
        </div>
        <!-- <p v-if="isEditVisitor" class="pp">{{visitorInfo.vistorPhone}}</p>
        <input
          v-else
          type="text"
          :autofocus="false"
          placeholder="请输入手机号码"
          v-model="data.objprop.phoneNumber"
        />-->
      </div>
      <div class="input-item border-bottom-1px">
        <div class="label-wrapper">
          <span>来访小区</span>
        </div>
        <div class="input-wrapper">
          <span
            v-if="isEditVisitor"
            class="text"
          >{{`${visitorInfo.plotName} ${visitorInfo.buildingName} ${visitorInfo.doorName}`}}</span>
          <span
            v-else
            class="text"
          >{{`${comnunitiesObj.plotName} ${comnunitiesObj.buildingName} ${comnunitiesObj.doorName}`}}</span>
        </div>
        <!-- <p
          v-if="isEditVisitor"
          class="pp"
        >{{visitorInfo.plotName}} {{visitorInfo.buildingName}} {{visitorInfo.doorName}}</p>-->
        <!-- <p
          v-else
          class="pp"
        >{{comnunitiesObj.plotName}} {{comnunitiesObj.buildingName}} {{comnunitiesObj.doorName}}</p>-->
      </div>
      <div class="input-item visitor-time border-bottom-1px">
        <div class="label-wrapper">
          <span>来访时长</span>
        </div>
        <div class="input-wrapper">
          <span class="text">默认1天，过期可在访客管理重新激活</span>
        </div>
        <!-- <div class="base-text-details-normal-gray-ccc"></div> -->
      </div>
      <div
        v-if="(comnunitiesObj.parkId && comnunitiesObj.temporaryCount>0) ||
                 (visitorInfo.parkId && visitorInfo.temporaryCount>0)"
        class="input-item border-bottom-1px"
      >
        <div class="label-wrapper">
          <span>车牌号码</span>
        </div>
        <!-- <p>车牌号码</p> -->
        <div class="input-wrapper">
          <car-number class="car-number-container" style="height: 40px;" v-model="data.objprop.carNumber"></car-number>
        </div>
      </div>
      
    </div>

    <div class="footer-btn">
        <div class="sub-btn"  @click="summit">{{isEditVisitor ? '激活' : '保存'}}</div>
        <!-- <cube-button :inline="true" class="sub-btn" @click="summit">{{isEditVisitor ? '激活' : '保存'}}</cube-button> -->
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import CarNumber from "_c/carNumber/carNumber";
export default {
  name: "addVisitorInfo",
  components: {
    CarNumber,
    returnHead
  },
  data() {
    return {
      cNumber: null,
      hideValue: true,
      topTitle: "添加访客",
      name: "",
      uploadFile: "",
      identityNumber: "",
      // personNumber: 0,
      mFile: "",
      leaveOrCome: true,
      comeDate: "",
      leaveDate: "",
      comeTimestamp: "",
      leaveTimestamp: "",
      sexMen: ["sex_btn_none", "sex_btn_active"],
      sexWomen: ["sex_btn_none"],
      whichSex: "",
      focusInput: {},
      selectArea: 2,
      placeholder: 0,
      placeholderDate: 0,
      dateNumber: 0,
      optionsArea: [],
      comnunities: [],
      comnunitiesObj: {},
      value: "",
      options: {
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false
      },
      data: {
        objname: "333",
        objparent: "000",
        imgurl: "",
        objprop: {
          phoneNumber: "",
          carNumber: "",
          identityCard: "",
          sex: "女",
          同行人数: "",
          comeDate: 0,
          leaveDate: 0,
          业主id: "000",
          小区id: "000",
          楼座id: "000",
          住宅id: "000"
        }
      },

      isEditVisitor: false,
      visitorInfo: {},
      phoneNumber: "",
      identityCard: "",
      isSummit: false,

      cos: null // cos上传对象
    };
  },
  methods: {
    // changeNumber(e) {
    //   if (e < 0 && this.personNumber === 0) {
    //     return;
    //   } else if (e > 0 && this.personNumber === 99) {
    //     return;
    //   } else {
    //     this.personNumber += e;
    //     this.data.objprop.同行人数 = this.personNumber;
    //   }
    // },
    // inval(number) {
    //   number = Number.parseInt(number);
    //   number = Math.abs(number);
    //   Number.isNaN(number) ? this.placeholder = 0 : this.personNumber = number;
    // },
    /**
     * 显示前缀picker
     */
    areaShow() {
      utils.hideTab();
    },
    areaHide() {
      setTimeout(() => {
        // utils.showTab()
      }, 300);
    },
    // selectSex(sex) {
    //   this.whichSex = sex;
    //   if (sex == "男") {
    //     if (this.sexMen.length > 1) {
    //       return;
    //     } else {
    //       this.sexMen.push("sex_btn_active");
    //       this.data.objprop.sex = 1;
    //       this.sexWomen.pop();
    //     }
    //   } else {
    //     if (this.sexWomen.length > 1) {
    //       return;
    //     } else {
    //       this.sexWomen.push("sex_btn_active");
    //       this.data.objprop.sex = 0;
    //       this.sexMen.pop();
    //     }
    //   }
    // },

    idCardOnChange() {
      if (this.data && this.data.objprop) {
        this.data.objprop.identityCard = this.data.objprop.identityCard.replace(
          /[ ]/g,
          ""
        );
        if (
          this.data.objprop.identityCard &&
          this.data.objprop.identityCard.length > 18
        ) {
          this.data.objprop.identityCard = this.data.objprop.identityCard.substring(
            0,
            18
          );
        }
      }
    },

    selectDate(event, ...args) {
      //console.log(args)
      let title = "",
        now = new Date(),
        minDate = new Date(),
        show = new Date();

      if (event === "comeDate") {
        this.leaveOrCome = true;
        title = "选择来访时间";
        this.leaveDate = "";
        /**
         * comeDate不为空
         * 比较comeDate和现在时间的大小，
         * 小于现在时间的话，最小时间为now，显示时间为now
         * 大于现在时间的话，最小时间为now，显示时间为comeDate
         */
        minDate = now;
        if (this.comeDate !== "") {
          let comeDateGetTime = new Date(this.comeDate).getTime();
          show =
            comeDateGetTime > now.getTime() ? new Date(this.comeDate) : now;
        } else {
          show = now;
        }

        // 显示日期控件
        this.dateTimePicker = this.$createDatePicker({
          title: title,
          min: minDate,
          max: new Date(
            now.getFullYear() + 1,
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          ),
          value: show,
          format: {
            year: "YYYY",
            month: "MM",
            day: "DD"
          },
          columnCount: 5,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
        this.dateTimePicker.show();
      } else {
        let leaveDate = new Date(this.comeDate);
        if (this.comeDate === "") {
          const toast = this.$createToast({
            type: "warn",
            txt: "请先选择来访时间"
          });
          toast.show();
          return;
        } else {
          this.leaveOrCome = false;
          title = "选择离开时间";
          /**
           * leaveDate不为空
           * 比较leaveDate和现在时间的大小，
           * 小于现在时间的话，最小时间为comeDate+6小时，显示时间为comeDate+3小时
           * 大于现在时间的话，最小时间为comeDate+6小时，显示时间为leaveDate
           */
          minDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours() + 6,
            now.getMinutes()
          );
          let leaveDateGetTime = new Date(this.leaveDate).getTime();
          if (
            this.leaveDate !== "" &&
            leaveDateGetTime > now.getTime() + 6 * 60 * 60 * 1000
          ) {
            show = new Date(this.leaveDate);
          } else {
            show = new Date(
              leaveDate.getFullYear(),
              leaveDate.getMonth(),
              leaveDate.getDate(),
              leaveDate.getHours() + 3,
              leaveDate.getMinutes()
            );
          }

          // 显示日期控件
          this.dateTimePicker = null;
          this.dateTimePicker = this.$createDatePicker({
            title: title,
            min: minDate,
            max: new Date(
              now.getFullYear() + 1,
              now.getMonth(),
              now.getDate(),
              now.getHours(),
              now.getMinutes()
            ),
            value: show,
            format: {
              year: "YYYY",
              month: "MM",
              day: "DD"
            },
            columnCount: 5,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          });
          this.dateTimePicker.show();
        }
      }

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
    },
    selectHandle(selectedTime, selectedVal, formatedTime) {
      //todo 日期输入的规范性
      // console.log(selectedVal)
      //    console.log(new Date(`${selectedVal[0]}/${selectedVal[1]}/${selectedVal[2]} ${selectedVal[3]}:${selectedVal[4]}`))
      selectedVal[1] =
        selectedVal[1] > 9 ? selectedVal[1] : `0${selectedVal[1]}`;
      selectedVal[2] =
        selectedVal[2] > 9 ? selectedVal[2] : `0${selectedVal[2]}`;
      selectedVal[3] =
        selectedVal[3] > 9 ? selectedVal[3] : `0${selectedVal[3]}`;
      selectedVal[4] =
        selectedVal[4] > 9 ? selectedVal[4] : `0${selectedVal[4]}`;
      // console.log(selectedVal)
      this.leaveOrCome
        ? (this.comeDate = `${selectedVal
            .slice(0, -2)
            .join("-")} ${selectedVal.slice(3, 5).join(":")}`)
        : (this.leaveDate = `${selectedVal
            .slice(0, -2)
            .join("-")} ${selectedVal.slice(3, 5).join(":")}`);
      this.leaveOrCome
        ? (this.comeTimestamp = selectedTime)
        : (this.leaveTimestamp = selectedTime);

      if (utils.isEmptyAddStrAddObj(this.comeTimestamp)) {
        this.data.objprop.leaveDate = this.leaveTimestamp.getTime();
      } else {
        this.data.objprop.comeDate = this.comeTimestamp.getTime();
        this.data.objprop.leaveDate = this.leaveTimestamp.getTime();
      }
      this.dateTimePicker = null;

      // console.log("selectHandle111", this.comeTimestamp.getTime());
      // console.log("selectHandle222", this.leaveTimestamp.getTime());
      // console.log("selectHandle", new Date(this.comeDate).getTime());
      // console.log("selectHandle2", new Date(this.leaveDate).getTime());
    },
    cancelHandle(e) {
      this.dateTimePicker = null;
    },

    fileChange(e) {
      let self = this;
      let file = document.getElementsByName("file")[0].files[0];
      // let mFile = e.target.files[0];
      // let mFileArray = [];
      utils.toFileBase64(file).then(base64 => {
        self.uploadFile = base64;
        self.mFile = e.target.files;
      });
    },

    summit() {
      if (this.isSummit) {
        //todo return?
      } else {
        if (this.isEditVisitor) {
          this.editVisitorSumit();
        } else {
          if (this.name === "") {
            const toast = this.$createToast({
              type: "warn",
              txt: "带*为必填项"
            });
            toast.show();
          } else {
            if (
              this.data.objprop.phoneNumber &&
              utils.numberVerification(
                "telephone",
                this.data.objprop.phoneNumber
              )
            ) {
              console.log(this.data.objprop.identityCard);
              console.log(this.comnunitiesObj.isIdentity);
              if (
                this.comnunitiesObj.isIdentity <= 0 ||
                (this.data.objprop.identityCard &&
                  utils.numberVerification(
                    "identityCard",
                    this.data.objprop.identityCard
                  ))
              ) {
                this.addVisitorSumit("");
              } else {
                const toast = this.$createToast({
                  type: "warn",
                  txt: "请填写正确的身份证"
                });
                toast.show();
              }
            } else {
              const toast = this.$createToast({
                type: "warn",
                txt: "请填写正确的手机号"
              });
              toast.show();
            }
          }
        }
      }
    },
    addVisitorSumit(vistorPicture) {
      let nowDate = new Date();
      let self = this;
      if (
        utils.numberVerification("carNumber", self.data.objprop.carNumber) ||
        !self.data.objprop.carNumber
      ) {
        self
          .$post("entry", "/add", {
            vistorName: self.name,
            identityCard: self.data.objprop.identityCard,
            vistorSex: self.data.objprop.sex,
            vistorPhone: self.data.objprop.phoneNumber,
            carNumber: self.data.objprop.carNumber,
            // vistorPicture: vistorPicture,
            domicileID: self.comnunitiesObj.domicileID,
            // vistorNumbers: self.personNumber,
            // startTime: self.data.objprop.comeDate,
            // endTime: self.data.objprop.leaveDate,
            startTime: nowDate.getTime(),
            endTime: nowDate.getTime() + 24 * 60 * 60 * 1000
          })
          .then(res => {
            localStorage.setItem("inAndOutChange", "add");
            const toast = self.$createToast({
              type: "correct",
              txt: "添加成功！"
            });
            toast.show();
            self.isSummit = true;
            setTimeout(() => {
              self.$router.goBack();
            }, 1000);
          });
      } else {
        const toast = self.$createToast({
          type: "warn",
          txt: "请填写正确的车牌号码"
        });
        toast.show();
      }
    },
    editVisitorSumit() {
      let nowDate = new Date();
      let self = this;
      console.log(self.data.objprop.comeDate);
      console.log(self.data.objprop.leaveDate);
      if (
        utils.numberVerification("carNumber", self.data.objprop.carNumber) ||
        !self.data.objprop.carNumber
      ) {
        self
          .$post("entry", "/modify", {
            visitorID: self.visitorInfo.vistorID,
            carNumber: self.data.objprop.carNumber,
            // visitorQuantity: self.personNumber,
            // startTime: self.data.objprop.comeDate,
            // endTime: self.data.objprop.leaveDate,
            startTime: nowDate.getTime(),
            endTime: nowDate.getTime() + 6 * 60 * 60 * 1000
          })
          .then(res => {
            localStorage.setItem("inAndOutChange", "edit");
            const toast = self.$createToast({
              type: "correct",
              txt: "激活成功！"
            });
            toast.show();
            self.isSummit = true;
            setTimeout(() => {
              self.$router.goBack();
            }, 1000);
          });
      } else {
        const toast = self.$createToast({
          type: "warn",
          txt: "请填写正确的车牌号码"
        });
        toast.show();
      }
    },

    getID() {
      utils.getUserId().then(result => {
        this.data.objparent = this.result;
        this.data.objprop.业主id = this.result;
      });
      utils.comnunities().then(res => {
        if (res) {
          res.forEach((item, index, arr) => {
            if (item.statusInt === 1) {
              this.optionsArea.push(item.nameDesc);
            }
          });
          this.comnunities = [...res];
        }
      });
    },

    getSelectComnunitiesId() {
      this.comnunities.map((item, index) => {
        if (item.nameDesc == this.value) {
          this.data.objprop.小区id = item.cellID;
          this.data.objprop.楼座id = item.floorID;
          this.data.objprop.住宅id = item.addressID;
        }
      });
    },
    checkLocalStorage() {
      let arg = JSON.parse(localStorage.getItem("comnunuties"));
      console.log("StorageComnunuties", arg);
      this.comnunitiesObj = arg ? arg : {};
      localStorage.removeItem("comnunuties");
      if (
        localStorage.getItem("visitorInfo") &&
        localStorage.getItem("hideValue")
      ) {
        this.hideValue = false;
        this.isEditVisitor = true;
        this.topTitle = "编辑访客资料";
        console.log(localStorage.getItem("hideValue"));
        localStorage.removeItem("hideValue");
        this.visitorInfo = JSON.parse(localStorage.getItem("visitorInfo"));
        this.phoneNumber = utils.hiddenPhoneNum(this.visitorInfo.vistorPhone);
        this.data.objprop.carNumber = this.visitorInfo.carNumber;
        // let identityCardLen = this.visitorInfo.identityCard.length;
        // let identityCardStar = "";
        // for (let count = 0; count < this.visitorInfo.identityCard.length-2; count++) {
        //   identityCardStar = identityCardStar + "*"
        // }
        // this.identityCard = this.visitorInfo.identityCard.substring(0, 1) + identityCardStar +
        //   this.visitorInfo.identityCard.substring(identityCardLen-1, identityCardLen);
        // this.personNumber = Number.parseInt(this.visitorInfo.vistorNumbers);
        this.comeDate = utils.timetrans(
          Number.parseInt(this.visitorInfo.startTimestamp),
          "yymmddhhmm"
        );
        console.log("comeDate", this.comeDate);
        this.leaveDate = utils.timetrans(
          Number.parseInt(this.visitorInfo.endTimestamp),
          "yymmddhhmm"
        );

        let comeDateDateTime = new Date(this.comeDate);
        let leaveDateDateTime = new Date(this.comeDate);
        this.data.objprop.comeDate = this.visitorInfo.startTimestamp;
        console.log("objpropComeDate1", comeDateDateTime);
        console.log("objpropComeDate2", comeDateDateTime.getTime());
        console.log("objpropComeDate3", this.data.objprop.comeDate);
        this.data.objprop.leaveDate = this.visitorInfo.endTimestamp;
        localStorage.removeItem("visitorInfo");
        localStorage.removeItem("hideValue");
      } else if (this.$route.params.hideValue) {
        this.hideValue = false;
      }
    },
    checkIos() {
      if (!utils.isIos()) {
        //如果不是ios则需要加一个capture的属性 //todo
        // document.getElementsByName('file')[0].setAttribute('capture', 'camera');
      }
    }
  },

  created() {
    this.data.objprop.sex = 1;
    utils.hideTab().then(e => {
      this.checkLocalStorage();
      this.getID();
      // this.checkIos();//todo 拍照暂时没有用
    });
  },
  destroyed() {
    if (window.localStorage && localStorage.getItem("hideValue")) {
      localStorage.removeItem("hideValue");
    }
  },
  mounted() {},
  computed: {},
  watch: {
    value(newData, old) {
      this.getSelectComnunitiesId();
    },

    "data.objprop.phoneNumber": {
      handler(newValue, oldValue) {
        console.log("触发watch");
        if (newValue) {
          this.data.objprop.phoneNumber = newValue.replace(/[ ]|[-]/g, "");
          if (
            this.data.objprop.phoneNumber &&
            this.data.objprop.phoneNumber.length > 11
          ) {
            this.data.objprop.phoneNumber = this.data.objprop.phoneNumber.substring(
              0,
              11
            );
          }
        }
      }
    },

    "data.objprop.identityCard": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.data.objprop.identityCard = newValue.replace(/[ ]/g, "");
          if (
            this.data.objprop.identityCard &&
            this.data.objprop.identityCard.length > 18
          ) {
            this.data.objprop.identityCard = this.data.objprop.identityCard.substring(
              0,
              18
            );
          }
        }
      }
    }
  }
};
</script>


<style lang="stylus">
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
  }
  .footer-btn{
      flex: 0 0 22.4vw;
      height:22.4vw;
      display:flex;
      justify-content center;
      align-items:center;
      .sub-btn{
          width:84vw;
          height:11.733vw;
          background:linear-gradient(270deg,rgba(48,202,255,1) 0%,rgba(51,136,255,1) 100%);
          border-radius:1.067vw;
          display:flex;
          justify-content: center;
          align-items:center;
          font-size:4.267vw;
          color:#fff;
          font-weight: bold;
          &:active{
              background:linear-gradient(270deg,darken(rgba(48,202,255,1), 20%) 0%,darken(rgba(51,136,255,1), 20%) 100%);
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
    padding: 0 0 0 8vw;
    height: 13.333vw;
    background: #fff;
    &:after{
        border-color:#eee;

    }

    &.visitor-time {
      .label-wrapper {
        flex: 0 0 21.333vw;
      }

      .input-wrapper {
        .text {
          font-size: 3.467vw;
        }
      }
    }

    .label-wrapper{
      height: 13.333vw;
      display: flex;
      align-items: center;
      flex: 0 0 26.667vw;
      font-size: 4.267vw;
      color: #333;

      i {
        flex: 0 0 4vw;
        margin-left: -4vw;
        color: #FF0000;
        font-style: normal;
      }
    }

    .input-wrapper {
      height: 13.333vw;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      .car-number-container{
          margin-right:8vw;
          margin-left: 8vw;
          .cube-input{
              &::after{
                  display:block;
              }
              input{
                  padding: 0 2.667vw;
              }
          }
      }

      .text {
        flex: 1;
        font-size: 4.267vw;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 8vw;
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
          border-radius: 1.6vw;
          background: #ddd;
          margin-right: 1.6vw;
          justify-content: center;
          align-items: center;
          color: #111;
          font-size: 4.267vw;

          &.active {
            background: linear-gradient(360deg, rgba(72, 204, 253, 1) 0%, rgba(51, 136, 255, 1) 100%);
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
    //   width: 50%;
    //   border: none;
    //   text-align: right;
    //   font-size: 3.47vw;
    //   color: #4D4D4D;

    //   &::placeholder {
    //     font-weight: normal;
    //     text-align: right;
    //     font-size: 3.47vw;
    //   }
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

    .come-date {
      width: 41.333333vw;
      padding: 1.333333vw;
      box-sizing: border-box;
      background: rgba(237, 238, 240, 1);
      border-radius: 1.33vw;
      display: flex;
      flex-direction: row;
      font-weight: 500;
      align-items: center;
      justify-content: space-between;
      text-align: left;

      &::after {
        content: '';
        background: url('../../assets/inAndOut/carlendar.png') no-repeat;
        display: inline-block;
        background-position: center;
        width: 3.73vw;
        height: 3.73vw;
        background-size: cover;
      }

      &::placeholder {
        text-align: left;
      }
    }

    .comeDate-img {
      width: 4.73vw;
      height: 4.73vw;
      position: absolute;
      right: 6.6vw;
    }

    .upload-file {
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
    }
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
}
</style>
