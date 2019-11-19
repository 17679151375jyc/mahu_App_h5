<template>
  <div class="wrapper-white">
    <return-head title="加入社区"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="addPlotScroll"
        class="scroll-wrapper-text-style">
        <div class="form">
          <!--<div class="title">-->
            <!--<div class="left">-->
              <!--<div class="sub-title">住户信息</div>-->
            <!--</div>-->
          <!--</div>-->
          <div v-if="status===2"
               class="base-vertical-layout-center"
               :class="['form-item-line']"
               style="height: 10.5333vw;margin: 0 8vw">
            <p style="font-size: 3.7333vw;color: #D72A25">原因:{{feedBack}}---审核人:{{serverUserName}}</p>
          </div>
          <div v-for="(item,index) in fromFields" :key="index"
               class="base-horizontal-layout-space-between-item-center"
               :class="{'form-item':true,'form-item-line':index<fromFields.length-1}">
            <p v-if="index===0" style="align-self: flex-start;padding-top: 4.533333vw">{{item.title}}</p>
            <p v-else>{{item.title}}</p>
            <div v-if="item.title==='所在城区'"
                 class="base-horizontal-layout-center-item-center"
                 @click="chooseAddress">
              <p v-if="item.value3===''" class="form-item-placeholder-text">{{item.placeholder}}</p>
              <div v-else style="text-align: right;padding: 4.533333vw 0">
                <p>{{item.value1}}</p>
                <p style="margin-top: 1.6vw">{{item.value2}}</p>
                <p style="margin-top: 1.6vw">{{item.value3}}</p>
                <p style="margin-top: 1.6vw">{{item.value4}}</p>
              </div>
              <img :src="require('@/assets/icon/icon_arrow-right-small.png')" class="base-icon-small-style">
            </div>
            <div v-else-if="item.title==='社区名称'"
                 class="base-horizontal-layout-center-item-center"
                 @click="choosePlot">
              <p v-if="item.value===''" class="form-item-placeholder-text">{{item.placeholder}}</p>
              <p v-else>{{item.value}}</p>
              <img :src="require('@/assets/icon/icon_arrow-right-small.png')" class="base-icon-small-style">
            </div>
            <div v-else-if="item.title==='座号'" class="base-horizontal-layout-center-item-center">
              <p v-if="item.value1===''"
                 class="form-item-placeholder-text"
                 :class="{'form-item-choose-box':true}"
                 @click="chooseBuilding">{{item.placeholder1}}</p>
              <p v-else :class="{'form-item-choose-box':true}"
                 @click="chooseBuilding">{{item.value1}}</p>
              <p v-if="item.value2===''" class="form-item-placeholder-text"
                 :class="{'form-item-choose-box':true}"
                 style="margin-left: 1.87vw"
                 @click="chooseDoor">{{item.placeholder2}}</p>
              <p v-else :class="{'form-item-choose-box':true}"
                 style="margin-left: 1.87vw"
                 @click="chooseDoor">{{item.value2}}</p>
            </div>
            <div v-else-if="item.title==='性别'" class="gender">
              <div
                :class="['option', item.value === 1 ? 'selected' : '']"
                @click="setGender(1)">男</div>
              <div
                :class="['option', item.value === 0 ? 'selected-girl' : '']"
                @click="setGender(0)">女</div>
            </div>
            <div v-else class="base-horizontal-layout-center-item-center" >
            <textarea v-if="item.title==='通讯地址'"
                      :id="'plotInput'+index"
                      style="font-size: 4.2666vw;color: #666;padding: 3.43333vw 0;height: 13vw;border:none;resize:none;outline:none;text-align: end"
                      :placeholder="item.placeholder"
                      v-model="item.value"
                      maxlength="20"
                      @blur="lostInputFocus"
                      @focus="getInputFocus(index)">
            </textarea>
              <p v-else-if="item.title==='真实姓名' && isMUserRealName">{{item.value}}</p>
              <p v-else-if="item.title==='身份证号' && isMUserIdCard">{{item.value}}</p>
              <p v-else-if="item.title==='联系电话' && isMUserPhone">{{item.value}}</p>
              <input v-else
                     :id="'plotInput'+index"
                     :type="item.title==='联系电话' ? 'tel' : 'text'"
                     style="color: #666;text-align: right;border:none;resize:none;outline:none;height: 10vw"
                     :autofocus="false"
                     :placeholder="item.placeholder"
                     v-model="item.value"
                     :maxlength="item.title==='真实姓名' ? '6' : item.title==='真实姓名'? '13' :item.title==='身份证号' ? '18' : ''"
                     @blur="lostInputFocus"
                     @focus="getInputFocus(index)">
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>

    <div class="base-button-fixed-bottom">
      <button-main text="完成" @btnOnclick="summit"></button-main>
    </div>

    <address-popup v-if="isCityPopShow" :cityData=fromFields[0] @cityStrOnClick="cityStrOnClick"></address-popup>
    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <div class="base-vertical-layout-general">
        <p class="popup-text-plot">当前城市：{{fromFields[0].value2}}</p>
        <choose-text-list :list="popList" @itemOnClick="choosePlotItem"></choose-text-list>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import addressPopup from  '_c/popup/address-popup';
  import basePopup from '_c/popup/base-popup';
  import chooseTextList from '_c/list/choose-text';
  import buttonBackgroundBottom from '_c/button/button-background-bottom';
  import Textarea from "cube-ui/src/components/textarea/textarea";
  import buttonMain from '_c/button/button-main';
  import { mapState } from 'vuex';

  export default {
    components: {
      Textarea,
      returnHead,
      addressPopup,
      basePopup,
      chooseTextList,
      buttonBackgroundBottom,
      buttonMain
    },
    data() {
      return {
        applyID: '',

        isCityPopShow: false,
        isMUserRealName: false,
        isMUserIdCard: false,
        isMUserPhone: true,

        fromFields: [
          {
            title: "所在城区",
            placeholder: "请选择所在城区",
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            valueId1: 0,
            valueId2: 0,
            valueId3: 0,
            valueId4: 0,
            isChoose: false,
            isChooseStreet: true,
          },
          {
            title: "社区名称",
            placeholder: "请选择所在社区",
            value: "",
            valueId: ""
          },
          {//todo 有可能没有楼座
            title: "座号",
            placeholder1: "请选择所在楼座",
            value1: "",
            value1Id: "",
            placeholder2: "请选择所在门号",
            value2: "",
            value2Id: ""
          },
          {
            title: "真实姓名",
            placeholder: "请填写您的姓名",
            value: ""
          },
          {
            title: "性别",
            value: 1
          },
          {
            title: "身份证号",
            placeholder: "请填写您有效的身份证号",
            value: ""
          },
          {
            title: "联系电话",
            placeholder: "请填写您有效的联系电话",
            value: ""
          },
          // {
          //   title: "通讯地址",
          //   placeholder: "请填写您的通讯地址",
          //   value: ""
          // },
          // {
          //   title: "车辆车牌 （选填）",
          //   placeholder: "请填写您的车牌号码",
          //   value: ""
          // },
        ],
        feedBack: '',
        serverUserName: '',
        status: -1,
        // placeholder: "请填写您有效的证件号"
        // rules: {
        //   required: true
        //   pattern: /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
        // },
        // placeholder: "请填写您有效的手机号"

        // 弹窗属性
        isPopShow: false,
        refId: 'myPlotPopup',
        popTitle: '',
        plotList: [],
        plotID: '',
        buildingList: [],
        buildingID: '',
        doorList: [],
        doorID: '',
        popList: [],
        popListType: '',
        listIndex: -1,
        listItem: undefined,

        isSummit: false

        // uploadIsLoading: false,
      };
    },
    created() {
      this.fromFields.forEach((item)=>{
        switch (item.title) {
          case "真实姓名":
            if(this.mUserRealName) {
              item.value = this.mUserRealName;
              this.isMUserRealName = true;
            }
            break;
          case "身份证号":
            if(this.mUserIdCard) {
              item.value = this.mUserIdCard;
              this.isMUserIdCard = true;
            }
            break;
          case "联系电话":
            if(this.mUserPhone) {
              item.value = this.mUserPhone;
              this.isMUserPhone = true;
            }
            break;
          default:
            break
        }
      });
    },
    mounted() {
      let self = this;
      if (self.$route.query.applyID) {
        self.applyID = self.$route.query.applyID;
        self.checkApplyCommunity();
      }
    },
    computed: {
      ...mapState({
        'mUserPhone': state => state.user.userPhone,
        'mUserNickName': state => state.user.userNickName,
        'mUserRealName': state => state.user.userRealName,
        'mUserIdCard': state => state.user.userIdCard,
      })
    },
    methods: {
      checkApplyCommunity() {//获取申请社区信息
        let self = this;
        self.$post("community","/checkMyApply",{applyNumber:this.applyID}).then((res)=>{
          let applyObj = res.data;
          self.feedBack = res.data.feedBack;//不成功的反馈 //todo 之后要优化
          self.serverUserName = res.data.serverUserName;//不成功的反馈 //todo 之后要优化
          self.status = res.data.status;//取出状态 //todo 之后要优化
          self.fromFields.some(item =>{
            switch (item.title) {
              case "所在城区":
                item.valueId1 = applyObj.provinceCode;
                item.valueId2 = applyObj.cityCode;
                item.valueId3 = applyObj.areaCode;
                item.valueId4 = applyObj.streetCode;
                item.value1 = applyObj.province;
                item.value2 = applyObj.city;
                item.value3 = applyObj.area;
                item.value4 = applyObj.street;
                break;
              case "社区名称":
                item.valueId = applyObj.plotNumber;
                item.value = applyObj.plotName;
                break;
              case "座号":
                item.value1Id = applyObj.buildingNumber;
                item.value1 = applyObj.buildingName;
                item.value2Id = applyObj.doorNumber;
                item.value2 = applyObj.doorName;
                break;
              case "真实姓名":
                item.value = applyObj.realName;
                break;
              case "性别":
                item.value = applyObj.sex;
                break;
              case "身份证号":
                item.value = applyObj.identityCard;
                break;
              // case "联系电话":
              //   item.value = applyObj.phone;
              //   break;
              // case "通讯地址":
              //   item.value = applyObj.address;
              //   break;
              case "车辆车牌 （选填）":
                item.value = applyObj.carNumber;
                break;
              default:
                break;
            }
          });
        });

      },

      chooseAddress() {
        this.mInputBlur();
        this.isCityPopShow = true;
      },
      cityStrOnClick(e) {
        if (e.cityStr !== "")  {
          this.fromFields[0].value1 = e.province.name;
          this.fromFields[0].value2 = e.city.name;
          this.fromFields[0].value3 = e.area.name;
          this.fromFields[0].valueId1 = e.province.id;
          this.fromFields[0].valueId2 = e.city.id;
          this.fromFields[0].valueId3 = e.area.id;
          if (e.street.id === -1) {
            this.fromFields[0].value4 = "";
            this.fromFields[0].valueId4 = 0;
            this.fromFields[0].isChooseStreet = false;
          } else {
            this.fromFields[0].value4 = e.street.name;
            this.fromFields[0].valueId4 = e.street.id;
            this.fromFields[0].isChooseStreet = true;
          }
          this.fromFields[0].isChoose = true;
        }

        this.fromFields[1].value = "";
        this.fromFields[1].valueId = "";
        this.fromFields[2].value1 = "";
        this.fromFields[2].value1Id = "";
        this.fromFields[2].value2 = "";
        this.fromFields[2].value2Id = "";
        this.isCityPopShow = e.isPopShow;
      },

      choosePlot() {
        this.mInputBlur();
        let self = this;
        console.log(this.fromFields[0].valueId3)

        let filterObj = {};
        if (self.fromFields[0].valueId4 === 0) {
          filterObj.filterArea = self.fromFields[0].valueId3;
        } else {
          filterObj.filterArea = self.fromFields[0].valueId3;
          filterObj.filterStreet = self.fromFields[0].valueId4;
        }

        if (this.fromFields[0].valueId3 > -1) {
          self.$post("community","/plot", filterObj).then((res)=>{
            self.plotList = [...res.data.list];
            if (res.data.list.length===0) {
              const toast = this.$createToast({
                type: 'warn',
                txt: "您所在的城区暂无社区"
              });
              toast.show();
            } else {
              self.isPopShow = true;
              self.popTitle = "选择社区";
              for(let count = 0; count < self.plotList.length; count++) {
                self.plotList[count].value = self.plotList[count].name;
                if (count===0) {
                  self.plotList[count].isSeleted = true;
                } else {
                  self.plotList[count].isSeleted = false;
                }
              }
              self.popList = [...self.plotList];
              self.popListType = "plot";
              self.fromFields[2].value1 = "";
              self.fromFields[2].value1Id = "";
              self.fromFields[2].value2 = "";
              self.fromFields[2].value2Id = "";
            }
          });
        } else {
          const toast = this.$createToast({
            type: 'warn',
            txt: "请先选择所在城市"
          });
          toast.show();
        }
      },
      chooseBuilding() {
        this.mInputBlur();
        let self = this;
        if (this.fromFields[1].valueId !== "") {
          this.isPopShow = true;
          this.popTitle = "选择楼座";
          self.$post("community","/building",{
            plotId: this.fromFields[1].valueId
          }).then((res)=>{
            self.buildingList = [...res.data.list];
            for(let count = 0; count < self.buildingList.length; count++) {
              self.buildingList[count].value = self.buildingList[count].name;
              if (count===0) {
                self.buildingList[count].isSeleted = true;
              } else {
                self.buildingList[count].isSeleted = false;
              }
            }
            self.popList = [...self.buildingList];
            self.popListType = "building";
            self.fromFields[2].value2 = "";
            self.fromFields[2].value2Id = "";
          });
        } else {
          const toast = this.$createToast({
            type: 'warn',
            txt: "请先选择所在社区"
          });
          toast.show();
        }
      },
      chooseDoor() {
        this.mInputBlur();
        let self = this;
        if (this.fromFields[2].value1Id !== "") {
          this.isPopShow = true;
          this.popTitle = "选择门号";
          self.$post("community","/door",{
            buildingId: this.fromFields[2].value1Id
          }).then((res)=>{
            self.doorList = [...res.data.list];
            for(let count = 0; count < self.doorList.length; count++) {
              self.doorList[count].value = self.doorList[count].name;
              if (count===0) {
                self.doorList[count].isSeleted = true;
              } else {
                self.doorList[count].isSeleted = false;
              }
            }
            self.popList = [...self.doorList];
            self.popListType = "door";
          });
        } else {
          const toast = this.$createToast({
            type: 'warn',
            txt: "请先选择所在楼座"
          });
          toast.show();
        }
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
        switch (this.popListType) {
          case "plot":
            this.fromFields[1].value = this.listItem.name;
            this.fromFields[1].valueId = this.listItem.plotNumber;
            break;
          case "building":
            this.fromFields[2].value1 = this.listItem.name;
            this.fromFields[2].value1Id = this.listItem.buildingNumber;
            break;
          case "door":
            this.fromFields[2].value2 = this.listItem.name;
            this.fromFields[2].value2Id = this.listItem.doorNumber;
            break;
          default:
            break;
        }

        this.listItem = undefined;
      },

      setGender(value) {
        this.fromFields[4].value = value;
        this.mInputBlur();
      },

      lostInputFocus() {
      },
      getInputFocus(index) {
        if(index>4) {
          setTimeout(() => {
            let pannel = document.getElementById("plotInput"+index);
            pannel.scrollIntoView(true);
            pannel.scrollIntoViewIfNeeded();
          }, 200);
        }
      },

      summit() {
        this.mInputBlur();
        let self = this;
        if (self.isSummit) {
          self.$createToast({
            type: 'warn',
            txt: "请勿重复点击"
          }).show();
        } else {
          self.isSummit = true;
          let applyObj = {};
          self.fromFields.some(item =>{
            switch (item.title) {
              case "所在城区":
                applyObj.provinceCode = item.valueId1;
                applyObj.cityCode = item.valueId2;
                applyObj.areaCode = item.valueId3;
                applyObj.streetCode = item.valueId4;
                applyObj.province = item.value1;
                applyObj.city = item.value2;
                applyObj.area = item.value3;
                applyObj.street = item.value4;
                break;
              case "社区名称":
                applyObj.plotID = item.valueId;
                applyObj.plotName = item.value;
                break;
              case "座号":
                if(item.value2Id==="") {
                  let toast = this.$createToast({
                    type: 'warn',
                    txt: "请选择座号"
                  });
                  toast.show();
                  self.isSummit = false;
                  return true;
                } else {
                  applyObj.buildingID = item.value1Id;
                  applyObj.buildingName = item.value1;
                  applyObj.doorID = item.value2Id;
                  applyObj.doorName = item.value2;
                }
                break;
              case "真实姓名":
                if(item.value==="") {
                  let toast = this.$createToast({
                    type: 'warn',
                    txt: "请填写您的真实姓名"
                  });
                  toast.show();
                  self.isSummit = false;
                  return true;
                } else {
                  applyObj.realName = item.value;
                }
                break;
              case "性别":
                applyObj.sex = item.value;
                break;
              case "身份证号":
                if(utils.numberVerification("identityCard",item.value)) {
                  applyObj.identityCard = item.value.toUpperCase();
                } else {
                  let toast = this.$createToast({
                    type: 'warn',
                    txt: "身份证号码出错，请检查"
                  });
                  toast.show();
                  self.isSummit = false;
                  return true;
                }
                break;
              // case "联系电话":
              //   if(utils.numberVerification("telephone",item.value)) {
              //     applyObj.telephone = item.value;
              //   } else {
              //     let toast = this.$createToast({
              //       type: 'warn',
              //       txt: "手机号码出错，请填写正确的中国大陆号码"
              //     });
              //     toast.show();
              //     self.isSummit = false;
              //     return true;
              //   }
              //   break;
              // case "通讯地址":
              //   if(item.value==="") {
              //     let toast = this.$createToast({
              //       type: 'warn',
              //       txt: "请填写您的通讯地址"
              //     });
              //     toast.show();
              //     self.isSummit = false;
              //     return true;
              //   } else {
              //     applyObj.address = item.value;
              //   }
              //   break;
              case "车辆车牌 （选填）":
                // if(item.value==="") {
                //   return true;
                // } else {
                //   applyObj.carNumber = item.value;
                // }
                applyObj.carNumber = item.value;
                break;
              default:
                break;
            }
          });

          console.log(applyObj.plotID);
          console.log(applyObj.buildingID);
          console.log(applyObj.doorID);
          console.log(applyObj.realName);
          console.log(applyObj.identityCard);
          // console.log(applyObj.telephone);
          // console.log(applyObj.address);
          // console.log(applyObj.carNumber);

          if(applyObj.provinceCode && applyObj.cityCode && applyObj.areaCode && (applyObj.streetCode || applyObj.streetCode===0) &&
            applyObj.province && applyObj.city && applyObj.area && (applyObj.street || applyObj.street==="") &&
            applyObj.plotID && applyObj.buildingID && applyObj.doorID &&
            applyObj.realName && applyObj.identityCard
            // && applyObj.telephone && applyObj.address
            // && !applyObj.carNumber
          ) {
            if(self.applyID==="") {
              self.$post("community","/apply",applyObj).then((res)=>{
                localStorage.setItem("communityChangeOne","add");
                localStorage.setItem("communityChange","add");
                self.summitToast();
              });
            } else {
              applyObj.applyNumber = self.applyID;
              self.$post("community","/updateMyApply",applyObj).then((res)=>{
                localStorage.setItem("communityChangeOne","change");
                localStorage.setItem("communityChange","change");
                self.summitToast();
              });
            }
            setTimeout(() => {
              self.isSummit = false;
            }, 10000);
          }
        }
      },
      summitToast() {
        let self = this;
        const toast = this.$createToast({
          type: 'correct',
          txt: "提交成功"
        });
        toast.show();
        // self.$router.goBack();
        setTimeout(() => {
          self.$router.goBack();
          self.isSummit = false;
        }, 700);
      },

      mInputBlur() {
        if(!this.isMUserRealName) {
          utils.inputBlur("plotInput3");
        } else if (!this.isMUserIdCard) {
          utils.inputBlur("plotInput5");
        }
        // utils.inputBlur("plotInput6");
        // utils.inputBlur("plotInput7");
      }

      // fileChange: function(e) {
      //   // 图片上传
      //   var file = e.target.files[0];
      //   if (file.type.split("/")[0] !== "image") {
      //     // this.$Message.error("请选择正确的图片类型上传");
      //     alert("请选择正确的图片类型上传");
      //     return;
      //   }
      //   this.uploadIsLoading = true;
      //   cos.sliceUploadFile(
      //     {
      //       Bucket: Bucket,
      //       Region: Region,
      //       Key:
      //         "/web/visitor/" +
      //         "-" +
      //         new Date().getTime() +
      //         "-" +
      //         Math.ceil(Math.random() * 100) +
      //         "." +
      //         file.type.split("/")[1],
      //       Body: file
      //     },
      //     (err, data) => {
      //       console.log("上传成功 ");
      //       this.uploadIsLoading = false;
      //       if (err) {
      //         // this.$Message.error("上传出现错误！");
      //         alert("上传出现错误");
      //       }
      //       console.log(err, data);
      //       // this.form.info.files[name].path = "https://" + data.Location;
      //     }
      //   );
      // }
    }
  };
</script>

<style lang="stylus" scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 5.3333vw;

    .left {
      display: flex;
      align-items: center;
      flex: 1;

      .sub-title {
        flex: 0 0 25vw;
        font-size: 4.2667vw;
        color: #333;
        padding: 3.7333vw 0 1.8667vw 0;
      }
    }
  }

  .form {
    margin-top: 2.6667vw;
  }
  .form-item {
    margin: 0 8vw
    min-height: 13.3333vw;
    font-size: 4.2666vw;
    color: #666;
  }
  .form-item-line {
    border-bottom: 1px solid rgba(237,238,240,0.3);
  }
  .form-item-placeholder-text {
    font-size: 3.7333vw;
    color: #CCC;
  }
  .form-item-choose-box {
    background-color: rgba(237,238,240,1);
    border-radius: 1.33vw;
    padding: 1.33vw 2.67vw;
  }

  .gender {
    display: flex;
    justify-content: flex-end;
  }
  .gender .option {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 16vw;
    height: 10.6666vw;
    border-radius: 1.6vw;
    margin-left: 2.1333vw;
    text-align: center;
    background-color: #DDD;
    color: white !important;
    transition: background 0.3s;
  }
  .gender .option.selected {
    background: linear-gradient(to bottom , #38F, #48CCFD);
    color: white !important;
  }
  .gender .option.selected-girl {
    background: linear-gradient(to bottom , #F75C72, #FE81A2);
    color: white !important;
  }

  .popup-text-plot {
    width: 100%;
    margin-top: 6.4vw;
    font-size: 3.73vw;
    color: #4D4D4D;
    line-height: 5vw;
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
