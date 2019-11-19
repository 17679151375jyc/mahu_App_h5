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
    <div style="background-color:white;border-radius: 1.6vw;margin-top: 1.3333vw;" v-for="(item,index) in plotInfo.list" :key="index">
      <div class="base-horizontal-layout-space-between-item-center" style="height: 13.3333vw;padding: 0 8vw">
        <div class="base-vertical-layout-general">
          <p class="base-text-title-normal-666" style="font-weight: bold">{{item.plotName}} {{item.buildingName}} {{item.doorName}}</p>
          <p v-if="item.type===2"
             class="base-text-details-normal-blue"
             style="margin-top: 1.0666vw"
             :style="getIsEffective(item.effectiveTime)?'':'color: #D72A25'"
          >{{getIsEffective(item.effectiveTime)?('服务到期：'+getEffectiveTime(item.effectiveTime)):'已过期，如需恢复，请续费'}}</p>
        </div>
        <div v-if="item.type===2" class="base-horizontal-layout-center-item-center"
             style="width: 18.1333vw;height: 8vw;background: linear-gradient(to bottom, #30C9FF, #3388FF)">
          <p class="base-text-title-normal-white" style="font-size: 3.4666vw" @click="toPlotRenew(item.domicile,item.plotName)">续费服务</p>
        </div>
        <!--<p class="base-text-title-normal-blue" style="font-size: 3.7333vw" @click="quitPlot(item.domicileNumber)">退出社区</p>-->
      </div>

      <div class="base-horizontal-layout-general-item-center my-plot-details-box" style="margin-left: 10.6666vw">
        <img :src="require('./plot-user-mine.png')" class="base-icon-normal-style" style="margin-right: 1.0666vw">
        <p class="base-text-details-large-black-666">{{item.name}}</p>
        <p class="base-text-details-normal-gray" style="margin-left: 1.0666vw">本人</p>
      </div>

      <div class="base-horizontal-layout-space-between-item-center my-plot-details-box">
        <p class="base-text-details-large-gray">是否开启门铃消息接收开关？</p>
        <m-switch :val="item.push" :parameterStr="item.domicile" @onChange="setIsDoorbellMessage"></m-switch>
      </div>

      <div>
        <div class="base-horizontal-layout-space-between-item-center my-plot-details-box"
             style="margin-left: 10.6666vw"
             v-for="(userItem,userIndex) in item.userList" :key="userIndex">
          <div class="base-horizontal-layout-center-item-center">
            <img :src="userItem.status===1?require('./plot-user-able.png'):require('./plot-user-enable.png')"
                 class="base-icon-normal-style" style="margin-right: 1.0666vw">
            <p class="base-text-details-large-black-666"
               :style="userItem.status===3?'color:#999':''">{{userItem.name}}</p>
            <p v-if="allRelationType.length>0 && userItem.relation===1000"
               class="base-text-details-normal-gray"
               style="margin-left: 1.0666vw">{{getRelationName(userItem.relation)}}</p>
          </div>
          <div v-if="getIsEffective(item.effectiveTime) && item.owner && userItem.relation!==1000"
               class="base-horizontal-layout-center-item-center"
               style="height: 13.3333vw"
               @click="changeUser(userItem.domicileNumber,userItem.status)">
            <p v-if="userItem.status===1" class="base-text-details-large-blue" style="color: #FD8813">禁用</p>
            <p v-else-if="userItem.status===3" class="base-text-details-large-blue">恢复</p>
          </div>
        </div>
      </div>

      <div v-if="getIsEffective(item.effectiveTime) && item.owner" class="base-horizontal-layout-center-item-center my-plot-details-box" style="height: 13.3333vw">
        <p class="base-text-title-normal-blue"
           style="font-size: 3.7333vw"
           @click="invitePeople(item.domicile)">邀请更多成员</p>
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
        allRelationType: []
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

      changeUser(domicileNumber,status) {
        let self = this;
        this.$createDialog({
          type: "confirm",
          title: "提示",
          content: "是否"+(status===1?"禁用":status===3?"恢复":"")+"该用户",
          onConfirm: () => {
            if (status===1) {
              self.$post("domicile","/modifyDomicileStatus",{
                domicileNumber: domicileNumber
              }).then((res)=>{
                const toast = this.$createToast({
                  type: 'correct',
                  txt: '禁用成功！'
                });
                toast.show();
                self.$emit("personalMessageOnClick", {});
              });
            } else if (status===3) {
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
      }
    }
  }
</script>

<style scoped>
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
    height: 13.3333vw;
    margin: 0 7.2vw 0 8vw;
    border-top: 1px solid rgba(238,238,238,0.3);
    box-sizing: border-box;
  }
</style>