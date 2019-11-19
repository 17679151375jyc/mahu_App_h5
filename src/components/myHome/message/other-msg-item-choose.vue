<template>
  <div class="base-horizontal-layout-general-item-center" style="margin-top: 5.33vw">
    <div class="other-msg-item-choose-icon"
         v-bind:class="{'other-msg-item-choose-icon-background': otherMessage.isChoose}"
         @click="otherMsgChooseOnclick"></div>
    <div style="width: 68vw;margin-left: 1.6vw" >
      <p class="base-text-details-normal-black"
         style="line-height: 5.33vw">{{otherMessage.msgText}}</p>
      <p class="base-text-details-normal-black"
         style="color: #AAADB3;line-height: 3.73vw;font-weight: 100;margin-top: 1.73vw">2019-1-1 01:01:01{{otherMessage.time}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "other-msg-item-choose",
    props:
      {
        otherMessage: {},
        index: {
          type: Number,
          default: 0,
        }
      },
    methods: {
      otherMsgChooseOnclick() {
        const self = this;
        self.$emit('otherMsgChooseOnclick', {index: this.index});
      }
    }
  };
</script>

<style scoped>
  .other-msg-item-choose-icon {
    width: 4vw;
    height: 4vw;
    border: 0.4vw solid #A1A8B3;
    border-radius: 50%;
  }
  .other-msg-item-choose-icon-background {
    background-color: #3388FF;
  }
</style>
