<!-- :val switch的on-off，:disabled 是否响应点击, @onChange switch值改变事件，返回val -->

<template>
  <div class="notice-wrap">
    <input
      id="mySwitch"
      name="mySwitch"
      style="width:0;visibility: hidden"
      type="text"
      v-model="value"
    />
    <p :class="['switch-wrap',trans]"
      @click="handleMove">
      <!--<span :class="['switch-background']"></span>-->
      <label :class="['label-wrap', name]" for="mySwitch"></label>
    </p>
  </div>
</template>


<script>
  export default {
    name: 'mySwitch',
    props: {
      val: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      parameterStr: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        name: '',
        trans: '',
        value: this.val
      }
    },
    methods: {
      initMove(value) {
        if(value){
          this.name='key-on';
          this.trans='trans-on';

        }else {
          this.name='key-off';
          this.trans='trans-off';
        }
      },
      handleMove() {
        if(this.disabled) {
          return false
        } else {
          this.value = !this.value;
          this.$emit("onChange", {val: this.value, parameterStr: this.parameterStr});
          this.initMove(this.value);
        }
      }
    },
    created() {
      this.initMove(this.val)
    },
    computed: {

    },
    watch: {
      val(n,o) {
        this.value = n;
        this.initMove(n)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.notice-wrap
   display flex
   flex-direction row

.switch-wrap
   min-width 40px
   height 20px
   padding 1.5px
   text-align left
   display block
   border-radius 33px
   overflow hidden
.label-wrap
   width 20px
   height 20px
   background #3388FF
   border-radius 50%
   display inline-block
   position relative
.switch-background

   height 20px
   border-radius 11px
   display block
   position absolute
   width 40px
   border 1px solid #f0f0f0
   transition: all .5s;
.key-off
   animation off .5s forwards
   animation-direction alternate

.key-on
   animation on .5s forwards
   animation-direction alternate
.trans-on
//   width 80px
   border 1px solid #3388FF
.trans-off
//    width 0
//    width 30px
   border 1px solid rgba(115,120,128,0.4);

@keyframes on
{
0%   { left: 0px; background: rgba(115,120,128,0.4)}
100% {left: 20px; background:  #3388FF}
}
@keyframes off
{
0%   { left: 20px; background:  #3388FF}
100% {left: 0px; background: rgba(115,120,128,0.4)}
}
</style>

