<template>
  <div class="record-wrapper">
    <topBar title="社区管理">
      <div slot="menu" class="right-handle">
        <div class="icon" @click="add">
          <i class="iconfont icontianjia"></i>
        </div>
      </div>
    </topBar>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll
        ref="communityManageScroll"
        class="scroll-wrapper-text-style"
        :options="options"
        :fade="true"
        :data="communityList"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"><!--:data="communityList"-->

        <div class="item" v-for="(item,index) in communityList" :key="index">
          <div class="title">
            <div class="left">
              <div class="sub-title">住户信息</div>
              <!--<div class="index">-->
                <!--<span>3</span>-->
              <!--</div>-->
              <div :class="['state', stateClass[item.status]]">
                <span>{{stateLaber[item.status]}}</span>
              </div>
            </div>
            <div class="right">
              <span v-if="item.status === 2" style="margin-right: 5.33vw">
                <a id='dial' :href="'tel:'+item.plotPhone" style="color: #3388FF">联系物管</a></span>
              <span @click="showDel(item.applyID)">{{btnText[item.status]}}</span>
            </div>
          </div>
          <p v-if="item.status === 2" style="font-size: 3.2vw;color: red">( {{item.feedback}} )</p>
          <div class="options">
            <block v-for="(communityItem, index) in item.mCommunityList" :key="index">
              <div class="option">
                <span>{{communityItem.title}}</span>
                <span>{{communityItem.value}}
                  <span v-if="communityItem.title==='住户'">
                    <img :src="communityItem.sex === '男' ? require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')"
                         style="width: 2.8vw;height: 4.2vw">
                  </span>
                </span>
              </div>
            </block>
          </div>
        </div>
      </cube-scroll>
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

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import topBar from "_c/topBar";
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "mineJoincommunity",
    components: { topBar, basePopup },
    data() {
      return {
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: false
        },

        communityList: [],

        stateClass: { //不同状态对应不同的背景色的class
          0: 'light-blue',
          1: 'light-green',
          2: 'orange',
          3: 'blue',
        },
        stateLaber: {
          0: '未审核',
          1: '已审核',
          2: '不通过',
          3: '审核中'
        },
        btnText: {
          0: '',//撤回
          1: '',//退出社区
          2: '删除',
          3: '',//撤回
        },

        // 弹窗属性
        isPopShow: false,
        refId: 'myCommunityPopup',
        popTitle: '',
        popPlainText: '',
        applyID: '',
      };
    },
    created() {
      this.getInfo();
      utils.hideTab();
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        if(localStorage.getItem("communityChange")) {
          this.getInfo();
          localStorage.removeItem("communityChange");
        }
      }
    },
    methods: {
      add() {
        this.$router.push({
          name: "communityAdd"
        });
      },
      getInfo() {
        let self = this;
        self.$post("community","/myapply",{}).then((res)=>{
          self.communityList = [...res.data.list];
          self.communityList.forEach(item => {
            item.mCommunityList = [];
            if (item.status === 1) {
              item.mCommunityList.push(
                {
                  title: "住户",
                  value: item.realName,
                  sex: item.sexDesc
                },
                {
                  title: "所在城区",
                  value: item.provinceName+item.cityName+item.areaName
                },
                {
                  title: "社区地址",
                  value: item.plotName+item.buildingName+item.doorName
                },
                {
                  title: "身份证号",
                  value: utils.hiddenIdentityCardNum(item.identityCard)
                },
                {
                  title: "联系电话",
                  value: utils.hiddenPhoneNum(item.phone)
                },
                {
                  title: "详细地址",
                  value: item.address
                }
              )
            } else {
              item.mCommunityList.push(
                {
                  title: "所在城区",
                  value: item.provinceName+item.cityName+item.areaName
                },
                {
                  title: "社区名称",
                  value: item.plotName
                },
                {
                  title: "座号",
                  value: item.buildingName+item.doorName
                },
                {
                  title: "真实姓名",
                  value: item.realName
                },
                {
                  title: "性别",
                  value: item.sexDesc
                },
                {
                  title: "身份证号",
                  value: utils.hiddenIdentityCardNum(item.identityCard)
                },
                {
                  title: "联系电话",
                  value: utils.hiddenPhoneNum(item.phone)
                },
                {
                  title: "通讯地址",
                  value: item.address
                }
              )
            }
          });
        });
      },

      showDel(applyID) {
        this.isPopShow = true;
        this.popTitle = "删除申请"
        this.popPlainText = "确定要删除该条不通过的申请？";
        this.applyID = applyID;
      },
      leftBtnPoppup() {
        this.isPopShow = false;
      },
      rightBtnPoppup() {
        this.isPopShow = false;
        let self = this;
        self.$post("community","/delapply",{applyID: self.applyID}).then((res)=>{
          const toast = this.$createToast({
            type: 'correct',
            txt: "删除成功"
          });
          toast.show();
          self.getInfo();
        });
      },

      linkTube() {//todo 联系物管

      },

      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          this.getInfo();
          this.$refs.communityManageScroll.forceUpdate(true);
          // if (Math.random() > 0.5) {
          //   // 如果有新数据
          //   console.log(1);
          //   this.$refs.communityManageScroll.forceUpdate(true);
          // } else {
          //   // 如果没有新数据
          //   this.$refs.communityManageScroll.forceUpdate(true);
          // }
        }, 1000);
      },
      onPullingUp() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            console.log(2);
            this.$refs.communityManageScroll.forceUpdate(true);
          } else {
            // 如果没有新数据
            this.$refs.communityManageScroll.forceUpdate(true);
          }
        }, 1000);
      },
    }
  };
</script>

<style lang="stylus" scoped>
.record-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(245, 245, 245, 1);
  z-index: 10;
  .item {
    padding-left: 5.3333vw;
    box-sizing: border-box;
    background: #fff;
    margin-top: 2.6667vw;

    .title {
      padding-top: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5.3333vw;
      height: 40px;

      .left {
        display: flex;
        align-items: center;
        flex: 1;

        .sub-title {
          flex: 0 0 20.0667vw;
          font-size: 4.2667vw;
          color: #333;
        }

        .index {
          flex: 0 0 4vw;
          height: 4vw;
          border-radius: 50%;
          color: #fff;
          background: #3388FF;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 1.0667vw;
          box-sizing: border-box;
          overflow: hidden;

          span {
            font-size: 2.6667vw;
          }
        }

        .state {
          margin-left: 2.67vw;
          flex: 0 0 46px;
          height: 16px;
          font-size: 12px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          white-space: nowrap;
          border-radius: 2px;

          &.light-blue {
            background: #29CCCC;
          }

          &.blue {
            background: #3388FF;
          }

          &.light-green {
            background: #8AE548;
          }

          &.orange {
            background: #FC6A53;
          }
        }
      }

      .right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        font-size: 4.2667vw;
        color: #3388FF;

        span {
          /*text-decoration: underline;*/
        }
      }
    }

    .options {
      .option {
        display: flex;
        height: 13.3333vw;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EDEEF0;
        color: #666;
        font-size: 3.4667vw;
        padding-right: 5.3333vw;
        box-sizing: border-box;
      }
    }
  }

  .btn {
    width: 25%;
    display: flex;
    justify-content: center;
    text-align: right;

    img {
      padding-left: 1.2rem;
    }
  }
}

.con {
  height: 10.9375rem;
  background: rgba(255, 255, 255, 1);
  margin-top: 0.3125rem;
  width: 100%;
}

.con-num {
  width: 0.40625rem;
  height: 0.40625rem;
  color: white;
  background: rgba(51, 136, 255, 1);
  justify-content: center;
  text-align: center;
  line-height: 0.40625rem;
  border-radius: 50%;
  margin-left: 0.1rem;
}

.con-img {
  width: 1rem;
  height: 0.40625rem;
  margin-left: 0.1rem;
}

.right-handle {
  width: 23.4667vw;
  height: 11.7333vw;
  overflow: hidden;

  .icon {
    width: 11.7333vw;
    height: 11.7333vw;
    margin-left: 11.7333vw;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 6.6667vw;
      color: #3388FF;
    }
  }
}
</style>
