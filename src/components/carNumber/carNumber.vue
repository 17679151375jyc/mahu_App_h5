<template>
  <div class="car-number">
    <div class="label" @click="visible=true">
      <span>{{province == 'other' ? '其它' : province}}</span>
      <i class="cubeic-pulldown"></i>
    </div>
    <cube-input class="input" v-model.trim="inputCarNumber" placeholder="车牌号码"></cube-input>

    <div :class="['car-number-popup', visible ? 'cube-popup_mask' : '']" v-show="visible">
      <div class="cube-popup-mask" @click="visible=false"></div>
      <div class="car-number-content" v-show="visible">
        <!-- <div class="handler border-bottom-1px">
          <div class="left">取消</div>
          <div class="title">请选择车牌前缀</div>
          <div class="right" @click="visible=false">确定</div>
        </div>-->
        <div class="items">
          <div
            :class="['item', item == province ? 'active' : '', ]"
            v-for="(item, index) in provinceList"
            :key="index"
            @click="chooseProvince(item)"
          >{{item == 'other' ? "其它" : item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
    // province: {
    //   //传省的简称或other,other为自定义
    //   type: String,
    //   default: "粤"
    // }
  },
  data() {
    return {
      province: "粤",
      carNumber: "",
      inputCarNumber: "",
      visible: false,
      provinceList: [
        "京",
        "津",
        "晋",
        "冀",
        "蒙",
        "辽",
        "吉",
        "黑",
        "沪",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "鲁",
        "豫",
        "鄂",
        "湘",
        "粤",
        "桂",
        "琼",
        "渝",
        "川",
        "贵",
        "云",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
        "other"
      ]
    };
  },
  watch: {
    value: {
      handler: function(val) {
        console.log("value改变", val);
        this.carNumber = val;
      },
      immediate: true
    },
    inputCarNumber(val) {
      console.log("inputCarNumber改变", val);
      if (this.province == "other") {
        let valArr = val.split("");
        if (this.provinceList.includes(valArr[0])) {
          this.province = valArr[0];
          this.inputCarNumber = val.toUpperCase();
        }
        this.$emit("input", val.toUpperCase());
      } else {
        let valArr = val.split("");
        if (this.provinceList.includes(valArr[0])) {
          this.province = valArr[0];
          this.inputCarNumber = val.toUpperCase();
          this.$emit("input", val.toUpperCase());
        } else {
          this.$emit("input", this.province + "" + val.toUpperCase());
        }
      }
    },
    carNumber: {
      handler: function(val) {
        console.log("carNumber改变", val);
        let newVal = "";
        let valArr = val.split("");
        if (this.provinceList.includes(valArr[0])) {
          valArr.splice(0, 1);
        }
        newVal = valArr.join("").toUpperCase();
        this.inputCarNumber = newVal;
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 选择省
     */
    chooseProvince(province) {
      this.province = province;
      if (this.province == "other") {
        this.$emit("input", this.inputCarNumber);
      } else {
        this.$emit("input", this.province + this.inputCarNumber);
      }

      this.visible = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.car-number {
  display: flex;
  height: 13.333vw;
  justify-content: flex-end;

  .label {
    flex: 0 0 13.333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.733vw;

    span {
      font-weight: bold;
    }

    position: relative;
    border: 1px solid #ddd;
    box-sizing: border-box;

    &.active {
      background: #f4f4f4;
    }
  }

  .input {
    flex: 0 0 26.667vw;
    margin-left: 0.4vw;
  }

  >>>.cube-input {
    padding: 0 4vw;
  }

  >>>.cube-input::after {
    // display: none;
    border-color: #bababa;
  }

  .car-number-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;

    .car-number-content {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 72.8vw;
      background: #fff;
      display: flex;
      flex-flow: column;
      z-index: 201;

      .handler {
        flex: 0 0 60px;
        height: 120px;
        display: flex;
        justify-content: space-between;

        div {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .items {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background: #cfd4da;
        padding: 2vw;

        .item {
          flex: 0 0 10vw;
          height: 10vw;
          background: #fff;
          margin: 0 0.5vw;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.8vw;
          color: #333;
          font-size: 4.8vw;

          &:active, &.active {
            color: #fff;
            background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
          }
        }

        .item-none {
          flex: 0 0 10vw;
          height: 0;
          margin: 0 1vw;
        }
      }
    }
  }
}
</style>