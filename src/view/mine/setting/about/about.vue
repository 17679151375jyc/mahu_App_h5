<template>
  <div class="wrapper">
    <return-head title="关于我们"></return-head>

    <p class="base-text-title-normal-black" style="margin-top: 10vh;text-align: center">H5端版本: {{mVersion}}</p>
    <p class="base-text-title-normal-black" style="margin-top: 2vh;text-align: center">原生端版本: {{getAppVersion()}}</p>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';

  export default {
    name: "settingAbout",
    components: { returnHead },
    data() {
      return {
        mVersion: '',
      };
    },
    created() {
      this.mVersion = utils.returnVersion();
    },
    methods: {
      getAppVersion() {
        return CYJ.getAppVersion();
      }
    }
  }
</script>

<style scoped>

</style>