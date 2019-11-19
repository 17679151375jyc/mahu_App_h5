<template>
  <div class="base-vertical-layout-general">
    <!--顶部的间距-->
    <div v-if="locationIndex!==1" class="flow-item-box">
      <div class="base-vertical-layout-center-item-center" style="height: 100%;width: 1.33vw">
        <div class="flow-item-line1-style" style="height: 100%"></div>
      </div>
    </div>
    <!--标题的圆点-->
    <div class="base-horizontal-layout-general" style="height: 6.4vw">
      <div class="base-vertical-layout-center-item-center" style="height: 6.4vw;width: 1.33vw">
        <div class="flow-item-line1-style" v-bind:class="{'flow-item-line2-style' : locationIndex===1}"></div>
        <div style="width: 1.33vw;height: 1.33vw;border-radius: 50%;background-color: #CCCCCC"></div>
        <div class="flow-item-line1-style" v-bind:class="{'flow-item-line2-style' : locationIndex===2}"></div>
      </div>
      <p class="base-text-details-large-black-light"
         style="line-height: 6.4vw;margin-left: 5vw">{{item.role}}
        <span style="color: #3388FF;text-decoration: underline">{{item.name}}</span>
        {{actionStr}}</p>
    </div>
    <!--下面的部分-->
    <div class="base-horizontal-layout-general">
      <div class="base-vertical-layout-center-item-center" style="width: 1.33vw">
        <div v-if="locationIndex!==2" class="flow-item-line1-style" style="height: 100%"></div>
      </div>
      <div class="base-vertical-layout-general" style="margin: 1.33vw 0 0 5vw">
        <!--只读信息-->
        <div><!--v-if="item.messageType!=='install'"-->
          <div v-if="item.flowType==='being' || item.flowType==='complete'"
               class="base-text-details-normal-black-light"
               style="width: 78.66vw;border-radius: 1.33vw;background-color: #F2F3F5;padding: 2.67vw">
            <p v-if="item.info.hasOwnProperty('location')">地点 {{item.info.location}}</p>
            <div v-if="item.info.hasOwnProperty('location') && (item.info.hasOwnProperty('matter') || item.info.hasOwnProperty('combo'))"></div>
            <p v-if="item.info.hasOwnProperty('matter')" style="margin-top: 2vw">{{item.messageType==='alert' ? '警情' : '故障'}} {{item.info.matter}}</p>
            <p v-if="item.info.hasOwnProperty('content')" style="margin-top: 2vw">详情 {{item.info.content}}</p>
            <p v-if="item.info.hasOwnProperty('feedbackType')" style="margin-top: 2vw"
            >{{item.messageType==='alert' ? '警情类型' : '故障类型'}} {{item.info.feedbackType}}</p>
            <p v-if="item.info.hasOwnProperty('feedback')" style="margin-top: 2vw"
            >{{item.messageType==='alert' ? '警情汇报' : '故障汇报'}}
              <span style="color: #CCC">{{(item.info.feedback===null || item.info.feedback==='')
              ?(item.role+'暂无汇报'):item.info.combo}}</span>
              {{item.info.feedback}}</p>
            <p v-if="item.info.hasOwnProperty('combo')">内容 {{item.info.combo}}</p>
          </div>
        </div>
        <!--评分信息-->
        <div v-if="item.flowType==='evaluate'" class="base-vertical-layout-general"
             style="width: 84vw;border-radius: 1.33vw;background-color: #F2F3F5">
          <div style="padding: 2.67vw" class="base-horizontal-layout-general-item-center">
            <cube-rate v-model="item.info.evaluate" :disabled="true" style="width: 27.75vw"></cube-rate>
            <p style="font-size: 2.67vw;color: #FF8080;margin-left: 5.33vw">{{securityPersonnelScoreText}}</p>
          </div>
          <div v-if="item.info.hasOwnProperty('evaluateDetails')"
               style="padding: 2.67vw;border-style: solid;border-width: 0.27vw 0 0 0;border-color: #E3E4E6">
            <p class="base-text-details-normal-black-light"
               :style="(item.info.evaluateDetails===null||item.info.evaluateDetails==='')?'color: #CCC':''"
               style="line-height: 4.8vw" v-html="evaluateDetails"></p>
          </div>
        </div>
        <p class="base-text-details-normal-gray-dark" style="margin: 2.67vw 0 0 0">{{timeStr}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';

  export default {
    name: "flow-item",
    props:
      {
        locationIndex: {//1标识第一个，2标识最后一个
          type: Number,
          default: 0
        },
        item: {},
      },
    data() {
      return {
        securityPersonnelScoreText: '',
        actionStr: '',
        timeStr: '',

        evaluateDetails: '',
      }
    },
    created() {
      this.getInfo();
    },
    watch: {
      locationIndex() {
        this.getInfo();
      },
      item() {
        this.getInfo();
      }
    },
    methods: {
      getInfo() {
        this.timeStr = utils.timetrans(this.item.time, "")
        if (this.item.messageType === 'alert') {
          switch (this.item.flowType) {
            case "untreated":
              break;
            case "being":
              this.actionStr = "请求出警";
              break;
            case "receive":
              this.actionStr = "接受出警";
              break;
            case "deal":
              this.actionStr = "正在出警";
              break;
            case "complete":
              this.actionStr = "完成出警";
              break;
            case "evaluate":
              this.actionStr = "完成评价";
              if(!this.item.info.evaluateDetails) {
                this.evaluateDetails = "您还没有评论呢~";
              } else {
                this.evaluateDetails = utils.changeEnter(this.item.info.evaluateDetails);
              }
              this.securityPersonnelScore(this.item.info.evaluate);
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else if (this.item.messageType === 'declare') {
          switch (this.item.flowType) {
            case "untreated":
              break;
            case "being":
              this.actionStr = "请求维保";
              break;
            case "receive":
              this.actionStr = "接受任务";
              break;
            case "deal":
              this.actionStr = "正在处理";
              break;
            case "complete":
              this.actionStr = "完成任务";
              break;
            case "evaluate":
              this.actionStr = "完成评价";
              if(!this.item.info.evaluateDetails) {
                this.evaluateDetails = "您还没有评论呢~";
              } else {
                this.evaluateDetails = utils.changeEnter(this.item.info.evaluateDetails);
              }
              this.securityPersonnelScore(this.item.info.evaluate);
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else if (this.item.messageType === 'install') {
          switch (this.item.flowType) {
            case "untreated":
              break;
            case "being":
              this.actionStr = "申报安装";
              break;
            case "receive":
              this.actionStr = "接受任务";
              break;
            case "deal":
              this.actionStr = "正在处理";
              break;
            case "complete":
              this.actionStr = "完成任务";
              break;
            case "evaluate":
              this.actionStr = "完成评价";
              this.securityPersonnelScore(this.item.info.evaluate);
              break;
            case "fault":
              break;
            default:
              break;
          }
        } else {
          return;
        }
      },
      securityPersonnelScore(evaluate) {
        switch (evaluate) {
          case 1:
            this.securityPersonnelScoreText = "非常不满意，各方面都很差";
            return;
          case 2:
            this.securityPersonnelScoreText = "不满意，比较差";
            return;
          case 3:
            this.securityPersonnelScoreText = "一般，还需改善";
            return;
          case 4:
            this.securityPersonnelScoreText = "比较满意，仍可改善";
            return;
          case 5:
            this.securityPersonnelScoreText = "非常满意，无可挑剔";
            return;
          default:
            return;
        }
      },
    }
  };
</script>

<style scoped>
  .flow-item-box {
    height: 8vw;
  }
  .flow-item-line1-style {
    /*width: 0.27vw;*/
    width: calc(0.2vw + 0.07vw);
    height: 2.99335vw;
    background-color: #CCCCCC;
  }
  .flow-item-line2-style {
    background-color: rgba(0,0,0,0);
  }
</style>
