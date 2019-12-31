<!--@Time  : 2019/10/16 14:44-->
<!--@Author: michael huang-->
<!--@File  : my-car.vue-->

<template>
  <div class="wrapper">
    <return-head title="车辆管理" rightText="添加车辆" @rightBtnOnClick="addCar()"></return-head>

    <button-add-quick
      v-if="carList.length===0"
      style="margin: 2.9vw 4vw"
      text="您暂无车辆信息"
      iconType="car"
      @btnOnClick="addCar()"
    ></button-add-quick>

    <div class="car-wrapper border-top-1px" v-if="carList.length > 0">
      <div
        class="car-item"
        v-for="(item,index) in carList"
        :key="index"
        :class="['car-item', index===0? 'margin-top-none' : '']"
      >
        <div class="car">
          <div class="icon">
            <img :src="require('@/view/mine/icon-car.png')" />
          </div>
          <div class="name">{{item.carNumber}}</div>
          <div class="handler" v-if="plotOptions.length > 1">
            <span @click="addCar(item.carNumber)">添加社区</span>
          </div>
        </div>
        <div class="plots">
          <div
            class="option border-top-1px"
            v-for="(listItem,listIndex) in item.list"
            :key="listIndex"
          >
            <div class="info">
              <div class="status" v-if="listItem.status===1 || listItem.status===0">
                <img v-if="listItem.status===0" :src="require('./checking-icon.png')" />
                <img v-if="listItem.status===1" :src="require('./pass-icon.png')" />
              </div>
              <div class="icon">
                <img :src="require('./plot-icon.png')" />
              </div>
              <div class="name">{{listItem.plotName}}</div>
              <div class="handler">
                <!-- <span class="pass" v-if="listItem.status===1">通过审核</span>
                <span class="checking" v-if="listItem.status===0">未审核</span>-->
                <div
                  class="resubmit"
                  v-if="listItem.status===2"
                  @click="reAddCar(item.carNumber,listItem.plotName,listItem.id,listItem.plotNumber)"
                >重新提交</div>
                <div class="del" @click="delCar(listItem.id)">删除</div>
              </div>
            </div>
            <div class="content" v-if="listItem.remark">
              <div class="c-title">拒绝原因：</div>
              <div class="remark">{{listItem.remark}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import buttonAddQuick from "_c/button/button-add-quick";
import basePopup from "_c/popup/base-popup";
import { mapState } from "vuex";
import CarNumber from "_c/carNumber/carNumber";
export default {
  name: "my-car",
  components: { CarNumber, returnHead, buttonAddQuick, basePopup },
  data() {
    return {
      carList: [],
      plotOptions: [],
      choosePlotName: "",
      choosePlotId: "",
      choosePlotIndex: 0,

      // 弹窗属性
      isPopShow: false,
      refId: "myCarPopup",
      popTitle: "",
      popType: "",
      popPlainText: "",
      popCancelText: "",
      popSureText: "",
      // 弹窗参数
      carId: "",
      carPlotNumber: "",
      //   changeCarName: "",
      carNumber: ""
    };
  },
  computed: {
    ...mapState({
      'mFamilyPlotList': state => state.plot.familyPlotList
    }),
    changeCarName: {
      get: function() {
        return this.carNumber;
      },
      set: function(val) {
        console.log("set ChangeCarName");
        if (val) {
          this.carNumber = val.toUpperCase();
        }
      }
    }
  },
  created() {
    this.mFamilyPlotList.forEach((item)=> {
      console.log(item);
      if(item.parkId) {
        this.plotOptions.push(item)
      }
    });
    this.choosePlotName = this.plotOptions[0].text;
    this.choosePlotId = this.plotOptions[0].plotId;
  },
  mounted() {
    this.getUserCarList();
  },
  methods: {
    getUserCarList() {
      let self = this;
      self.$post("userCar", "/getUserCarList", {}).then(res => {
        self.carList = [...res.data];
      });
    },

    addCar(carName = "") {
      this.carNumber = carName;
      console.log("点击了触发添加车辆");
      this.addCarDialog = this.$createDialog(
        {
          type: "confirm",
          title: "添加车辆出入申请",
          zIndex: 99,
          onConfirm: () => {
            if (utils.numberVerification("carNumber", this.changeCarName)) {
              this.$post("userCar", "/add", {
                carNumber: this.changeCarName,
                plotNumber: this.choosePlotId
              }).then(res => {
                this.$createToast({
                  type: "correct",
                  txt: "提交成功"
                }).show();
                this.getUserCarList();
              });
            } else {
              this.addCarDialog.show();
              this.$createToast({
                type: "warn",
                txt: "请输入正确的车牌号码"
              }).show();
            }
          }
        },
        h => {
          let cubeSelect = null;
          cubeSelect = h("cube-select", {
              class: {
                "car-number-plot": true
              },
              props: {
                title: "请选择社区",
                placeholder: "请选择社区",
                options: this.plotOptions,
                value: this.choosePlotId,
              },
              on: {
                change: value => {
                  this.choosePlotId = value;
                }
              }
            });
          return [
            h(
              "div",
              {
                slot: "content",
                style: {
                  display: "flex",
                  "flex-flow": "column",
                  "align-items": "center"
                }
              },
              [
                cubeSelect,
                h(CarNumber, {
                  class: {
                    "add-car-number": true
                  },
                  props: {
                    value: this.changeCarName
                  },
                  on: {
                    input: $event => {
                      this.changeCarName = $event;
                    }
                  }
                })
                // h("cube-input", {
                //   class: {
                //     "car-number-input": true
                //   },
                //   props: {
                //     placeholder: "请输入完整车辆号码",
                //     value: this.changeCarName
                //   },
                //   on: {
                //     input: $event => {
                //       console.log($event);
                //       this.changeCarName = $event;
                //     }
                //   }
                // }
                // )
              ]
            )
          ];
        }
      );
      this.addCarDialog.show();
    },
    /**
     * 删除车辆
     */
    delCar(id) {
      this.$createDialog({
        type: "confirm",
        title: "提示",
        content: "是否确定要删除该车辆",
        onConfirm: () => {
          this.$post("userCar", "/delete", {
            id
          })
            .then(({ data, errorCode }) => {
              if (errorCode === 0) {
                this.toast = this.$createToast({
                  type: "correct",
                  txt: "删除成功",
                  time: 2000
                }).show();
                this.getUserCarList();
              } else {
              }
            })
            .catch(err => {});
        }
      }).show();
    },
    reAddCar(carName, plotName, carId, carPlotNumber) {
      this.$createDialog({
        type: "confirm",
        title: "提示",
        content: "是否重新提交审核",
        onConfirm: () => {
          this.$post("userCar", "/reAdd", {
            id: carId,
            carNumber: carName,
            plotNumber: carPlotNumber
          }).then(res => {
            this.$createToast({
              type: "correct",
              txt: "提交成功",
              time: 2000
            }).show();
            this.getUserCarList();
          });
        }
      }).show();
    },
    choosePlotPicker() {
      //选择社区
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "选择社区",
          data: [this.plotOptions],
          selectedIndex: [this.choosePlotIndex],
          onSelect: this.plotSelectHandle,
          onCancel: this.plotCancelHandle
        });
      }
      this.picker.show();
    },
    plotSelectHandle(selectedVal, selectedIndex, selectedText) {
      this.choosePlotName = this.plotOptions[selectedIndex].text;
      this.choosePlotId = this.plotOptions[selectedIndex].plotId;
      this.choosePlotIndex = selectedIndex;
      this.picker = undefined;
    },
    plotCancelHandle() {
      this.picker = undefined;
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-car-btn {
  width: 16vw;
  height: 8.5333vw;
  border-radius: 1.0666vw;
  background: linear-gradient(to bottom, #30c9ff, #38f);
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #b3b3b3;
  font-size: 3.2vw;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #b3b3b3;
  font-size: 3.2vw;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #b3b3b3;
  font-size: 3.2vw;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #b3b3b3;
  font-size: 3.2vw;
}

.car-wrapper {
  position: absolute;
  top: 11.7333vw;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  border-color: red !important;
}

.car-item {
  margin-top: 2.667vw;
  overflow: hidden;

  &.margin-top-none {
    margin-top: 0;
  }

  .car {
    height: 13.333vw;
    background: #fff;
    padding: 0 8vw 0 5.333vw;
    display: flex;
    align-items: center;

    .icon {
      flex: 0 0 5.333vw;
      margin-right: 1.6vw;

      img {
        display: block;
        width: 5.333vw;
      }
    }

    .name {
      flex: 1;
      font-size: 4.8vw;
      font-weight: bold;
      color: #666;
    }

    .handler {
      color: #3388FF;
      font-size: 4.267vw;
      display: flex;

      span {
        height: 13.333vw;
        padding: 0 2.667vw;
        display: flex;
        align-items: center;

        &:active {
          background: #f4f4f4;
        }

        &:nth-last-child(1) {
          margin-right: -2.667vw;
        }

        &.del {
          color: #F94327;
        }
      }
    }
  }

  .plots {
    background: #fff;

    .option {
      display: flex;
      margin: 0 8vw;
      flex-flow: column;

      .info {
        position: relative;
        width: 100%;
        height: 13.333vw;
        padding-top: 2.667vw;
        display: flex;
        align-items: center;

        .status {
          position: absolute;
          top: 0;
          right: -10.133vw;

          img {
            display: block;
            width: 12vw;
          }
        }

        .icon {
          flex: 0 0 5.333vw;
          margin-right: 2.133vw;

          img {
            width: 5.333vw;
          }
        }

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          color: #666;
          font-size: 4.267vw;
        }

        .handler {
          flex: 0 0 32vw;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 3.2vw;

          .pass {
            color: #13AA95;
          }

          .checking {
            color: #3388FF;
          }

          .resubmit {
            width: 16vw;
            height: 7.533vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
            border-radius: 0.533vw;
            color: #fff;

            &:active {
              background: linear-gradient(135deg, darken(rgba(48, 201, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
            }
          }

          .del {
            width: 16vw;
            height: 7.533vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
            border-radius: 0.533vw;
            color: #fff;
            margin-left: 1.333vw;

            &:active {
              background: linear-gradient(135deg, darken(rgba(48, 201, 255, 1), 20%) 0%, darken(rgba(51, 136, 255, 1), 20%) 100%);
            }
          }
        }
      }

      .content {
        padding: 1.333vw;
        background: #eee;
        margin-bottom: 2.667vw;
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 1.067vw;
        display: flex;
        padding: 1.333vw 2.667vw;

        .c-title {
          flex: 0 0 18.667vw;
          color: #999999;
          font-size: 3.733vw;
        }

        .remark {
          flex: 1;
          color: #D72A25;
          font-size: 3.467vw;
          line-height: 4.267vw;
        }
      }
    }

    .border-bottom-1px::after {
      border-color: #eee !important;
    }
  }
}

>>>.cube-picker {
  z-index: 101 !important;
}
</style>
<style lang="stylus">
.car-number-input {
  margin-top: 2vw;
  width: 72vw;
  background: #f2f3f5;

  ::placeholder { /* WebKit browsers */
    color: #999;
  }
}

.car-number-plot {
  margin-top: 2.667vw;
  background: #f2f3f5;
  width: 72vw;
  border-radius: 0;

  .cube-select-text {
    font-size: 5.067vw;
    color: #333;
  }

  >>>.cube-select-placeholder {
    color: #999;
  }

  >>>&:after {
    display: none;
  }
}

.add-car-number {
  margin-top: 2.667vw;
  width: 72vw;
  height: 12.8vw !important;

  .label {
    background: #f8f8f8;
  }

  .input {
    flex: 1 !important;
    background: #f8f8f8;

    input {
      &::placeholder {
        color: #999;
      }
    }
  }

  .car-number-content {
    width: 100vw;
    left: -8vw !important;
    bottom: -57vw !important;
  }
}
</style>