<template>
  <div class="joincom"
       :style="joinStyle">
    <div class="cell-text-left">{{conLeft}}</div>
    <div class="cell-text-right">{{conRight}}</div>
  </div>
</template>

<script>
    export default {
        name: "joincom-item",
      props: {
        conLeft: {
          type: String,
          default: '',
        },
        joinStyle: {
          type: Object,
          default: () => {}
        },
        conRight:{
          type: String,
          default: '',
        }
      },
      data(){
        return {

        }
      },
    }
</script>

<style scoped>
  .joincom{
    display: flex;
    flex-direction: row;
    height: 1.5625rem;
    justify-content: space-between;
    border-bottom: 0.03125rem solid #EDEEF0;
    margin-left: 0.625rem;
    align-items: center;
  }
  .cell-text-left{
    color:rgba(102,102,102,1);
    font-size: 0.40625rem;
    font-weight:500;
  }
  .cell-text-right{
    color:rgba(102,102,102,1);
    font-weight:500;
    font-size: 0.40625rem;
    margin-right:0.625rem;;
  }
</style>
