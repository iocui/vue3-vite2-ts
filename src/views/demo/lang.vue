<script setup>
import langSubVue from './lang-sub.vue';

const { t } = useLang();
</script>

<template>
  <div style="text-align: center; margin-top: 10%">
    <h1>{{ t('language') }} - {{ $t('language') }}</h1>
    {{ t('hello') }}, {{ t('hello-parent') }}
    <langSubVue />
    <!-- 当语种含有HTML元素时，使用i18n插槽方式展现 -->
    <i18n-t keypath="tips" tag="p" class="@apply lg:text-center mt-4 max-w-2xl text-base text-gray-500 lg:mx-auto">
      <template #dom><strong>Strong</strong></template>
    </i18n-t>

    <button class="border-light-900 border-1 pl-2 pr-2 rounded m-5" @click="$router.push({ path: '/demo/langs' })">前往SFC替换全局语言与模块语言示例</button>
  </div>
</template>

<i18n>
{
  "en": {
    "hello-parent": "I am the parent language!",
    "tips": "This is a {dom} demo."
  },
  "zh-CN": {
    "hello-parent": "我是父层语言！",
    "tips": "这是一个 {dom} 测试."
  },
  "zh-TW": {
    "hello-parent": "我是父層語言！",
    "tips": "這是一個 {dom} 測試."
  }
}
</i18n>
