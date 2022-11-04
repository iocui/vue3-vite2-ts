<script setup lang="ts">
const { t } = useLang();
const lstr = computed(() => t('hello-sub', { dom: 'Hi' }));
</script>

<template>
  <div css:bg="light-800" class="p-4 m-2">
    <div style="text-align: center">{{ t('hello-sub', { dom: 'Hello' }) }}</div>
    <p>{{ lstr }}</p>
  </div>
</template>

<style scoped lang="scss"></style>

<i18n>
{
  "en": {
    "hello-sub": "{dom} I am a sublevel language!"
  },
  "zh-CN": {
    "hello-sub": "{dom} 我是子层语言！"
  },
  "zh-TW": {
    "hello-sub": "{dom} 我是子層語言！"
  }
}
</i18n>
