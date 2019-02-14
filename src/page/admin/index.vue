<template>
  <van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
    <van-icon name="photograph"/>
  </van-uploader>
</template>
<script>
export default {
  methods: {
    onRead(file) {
      console.log(file);
    }
  }
};
</script>
