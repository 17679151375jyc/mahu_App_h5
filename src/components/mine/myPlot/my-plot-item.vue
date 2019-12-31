<!--@Time  : 2019/09/24 15:33-->
<!--@Author: michael huang-->
<!--@File  : my-plot-item.vue-->

<template>
  <div>
    <div class="base-horizontal-layout-general-item-center"
         style="background-color:white;height: 13.733333vw;margin-bottom: 1.3333vw;padding: 0 5.3333vw">
      <img :src="require('./icon-plot.png')" class="my-plot-img">
      <p class="my-plot-text">{{plotInfo.plotName}}</p>
    </div>
    <div style="background-color:white;border-radius: 1.6vw;margin-top: 1.3333vw;"
         v-for="(item,index) in plotInfo.list" :key="index">
      <div class="base-horizontal-layout-space-between-item-center" style="height: 17.3333vw;padding: 0 7vw 0 8vw">
        <div class="base-vertical-layout-general">
          <p class="base-text-title-normal-666" style="font-weight: bold">{{item.plotName}} {{item.buildingName}} {{item.doorName}}</p>
          <p v-if="item.type===2"
             class="base-text-details-large-blue"
             style="margin-top: 2.0666vw"
             :style="item.effectiveStatus===0?'':item.effectiveStatus===1?'color: #D72A25':''"
          >{{item.effectiveStatus===0?('服务到期：'+getEffectiveTime(item.effectiveTime)):item.effectiveStatus===1?'已过期，如需恢复，请续费':''}}</p>
          <div v-if="item.type===0 || item.type===1" class="base-horizontal-layout-space-between-item-center" style="width: 86vw">
            <p class="base-text-details-large-blue"
               style="margin-top: 2.0666vw"
               :style="item.effectiveStatus===0?'':item.effectiveStatus===1?'color: #D72A25':''"
            >服务到期：{{getEffectiveTime(item.effectiveTime)}}</p>
            <p v-if="item.effectiveStatus===1"
               class="base-text-details-large-blue"
               style="margin-top: 1.0666vw;color: #D72A25;letter-spacing:-2px"
            >社区服务已过期，请联系物管。</p>
          </div>
        </div>
        <div v-if="item.type===2" class="base-horizontal-layout-center-item-center"
             style="width: 20.1333vw;height: 9vw;background: linear-gradient(to bottom, #30C9FF, #3388FF);border-radius: 1.0777vw">
          <p class="base-text-title-normal-white" style="font-size: 3.7333vw" @click="toPlotRenew(item.domicile,item.plotName)">点击续费</p>
        </div>
        <!--<p class="base-text-title-normal-blue" style="font-size: 3.7333vw" @click="quitPlot(item.domicileNumber)">退出社区</p>-->
      </div>

      <div class="base-horizontal-layout-space-between-item-center">
        <div class="base-horizontal-layout-general-item-center my-plot-details-box" style="margin-left: 10.6666vw">
          <img :src="require('./plot-user-mine.png')" class="base-icon-normal-style" style="margin-right: 1.0666vw">
          <p class="base-text-title-normal-666">{{item.name}}</p>
          <p class="base-text-details-normal-gray" style="margin-left: 1.0666vw">本人</p>
        </div>
        <div ref='myPlotItemExit'
             class="base-horizontal-layout-right-item-center"
             style="padding-right: 7vw;width: 26.6666vw;height: 12.3333vw"
             @click="changeMine(item.domicile)"
             @touchstart="myPlotItemTouchStart('myPlotItemExit', index)"
             @touchend="myPlotItemTouchEnd('myPlotItemExit', index)">
          <p class="base-text-details-large-blue my-plot-btn"
             :style="myPlotItemBtnIndex===index ? myPlotItemBtnTouch.myPlotItemExit : ''">退出</p>
        </div><!--v-if="item.owner===0"--><!--这个是为了判断是否自己是业主的-->
      </div>

      <div class="base-horizontal-layout-space-between-item-center my-plot-details-box">
        <p class="base-text-title-normal-gray">是否开启门铃消息接收开关？</p>
        <m-switch :val="item.push" :parameterStr="item.domicile" @onChange="setIsDoorbellMessage"></m-switch>
      </div>

      <div>
        <div class="base-horizontal-layout-space-between-item-center my-plot-details-box"
             style="margin-left: 10.6666vw"
             v-for="(userItem,userIndex) in item.userList" :key="userIndex">
          <div class="base-vertical-layout-start-item-start">
            <div class="base-horizontal-layout-center-item-center">
              <img :src="userItem.status===1?require('./plot-user-able.png'):require('./plot-user-enable.png')"
                   class="base-icon-normal-style" style="margin-right: 1.0666vw">
              <p class="base-text-title-normal-666"
                 :style="userItem.status===3?'color:#999':''">{{userItem.name}}</p>
              <p v-if="allRelationType.length>0 && userItem.relation===1000"
                 class="base-text-details-normal-gray"
                 style="margin-left: 1.0666vw">{{getRelationName(userItem.relation)}}</p>
            </div>
            <div class="base-horizontal-layout-center-item-center">
              <p class="base-text-details-large-blue"
                 style="margin: 2vw 0 0 5.5vw"
                 :style="userItem.status===3?'color:#999':''">{{userItem.phone}}</p>
            </div>
          </div>
          <div v-if="getIsEffective(item.effectiveTime) && item.owner"
               class="base-horizontal-layout-center-item-center" style="height: 13.3333vw">
            <div v-if="userItem.relation!==1000"
                 @click="changeUser(userItem.domicileNumber,userItem.status)"
                 @touchstart="myPlotItemTouchStart('myPlotItemEffective', index, userIndex)"
                 @touchend="myPlotItemTouchEnd('myPlotItemEffective', index, userIndex)">
              <p v-if="userItem.status===1"
                 class="base-text-details-large-orange my-plot-btn"
                 style="border: 1px solid #FD8813"
                 :style="(myPlotItemBtnIndex===index && myPlotItemBtnUserIndex===userIndex) ? myPlotItemBtnTouch.myPlotItemEffective : ''">禁用</p>
              <p v-else-if="userItem.status===3 || userItem.status===4"
                 class="base-text-details-large-blue my-plot-btn"
                 :style="(myPlotItemBtnIndex===index && myPlotItemBtnUserIndex===userIndex) ? myPlotItemBtnTouch.myPlotItemEffective : ''">恢复</p>
            </div>
            <div v-if="userItem.status===3"
                 @click="deleteUser(userItem.domicileNumber)"
                 @touchstart="myPlotItemTouchStart('myPlotItemDelete', index, userIndex)"
                 @touchend="myPlotItemTouchEnd('myPlotItemDelete', index, userIndex)">
              <p class="base-text-details-large-red-dark my-plot-btn"
                 style="border: 1px solid #D72A25;margin-left: 2.6666vw"
                 :style="(myPlotItemBtnIndex===index && myPlotItemBtnUserIndex===userIndex) ? myPlotItemBtnTouch.myPlotItemDelete : ''">删除</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="getIsEffective(item.effectiveTime) && item.owner"
           @click="invitePeople(item.domicile)"
           class="base-horizontal-layout-center-item-center my-plot-details-box"
           style="height: 13.3333vw">
        <p class="base-text-title-normal-blue"
           style="font-size: 4.2666vw"
           >邀请更多成员</p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import mSwitch from '_c/button/mSwitch';
  import { mapActions } from 'vuex';
  import { mapState } from "vuex";

  export default {
    name: "my-plot-item",
    components: {
      mSwitch
    },
    props: {
      plotInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        allRelationType: [],

        myPlotItemBtnIndex: -1,
        myPlotItemBtnUserIndex: -1,
        myPlotItemBtnTouch: {
          myPlotItemExit: {
            backgroundColor: '#FFFFFF',
          },
          myPlotItemEffective: {
            backgroundColor: '#FFFFFF',
          },
          myPlotItemDelete: {
            backgroundColor: '#FFFFFF',
          },
        }
      }
    },
    computed: {
      ...mapState({
        mUserNickName: state => state.user.userNickName,
        mUserRealName: state => state.user.userRealName,
        mUserPhone: state => state.user.userPhone,
      })
    },
    created() {
    },
    mounted() {
      this.getAllRelationType();
    },
    methods: {
      ...mapActions(
        ['setUserPlotList']
      ),
      getUserUserName() {// 获取终极超级名字
        return (this.mUserRealName ? this.mUserRealName : this.mUserNickName ? this.mUserNickName : this.mUserPhone);
      },
      getIsEffective(effectiveTime) {
        let now = new Date();
        return ((effectiveTime * 1000 - now.getTime())>0) ? true : false;
      },
      getEffectiveTime(effectiveTime) {
        return utils.timetrans(effectiveTime, "yymmdd");
      },

      getAllRelationType() {
        let self = this;
        self.$post("domicile","/getAllRelationType",{
        }).then((res)=>{
          self.allRelationType = [...res.data];
        });
      },
      getRelationName(relationType) {
        let name = "";
        this.allRelationType.forEach((item)=>{
          if(item.code === relationType) {
            name = item.name;
          }
        });
        return name;
      },

      setIsDoorbellMessage(e) {
        let self = this;
        self.$post("domicile","/deletePush",{
          domicileNumber: e.parameterStr,
          isPush: e.val
        }).then((res)=>{
          self.$post("common","/infos", {
          }).then((res)=> {
            self.setUserPlotList([...res.data.plots]);
            const toast = this.$createToast({
              type: 'correct',
              txt: '设置成功！'
            });
            toast.show();
          });
        });
      },

      toPlotRenew(domicileNumber,plotName) {//充值服务
        this.$router.push({path: "/mine/myPlot/my-plot-renew", query: {domicileNumber: domicileNumber,plotName: plotName}});
      },
      invitePeople(domicileNumber) {//邀请家人
        this.$emit("invitePeopleOnClick", {domicileNumber: domicileNumber});
      },
      quitPlot(domicileNumber) {
        this.$emit("quitPlotOnClick", {domicileNumber: domicileNumber});
      },

      myPlotItemTouchStart(val,index,userIndex) {
        switch (val) {
          case "myPlotItemExit":
            this.myPlotItemBtnIndex = index;
            this.myPlotItemBtnTouch.myPlotItemExit = {backgroundColor: '#EEEEEE'};
            break;
          case "myPlotItemEffective":
            this.myPlotItemBtnIndex = index;
            this.myPlotItemBtnUserIndex = userIndex;
            this.myPlotItemBtnTouch.myPlotItemEffective = {backgroundColor: '#EEEEEE'};
            break;
          case "myPlotItemDelete":
            this.myPlotItemBtnIndex = index;
            this.myPlotItemBtnUserIndex = userIndex;
            this.myPlotItemBtnTouch.myPlotItemDelete = {backgroundColor: '#EEEEEE'};
            break;
          default:
            break;
        }
      },
      myPlotItemTouchEnd(val,index,userIndex) {
        switch (val) {
          case "myPlotItemExit":
            this.myPlotItemBtnTouch.myPlotItemExit = {backgroundColor: '#FFFFFF'};
            break;
          case "myPlotItemEffective":
            this.myPlotItemBtnTouch.myPlotItemEffective = {backgroundColor: '#FFFFFF'};
            break;
          case "myPlotItemDelete":
            this.myPlotItemBtnTouch.myPlotItemDelete = {backgroundColor: '#FFFFFF'};
            break;
          default:
            break;
        }
        this.myPlotItemBtnIndex = -1;
      },

      changeUser(domicileNumber,status) {
        let self = this;
        this.$createDialog({
          type: "confirm",
          title: "提示",
          content: "您确认要"+(status===1?"禁用":(status===3||status===4)?"恢复":"")+"该邀请用户",
          onConfirm: () => {
            if (status===1) {
              self.$post("domicile","/modifyDomicileStatus",{
                domicileNumber: domicileNumber,
                status: 3
              }).then((res)=>{
                const toast = this.$createToast({
                  type: 'correct',
                  txt: '禁用成功！'
                });
                toast.show();
                self.$emit("personalMessageOnClick", {});
              });
            } else if (status===3||status===4) {
              self.$post("domicile","/recoverStatus",{
                domicileNumber: domicileNumber
              }).then((res)=>{
                const toast = this.$createToast({
                  type: 'correct',
                  txt: '恢复成功！'
                });
                toast.show();
                self.$emit("personalMessageOnClick", {});
              });
            }
          }
        }).show();
      },
      deleteUser(domicileNumber) {
        let self = this;
        this.$createDialog({
          type: "confirm",
          title: "提示",
          content: "是否删除该用户",
          onConfirm: () => {
            self.$post("domicile","/delete",{
              domicileNumber: domicileNumber
            }).then((res)=>{
              const toast = this.$createToast({
                type: 'correct',
                txt: '删除成功！'
              });
              toast.show();
              self.$emit("personalMessageOnClick", {});
            });
          }
        }).show();
      },
      changeMine(domicileNumber) {
        let self = this;
        this.$createDialog({
          type: "confirm",
          title: "提示",
          onConfirm: () => {
            self.$post("domicile","/modifyDomicileStatus",{
              domicileNumber: domicileNumber,
              status: 4
            }).then((res)=>{
              const toast = this.$createToast({
                type: 'correct',
                txt: '退出成功！'
              });
              toast.show();
              self.$emit("personalMessageOnClick", {});
            });
          }
        },
        h => {
          return [
            h(
              "div",
              {
                class: {
                  "my-plot-tips": true
                },
                slot: "content"
              },
              [
                h(
                  "div",
                  {
                    class: {
                      "my-plot-tips": true
                    }
                  },
                  "确定要退出该社区？"
                ),
                h(
                  "div",
                  {
                    class: {
                      "my-plot-tips": true
                    }
                  },
                  "退出之后不可恢复，请您谨慎选择"
                )
              ]
            )
          ];
        }
        ).show();
      }
    }
  }
</script>

<style lang="stylus">
  .my-plot-img {
    width: 5.3333vw;
    height: 5.3333vw;
  }
  .my-plot-text {
    font-size: 4.8vw;
    color: #666666;
    font-weight: bold;
    margin-left: 1.0666vw;
  }
  .my-plot-details-box {
    height: 15.3333vw;
    margin: 0 7.2vw 0 8vw;
    border-top: 1px solid rgba(238,238,238,0.3);
    box-sizing: border-box;
    &:active {
      background-color: #eeeeee;
    }
  }

  .my-plot-tips {
    margin: 0 2vw;
    text-align: center;
    font-size: 4.2vw;
  }

  .my-plot-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 16vw;
    height: 8vw;
    border: 1px solid #3388FF;
    border-radius: 1vw;
    box-sizing: border-box;
  }
</style>