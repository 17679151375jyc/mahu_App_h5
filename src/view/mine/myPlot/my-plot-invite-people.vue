<!--@Time  : 2019/11/09 8:21-->
<!--@Author: michael huang-->
<!--@File  : my-plot-invite-people.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="社区邀请用户"></return-head>

    <div class="invite-people-form">
      <div v-for="(item,index) in fromFields" :key="index"
           class="base-horizontal-layout-space-between-item-center"
           :class="{'invite-people-form-item':true,'invite-people-form-item-line':index<fromFields.length-1}">
        <p v-if="index===0" style="align-self: flex-start;margin-top: 4.533333vw">{{item.title}}</p>
        <p v-else>{{item.title}}</p>
        <div>
          <div v-if="item.title==='关系'"
               class="base-horizontal-layout-center-item-center"
               @click="chooseRelation">
            <p v-if="item.value===''" class="invite-people-form-item-placeholder-text">{{item.placeholder}}</p>
            <p v-else>{{item.value}}</p>
            <img :src="require('@/assets/icon/icon_arrow-right-small.png')" class="base-icon-small-style" style="margin-left: 2.1333vw">
          </div>
          <div v-else class="base-horizontal-layout-center-item-center">
            <input :id="'invitePlotInput'+index"
                   :type="item.title==='对方账号' ? 'tel' : 'text'"
                   style="color: #666;text-align: right;border:none;resize:none;outline:none;height: 10vw"
                   :autofocus="false"
                   :placeholder="item.placeholder"
                   v-model="item.value"
                   :maxlength="item.title==='对方账号' ? '13' : item.title==='真实姓名' ? '6' : ''">
          </div>
        </div>
      </div>
    </div>

    <div class="base-button-fixed-bottom">
      <button-main text="完成" @btnOnclick="summitInvitePeople"></button-main>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import returnHead from '_c/head/return-head';
  import buttonMain from '_c/button/button-main';
  import { mapActions } from 'vuex';

  export default {
    name: "my-plot-invite-people",
    components: {returnHead,buttonMain},
    data() {
      return {
        titleList: [
          "真实姓名","对方账号","身份证号","关系"
        ],
        fromFields: [
          {
            title: "",
            placeholder: "请填写对方的真实姓名",
            value: ""
          },
          {
            title: "",
            placeholder: "请填写对方注册的手机号",
            value: ""
          },
          {
            title: "",
            placeholder: "请填写您有效的身份证号",
            value: ""
          },
          {
            title: "",
            placeholder: "请选择与您的关系",
            value: ""
          }
        ],

        relationType: 0,
        relationTypeList: [],
        chooseRelationIndex: 0,
        isSummit: false,
      }
    },
    created() {
      this.fromFields.forEach((item,index)=>{
        item.title = this.titleList[index];
      });
    },
    methods: {
      ...mapActions(
        ['setPushInfo']
      ),

      chooseRelation() {
        let self = this;
        self.$post("domicile", "/getRelationType", {
          // domicileNumber: self.$route.query.domicileNumber
        }).then((res) => {
          // res.data.forEach((item)=>{
          //   self.relationTypeList.push({
          //     relationType: item.relationType,
          //     value: item.cantactRelation,
          //     text: item.cantactRelation
          //   })
          // });

          let relationType = res.data;
          let relationTypeList = [];
          Object.keys(relationType).forEach((key)=>{
            relationTypeList.push({
              number: key,
              value: key,
              text: relationType[key]
            })
          });
          self.relationTypeList = [...relationTypeList];

          console.log(Object.getOwnPropertyNames(relationType).length);
          console.log(self.relationTypeList);

          if(self.relationTypeList.length === Object.getOwnPropertyNames(relationType).length) {
            if (!self.picker) {
              self.picker = self.$createPicker({
                title: '选择社区',
                data: [self.relationTypeList],
                selectedIndex: [self.chooseRelationIndex],
                onSelect: self.relationSelectHandle,
                onCancel: self.relationCancelHandle
              })
            }
            self.picker.show()
          }
        });
      },
      relationSelectHandle(selectedVal, selectedIndex, selectedText) {
        this.relationType = this.relationTypeList[selectedIndex].number;
        this.chooseRelationIndex = selectedIndex;
        this.fromFields.forEach((item)=>{
          if(item.title==="关系") {
            item.value = this.relationTypeList[selectedIndex].text;
          }
        });
        this.picker = undefined;
      },
      relationCancelHandle() {
        this.picker = undefined;
      },

      summitInvitePeople() {
        let self = this;
        let relationObj = {}, count = 0;
        if(self.isSummit) {
          const toast = this.$createToast({
            type: 'warn',
            txt: "请勿重复提交"
          });
          toast.show();
        } else {
          self.isSummit = true;
          self.fromFields.forEach((item,index)=>{
            count = index;
            switch (item.title) {
              case "真实姓名":
                if(item.value) {
                  relationObj.realName = item.value;
                } else {
                  const toast = this.$createToast({
                    type: 'warn',
                    txt: "真实姓名不能为空"
                  });
                  toast.show();
                  self.isSummit = false;
                  return;
                }
                break;
              case "对方账号":
                if(utils.numberVerification("telephone",item.value)) {
                  relationObj.phone = item.value;
                } else {
                  const toast = this.$createToast({
                    type: 'warn',
                    txt: "请输入正确的账号（手机号码）"
                  });
                  toast.show();
                  self.isSummit = false;
                  return;
                }
                break;
              case "身份证号":
                if(utils.numberVerification("identityCard",item.value)) {
                  relationObj.identityCard = item.value;
                } else {
                  const toast = this.$createToast({
                    type: 'warn',
                    txt: "请输入正确的身份证号码"
                  });
                  toast.show();
                  self.isSummit = false;
                  return;
                }
                break;
              default:
                break;
            }

            // if(item.title === "真实姓名") {
            //   if(item.value) {
            //     relationObj.realName = item.value;
            //   } else {
            //     const toast = this.$createToast({
            //       type: 'warn',
            //       txt: "真实姓名不能为空"
            //     });
            //     toast.show();
            //     self.isSummit = false;
            //     return;
            //   }
            // } else if(item.title === "对方账号") {
            //   if(utils.numberVerification("telephone",item.value)) {
            //     relationObj.phone = item.value;
            //   } else {
            //     const toast = this.$createToast({
            //       type: 'warn',
            //       txt: "请输入正确的账号（手机号码）"
            //     });
            //     toast.show();
            //     self.isSummit = false;
            //     return;
            //   }
            // } else if(item.title === "身份证号") {
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
            // }
          });

          if(relationObj.identityCard && relationObj.phone && relationObj.realName) {
            if(self.relationType) {
              relationObj.domicileNumber = self.$route.query.domicileNumber;
              relationObj.relationType = self.relationType;
              self.$post("domicile", "/inviteDomicile",
                relationObj
              ).then((res) => {
                self.$createToast({
                  type: 'correct',
                  txt: "邀请成功！"
                }).show();
                setTimeout(() => {
                  localStorage.setItem("plotInvitePeople", "add");
                  self.$router.goBack();
                  self.isSummit = false;
                }, 700);
              });
            } else {
              const toast = this.$createToast({
                type: 'warn',
                txt: "请选择与您的关系"
              });
              toast.show();
              self.isSummit = false;
            }
            setTimeout(() => {
              self.isSummit = false;
            }, 5000);
          }
        }
      },
    }
  }
</script>

<style scoped>
  .invite-people-form {
    margin-top: 2.6667vw;
  }
  .invite-people-form-item {
    margin: 0 8vw;
    min-height: 13.3333vw;
    font-size: 4.2666vw;
    color: #666;
  }
  .invite-people-form-item-line {
    border-bottom: 1px solid rgba(237,238,240,0.3);
  }
  .invite-people-form-item-placeholder-text {
    font-size: 3.7333vw;
    color: #CCC;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCC;
    font-size: 3.7333vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #CCC;
    font-size: 3.7333vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #CCC;
    font-size: 3.7333vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #CCC;
    font-size: 3.7333vw;
  }
</style>