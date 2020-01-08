<!--
 * @Descripttion: 
 * @version: 
 * @Author: Vencent Lum
 * @Date: 2020-01-02 17:43:11
 * @LastEditors  : Vencent Lum
 * @LastEditTime : 2020-01-03 09:48:31
 -->
<template>
  <div class="base-horizontal-layout-center-item-center"
       :class="{'little-red-dot' : true, 'little-red-dot-long-width' : (num>99),
       'little-red-dot-gray' : (num===0 || isForbidden)}"
       @click="onDotClick">
    <div class="base-horizontal-layout-center-item-center">
      <img :src="icon" class="base-icon-small-style" style="margin-right: 0.8vw">
      <p v-if="num>99" class="little-red-dot-text">99+</p>
      <p v-else class="little-red-dot-text">{{num}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "little-gray-dot-icon",
    props:
      {
        num: {
          type: Number,
          default: 0
        },
        isForbidden : {
          type: Boolean,
          default: false
        },
        icon: {
          type: String,
          default: ""
        }
      },
    methods: {
      onDotClick() {
        const self = this;
        self.$emit('onDotClick', {});
      }
    }
    ,
    created() {
     // console.log(this.num);
    }
  };
</script>

<style scoped>
  .little-red-dot {
    width: 11.87vw;
    height: 5.57vw;
    border-radius: 2.67vw;
    /*background-color: #3388FF;*/
    background-color: #DADFE6;
  }
  .little-red-dot-long-width {
    width: 12.53vw;
  }
  .little-red-dot-gray {
    background-color: #DADFE6;
  }
  .little-red-dot-text {
    font-size: 3.9vw;
    line-height: 4.9vw;
    color: white;
    text-align: center;
  }

</style>
