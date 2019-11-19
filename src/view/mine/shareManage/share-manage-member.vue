<!--@Time  : 2019/09/10 14:10-->
<!--@Author: michael huang-->
<!--@File  : share-manage-member.vue-->

<template>
  <div class="wrapper">
    <return-head title="成员管理"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="shareManageMemberScroll"
        class="scroll-wrapper-text-style"
        :options="options"
        :fade="true"
        :data="shareUser">
        <div class="share-manage-member-box">
          <div class="base-horizontal-layout-general-item-center" style="padding: 2.6666vw 5.33333vw">
            <img :src="require('@/components/mine/shareManage/icon_share-manage-title.png')"
                 :style="shareUser.length > 0 ?
                    'padding-bottom: 2.6666vw;width: 5.3333vw;height: 5.3333vw' : 'width: 5.3333vw;height: 5.3333vw'">
            <div class="share-manage-member-content-title"
                 :class="{'share-manage-member-content-title-have-shareUser' : shareUser.length>0}">
              <div class="base-horizontal-layout-space-between-item-center">
                <p class="base-text-details-large-black">{{mineManageInfo.name}}</p>
                <div class="base-horizontal-layout-general-item-center" @click="addMember(mineManageInfo.id)">
                  <img :src="require('@/assets/icon/icon_add-blue.png')"
                       style="margin-right: 1.6666vw;width: 3.2vw;height: 3.2vw">
                  <p class="base-text-details-large-blue">邀请成员</p>
                </div>
              </div>
            </div>
          </div>
          <share-manage-member-item
            v-for="(item,index) in shareUser" :key="index"
            style="padding: 2.1333vw 5.3333vw 2.1333vw 12.8vw"
            :shareUser="item"
            @deleteOnClick="deleteShareManageMember">
          </share-manage-member-item>
          <div v-if="shareUser.length>0" style="height: 4.5333vw"></div>
        </div>
      </cube-scroll>
    </div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                :isShowCloseIcon="isShowCloseIcon"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div v-if="popType === 'plainText'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
      <!--添加成员-->
      <div v-if="popType === 'addManage'">
        <input class="popup-input"
               v-model="addManagePhone"
               placeholder="请输入对方的手机号码"
               type="number"
               oninput="if(value.length>11) value=value.slice(0,11)"
               style="border:none;resize:none;outline:none"/>
        <p class="base-text-details-normal-black"
           style="color: red;margin-top: 4.27vw;text-align: center">注：请确认对方手机号正确性及是否已注册</p>
      </div>
      <!--删除成员-->
      <div v-if="popType === 'deleteManage'" class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}<span style="color: #3388FF">{{shareUserName}}</span>？</p>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import shareManageMemberItem from '_c/mine/shareManage/share-manage-member-item';
  import basePopup from '_c/popup/base-popup';
  import { mapActions } from 'vuex';

  export default {
    name: "share-manage-member",
    components: { returnHead, shareManageMemberItem, basePopup },
    data() {
      return {
        mineManageInfo: {},
        shareUser: [],

        // 滚动参数
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
        },

        // 弹窗属性
        isPopShow: false,
        refId: 'shareManagePopup',
        popTitle: '',
        popType: '',
        popCancelText: '',
        popSureText: '',
        popPlainText: '',
        // 弹窗参数
        addManagePhone: '',
        machineId: '',
        shareUserNumber: '',
        shareUserName: ''
      }
    },
    created() {
      if (this.$route.query.mineManageInfo) {
        this.mineManageInfo = JSON.parse(this.$route.query.mineManageInfo);
      }
    },
    mounted() {
      this.getShareUser();
    },
    methods: {
      ...mapActions(
        ['setIsDeleteShareMachine']
      ),

      getShareUser() {
        let self = this;
        self.$post("machine", "/getMachineShareUser", {
          id: self.mineManageInfo.id
        }).then((res) => {
          self.shareUser = [...res.data];
        });
      },
      addMember(machineId) {
        this.machineId = machineId;
        this.popType = "addManage";
        this.popTitle = "添加共享成员";
        this.isPopShow = true;
      },
      deleteShareManageMember(e) {
        this.machineId = this.mineManageInfo.id;
        this.shareUserNumber = e.shareUserNumber;
        this.shareUserName = e.shareUserName;
        this.popType = "deleteManage";
        this.popTitle = "删除成员";
        this.popPlainText = "您确定删除成员";
        this.isPopShow = true;
      },
      leftBtnPoppup() {
        this.clearPoppupParameter();
      },
      rightBtnPoppup() {
        let self = this;
        switch (this.popType) {
          case 'addManage':
            self.$post("machine", "/shareMachine", {
              phone: self.addManagePhone,
              machineId: self.machineId
            }).then((res) => {
              const toast = this.$createToast({
                type: "correct",
                txt: "该成员已邀请成功"
              });
              toast.show();
              self.getShareUser();
              self.setIsDeleteShareMachine(true);
            });
            break;
          case 'deleteManage':
            self.$post("machine", "/deleteShareMachine", {
              shareUserNumber: self.shareUserNumber,
              machineId: self.machineId
            }).then((res) => {
              const toast = this.$createToast({
                type: "correct",
                txt: "该成员已删除成功"
              });
              toast.show();
              self.getShareUser();
              self.setIsDeleteShareMachine(true);
            });
            break;
          default:
            break;
        }
        this.clearPoppupParameter();
      },
      clearPoppupParameter() {//清空弹窗参数
        this.isPopShow = false;
        this.popTitle = "";
        this.popType = "";
        this.popCancelText = "";
        this.popSureText = "";
        this.popPlainText = "";

        this.addManagePhone = "";
        this.machineId = "";
        this.shareUserNumber = "";
        this.shareUserName = "";
      }
    }
  }
</script>

<style scoped>
  .share-manage-member-box {
    margin: 2.6666vw;
    background-color: white;
    border-radius: 1.33vw;
  }
  .share-manage-member-content-title {
    width: 100%;
    margin-left: 2.6666vw;
  }
  .share-manage-member-content-title-have-shareUser {
    padding-bottom: 2.6666vw;
    border-bottom: 1px solid rgba(204,204,204,0.2);
  }
</style>