<template>
    <div class="cell"
         @click="pushTo"
         :style="cellStyle">
      <div class="cell-text">{{title}}</div>
      <div class="cell-text-right">
        <slot name ="menu"></slot>
        <img :src="cellIcon"  class="cell-icon"/>
      </div>

    </div>
</template>

<script>
    export default {

        name: "cell",
       props: {
         title: {
           type: String,
           default: '',
         },
         con: {
           type: String,
           default: '',
         },
         cellIcon: {
           type: String,
           default: 'static/assets/mine/yui.png',
         },
         cellStyle: {
           type: Object,
           default: () => {}
         },
       },
      methods: {
        pushTo(){
          let self = this;
          this.$emit('pushTo',{})
        }
      }
    }
 </script>

<style scoped>
.cell{
  display: flex;
  flex-direction: row;
  height: 1.5625rem;
  justify-content: space-between;
  border-top: 0.03125rem solid #EDEEF0;
  margin-left: 0.625rem;
  align-items: center;
}
.cell-text{
  color:rgba(102,102,102,1);
  font-size: 0.40625rem;
}
.cell-icon{
  width: 1.25rem;
  height: 1.25rem;
}
  .cell-text-right{
    display: flex;
    flex-direction: row;
    align-items: center;
    color:rgba(204,204,204,1);
    font-size: 0.40625rem;
  }
</style>
