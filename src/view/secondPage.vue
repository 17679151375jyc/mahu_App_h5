<template>

  <div class="secondPage">
   
   <transition name="fade">
     <p v-if="show">secondPage</p>
   </transition>
   </div>
   
</template>

<script>
   
   export default {
       name: 'secondPage',
       components: {},
       data(){
           return {
               show: false,
           }
       },
       methods: {
          btnClick(e){
              console.log(e)
          }
       },
       computed: {
        
       },
       created(){
           setTimeout(()=>{
               this.show = true
           },50)
       }
   }
</script> 


<style lang="scss">

  .go_back {
      font-size: 0.5rem;
  
      padding: 0.2rem 0.3rem;
      text-align: left;
      background: #fff;
     
  }
</style>