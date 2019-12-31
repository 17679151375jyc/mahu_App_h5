<!--@Time  : 2019/11/09 8:21-->
<!--@Author: michael huang-->
<!--@File  : my-plot-invite-people.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="社区邀请用户"></return-head>

    <div class="invite-people-form" style="background-color: #F2F2F2">
      <div
        class="base-horizontal-layout-space-between-item-center"
        style="background-color: white;min-height: 13.3333vw"
      >
        <div
          class="base-horizontal-layout-center-item-center"
          style="width: 61.3333vw;margin-left: 6vw;"
        >
        <span style="color: #ff0e00;font-size: 4.2666vw;padding-right: 2vw">
          *
        </span>
          <input
            id="invitePlotInput0"
            type="number"
            class="invite-people-phone"
            style="font-size: 4.2666vw;color: #666;height: 10.6666vw;border:1px solid #eeeeee;resize:none;outline:none;border:0"
            :autofocus="false"
            placeholder="请填写对方注册的手机号"
            v-model="phone"
            @input="inputOnChange('对方账号', phone)"
            maxlength="11"
          />
        </div>
        <div
          class="base-horizontal-layout-end-item-center"
          style="height: 13vw;flex: 1;margin-right: 8.333vw"
          @click="readContactss"
        >
          <p class="base-text-title-normal-blue">通讯录</p>
          <img
            :src="require('@/assets/icon/icon-arrow-right-list.png')"
            class="base-icon-small-style"
            style="margin-left: 1.6vw"
          />
        </div>
      </div>

      <div
        v-for="(item, index) in fromFields"
        :key="index"
        class="base-horizontal-layout-space-between-item-center invite-people-form-item"
        :class="{
          'invite-people-form-item-line': index < fromFields.length - 1
        }"
      >
        <!--'invite-people-form-item-bottom':index===0-->
        <p
          v-if="index === 0"
          style="align-self: flex-start;margin-top: 4.533333vw"
        >
          <span style="color: #FF0000">* </span>{{ item.title }}
        </p>
        <p v-else><span style="color: #FF0000">* </span>{{ item.title }}</p>
        <div>
          <div
            v-if="item.title === '关系'"
            style="padding-right: 8vw"
            class="base-horizontal-layout-center-item-center"
            @click="chooseRelation"
          >
            <p
              v-if="item.value === ''"
              class="invite-people-form-item-placeholder-text"
            >
              {{ item.placeholder }}
            </p>
            <p v-else>{{ item.value }}</p>
            <img
              :src="require('@/assets/icon/icon_arrow-right-small.png')"
              class="base-icon-small-style"
              style="margin-left: 2.1333vw"
            />
          </div>
          <div v-else class="base-horizontal-layout-center-item-center">
            <input
              :id="'invitePlotInput' + index"
              :type="item.title === '对方账号' ? 'number' : 'text'"
              style="font-size: 4.2666vw;color: #666;text-align: right;eight: 10vw;padding-right: 8vw;border:0"
              :autofocus="false"
              :placeholder="item.placeholder"
              v-model="item.value"
              @input="inputOnChange(item.title, item.value)"
              :maxlength="
                item.title === '对方账号'
                  ? '11'
                  : item.title === '真实姓名'
                  ? '6'
                  : ''
              "/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" style="padding-top: 3vw;background-color: #F2F2F2">
      <div class="base-text-title-normal-red invite-people-form-tip-text">
        {{ errorMessage }}
      </div>
    </div>

    <div class="base-button-fixed-bottom" v-if="isSure == 1">
      <button-main text="完成" @btnOnclick="summitInvitePeople"></button-main>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import buttonMain from "_c/button/button-main";
import { mapActions } from "vuex";

export default {
  name: "my-plot-invite-people",
  components: { returnHead, buttonMain },
  data() {
    return {
      // titleList: [
      //   "真实姓名","对方账号","身份证号","关系"
      // ],
      titleList: ["对方账号", "真实姓名", "关系"],
      fromFields: [
        // {
        //   title: "",
        //   placeholder: "请填写对方注册的手机号",
        //   value: ""
        // },
        // {
        //   title: "",
        //   placeholder: "请填写对方的真实姓名",
        //   value: ""
        // },
        // {
        //   title: "",
        //   placeholder: "请填写您有效的身份证号",
        //   value: ""
        // },
        // {
        //   title: "",
        //   placeholder: "请选择与您的关系",
        //   value: ""
        // }
      ],

      phone: "",
      relationType: 0,
      relationTypeList: [],
      isSure: -1,
      errorMessage: null,
      isSummit: false,
      realName: ""
    };
  },
  watch: {
    isSure() {
      if (this.isSure === 1) {
        this.fromFields.push({
          title: "真实姓名",
          placeholder: "请填写对方的真实姓名",
          value: this.realName
        });
        this.fromFields.push({
          title: "关系",
          placeholder: "请选择与您的关系",
          value: ""
        });
      } else {
        if (this.fromFields.length > 0) {
          for (let i = this.fromFields.length - 1; i >= 0; i--) {
            this.fromFields.splice(i, 1);
          }
        }
      }
    }
    // "fromFields[0].value": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       if (
    //         this.fromFields[0].value &&
    //         this.fromFields[0].value.length > 11
    //       ) {
    //         this.$nextTick(() => {
    //           this.fromFields[0].value = newValue.replace(
    //             /[ ]|[-]/g,
    //             ""
    //           );
    //           this.fromFields[0].value = this.fromFields[0].value.substring(
    //             0,
    //             11
    //           );
    //         });
    //       }
    //     }
    //   }
    // }
  },
  created() {
    this.fromFields.forEach((item, index) => {
      item.title = this.titleList[index];
    });
  },
  mounted() {
    /** 加载通讯录 **/
    setTimeout(() => {
      window.readContacts = this.readContactsCallback; //调用原生通讯录回调
    }, 700);
  },
  methods: {
    ...mapActions(["setPushInfo"]),

    inputOnChange(type, value) {
      let self = this;
      if (type === "对方账号") {
        this.$nextTick(() => {
          // this.fromFields[0].value = this.fromFields[0].value.replace(
          //   /[ ]|[-]/g,
          //   ""
          // );
          this.phone = this.phone.substring(0, 11);
          if (this.phone && this.phone.length == 11) {
            this.checkPhoneNumber(this.phone);
          } else {
            this.errorMessage = "请输入正确的手机号码";
            this.isSure = -1;
          }
        });
      }
    },

    /** 联系人 **/
    readContactss() {
      utils.openContacts();
    },
    readContactsCallback(res) {
      if (utils.isIos()) {
        let JSONDataJson = JSON.parse(res);
        this.phone = JSONDataJson.userPhone;
        this.checkPhoneNumber(JSONDataJson.userPhone);
      } else {
        this.phone = res.userPhone;
        this.checkPhoneNumber(res.userPhone);
      }
    },
    checkPhoneNumber(phone) {
      let self = this;
      this.phone = this.phone.substring(0, 11);
      if (utils.numberVerification("telephone", phone)) {
        self.isSure = 0;
        self.$post(
            "baseClient",
            "/getUserData",
            {
              phone: phone
            },
            { returnAll: true }
          )
          .then(res => {
            if (res.errorCode == 0) {
              self.isSure = 1;
              self.realName = res.data.realName;
              this.errorMessage = null;
            } else {
              this.errorMessage = res.errorMsg;
            }
          });
      } else {
        // const toast = this.$createToast({
        //   type: "warn",
        //   time: 1000,
        //   txt: "号码不正确，请重新填写"
        // });
        // toast.show();
        self.errorMessage = "请输入正确的手机号码";
        self.isSure = -1;
      }
    },

    chooseRelation() {
      let self = this;
      if (!self.relationTypeList || self.relationTypeList.length == 0) {
        self
          .$post("domicile", "/getRelationType", {
            // domicileNumber: self.$route.query.domicileNumber
          })
          .then(res => {
            for (const key in res.data) {
              self.relationTypeList.push({
                number: key,
                value: key,
                text: res.data[key]
              });
            }
            this.showPicker();
          });
      } else {
        this.showPicker();
      }
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "选择关系",
          data: [this.relationTypeList],
          onSelect: this.relationSelectHandle
        });
      }
      this.picker.show();
    },
    relationSelectHandle(selectedVal, selectedIndex, selectedText) {
      this.relationType = this.relationTypeList[selectedIndex].number;
      this.fromFields.forEach(item => {
        if (item.title === "关系") {
          item.value = this.relationTypeList[selectedIndex].text;
        }
      });
    },

    summitInvitePeople() {
      let self = this;
      let relationObj = {},
        count = 0;

      if (utils.numberVerification("telephone", self.phone)) {
        if (self.isSure) {
          if (!self.isSummit) {
            if (self.phone) {
              relationObj.phone = self.phone;
              self.fromFields.forEach((item, index) => {
                count = index;
                switch (item.title) {
                  case "真实姓名":
                    if (item.value) {
                      relationObj.realName = item.value;
                    } else {
                      const toast = this.$createToast({
                        type: "warn",
                        time: 1000,
                        txt: "真实姓名不能为空"
                      });
                      toast.show();
                    }
                    break;
                  // case "对方账号":
                  //   if(utils.numberVerification("telephone",self.phone)) {
                  //     relationObj.phone = self.phone;
                  //   } else {
                  //     const toast = this.$createToast({
                  //       type: 'warn',
                  //       txt: "请输入正确的账号（手机号码）"
                  //     });
                  //     toast.show();
                  //     self.isSummit = false;
                  //     return;
                  //   }
                  //   break;
                  // case "身份证号":
                  //   if(utils.numberVerification("identityCard",item.value)) {
                  //     relationObj.identityCard = item.value;
                  //   } else {
                  //     const toast = this.$createToast({
                  //       type: 'warn',
                  //       txt: "请输入正确的身份证号码"
                  //     });
                  //     toast.show();
                  //     self.isSummit = false;
                  //     return;
                  //   }
                  //   break;
                  default:
                    break;
                }
              });
            } else {
              const toast = this.$createToast({
                type: "warn",
                time: 1000,
                txt: "请输入正确的账号（手机号码）"
              });
              toast.show();
              return;
            }

            // relationObj.identityCard
            if (relationObj.phone && relationObj.realName) {
              if (self.relationType) {
                self.isSummit = true;
                relationObj.domicileNumber = self.$route.query.domicileNumber;
                relationObj.relationType = self.relationType;
                self
                  .$post("domicile", "/inviteDomicile", relationObj)
                  .then(res => {
                    self
                      .$createToast({
                        type: "correct",
                        time: 1000,
                        txt: "邀请成功！"
                      })
                      .show();
                    setTimeout(() => {
                      // localStorage.setItem("plotInvitePeople", "add");
                      this.$router.goBack();
                      self.isSummit = false;
                    }, 700);
                  });
              } else {
                const toast = this.$createToast({
                  type: "warn",
                  txt: "请选择与您的关系"
                });
                toast.show();
              }
              setTimeout(() => {
                self.isSummit = false;
              }, 1000);
            }
          }
        } else {
          this.$createToast({
            type: "warn",
            txt: "请确认对方账户是否已注册《马虎》App"
          }).show();
        }
      } else {
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "号码不正确，请重新填写"
        }).show();
      }
    }
  }
};
</script>

<style scoped>
.invite-people-form {
  margin-top: 2.6667vw;
}
.invite-people-form-item {
  padding: 0 0 0 8vw;
  min-height: 13.3333vw;
  font-size: 4.2666vw;
  color: #666;
  background-color: white;
}
.invite-people-form-item-line {
  border-bottom: 1px solid rgba(237, 238, 240, 0.3);
}
.invite-people-form-item-bottom {
  margin-bottom: 3vw;
}
.invite-people-form-item-placeholder-text {
  font-size: 4.2666vw;
  color: #ccc;
}

.invite-people-form-tip-text {
  width: 100vw;
  text-align: center;
  background-color: white;
  padding-top: 2.6666vw;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccc;
  font-size: 4.2666vw;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #ccc;
  font-size: 4.2666vw;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #ccc;
  font-size: 4.2666vw;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #ccc;
  font-size: 4.2666vw;
}
</style>
