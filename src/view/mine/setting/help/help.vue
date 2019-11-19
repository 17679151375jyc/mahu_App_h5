<template>
  <div class="wrapper">
    <topBar title="使用帮助" @goBack="back"></topBar>
  </div>
</template>

<script>
  import topBar from "_c/topBar";

  export default {
    name: "settingHelp",
    components: { topBar },
    data() {
      return {
      };
    },
    methods: {
      back(e) {
        setTimeout(() => {
          this.$router.goBack();
        }, 50);
      }
    }
  }
</script>

<style scoped>

</style>