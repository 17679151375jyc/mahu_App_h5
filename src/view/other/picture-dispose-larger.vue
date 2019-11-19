<template>
  <div class="wrapper">
    <return-head :title="title">
      <div slot="menu" >
        <img :src="require('./icon_delete.png')" style="width: 7.47vw;height: 7.47vw;margin-right: 2.67vw">
      </div>
    </return-head>
    <p>dsdsd</p>
    <img :src="require('./icon_delete.png')" style="width: 7.47vw;height: 7.47vw;margin-right: 2.67vw">
    <!--<img style="flex: 1">-->
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';

  export default {
    name: "picture-dispose-larger",
    components: {
      returnHead
    },
    data() {
      return {
        title: '',
      }
    },
    created() {
      this.title = this.$route.query.index + "/" + this.$route.query.sum;
    }
  }
</script>

<style scoped>

</style>