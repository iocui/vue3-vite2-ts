<script setup lang="ts">
//组件直接使用自定义VUE指令
const vDemo = {
  mounted(el: HTMLInputElement) {
    el.className = 'p-2';
  }
};
</script>

<template>
  <div class="text-center p-20">
    <input type="text" v-focus v-default v-demo />

    <div v-draggable class="flex items-center justify-center bg-red-500 text-light-50 w-50 h-10">我可以拖动</div>

    <div class="content-box flex items-center justify-center" v-waterMarker="{ text: 'Watermark Direct', textColor: 'rgba(180, 180, 180, 0.6)' }">
      <span class="text-light-900 justify-center verticle-align">水印指令</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-box {
  width: 100%;
  height: 600px;
}
</style>
