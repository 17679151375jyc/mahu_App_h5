<template>
  <div class="wrapper-white">
    <return-head title="用户信息编辑"></return-head>
      <div class="test" v-if='cancasDiv'>
        <div class="base-horizontal-layout-space-between-item-center div_box_header">
          <div class="close" @click="closeClick">取消</div>
          <div class="ok_css" @click='tailoring'>确定</div>
        </div>
        <vueCropper ref="cropper"
          class="tailoring_css"
          v-if='cancasDiv'
          :img="example2.img"
          :outputSize="1"
          :outputType="'jpeg'"
          :autoCrop="true"
          :autoCropWidth="300"
          :autoCropHeight="300"
          :fixed="true"
          :fixedBox='true'
          :centerBox='true'
          :enlarge="4"></vueCropper>
      </div>
        <!-- <button @click="finish2()" class="btn">裁剪</button> -->

      <div class="userManage-item-box div_box">
        <input @change='updataImg($event)' type="file" class="test_img" accept="image/*" >
        <div class=" base-horizontal-layout-space-between-item-center img_css">
          <p class="base-text-title-normal-666">用户头像</p>
          <div style="width: 70vw;" class="base-horizontal-layout-right-item-center" >
            <div class="img_box"  @click="bigImg()">
              <img :src="imgUrl? getImageUrl(imgUrl):require('./../icon-avatar.png')">
            </div>
              <img :src="require('@/assets/icon/icon_arrow-right-2.png')" alt="" class="arrow-right"  />
          </div>
        </div>
      </div>
    <div v-for="(item,index) in userInfo" :key="index"
         class="userManage-item-box">
      <div class="base-horizontal-layout-space-between-item-center"
           style="height: 13.3333vw;border-bottom: 1px solid rgba(221,221,221,0.3)">
        <p class="base-text-title-normal-666">{{item.title}}</p>
        <input class="base-text-title-normal-666"
               style="width:70vw;text-align: end;border:none;resize:none;outline:none;"
               v-model="item.value"
               :maxlength="item.maxLength"
               :placeholder="item.placeholder"/>
      </div>
    </div>

    <div class="base-button-fixed-bottom">
      <button-main text="保存" @btnOnclick="saveOnClick"></button-main>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  import returnHead from '_c/head/return-head';
  import Input from "cube-ui/src/components/input/input";
  import buttonMain from '_c/button/button-main';
  import basePopup from '_c/popup/base-popup';
  import { VueCropper } from 'vue-cropper'
  import COS from "cos-js-sdk-v5";
  var cos;
  export default {
    name: "userManage",
    components: {
      Input,
      returnHead,
      buttonMain,
      basePopup,
      VueCropper
    },
    props: {
      value: {
        // 图片路径
        type: Array,
        default: null
      },
      pathDir: {
        // 文件存放的目录
        type: String,
        default: "/web/family/"
      },
      fileNamePrefix: {
        // 文件名前缀
        type: String,
        default: ""
      }
    },
    data() {
      return {
        urlPath: '/family/img/icon-avatar.63c40b3d.png',
        tipShow: true,
        imgUrl: null,
        cancasDiv: false,
         example2: {
          img: null,
        },
        userInfo: [
          {title: "用户昵称", value: "", placeholder: "请限制在13个字符以内", maxLength: 13},
          {title: "真实姓名", value: "", placeholder: "请输入您的真实姓名", maxLength: 6},
          {title: "证件号码", value: "", placeholder: "请输入您的身份证件号", maxLength: -1},
        ],

        isPopShow: false,
        refId: 'userManagePopup',
        popTitle: '',
        popPlainText: ''
      }
    },
    computed: {
      ...mapState({
        'mUserNickName': state => state.user.userNickName,
        'mUserRealName': state => state.user.userRealName,
        'mUserIdCard': state => state.user.userIdCard,
        'herd': state => state.user.userHeadPortrait
      })
    },
    created() {
      utils.hideTab();
      this.userInfo[0].value = this.mUserNickName?this.mUserNickName:"";
      this.userInfo[1].value = this.mUserRealName?this.mUserRealName:"";
      this.imgUrl = this.herd ? this.herd: require('../icon-avatar.png');
      this.userInfo[2].value = this.mUserIdCard?this.mUserIdCard:"";cos = new COS({
        getAuthorization: (options, callback) => {
          this.$post("base", "/FamilyJava/client/coskey").then(
            ({ data, errorCode }) => {
              if (errorCode === 0) {
                let {
                  expiredTime,
                  sessionToken,
                  tmpSecretId,
                  tmpSecretKey
                } = data;
                callback({
                  TmpSecretId: tmpSecretId,
                  TmpSecretKey: tmpSecretKey,
                  XCosSecurityToken: sessionToken,
                  ExpiredTime: expiredTime
                });
              }
            }
          );
        }
      });
    },
    methods: {
      ...mapActions(
        ['setUserNickName','setUserRealName','setUserPhone', 'setUserIdCard']
      ),
      getImageUrl(url){
        return utils.getImageUrl(url,40,40);
      },
      saveOnClick() {
        let self = this;
        if (!self.userInfo[2].value || utils.numberVerification("identityCard",self.userInfo[2].value)) {
          self.isPopShow = true;
          self.popTitle = '提示';
          self.popPlainText = '是否确定保存？';
        } else {
          const toast = self.$createToast({
            type: 'warn',
            txt: "身份证格式错误！请输入正确的身份证号码"
          });
          toast.show();
        }
      },
      leftBtnPoppup() {
        this.clearPoppup();
      },
      rightBtnPoppup() {
        let self = this;
        self.$post("clientUpdate","/user",{
          head: self.imgUrl == self.urlPath?'':self.imgUrl,
          nickName: self.userInfo[0].value,
          realName: self.userInfo[1].value,
          idcard: self.userInfo[2].value
        }).then((res)=>{
          self.clearPoppup();
          const toast = self.$createToast({
            type: 'correct',
            txt: "保存成功！"
          });
          toast.show();
          this.$store.commit('setUserHeadPortraitNative', this.imgUrl);

          self.$post("common","/infos",{
          }).then((infoRes)=>{
            self.setUserNickName(infoRes.data.infos.nickName);
            self.setUserRealName(infoRes.data.infos.realName);
            self.setUserPhone(infoRes.data.infos.userPhone);
            self.setUserIdCard(infoRes.data.infos.idcard);
            utils.localStorage('userInfo', infoRes.data).then((r) => {
              setTimeout(() => {
                self.$router.goBack();
              }, 700);
            });
          });
        });
      },
      clearPoppup() {
        this.isPopShow = false;
        this.popTitle = "";
        this.popPlainText = "";
      },
      bigImg(val){
        // 查看图片
        this.$createImagePreview({
          imgs: [this.imgUrl],
        }).show()
      },
      tailoring(){
        // 上传图片到头像框
        const toast = this.$createToast({
          time: 0,
          txt: '请稍后...'
        });
        toast.show();
        this.$refs.cropper.getCropBlob((res) => {
          console.log(res)
          cos.sliceUploadFile({
            Bucket: "family-1257195390",
            Region: "ap-guangzhou",
            Key: this.fileNamePrefix + "-" + new Date().getTime() + "-" + Math.ceil(Math.random() * 100) +
                    "." + res.type.split("/")[1],
              Body: res
            },(err, data) => {
              if (err) {
                this.$createToast({
                  type: "txt",
                  txt: "上传失败！"
                }).show();
              }else{
                console.log("上传完成", err, data);
                toast.hide();
                this.imgUrl = "https://" + data.Location;
                this.cancasDiv = false;
                this.example2.img = null;
              }
          });
        })
      },
      updataImg(e) {
        //上传图片到裁剪框
        let file = e.target.files[0];
        const toast = this.$createToast({
          time: 0,
          txt: '请稍后...'
        })
        toast.show()
        console.log(file)
        cos.sliceUploadFile({
          Bucket: "family-1257195390",
          Region: "ap-guangzhou",
          Key: this.fileNamePrefix + "-" + new Date().getTime() + "-" + Math.ceil(Math.random() * 100) +
                  "." + file.type.split("/")[1],
            Body: file
          },(err, data) => {
            if (err) {
              this.$createToast({
                type: "txt",
                txt: "上传失败！"
              }).show();
          }
          console.log("上传完成", err, data);
          this.cancasDiv = true;
          toast.hide();
          this.example2.img = "https://" + data.Location;
        });
      },
      closeClick(){
        // 取消裁剪框
        this.cancasDiv = false;
      }
    }
  }
</script>

<style>
.cube-image-preview-counter{
  opacity: 0!important;
}
  .userManage-item-box {
    width: 100%;
    background-color: white;
    font-size: 3.47vw;
    color: #666666;
    padding: 0 5.3333vw;
    box-sizing: border-box;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCCCCC;
    font-size: 4.2vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #CCCCCC;
    font-size: 4.2vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #CCCCCC;
    font-size: 4.2vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #CCCCCC;
    font-size: 4.2vw;
  }
  .img_css{
    height: 13.3333vw;
    border-bottom: 1px solid rgba(221,221,221,0.3)
  }
  .img_box{
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    overflow: hidden;
  }
  .img_box img{
    width: 100%;
    height: 100%;
  }
  .test {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100000;
  }
  .test_img{
    opacity: 0;
    position: absolute;
    width: 82vw;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }
  .div_box{
    position: relative;
  }
  .div_box_header{
    width: 100%;
    height: 11.7333vw;
    background-color: #fff;
  }
  .div_box_header div{
    width: 50%;
    display: flex;
    color: #38f;
    font-size: 3.73vw;
    font-weight: bold;
  }
  .close{
    justify-content: flex-start;
    padding-left: 4vw;
    color: #fff;
  }
  .ok_css{
    justify-content: flex-end;
    padding-right: 4vw;
    color: #38f;
  }
  .tailoring_css{
    background-color: #000;
    background-image: none!important;
  }
  .arrow-right {
    width: 2vw;
    height : 3vw;
    margin-left: 3vw;
  }
</style>