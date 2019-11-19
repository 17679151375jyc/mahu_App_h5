<template>
  <div class="button-bottom-style" :style="float==='bottom'?{bottom:0}:{top:0}">
    <button-background-bottom v-if="type==='background'"
                              :text="text"
                              :icon="icon"
                              @buttonOnClick="buttonOnClick">
    </button-background-bottom>
  </div>
</template>

<script>
  import buttonBackgroundBottom from '_c/button/button-background-bottom';

  export default {
    name: "float-button",
    components: {
      buttonBackgroundBottom,
    },
    props:
      {
        type: {
          type: String,
          default: 'background'
        },
        float: {
          type: String,
          default: 'bottom'
        },
        text: {
          type: String,
          default: ''
        },
        icon: {
          type: String,
          default: ''
        }
      },
    methods: {
      buttonOnClick() {
        const self = this;
        self.$emit('buttonOnClick', {});
      }
    }
  }
</script>

<style scoped>
  .button-bottom-style {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    /*margin: 4vw 0 5.33vw 0;*/
  }
</style>