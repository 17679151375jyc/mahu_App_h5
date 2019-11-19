<template>
  <div class="message-box" :style="backgroundStyle">

  </div>
</template>

<script>
  export default {
    name: "important-message-box",
    props:
      {
        backgroundStyle: {},
      },
  };
</script>

<style scoped>
  .message-box {
    width: 100%;
    height: 13.33rem;
  }
</style>
