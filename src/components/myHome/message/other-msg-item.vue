<template>
  <div style="margin-top: 5.33vw">
    <div class="other-msg-item-unread-icon" style="position: relative;top: 3vw;left: 1.8vw"></div>
    <div style="margin-left: 1.6vw" >
      <p class="base-text-details-normal-black"
         style="line-height: 5.33vw">&nbsp;{{otherMessage.msgText}}</p>
      <p class="base-text-details-normal-black"
         style="color: #AAADB3;line-height: 3.73vw;font-weight: 100;margin-top: 1.73vw">2019-1-1 01:01:01{{otherMessage.time}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "other-msg-item",
    props:
      {
        otherMessage: {}
      }
  };
</script>

<style scoped>
  .other-msg-item-unread-icon {
    width: 1.6vw;
    height: 1.6vw;
    background-color: red;
    border-radius: 50%;
  }
</style>
