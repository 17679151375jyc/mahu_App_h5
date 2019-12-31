<!--@Time  : 2019/10/18 16:38-->
<!--@Author: michael huang-->
<!--@File  : car-apply-audit.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="车辆审核"></return-head>

    <div class="form" style='margin-bottom: 7.43vw;'>
      <div v-if="list.status === 2"
           class="base-vertical-layout-center"
           :class="['form-item-line']"
           style="height: 10.5333vw;margin: 0 8vw">
        <p style="font-size: 3.7333vw;color: #D72A25">原因：{{list.remark}}</p>
      </div>
      <div v-for="(item,index) in fromFields" :key="index"
           class="base-horizontal-layout-space-between-item-center"
           :class="{'form-item':true,'form-item-line':index<fromFields.length-1}">
        <p>{{item.title}}</p>
        <div v-if="item.title==='车辆车牌'"
             class="base-horizontal-layout-center-item-center">
          <p class="form-item-placeholder-text fonColor">{{ formList.carNumber }}</p>
        </div>
        <div v-else-if="item.title==='社区名称'"
             class="base-horizontal-layout-center-item-center">
          <p class="form-item-placeholder-text fonColor">{{ formList.plotName }}</p>
        </div>
        <div v-else-if="item.title==='真实姓名'"
             class="base-horizontal-layout-center-item-center">
          <p class="form-item-placeholder-text fonColor">{{ formList.carownName?formList.carownName:'(用户未填写)' }}</p>
        </div>
        <div v-else-if="item.title==='联系电话'"
             class="base-horizontal-layout-center-item-center">
          <p class="form-item-placeholder-text fonColor">{{ formList.carownPhone}}</p>
        </div>
      </div>
    </div>
    <div ref='myrefPass'
         v-if='list.status === 0 || list.status === 3'
         @click='passClick(1)'
         @touchstart='touchstart(0)'
         @touchend='touchend(0)'
         style="margin: 0 auto;width: 84vw;text-align: center;height:11.73vw;
             background: linear-gradient(to right , #3388FF, #30CAFF);
             border-radius: 1.07vw; line-height:11.73vw;font-size: 3.73vw;color: #fff;">通过</div>
    <div ref='myrefNo'
         v-if='list.status === 0 || list.status === 3'
         @click='passClick(2)'
         @touchstart='touchstart(1)'
         @touchend='touchend(1)'
         style="margin: 0 auto;width: 84vw;text-align: center;height:11.73vw;
             background-color: #CCC;border-radius: 1.07vw; line-height:11.73vw;font-size: 3.73vw;color: #fff;margin-top:2.67vw;">拒绝</div>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                :cancelText="popCancelText"
                :sureText="popSureText"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--设置车牌名称-->
      <div class="base-vertical-layout-center-item-center">
        <input class="popup-input"
               v-model="remark"
               maxlength="15"
               placeholder="请输入拒绝的原因"
               style="border:none;resize:none;outline:none"/>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "car-apply-audit",
    components: {returnHead, basePopup},
    props:{
      list:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        fromFields: [
          {
            title: "车辆车牌",
          },
          {
            title: "社区名称",
          },
          {
            title: "真实姓名",
            value: ""
          },
          {
            title: "联系电话",
          }
        ],
        remark: '',
        formList: {
          id: '',
          carNumber: '',
          userNumber: '',
          plotNumber: '',
          plotName: '',
          carownPhone: '',
          carownName: '',
          status: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },

        // 弹窗属性
        isPopShow: false,
        refId: 'myCarPopup',
        popTitle: '不通过原因',
        popType: '',
        popPlainText: '',
        popCancelText: '',
        popSureText: '',
      }
    },
    created() {
    },
    mounted() {
      this.formList = this.list;
    },
    methods: {
      rightBtnPoppup(){
        if(this.remark) {
          this.examine({val: 2, promptValue: this.remark})
        } else {
          this.$createToast({
            type: 'warn',
            txt: "拒绝原因不能为空"
          }).show();
        }
      },
      leftBtnPoppup(){
        this.isPopShow = false;
      },
      touchstart(val){
        if(val == 0){
          this.$refs.myrefPass.style.background = 'linear-gradient(to right , #30CAFF, #3388FF)';
        }else if(val == 1){
          this.$refs.myrefNo.style.backgroundColor = '#A1A1A1';
        }
      },
      touchend(val){
        if(val === 0){
          this.$refs.myrefPass.style.background = 'linear-gradient(to right , #3388FF, #30CAFF)';
        }else if(val === 1){
          this.$refs.myrefNo.style.backgroundColor = '#ccc';
        }
      },
      push(){
        this.$router.push({ path: "/service-index/community-apply-list/community-apply-audit", query: {}});
      },
      passClick(val) {
        this.remark = '';
        if(val === 2) {
          this.isPopShow = true;
          // this.dialog = this.$createDialog({
          //   type: 'prompt',
          //   title: '拒绝理由',
          //   prompt: {
          //     value: '',
          //     placeholder: '请填写拒绝理由',
          //     style:{
          //       'border-radius': '4vw'
          //     }
          //   },
          //   onConfirm: (e, promptValue) => {
          //     this.remark = promptValue;
          //     console.log(promptValue);
          //     if (promptValue) {
          //       this.examine({val, promptValue})
          //     } else {
          //       this.$createToast({
          //         type: 'warn',
          //         txt: "拒绝理由不能为空"
          //       }).show();
          //     }
          //   }
          // }).show()
        } else {
          this.dialog = this.$createDialog({
            type: 'confirm',
            title: '提示',
            content: '是否通过该申请',
            confirmBtn: {
              text: '确定',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            cancelBtn: {
              text: '取消',
              active: false,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: (e) => {
              this.examine({val, remark: ""})
            },
            onCancel: () => {
              return;
            }
          }).show()
        }
      },
      examine({val, promptValue}) {
        let self = this;
        self.$post('base', '/family/server/userCar/updateStatus', {
          id: self.formList.id,
          remark: promptValue,
          status: val
        }).then(({data, errorCode})=>{
          if(errorCode === 0){
            self.$createToast({
              type: 'txt',
              txt: "审核成功"
            }).show();
            setTimeout(()=>{
              this.$router.goBack(-1);
              self.$emit('Refresh');
            }, 700)
          }
        })
      }
    }
  }
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
    color: #000;
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
    color: #B3B3B3;
    font-size: 3.2vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #B3B3B3;
    font-size: 3.2vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #B3B3B3;
    font-size: 3.2vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #B3B3B3;
    font-size: 3.2vw;
  }
  .fonColor{
    color #666;
    font-size 100%;
  }
</style>