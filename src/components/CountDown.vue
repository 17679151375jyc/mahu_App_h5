<template>
  <div>
    <div @click="btnClicked" :style="buttonStyle">{{time}}</div>
  </div>
</template>

<script>

  // let flag = false
  export default {
    name: "",
    components: {},
    data(){
      return {
        time : '获取验证码',
        m:""
      }
    },
    props : {
      start : {
        type : Boolean
      },
      buttonStyle:{
        type:Object,
        default: () => ({})
      },
    },
    watch : {
      start (value,oldvalue) {
        if(value == true){
          this.countDown()
        }
      }
    },
    methods:{
      btnClicked(e){
        let self = this;
        this.$emit('btnClicked',{})
      },
      countDown () {
        this.buttonStyle["background"]="#ccc";
        this.m = 60
        this.time = "获取验证码"+ "(" + this.m + ")";
        let time = setInterval(()=>{
          this.m --
          this.time = "获取验证码"+ "(" + this.m + ")";
          if(this.m == 0){
            this.buttonStyle["background"] = "rgba(51,136,255,1)";
            this.$emit('countDown')
            this.time = '获取验证码'
            // flag = true
            clearInterval(time)
          }
        },1000)
      }
    },
    filters : {
      change (value) {
        if(!value) return ""
        if(!isNaN(value)){
          // if(flag == true){
          //     return `重新发送${value}S`
          // }
          return value+'S'
        }else{
          return value
        }
      }
    }
  }
</script>

<style scoped>
.button{
  width: 1rem;
  height: 0.9rem;
  background:rgba(51,136,255,1);
}
</style>
