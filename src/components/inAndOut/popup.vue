<template>
  <cube-popup type="my-popup" ref="myPopup">
    <transition name="scale">
      <div class="popup_container" v-show="animateShow">
        <p class="title" style="border: 0">重新激活二维码</p>
        <p class="first-line" style=" padding: 0.15rem 0" @click="editProfile">
          <span class="left_title">李小姐</span>
          <span>
            <img :src="`${defaultUrl}icon_female.png`" alt="性别">
          </span>
          <span>134****8815</span>
          <span>
            <img
              style="border: nono;border-radius: 0;width: 1rem;height:1rem"
              src="/src/assets/inAndOut/head.jpg"
            >
          </span>
        </p>
        <p class="second-line">
          <span class="left_title">来访小区</span>
          <span class="select-wrapper">
            <cube-select
              v-model="value"
              class="select"
              :title="'选择来访小区'"
              @picker-show="areaShow"
              @picker-hide="areaHide"
              :options="optionDates"
            ></cube-select>
          </span>
        </p>
        <div class="with-person">
          <span class="left_title">来访人数</span>
          <p>
            <span @click="personChange(-1)">
              <img :src="`${defaultUrl}icon_reduce_blue.png`" class="add_reduce">
            </span>
            <input
              class="number"
              type="number"
              v-model="personNumber"
              @blur="isEffetive(personNumber)"
              @input="isEffetive(personNumber)"
              :placeholder="placeholder"
            >
            <span @click="personChange(1)">
              <img :src="`${defaultUrl}icon_add_blue.png`" class="add_reduce">
            </span>
          </p>
        </div>

        <p class="visit-time">
          <span class="left_title">来访时间</span>
          <span style="font-size: 0.38rem;text-align: justify" @click="showDatePicker">
            {{date? date : nowTime(Math.round(new Date() / 1000),"YY-MM-DD")}}
            <i
              class="cubeic-calendar"
            ></i>
          </span>
        </p>

        <div class="with-person">
          <span class="left_title">来访时长</span>
          <p>
            <span @click="timeChange(-1)">
              <img :src="`${defaultUrl}icon_reduce_blue.png`" class="add_reduce">
            </span>
            <input
              class="number"
              type="number"
              v-model="stayTime"
              @blur="isStayTime(stayTime)"
              @input="isStayTime(stayTime)"
              :placeholder="placeholder"
            >
            <span @click="timeChange(1)">
              <img :src="`${defaultUrl}icon_add_blue.png`" class="add_reduce">
            </span>
          </p>
        </div>
        <div class="btn-group">
          <button type="button" @click="popupCancel">取消</button>
          <button type="button" @click="popupFinish">保存</button>
        </div>
      </div>
    </transition>
  </cube-popup>
</template>

<script>
import utils from "_libs/utils";
export default {
  name: "popup",
  components: {},

  props: {},
  data() {
    return {
      defaultUrl: "/src/assets/inAndOut/",
      personNumber: 0,
      placeholder: 0,
      placeholderStayTime: 0,

      optionDates: ["云南大理 苍山脚", "哈尔滨雪乡镇"],
      value: "哈尔滨雪乡镇",
      popupShow: false,

      date: 0,
      stayTime: 0,
      animateShow: false
    };
  },
  methods: {
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
    },
    showDatePicker() {
      utils.hideTab().then(() => {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: `选择日期`,
            min: new Date(2019, 0, 1),
            max: new Date(2020, 0, 1),
            value: new Date(),
            format: {
              year: "YYYY",
              month: "MM",
              date: "DD",
              hour: "hh",
              minute: "mm",
              second: "ss"
            },
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          });
        }
        this.datePicker.show();
      });
    },
    selectHandle(date, selectedVal, selectedText) {
      this.date = selectedText.join("-");
    },
    cancelHandle() {
      this.datePicker.hide();
      utils.hideTab();
    },
    personChange(n) {
      if (n < 0 && this.personNumber <= 0) {
        return;
      } else {
        this.personNumber += n;
      }
    },
    editProfile(e) {
      this.$emit("popupCancel", true);
      if (window.localStorage) {
        window.localStorage.setItem("hideValue", "false");
        this.$router.push("/inAndOut/addVisitorInfo");
      } else {
        this.$router.push("/inAndOut/addVisitorInfo", { hideValue: true });
      }
    },
    isEffetive(number) {
      number = Number.parseInt(number);
      number = Math.abs(number);
      Number.isNaN(number)
        ? (this.placeholder = 0)
        : (this.personNumber = number);
    },
    areaShow(e) {
      utils.hideTab();
    },
    areaHide(e) {
      setTimeout(() => {
        // utils.showTab();
      }, 300);
    },
    timeChange(n) {
      if (n < 0 && this.stayTime <= 0) {
        return;
      } else {
        this.stayTime += n;
      }
    },
    isStayTime(number) {
      number = Math.abs(number);
      Number.isNaN(number)
        ? (this.placeholderStayTime = 0)
        : (this.stayTime = number);
    },
    nowTime(...obj) {
      return utils.timetrans(obj[0], obj[1]);
    },
    popupCancel(e) {
      this.$emit("popupCancel", e);
    },
    popupFinish(e) {
      this.$emit("popupFinish", e);
    }
  },
  computed: {},
  created() {},
  watch: {},
  mounted() {
    this.showPopup("myPopup");
    this.animateShow = !this.animateShow;
  }
};
</script>


<style lang="scss">
@import "@/view/style/animate.scss";
.popup_container {
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0.5rem;
  background: #fff;
  border-radius: 0.25rem;
  margin: 0 auto;
  .title {
    text-align: center;
    padding: 0.3rem 2.2rem;
    color: rgba(51, 51, 51, 1);
    font-weight: 700;
    font-size: 2.67vw;
  }
  p {
    padding: 0.37rem 0;
    font-size: 0.43rem;
    font-weight: 700;
    margin: 0.1rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .first-line {
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(233, 238, 245, 1);
    text-align: center;
    padding-left: 0.63rem;
    padding-right: 0.63rem;
    display: flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    span {
      font-size: 0.33rem;
    }
  }
  .second-line {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-wrapper {
      width: 60%;
      display: inline-block;
      background: rgba(237, 238, 240, 1);

      border-radius: 5px;
      .select {
        width: 100%;
        border: none;
        outline: none;
        background: rgba(237, 238, 240, 1);
        border-radius: 5px;
        padding: 0.1rem;
        font-weight: 600;
        font-size: 0.38rem;
      }
    }
  }
  .left_title {
    font-size: 0.38rem;
    font-weight: bold;
    color: rgba(77, 77, 77, 1);
  }
  .with-person {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    p {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 0.2rem 0;
      color: rgba(77, 77, 77, 1);
      min-width: 3rem;
      border-radius: 5px;
      border: 0;
      .number {
        background: rgba(237, 238, 240, 1);
        width: 1.3rem;
        text-overflow: ellipsis;
        text-align: center;
        padding: 0.15rem;
        border-radius: 0;
      }
      .add_reduce {
        width: 0.85rem;
        height: 0.85rem;
        border: 0;
        border-radius: 0;
        margin-top: 2px;
      }
    }
  }
  .visit-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0.5rem;
    button {
      width: 50%;
      border: 0;
      outline: none;
      font-size: 0.39rem;
      padding: 0.28rem 0;
      &:first-child {
        background: rgba(255, 255, 255, 1);
        color: rgba(77, 98, 128, 1);
        font-weight: 500;
      }
      &:last-child {
        background: rgba(51, 136, 255, 1);
        color: rgba(255, 255, 255, 1);
        border-radius: 0.85rem;
        font-weight: 500;
      }
    }
  }
}
</style>