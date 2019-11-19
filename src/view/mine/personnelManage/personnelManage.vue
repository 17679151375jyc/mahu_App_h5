<template>
  <div class="wrapper">
    <topBar :title="'出入人员认证'"></topBar>
    <div class="middle">
      <div class="item">
        <div class="left">
          <div class="name">
            叶嘉辉
            <span>主用户</span>
          </div>
          <div class="address">
            <i class="iconfont iconzu5"></i>
            <span>圣地亚哥花园18座1801</span>
          </div>
          <div class="address">
            <i class="iconfont iconzu5"></i>
            <span>美洲之星花园3座1001</span>
          </div>
        </div>
        <div class="right">
          <img :src="require('./avatar-add.png')" alt>
          <span>添加人脸</span>
        </div>
      </div>
      <div class="tips">
        请先添加主用的认证，方可添加家人
        <br>添加认证前，请先完善
        <b>个人信息</b>及添加住户信息
      </div>
      <!-- 步骤条-start -->
      <steps :steps="steps" :curStep="curStep"></steps>
      <!-- 步骤条-end -->

      <!-- 确认信息-start -->
      <div class="confirm-info">
        <div class="title">请确认您的资料真实有效</div>
        <div class="sub-title">人脸识别照片</div>
        <div class="avatar">
          <img src="https://iconfont.alicdn.com/t/1518401807103.jpg@100h_100w.jpg">
        </div>
        <div class="name">
          黄子翼
          <b>(家人)</b>
        </div>
        <div class="options">
          <div class="option">
            <div class="left">座号</div>
            <div class="right">
              <div>圣地亚哥花园18座1801</div>
              <div>圣地亚哥花园18座1801</div>
            </div>
          </div>
          <div class="option">
            <div class="left">手机号</div>
            <div class="right">
              <div>13657249632</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 确认信息-end -->

      <!--认证完成-start-->
      <div class="complete">
        <i class="iconfont iconrenzhengwancheng"></i>
        <div class="title">认证完成</div>
        <div class="sub-title">感谢您的信任与支持！</div>
      </div>
      <!-- 认证完成-end -->

      <!-- 填写表单信息-start -->
      <div class="form-title">
        <div class="main">
          <i class="iconfont iconzu14"></i>
          请输入您的资料确保真实有效
        </div>
        <div class="sub">本过程需要认证人亲自完成，仅需要1分钟！</div>
      </div>

      <cube-form class="form" :model="model" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
            <cube-form-item :field="fields[2]">
            <div class="gender">
              <div
                :class="['option', model.relation == '家人' ? 'selected' : '']"
                @click="model.relation = '家人'"
              >家人</div>
              <div
                :class="['option', model.relation == '朋友' ? 'selected' : '']"
                @click="model.relation = '朋友'"
              >朋友</div>
            </div>
          </cube-form-item>
          <cube-form-item :field="fields[3]"></cube-form-item>

        </cube-form-group>
        <cube-form-group style="background: #f5f5f5;">
          <cube-button type="submit" class="submit">保存</cube-button>
        </cube-form-group>
      </cube-form>
      <!-- 填写表单信息-end -->
    </div>

    <div class="add">
      <cube-button :primary="true" class="btn">添加家人人脸认证</cube-button>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import steps from "_c/steps/steps";
  import topBar from "_c/topBar";

  export default {
    components: { topBar, steps },
    data() {
      return {
        steps: [
          {
            icon: "iconcardid",
            desc: "身份核实"
          },
          {
            icon: "iconzu13",
            desc: "人脸认证"
          },
          {
            icon: "iconzu9",
            desc: "确认信息"
          },
          {
            icon: "iconzu10",
            desc: "认证完成"
          }
        ],
        curStep: 1,
        model: {
          name: "", // 真实姓名
          relation: "", // 关系
          phone: '', // 手机号
        },
        fields: [
          {
            label: "座号",
            rules: {
              required: true
            }
          },
          {
            type: "input",
            modelKey: "name",
            label: "姓名",
            props: {
              placeholder: "请填写您的姓名"
            },
            rules: {
              required: true
            },
            messages: {
              required: "请填写姓名"
            }
          },
          {
            modelKey: "gender",
            label: "关系",
            rules: {
              required: true
            },
            messages: {
              required: "请选择关系"
            }
          },
          {
            type: "input",
            modelKey: "phone",
            label: "手机号",
            props: {
              placeholder: "请填写您有效的手机号"
            },
            rules: {
              required: true,
              type: "tel"
            },
            messages: {
              required: "请填写手机号码"
            }
          }
        ]
      };
    },
    created() {
      utils.hideTab();
    },
  };
</script>

<style lang="stylus" scoped>
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  .middle {
    flex: 1;
    overflow: scroll;
  }

  .item {
    background: #fff;
    margin-top: 2.6667vw;
    padding: 5.0667vw 8vw;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: column;

      .name {
        color: #666;
        font-size: 4.8vw;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-bottom: 1.0667vw;

        span {
          flex: 0 0 10.4vw;
          height: 4.2667vw;
          line-height: 4.2667vw;
          color: #fff;
          border-radius: 0.5333vw;
          background: #29CCCC;
          text-align: center;
          font-size: 2.6667vw;
          margin-left: 1.3333vw;
        }
      }

      .address {
        font-size: 3.2vw;
        color: #ccc;
        margin-top: 1.0667vw;
        height: 4.2667vw;
        display: flex;
        align-items: center;

        i {
          color: #3F8FFF;
          font-size: 3.2vw;
          margin-right: 0.5333vw;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;

      img {
        width: 12vw;
        height: 12vw;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 2.6667vw;
      }

      span {
        font-size: 3.2vw;
        color: #3388FF;
      }
    }
  }

  .tips {
    font-size: 3.7333vw;
    color: #ccc;
    text-align: center;
    line-height: 5.8667vw;
    margin-top: 2.6667vw;

    b {
      color: #78F26B;
    }
  }

  .add {
    height: 23.2vw;
    width: 100%;

    .btn {
      margin: 4.8vw auto 0 auto;
      width: 89.3333vw;
      height: 12.2667vw;
      border-radius: 7.7333vw;
      color: #fafafa;
      font-size: 3.7333vw;
      font-weight: normal;
    }
  }

  .confirm-info {
    background: #fff;
    margin-top: 2.6667vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      color: #666;
      font-size: 4.2667vw;
      line-height: 5.6vw;
      font-weight: bold;
      margin: 2.1333vw auto 5.8667vw auto;
    }

    .sub-title {
      color: #666;
      font-size: 3.2vw;
      line-height: 4.2667vw;
      margin-bottom: 1.0667vw;
    }

    .avatar {
      width: 17.0667vw;
      height: 17.0667vw;
      overflow: hidden;
      border-radius: 2.1333vw;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      line-height: 5.0667vw;
      margin: 3.7333vw auto;
      color: #666;
      font-size: 3.7333vw;
      font-weight: bold;

      b {
        color: #38f;
        font-weight: bold;
      }
    }

    .options {
      width: 84vw;
      background: #f5f5f5;
      margin: 0 auto 8.5333vw auto;
      border-radius: 1.3333vw;

      .option {
        width: 82.4vw;
        margin: 0.8vw auto;
        background: #fff;
        box-sizing: border-box;
        border-radius: 1.0667vw;
        padding: 2.6667vw 4vw;
        display: flex;
        justify-content: space-between;
        color: #666;
        font-size: 3.7333vw;

        .left {
          flex: 0 0 13.3333vw;
        }

        .right {
          flex: 1;
          text-align: right;

          div {
            margin-bottom: 1.6vw;

            &:nth-last-child(1) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .complete {
    width: 100%;
    background: #fff;
    margin-top: 2.6667vw;
    text-align: center;
    overflow: hidden;

    i {
      color: #29CCCC;
      font-size: 24vw;
      margin-top: 22.4vw;
      display: block;
    }

    .title {
      color: #666;
      font-size: 3.7333vw;
      line-height: 5.0667vw;
      margin-top: 4.5333vw;
      font-weight: bold;
    }

    .sub-title {
      margin: 1.0667vw auto 9.6vw auto;
      font-size: 3.2vw;
      color: #666;
    }
  }

  .form-title {
    margin-top: 2.6667vw;
    height: 18.6667vw;
    background: #fff;
    text-align: center;
    overflow: hidden;

    .main {
      height: 5.0667vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 3.7333vw;
      font-weight: bold;
      margin: 2.6667vw auto 2.1333vw auto;

      i {
        color: #F4CC24;
        margin-right: 1.6vw;
        font-weight: normal;
      }
    }

    .sub {
      font-size: 3.2vw;
      color: #666;
    }
  }

  >>>.cube-form_standard .cube-input input {
    text-align: right !important;
  }

  .form {
    margin-top: 2.6667vw;

    .gender {
      display: flex;
      justify-content: flex-end;
    }

    .gender .option {
      width: 16vw;
      height: 8vw;
      line-height: 8vw;
      border-radius: 5.3333vw;
      margin-left: 2.6667vw;
      text-align: center;
      background: #EDEEF0;
      color: #666 !important;
      transition: background 0.3s;
    }

    .gender .option.selected {
      background: #3388ff;
      color: #fff !important;
    }

    .cube-input input {
      text-align: right;
    }

    .cube-select {
      text-align: right;
    }

    .cube-form-group-content .cube-btn.submit {
      background: #3388FF;
      width: 89.3333vw;
      height: 12.2667vw;
      margin: 5.3333vw auto;
      font-size: 3.7333vw;
    }

    .cube-form-group-content .cube-btn.submit:active {
      background: #006aff;
    }

    .villageName {
      text-align: right;
      background: #EDEEF0;
      font-size: 3.4667vw;
      color: #333;
      line-height: 6.9333vw;
      height: 6.9333vw;
      padding: 0 2.6667vw;
      display: inline-block;
      float: right;
      border-radius: 1.3333vw;
    }
  }
</style>
