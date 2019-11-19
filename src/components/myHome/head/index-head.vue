<template>
  <div class="base-horizontal-layout-space-between-item-center" v-bind:class="{'index-head' : true}">
    <div class="index-head-box">
      <p class="home-name">{{homeName}}</p>
      <!--<img :src="require('@/assets/icon/icon_edit-blue.png')" class="edit-style" @click="editName">-->
    </div>
    <div class="base-horizontal-layout-general-item-center" @click="rightOnClick">
      <p v-if="rightText!==''" class="index-head-right-text" >{{rightText}}</p>
      <img v-if="rightTextRightIcon!==''" :src="rightTextRightIcon" class="base-icon-small-style">
    </div>
  </div>
</template>

<script>
  export default {
    name: "index-head",
    props:
      {
        homeName: {
          type: String,
          default: ""
        },
        rightText: {
          type: String,
          default: ""
        },
        rightTextRightIcon: {
          type: String,
          default: ""
        },
      },
    methods: {
      editName() {
        const self = this;
        self.$emit('editName', {});
      },
      rightOnClick() {
        const self = this;
        self.$emit('rightOnClick', {});
      }
    }
  };
</script>

<style scoped>
  .index-head {
    width: 100vw;
    height: 18.7333vw;
    background-color: #FFFFFF;
    padding: 7vw 5vw 0 5vw;
    box-sizing: border-box;
  }
  .index-head-box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .home-name {
    font-size: 5.33vw;
    font-weight: bold;
    color: black;
    line-height: 7.47vw;
  }
  .edit-style {
    width: 4vw;
    height: 4vw;
    margin-left: 4vw;
  }
  .index-head-right-text {
    font-size: 3.73vw;
    font-weight: bold;
    color: #3388FF;
    line-height: 6.4vw;
  }
  .index-head-right-icon {
    width: 3.2vw;
    height: 3.2vw;
  }
</style>
