<template>
  <div class="base-horizontal-layout-center-item-center"
       :class="{'little-red-dot' : true, 'little-red-dot-long-width' : (num>99),
       'little-red-dot-gray' : (num===0 || isForbidden)}"
       @click="onDotClick">
    <p v-if="num>99" class="little-red-dot-text">99+</p>
    <p v-else class="little-red-dot-text">{{num}}</p>
  </div>
</template>

<script>
  export default {
    name: "little-red-dot",
    props:
      {
        num: {
          type: Number,
          default: 0
        },
        isForbidden : {
          type: Boolean,
          default: false
        }
      },
    methods: {
      onDotClick() {
        const self = this;
        self.$emit('onDotClick', {});
      }
    }
  };
</script>

<style scoped>
  .little-red-dot {
    width: 5.87vw;
    height: 4.27vw;
    border-radius: 2.67vw;
    background-color: red;
  }
  .little-red-dot-long-width {
    width: 8.53vw;
  }
  .little-red-dot-gray {
    background-color: #DADFE6;
  }
  .little-red-dot-text {
    font-size: 3.2vw;
    color: white;
    text-align: center;
  }

</style>
